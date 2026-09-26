// Blog data the server rendered a page with. It's embedded in the HTML as
// JSON so the first browser render (hydration) uses exactly the same data.
import { createContext, useContext } from 'react';
import type { BlogInitialData } from '../types/blog';

export const BLOG_DATA_ELEMENT_ID = 'blog-initial-data';

export const BlogInitialDataContext = createContext<BlogInitialData | null>(null);

export const useBlogInitialData = () => useContext(BlogInitialDataContext);

/** Reads the server-embedded blog data, if this page was server-rendered. */
export function readEmbeddedBlogData(): BlogInitialData | null {
  const element = document.getElementById(BLOG_DATA_ELEMENT_ID);
  if (!element?.textContent) return null;
  try {
    return JSON.parse(element.textContent) as BlogInitialData;
  } catch {
    return null;
  }
}
