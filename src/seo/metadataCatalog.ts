import type { BlogPost } from '../types/blog';

export interface RouteMetadataDefinition {
  title: string;
  description: string;
  canonicalPath?: string;
  robots: 'index, follow' | 'noindex, follow';
}

export const routeMetadata = {
  home: {
    title: 'Leadership Training & Coaching | Leadership Learners',
    description: 'Explore leadership training for organizations and individual coaching for the neurodivergent community from Leadership Learners.',
    canonicalPath: '/',
    robots: 'index, follow',
  },
  corporate: {
    title: 'Corporate Leadership Training | Leadership Learners',
    description: 'Explore group leadership training workshops and DISC-related services for organizations from Leadership Learners.',
    canonicalPath: '/corporate',
    robots: 'index, follow',
  },
  individual: {
    title: 'Individual Coaching Services | Leadership Learners',
    description: 'Explore speech coaching, confidence building, social-skills support, and DISC-related services for individuals.',
    canonicalPath: '/individual',
    robots: 'index, follow',
  },
  about: {
    title: 'About Tammy Summers | Leadership Learners',
    description: 'Learn about Tammy Summers and the leadership training, speech coaching, and DISC-related services offered by Leadership Learners.',
    canonicalPath: '/about',
    robots: 'index, follow',
  },
  blog: {
    title: 'Leadership Learners Blog',
    description: 'Browse the Leadership Learners blog for articles about leadership, systems, and neurodiversity.',
    canonicalPath: '/blog',
    robots: 'noindex, follow',
  },
  contact: {
    title: 'Contact Leadership Learners',
    description: 'View the current status of public contact details and inquiry information for Leadership Learners.',
    canonicalPath: '/contact',
    robots: 'noindex, follow',
  },
} satisfies Record<string, RouteMetadataDefinition>;

export const createBlogPostMetadata = (post: BlogPost): RouteMetadataDefinition => ({
  title: `${post.title} | Leadership Learners`,
  description: post.excerpt,
  canonicalPath: `/blog/${post.slug}`,
  robots: 'noindex, follow',
});

export const notFoundMetadata: RouteMetadataDefinition = {
  title: 'Page Not Found | Leadership Learners',
  description: 'The requested Leadership Learners page could not be found. Return home or explore the available service paths.',
  robots: 'noindex, follow',
};
