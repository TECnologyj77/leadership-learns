import React from 'react';
import type { RouteMetadataDefinition } from './metadataCatalog';
import { getSiteUrl } from './siteConfig';

interface RouteMetadataProps {
  metadata: RouteMetadataDefinition;
}

const RouteMetadata: React.FC<RouteMetadataProps> = ({ metadata }) => {
  const canonicalUrl = metadata.canonicalPath ? getSiteUrl(metadata.canonicalPath) : undefined;

  return (
    <>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <meta name="robots" content={metadata.robots} />
      {canonicalUrl && <link key={canonicalUrl} rel="canonical" href={canonicalUrl} />}
    </>
  );
};

export default RouteMetadata;
