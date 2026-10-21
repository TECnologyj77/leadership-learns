import React from 'react';
import { Box, Paper, Stack } from '@mui/material';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import { Link as RouterLink } from 'react-router-dom';
import AppText from '../components/ui/AppText';
import AppSection from '../components/ui/AppSection';
import AppContainer from '../components/ui/AppContainer';
import AppButton from '../components/ui/AppButton';
import { SERVICE_AREA } from '../lib/site-config';

const PHONE_DISPLAY = '(858) 603-6709';
const PHONE_HREF = 'tel:+18586036709';
const EMAIL = 't.summers@leadershiplearners.org';

const Contact: React.FC = () => {
  return (
    <>
      <AppSection variant="light">
        <AppContainer maxWidth="sm">
          <Box sx={{ mb: { xs: 4, md: 5 }, textAlign: 'center' }}>
            <AppText variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
              Contact Tammy
            </AppText>
            <AppText variant="h5" component="p" color="text.secondary">
              Reach out to Tammy directly by phone or email to start a conversation.
            </AppText>
            <AppText variant="body1" color="text.secondary" sx={{ mt: 2 }}>
              {SERVICE_AREA}
            </AppText>
          </Box>

          {/* Availability: a calm note, not a warning, so new clients write first */}
          <Box
            role="note"
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 1.5,
              mb: { xs: 4, md: 5 },
              p: { xs: 2.5, md: 3 },
              borderRadius: 2,
              borderLeft: '4px solid',
              borderLeftColor: 'primary.main',
              bgcolor: 'rgba(30, 58, 95, 0.06)',
            }}
          >
            <EventNoteOutlinedIcon color="primary" sx={{ mt: '2px', flexShrink: 0 }} />
            <AppText variant="body1">
              Tammy&apos;s calendar is full right now. Send a message about what you&apos;d like to work on, and she&apos;ll reply to let you know when she can begin.
            </AppText>
          </Box>

          <Paper sx={{ p: { xs: 3, md: 4 }, borderRadius: 3 }}>
            <Stack spacing={2}>
              <AppButton
                analytics={{ id: 'contact_phone', location: 'contact_details', intent: 'contact', contactMethod: 'phone' }}
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
                analytics={{ id: 'contact_email', location: 'contact_details', intent: 'contact', contactMethod: 'email' }}
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
                You can start by sharing whether you're looking for support for yourself or your team, and what you'd like to improve. Ask about the service, cost, and next steps.
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
              <AppButton analytics={{ id: 'contact_explore_corporate', location: 'explore_services', intent: 'corporate' }} variant="contained" color="primary" component={RouterLink} to="/corporate">
                Explore Corporate
              </AppButton>
              <AppButton analytics={{ id: 'contact_explore_individual', location: 'explore_services', intent: 'individual' }} variant="contained" color="secondary" component={RouterLink} to="/individual">
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
