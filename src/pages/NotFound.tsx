import React from 'react';
import { Box, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AppText from '../components/ui/AppText';
import AppSection from '../components/ui/AppSection';
import AppContainer from '../components/ui/AppContainer';
import AppButton from '../components/ui/AppButton';
import CtaGroup from '../components/marketing/CtaGroup';
import DirectCta from '../components/marketing/DirectCta';

const NotFound: React.FC = () => {
  return (
    <AppSection tone="cream" sx={{ textAlign: 'center' }}>
      <AppContainer maxWidth="sm">
        <AppText variant="eyebrow" sx={{ mb: 1.5 }}>
          404
        </AppText>
        <AppText variant="h1" sx={{ mb: 2 }}>
          Page Not Found
        </AppText>
        <AppText variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
          The page you&apos;re looking for doesn&apos;t exist or has moved. Here&apos;s where you can go instead.
        </AppText>
        <CtaGroup align="center">
          <DirectCta id="not_found" location="recovery" />
          <AppButton variant="outlined" color="primary" size="large" component={RouterLink} to="/">
            Back to Home
          </AppButton>
        </CtaGroup>
        <Box sx={{ display: 'flex', columnGap: 3, justifyContent: 'center', flexWrap: 'wrap', mt: 3, '& a': { display: 'inline-flex', alignItems: 'center', minHeight: 44 } }}>
          <Link component={RouterLink} to="/corporate" underline="hover">
            Corporate Leadership
          </Link>
          <Link component={RouterLink} to="/individual" underline="hover">
            Individual Coaching
          </Link>
          <Link component={RouterLink} to="/blog" underline="hover">
            Blog
          </Link>
        </Box>
      </AppContainer>
    </AppSection>
  );
};

export default NotFound;
