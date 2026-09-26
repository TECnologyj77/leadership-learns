// Public blog URLs. Article paths stay /post/<slug> to preserve the URLs
// Wix has published at www.leadershiplearners.com.

export const BLOG_PATH = '/blog';

// Wix slugs are lowercase words joined by hyphens (letters in any script);
// anything else can't be a published post, so it is rejected before any API call.
const SLUG = /^[\p{Ll}\p{Lo}\p{N}]+(?:-[\p{Ll}\p{Lo}\p{N}]+)*$/u;

export const isValidPostSlug = (slug: unknown): slug is string =>
  typeof slug === 'string' && slug.length <= 200 && SLUG.test(slug);

export const postPath = (slug: string) => `/post/${encodeURIComponent(slug)}`;

function lastSegment(pathname: string, prefix: string): string | null {
  if (!pathname.startsWith(prefix)) return null;
  const segment = pathname.slice(prefix.length).replace(/\/$/, '');
  if (!segment || segment.includes('/')) return null;
  try {
    return decodeURIComponent(segment);
  } catch {
    return null;
  }
}

/** Slug from a /post/<slug> pathname, or null for any other path. */
export const slugFromPostPath = (pathname: string) => lastSegment(pathname, '/post/');

/** Slug from an /api/blog/posts/<slug> pathname, or null for any other path. */
export const slugFromPostApiPath = (pathname: string) => lastSegment(pathname, '/api/blog/posts/');
