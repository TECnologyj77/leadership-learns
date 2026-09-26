// Server-renders /blog and /post/<slug>. Plain JS (the one exception to the
// TypeScript functions) because it imports the SSR bundle that `npm run build`
// generates into netlify/ssr/, which doesn't exist at type-check time. All
// logic lives in the typed ../lib/blog-page-handler.ts.
import { renderApp } from '../ssr/render-app.js';
import template from '../ssr/index-template.js';
import { createBlogPageHandler } from '../lib/blog-page-handler.ts';
import { fromNetlifyContext } from '../lib/handler-context.ts';

export default async (request, context) =>
  createBlogPageHandler({ renderApp, template })(request, fromNetlifyContext(context));

export const config = { path: ['/blog', '/post/:slug'] };
