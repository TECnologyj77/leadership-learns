// Turns Wix Media references into validated image-CDN URLs.
//
// Wix returns images as bare media IDs (rich content), `wix:image://v1/...`
// identifiers (SDK-mapped post fields) or static.wixstatic.com URLs. Only IDs
// that look like real Wix Media files are accepted; anything else is rejected
// so the page never points at an arbitrary host.
//
// We build the transform URLs here instead of calling the SDK's
// media.getScaledToFitImageUrl(): @wix/sdk 1.21.16 passes (height, width) to
// @wix/image-kit, which expects (width, height), so portrait images come back
// with swapped dimensions. The URL shape below is the one Wix's own blog pages
// and RSS feed use.
import type { BlogImage } from '../../src/types/blog.ts';

const WIX_MEDIA_ORIGIN = 'https://static.wixstatic.com/media/';
const MEDIA_ID = /^[0-9a-f]{6}_[0-9a-f]{32}~mv2\.(?:jpe?g|png|webp|gif|avif)$/i;
const SRCSET_WIDTHS = [480, 800, 1200, 1600];
const DEFAULT_WIDTH = 1200;

/** Extracts a Wix Media ID from any of the reference formats Wix returns, or null. */
export function toWixMediaId(reference: unknown): string | null {
  if (typeof reference !== 'string') return null;
  let candidate = reference.trim();
  if (candidate.startsWith('wix:image://v1/')) {
    candidate = candidate.slice('wix:image://v1/'.length).split(/[/#]/)[0];
  } else if (candidate.startsWith(WIX_MEDIA_ORIGIN)) {
    candidate = candidate.slice(WIX_MEDIA_ORIGIN.length).split('/')[0];
  }
  return MEDIA_ID.test(candidate) ? candidate : null;
}

function fitUrl(id: string, width: number, height: number): string {
  return `${WIX_MEDIA_ORIGIN}${id}/v1/fit/w_${width},h_${height},q_85,enc_auto/${id}`;
}

const positiveInt = (value: unknown): number | null =>
  typeof value === 'number' && Number.isFinite(value) && value > 0 ? Math.round(value) : null;

/** Dimensions from a `#originWidth=..&originHeight=..` wix:image fragment. */
function fragmentDimensions(reference: unknown): { width: number | null; height: number | null } {
  if (typeof reference !== 'string' || !reference.includes('#')) return { width: null, height: null };
  const params = new URLSearchParams(reference.split('#')[1]);
  return {
    width: positiveInt(Number(params.get('originWidth'))),
    height: positiveInt(Number(params.get('originHeight'))),
  };
}

function cleanAlt(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const text = value.replace(/\s+/g, ' ').trim();
  return text || null;
}

/**
 * Builds a BlogImage, or null when the reference isn't a valid Wix Media
 * image or its original dimensions are unknown (needed to avoid layout shift).
 */
export function toBlogImage(input: {
  reference: unknown;
  width?: unknown;
  height?: unknown;
  alt?: unknown;
}): BlogImage | null {
  const id = toWixMediaId(input.reference);
  if (!id) return null;

  const fromFragment = fragmentDimensions(input.reference);
  const width = positiveInt(input.width) ?? fromFragment.width;
  const height = positiveInt(input.height) ?? fromFragment.height;
  if (!width || !height) return null;

  // Never upscale: cap every rendition at the original width.
  const scaled = (target: number) => {
    const w = Math.min(target, width);
    return { w, h: Math.round((height * w) / width) };
  };
  const widths = [...new Set(SRCSET_WIDTHS.map((target) => Math.min(target, width)))];
  const main = scaled(DEFAULT_WIDTH);

  return {
    src: fitUrl(id, main.w, main.h),
    srcSet: widths.map((w) => `${fitUrl(id, w, scaled(w).h)} ${w}w`).join(', '),
    width,
    height,
    alt: cleanAlt(input.alt),
  };
}
