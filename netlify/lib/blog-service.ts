// Loads blog data for the endpoints and pages: fetch from Wix, validate and
// normalize, remember a last-known-good copy, and fall back to that copy
// (for up to MAX_STALE_MS) only when Wix is unreachable or returns bad data.
//
// A confirmed "no such post" from Wix is authoritative: it deletes the saved
// copy and is never answered from the fallback, so unpublished posts don't
// come back during an outage. Placeholder or fixture posts are never used.
import type { BlogPost, BlogResponseMeta, BlogSummary } from '../../src/types/blog.ts';
import { isValidPostSlug } from '../../src/lib/blog-paths.ts';
import type { ContentIssue } from './ricos-to-blocks.ts';
import { InvalidWixDataError, isGatedPost, toBlogPost, toBlogSummary } from './normalize-post.ts';
import type { BlogStore, Saved } from './blog-store.ts';
import type { WixBlogSource } from './wix-blog-source.ts';

export const MAX_STALE_MS = 7 * 24 * 60 * 60 * 1000;

export type ListResult = { status: 'ok'; posts: BlogSummary[]; meta: BlogResponseMeta } | { status: 'unavailable' };

export type PostResult =
  | { status: 'ok'; post: BlogPost; meta: BlogResponseMeta }
  /** Wix knows this post under a different slug now. */
  | { status: 'moved'; path: string }
  | { status: 'not_found' }
  | { status: 'unavailable' };

export interface BlogServiceDeps {
  source: WixBlogSource;
  store: BlogStore;
  /** Lets store writes finish after the response is sent. */
  waitUntil: (promise: Promise<unknown>) => void;
  now?: () => Date;
}

const logFailure = (operation: string, error: unknown) =>
  // Only the error's own (sanitized) message: no payloads, headers or tokens.
  console.error(
    `[wix-blog] ${operation}:`,
    error instanceof Error && ['WixUnavailableError', 'InvalidWixDataError'].includes(error.name) ? error.message : 'unexpected error',
  );

function logContentIssues(slug: string, issues: ContentIssue[]) {
  if (!issues.length) return;
  const counts = new Map<string, number>();
  for (const issue of issues) counts.set(`${issue.kind}:${issue.wixType}`, (counts.get(`${issue.kind}:${issue.wixType}`) ?? 0) + 1);
  const summary = [...counts].map(([key, count]) => `${key} x${count}`).join(', ');
  const log = issues.some((issue) => issue.kind !== 'missing-alt-text') ? console.error : console.warn;
  log(`[wix-blog] content issues in "${slug}": ${summary}`);
}

export function createBlogService({ source, store, waitUntil, now = () => new Date() }: BlogServiceDeps) {
  const freshMeta = (): BlogResponseMeta => ({ source: 'wix', fetchedAt: now().toISOString(), stale: false });
  const staleMeta = (saved: Saved<unknown>): BlogResponseMeta => ({ source: 'last-known-good', fetchedAt: saved.savedAt, stale: true });
  const usable = <T>(saved: Saved<T> | null): saved is Saved<T> =>
    !!saved && now().getTime() - new Date(saved.savedAt).getTime() <= MAX_STALE_MS;

  async function loadPostList(): Promise<ListResult> {
    try {
      const [raw, labels] = await Promise.all([source.fetchPublishedPosts(), source.fetchTermLabels()]);
      const posts: BlogSummary[] = [];
      for (const post of raw.filter((candidate) => !isGatedPost(candidate))) {
        try {
          posts.push(toBlogSummary(post, labels));
        } catch (error) {
          logFailure('skipped a post', error);
        }
      }
      // Every post failing validation means Wix's data changed shape: don't
      // replace good data with an empty list.
      if (raw.length > 0 && posts.length === 0) throw new InvalidWixDataError('no post in the list passed validation');
      waitUntil(store.saveList(posts));
      return { status: 'ok', posts, meta: freshMeta() };
    } catch (error) {
      logFailure('post list unavailable', error);
      const saved = await store.readList();
      return usable(saved) ? { status: 'ok', posts: saved.data, meta: staleMeta(saved) } : { status: 'unavailable' };
    }
  }

  async function loadPost(slug: string): Promise<PostResult> {
    if (!isValidPostSlug(slug)) return { status: 'not_found' };
    try {
      const [raw, labels] = await Promise.all([source.fetchPostBySlug(slug), source.fetchTermLabels()]);
      if (!raw || isGatedPost(raw)) {
        waitUntil(store.deletePost(slug));
        return { status: 'not_found' };
      }
      const { post, issues } = toBlogPost(raw, labels);
      if (post.slug !== slug) return { status: 'moved', path: post.path };
      logContentIssues(slug, issues);
      waitUntil(store.savePost(post));
      return { status: 'ok', post, meta: freshMeta() };
    } catch (error) {
      logFailure(`post "${slug}" unavailable`, error);
      const [saved, savedList] = await Promise.all([store.readPost(slug), store.readList()]);
      // Serve a saved article only if the last good list still had it published.
      const stillListed = savedList?.data.some((post) => post.slug === slug) ?? false;
      return usable(saved) && stillListed ? { status: 'ok', post: saved.data, meta: staleMeta(saved) } : { status: 'unavailable' };
    }
  }

  return { loadPostList, loadPost };
}

export type BlogService = ReturnType<typeof createBlogService>;
