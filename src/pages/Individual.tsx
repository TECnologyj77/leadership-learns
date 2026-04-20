import React from 'react';
import { Grid, Box, List, ListItem, ListItemIcon, ListItemText, Paper } from '@mui/material';
import { CheckCircleOutlined as CheckCircleOutlineIcon, Psychology as PsychologyIcon, Speed as SpeedIcon, SelfImprovement as SelfImprovementIcon } from '@mui/icons-material';
import AppText from '../components/ui/AppText';
import AppSection from '../components/ui/AppSection';
import AppContainer from '../components/ui/AppContainer';
import AppButton from '../components/ui/AppButton';
import ServiceCard from '../components/marketing/ServiceCard';
import TestimonialCard from '../components/marketing/TestimonialCard';
import speechCoachingImg from '../assets/services/Speech Coaching.jpg';
import studentDiscImg from '../assets/services/Student + Career DISC Assessment and Debrief.jpeg';
import salesDiscImg from '../assets/services/Sales DISC Assessment and Debrief.jpg';

const individualTestimonials = [
  {
    quote: "I enjoy working with my public speaking coach. I'm autistic and she understands how to help me become a better public speaker. It's my new job.",
    author: "Austin Morales",
    role: "Public Speaking Client"
  },
  {
    quote: "Tammy is very supportive and she provides techniques that are easy to learn which helped me gain confidence. I enhanced my public speaking for work and learned how to respond to questions concisely.",
    author: "Angela Jones",
    role: "Professional Coaching Client"
  }
];

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
                1:1 Coaching for neurodivergent professionals and individuals. Discover and strengthen your voice through authentic connection.
              </AppText>
              <AppButton variant="contained" color="secondary" size="large">
                Start Your Journey
              </AppButton>
            </Grid>
          </Grid>
        </AppContainer>
      </AppSection>

      {/* Pain points */}
      <AppSection variant="white">
        <AppContainer maxWidth="md">
          <AppText variant="h3" sx={{ textAlign: 'center', mb: 8, fontWeight: 700 }}>
            Do you struggle to connect?
          </AppText>
          <Grid container spacing={4}>
            {[
              'You have brilliant ideas but struggle to vocalize them in meetings.',
              'Social cues and body language feel like a "second language" you haven\'t mastered.',
              'You feel like you are working 2x harder than others to be understood.',
              'Public speaking feels like an insurmountable wall between you and your career goals.'
            ].map((text, i) => (
              <Grid size={{ xs: 12, sm: 6 }} key={i}>
                <Paper sx={{ p: 3, height: '100%', borderLeft: '4px solid', borderLeftColor: 'secondary.main' }}>
                  <AppText variant="body1">{text}</AppText>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </AppContainer>
      </AppSection>

      {/* Reframe section */}
      <AppSection variant="dark" sx={{ bgcolor: 'secondary.main' }}>
        <AppContainer sx={{ textAlign: 'center' }}>
          <AppText variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
            Master your verbal and non-verbal communication.
          </AppText>
          <AppText variant="h6" sx={{ opacity: 0.9 }}>
            We use Pivotal Response Treatment (PRT) to target the foundations of communication: motivation, self-management, and confidence.
          </AppText>
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
                description="Become a confident public speaker. We understand how to help neurodivergent individuals master the stage."
                image={speechCoachingImg}
                features={['Public speaking techniques', 'Confidence building', 'Concise communication']}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ServiceCard 
                title="Student & Career DISC"
                description="Discover your natural strengths and learn how to navigate academic or professional environments."
                image={studentDiscImg}
                features={['Strengths identification', 'Communication styles', 'Career path alignment']}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ServiceCard 
                title="Sales & Entrepreneur DISC"
                description="Master the art of connection for your business. Use body language to create critical first impressions."
                image={salesDiscImg}
                features={['Sales communication', 'Non-verbal cues', 'Building trust']}
              />
            </Grid>
          </Grid>
        </AppContainer>
      </AppSection>

      {/* Testimonials */}
      <AppSection variant="light">
        <AppContainer>
          <AppText variant="h3" sx={{ textAlign: 'center', mb: 8, fontWeight: 700 }}>
            Client Success
          </AppText>
          <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
            {individualTestimonials.map((testimonial, i) => (
              <Grid size={{ xs: 12, md: 6 }} key={i}>
                <TestimonialCard {...testimonial} />
              </Grid>
            ))}
          </Grid>
        </AppContainer>
      </AppSection>

      {/* Coaching approach */}
      <AppSection variant="white">
        <AppContainer>
          <AppText variant="h3" sx={{ textAlign: 'center', mb: 8, fontWeight: 700 }}>
            The Leadership Learners Approach
          </AppText>
          <Grid container spacing={6}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ textAlign: 'center' }}>
                <PsychologyIcon sx={{ fontSize: 60, color: 'secondary.main', mb: 2 }} />
                <AppText variant="h5" gutterBottom sx={{ fontWeight: 600 }}>Clarity</AppText>
                <AppText variant="body2" color="text.secondary">
                  Understanding your specific executive function profile and where the friction points actually are.
                </AppText>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ textAlign: 'center' }}>
                <SpeedIcon sx={{ fontSize: 60, color: 'secondary.main', mb: 2 }} />
                <AppText variant="h5" gutterBottom sx={{ fontWeight: 600 }}>Systems</AppText>
                <AppText variant="body2" color="text.secondary">
                  Building low-friction, high-reward systems for task management, focus, and energy regulation.
                </AppText>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ textAlign: 'center' }}>
                <SelfImprovementIcon sx={{ fontSize: 60, color: 'secondary.main', mb: 2 }} />
                <AppText variant="h5" gutterBottom sx={{ fontWeight: 600 }}>Identity</AppText>
                <AppText variant="body2" color="text.secondary">
                  Moving from "shame-based" productivity to "identity-aligned" growth and self-advocacy.
                </AppText>
              </Box>
            </Grid>
          </Grid>
        </AppContainer>
      </AppSection>

      {/* Transformation outcomes */}
      <AppSection variant="light">
        <AppContainer>
          <Grid container spacing={8} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <AppText variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
                What change looks like.
              </AppText>
              <List>
                {[
                  'Consistent progress on long-term goals without the "heroic effort" spikes.',
                  'Clear boundaries between work and rest (without the guilt).',
                  'A toolkit of strategies that actually work when you are stressed.',
                  'Confidence in your ability to handle complex projects.'
                ].map((text, i) => (
                  <ListItem key={i} disablePadding sx={{ mb: 2 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <CheckCircleOutlineIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box 
                sx={{ 
                  bgcolor: 'secondary.main', 
                  height: 400, 
                  borderRadius: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  opacity: 0.8
                }}
              >
                <AppText variant="h6">Transformation Visualization</AppText>
              </Box>
            </Grid>
          </Grid>
        </AppContainer>
      </AppSection>

      {/* Booking CTA */}
      <AppSection variant="dark" sx={{ textAlign: 'center' }}>
        <AppContainer maxWidth="sm">
          <AppText variant="h3" gutterBottom>
            Reclaim your focus.
          </AppText>
          <AppText variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
            Schedule a free 20-minute consultation to see if neurodivergent coaching is right for you.
          </AppText>
          <AppButton variant="contained" color="secondary" size="large">
            Check Availability
          </AppButton>
        </AppContainer>
      </AppSection>
    </>
  );
};

export default Individual;
