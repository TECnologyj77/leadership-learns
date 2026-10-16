import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Root from './Root';
import { initializeAnalytics } from './lib/analytics';
import { readEmbeddedBlogData } from './lib/blog-initial-data';

import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import './theme/fonts.css';
import './index.css';

initializeAnalytics();

const container = document.getElementById('root')!;
// Static routes and blog pages arrive with server-rendered markup; blog pages
// also embed their data. The empty shell remains available during development.
const blogData = readEmbeddedBlogData();
const app = (
  <BrowserRouter>
    <Root blogData={blogData} />
  </BrowserRouter>
);

if (container.hasChildNodes()) hydrateRoot(container, app);
else createRoot(container).render(app);
