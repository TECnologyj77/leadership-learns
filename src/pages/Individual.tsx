import React from 'react';
import { Grid, Box, Paper } from '@mui/material';
import { CheckCircleOutlined as CheckCircleOutlineIcon, Psychology as PsychologyIcon, RecordVoiceOver as RecordVoiceOverIcon, EmojiPeople as EmojiPeopleIcon } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import AppText from '../components/ui/AppText';
import AppSection from '../components/ui/AppSection';
import AppContainer from '../components/ui/AppContainer';
import AppButton from '../components/ui/AppButton';
import ServiceCard from '../components/marketing/ServiceCard';
import TestimonialCard from '../components/marketing/TestimonialCard';
import ProcessSteps from '../components/marketing/ProcessSteps';
import speechCoachingImg from '../assets/services/Speech Coaching.jpg';
import studentDiscImg from '../assets/services/Student + Career DISC Assessment and Debrief.jpeg';
import salesDiscImg from '../assets/services/Sales DISC Assessment and Debrief.jpg';
import { individualTestimonials } from '../content/testimonials';

const Individual: React.FC = () => {
  return (
    <>
      {/* Hero */}
      <AppSection variant="light" sx={{ py: { xs: 10, md: 15 } }}>
        <AppContainer>
          <Grid container spacing={6} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 7 }}>
              <AppText variant="overline" component="p" sx={{ color: 'secondary.dark', fontWeight: 700, letterSpacing: '0.08em' }}>
                For individuals & neurodivergent professionals
              </AppText>
              <AppText variant="h1" gutterBottom sx={{ color: 'secondary.main', fontWeight: 800 }}>
                Every Voice Has Power. <br />
                Yours Deserves to be Heard.
              </AppText>
              <AppText variant="h5" component="p" color="text.secondary" sx={{ mb: 4 }}>
                1:1 Coaching for neurodivergent professionals and individuals. Discover and strengthen your voice through authentic connection.
              </AppText>
              <AppButton variant="contained" color="secondary" size="large" component={RouterLink} to="/contact">
                Contact Tammy
              </AppButton>
              <AppText variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Call or email to discuss your communication goals and coaching or assessment options.
              </AppText>
            </Grid>
          </Grid>
        </AppContainer>
      </AppSection>

      {/* Pain points */}
      <AppSection variant="white">
        <AppContainer maxWidth="md">
          <AppText variant="h3" component="h2" sx={{ textAlign: 'center', mb: 8, fontWeight: 700 }}>
            When getting your message across feels difficult
          </AppText>
          <Grid container spacing={4}>
            {[
              'Finding the words you want in meetings or everyday conversations.',
              'Feeling nervous before a presentation or when you\'re put on the spot.',
              'Leaving a conversation unsure whether you were understood.',
              'Finding communication advice that fits the way you think and express yourself.'
            ].map((text, i) => (
              <Grid size={{ xs: 12, sm: 6 }} key={i}>
                <Paper sx={{ p: 3, height: '100%', borderLeft: '4px solid', borderLeftColor: 'secondary.main' }}>
                  <AppText variant="body1">{text}</AppText>
                </Paper>
              </Grid>
            ))}
          </Grid>
          <AppText variant="body1" sx={{ textAlign: 'center', mt: 4 }}>
            You deserve support that helps you communicate in ways that work for you.
          </AppText>
        </AppContainer>
      </AppSection>

      {/* Reframe section: the palette's own contrast text on gold clears AA at any size */}
      <AppSection variant="dark" sx={{ bgcolor: 'secondary.main', color: 'secondary.contrastText' }}>
        <AppContainer sx={{ textAlign: 'center' }}>
          <AppText variant="h3" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
            Master your verbal and non-verbal communication.
          </AppText>
          <AppText variant="h6" component="p">
            We use Pivotal Response Treatment (PRT) to target the foundations of communication: motivation, self-management, and confidence.
          </AppText>
        </AppContainer>
      </AppSection>

      {/* Services breakdown */}
      <AppSection variant="white">
        <AppContainer>
          <AppText variant="h3" component="h2" sx={{ textAlign: 'center', mb: 8, fontWeight: 700 }}>
            Specialized Coaching
          </AppText>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 4 }}>
              <ServiceCard 
                title="Speech Coaching"
                description="Become a confident public speaker. We understand how to help neurodivergent individuals master the stage."
                image={speechCoachingImg}
                imageAlt="A speaker presenting to a room beside a session recap slide."
                features={['Public speaking techniques', 'Confidence building', 'Concise communication']}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ServiceCard 
                title="Student & Career DISC"
                description="Discover your natural strengths and learn how to navigate academic or professional environments."
                image={studentDiscImg}
                imageAlt="Students working at their desks in a classroom."
                features={['Strengths identification', 'Communication styles', 'Career path alignment']}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ServiceCard 
                title="Sales & Entrepreneur DISC"
                description="Master the art of connection for your business. Use body language to create critical first impressions."
                image={salesDiscImg}
                imageAlt="Four people standing together after a session."
                features={['Sales communication', 'Non-verbal cues', 'Building trust']}
              />
            </Grid>
          </Grid>
        </AppContainer>
      </AppSection>

      {/* Testimonials */}
      <AppSection variant="light">
        <AppContainer>
          <AppText variant="h3" component="h2" sx={{ textAlign: 'center', mb: 8, fontWeight: 700 }}>
            Client Success
          </AppText>
          <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
            {individualTestimonials.map((testimonial) => (
              <Grid size={{ xs: 12, md: 6 }} key={testimonial.author}>
                <TestimonialCard {...testimonial} />
              </Grid>
            ))}
          </Grid>
        </AppContainer>
      </AppSection>

      {/* Coaching approach */}
      <AppSection variant="white">
        <AppContainer>
          <AppText variant="h3" component="h2" sx={{ textAlign: 'center', mb: 8, fontWeight: 700 }}>
            The Leadership Learners Approach
          </AppText>
          <Grid container spacing={6}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ textAlign: 'center' }}>
                <PsychologyIcon sx={{ fontSize: 60, color: 'secondary.main', mb: 2 }} />
                <AppText variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>Your Interests</AppText>
                <AppText variant="body2" color="text.secondary">
                  Coaching starts from each person&apos;s natural interests, so communication, social skills, and confidence grow organically.
                </AppText>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ textAlign: 'center' }}>
                <RecordVoiceOverIcon sx={{ fontSize: 60, color: 'secondary.main', mb: 2 }} />
                <AppText variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>Foundations</AppText>
                <AppText variant="body2" color="text.secondary">
                  Pivotal Response Treatment targets motivation, self-initiation, self-management, and responding to multiple cues.
                </AppText>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ textAlign: 'center' }}>
                <EmojiPeopleIcon sx={{ fontSize: 60, color: 'secondary.main', mb: 2 }} />
                <AppText variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>Second Language</AppText>
                <AppText variant="body2" color="text.secondary">
                  We are all already bilingual. Tammy helps you master body language alongside the words you say.
                </AppText>
              </Box>
            </Grid>
          </Grid>
        </AppContainer>
      </AppSection>

      {/* Transformation outcomes */}
      <AppSection variant="light">
        <AppContainer maxWidth="md">
          <AppText variant="h3" component="h2" sx={{ textAlign: 'center', mb: { xs: 5, md: 8 }, fontWeight: 700 }}>
            What change looks like.
          </AppText>
          <Grid container spacing={3}>
            {[
              'Speaking up in meetings and everyday conversations with more confidence.',
              'Public speaking that feels manageable rather than insurmountable.',
              'Techniques that are easy to learn for answering questions concisely.',
              'Body language that makes the first impression you intend.'
            ].map((text) => (
              <Grid size={{ xs: 12, sm: 6 }} key={text}>
                <Paper sx={{ p: 3, height: '100%', display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <CheckCircleOutlineIcon color="secondary" sx={{ mt: '2px' }} />
                  <AppText variant="body1">{text}</AppText>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </AppContainer>
      </AppSection>

      {/* Plan: what working together looks like */}
      <AppSection variant="white">
        <AppContainer maxWidth="md">
          <AppText variant="h3" component="h2" sx={{ textAlign: 'center', mb: 2, fontWeight: 700 }}>
            How to get started with individual support
          </AppText>
          <AppText variant="body1" color="text.secondary" sx={{ textAlign: 'center', mb: 8 }}>
            Start with a call or email about what you'd like to work on.
          </AppText>
          <ProcessSteps
            color="secondary"
            steps={[
              {
                title: 'Tell Tammy your goal',
                description: 'Call or email Tammy about your communication goals, such as speaking up, presentations, or everyday conversations.',
              },
              {
                title: 'Choose the right support',
                description: 'Discuss whether coaching or a DISC assessment fits your goals. Ask about the approach, cost, and next steps.',
              },
              {
                title: 'Begin working together',
                description: 'Start the coaching or assessment you\'ve discussed.',
              },
            ]}
          />
        </AppContainer>
      </AppSection>

      <AppSection variant="dark" sx={{ textAlign: 'center' }}>
        <AppContainer maxWidth="sm">
          <AppText variant="h3" component="h2" gutterBottom>
            Take the next step toward speaking with confidence.
          </AppText>
          <AppText variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
            Contact Tammy to discuss public speaking, everyday communication, or understanding your communication style.
          </AppText>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <AppButton variant="contained" color="secondary" size="large" component={RouterLink} to="/contact">
              Contact Tammy
            </AppButton>
          </Box>
        </AppContainer>
      </AppSection>
    </>
  );
};

export default Individual;
