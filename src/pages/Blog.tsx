import React from 'react';
import { Box } from '@mui/material';
import AppText from '../components/ui/AppText';
import AppSection from '../components/ui/AppSection';
import AppContainer from '../components/ui/AppContainer';

const Blog: React.FC = () => {
  return (
    <AppSection variant="light">
      <AppContainer maxWidth="sm">
        <Box sx={{ textAlign: 'center' }}>
          <AppText component="h1" variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
            Blog coming soon
          </AppText>
          <AppText variant="body1" color="text.secondary">
            Articles are being prepared while the publishing connection is finalized. Please check back soon.
          </AppText>
        </Box>
      </AppContainer>
    </AppSection>
  );
};

export default Blog;
