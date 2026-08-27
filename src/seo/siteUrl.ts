export const DEFAULT_SITE_URL = 'https://leadership-learners.netlify.app';

export const resolveSiteUrl = (configuredSiteUrl?: string): string => {
  const candidate = configuredSiteUrl?.trim() || DEFAULT_SITE_URL;
  const url = new URL(candidate);

  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new Error('VITE_SITE_URL must use the http or https protocol.');
  }

  if (url.pathname !== '/' || url.search || url.hash) {
    throw new Error('VITE_SITE_URL must be an origin without a path, query, or hash.');
  }

  return url.origin;
};

export const createAbsoluteUrl = (siteUrl: string, path: string): string => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return new URL(normalizedPath, `${siteUrl}/`).toString();
};
