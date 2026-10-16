import { renderHtmlDocument } from '../../netlify/lib/html-document.ts';
import { headTags, notFoundMeta, staticRouteMeta } from '../lib/seo.ts';
import { routeSeo } from '../lib/site-config.ts';
import { renderApp } from './render-app.tsx';
import template from './index-template.ts';

export const staticPaths = routeSeo.map(({ path }) => path).filter((path) => path !== '/blog');

export function renderStaticPage(path: string): string {
  const meta = staticRouteMeta(path) ?? notFoundMeta(path);
  const { html, styles } = renderApp(path, null);
  return renderHtmlDocument({ template, headTags: headTags(meta), styles, appHtml: html });
}
