import React from 'react';
import { Grid, Box, Paper } from '@mui/material';
import { CheckCircleOutlined as CheckCircleOutlineIcon } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import AppText from '../components/ui/AppText';
import AppSection from '../components/ui/AppSection';
import AppContainer from '../components/ui/AppContainer';
import AppButton from '../components/ui/AppButton';
import ServiceCard from '../components/marketing/ServiceCard';
import TestimonialCard from '../components/marketing/TestimonialCard';
import ProcessSteps from '../components/marketing/ProcessSteps';
import groupTrainingImg from '../assets/services/Group Leadership Training.jpg';
import organizationDiscImg from '../assets/services/Group DISC Assessments For Organizations.jpg';
import { corporateTestimonials } from '../content/testimonials';

const Corporate: React.FC = () => {
  return (
    <>
      {/* Hero */}
      <AppSection variant="dark" sx={{ py: { xs: 10, md: 15 } }}>
        <AppContainer>
          <Grid container spacing={6} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 7 }}>
              <AppText variant="overline" component="p" sx={{ opacity: 0.9, fontWeight: 700, letterSpacing: '0.08em' }}>
                For organizations & teams
              </AppText>
              <AppText variant="h1" gutterBottom sx={{ fontWeight: 800 }}>
                Scale Your Impact, Not Your Stress.
              </AppText>
              <AppText variant="h5" component="p" sx={{ mb: 4, opacity: 0.9 }}>
                Strategic leadership development and organizational systems for high-growth teams.
              </AppText>
              <AppButton variant="contained" color="secondary" size="large" component={RouterLink} to="/contact">
                Contact Tammy
              </AppButton>
            </Grid>
          </Grid>
        </AppContainer>
      </AppSection>

      <AppSection variant="light">
        <AppContainer maxWidth="md">
          <AppText variant="h3" component="h2" sx={{ textAlign: 'center', mb: 4, fontWeight: 700 }}>
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
          <AppText variant="h3" component="h2" sx={{ textAlign: 'center', mb: 8, fontWeight: 700 }}>
            Our Corporate Solutions
          </AppText>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <ServiceCard 
                title="Group Leadership Training"
                description="Custom training programs for new managers and senior executives to build high-performance cultures."
                image={groupTrainingImg}
                imageAlt="Participants seated in a circle during a group training session."
                features={['Executive presence', 'Conflict resolution', 'Delegation frameworks']}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <ServiceCard 
                title="Organizational DISC Assessments"
                description="In-depth behavioral analysis for teams to improve communication and psychological safety."
                image={organizationDiscImg}
                imageAlt="A team standing together in front of a Leadership Learners session screen."
                features={['Team dynamics mapping', 'Communication audits', 'Role alignment']}
              />
            </Grid>
          </Grid>
        </AppContainer>
      </AppSection>

      <AppSection variant="light">
        <AppContainer maxWidth="md">
          <AppText variant="h3" component="h2" sx={{ textAlign: 'center', mb: { xs: 5, md: 8 }, fontWeight: 700 }}>
            What we work toward together.
          </AppText>
          <Grid container spacing={3}>
            {[
              'Reduced founder dependency for day-to-day decisions.',
              'Faster project completion through clearer communication.',
              'Improved employee retention and engagement.',
              'Scalable culture that survives rapid growth.'
            ].map((text) => (
              <Grid size={{ xs: 12, sm: 6 }} key={text}>
                <Paper sx={{ p: 3, height: '100%', display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <CheckCircleOutlineIcon color="primary" sx={{ mt: '2px' }} />
                  <AppText variant="body1">{text}</AppText>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </AppContainer>
      </AppSection>

      {/* Testimonials */}
      <AppSection variant="white">
        <AppContainer>
          <AppText variant="h3" component="h2" sx={{ textAlign: 'center', mb: 8, fontWeight: 700 }}>
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

      {/* Plan: what working together looks like */}
      <AppSection variant="light">
        <AppContainer maxWidth="md">
          <AppText variant="h3" component="h2" sx={{ textAlign: 'center', mb: 2, fontWeight: 700 }}>
            How we start
          </AppText>
          <AppText variant="body1" color="text.secondary" sx={{ textAlign: 'center', mb: 8 }}>
            No lengthy onboarding. A conversation first, then work shaped around your organization.
          </AppText>
          <ProcessSteps
            color="primary"
            steps={[
              {
                title: 'Reach out',
                description: 'Call or email Tammy and describe your team and where things are breaking down.',
              },
              {
                title: 'Talk it through',
                description: 'Tammy listens first, then suggests which service fits the problem you actually have.',
              },
              {
                title: 'Begin the work',
                description: 'Group leadership training, a workshop, or DISC assessments, matched to your organization.',
              },
            ]}
          />
        </AppContainer>
      </AppSection>

      <AppSection variant="dark" sx={{ textAlign: 'center' }}>
        <AppContainer maxWidth="sm">
          <AppText variant="h3" component="h2" gutterBottom>
            Ready to lead with clarity?
          </AppText>
          <AppText variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
            Get in touch to discuss your organization's unique challenges.
          </AppText>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <AppButton variant="contained" color="secondary" size="large" component={RouterLink} to="/contact">
              Contact Tammy
            </AppButton>
            <AppButton variant="outlined" color="inherit" size="large" component={RouterLink} to="/blog">
              Read the Blog
            </AppButton>
          </Box>
        </AppContainer>
      </AppSection>
    </>
  );
};

export default Corporate;
