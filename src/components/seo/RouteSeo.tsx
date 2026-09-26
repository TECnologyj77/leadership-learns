import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { applyPageMeta, notFoundMeta, staticRouteMeta } from '../../lib/seo';
import { slugFromPostPath } from '../../lib/blog-paths';

/**
 * Renders nothing. On every route change, sets document title, meta
 * description, canonical link, robots, Open Graph/Twitter tags, and
 * BreadcrumbList JSON-LD for the current page.
 *
 * Article pages (/post/<slug>) are skipped: their metadata depends on the
 * loaded post, so BlogPost applies it (and the server already rendered it
 * into the HTML for direct requests).
 *
 * Organization/WebSite/Person structured data don't change per route, so
 * they're static <script> tags in index.html instead — that also keeps them
 * visible to crawlers that don't execute JavaScript. Mount this once, high
 * in the tree (see App.tsx), not per-page.
 */
const RouteSeo = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (slugFromPostPath(pathname) !== null) return;
    // Unknown paths match the catch-all <Route path="*"> NotFound page.
    applyPageMeta(staticRouteMeta(pathname) ?? notFoundMeta(pathname));
  }, [pathname]);

  return null;
};

export default RouteSeo;
