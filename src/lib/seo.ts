// Page metadata for every route, as plain data (headTags) so the same tags
// are written by the browser (applyPageMeta, via RouteSeo and the article
// page) and by the server when it renders /blog and /post/<slug> HTML.
// (Explicit .ts extension: this module also runs under Node in server tests.)
import { absoluteUrl, notFoundSeo, SITE_NAME, SITE_URL, routeSeo, type RouteSeoEntry } from './site-config.ts';
import type { BlogPost } from '../types/blog';

const DEFAULT_OG_IMAGE = absoluteUrl('/og-leadership-v2.jpg');
const DEFAULT_OG_IMAGE_ALT = 'Leadership Learners. Build a stronger team. Speak with more confidence.';
export const TAMMY_OG_IMAGE = absoluteUrl('/og-tammy.jpg');

/** Finds the static route entry for a pathname, or null if it needs special handling. */
export const findRouteSeo = (pathname: string): RouteSeoEntry | null =>
  routeSeo.find((r) => r.path === (pathname === '/' ? '/' : pathname.replace(/\/+$/, ''))) ?? null;

export interface PageMeta {
  path: string;
  title: string;
  description: string;
  robots?: string;
  /** Omit to skip the canonical tag entirely (404 and error pages). */
  canonicalPath?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  breadcrumb?: Array<{ name: string; path: string }>;
  article?: BlogPost;
}

export type HeadTag =
  | { kind: 'title'; text: string }
  | { kind: 'meta'; attribute: 'name' | 'property'; key: string; content: string }
  | { kind: 'link'; rel: string; href: string }
  | { kind: 'jsonld'; id: string; data: object };

// Tags that only some pages have; applyPageMeta removes them when absent.
const OPTIONAL_TAGS = {
  links: ['canonical'],
  meta: ['article:published_time', 'article:modified_time', 'og:image:type', 'og:image:width', 'og:image:height', 'og:image:alt', 'twitter:image:alt'],
  jsonld: ['ld-breadcrumb', 'ld-article'],
};

function clampDescription(text: string, max = 300): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' ') > 0 ? cut.lastIndexOf(' ') : cut.length)}…`;
}

/** The complete, ordered list of route-specific head tags for one page. */
export function headTags(meta: PageMeta): HeadTag[] {
  const ogImage = meta.ogImage ?? DEFAULT_OG_IMAGE;
  const tags: HeadTag[] = [
    { kind: 'title', text: meta.title },
    { kind: 'meta', attribute: 'name', key: 'description', content: meta.description },
    { kind: 'meta', attribute: 'name', key: 'robots', content: meta.robots ?? 'index, follow' },
  ];
  if (meta.canonicalPath !== undefined) tags.push({ kind: 'link', rel: 'canonical', href: absoluteUrl(meta.canonicalPath) });

  tags.push(
    { kind: 'meta', attribute: 'property', key: 'og:site_name', content: SITE_NAME },
    { kind: 'meta', attribute: 'property', key: 'og:type', content: meta.ogType ?? 'website' },
    { kind: 'meta', attribute: 'property', key: 'og:title', content: meta.title },
    { kind: 'meta', attribute: 'property', key: 'og:description', content: meta.description },
    { kind: 'meta', attribute: 'property', key: 'og:url', content: absoluteUrl(meta.path) },
    { kind: 'meta', attribute: 'property', key: 'og:image', content: ogImage },
    { kind: 'meta', attribute: 'name', key: 'twitter:card', content: 'summary_large_image' },
    { kind: 'meta', attribute: 'name', key: 'twitter:title', content: meta.title },
    { kind: 'meta', attribute: 'name', key: 'twitter:description', content: meta.description },
    { kind: 'meta', attribute: 'name', key: 'twitter:image', content: ogImage },
  );

  if (ogImage === DEFAULT_OG_IMAGE) {
    tags.push(
      { kind: 'meta', attribute: 'property', key: 'og:image:type', content: 'image/jpeg' },
      { kind: 'meta', attribute: 'property', key: 'og:image:width', content: '1200' },
      { kind: 'meta', attribute: 'property', key: 'og:image:height', content: '630' },
      { kind: 'meta', attribute: 'property', key: 'og:image:alt', content: DEFAULT_OG_IMAGE_ALT },
      { kind: 'meta', attribute: 'name', key: 'twitter:image:alt', content: DEFAULT_OG_IMAGE_ALT },
    );
  }

  const post = meta.article;
  if (post) {
    tags.push({ kind: 'meta', attribute: 'property', key: 'article:published_time', content: post.publishedAt });
    if (post.updatedAt) tags.push({ kind: 'meta', attribute: 'property', key: 'article:modified_time', content: post.updatedAt });
  }

  if (meta.breadcrumb) {
    tags.push({
      kind: 'jsonld',
      id: 'ld-breadcrumb',
      data: {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: meta.breadcrumb.map((item, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: item.name,
          item: absoluteUrl(item.path),
        })),
      },
    });
  }

  if (post) {
    const image = post.coverImage ?? post.heroImage;
    tags.push({
      kind: 'jsonld',
      id: 'ld-article',
      data: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: meta.description,
        datePublished: post.publishedAt,
        ...(post.updatedAt ? { dateModified: post.updatedAt } : {}),
        ...(image ? { image: { '@type': 'ImageObject', url: image.src, width: image.width, height: image.height } } : {}),
        ...(post.categories.length ? { articleSection: post.categories.map((c) => c.label) } : {}),
        ...(post.tags.length ? { keywords: post.tags.map((t) => t.label).join(', ') } : {}),
        publisher: { '@id': `${SITE_URL}/#organization` },
        mainEntityOfPage: absoluteUrl(meta.path),
        url: absoluteUrl(meta.path),
      },
    });
  }
  return tags;
}

/** Metadata for the static routes listed in site-config, or null for other paths. */
export function staticRouteMeta(pathname: string): PageMeta | null {
  const entry = findRouteSeo(pathname);
  if (!entry) return null;
  return {
    path: entry.path,
    title: entry.title,
    description: entry.description,
    robots: entry.robots,
    canonicalPath: entry.path,
    ogImage: entry.path === '/about' ? TAMMY_OG_IMAGE : undefined,
    breadcrumb:
      entry.path === '/'
        ? undefined
        : [
            { name: 'Home', path: '/' },
            { name: entry.breadcrumb, path: entry.path },
          ],
  };
}

export function postPageMeta(post: BlogPost): PageMeta {
  return {
    path: post.path,
    title: `${post.title} | ${SITE_NAME}`,
    description: clampDescription(post.seoDescription ?? post.excerpt ?? post.title),
    canonicalPath: post.path,
    ogType: 'article',
    ogImage: (post.coverImage ?? post.heroImage)?.src,
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog' },
      { name: post.title, path: post.path },
    ],
    article: post,
  };
}

export const notFoundMeta = (path: string): PageMeta => ({
  path,
  title: notFoundSeo.title,
  description: notFoundSeo.description,
  robots: notFoundSeo.robots,
});

/** Blog content temporarily couldn't be loaded: keep the page out of search results. */
export const unavailableMeta = (path: string): PageMeta => ({
  path,
  title: `Blog temporarily unavailable | ${SITE_NAME}`,
  description: 'The Leadership Learners blog is temporarily unavailable. Please try again shortly.',
  robots: 'noindex, follow',
});

// --- Browser: apply tags to the live document --------------------------------

function upsert<T extends HTMLElement>(selector: string, create: () => T): T {
  let el = document.head.querySelector<T>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  return el;
}

/** Applies one page's metadata to the current document. Idempotent. */
export function applyPageMeta(meta: PageMeta) {
  const tags = headTags(meta);
  const present = new Set<string>();

  for (const tag of tags) {
    switch (tag.kind) {
      case 'title':
        document.title = tag.text;
        break;
      case 'meta': {
        present.add(`meta:${tag.key}`);
        const el = upsert<HTMLMetaElement>(`meta[${tag.attribute}="${tag.key}"]`, () => {
          const created = document.createElement('meta');
          created.setAttribute(tag.attribute, tag.key);
          return created;
        });
        el.setAttribute('content', tag.content);
        break;
      }
      case 'link': {
        present.add(`link:${tag.rel}`);
        const el = upsert<HTMLLinkElement>(`link[rel="${tag.rel}"]`, () => {
          const created = document.createElement('link');
          created.setAttribute('rel', tag.rel);
          return created;
        });
        el.setAttribute('href', tag.href);
        break;
      }
      case 'jsonld': {
        present.add(`jsonld:${tag.id}`);
        const el = upsert<HTMLScriptElement>(`script#${tag.id}`, () => {
          const created = document.createElement('script');
          created.id = tag.id;
          created.type = 'application/ld+json';
          return created;
        });
        el.textContent = JSON.stringify(tag.data);
        break;
      }
    }
  }

  for (const rel of OPTIONAL_TAGS.links) {
    if (!present.has(`link:${rel}`)) document.head.querySelector(`link[rel="${rel}"]`)?.remove();
  }
  for (const key of OPTIONAL_TAGS.meta) {
    if (!present.has(`meta:${key}`)) document.head.querySelector(`meta[property="${key}"]`)?.remove();
  }
  for (const id of OPTIONAL_TAGS.jsonld) {
    if (!present.has(`jsonld:${id}`)) document.getElementById(id)?.remove();
  }
}
