// What the blog handlers need from their runtime, so the same handlers run
// in Netlify Functions and in the Vite dev server.
import type { Context } from '@netlify/functions';
import { createBlogService } from './blog-service.ts';
import { openBlogStore } from './blog-store.ts';
import { wixBlogSource } from './wix-blog-source.ts';

export interface HandlerContext {
  /** Netlify deploy context: 'production', 'deploy-preview', 'branch-deploy', 'dev'. */
  deployContext: string;
  waitUntil: (promise: Promise<unknown>) => void;
}

export function fromNetlifyContext(context: Pick<Context, 'deploy' | 'waitUntil'>): HandlerContext {
  return {
    deployContext: context.deploy?.context ?? 'unknown',
    waitUntil: (promise) => context.waitUntil(promise),
  };
}

export const blogServiceFor = (ctx: HandlerContext) =>
  createBlogService({ source: wixBlogSource, store: openBlogStore(ctx.deployContext), waitUntil: ctx.waitUntil });
