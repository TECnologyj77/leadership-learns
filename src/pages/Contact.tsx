import React from 'react';
import { Box } from '@mui/material';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import { Link as RouterLink } from 'react-router-dom';
import AppText from '../components/ui/AppText';
import AppSection from '../components/ui/AppSection';
import AppContainer from '../components/ui/AppContainer';
import AppButton from '../components/ui/AppButton';
import SectionHeading from '../components/ui/SectionHeading';
import ServiceAreaLine from '../components/ui/ServiceAreaLine';
import CtaGroup from '../components/marketing/CtaGroup';
import DirectCta from '../components/marketing/DirectCta';
import SecondaryCta from '../components/marketing/SecondaryCta';
import { SERVICE_AREA } from '../lib/site-config';

const Contact: React.FC = () => {
  return (
    <AppSection tone="cream" sx={{ pt: { xs: 6, md: 10 } }}>
      <AppContainer maxWidth="sm">
        <SectionHeading
          level="h1"
          title="Contact Tammy"
          subtitle="Reach out to Tammy directly by phone or email to start a conversation."
          sx={{ mb: { xs: 4, md: 5 } }}
        />

        {/* Availability: a calm note, not a warning, so new clients write first */}
        <Box
          role="note"
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 1.5,
            mb: 4,
            p: { xs: 2.5, md: 3 },
            borderRadius: 4,
            bgcolor: 'brand.sand',
            border: 1,
            borderColor: 'brand.cardBorder',
          }}
        >
          <EventNoteOutlinedIcon aria-hidden="true" sx={{ mt: '2px', flexShrink: 0, color: 'brand.navy' }} />
          <AppText variant="body1">
            Tammy&apos;s calendar is full right now. Send a message about what you&apos;d like to work on, and she&apos;ll reply to let you know when she can begin.
          </AppText>
        </Box>

        <CtaGroup stacked>
          <DirectCta id="contact" location="contact_details" />
          <SecondaryCta id="contact" location="contact_details" long />
        </CtaGroup>
        <ServiceAreaLine sx={{ mt: 2.5 }}>{SERVICE_AREA}</ServiceAreaLine>
        <AppText variant="body2" sx={{ mt: 1.5, color: 'text.secondary' }}>
          You can start by sharing whether you're looking for support for yourself or your team, and what you'd like to improve. Ask about the service, cost, and next steps.
        </AppText>

        <Box sx={{ mt: { xs: 8, md: 10 }, pt: { xs: 6, md: 8 }, borderTop: 1, borderColor: 'brand.cardBorder', textAlign: 'center' }}>
          <AppText variant="h3" component="h2" sx={{ mb: 1.5 }}>
            Want to learn more first?
          </AppText>
          <AppText variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
            Explore how Tammy works with each type of client.
          </AppText>
          <CtaGroup align="center">
            <AppButton analytics={{ id: 'contact_explore_corporate', location: 'explore_services', intent: 'corporate' }} variant="outlined" color="primary" size="large" component={RouterLink} to="/corporate">
              Explore Corporate
            </AppButton>
            <AppButton analytics={{ id: 'contact_explore_individual', location: 'explore_services', intent: 'individual' }} variant="outlined" color="primary" size="large" component={RouterLink} to="/individual">
              Explore Individual
            </AppButton>
          </CtaGroup>
        </Box>
      </AppContainer>
    </AppSection>
  );
};

export default Contact;
