import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Root from './Root';
import { initializeAnalytics } from './lib/analytics';
import { readEmbeddedBlogData } from './lib/blog-initial-data';

import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/manrope/600.css';
import '@fontsource/manrope/700.css';
import './index.css';

initializeAnalytics();

const container = document.getElementById('root')!;
// /blog and /post/<slug> arrive server-rendered with their data embedded;
// every other route is a client-rendered SPA page.
const blogData = readEmbeddedBlogData();
const app = (
  <BrowserRouter>
    <Root blogData={blogData} />
  </BrowserRouter>
);

if (blogData && container.hasChildNodes()) hydrateRoot(container, app);
else createRoot(container).render(app);
