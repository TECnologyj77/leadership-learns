import React from 'react';
import { Alert, Box } from '@mui/material';
import AppText from '../ui/AppText';
import AppButton from '../ui/AppButton';
import DirectCta from '../marketing/DirectCta';

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
      <DirectCta id="blog_unavailable" location="blog_unavailable" size="header" />
    </Box>
  </Alert>
);

export default BlogUnavailable;
