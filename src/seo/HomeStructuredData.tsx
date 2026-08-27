import React from 'react';
import { SITE_NAME, getSiteUrl } from './siteConfig';

const HomeStructuredData: React.FC = () => {
  const homeUrl = getSiteUrl('/');
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': getSiteUrl('/#website'),
        name: SITE_NAME,
        url: homeUrl,
      },
      {
        '@type': 'Organization',
        '@id': getSiteUrl('/#organization'),
        name: SITE_NAME,
        url: homeUrl,
      },
    ],
  };
  const json = JSON.stringify(structuredData).replace(/</g, '\\u003c');

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
};

export default HomeStructuredData;
