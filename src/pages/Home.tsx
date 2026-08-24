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
import TestimonialCard from '../components/marketing/TestimonialCard';
import VideoPlayer from '../components/ui/VideoPlayer';
import overallVideo from '../assets/Overall Video (9x16).mp4';

const testimonials = [
  {
    quote: "I recommend Tammy Summers and the DISC assessment for any organization that seeks understanding on how to better understand staff (personnel).",
    author: "Guillermo Salgado",
    role: "Business Owner"
  },
  {
    quote: "I had the pleasure of hiring Tammy Summers to conduct a DISC assessment for our real estate team. We gained invaluable insights to each other's personalities.",
    author: "Gisela Sanchez",
    role: "Business Owner"
  },
  {
    quote: "I enjoy working with my public speaking coach. I'm autistic and she understands how to help me become a better public speaker.",
    author: "Austin Morales",
    role: "Public Speaking Client"
  }
];

const Home: React.FC = () => {
  return (
    <>
      {/* Hero with dual-path selection */}
      <AppSection variant="light" sx={{ py: { xs: 8, md: 12 } }}>
        <AppContainer>
          <Grid container spacing={8} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 7 }}>
              <AppText variant="h1" gutterBottom sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, fontWeight: 800 }}>
                Clarity and Growth for <br />
                <Box component="span" sx={{ color: 'primary.main' }}>Modern Leaders</Box>
              </AppText>
              <AppText variant="h5" color="text.secondary" sx={{ mb: 4, maxWidth: 600 }}>
                Specialized coaching to help you build structure, lead with authority, and align with your true identity.
              </AppText>
              <Grid container spacing={3} sx={{ mt: 2 }}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <CoachingPathCard 
                    title="Corporate Leadership"
                    description="Development for executives and teams. Scale your organization with structured clarity."
                    path="/corporate"
                    buttonText="Explore Corporate"
                    icon={<BusinessIcon sx={{ fontSize: 40 }} />}
                    variant="corporate"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <CoachingPathCard 
                    title="Individual Coaching"
                    description="1:1 coaching for neurodivergent professionals. Build systems that work with your brain."
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
        <AppContainer>
          <Grid container spacing={8} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <AppText variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
                Stop feeling overwhelmed by complex systems.
              </AppText>
              <AppText variant="body1" color="text.secondary" paragraph>
                Whether you're managing a global team or trying to manage your own executive function, the root cause of friction is often a lack of clear systems.
              </AppText>
              <AppText variant="body1" color="text.secondary">
                We bridge the gap between where you are and where you want to be using evidence-based coaching and organizational psychology.
              </AppText>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  bgcolor: 'background.default',
                  height: 300,
                  borderRadius: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <AppText variant="h6" color="text.secondary">Visual Illustration Placeholder</AppText>
              </Box>
            </Grid>
          </Grid>
        </AppContainer>
      </AppSection>

      {/* Authority Section */}
      <AppSection variant="dark" sx={{ textAlign: 'center' }}>
        <AppContainer maxWidth="md">
          <AppText variant="h3" gutterBottom sx={{ color: 'primary.contrastText', fontWeight: 700 }}>
            Trusted by Leaders & Business Owners.
          </AppText>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 6, flexWrap: 'wrap', opacity: 0.9, mt: 4 }}>
            <AppText variant="h5" sx={{ fontWeight: 600 }}>The Brasslamp</AppText>
            <AppText variant="h5" sx={{ fontWeight: 600 }}>Imperial Valley College</AppText>
            <AppText variant="h5" sx={{ fontWeight: 600 }}>Biotech Partners</AppText>
            <AppText variant="h5" sx={{ fontWeight: 600 }}>Real Estate Dynamics</AppText>
          </Box>
        </AppContainer>
      </AppSection>

      {/* Testimonials */}
      <AppSection variant="light">
        <AppContainer>
          <AppText variant="h3" sx={{ textAlign: 'center', mb: 8, fontWeight: 700 }}>
            Success Stories
          </AppText>
          <Grid container spacing={4}>
            {testimonials.map((testimonial, i) => (
              <Grid size={{ xs: 12, md: 4 }} key={i}>
                <TestimonialCard {...testimonial} />
              </Grid>
            ))}
          </Grid>
        </AppContainer>
      </AppSection>

      {/* Final CTA section */}
      <AppSection variant="white" sx={{ textAlign: 'center' }}>
        <AppContainer maxWidth="sm">
          <AppText variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
            Ready to Start Your Journey?
          </AppText>
          <AppText variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Choose the path that fits your current needs and let's build something great together.
          </AppText>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <AppButton variant="contained" color="primary" size="large" component={RouterLink} to="/corporate">
              Corporate Path
            </AppButton>
            <AppButton variant="outlined" color="secondary" size="large" component={RouterLink} to="/individual">
              Individual Path
            </AppButton>
          </Box>
        </AppContainer>
      </AppSection>
    </>
  );
};

export default Home;
