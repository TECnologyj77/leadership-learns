// /sitemap.xml built from the static routes and the live published archive,
// so it changes when Tammy publishes or unpublishes in Wix.
import { routeSeo, SITE_URL } from '../../src/lib/site-config.ts';
import { blogServiceFor, type HandlerContext } from './handler-context.ts';
import { CACHE, robotsHeaders } from './http.ts';

const escapeXml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

const entry = (path: string, lastmod?: string) =>
  `  <url>\n    <loc>${escapeXml(`${SITE_URL}${path}`)}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}\n  </url>`;

export async function handleSitemap(ctx: HandlerContext): Promise<Response> {
  const result = await blogServiceFor(ctx).loadPostList();
  // Without the archive a sitemap would silently drop every article.
  if (result.status !== 'ok') {
    return new Response('Sitemap temporarily unavailable', { status: 503, headers: { ...CACHE.unavailable, ...robotsHeaders(ctx) } });
  }

  const urls = [
    ...routeSeo.map((route) => entry(route.path)),
    ...result.posts.map((post) => entry(post.path, (post.updatedAt ?? post.publishedAt).slice(0, 10))),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      ...(result.meta.stale ? CACHE.stale : CACHE.fresh),
      ...robotsHeaders(ctx),
    },
  });
}
