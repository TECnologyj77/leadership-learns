import React from 'react';
import { Grid, Box } from '@mui/material';
import AppText from '../components/ui/AppText';
import AppSection from '../components/ui/AppSection';
import AppContainer from '../components/ui/AppContainer';
import SectionHeading from '../components/ui/SectionHeading';
import PhotoFrame from '../components/ui/PhotoFrame';
import PointGrid from '../components/ui/PointGrid';
import ServiceAreaLine from '../components/ui/ServiceAreaLine';
import Accent from '../components/brand/Accent';
import CtaGroup from '../components/marketing/CtaGroup';
import DirectCta from '../components/marketing/DirectCta';
import SecondaryCta from '../components/marketing/SecondaryCta';
import ServiceCard from '../components/marketing/ServiceCard';
import TestimonialsBand from '../components/marketing/TestimonialsBand';
import StepPlanSection from '../components/marketing/StepPlanSection';
import ClosingCtaBand from '../components/marketing/ClosingCtaBand';
import groupTrainingImg from '../assets/services/Group Leadership Training.jpg';
import organizationDiscImg from '../assets/team_disc_session_wide.jpg';
import teamDiscSessionImg from '../assets/team_disc_session.jpg';
import { corporateTestimonials } from '../content/testimonials';
import { SERVICE_AREA_SHORT } from '../lib/site-config';

const Corporate: React.FC = () => {
  return (
    <>
      {/* Hero */}
      <AppSection tone="cream" sx={{ pt: { xs: 6, md: 10 } }}>
        <AppContainer>
          <Grid container spacing={{ xs: 6, md: 8 }} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 7 }}>
              <AppText variant="eyebrow" color="primary" sx={{ mb: 2 }}>
                For organizations &amp; teams
              </AppText>
              <AppText variant="h1" sx={{ mb: 3 }}>
                Scale Your Impact, <Accent>Not Your Stress.</Accent>
              </AppText>
              <AppText variant="lead" sx={{ mb: 4, maxWidth: 600 }}>
                Strategic leadership development and organizational systems for high-growth teams.
              </AppText>
              <CtaGroup>
                <DirectCta id="corporate_hero" location="hero" />
                <SecondaryCta id="corporate_hero" location="hero" />
              </CtaGroup>
              <AppText variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                Call or email to discuss leadership training or DISC assessments for your team.
              </AppText>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <PhotoFrame variant="offset" sx={{ maxWidth: { xs: 480, md: 500 }, mx: 'auto' }}>
                <Box
                  component="img"
                  src={teamDiscSessionImg}
                  alt="Tammy Summers with a team after her Cultural Sensitivity in the Workspace session."
                  width={1200}
                  height={1000}
                  sx={{ width: '100%', height: 'auto', aspectRatio: '6 / 5', objectFit: 'cover' }}
                />
              </PhotoFrame>
            </Grid>
          </Grid>
        </AppContainer>
      </AppSection>

      {/* Pain points. No CTA here. */}
      <AppSection tone="sand">
        <AppContainer maxWidth="md">
          <SectionHeading
            title="Leadership is hard. Scaling is harder."
            subtitle="As organizations grow, communication breaks down, decision-making slows, and founders often find themselves bogged down in operational chaos instead of leading."
          />
          <PointGrid
            kind="pain"
            tone="navy"
            items={[
              'Siloed communication across departments',
              'Founder bottlenecking in decision-making',
              'Lack of cultural alignment in remote teams',
              'Inefficient meeting and feedback frameworks'
            ]}
          />
        </AppContainer>
      </AppSection>

      {/* Services breakdown */}
      <AppSection tone="cream">
        <AppContainer>
          <SectionHeading title="Our Corporate Solutions" />
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <ServiceCard
                accent="navy"
                title="Group Leadership Training"
                description="Custom training programs for new managers and senior executives to build high-performance cultures."
                image={groupTrainingImg}
                imageAlt="Participants seated in a circle during a group training session."
                features={['Executive presence', 'Conflict resolution', 'Delegation frameworks']}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <ServiceCard
                accent="navy"
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

      <AppSection tone="sand">
        <AppContainer maxWidth="md">
          <SectionHeading title="What we work toward together." />
          <PointGrid
            kind="outcome"
            tone="navy"
            items={[
              'Reduced founder dependency for day-to-day decisions.',
              'Faster project completion through clearer communication.',
              'Improved employee retention and engagement.',
              'Scalable culture that survives rapid growth.'
            ]}
          />
        </AppContainer>
      </AppSection>

      <TestimonialsBand title="Client Success" testimonials={corporateTestimonials} ctaId="corporate_testimonials" />

      {/* Plan: what working together looks like */}
      <StepPlanSection
        title="How to get started with your team"
        subtitle="Start with a conversation about your team and what you'd like to improve."
        ctaId="corporate_plan"
        steps={[
          {
            title: 'Tell Tammy your goal',
            description: 'Call or email Tammy about your team and the leadership or communication skills you\'d like to develop.',
          },
          {
            title: 'Choose the right support',
            description: 'Discuss whether group training, a workshop, or DISC assessments fit your team. Ask about the approach, cost, and next steps.',
          },
          {
            title: 'Begin working together',
            description: 'Start the training, workshop, or assessments you\'ve discussed.',
          },
        ]}
      />

      <ClosingCtaBand
        title={<>Take the next step in <Accent>developing your team.</Accent></>}
        subtitle="Contact Tammy to discuss leadership training, workshops, or DISC assessments for your team."
        ctaId="corporate_final"
        note={<ServiceAreaLine>{SERVICE_AREA_SHORT}</ServiceAreaLine>}
      />
    </>
  );
};

export default Corporate;
