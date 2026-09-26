// SSR entry, built by `vite build --ssr` into netlify/ssr/ for the blog page
// function (and loaded directly by the Vite dev server). Uses MUI's
// documented Emotion setup: styles are extracted into <head> so hydration
// finds exactly the markup the browser would render.
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import createEmotionServer from '@emotion/server/create-instance';
import Root from '../Root';
import type { RenderApp } from '../types/ssr';

export const renderApp: RenderApp = (url, blogData) => {
  // Same key as Emotion's default browser cache, so it adopts these styles.
  const cache = createCache({ key: 'css' });
  const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);
  const html = renderToString(
    <CacheProvider value={cache}>
      <StaticRouter location={url}>
        <Root blogData={blogData} />
      </StaticRouter>
    </CacheProvider>,
  );
  return { html, styles: constructStyleTagsFromChunks(extractCriticalToChunks(html)) };
};
