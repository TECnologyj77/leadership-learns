// Single source of truth for site-wide SEO facts: the production URL, brand
// identity, confirmed contact details, and per-route title/description copy.
//
// SITE_URL is the production origin. It uses www because every published
// /post/<slug> URL from the Wix site uses that host. Canonical, OG and sitemap
// URLs are all built from it, and public/robots.txt allows crawling. If the
// origin ever changes, update it in two places:
//   1. SITE_URL below (also used by the server-rendered blog pages and sitemap).
//   2. The matching literals in index.html (search for SITE_URL).
export const SITE_URL = 'https://www.leadershiplearners.com';

export const SITE_NAME = 'Leadership Learners';

// The Wix site's configured time zone (it's in the public blog pages' data).
// Blog dates are shown as calendar dates in this zone, like on Wix.
export const SITE_TIME_ZONE = 'America/Los_Angeles';

// Confirmed contact details already published in Footer.tsx / Contact.tsx.
export const ORG_EMAIL = 't.summers@leadershiplearners.org';
export const ORG_PHONE_E164 = '+18586036709';
export const ORG_PHONE_DISPLAY = '(858) 603-6709';
// The same number in the hyphenated form used by the ProfessionalService JSON-LD.
export const ORG_PHONE_SCHEMA = '+1-858-603-6709';

// Where Tammy works, in her own wording: the footer and Contact page use the
// full line, the Corporate and Individual closing CTAs the short one, and the
// Home hero the compact one.
export const SERVICE_AREA = 'San Diego County and the Imperial Valley, plus virtual sessions anywhere';
export const SERVICE_AREA_SHORT = 'In person across San Diego County & the Imperial Valley · Virtual sessions anywhere';
export const SERVICE_AREA_COMPACT = 'San Diego County & the Imperial Valley · virtual sessions anywhere';

export interface ContactCta {
  method: 'phone' | 'email';
  /** Ends each button's analytics id, e.g. home_hero_call. */
  idSuffix: 'call' | 'email';
  label: string;
  /** Spells out the number or address, for the Contact page. */
  longLabel: string;
  href: string;
}

export const CALL_CTA: ContactCta = {
  method: 'phone',
  idSuffix: 'call',
  label: `Call ${ORG_PHONE_DISPLAY}`,
  longLabel: `Call ${ORG_PHONE_DISPLAY}`,
  href: `tel:${ORG_PHONE_E164}`,
};

export const EMAIL_CTA: ContactCta = {
  method: 'email',
  idSuffix: 'email',
  label: 'Email Tammy',
  longLabel: `Email ${ORG_EMAIL}`,
  href: `mailto:${ORG_EMAIL}`,
};

// The direct CTA: the one gold button (DirectCta), worded identically
// everywhere it appears. Set this to EMAIL_CTA to make "Email Tammy" the
// direct CTA across the site; the call then becomes the secondary button
// (SecondaryCta) beside it.
export const PRIMARY_CTA: ContactCta = CALL_CTA;
export const SECONDARY_CTA: ContactCta = PRIMARY_CTA.method === 'phone' ? EMAIL_CTA : CALL_CTA;

export interface RouteSeoEntry {
  path: string;
  title: string;
  description: string;
  /** Short label used in the BreadcrumbList trail, e.g. "Corporate". */
  breadcrumb: string;
  /** Defaults to 'index, follow'. */
  robots?: string;
}

// Titles/descriptions are written from copy already approved elsewhere on
// each page (see src/assets/copy.txt and each page's own headline/subhead) —
// nothing here introduces a new claim.
export const routeSeo: RouteSeoEntry[] = [
  {
    path: '/',
    title: 'Leadership Learners | Leadership Training & Coaching',
    description:
      'Leadership training, DISC assessments, and 1:1 coaching, including for neurodivergent professionals, led by Tammy Summers in San Diego and the Imperial Valley.',
    breadcrumb: 'Home',
  },
  {
    path: '/corporate',
    title: 'Corporate Leadership Training & DISC | Leadership Learners',
    description:
      'Group leadership training and organizational DISC assessments to help growing teams communicate clearly, led by Tammy Summers.',
    breadcrumb: 'Corporate',
  },
  {
    path: '/individual',
    title: 'Individual & Neurodivergent Coaching | Leadership Learners',
    description:
      '1:1 coaching for individuals, including neurodivergent professionals — speech coaching, confidence building, and communication support with Tammy Summers.',
    breadcrumb: 'Individual',
  },
  {
    path: '/about',
    title: 'About Tammy Summers | Leadership Learners',
    description:
      'Meet Tammy Summers, leadership trainer and coach, and a full-time business professor at Imperial Valley College.',
    breadcrumb: 'About',
  },
  {
    path: '/blog',
    title: 'Leadership, Systems & Neurodiversity Blog | Leadership Learners',
    description:
      'Read The Clear Mind Blog from Leadership Learners for articles on leadership, systems, and neurodiversity.',
    breadcrumb: 'Blog',
  },
  {
    path: '/contact',
    title: 'Contact Tammy | Leadership Learners',
    description:
      'Reach out to Tammy Summers by phone or email about corporate leadership training or individual coaching in San Diego and the Imperial Valley.',
    breadcrumb: 'Contact',
  },
];

export const notFoundSeo: RouteSeoEntry = {
  path: '',
  title: 'Page Not Found | Leadership Learners',
  description:
    "The page you're looking for doesn't exist. Explore Leadership Learners' corporate training, individual coaching, and DISC assessments instead.",
  breadcrumb: 'Not Found',
  robots: 'noindex, follow',
};

export const absoluteUrl = (path: string): string => `${SITE_URL}${path === '/' ? '/' : path}`;
