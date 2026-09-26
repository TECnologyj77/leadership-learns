// Last-known-good copies of normalized blog data in Netlify Blobs, used only
// when Wix is unreachable. Only validated site DTOs are stored: never Wix
// payloads, tokens or errors.
//
// Production uses a site-wide store so the copy survives new deploys. Every
// other context (Deploy Previews, branch deploys, local dev) uses a
// deploy-scoped store, so previews can never overwrite production's copy.
// Outside Netlify (plain `vite` dev, tests) Blobs isn't configured and the
// store quietly does nothing.
import { getDeployStore, getStore } from '@netlify/blobs';
import type { BlogPost, BlogSummary } from '../../src/types/blog.ts';

const STORE_NAME = 'wix-blog';
const KEY_PREFIX = 'v1'; // Bump when the DTO shape changes so old copies are ignored.
const LIST_KEY = `${KEY_PREFIX}/list`;
const postKey = (slug: string) => `${KEY_PREFIX}/post/${encodeURIComponent(slug)}`;

export interface Saved<T> {
  savedAt: string;
  data: T;
}

export interface BlogStore {
  readList(): Promise<Saved<BlogSummary[]> | null>;
  saveList(posts: BlogSummary[]): Promise<void>;
  readPost(slug: string): Promise<Saved<BlogPost> | null>;
  savePost(post: BlogPost): Promise<void>;
  deletePost(slug: string): Promise<void>;
}

type BlobStore = ReturnType<typeof getStore>;

const warn = (action: string, error: unknown) =>
  console.warn(`[wix-blog] last-known-good ${action} skipped:`, error instanceof Error ? error.name : 'unknown error');

function isSaved(value: unknown): value is Saved<unknown> {
  return !!value && typeof value === 'object' && typeof (value as Saved<unknown>).savedAt === 'string' && 'data' in value;
}

export function openBlogStore(deployContext: string | undefined): BlogStore {
  let store: BlobStore | null | undefined;
  const blobs = (): BlobStore | null => {
    if (store !== undefined) return store;
    try {
      // Strong consistency: a deleted (unpublished) post must be gone for every
      // reader at once. Reads only happen during Wix outages, so speed matters less.
      store = deployContext === 'production' ? getStore({ name: STORE_NAME, consistency: 'strong' }) : getDeployStore(STORE_NAME);
    } catch (error) {
      warn('open', error);
      store = null;
    }
    return store;
  };

  async function read<T>(key: string): Promise<Saved<T> | null> {
    const target = blobs();
    if (!target) return null;
    try {
      const value: unknown = await target.get(key, { type: 'json' });
      return isSaved(value) ? (value as Saved<T>) : null;
    } catch (error) {
      warn('read', error);
      return null;
    }
  }

  async function write(key: string, data: unknown): Promise<void> {
    const target = blobs();
    if (!target) return;
    try {
      await target.setJSON(key, { savedAt: new Date().toISOString(), data });
    } catch (error) {
      warn('write', error);
    }
  }

  return {
    readList: () => read<BlogSummary[]>(LIST_KEY),
    saveList: (posts) => write(LIST_KEY, posts),
    readPost: (slug) => read<BlogPost>(postKey(slug)),
    savePost: (post) => write(postKey(post.slug), post),
    async deletePost(slug) {
      const target = blobs();
      if (!target) return;
      try {
        await target.delete(postKey(slug));
      } catch (error) {
        warn('delete', error);
      }
    },
  };
}
