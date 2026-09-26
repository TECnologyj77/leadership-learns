import React from 'react';
import { Alert, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AppText from '../ui/AppText';
import AppButton from '../ui/AppButton';

/** Shown when blog content couldn't be loaded (Wix unreachable and no saved copy). */
const BlogUnavailable: React.FC<{ message: string; onRetry: () => void }> = ({ message, onRetry }) => (
  <Alert severity="info" sx={{ maxWidth: 640, mx: 'auto', alignItems: 'flex-start' }}>
    <AppText variant="body1" sx={{ mb: 2 }}>
      {message}
    </AppText>
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
      <AppButton variant="contained" color="primary" onClick={onRetry}>
        Try again
      </AppButton>
      <AppButton
        analytics={{ id: 'blog_unavailable_contact', location: 'blog_unavailable', intent: 'contact' }}
        variant="outlined"
        color="primary"
        component={RouterLink}
        to="/contact"
      >
        Contact Tammy
      </AppButton>
    </Box>
  </Alert>
);

export default BlogUnavailable;
