// Site-owned blog contract. Wix responses are validated and mapped to these
// shapes inside netlify/lib; nothing in src/ sees Wix or Ricos types.

export interface BlogImage {
  /** Wix image CDN URL, already validated. */
  src: string;
  /** Width-descriptor srcset of the same image. */
  srcSet: string;
  width: number;
  height: number;
  /** Editorial description from Wix; null when none was written (never invented). */
  alt: string | null;
}

export interface BlogTerm {
  id: string;
  label: string;
}

export interface BlogLink {
  /** http(s), mailto: or tel: only. */
  href: string;
  /** Wix asked for the link to open in a new tab. */
  newTab: boolean;
  nofollow: boolean;
}

export interface BlogTextMarks {
  bold?: true;
  italic?: true;
  underline?: true;
  link?: BlogLink;
}

export type BlogInline =
  | { type: 'text'; text: string; marks: BlogTextMarks }
  | { type: 'lineBreak' };

export type BlogBlock =
  | { type: 'paragraph'; content: BlogInline[] }
  | { type: 'heading'; level: 2 | 3 | 4; content: BlogInline[] }
  | { type: 'image'; image: BlogImage; caption: string | null; link: BlogLink | null }
  | { type: 'gallery'; images: BlogImage[] }
  | { type: 'button'; label: string; link: BlogLink }
  | { type: 'list'; ordered: boolean; items: BlogBlock[][] }
  | { type: 'quote'; content: BlogBlock[] }
  | { type: 'divider' }
  /** Meaningful Wix content this site can't render yet. Shown as a notice and reported, never dropped. */
  | { type: 'unsupported'; wixType: string };

export interface BlogSummary {
  id: string;
  slug: string;
  /** Local article path, /post/<slug>. */
  path: string;
  title: string;
  excerpt: string | null;
  /** ISO 8601 (Wix firstPublishedDate). */
  publishedAt: string;
  /** ISO 8601 (Wix lastPublishedDate), null when unavailable. */
  updatedAt: string | null;
  /** Wix cover image: used for cards, social previews and structured data. */
  coverImage: BlogImage | null;
  categories: BlogTerm[];
  minutesToRead: number | null;
}

export interface BlogPost extends BlogSummary {
  /** Image Wix shows at the top of the article page, when one is set. */
  heroImage: BlogImage | null;
  tags: BlogTerm[];
  /** Wix SEO description, when the author wrote one. */
  seoDescription: string | null;
  blocks: BlogBlock[];
}

export interface BlogResponseMeta {
  /** 'last-known-good' means Wix was unreachable and a saved copy was served. */
  source: 'wix' | 'last-known-good';
  fetchedAt: string;
  stale: boolean;
}

export interface BlogResponse<T> {
  data: T;
  meta: BlogResponseMeta;
}

/**
 * Data the server embeds in HTML for /blog and /post/<slug> so the first
 * client render matches the server render.
 */
export type BlogInitialData =
  | { page: 'list'; status: 'ok'; posts: BlogSummary[] }
  | { page: 'list'; status: 'unavailable' }
  | { page: 'post'; status: 'ok'; slug: string; post: BlogPost }
  | { page: 'post'; status: 'not_found' | 'unavailable'; slug: string };
