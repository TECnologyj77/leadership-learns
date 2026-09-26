import type { Config, Context } from '@netlify/functions';
import { fromNetlifyContext } from '../lib/handler-context.ts';
import { handlePost } from '../lib/blog-api-handlers.ts';

export default async (request: Request, context: Context) => handlePost(request, fromNetlifyContext(context));

export const config: Config = { path: '/api/blog/posts/:slug' };
