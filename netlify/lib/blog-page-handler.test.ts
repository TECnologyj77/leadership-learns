import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createBlogPageHandler } from './blog-page-handler.ts';
import type { BlogService, ListResult, PostResult } from './blog-service.ts';
import type { HandlerContext } from './handler-context.ts';
import { toBlogPost, toBlogSummary, type WixPostLike } from './normalize-post.ts';
import { renderHtmlDocument } from './html-document.ts';

const fixture = (name: string) => JSON.parse(readFileSync(new URL(`./__fixtures__/${name}`, import.meta.url), 'utf8'));
const details: Record<string, WixPostLike> = fixture('wix-post-details.json');
const labels = { categories: new Map(), tags: new Map() };
const SLUG = 'from-silence-to-stage-the-inspiring-journey-of-14-year-old-austin-morales';
const { post } = toBlogPost(details[SLUG], labels);

// The real index.html, so a change to its markers breaks this test.
const template = readFileSync(new URL('../../index.html', import.meta.url), 'utf8');
const meta = { source: 'wix' as const, fetchedAt: '2026-09-26T00:00:00.000Z', stale: false };

function handlerWith(result: { list?: ListResult; post?: PostResult }) {
  const service: BlogService = {
    loadPostList: async () => result.list ?? { status: 'unavailable' },
    loadPost: async () => result.post ?? { status: 'unavailable' },
  };
  return createBlogPageHandler({
    template,
    renderApp: (url, data) => ({ html: `<main data-url="${url}" data-status="${data?.status ?? 'none'}"></main>`, styles: '<style data-emotion="css x"></style>' }),
    serviceFor: () => service,
  });
}

const ctx = (deployContext = 'production'): HandlerContext => ({ deployContext, waitUntil: () => {} });
const get = (path: string) => new Request(`https://www.leadershiplearners.com${path}`);

test('an article responds 200 with its own metadata, body and embedded data', async () => {
  const response = await handlerWith({ post: { status: 'ok', post, meta } })(get(`/post/${SLUG}`), ctx());
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(response.headers.get('Netlify-CDN-Cache-Control') ?? '', /durable, s-maxage=300, stale-while-revalidate=3600/);
  assert.equal(response.headers.get('X-Robots-Tag'), null);
  assert.ok(html.includes('<title>From Silence to Stage: The Inspiring Journey of 14-Year-Old Austin Morales | Leadership Learners</title>'));
  assert.ok(html.includes(`<link rel="canonical" href="https://www.leadershiplearners.com/post/${SLUG}" />`));
  assert.ok(html.includes('<meta name="description" content="The challenges of autism and becoming a public speaker. He wants to be in a TedX talk" />'));
  assert.ok(html.includes('<meta property="og:type" content="article" />'));
  assert.ok(html.includes('"@type":"BlogPosting"'));
  assert.ok(html.includes('<style data-emotion="css x"></style>'));
  assert.ok(html.includes(`<div id="root"><main data-url="/post/${SLUG}" data-status="ok"></main></div>`));
  assert.ok(html.includes('<script id="blog-initial-data" type="application/json">'));
  // The shell's homepage defaults are replaced, not duplicated.
  assert.equal(html.match(/<title>/g)?.length, 1);
  assert.equal(html.match(/rel="canonical"/g)?.length, 1);
  // Site-wide Organization structured data stays.
  assert.ok(html.includes('"@type": "Organization"'));
});

test('unknown or removed articles return a real 404 with noindex', async () => {
  const response = await handlerWith({ post: { status: 'not_found' } })(get('/post/no-such-post'), ctx());
  const html = await response.text();
  assert.equal(response.status, 404);
  assert.ok(html.includes('<meta name="robots" content="noindex, follow" />'));
  assert.ok(!html.includes('rel="canonical"'));
});

test('a Wix outage with nothing saved returns 503 and is never cached', async () => {
  const response = await handlerWith({ post: { status: 'unavailable' } })(get(`/post/${SLUG}`), ctx());
  assert.equal(response.status, 503);
  assert.equal(response.headers.get('Cache-Control'), 'no-store');
  assert.equal(response.headers.get('Netlify-CDN-Cache-Control'), null);
});

test('stale fallback content is served with a short cache', async () => {
  const response = await handlerWith({ post: { status: 'ok', post, meta: { ...meta, stale: true, source: 'last-known-good' } } })(get(`/post/${SLUG}`), ctx());
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('Netlify-CDN-Cache-Control'), 'public, s-maxage=60');
});

test('a changed slug redirects permanently to the current article path', async () => {
  const response = await handlerWith({ post: { status: 'moved', path: `/post/${SLUG}` } })(get('/post/old-slug'), ctx());
  assert.equal(response.status, 301);
  assert.equal(response.headers.get('Location'), `https://www.leadershiplearners.com/post/${SLUG}`);
});

test('the listing renders every post and non-production responses are noindex', async () => {
  const posts = [toBlogSummary(details[SLUG], labels)];
  const response = await handlerWith({ list: { status: 'ok', posts, meta } })(get('/blog'), ctx('deploy-preview'));
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('X-Robots-Tag'), 'noindex, nofollow');
  assert.ok(html.includes('<link rel="canonical" href="https://www.leadershiplearners.com/blog" />'));
  assert.ok(html.includes(`"path":"/post/${SLUG}"`));
});

test('text and data from Wix cannot break out of their HTML context', () => {
  const hostile = { ...post, title: '</title><script>alert(1)</script>', excerpt: '"><img src=x onerror=alert(1)>' };
  const html = renderHtmlDocument({
    template,
    headTags: [
      { kind: 'title', text: hostile.title },
      { kind: 'meta', attribute: 'name', key: 'description', content: hostile.excerpt },
      { kind: 'jsonld', id: 'ld-article', data: { headline: '</script><script>alert(1)</script>' } },
    ],
    styles: '',
    appHtml: '',
    blogData: { page: 'post', status: 'ok', slug: SLUG, post: hostile },
  });
  assert.ok(!html.includes('<script>alert(1)</script>'));
  assert.ok(!html.includes('<img src=x'));
  assert.ok(html.includes('&lt;/title&gt;&lt;script&gt;'));
  assert.ok(html.includes('\\u003c/script\\u003e'));
});

test('a template without route-meta markers is rejected loudly', () => {
  assert.throws(() =>
    renderHtmlDocument({ template: '<html><head></head><body><div id="root"></div></body></html>', headTags: [], styles: '', appHtml: '', blogData: { page: 'list', status: 'unavailable' } }),
  );
});
