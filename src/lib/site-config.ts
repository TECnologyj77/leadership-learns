// Single source of truth for site-wide SEO facts: the production URL, brand
// identity, confirmed contact details, and per-route title/description copy.
//
// SITE_URL is the confirmed production domain, but the site is not public yet
// (confirmed with the project owner) — nothing here causes indexing on its
// own; public/robots.txt disallows all crawling until launch. Canonical/OG/
// sitemap URLs are pre-wired against the real domain so going live only means
// flipping robots.txt. If the domain ever changes again, update it in three
// places:
//   1. SITE_URL below.
//   2. The matching literals in index.html (search for SITE_URL).
//   3. The literal in scripts/generate-sitemap.mjs.
// To actually go live once ready: replace public/robots.txt with the "Allow"
// version described in its own comments.
export const SITE_URL = 'https://leadershiplearners.com';

export const SITE_NAME = 'Leadership Learners';

// Confirmed contact details already published in Footer.tsx / Contact.tsx.
export const ORG_EMAIL = 't.summers@leadershiplearners.org';
export const ORG_PHONE_E164 = '+18586036709';

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
      'Leadership training, group workshops, and DISC assessments for organizations, plus 1:1 coaching for individuals and neurodivergent professionals, led by Tammy Summers.',
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
    title: 'Blog | Leadership Learners',
    description: 'Insights on leadership, systems, and neurodiversity from Leadership Learners.',
    breadcrumb: 'Blog',
  },
  {
    path: '/contact',
    title: 'Contact Tammy | Leadership Learners',
    description:
      'Reach out to Tammy Summers by phone or email to start a conversation about corporate leadership training or individual coaching.',
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
