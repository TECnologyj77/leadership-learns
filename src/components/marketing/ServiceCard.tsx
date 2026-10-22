import React from 'react';
import { Box } from '@mui/material';
import AppText from '../ui/AppText';
import AppCard from '../ui/AppCard';
import { cardPadding } from '../../theme/tokens';
import CheckList from '../ui/CheckList';

interface ServiceCardProps {
  title: string;
  description: string;
  features?: string[];
  image?: string;
  /** Describes what the photo shows; falls back to the service name. */
  imageAlt?: string;
  /** Navy top border on Corporate, gold on Individual. */
  accent: 'navy' | 'gold';
}

// A service in the path-card style, with its photo across the top.
const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, features, image, imageAlt, accent }) => (
  <AppCard accent={accent} padded={false} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
    {image && (
      <Box
        component="img"
        src={image}
        alt={imageAlt ?? title}
        loading="lazy"
        sx={{ display: 'block', width: '100%', height: 220, objectFit: 'cover' }}
      />
    )}
    <Box sx={{ p: cardPadding, flexGrow: 1 }}>
      <AppText variant="h3" component="h3" sx={{ mb: 1.5 }}>
        {title}
      </AppText>
      <AppText variant="body1" sx={{ mb: features ? 3 : 0 }}>
        {description}
      </AppText>
      {features && <CheckList items={features} tone={accent} />}
    </Box>
  </AppCard>
);

export default ServiceCard;
