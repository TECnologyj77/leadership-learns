// Validates links that come from Wix content before they reach the page.
import type { BlogLink } from '../../src/types/blog.ts';

const ALLOWED_PROTOCOLS = new Set(['https:', 'http:', 'mailto:', 'tel:']);

/** Returns the normalized URL when it is absolute and uses an allowed protocol. */
export function toSafeHref(value: unknown): string | null {
  if (typeof value !== 'string' || !value.trim()) return null;
  try {
    const url = new URL(value.trim());
    return ALLOWED_PROTOCOLS.has(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}

interface WixLink {
  url?: unknown;
  target?: unknown;
  rel?: { nofollow?: unknown; sponsored?: unknown; ugc?: unknown } | null;
}

/** Maps a Ricos link object ({ url, target, rel }) to a BlogLink, or null when unsafe. */
export function toBlogLink(link: unknown): BlogLink | null {
  if (!link || typeof link !== 'object') return null;
  const { url, target, rel } = link as WixLink;
  const href = toSafeHref(url);
  if (!href) return null;
  return {
    href,
    newTab: target === 'BLANK',
    nofollow: Boolean(rel?.nofollow || rel?.sponsored || rel?.ugc),
  };
}
