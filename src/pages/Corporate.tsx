import React from 'react';
import { Grid, Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { CheckCircleOutlined as CheckCircleOutlineIcon } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import AppText from '../components/ui/AppText';
import AppSection from '../components/ui/AppSection';
import AppContainer from '../components/ui/AppContainer';
import AppButton from '../components/ui/AppButton';
import ServiceCard from '../components/marketing/ServiceCard';
import TestimonialCard from '../components/marketing/TestimonialCard';
import groupTrainingImg from '../assets/services/Group Leadership Training.jpg';
import organizationDiscImg from '../assets/services/Group DISC Assessments For Organizations.jpg';
import heroImg from '../assets/hero.png';
import { corporateTestimonials } from '../content/testimonials';

const Corporate: React.FC = () => {
  return (
    <>
      {/* Hero */}
      <AppSection variant="dark" sx={{ py: { xs: 10, md: 15 }, backgroundImage: `linear-gradient(rgba(30, 58, 95, 0.9), rgba(30, 58, 95, 0.9)), url(${heroImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <AppContainer>
          <Grid container spacing={6} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 7 }}>
              <AppText variant="h1" gutterBottom sx={{ fontWeight: 800 }}>
                Scale Your Impact, Not Your Stress.
              </AppText>
              <AppText variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                Strategic leadership development and organizational systems for high-growth teams.
              </AppText>
              <AppButton variant="contained" color="secondary" size="large" component={RouterLink} to="/contact">
                Get In Touch
              </AppButton>
            </Grid>
          </Grid>
        </AppContainer>
      </AppSection>

      <AppSection variant="light">
        <AppContainer maxWidth="md">
          <AppText variant="h3" sx={{ textAlign: 'center', mb: 4, fontWeight: 700 }}>
            Leadership is hard. Scaling is harder.
          </AppText>
          <AppText variant="body1" color="text.secondary" sx={{ textAlign: 'center', mb: 6 }}>
            As organizations grow, communication breaks down, decision-making slows, and founders often find themselves bogged down in operational chaos instead of leading.
          </AppText>
          <Grid container spacing={3}>
            {[
              'Siloed communication across departments',
              'Founder bottlenecking in decision-making',
              'Lack of cultural alignment in remote teams',
              'Inefficient meeting and feedback frameworks'
            ].map((item) => (
              <Grid size={{ xs: 12, sm: 6 }} key={item}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <CheckCircleOutlineIcon color="primary" />
                  <AppText variant="body1">{item}</AppText>
                </Box>
              </Grid>
            ))}
          </Grid>
        </AppContainer>
      </AppSection>

      {/* Services breakdown */}
      <AppSection variant="white">
        <AppContainer>
          <AppText variant="h3" sx={{ textAlign: 'center', mb: 8, fontWeight: 700 }}>
            Our Corporate Solutions
          </AppText>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <ServiceCard 
                title="Group Leadership Training"
                description="Custom training programs for new managers and senior executives to build high-performance cultures."
                image={groupTrainingImg}
                features={['Executive presence', 'Conflict resolution', 'Delegation frameworks']}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <ServiceCard 
                title="Organizational DISC Assessments"
                description="In-depth behavioral analysis for teams to improve communication and psychological safety."
                image={organizationDiscImg}
                features={['Team dynamics mapping', 'Communication audits', 'Role alignment']}
              />
            </Grid>
          </Grid>
        </AppContainer>
      </AppSection>

      <AppSection variant="light">
        <AppContainer>
          <Grid container spacing={8} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  bgcolor: 'primary.main',
                  height: 400,
                  borderRadius: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white'
                }}
              >
                <AppText variant="h6">Outcome Visualization</AppText>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <AppText variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
                Measurable results for your organization.
              </AppText>
              <List>
                {[
                  'Reduced founder dependency for day-to-day decisions.',
                  'Faster project completion through clearer communication.',
                  'Improved employee retention and engagement.',
                  'Scalable culture that survives rapid growth.'
                ].map((text, i) => (
                  <ListItem key={i} disablePadding sx={{ mb: 2 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <CheckCircleOutlineIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </AppContainer>
      </AppSection>

      {/* Testimonials */}
      <AppSection variant="white">
        <AppContainer>
          <AppText variant="h3" sx={{ textAlign: 'center', mb: 8, fontWeight: 700 }}>
            Client Success
          </AppText>
          <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
            {corporateTestimonials.map((testimonial) => (
              <Grid size={{ xs: 12, md: 6 }} key={testimonial.author}>
                <TestimonialCard {...testimonial} />
              </Grid>
            ))}
          </Grid>
        </AppContainer>
      </AppSection>

      <AppSection variant="dark" sx={{ textAlign: 'center' }}>
        <AppContainer maxWidth="sm">
          <AppText variant="h3" gutterBottom>
            Ready to lead with clarity?
          </AppText>
          <AppText variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
            Get in touch to discuss your organization's unique challenges.
          </AppText>
          <AppButton variant="contained" color="secondary" size="large" component={RouterLink} to="/contact">
            Get In Touch
          </AppButton>
        </AppContainer>
      </AppSection>
    </>
  );
};

export default Corporate;
