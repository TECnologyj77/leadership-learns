import React from 'react';
import { Box, Link, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AppText from '../components/ui/AppText';
import AppSection from '../components/ui/AppSection';
import AppContainer from '../components/ui/AppContainer';
import AppButton from '../components/ui/AppButton';

const NotFound: React.FC = () => {
  return (
    <AppSection variant="light" sx={{ textAlign: 'center' }}>
      <AppContainer maxWidth="sm">
        <AppText variant="overline" component="p" sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: '0.08em' }}>
          404
        </AppText>
        <AppText variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Page Not Found
        </AppText>
        <AppText variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          The page you&apos;re looking for doesn&apos;t exist or has moved. Here&apos;s where you can go instead.
        </AppText>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <AppButton variant="contained" color="primary" size="large" component={RouterLink} to="/">
            Back to Home
          </AppButton>
          <AppButton variant="outlined" color="secondary" size="large" component={RouterLink} to="/contact">
            Contact Tammy
          </AppButton>
        </Box>
        <Stack direction="row" spacing={3} sx={{ justifyContent: 'center', flexWrap: 'wrap', mt: 4 }}>
          <Link component={RouterLink} to="/corporate" color="text.secondary" underline="hover">
            Corporate Leadership
          </Link>
          <Link component={RouterLink} to="/individual" color="text.secondary" underline="hover">
            Individual Coaching
          </Link>
          <Link component={RouterLink} to="/blog" color="text.secondary" underline="hover">
            Blog
          </Link>
        </Stack>
      </AppContainer>
    </AppSection>
  );
};

export default NotFound;
