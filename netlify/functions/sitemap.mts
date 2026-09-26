import type { Config, Context } from '@netlify/functions';
import { fromNetlifyContext } from '../lib/handler-context.ts';
import { handleSitemap } from '../lib/sitemap-handler.ts';

export default async (_request: Request, context: Context) => handleSitemap(fromNetlifyContext(context));

export const config: Config = { path: '/sitemap.xml' };
