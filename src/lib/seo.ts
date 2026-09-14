// Head-tag and JSON-LD helpers for RouteSeo.tsx. Pure DOM/data functions with
// no React dependency, kept separate so RouteSeo stays focused on wiring
// route data to these.
import { absoluteUrl, SITE_NAME, SITE_URL, routeSeo, type RouteSeoEntry } from './site-config';
import type { BlogPost } from '../types/blog';

const DEFAULT_OG_IMAGE = absoluteUrl('/og-logo.jpg');

/** Finds the static route entry for a pathname, or null if it needs special handling. */
export const findRouteSeo = (pathname: string): RouteSeoEntry | null =>
  routeSeo.find((r) => r.path === pathname) ?? null;

// --- <head> tag upsert helpers -------------------------------------------
// Each creates the element on first use and updates it thereafter, so
// navigating between routes never leaves stale or duplicate tags behind.

function upsertMetaByName(name: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertMetaByProperty(property: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLinkRel(rel: string, href: string | null) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (href === null) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function upsertJsonLd(id: string, data: object | null) {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (data === null) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement('script');
    el.id = id;
    el.type = 'application/ld+json';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

interface PageMeta {
  path: string;
  title: string;
  description: string;
  robots?: string;
  /** Omit to skip the canonical tag entirely (used for the 404 route). */
  canonicalPath?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  breadcrumb?: Array<{ name: string; path: string }>;
  article?: BlogPost;
}

/** Applies one page's metadata to the current document. Idempotent. */
export function applyPageMeta(meta: PageMeta) {
  document.title = meta.title;
  upsertMetaByName('description', meta.description);
  upsertMetaByName('robots', meta.robots ?? 'index, follow');
  upsertLinkRel('canonical', meta.canonicalPath !== undefined ? absoluteUrl(meta.canonicalPath) : null);

  const ogImage = meta.ogImage ?? DEFAULT_OG_IMAGE;
  upsertMetaByProperty('og:site_name', SITE_NAME);
  upsertMetaByProperty('og:type', meta.ogType ?? 'website');
  upsertMetaByProperty('og:title', meta.title);
  upsertMetaByProperty('og:description', meta.description);
  upsertMetaByProperty('og:url', absoluteUrl(meta.path));
  upsertMetaByProperty('og:image', ogImage);

  upsertMetaByName('twitter:card', 'summary_large_image');
  upsertMetaByName('twitter:title', meta.title);
  upsertMetaByName('twitter:description', meta.description);
  upsertMetaByName('twitter:image', ogImage);

  upsertJsonLd(
    'ld-breadcrumb',
    meta.breadcrumb
      ? {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: meta.breadcrumb.map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: item.name,
            item: absoluteUrl(item.path),
          })),
        }
      : null,
  );

  upsertJsonLd(
    'ld-article',
    meta.article
      ? {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: meta.article.title,
          description: meta.article.excerpt,
          datePublished: meta.article.publishedAt,
          author: { '@type': 'Organization', name: meta.article.author },
          publisher: { '@id': `${SITE_URL}/#organization` },
          mainEntityOfPage: absoluteUrl(meta.path),
          url: absoluteUrl(meta.path),
        }
      : null,
  );
}

export const TAMMY_OG_IMAGE = absoluteUrl('/og-tammy.jpg');
