// Assembles a server-rendered page from the built SPA shell (index.html):
// swaps the shell's default route metadata for the page's own, adds the
// critical CSS, the rendered app markup and the data it was rendered with.
import type { HeadTag } from '../../src/lib/seo.ts';
import type { BlogInitialData } from '../../src/types/blog.ts';
import { BLOG_DATA_ELEMENT_ID } from '../../src/lib/blog-initial-data.ts';

const ROUTE_META = /<!--\s*route-meta:start\s*-->[\s\S]*?<!--\s*route-meta:end\s*-->/;
const ROOT = '<div id="root"></div>';

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** JSON that is safe inside a <script> element (no `</script>`, no HTML comment or line-separator tricks). */
export const scriptSafeJson = (data: unknown) =>
  JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');

export function renderHeadTags(tags: HeadTag[]): string {
  return tags
    .map((tag) => {
      switch (tag.kind) {
        case 'title':
          return `<title>${escapeHtml(tag.text)}</title>`;
        case 'meta':
          return `<meta ${tag.attribute}="${escapeHtml(tag.key)}" content="${escapeHtml(tag.content)}" />`;
        case 'link':
          return `<link rel="${escapeHtml(tag.rel)}" href="${escapeHtml(tag.href)}" />`;
        case 'jsonld':
          return `<script id="${escapeHtml(tag.id)}" type="application/ld+json">${scriptSafeJson(tag.data)}</script>`;
      }
    })
    .join('\n    ');
}

export function renderHtmlDocument(input: {
  template: string;
  headTags: HeadTag[];
  styles: string;
  appHtml: string;
  blogData: BlogInitialData;
}): string {
  const { template, headTags, styles, appHtml, blogData } = input;
  if (!ROUTE_META.test(template) || !template.includes(ROOT)) {
    throw new Error('index.html is missing the route-meta markers or the empty #root element');
  }
  const dataScript = `<script id="${BLOG_DATA_ELEMENT_ID}" type="application/json">${scriptSafeJson(blogData)}</script>`;
  return template
    .replace(ROUTE_META, () => renderHeadTags(headTags))
    .replace('</head>', () => `${styles}\n  </head>`)
    .replace(ROOT, () => `<div id="root">${appHtml}</div>\n    ${dataScript}`);
}
