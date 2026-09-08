import React from 'react';
import { Grid, Box, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AppText from '../components/ui/AppText';
import AppSection from '../components/ui/AppSection';
import AppContainer from '../components/ui/AppContainer';
import AppButton from '../components/ui/AppButton';
import tammyImg from '../assets/tammy.jpg';
import tammyWithMaxwellImg from '../assets/tammy_with_jon.png';

const About: React.FC = () => {
  return (
    <>
      {/* Hero / Intro */}
      <AppSection variant="light">
        <AppContainer>
          <Grid container spacing={8} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <AppText variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
                Meet Tammy Summers
              </AppText>
              <AppText variant="h5" component="p" color="primary.main" gutterBottom sx={{ fontWeight: 600 }}>
                Transforming Learning Through Authentic Connection
              </AppText>
              <AppText variant="body1" paragraph>
                Tammy Summers brings a unique blend of leadership expertise, educational passion, and specialized communication training that creates meaningful change for individuals and organizations alike.
              </AppText>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box 
                component="img" 
                src={tammyImg} 
                alt="Tammy Summers, leadership trainer and coach" 
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

      {/* Authority: leadership track record */}
      <AppSection variant="white">
        <AppContainer>
          <Grid container spacing={{ xs: 5, md: 8 }} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 5 }} sx={{ order: { xs: 2, md: 1 } }}>
              <Box
                component="img"
                src={tammyWithMaxwellImg}
                alt="Tammy Summers with John C. Maxwell at the Maxwell Leadership Certified Team event in Orlando, Florida, March 2024"
                sx={{
                  display: 'block',
                  width: '100%',
                  maxWidth: { xs: 300, md: 380 },
                  mx: 'auto',
                  height: 'auto',
                  borderRadius: 4,
                  boxShadow: 4,
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 7 }} sx={{ order: { xs: 1, md: 2 } }}>
              <AppText variant="h3" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
                A Leader Who Develops Leaders
              </AppText>
              <AppText variant="body1" paragraph sx={{ fontSize: '1.1rem' }}>
                With over 45 talented professionals guided across the US and Philippines in the biotechnology sector, Tammy&apos;s leadership journey began in her Girl Scout days and has flourished into a career defined by one principle: helping others reach their full potential.
              </AppText>
              <AppText variant="body1" paragraph sx={{ color: 'text.secondary' }}>
                Her track record speaks volumes&mdash;numerous team members promoted, careers launched, and talents discovered under her mentorship.
              </AppText>
              <Box
                sx={{
                  mt: 4,
                  pl: 3,
                  borderLeft: '4px solid',
                  borderColor: 'secondary.main',
                }}
              >
                <AppText variant="overline" component="p" sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: '0.08em' }}>
                  Maxwell Leadership Certified Team
                </AppText>
                <AppText variant="body1" color="text.secondary">
                  Pictured with John C. Maxwell in Orlando, March 2024. As a certified member of the Maxwell Leadership Team, Tammy delivers world-class leadership curriculum.
                </AppText>
              </Box>
            </Grid>
          </Grid>
        </AppContainer>
      </AppSection>

      {/* Philosophy */}
      <AppSection variant="light">
        <AppContainer maxWidth="md">
          <AppText variant="h3" component="h2" gutterBottom sx={{ textAlign: 'center', fontWeight: 700 }}>
            Making Complex Concepts Accessible
          </AppText>
          <AppText variant="body1" paragraph sx={{ fontSize: '1.1rem', textAlign: 'center' }}>
            Now a full-time business professor at Imperial Valley College, Tammy transformed how 35 students engage with business law, a notoriously challenging subject.
          </AppText>
          <AppText variant="body1" sx={{ textAlign: 'center', color: 'text.secondary' }}>
            &quot;Learning isn&apos;t passive—it&apos;s experiential, collaborative, and immediately applicable.&quot; This is the Tammy Summers approach. Her classroom buzzes with group discussions where students become teachers, sharing their unique perspectives and building collective knowledge.
          </AppText>
        </AppContainer>
      </AppSection>

      {/* Specialized Focus */}
      <AppSection variant="white">
        <AppContainer>
          <Grid container spacing={8} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 6 }} sx={{ order: { xs: 2, md: 1 } }}>
              <Box sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 4, boxShadow: 2 }}>
                <AppText variant="h5" component="h3" gutterBottom sx={{ fontWeight: 700 }}>
                  Empowering Every Voice
                </AppText>
                <AppText variant="body1" paragraph>
                  Tammy&apos;s most profound work centers on neurodivergent individuals discovering and strengthening their voices. She believes deeply that every voice has power and deserves to be heard.
                </AppText>
                <AppText variant="body1" paragraph>
                  Using Pivotal Response Treatment (PRT), she targets the foundations of communication—motivation, self-initiation, self-management, and responding to multiple cues.
                </AppText>
                <AppText variant="body1">
                  Tammy also helps master our &quot;second language&quot;—body language. She helps individuals master both verbal and non-verbal communication, building the confidence and clarity that transforms how they connect with the world.
                </AppText>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} sx={{ order: { xs: 1, md: 2 } }}>
              <AppText variant="h3" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
                Two Paths, One Philosophy.
              </AppText>
              <AppText variant="body1" color="text.secondary" paragraph>
                Why do we serve both corporate teams and neurodivergent individuals? Because they are two sides of the same coin.
              </AppText>
              <AppText variant="body1" color="text.secondary">
                Organizations are just collections of brains. If you don&apos;t understand how a single brain works, you can&apos;t build a system for a thousand brains. Our work bridges the gap between human potential and organizational reality.
              </AppText>
            </Grid>
          </Grid>
        </AppContainer>
      </AppSection>

       <AppSection variant="light">
        <AppContainer>
          <AppText variant="h3" component="h2" sx={{ textAlign: 'center', mb: { xs: 5, md: 8 }, fontWeight: 700 }}>
            Mission, Vision &amp; Values
          </AppText>
          <Grid container spacing={4} sx={{ mb: { xs: 5, md: 8 } }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper sx={{ p: 4, height: '100%' }}>
                <AppText variant="overline" component="p" sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: '0.08em' }}>
                  Our mission
                </AppText>
                <AppText variant="body1">
                  We provide innovative leadership and development tools that enhance team performance, build trust and create a customer-centric environment that drives business and individual success.
                </AppText>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper sx={{ p: 4, height: '100%' }}>
                <AppText variant="overline" component="p" sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: '0.08em' }}>
                  Our vision
                </AppText>
                <AppText variant="body1">
                  We inspire and equip individuals and teams to lead themselves and others, fostering a culture of continuous development.
                </AppText>
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
            {['Trust', 'Transparency', 'Integrity'].map((value) => (
              <Grid size={{ xs: 12, sm: 4 }} key={value}>
                <Paper sx={{ p: 4, height: '100%', textAlign: 'center', borderTop: '4px solid', borderTopColor: 'secondary.main' }}>
                  <AppText variant="h6" component="h3" sx={{ fontWeight: 700 }}>
                    {value}
                  </AppText>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </AppContainer>
      </AppSection>

      {/* CTA */}
      <AppSection variant="dark" sx={{ textAlign: 'center' }}>
        <AppContainer maxWidth="sm">
          <AppText variant="h3" component="h2" gutterBottom>
            Join the conversation.
          </AppText>
          <AppText variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
            Read the blog for insights on leadership and neurodiversity, or get in touch to start a conversation.
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

export default About;
