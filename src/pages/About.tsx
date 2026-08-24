import React from 'react';
import { Grid, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AppText from '../components/ui/AppText';
import AppSection from '../components/ui/AppSection';
import AppContainer from '../components/ui/AppContainer';
import AppButton from '../components/ui/AppButton';
import tammyImg from '../assets/tammy.jpg';

const About: React.FC = () => {
  return (
    <>
      {/* Hero / Intro */}
      <AppSection variant="light">
        <AppContainer>
          <Grid container spacing={8} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <AppText variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
                Meet Tammy Summers
              </AppText>
              <AppText variant="h5" color="primary.main" gutterBottom sx={{ fontWeight: 600 }}>
                Business Professor and Coach
              </AppText>
              <AppText variant="body1" sx={{ mb: 2 }}>
                Tammy serves organizations and individuals through leadership training workshops, speech coaching, and DISC-related services.
              </AppText>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box 
                component="img" 
                src={tammyImg} 
                alt="Tammy Summers" 
                sx={{ 
                  width: '100%', 
                  borderRadius: 4, 
                  boxShadow: 4 
                }} 
              />
            </Grid>
          </Grid>
        </AppContainer>
      </AppSection>

      {/* Philosophy */}
      <AppSection variant="white">
        <AppContainer maxWidth="md">
          <AppText variant="h3" gutterBottom sx={{ textAlign: 'center', fontWeight: 700 }}>
            Making Complex Concepts Accessible
          </AppText>
          <AppText variant="body1" sx={{ mb: 2, fontSize: '1.1rem', textAlign: 'center' }}>
            Tammy is a full-time business professor at Imperial Valley College.
          </AppText>
          <AppText variant="body1" sx={{ textAlign: 'center', color: 'text.secondary' }}>
            Her work includes leadership and management training for organizations as well as coaching for the neurodivergent community.
          </AppText>
        </AppContainer>
      </AppSection>

      {/* Specialized Focus */}
      <AppSection variant="light">
        <AppContainer>
          <Grid container spacing={8} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 6 }} sx={{ order: { xs: 2, md: 1 } }}>
              <Box sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 4, boxShadow: 2 }}>
                <AppText variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                  Empowering Every Voice
                </AppText>
                <AppText variant="body1" sx={{ mb: 2 }}>
                  Tammy offers speech coaching, confidence building, and social-skills support for the neurodivergent community.
                </AppText>
                <AppText variant="body1" sx={{ mb: 2 }}>
                  DISC-related services are also available for individuals, including sales and entrepreneur DISC.
                </AppText>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} sx={{ order: { xs: 1, md: 2 } }}>
              <AppText variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
                Two Service Paths
              </AppText>
              <AppText variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                Leadership Learners serves clients in two areas: training for organizations in leadership and management, and individual coaching for the neurodivergent community.
              </AppText>
              <AppText variant="body1" color="text.secondary">
                Details about the public contact process are being confirmed.
              </AppText>
            </Grid>
          </Grid>
        </AppContainer>
      </AppSection>

      {/* CTA */}
      <AppSection variant="dark" sx={{ textAlign: 'center' }}>
        <AppContainer maxWidth="sm">
          <AppText variant="h3" gutterBottom>
            Join the conversation.
          </AppText>
          <AppText variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
            Explore the blog for leadership insights or view the latest contact information.
          </AppText>
          <AppButton variant="contained" color="secondary" size="large" component={RouterLink} to="/contact">
            Contact Information
          </AppButton>
        </AppContainer>
      </AppSection>
    </>
  );
};

export default About;
