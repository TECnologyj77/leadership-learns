import React from 'react';
import { Grid, Box, Link, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import AppText from '../components/ui/AppText';
import AppButton from '../components/ui/AppButton';
import AppSection from '../components/ui/AppSection';
import AppContainer from '../components/ui/AppContainer';
import CoachingPathCard from '../components/marketing/CoachingPathCard';
import TestimonialCard from '../components/marketing/TestimonialCard';
import ProcessSteps from '../components/marketing/ProcessSteps';
import VideoPlayer from '../components/ui/VideoPlayer';
import overallVideo from '../assets/Overall Video (9x16).mp4';
import tammyImg from '../assets/tammy.jpg';
import { homeTestimonials } from '../content/testimonials';

const Home: React.FC = () => {
  return (
    <>
      {/* Hero: what this is, who it is for, and one clear next step */}
      <AppSection variant="light" sx={{ py: { xs: 8, md: 12 } }}>
        <AppContainer>
          <Grid container spacing={{ xs: 6, md: 8 }} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 7 }}>
              <AppText variant="h1" gutterBottom sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, fontWeight: 800 }}>
                Build a stronger team.{' '}
                <Box component="span" sx={{ display: { md: 'block' }, color: 'primary.main' }}>Speak with more confidence.</Box>
              </AppText>
              <AppText variant="h5" component="p" color="text.secondary" sx={{ mb: 3, maxWidth: 600 }}>
                Leadership training for managers and teams, plus one-to-one communication coaching for individuals, including neurodivergent adults.
              </AppText>
              <AppText variant="body1" sx={{ mb: 4, maxWidth: 600, fontWeight: 600 }}>
                Training, coaching, and DISC assessments led by Tammy Summers.
              </AppText>
              <AppButton variant="contained" color="primary" size="large" component={RouterLink} to="/contact">
                Contact Tammy
              </AppButton>
              <AppText variant="body2" color="text.secondary" sx={{ mt: 2, maxWidth: 600 }}>
                Call or email to discuss your goals and the support you're looking for.
              </AppText>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  columnGap: 3,
                  rowGap: 1,
                  mt: 2,
                  '& a': {
                    display: 'inline-flex',
                    alignItems: 'center',
                    minHeight: 44,
                    py: 1,
                    fontWeight: 600,
                    textUnderlineOffset: '0.2em',
                    '&:focus-visible': {
                      outline: '2px solid',
                      outlineColor: 'primary.main',
                      outlineOffset: 4,
                      borderRadius: 1,
                    },
                  },
                }}
              >
                <Link component={RouterLink} to="/corporate">Develop my team</Link>
                <Link component={RouterLink} to="/individual">Build my communication skills</Link>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <VideoPlayer src={overallVideo} variant="vertical" />
              </Box>
            </Grid>
          </Grid>
        </AppContainer>
      </AppSection>

      {/* Path selection: the two audiences, side by side */}
      <AppSection variant="white">
        <AppContainer maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 8 }, maxWidth: 720, mx: 'auto' }}>
            <AppText variant="h3" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
              Which path fits you?
            </AppText>
            <AppText variant="body1" color="text.secondary">
              Choose support for your team or for your own communication goals.
            </AppText>
          </Box>
          <Grid container spacing={4} sx={{ alignItems: 'stretch' }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <CoachingPathCard
                audience="For managers & teams"
                title="Leadership Training"
                description="Develop your leadership skills and help your team communicate more clearly through group training and DISC assessments."
                items={['Group Leadership Training', 'Organizational DISC Assessments']}
                path="/corporate"
                buttonText="Explore leadership training"
                icon={<BusinessIcon sx={{ fontSize: 40 }} />}
                variant="corporate"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CoachingPathCard
                audience="For individuals"
                title="Communication Coaching"
                description="Build confidence in public speaking and everyday conversations with one-to-one coaching, including support for neurodivergent adults."
                items={['Speech Coaching', 'Student & Career DISC', 'Sales & Entrepreneur DISC']}
                path="/individual"
                buttonText="Explore individual coaching"
                icon={<PersonIcon sx={{ fontSize: 40 }} />}
                variant="individual"
              />
            </Grid>
          </Grid>
        </AppContainer>
      </AppSection>

      {/* Problem, framed for each audience */}
      <AppSection variant="light">
        <AppContainer maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 8 } }}>
            <AppText variant="h3" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
              It's frustrating when your message doesn't get through.
            </AppText>
            <AppText variant="body1" color="text.secondary">
              Misunderstandings can leave teams stuck and individuals feeling unheard.
            </AppText>
          </Box>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper sx={{ p: 4, height: '100%', borderLeft: '4px solid', borderLeftColor: 'primary.main' }}>
                <AppText variant="overline" component="p" sx={{ color: 'primary.main', fontWeight: 700 }}>
                  For managers &amp; teams
                </AppText>
                <AppText variant="body1">
                  You want to lead well, but unclear expectations and difficult conversations can leave your team pulling in different directions. It's frustrating when you keep coming back to the same misunderstandings.
                </AppText>
                <AppText variant="body1" sx={{ mt: 2 }}>
                  Your team deserves clear direction and the support to work well together.
                </AppText>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper sx={{ p: 4, height: '100%', borderLeft: '4px solid', borderLeftColor: 'secondary.main' }}>
                <AppText variant="overline" component="p" sx={{ color: 'secondary.dark', fontWeight: 700 }}>
                  For individuals
                </AppText>
                <AppText variant="body1">
                  Finding the words you want in a meeting, presentation, or everyday conversation can be difficult. Being misunderstood can leave you frustrated or hesitant to speak up.
                </AppText>
                <AppText variant="body1" sx={{ mt: 2 }}>
                  You deserve support that helps you communicate in ways that work for you.
                </AppText>
              </Paper>
            </Grid>
          </Grid>
        </AppContainer>
      </AppSection>

      {/* Guide: Tammy, before the visitor is asked to act */}
      <AppSection variant="white">
        <AppContainer>
          <Grid container spacing={{ xs: 5, md: 8 }} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 5 }}>
              <Box
                component="img"
                src={tammyImg}
                alt="Tammy Summers, leadership trainer and coach"
                sx={{ width: '100%', borderRadius: 4, boxShadow: 4, display: 'block' }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 7 }}>
              <AppText variant="overline" component="p" sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: '0.08em' }}>
                Your guide
              </AppText>
              <AppText variant="h3" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
                Meet Tammy Summers
              </AppText>
              <AppText variant="h6" component="p" color="primary.main" gutterBottom sx={{ fontWeight: 600 }}>
                Leadership Trainer, Coach &amp; Business Professor
              </AppText>
              <AppText variant="body1" paragraph>
                Tammy Summers brings a unique blend of leadership expertise, educational passion, and specialized communication training that creates meaningful change for individuals and organizations alike.
              </AppText>
              <AppText variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Whether you need facilitation for your team, specialized training for working with children and adults with autism, or someone who can make any subject engaging and actionable, Tammy delivers results through authentic connection and proven methodology.
              </AppText>
              <AppButton variant="outlined" color="primary" size="large" component={RouterLink} to="/about">
                Meet Tammy
              </AppButton>
            </Grid>
          </Grid>
        </AppContainer>
      </AppSection>

      {/* Authority Section */}
      <AppSection variant="dark" sx={{ textAlign: 'center' }}>
        <AppContainer maxWidth="lg">
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
          <AppText variant="h3" component="h2" sx={{ textAlign: 'center', mb: 2, fontWeight: 700 }}>
            Success Stories
          </AppText>
          <AppText variant="body1" color="text.secondary" sx={{ textAlign: 'center', mb: { xs: 5, md: 8 } }}>
            Business owners and individual clients, in their own words.
          </AppText>
          <Grid container spacing={4}>
            {homeTestimonials.map((testimonial) => (
              <Grid size={{ xs: 12, md: 4 }} key={testimonial.author}>
                <TestimonialCard {...testimonial} />
              </Grid>
            ))}
          </Grid>
        </AppContainer>
      </AppSection>

      {/* Plan: what happens after reaching out */}
      <AppSection variant="white">
        <AppContainer maxWidth="md">
          <AppText variant="h3" component="h2" sx={{ textAlign: 'center', mb: 2, fontWeight: 700 }}>
            Your next step starts with a conversation.
          </AppText>
          <AppText variant="body1" color="text.secondary" sx={{ textAlign: 'center', mb: { xs: 5, md: 8 } }}>
            Whether you're looking for support for yourself or your team, start by sharing what you'd like to improve.
          </AppText>
          <ProcessSteps
            color="primary"
            steps={[
              {
                title: 'Tell Tammy your goal',
                description: 'Call or email Tammy about what you or your team would like to improve.',
              },
              {
                title: 'Choose the right support',
                description: 'Discuss which service fits your goals, and ask about the approach, cost, and next steps.',
              },
              {
                title: 'Begin working together',
                description: 'Start the training, coaching, or DISC assessment you\'ve discussed.',
              },
            ]}
          />
        </AppContainer>
      </AppSection>

      {/* Final CTA */}
      <AppSection variant="dark" sx={{ textAlign: 'center' }}>
        <AppContainer maxWidth="sm">
          <AppText variant="h3" component="h2" gutterBottom>
            Take the next step toward clearer communication.
          </AppText>
          <AppText variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
            Tell Tammy what you or your team would like to improve, and discuss which support fits your goals.
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

export default Home;
