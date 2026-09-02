import React from 'react';
import { Box, Paper } from '@mui/material';
import AppText from '../ui/AppText';

interface ServiceCardProps {
  title: string;
  description: string;
  features?: string[];
  icon?: React.ReactNode;
  image?: string;
  /** Describes what the photo shows; falls back to the service name. */
  imageAlt?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, features, icon, image, imageAlt }) => {
  return (
    <Paper sx={{ height: '100%', borderRadius: 3, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {image && (
        <Box 
          component="img" 
          src={image} 
          alt={imageAlt ?? title} 
          sx={{ 
            width: '100%', 
            height: 200, 
            objectFit: 'cover' 
          }} 
        />
      )}
      <Box sx={{ p: 4, flexGrow: 1 }}>
        <Box sx={{ color: 'primary.main', mb: 2 }}>
          {icon}
        </Box>
        <AppText variant="h5" component="h3" gutterBottom sx={{ fontWeight: 700 }}>
          {title}
        </AppText>
        <AppText variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {description}
        </AppText>
        {features && (
          <Box component="ul" sx={{ pl: 2, m: 0 }}>
            {features.map((feature, index) => (
              <Box component="li" key={index} sx={{ mb: 1 }}>
                <AppText variant="body2">{feature}</AppText>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default ServiceCard;
