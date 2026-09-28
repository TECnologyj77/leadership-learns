import type { BlogInitialData } from './blog';

export interface RenderedApp {
  /** Markup for inside <div id="root">. */
  html: string;
  /** <style> tags with the critical CSS for that markup, for <head>. */
  styles: string;
}

/** Server-side render of the whole app at `url`, with data for blog routes. */
export type RenderApp = (url: string, blogData: BlogInitialData | null) => RenderedApp;
