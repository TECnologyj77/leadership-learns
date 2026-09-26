// Server-rendered HTML for /blog and /post/<slug>: the full app markup,
// page-specific title/description/canonical/social tags/structured data, and
// a real HTTP status (200, 301 for a changed slug, 404 for unknown or removed
// posts, 503 when Wix is unreachable and nothing is saved).
import type { BlogInitialData } from '../../src/types/blog.ts';
import type { RenderApp } from '../../src/types/ssr.ts';
import { BLOG_PATH, slugFromPostPath } from '../../src/lib/blog-paths.ts';
import { headTags, notFoundMeta, postPageMeta, staticRouteMeta, unavailableMeta, type PageMeta } from '../../src/lib/seo.ts';
import type { BlogService } from './blog-service.ts';
import { blogServiceFor, type HandlerContext } from './handler-context.ts';
import { renderHtmlDocument } from './html-document.ts';
import { CACHE, robotsHeaders } from './http.ts';

interface Page {
  status: number;
  cache: Record<string, string>;
  meta: PageMeta;
  blogData: BlogInitialData;
}

async function listPage(service: BlogService): Promise<Page> {
  const result = await service.loadPostList();
  if (result.status !== 'ok') {
    return { status: 503, cache: CACHE.unavailable, meta: unavailableMeta(BLOG_PATH), blogData: { page: 'list', status: 'unavailable' } };
  }
  return {
    status: 200,
    cache: result.meta.stale ? CACHE.stale : CACHE.fresh,
    meta: staticRouteMeta(BLOG_PATH)!,
    blogData: { page: 'list', status: 'ok', posts: result.posts },
  };
}

async function postPage(service: BlogService, slug: string, pathname: string): Promise<Page | { redirect: string }> {
  const result = await service.loadPost(slug);
  switch (result.status) {
    case 'ok':
      return {
        status: 200,
        cache: result.meta.stale ? CACHE.stale : CACHE.fresh,
        meta: postPageMeta(result.post),
        blogData: { page: 'post', status: 'ok', slug, post: result.post },
      };
    case 'moved':
      return { redirect: result.path };
    case 'not_found':
      return { status: 404, cache: CACHE.notFound, meta: notFoundMeta(pathname), blogData: { page: 'post', status: 'not_found', slug } };
    case 'unavailable':
      return { status: 503, cache: CACHE.unavailable, meta: unavailableMeta(pathname), blogData: { page: 'post', status: 'unavailable', slug } };
  }
}

export function createBlogPageHandler({
  renderApp,
  template,
  serviceFor = blogServiceFor,
}: {
  renderApp: RenderApp;
  template: string;
  /** Injectable for tests. */
  serviceFor?: (ctx: HandlerContext) => BlogService;
}) {
  return async (request: Request, ctx: HandlerContext): Promise<Response> => {
    const url = new URL(request.url);
    const slug = slugFromPostPath(url.pathname);
    const service = serviceFor(ctx);
    const page = slug !== null ? await postPage(service, slug, url.pathname) : await listPage(service);

    if ('redirect' in page) {
      return new Response(null, { status: 301, headers: { Location: new URL(page.redirect, url).href, ...CACHE.fresh } });
    }

    const { html, styles } = renderApp(url.pathname, page.blogData);
    const document = renderHtmlDocument({ template, headTags: headTags(page.meta), styles, appHtml: html, blogData: page.blogData });
    return new Response(document, {
      status: page.status,
      headers: { 'Content-Type': 'text/html; charset=utf-8', ...page.cache, ...robotsHeaders(ctx) },
    });
  };
}
