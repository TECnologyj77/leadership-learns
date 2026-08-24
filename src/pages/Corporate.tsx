import React from 'react';
import { Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AppText from '../components/ui/AppText';
import AppSection from '../components/ui/AppSection';
import AppContainer from '../components/ui/AppContainer';
import AppButton from '../components/ui/AppButton';
import ServiceCard from '../components/marketing/ServiceCard';
import groupTrainingImg from '../assets/services/Group Leadership Training.jpg';
import organizationDiscImg from '../assets/services/Group DISC Assessments For Organizations.jpg';
import heroImg from '../assets/hero.png';

const Corporate: React.FC = () => {
  return (
    <>
      {/* Hero */}
      <AppSection variant="dark" sx={{ py: { xs: 10, md: 15 }, backgroundImage: `linear-gradient(rgba(30, 58, 95, 0.9), rgba(30, 58, 95, 0.9)), url(${heroImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <AppContainer>
          <Grid container spacing={6} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 7 }}>
              <AppText variant="h1" gutterBottom sx={{ fontWeight: 800 }}>
                Leadership Training for Organizations
              </AppText>
              <AppText variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                Group leadership training workshops and DISC-related services for organizations.
              </AppText>
              <AppButton variant="contained" color="secondary" size="large" component={RouterLink} to="/contact">
                Contact Information
              </AppButton>
            </Grid>
          </Grid>
        </AppContainer>
      </AppSection>

      <AppSection variant="light">
        <AppContainer maxWidth="md">
          <AppText variant="h3" sx={{ textAlign: 'center', mb: 4, fontWeight: 700 }}>
            Leadership and Management Training
          </AppText>
          <AppText variant="body1" color="text.secondary" sx={{ textAlign: 'center', mb: 6 }}>
            Leadership Learners provides training for organizations in leadership and management.
          </AppText>
        </AppContainer>
      </AppSection>

      {/* Services breakdown */}
      <AppSection variant="white">
        <AppContainer>
          <AppText variant="h3" sx={{ textAlign: 'center', mb: 8, fontWeight: 700 }}>
            Corporate Services
          </AppText>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <ServiceCard 
                title="Group Leadership Training"
                description="Group leadership training workshops for organizations."
                image={groupTrainingImg}
                features={['Group leadership training']}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <ServiceCard 
                title="Organizational DISC Assessments"
                description="DISC-related assessment services for organizations."
                image={organizationDiscImg}
                features={['Behavioral DISC assessments']}
              />
            </Grid>
          </Grid>
        </AppContainer>
      </AppSection>

      <AppSection variant="dark" sx={{ textAlign: 'center' }}>
        <AppContainer maxWidth="sm">
          <AppText variant="h3" gutterBottom>
            Explore Corporate Services
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

export default Corporate;
