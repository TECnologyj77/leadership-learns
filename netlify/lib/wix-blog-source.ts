// The only module that talks to Wix. Uses the official JavaScript SDK with
// anonymous visitor OAuth: the SDK exchanges the Client ID for visitor tokens
// and refreshes them itself. Tokens stay in this module's memory for the life
// of a warm function instance; they're never persisted, logged or returned.
import { createClient, OAuthStrategy } from '@wix/sdk';
import { categories, posts, tags } from '@wix/blog';
import type { TermLabels, WixPostLike } from './normalize-post.ts';
import { readWixClientId } from './wix-config.ts';

const REQUEST_TIMEOUT_MS = 8000;
const PAGE_SIZE = 100; // Query Posts maximum.
const MAX_PAGES = 50; // Guards against a paging loop; 5,000 posts is far beyond this blog.
// Detail requests need the full article; SEO carries the author's description.
const DETAIL_FIELDSETS = ['RICH_CONTENT', 'SEO', 'URL'] as const;

/** Wix couldn't be reached or answered with an error. The message is safe to log. */
export class WixUnavailableError extends Error {
  readonly status: number | null;
  readonly code: string | null;
  constructor(operation: string, status: number | null, code: string | null, reason?: string) {
    super(`${operation} failed${status ? ` (HTTP ${status})` : ''}${code ? ` [${code}]` : ''}${reason ? `: ${reason}` : ''}`);
    this.name = 'WixUnavailableError';
    this.status = status;
    this.code = code;
  }
}

const createWixClient = () =>
  createClient({
    auth: OAuthStrategy({ clientId: readWixClientId() }),
    modules: { posts, categories, tags },
  });

let client: ReturnType<typeof createWixClient> | null = null;
const wix = () => (client ??= createWixClient());

interface SdkErrorLike {
  status?: unknown;
  response?: { status?: unknown };
  details?: { applicationError?: { code?: unknown } };
  name?: unknown;
}

const statusOf = (error: unknown): number | null => {
  const e = error as SdkErrorLike | null;
  const status = e?.status ?? e?.response?.status;
  return typeof status === 'number' ? status : null;
};

const codeOf = (error: unknown): string | null => {
  const code = (error as SdkErrorLike | null)?.details?.applicationError?.code;
  return typeof code === 'string' ? code : null;
};

function withTimeout<T>(promise: Promise<T>, operation: string): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new WixUnavailableError(operation, null, null, 'timed out')), REQUEST_TIMEOUT_MS);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

/**
 * Runs one SDK call with a timeout. A 401/403 gets exactly one retry with a
 * fresh client (new visitor tokens). Everything else surfaces as
 * WixUnavailableError, except statuses listed in `passThrough`.
 */
async function call<T>(operation: string, run: (sdk: ReturnType<typeof wix>) => Promise<T>, passThrough: number[] = []): Promise<T> {
  for (let attempt = 0; ; attempt++) {
    try {
      return await withTimeout(run(wix()), operation);
    } catch (error) {
      if (error instanceof WixUnavailableError) throw error;
      const status = statusOf(error);
      if (status !== null && passThrough.includes(status)) throw error;
      if ((status === 401 || status === 403) && attempt === 0) {
        client = null;
        continue;
      }
      const reason = (error as SdkErrorLike | null)?.name === 'WixConfigError' ? 'configuration' : undefined;
      throw new WixUnavailableError(operation, status, codeOf(error), reason);
    }
  }
}

/** Every published post (base fields), following Wix's cursor paging to the end. */
export async function fetchPublishedPosts(): Promise<WixPostLike[]> {
  return call('Query Posts', async (sdk) => {
    const all: WixPostLike[] = [];
    let page = await sdk.posts.queryPosts().limit(PAGE_SIZE).find();
    all.push(...(page.items as WixPostLike[]));
    for (let pages = 1; page.hasNext(); pages++) {
      if (pages >= MAX_PAGES) throw new Error('Query Posts paging did not end');
      page = await page.next();
      all.push(...(page.items as WixPostLike[]));
    }
    return all;
  });
}

/** One published post with rich content, or null when Wix has no published post at that slug. */
export async function fetchPostBySlug(slug: string): Promise<WixPostLike | null> {
  try {
    const { post } = await call(
      'Get Post By Slug',
      (sdk) => sdk.posts.getPostBySlug(slug, { fieldsets: [...DETAIL_FIELDSETS] as never }),
      [404],
    );
    return (post as WixPostLike | undefined) ?? null;
  } catch (error) {
    if (statusOf(error) === 404) return null;
    throw error;
  }
}

async function queryAllTerms(
  operation: string,
  query: () => { find(): Promise<{ items: unknown[]; hasNext(): boolean; next(): Promise<unknown> }> },
): Promise<Map<string, string>> {
  const labels = new Map<string, string>();
  let page = await query().find();
  for (let pages = 1; ; pages++) {
    for (const item of page.items as Array<{ _id?: unknown; label?: unknown }>) {
      if (typeof item._id === 'string' && typeof item.label === 'string' && item.label.trim()) {
        labels.set(item._id, item.label.trim());
      }
    }
    if (!page.hasNext()) return labels;
    if (pages >= MAX_PAGES) throw new Error(`${operation} paging did not end`);
    page = (await page.next()) as typeof page;
  }
}

/** Category and tag labels, so posts can show names instead of IDs. */
export async function fetchTermLabels(): Promise<TermLabels> {
  const [categoryLabels, tagLabels] = await Promise.all([
    call('Query Categories', (sdk) => queryAllTerms('Query Categories', () => sdk.categories.queryCategories().limit(PAGE_SIZE))),
    call('Query Tags', (sdk) => queryAllTerms('Query Tags', () => sdk.tags.queryTags().limit(PAGE_SIZE))),
  ]);
  return { categories: categoryLabels, tags: tagLabels };
}

export interface WixBlogSource {
  fetchPublishedPosts: typeof fetchPublishedPosts;
  fetchPostBySlug: typeof fetchPostBySlug;
  fetchTermLabels: typeof fetchTermLabels;
}

export const wixBlogSource: WixBlogSource = { fetchPublishedPosts, fetchPostBySlug, fetchTermLabels };
