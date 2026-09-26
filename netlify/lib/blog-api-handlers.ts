// JSON endpoints used by the browser when navigating inside the app:
//   GET /api/blog/posts          -> BlogResponse<BlogSummary[]>
//   GET /api/blog/posts/:slug    -> BlogResponse<BlogPost> | 404 | 503
import type { BlogPost, BlogResponse, BlogSummary } from '../../src/types/blog.ts';
import { slugFromPostApiPath } from '../../src/lib/blog-paths.ts';
import { blogServiceFor, type HandlerContext } from './handler-context.ts';
import { CACHE, json, robotsHeaders } from './http.ts';

const unavailable = (ctx: HandlerContext) =>
  json({ error: 'blog_unavailable' }, 503, { ...CACHE.unavailable, ...robotsHeaders(ctx) });

export async function handlePostList(ctx: HandlerContext): Promise<Response> {
  const result = await blogServiceFor(ctx).loadPostList();
  if (result.status !== 'ok') return unavailable(ctx);
  const body: BlogResponse<BlogSummary[]> = { data: result.posts, meta: result.meta };
  return json(body, 200, { ...(result.meta.stale ? CACHE.stale : CACHE.fresh), ...robotsHeaders(ctx) });
}

export async function handlePost(request: Request, ctx: HandlerContext): Promise<Response> {
  const slug = slugFromPostApiPath(new URL(request.url).pathname) ?? '';
  const result = await blogServiceFor(ctx).loadPost(slug);
  switch (result.status) {
    case 'ok': {
      const body: BlogResponse<BlogPost> = { data: result.post, meta: result.meta };
      return json(body, 200, { ...(result.meta.stale ? CACHE.stale : CACHE.fresh), ...robotsHeaders(ctx) });
    }
    case 'moved':
      return new Response(null, {
        status: 301,
        headers: { Location: new URL(`/api/blog/posts/${result.path.slice('/post/'.length)}`, request.url).href, ...CACHE.fresh },
      });
    case 'not_found':
      return json({ error: 'post_not_found' }, 404, { ...CACHE.notFound, ...robotsHeaders(ctx) });
    case 'unavailable':
      return unavailable(ctx);
  }
}
