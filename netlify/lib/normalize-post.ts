// Validates Wix Blog posts (as returned by @wix/sdk) and maps them to the
// site-owned BlogSummary / BlogPost types. No Wix field names leave this file.
import type { BlogPost, BlogSummary, BlogTerm } from '../../src/types/blog.ts';
import { isValidPostSlug, postPath } from '../../src/lib/blog-paths.ts';
import { ricosToBlocks, type ContentIssue } from './ricos-to-blocks.ts';
import { toBlogImage } from './wix-media.ts';

/** Required fields are missing or malformed: treat like a Wix outage, never as content. */
export class InvalidWixDataError extends Error {
  constructor(reason: string) {
    super(`Invalid Wix post data: ${reason}`);
    this.name = 'InvalidWixDataError';
  }
}

export interface TermLabels {
  categories: ReadonlyMap<string, string>;
  tags: ReadonlyMap<string, string>;
}

// The SDK returns loosely typed objects; every field is checked before use.
export interface WixPostLike {
  _id?: unknown;
  slug?: unknown;
  title?: unknown;
  excerpt?: unknown;
  firstPublishedDate?: unknown;
  lastPublishedDate?: unknown;
  minutesToRead?: unknown;
  categoryIds?: unknown;
  tagIds?: unknown;
  pricingPlanIds?: unknown;
  media?: { displayed?: unknown; wixMedia?: { image?: unknown } } | null;
  heroImage?: unknown;
  seoData?: { tags?: unknown } | null;
  richContent?: unknown;
}

const text = (value: unknown): string | null => {
  if (typeof value !== 'string') return null;
  const clean = value.replace(/\s+/g, ' ').trim();
  return clean || null;
};

function isoDate(value: unknown): string | null {
  if (!(value instanceof Date) && typeof value !== 'string') return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

/** The post's terms, in the order Wix lists them (which is how Wix's own pages show them). */
function terms(ids: unknown, labels: ReadonlyMap<string, string>): BlogTerm[] {
  if (!Array.isArray(ids)) return [];
  const wanted = new Set(ids.filter((id): id is string => typeof id === 'string'));
  return [...labels].filter(([id]) => wanted.has(id)).map(([id, label]) => ({ id, label }));
}

/**
 * Posts restricted to Wix Pricing Plans are member content. They are never
 * published on this site, so they're treated as absent rather than invalid.
 */
export const isGatedPost = (post: WixPostLike) =>
  Array.isArray(post.pricingPlanIds) && post.pricingPlanIds.length > 0;

export function toBlogSummary(post: WixPostLike, labels: TermLabels): BlogSummary {
  const id = text(post._id);
  const title = text(post.title);
  const publishedAt = isoDate(post.firstPublishedDate);
  if (!id) throw new InvalidWixDataError('post without an id');
  if (!isValidPostSlug(post.slug)) throw new InvalidWixDataError(`post ${id} has an invalid slug`);
  if (!title) throw new InvalidWixDataError(`post ${id} has no title`);
  if (!publishedAt) throw new InvalidWixDataError(`post ${id} has no publication date`);

  const cover = post.media?.displayed === false ? null : post.media?.wixMedia?.image;
  const minutes = post.minutesToRead;

  return {
    id,
    slug: post.slug,
    path: postPath(post.slug),
    title,
    excerpt: text(post.excerpt),
    publishedAt,
    updatedAt: isoDate(post.lastPublishedDate),
    coverImage: cover ? toBlogImage({ reference: cover }) : null,
    categories: terms(post.categoryIds, labels.categories),
    minutesToRead: typeof minutes === 'number' && minutes > 0 ? Math.round(minutes) : null,
  };
}

function heroImage(value: unknown) {
  if (typeof value === 'string') return toBlogImage({ reference: value });
  if (value && typeof value === 'object') {
    const image = value as { url?: unknown; id?: unknown; width?: unknown; height?: unknown; altText?: unknown };
    return toBlogImage({ reference: image.id ?? image.url, width: image.width, height: image.height, alt: image.altText });
  }
  return null;
}

function seoDescription(seoData: WixPostLike['seoData']): string | null {
  if (!Array.isArray(seoData?.tags)) return null;
  for (const tag of seoData.tags as Array<{ type?: unknown; disabled?: unknown; props?: { name?: unknown; content?: unknown } }>) {
    if (tag?.type === 'meta' && tag.disabled !== true && tag.props?.name === 'description') {
      return text(tag.props.content);
    }
  }
  return null;
}

export function toBlogPost(post: WixPostLike, labels: TermLabels): { post: BlogPost; issues: ContentIssue[] } {
  const summary = toBlogSummary(post, labels);
  if (!post.richContent || typeof post.richContent !== 'object') {
    throw new InvalidWixDataError(`post ${summary.id} has no rich content`);
  }
  const { blocks, issues } = ricosToBlocks(post.richContent);
  const hero = heroImage(post.heroImage);
  if (hero && !hero.alt) issues.push({ kind: 'missing-alt-text', wixType: 'HERO_IMAGE' });
  return {
    post: {
      ...summary,
      heroImage: hero,
      tags: terms(post.tagIds, labels.tags),
      seoDescription: seoDescription(post.seoData),
      blocks,
    },
    issues,
  };
}
