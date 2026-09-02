import React from 'react';
import { Box, Paper, Stack, Link } from '@mui/material';
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
            <AppText variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
              Contact Leadership Learners
            </AppText>
            <AppText variant="h5" color="text.secondary">
              Reach out to Tammy directly by phone or email to start a conversation.
            </AppText>
          </Box>

          <Paper sx={{ p: 4, borderRadius: 3 }}>
            <Stack spacing={3} sx={{ alignItems: 'flex-start' }}>
              <AppButton
                variant="contained"
                color="primary"
                size="large"
                href={PHONE_HREF}
                startIcon={<PhoneOutlinedIcon />}
              >
                Call {PHONE_DISPLAY}
              </AppButton>

              <Box>
                <AppText variant="overline" color="text.secondary">
                  Email
                </AppText>
                <AppText variant="h6" sx={{ fontWeight: 700, wordBreak: 'break-word' }}>
                  <Link
                    href={`mailto:${EMAIL}`}
                    color="primary.main"
                    underline="hover"
                    sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}
                  >
                    <MailOutlinedIcon fontSize="small" />
                    {EMAIL}
                  </Link>
                </AppText>
              </Box>

              <AppText variant="body2" color="text.secondary">
                For corporate leadership work or individual and neurodivergent support, email or call
                and let Tammy know which fits your needs.
              </AppText>
            </Stack>
          </Paper>

          <Box sx={{ mt: 6, textAlign: 'center' }}>
            <AppText variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Want to learn more first? Explore how Tammy works with each type of client.
            </AppText>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              sx={{ justifyContent: 'center' }}
            >
              <AppButton variant="contained" color="primary" component={RouterLink} to="/corporate">
                Corporate Leadership
              </AppButton>
              <AppButton variant="outlined" color="secondary" component={RouterLink} to="/individual">
                Individual &amp; Neurodivergent Support
              </AppButton>
            </Stack>
          </Box>
        </AppContainer>
      </AppSection>
    </>
  );
};

export default Contact;
