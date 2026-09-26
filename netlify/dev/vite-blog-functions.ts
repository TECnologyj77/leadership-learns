// Development only: `vite` doesn't run Netlify Functions, so this plugin
// routes the blog paths to the same handler modules the functions use.
// Keep ROUTES in sync with the `config.path` values in netlify/functions/.
import { readFileSync } from 'node:fs';
import type { IncomingMessage, ServerResponse } from 'node:http';
import type { Plugin, ViteDevServer } from 'vite';
import type { HandlerContext } from '../lib/handler-context.ts';
import type { RenderApp } from '../../src/types/ssr.ts';

type Route = { pattern: RegExp; handle: (server: ViteDevServer, request: Request, ctx: HandlerContext) => Promise<Response> };

const load = <T>(server: ViteDevServer, path: string) => server.ssrLoadModule(path) as Promise<T>;
type ApiModule = typeof import('../lib/blog-api-handlers.ts');
type SitemapModule = typeof import('../lib/sitemap-handler.ts');
type PageModule = typeof import('../lib/blog-page-handler.ts');
type RenderModule = { renderApp: RenderApp };

async function renderPage(server: ViteDevServer, request: Request, ctx: HandlerContext) {
  const [{ createBlogPageHandler }, { renderApp }] = await Promise.all([
    load<PageModule>(server, '/netlify/lib/blog-page-handler.ts'),
    load<RenderModule>(server, '/src/server/render-app.tsx'),
  ]);
  const template = await server.transformIndexHtml(new URL(request.url).pathname, readFileSync('index.html', 'utf8'));
  return createBlogPageHandler({ renderApp, template })(request, ctx);
}

const ROUTES: Route[] = [
  {
    pattern: /^\/api\/blog\/posts$/,
    handle: async (server, _request, ctx) => (await load<ApiModule>(server, '/netlify/lib/blog-api-handlers.ts')).handlePostList(ctx),
  },
  {
    pattern: /^\/api\/blog\/posts\/[^/]+$/,
    handle: async (server, request, ctx) => (await load<ApiModule>(server, '/netlify/lib/blog-api-handlers.ts')).handlePost(request, ctx),
  },
  {
    pattern: /^\/sitemap\.xml$/,
    handle: async (server, _request, ctx) => (await load<SitemapModule>(server, '/netlify/lib/sitemap-handler.ts')).handleSitemap(ctx),
  },
  { pattern: /^\/blog$/, handle: renderPage },
  { pattern: /^\/post\/[^/]+$/, handle: renderPage },
];

async function send(res: ServerResponse, response: Response) {
  res.statusCode = response.status;
  response.headers.forEach((value, name) => res.setHeader(name, value));
  res.end(Buffer.from(await response.arrayBuffer()));
}

export function blogFunctionsDev(): Plugin {
  return {
    name: 'blog-functions-dev',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use(async (req: IncomingMessage, res: ServerResponse, next: (error?: unknown) => void) => {
        if (req.method !== 'GET' && req.method !== 'HEAD') return next();
        const url = new URL(req.url ?? '/', `http://${req.headers.host ?? 'localhost'}`);
        const route = ROUTES.find((candidate) => candidate.pattern.test(url.pathname));
        if (!route) return next();
        const ctx: HandlerContext = { deployContext: 'dev', waitUntil: (promise) => void promise.catch(() => {}) };
        try {
          await send(res, await route.handle(server, new Request(url, { method: req.method }), ctx));
        } catch (error) {
          if (error instanceof Error) server.ssrFixStacktrace(error);
          next(error);
        }
      });
    },
  };
}
