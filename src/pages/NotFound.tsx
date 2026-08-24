import React from 'react';
import { Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AppButton from '../components/ui/AppButton';
import AppContainer from '../components/ui/AppContainer';
import AppSection from '../components/ui/AppSection';
import AppText from '../components/ui/AppText';
import RouteMetadata from '../seo/RouteMetadata';
import { notFoundMetadata } from '../seo/metadataCatalog';

const NotFound: React.FC = () => {
  return (
    <>
      <RouteMetadata metadata={notFoundMetadata} />
      <AppSection variant="light" sx={{ textAlign: 'center' }}>
        <AppContainer maxWidth="sm">
          <AppText component="p" variant="overline" color="primary.main" sx={{ fontWeight: 700 }}>
            404
          </AppText>
          <AppText variant="h1" gutterBottom sx={{ fontWeight: 800 }}>
            Page not found
          </AppText>
          <AppText variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            The page may have moved, or the web address may be incorrect. Return home or explore the available service paths.
          </AppText>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <AppButton component={RouterLink} to="/" variant="contained" color="primary">
              Return Home
            </AppButton>
            <AppButton component={RouterLink} to="/corporate" variant="outlined" color="primary">
              Corporate Services
            </AppButton>
            <AppButton component={RouterLink} to="/individual" variant="outlined" color="primary">
              Individual Coaching
            </AppButton>
          </Box>
        </AppContainer>
      </AppSection>
    </>
  );
};

export default NotFound;
