import React from 'react';
import { Grid, Box, Paper } from '@mui/material';
import AppText from '../components/ui/AppText';
import AppSection from '../components/ui/AppSection';
import AppContainer from '../components/ui/AppContainer';
import AppButton from '../components/ui/AppButton';
import tammyImg from '../assets/tammy.jpg';
import maxwellImg from '../assets/maxwell.jpg';

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
                Certified Leadership Coach & Educator
              </AppText>
              <AppText variant="body1" paragraph>
                Tammy Summers brings a unique blend of leadership expertise, educational passion, and specialized communication training that creates meaningful change for individuals and organizations alike.
              </AppText>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 3 }}>
                <Box 
                  component="img" 
                  src={maxwellImg} 
                  alt="John Maxwell Certified" 
                  sx={{ height: 60, borderRadius: 1 }} 
                />
                <AppText variant="body2" color="text.secondary">
                  Certified member of the John Maxwell Team, delivering world-class leadership curriculum.
                </AppText>
              </Box>
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
          <AppText variant="body1" paragraph sx={{ fontSize: '1.1rem', textAlign: 'center' }}>
            As a business law professor at Imperial Valley College, Tammy transformed how 35 students engage with a notoriously challenging subject.
          </AppText>
          <AppText variant="body1" sx={{ textAlign: 'center', color: 'text.secondary' }}>
            "Learning isn't passive—it's experiential, collaborative, and immediately applicable." This is the Tammy Summers approach. Her classroom buzzes with group discussions where students become teachers, sharing their unique perspectives and building collective knowledge.
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
                <AppText variant="body1" paragraph>
                  Tammy's most profound work centers on neurodivergent individuals discovering and strengthening their voices. She believes deeply that every voice has power and deserves to be heard.
                </AppText>
                <AppText variant="body1" paragraph>
                  Using Pivotal Response Treatment (PRT), she targets the foundations of communication—motivation, self-initiation, self-management, and responding to multiple cues.
                </AppText>
                <AppText variant="body1">
                  Tammy also helps master our "second language"—body language. She helps individuals master both verbal and non-verbal communication, building the confidence and clarity that transforms how they connect with the world.
                </AppText>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} sx={{ order: { xs: 1, md: 2 } }}>
              <AppText variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
                Two Paths, One Philosophy.
              </AppText>
              <AppText variant="body1" color="text.secondary" paragraph>
                Why do we serve both corporate teams and neurodivergent individuals? Because they are two sides of the same coin.
              </AppText>
              <AppText variant="body1" color="text.secondary">
                Organizations are just collections of brains. If you don't understand how a single brain works, you can't build a system for a thousand brains. Our work bridges the gap between human potential and organizational reality.
              </AppText>
            </Grid>
          </Grid>
        </AppContainer>
      </AppSection>

      {/* Values */}
      <AppSection variant="light">
        <AppContainer>
          <AppText variant="h3" sx={{ textAlign: 'center', mb: 8, fontWeight: 700 }}>
            Our Values
          </AppText>
          <Grid container spacing={4}>
            {[
              { title: 'Structured Clarity', desc: 'We believe structure is the foundation of freedom.' },
              { title: 'Radical Empathy', desc: 'We start by understanding the "why" behind the friction.' },
              { title: 'Evidence-Based', desc: 'Our methods are rooted in organizational psychology and neuroscience.' },
              { title: 'Sustainable Growth', desc: 'If it causes burnout, it isn\'t a system—it\'s a liability.' }
            ].map((value, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
                <Paper sx={{ p: 4, height: '100%', textAlign: 'center' }}>
                  <AppText variant="h6" gutterBottom sx={{ fontWeight: 700 }}>{value.title}</AppText>
                  <AppText variant="body2" color="text.secondary">{value.desc}</AppText>
                </Paper>
              </Grid>
            ))}
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
            Follow our blog for weekly insights or book a call to start your journey.
          </AppText>
          <AppButton variant="contained" color="secondary" size="large">
            Get in Touch
          </AppButton>
        </AppContainer>
      </AppSection>
    </>
  );
};

export default About;
