import { test, beforeEach, mock } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createBlogService, MAX_STALE_MS } from './blog-service.ts';
import type { BlogStore, Saved } from './blog-store.ts';
import type { WixBlogSource } from './wix-blog-source.ts';
import { WixUnavailableError } from './wix-blog-source.ts';
import type { TermLabels, WixPostLike } from './normalize-post.ts';
import type { BlogPost, BlogSummary } from '../../src/types/blog.ts';

const fixture = (name: string) => JSON.parse(readFileSync(new URL(`./__fixtures__/${name}`, import.meta.url), 'utf8'));
const list: WixPostLike[] = fixture('wix-post-list.json');
const details: Record<string, WixPostLike> = fixture('wix-post-details.json');
const labels: TermLabels = { categories: new Map(), tags: new Map() };
const SLUG = 'from-silence-to-stage-the-inspiring-journey-of-14-year-old-austin-morales';

function memoryStore(): BlogStore & { list: Saved<BlogSummary[]> | null; posts: Map<string, Saved<BlogPost>> } {
  const state = {
    list: null as Saved<BlogSummary[]> | null,
    posts: new Map<string, Saved<BlogPost>>(),
    async readList() { return state.list; },
    async saveList(posts: BlogSummary[]) { state.list = { savedAt: new Date().toISOString(), data: posts }; },
    async readPost(slug: string) { return state.posts.get(slug) ?? null; },
    async savePost(post: BlogPost) { state.posts.set(post.slug, { savedAt: new Date().toISOString(), data: post }); },
    async deletePost(slug: string) { state.posts.delete(slug); },
  };
  return state;
}

const outage = () => Promise.reject(new WixUnavailableError('Query Posts', 503, null));
let source: WixBlogSource;
let store: ReturnType<typeof memoryStore>;
let pending: Promise<unknown>[];
const service = (now?: () => Date) => createBlogService({ source, store, waitUntil: (p) => pending.push(p), now });
const settle = () => Promise.all(pending);

beforeEach(() => {
  mock.method(console, 'error', () => {});
  mock.method(console, 'warn', () => {});
  pending = [];
  store = memoryStore();
  source = {
    fetchPublishedPosts: async () => list,
    fetchPostBySlug: async (slug) => details[slug] ?? null,
    fetchTermLabels: async () => labels,
  };
});

test('lists every published post and saves a last-known-good copy', async () => {
  const result = await service().loadPostList();
  await settle();
  assert.equal(result.status, 'ok');
  assert.equal(result.status === 'ok' && result.posts.length, 5);
  assert.equal(result.status === 'ok' && result.meta.source, 'wix');
  assert.equal(store.list?.data.length, 5);
});

test('serves the saved list, marked stale, while Wix is down', async () => {
  await service().loadPostList();
  await settle();
  source.fetchPublishedPosts = outage;
  const result = await service().loadPostList();
  assert.equal(result.status, 'ok');
  assert.deepEqual(result.status === 'ok' && [result.meta.stale, result.meta.source], [true, 'last-known-good']);
});

test('reports unavailable when Wix is down and there is no usable saved copy', async () => {
  source.fetchPublishedPosts = outage;
  assert.deepEqual(await service().loadPostList(), { status: 'unavailable' });

  store.list = { savedAt: new Date(Date.now() - MAX_STALE_MS - 1000).toISOString(), data: [] };
  assert.deepEqual(await service().loadPostList(), { status: 'unavailable' });
});

test('does not replace good data when every post fails validation', async () => {
  await service().loadPostList();
  await settle();
  source.fetchPublishedPosts = async () => list.map((post) => ({ ...post, title: '' }));
  const result = await service().loadPostList();
  await settle();
  assert.equal(result.status === 'ok' && result.meta.stale, true);
  assert.equal(store.list?.data.length, 5);
});

test('an unpublished post is a 404 and its saved copy is removed', async () => {
  await service().loadPost(SLUG);
  await settle();
  assert.ok(store.posts.has(SLUG));
  source.fetchPostBySlug = async () => null;
  assert.deepEqual(await service().loadPost(SLUG), { status: 'not_found' });
  await settle();
  assert.equal(store.posts.has(SLUG), false);
});

test('a saved article is served during an outage only while the saved list still includes it', async () => {
  await service().loadPostList();
  await service().loadPost(SLUG);
  await settle();
  source.fetchPostBySlug = outage;
  const stale = await service().loadPost(SLUG);
  assert.equal(stale.status === 'ok' && stale.meta.source, 'last-known-good');

  store.list = { savedAt: new Date().toISOString(), data: store.list!.data.filter((post) => post.slug !== SLUG) };
  assert.deepEqual(await service().loadPost(SLUG), { status: 'unavailable' });
});

test('invalid slugs never reach Wix', async () => {
  source.fetchPostBySlug = async () => assert.fail('Wix should not be called');
  assert.deepEqual(await service().loadPost('../secret'), { status: 'not_found' });
  assert.deepEqual(await service().loadPost('Upper-Case'), { status: 'not_found' });
});

test('a post Wix now serves under a new slug is reported as moved', async () => {
  source.fetchPostBySlug = async () => details[SLUG];
  assert.deepEqual(await service().loadPost('old-slug'), { status: 'moved', path: `/post/${SLUG}` });
});

test('gated (pricing plan) posts are excluded from the list and treated as missing', async () => {
  source.fetchPublishedPosts = async () => [{ ...list[0], pricingPlanIds: ['plan'] }, ...list.slice(1)];
  const result = await service().loadPostList();
  assert.equal(result.status === 'ok' && result.posts.length, 4);
  source.fetchPostBySlug = async () => ({ ...details[SLUG], pricingPlanIds: ['plan'] });
  assert.deepEqual(await service().loadPost(SLUG), { status: 'not_found' });
});
