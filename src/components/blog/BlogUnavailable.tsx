import React from 'react';
import { Alert, Box } from '@mui/material';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import AppText from '../ui/AppText';
import AppButton from '../ui/AppButton';
import { CALL_LABEL, ORG_PHONE_E164 } from '../../lib/site-config';

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
        analytics={{ id: 'blog_unavailable_call', location: 'blog_unavailable', intent: 'contact', contactMethod: 'phone' }}
        variant="outlined"
        color="primary"
        href={`tel:${ORG_PHONE_E164}`}
        startIcon={<PhoneOutlinedIcon />}
      >
        {CALL_LABEL}
      </AppButton>
    </Box>
  </Alert>
);

export default BlogUnavailable;
