import type { Config, Context } from '@netlify/functions';
import { fromNetlifyContext } from '../lib/handler-context.ts';
import { handlePostList } from '../lib/blog-api-handlers.ts';

export default async (_request: Request, context: Context) => handlePostList(fromNetlifyContext(context));

export const config: Config = { path: '/api/blog/posts' };
