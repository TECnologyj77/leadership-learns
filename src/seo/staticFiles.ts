import { createAbsoluteUrl } from './siteUrl';

export const SITEMAP_PATHS = ['/', '/corporate', '/individual', '/about'] as const;

export const createSitemapXml = (siteUrl: string): string => {
  const entries = SITEMAP_PATHS
    .map((path) => `  <url>\n    <loc>${createAbsoluteUrl(siteUrl, path)}</loc>\n  </url>`)
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
};

export const createRobotsText = (siteUrl: string): string => (
  `User-agent: *\nAllow: /\n\nSitemap: ${createAbsoluteUrl(siteUrl, '/sitemap.xml')}\n`
);
