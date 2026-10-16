// Response headers shared by the blog endpoints and pages.
//
// Refresh strategy: Netlify's durable CDN cache serves a response for five
// minutes, then keeps serving it for up to an hour while one background
// request refreshes it from Wix. So a publish, edit or unpublish in Wix
// reaches the site within about five minutes of traffic, with no deploy.
// Browsers always revalidate. New deploys clear the cache automatically, and
// the `blog` cache tag can be purged on demand (see docs/integrations/wix-blog.md).
import type { HandlerContext } from './handler-context.ts';

type Headers = Record<string, string>;

const BROWSER_REVALIDATE = 'public, max-age=0, must-revalidate';

// Netlify's static header rules do not apply to function responses.
export const SECURITY_HEADERS: Headers = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};

export const CACHE: Record<'fresh' | 'stale' | 'notFound' | 'unavailable', Headers> = {
  fresh: {
    'Cache-Control': BROWSER_REVALIDATE,
    'Netlify-CDN-Cache-Control': 'public, durable, s-maxage=300, stale-while-revalidate=3600',
    'Netlify-Cache-Tag': 'blog',
  },
  // Served from the last-known-good copy during a Wix outage: re-check soon.
  stale: {
    'Cache-Control': BROWSER_REVALIDATE,
    'Netlify-CDN-Cache-Control': 'public, s-maxage=60',
    'Netlify-Cache-Tag': 'blog',
  },
  notFound: {
    'Cache-Control': BROWSER_REVALIDATE,
    'Netlify-CDN-Cache-Control': 'public, durable, s-maxage=60',
    'Netlify-Cache-Tag': 'blog',
  },
  // Never cache an outage as if it were content.
  unavailable: { 'Cache-Control': 'no-store', 'Retry-After': '60' },
};

/**
 * Netlify's _headers file (scripts/write-staging-headers.mjs) doesn't apply
 * to function responses, so non-production blog responses add the same
 * no-index header themselves.
 */
export const robotsHeaders = (ctx: HandlerContext): Headers =>
  ctx.deployContext === 'production' ? {} : { 'X-Robots-Tag': 'noindex, nofollow' };

export function json(body: unknown, status: number, headers: Headers): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...SECURITY_HEADERS, ...headers },
  });
}
