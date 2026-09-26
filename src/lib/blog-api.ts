// Browser client for the site's own blog endpoints (netlify/functions). The
// browser never talks to Wix directly.
import type { BlogPost, BlogResponse, BlogSummary } from '../types/blog';

export type PostListState = { status: 'ok'; posts: BlogSummary[] } | { status: 'unavailable' };
export type PostState = { status: 'ok'; post: BlogPost } | { status: 'not_found' } | { status: 'unavailable' };

async function getJson<T>(url: string, signal: AbortSignal): Promise<{ status: number; body: T | null }> {
  try {
    const response = await fetch(url, { signal, headers: { Accept: 'application/json' } });
    const body = response.ok ? ((await response.json()) as T) : null;
    return { status: response.status, body };
  } catch (error) {
    if (signal.aborted) throw error;
    return { status: 0, body: null };
  }
}

export async function fetchPostList(signal: AbortSignal): Promise<PostListState> {
  const { body } = await getJson<BlogResponse<BlogSummary[]>>('/api/blog/posts', signal);
  return Array.isArray(body?.data) ? { status: 'ok', posts: body.data } : { status: 'unavailable' };
}

export async function fetchPost(slug: string, signal: AbortSignal): Promise<PostState> {
  const { status, body } = await getJson<BlogResponse<BlogPost>>(`/api/blog/posts/${encodeURIComponent(slug)}`, signal);
  if (status === 404) return { status: 'not_found' };
  return body?.data?.slug ? { status: 'ok', post: body.data } : { status: 'unavailable' };
}
