import React from 'react';
import { Grid, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AppText from '../components/ui/AppText';
import AppSection from '../components/ui/AppSection';
import AppContainer from '../components/ui/AppContainer';
import AppButton from '../components/ui/AppButton';
import AppCard from '../components/ui/AppCard';
import SectionHeading from '../components/ui/SectionHeading';
import PhotoFrame from '../components/ui/PhotoFrame';
import Accent from '../components/brand/Accent';
import CtaGroup from '../components/marketing/CtaGroup';
import DirectCta from '../components/marketing/DirectCta';
import SecondaryCta from '../components/marketing/SecondaryCta';
import ClosingCtaBand from '../components/marketing/ClosingCtaBand';
import tammyImg from '../assets/tammy.webp';
import tammyWithMaxwellImg from '../assets/tammy_with_jon.png';

const About: React.FC = () => {
  return (
    <>
      {/* Hero / Intro */}
      <AppSection tone="cream" sx={{ pt: { xs: 6, md: 10 } }}>
        <AppContainer>
          <Grid container spacing={{ xs: 6, md: 10 }} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <AppText variant="h1" sx={{ mb: 3 }}>
                Meet Tammy Summers
              </AppText>
              <AppText variant="lead" sx={{ mb: 2, fontWeight: 600, color: 'brand.navy' }}>
                Transforming Learning Through Authentic Connection
              </AppText>
              <AppText variant="body1" sx={{ mb: 4 }}>
                Tammy Summers brings a unique blend of leadership expertise, educational passion, and specialized communication training that creates meaningful change for individuals and organizations alike.
              </AppText>
              <CtaGroup>
                <DirectCta id="about_hero" location="hero" />
                <SecondaryCta id="about_hero" location="hero" />
              </CtaGroup>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <PhotoFrame variant="outline" sx={{ maxWidth: 460, mx: 'auto' }}>
                <Box
                  component="img"
                  src={tammyImg}
                  alt="Tammy Summers, leadership trainer and coach"
                  width={759}
                  height={1142}
                  sx={{ width: '100%', height: 'auto' }}
                />
              </PhotoFrame>
            </Grid>
          </Grid>
        </AppContainer>
      </AppSection>

      {/* Authority: leadership track record */}
      <AppSection tone="sand">
        <AppContainer>
          <Grid container spacing={{ xs: 6, md: 10 }} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 5 }} sx={{ order: { xs: 2, md: 1 } }}>
              {/* Credential callout: the photo and its caption as one figure */}
              <AppCard component="figure" padded={false} sx={{ m: 0, maxWidth: 400, mx: 'auto' }}>
                <Box
                  component="img"
                  src={tammyWithMaxwellImg}
                  alt="Tammy Summers with John C. Maxwell at the Maxwell Leadership Certified Team event in Orlando, Florida, March 2024"
                  width={388}
                  height={539}
                  loading="lazy"
                  sx={{ display: 'block', width: '100%', height: 'auto' }}
                />
                <Box component="figcaption" sx={{ p: 3, borderTop: 1, borderColor: 'brand.cardBorder' }}>
                  <AppText variant="eyebrow" color="primary" sx={{ mb: 1 }}>
                    Maxwell Leadership Certified Team
                  </AppText>
                  <AppText variant="body2">
                    Pictured with John C. Maxwell in Orlando, March 2024. As a certified member of the Maxwell Leadership Team, Tammy delivers world-class leadership curriculum.
                  </AppText>
                </Box>
              </AppCard>
            </Grid>
            <Grid size={{ xs: 12, md: 7 }} sx={{ order: { xs: 1, md: 2 } }}>
              <AppText variant="h2" component="h2" sx={{ mb: 3 }}>
                A Leader Who <Accent>Develops Leaders</Accent>
              </AppText>
              <AppText variant="lead" paragraph>
                With over 45 talented professionals guided across the US and Philippines in the biotechnology sector, Tammy&apos;s leadership journey began in her Girl Scout days and has flourished into a career defined by one principle: helping others reach their full potential.
              </AppText>
              <AppText variant="body1">
                Her track record speaks volumes&mdash;numerous team members promoted, careers launched, and talents discovered under her mentorship.
              </AppText>
            </Grid>
          </Grid>
        </AppContainer>
      </AppSection>

      {/* Philosophy, then the direct CTA */}
      <AppSection tone="cream">
        <AppContainer maxWidth="md" sx={{ textAlign: 'center' }}>
          <AppText variant="h2" component="h2" sx={{ mb: 3 }}>
            Making Complex Concepts Accessible
          </AppText>
          <AppText variant="lead" paragraph>
            Now a full-time business professor at Imperial Valley College, Tammy transformed how 35 students engage with business law, a notoriously challenging subject.
          </AppText>
          <AppText variant="body1" sx={{ mb: 5 }}>
            &quot;Learning isn&apos;t passive—it&apos;s experiential, collaborative, and immediately applicable.&quot; This is the Tammy Summers approach. Her classroom buzzes with group discussions where students become teachers, sharing their unique perspectives and building collective knowledge.
          </AppText>
          <CtaGroup align="center">
            <DirectCta id="about_philosophy" location="guide" />
          </CtaGroup>
        </AppContainer>
      </AppSection>

      {/* Specialized focus, on a navy band */}
      <AppSection tone="navy">
        <AppContainer>
          <Grid container spacing={{ xs: 6, md: 8 }} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 6 }} sx={{ order: { xs: 2, md: 1 } }}>
              <AppCard>
                <AppText variant="h3" component="h3" sx={{ fontSize: '1.5rem', mb: 2 }}>
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
              </AppCard>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} sx={{ order: { xs: 1, md: 2 } }}>
              <AppText variant="h2" component="h2" sx={{ mb: 3 }}>
                Two Paths, <Accent>One Philosophy.</Accent>
              </AppText>
              <AppText variant="lead" paragraph>
                Why do we serve both corporate teams and neurodivergent individuals? Because they are two sides of the same coin.
              </AppText>
              <AppText variant="body1">
                Organizations are just collections of brains. If you don&apos;t understand how a single brain works, you can&apos;t build a system for a thousand brains. Our work bridges the gap between human potential and organizational reality.
              </AppText>
            </Grid>
          </Grid>
        </AppContainer>
      </AppSection>

      <AppSection tone="cream">
        <AppContainer>
          <SectionHeading title="Mission, Vision & Values" />
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <AppCard sx={{ height: '100%' }}>
                <AppText variant="eyebrow" color="primary" sx={{ mb: 1.5 }}>
                  Our mission
                </AppText>
                <AppText variant="lead">
                  We provide innovative leadership and development tools that enhance team performance, build trust and create a customer-centric environment that drives business and individual success.
                </AppText>
              </AppCard>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <AppCard sx={{ height: '100%' }}>
                <AppText variant="eyebrow" color="primary" sx={{ mb: 1.5 }}>
                  Our vision
                </AppText>
                <AppText variant="lead">
                  We inspire and equip individuals and teams to lead themselves and others, fostering a culture of continuous development.
                </AppText>
              </AppCard>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            {['Trust', 'Transparency', 'Integrity'].map((value) => (
              <Grid size={{ xs: 12, sm: 4 }} key={value}>
                <AppCard sx={{ height: '100%', textAlign: 'center' }}>
                  <Box aria-hidden="true" sx={{ width: 40, height: 3, mx: 'auto', mb: 2, borderRadius: 1, bgcolor: 'brand.gold' }} />
                  <AppText variant="h3" component="h3" sx={{ fontSize: '1.5rem' }}>
                    {value}
                  </AppText>
                </AppCard>
              </Grid>
            ))}
          </Grid>
        </AppContainer>
      </AppSection>

      <ClosingCtaBand
        title={<>Join the <Accent>conversation.</Accent></>}
        subtitle="Read the blog for insights on leadership and neurodiversity, or get in touch to start a conversation."
        ctaId="about_final"
        extraActions={
          <AppButton analytics={{ id: 'about_final_blog', location: 'final_cta', intent: 'blog' }} variant="outlined" color="primary" size="large" component={RouterLink} to="/blog">
            Read the Blog
          </AppButton>
        }
      />
    </>
  );
};

export default About;
