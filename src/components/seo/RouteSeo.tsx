import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { applyPageMeta, findRouteSeo, TAMMY_OG_IMAGE } from '../../lib/seo';
import { notFoundSeo } from '../../lib/site-config';
import { blogPosts } from '../../lib/blog-data';

/**
 * Renders nothing. On every route change, sets document title, meta
 * description, canonical link, robots, Open Graph/Twitter tags, and
 * BreadcrumbList/Article JSON-LD for the current page.
 *
 * Organization/WebSite/Person structured data don't change per route, so
 * they're static <script> tags in index.html instead — that also keeps them
 * visible to crawlers that don't execute JavaScript. Mount this once, high
 * in the tree (see App.tsx), not per-page.
 */
const RouteSeo = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const staticEntry = findRouteSeo(pathname);

    if (staticEntry) {
      applyPageMeta({
        path: pathname,
        title: staticEntry.title,
        description: staticEntry.description,
        robots: staticEntry.robots,
        canonicalPath: pathname,
        ogImage: pathname === '/about' ? TAMMY_OG_IMAGE : undefined,
        breadcrumb:
          pathname === '/'
            ? undefined
            : [
                { name: 'Home', path: '/' },
                { name: staticEntry.breadcrumb, path: pathname },
              ],
      });
      return;
    }

    const blogSlug = /^\/blog\/([^/]+)$/.exec(pathname)?.[1];
    const post = blogSlug ? blogPosts.find((p) => p.slug === blogSlug) : undefined;

    if (post) {
      applyPageMeta({
        path: pathname,
        title: `${post.title} | Leadership Learners`,
        description: post.excerpt,
        canonicalPath: pathname,
        ogType: 'article',
        breadcrumb: [
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: post.title, path: pathname },
        ],
        article: post,
      });
      return;
    }

    // Unknown path: matches the catch-all <Route path="*"> NotFound page.
    applyPageMeta({
      path: pathname,
      title: notFoundSeo.title,
      description: notFoundSeo.description,
      robots: notFoundSeo.robots,
    });
  }, [pathname]);

  return null;
};

export default RouteSeo;
