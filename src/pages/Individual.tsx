import React from 'react';
import { Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AppText from '../components/ui/AppText';
import AppSection from '../components/ui/AppSection';
import AppContainer from '../components/ui/AppContainer';
import AppButton from '../components/ui/AppButton';
import ServiceCard from '../components/marketing/ServiceCard';
import speechCoachingImg from '../assets/services/Speech Coaching.jpg';
import studentDiscImg from '../assets/services/Student + Career DISC Assessment and Debrief.jpeg';
import salesDiscImg from '../assets/services/Sales DISC Assessment and Debrief.jpg';

const Individual: React.FC = () => {
  return (
    <>
      {/* Hero */}
      <AppSection variant="light" sx={{ py: { xs: 10, md: 15 } }}>
        <AppContainer>
          <Grid container spacing={6} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 7 }}>
              <AppText variant="h1" gutterBottom sx={{ color: 'secondary.main', fontWeight: 800 }}>
                Every Voice Has Power. <br />
                Yours Deserves to be Heard.
              </AppText>
              <AppText variant="h5" color="text.secondary" sx={{ mb: 4 }}>
                Individual coaching for the neurodivergent community, including speech coaching, confidence building, and social-skills support.
              </AppText>
              <AppButton variant="contained" color="secondary" size="large" component={RouterLink} to="/contact">
                Contact Information
              </AppButton>
            </Grid>
          </Grid>
        </AppContainer>
      </AppSection>

      {/* Services breakdown */}
      <AppSection variant="white">
        <AppContainer>
          <AppText variant="h3" sx={{ textAlign: 'center', mb: 8, fontWeight: 700 }}>
            Specialized Coaching
          </AppText>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 4 }}>
              <ServiceCard 
                title="Speech Coaching"
                description="Speech coaching, confidence building, and social-skills support."
                image={speechCoachingImg}
                features={['Speech coaching', 'Confidence building', 'Social-skills support']}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ServiceCard 
                title="DISC Assessments"
                description="DISC-related services for individuals."
                image={studentDiscImg}
                features={['Behavioral DISC assessments']}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ServiceCard 
                title="Sales & Entrepreneur DISC"
                description="DISC-related services for sales and entrepreneurs."
                image={salesDiscImg}
                features={['Sales DISC', 'Entrepreneur DISC']}
              />
            </Grid>
          </Grid>
        </AppContainer>
      </AppSection>

      <AppSection variant="dark" sx={{ textAlign: 'center' }}>
        <AppContainer maxWidth="sm">
          <AppText variant="h3" gutterBottom>
            Explore Individual Coaching
          </AppText>
          <AppText variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
            Contact details and the inquiry process are being confirmed.
          </AppText>
          <AppButton variant="contained" color="secondary" size="large" component={RouterLink} to="/contact">
            Contact Information
          </AppButton>
        </AppContainer>
      </AppSection>
    </>
  );
};

export default Individual;
