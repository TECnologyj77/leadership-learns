import React from 'react';
import { Grid, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import AppText from '../components/ui/AppText';
import AppButton from '../components/ui/AppButton';
import AppSection from '../components/ui/AppSection';
import AppContainer from '../components/ui/AppContainer';
import CoachingPathCard from '../components/marketing/CoachingPathCard';
import VideoPlayer from '../components/ui/VideoPlayer';
import overallVideo from '../assets/Overall Video (9x16).mp4';
import { captureContactClicked } from '../analytics/events';

const Home: React.FC = () => {
  return (
    <>
      {/* Hero with dual-path selection */}
      <AppSection variant="light" sx={{ py: { xs: 8, md: 12 } }}>
        <AppContainer>
          <Grid container spacing={8} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 7 }}>
              <AppText variant="h1" gutterBottom sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, fontWeight: 800 }}>
                Leadership Training and <br />
                <Box component="span" sx={{ color: 'primary.main' }}>Coaching</Box>
              </AppText>
              <AppText variant="h5" color="text.secondary" sx={{ mb: 4, maxWidth: 600 }}>
                Explore leadership training for organizations and individual coaching for the neurodivergent community.
              </AppText>
              <Grid container spacing={3} sx={{ mt: 2 }}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <CoachingPathCard 
                    title="Corporate Leadership"
                    description="Group leadership training workshops and DISC-related services for organizations."
                    path="/corporate"
                    buttonText="Explore Corporate"
                    icon={<BusinessIcon sx={{ fontSize: 40 }} />}
                    variant="corporate"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <CoachingPathCard 
                    title="Individual Coaching"
                    description="Speech coaching, confidence building, social-skills support, and DISC-related services."
                    path="/individual"
                    buttonText="Explore Individual"
                    icon={<PersonIcon sx={{ fontSize: 40 }} />}
                    variant="individual"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <VideoPlayer src={overallVideo} variant="vertical" />
              </Box>
            </Grid>
          </Grid>
        </AppContainer>
      </AppSection>

      <AppSection variant="white">
        <AppContainer maxWidth="md">
          <AppText variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
            Support for two audiences.
          </AppText>
          <AppText variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Leadership Learners serves organizations seeking leadership and management training, as well as members of the neurodivergent community.
          </AppText>
          <AppText variant="body1" color="text.secondary">
            Services include group leadership training workshops, speech coaching, and DISC-related services.
          </AppText>
        </AppContainer>
      </AppSection>

      <AppSection variant="light">
        <AppContainer maxWidth="md">
          <AppText variant="h3" gutterBottom sx={{ textAlign: 'center', fontWeight: 700 }}>
            Testimonials and Success Stories
          </AppText>
          <AppText variant="body1" color="text.secondary" sx={{ textAlign: 'center' }}>
            Approved client stories will be shared here.
          </AppText>
        </AppContainer>
      </AppSection>

      {/* Final CTA section */}
      <AppSection variant="white" sx={{ textAlign: 'center' }}>
        <AppContainer maxWidth="sm">
          <AppText variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
            Ready to Start Your Journey?
          </AppText>
          <AppText variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Explore the corporate or individual coaching path that fits your needs.
          </AppText>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <AppButton variant="contained" color="primary" size="large" component={RouterLink} to="/contact" onClick={() => captureContactClicked('home_final')}>
              Contact Information
            </AppButton>
          </Box>
        </AppContainer>
      </AppSection>
    </>
  );
};

export default Home;
