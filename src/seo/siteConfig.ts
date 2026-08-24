import { createAbsoluteUrl, resolveSiteUrl } from './siteUrl';

export const SITE_NAME = 'Leadership Learners';
export const SITE_URL = resolveSiteUrl(import.meta.env.VITE_SITE_URL);

export const getSiteUrl = (path: string): string => createAbsoluteUrl(SITE_URL, path);
