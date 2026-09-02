import React from 'react';
import { Box, Paper, Stack } from '@mui/material';
import { PhoneOutlined as PhoneOutlinedIcon, MailOutlined as MailOutlinedIcon } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import AppText from '../components/ui/AppText';
import AppSection from '../components/ui/AppSection';
import AppContainer from '../components/ui/AppContainer';
import AppButton from '../components/ui/AppButton';

const PHONE_DISPLAY = '(858) 603-6709';
const PHONE_HREF = 'tel:+18586036709';
const EMAIL = 't.summers@leadershiplearners.org';

const Contact: React.FC = () => {
  return (
    <>
      <AppSection variant="light">
        <AppContainer maxWidth="sm">
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <AppText variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
              Contact Tammy
            </AppText>
            <AppText variant="h5" component="p" color="text.secondary">
              Reach out to Tammy directly by phone or email to start a conversation.
            </AppText>
          </Box>

          <Paper sx={{ p: { xs: 3, md: 4 }, borderRadius: 3 }}>
            <Stack spacing={2}>
              <AppButton
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                href={PHONE_HREF}
                startIcon={<PhoneOutlinedIcon />}
                sx={{ justifyContent: 'flex-start', py: 2 }}
              >
                Call {PHONE_DISPLAY}
              </AppButton>

              <AppButton
                variant="outlined"
                color="primary"
                size="large"
                fullWidth
                href={`mailto:${EMAIL}`}
                startIcon={<MailOutlinedIcon />}
                sx={{ justifyContent: 'flex-start', py: 2, wordBreak: 'break-word', textAlign: 'left' }}
              >
                Email {EMAIL}
              </AppButton>

              <AppText variant="body2" color="text.secondary">
                For corporate leadership work or individual and neurodivergent support, email or call
                and let Tammy know which fits your needs.
              </AppText>
            </Stack>
          </Paper>

          <Box sx={{ mt: 8, textAlign: 'center' }}>
            <AppText variant="h5" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
              Want to learn more first?
            </AppText>
            <AppText variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Explore how Tammy works with each type of client.
            </AppText>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              sx={{ justifyContent: 'center' }}
            >
              <AppButton variant="contained" color="primary" component={RouterLink} to="/corporate">
                Explore Corporate
              </AppButton>
              <AppButton variant="contained" color="secondary" component={RouterLink} to="/individual">
                Explore Individual
              </AppButton>
            </Stack>
          </Box>
        </AppContainer>
      </AppSection>
    </>
  );
};

export default Contact;
