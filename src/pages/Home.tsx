import React from 'react';
import { Grid, Box, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AppText from '../components/ui/AppText';
import AppButton from '../components/ui/AppButton';
import AppSection from '../components/ui/AppSection';
import AppContainer from '../components/ui/AppContainer';
import SectionHeading from '../components/ui/SectionHeading';
import PhotoFrame from '../components/ui/PhotoFrame';
import HeroVideo from '../components/ui/HeroVideo';
import ServiceAreaLine from '../components/ui/ServiceAreaLine';
import Accent from '../components/brand/Accent';
import CtaGroup from '../components/marketing/CtaGroup';
import DirectCta from '../components/marketing/DirectCta';
import SecondaryCta from '../components/marketing/SecondaryCta';
import CredentialsBand from '../components/marketing/CredentialsBand';
import PathCard from '../components/marketing/PathCard';
import TestimonialsBand from '../components/marketing/TestimonialsBand';
import StepPlanSection from '../components/marketing/StepPlanSection';
import ClosingCtaBand from '../components/marketing/ClosingCtaBand';
import { trackCta } from '../lib/analytics';
import { SERVICE_AREA_COMPACT } from '../lib/site-config';
import overallVideo from '../assets/Overall Video (9x16).mp4';
import videoPoster from '../assets/video-poster.webp';
import tammyWithMaxwellImg from '../assets/tammy_with_jon.png';
import { homeTestimonials } from '../content/testimonials';

const Home: React.FC = () => {
  return (
    <>
      {/* Hero: what this is, who it is for, and one clear next step */}
      <AppSection tone="cream" sx={{ pt: { xs: 6, md: 10 } }}>
        <AppContainer>
          <Grid container spacing={{ xs: 6, md: 8 }} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 7 }}>
              <AppText variant="eyebrow" sx={{ mb: 2 }}>
                Training · Coaching · DISC
              </AppText>
              <AppText variant="h1" sx={{ mb: 3 }}>
                Build a stronger team. <Accent>Speak with more confidence.</Accent>
              </AppText>
              <AppText variant="lead" sx={{ mb: 2, maxWidth: 600 }}>
                Leadership training for managers and teams, plus one-to-one communication coaching for individuals, including neurodivergent adults.
              </AppText>
              <AppText variant="body1" sx={{ mb: 4, maxWidth: 600, fontWeight: 600, color: 'text.primary' }}>
                Training, coaching, and DISC assessments led by Tammy Summers.
              </AppText>
              <CtaGroup>
                <DirectCta id="home_hero" location="hero" />
                <SecondaryCta id="home_hero" location="hero" />
              </CtaGroup>
              <AppText variant="body2" sx={{ mt: 2, maxWidth: 600, color: 'text.secondary' }}>
                Call or email to discuss your goals and the support you're looking for.
              </AppText>
              <ServiceAreaLine sx={{ mt: 1.5 }}>{SERVICE_AREA_COMPACT}</ServiceAreaLine>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  columnGap: 3,
                  rowGap: 0,
                  mt: 1.5,
                  '& a': {
                    display: 'inline-flex',
                    alignItems: 'center',
                    minHeight: 44,
                    fontWeight: 600,
                    textUnderlineOffset: '0.2em',
                  },
                }}
              >
                <Link component={RouterLink} to="/corporate" onClick={() => trackCta({ id: 'home_hero_corporate', location: 'hero', intent: 'corporate' })}>
                  Develop my team<span aria-hidden="true">&nbsp;→</span>
                </Link>
                <Link component={RouterLink} to="/individual" onClick={() => trackCta({ id: 'home_hero_individual', location: 'hero', intent: 'individual' })}>
                  Build my communication skills<span aria-hidden="true">&nbsp;→</span>
                </Link>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <PhotoFrame variant="offset" sx={{ maxWidth: 340, mx: 'auto' }}>
                <HeroVideo src={overallVideo} poster={videoPoster} />
              </PhotoFrame>
            </Grid>
          </Grid>
        </AppContainer>
      </AppSection>

      <CredentialsBand />

      {/* Path selection: the two audiences, side by side */}
      <AppSection tone="cream">
        <AppContainer>
          <SectionHeading
            title="Which path fits you?"
            subtitle="Choose support for your team or for your own communication goals."
          />
          <Grid container spacing={3} sx={{ alignItems: 'stretch' }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <PathCard
                audience="For managers & teams"
                title="Leadership Training"
                description="Develop your leadership skills and help your team communicate more clearly through group training and DISC assessments."
                items={['Group Leadership Training', 'Organizational DISC Assessments']}
                path="/corporate"
                buttonText="Explore leadership training"
                variant="corporate"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <PathCard
                audience="For individuals"
                title="Communication Coaching"
                description="Build confidence in public speaking and everyday conversations with one-to-one coaching, including support for neurodivergent adults."
                items={['Speech Coaching', 'Student & Career DISC', 'Sales & Entrepreneur DISC']}
                path="/individual"
                buttonText="Explore individual coaching"
                variant="individual"
              />
            </Grid>
          </Grid>
        </AppContainer>
      </AppSection>

      {/* Problem, framed for each audience. No CTA here. */}
      <AppSection tone="sand">
        <AppContainer>
          <SectionHeading
            title="It's frustrating when your message doesn't get through."
            subtitle="Misunderstandings can leave teams stuck and individuals feeling unheard."
          />
          <Grid container spacing={{ xs: 5, md: 8 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <AppText variant="eyebrow" color="primary" sx={{ mb: 1.5 }}>
                For managers &amp; teams
              </AppText>
              <AppText variant="body1">
                You want to lead well, but unclear expectations and difficult conversations can leave your team pulling in different directions. It's frustrating when you keep coming back to the same misunderstandings.
              </AppText>
              <AppText variant="statement" sx={{ mt: 2.5 }}>
                Your team deserves clear direction and the support to work well together.
              </AppText>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <AppText variant="eyebrow" sx={{ mb: 1.5 }}>
                For individuals
              </AppText>
              <AppText variant="body1">
                Finding the words you want in a meeting, presentation, or everyday conversation can be difficult. Being misunderstood can leave you frustrated or hesitant to speak up.
              </AppText>
              <AppText variant="statement" sx={{ mt: 2.5 }}>
                You deserve support that helps you communicate in ways that work for you.
              </AppText>
            </Grid>
          </Grid>
        </AppContainer>
      </AppSection>

      {/* Guide: Tammy, before the visitor is asked to act */}
      <AppSection tone="cream">
        <AppContainer>
          <Grid container spacing={{ xs: 6, md: 10 }} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 5 }}>
              <PhotoFrame variant="outline" sx={{ maxWidth: 400, mx: 'auto' }}>
                <Box
                  component="img"
                  src={tammyWithMaxwellImg}
                  alt="Tammy Summers with John C. Maxwell at the Maxwell Leadership Certified Team event in Orlando, Florida, March 2024"
                  width={388}
                  height={539}
                  loading="lazy"
                  sx={{ width: '100%', height: 'auto' }}
                />
              </PhotoFrame>
            </Grid>
            <Grid size={{ xs: 12, md: 7 }}>
              <AppText variant="eyebrow" sx={{ mb: 1.5 }}>
                Your guide
              </AppText>
              <AppText variant="h2" component="h2">
                Meet Tammy Summers
              </AppText>
              <AppText variant="body1" sx={{ mt: 1.5, mb: 3, fontWeight: 600, color: 'brand.navy' }}>
                Leadership Trainer, Coach &amp; Business Professor
              </AppText>
              <AppText variant="body1" paragraph>
                Tammy Summers brings a unique blend of leadership expertise, educational passion, and specialized communication training that creates meaningful change for individuals and organizations alike.
              </AppText>
              <AppText variant="body1" sx={{ mb: 4 }}>
                Whether you need facilitation for your team, specialized training for working with children and adults with autism, or someone who can make any subject engaging and actionable, Tammy delivers results through authentic connection and proven methodology.
              </AppText>
              <CtaGroup>
                <DirectCta id="home_guide" location="guide" />
                <AppButton analytics={{ id: 'home_meet_tammy', location: 'guide', intent: 'about' }} variant="outlined" color="primary" size="large" component={RouterLink} to="/about">
                  Meet Tammy
                </AppButton>
              </CtaGroup>
            </Grid>
          </Grid>
        </AppContainer>
      </AppSection>

      <TestimonialsBand
        title="Success Stories"
        subtitle="Business owners and individual clients, in their own words."
        testimonials={homeTestimonials}
        ctaId="home_testimonials"
      />

      {/* Plan: what happens after reaching out */}
      <StepPlanSection
        title="Your next step starts with a conversation."
        subtitle="Whether you're looking for support for yourself or your team, start by sharing what you'd like to improve."
        ctaId="home_plan"
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

      <ClosingCtaBand
        title={<>Take the next step toward <Accent>clearer communication.</Accent></>}
        subtitle="Tell Tammy what you or your team would like to improve, and discuss which support fits your goals."
        ctaId="home_final"
      />
    </>
  );
};

export default Home;
