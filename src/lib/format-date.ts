import { SITE_TIME_ZONE } from './site-config';

// A fixed zone (not the visitor's) keeps the server render and the browser
// render identical, and matches the dates Wix shows for the same posts.
const longDate = new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeZone: SITE_TIME_ZONE });

export const formatPostDate = (iso: string) => longDate.format(new Date(iso));
