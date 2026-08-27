import React from 'react';
import { Box, Paper } from '@mui/material';
import AppText from '../components/ui/AppText';
import AppSection from '../components/ui/AppSection';
import AppContainer from '../components/ui/AppContainer';

const Contact: React.FC = () => {
  return (
    <>
      <AppSection variant="light">
        <AppContainer maxWidth="sm">
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <AppText component="h1" variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
              Contact Leadership Learners
            </AppText>
            <AppText variant="h5" color="text.secondary">
              Public contact details and the inquiry process are being confirmed.
            </AppText>
          </Box>

          <Paper sx={{ p: 4, borderRadius: 3 }}>
            <AppText variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
              Contact details are coming soon
            </AppText>
            <AppText variant="body1" color="text.secondary">
              Tammy is confirming the phone number, email address, and inquiry instructions to use on the website. They will be added after approval.
            </AppText>
          </Paper>
        </AppContainer>
      </AppSection>
    </>
  );
};

export default Contact;
