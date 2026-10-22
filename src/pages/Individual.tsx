import React from 'react';
import { Grid, Box, Avatar } from '@mui/material';
import PsychologyIcon from '@mui/icons-material/Psychology';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import AppText from '../components/ui/AppText';
import AppSection from '../components/ui/AppSection';
import AppContainer from '../components/ui/AppContainer';
import AppCard from '../components/ui/AppCard';
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
import speechCoachingImg from '../assets/services/Speech Coaching.jpg';
import studentDiscImg from '../assets/services/Student + Career DISC Assessment and Debrief.jpeg';
import salesDiscImg from '../assets/services/Sales DISC Assessment and Debrief.jpg';
import tammyWithAustinImg from '../assets/tammy_with_austin.jpg';
import { austinMoralesTestimonial, individualTestimonials } from '../content/testimonials';
import { SERVICE_AREA_SHORT } from '../lib/site-config';

const approach = [
  {
    icon: PsychologyIcon,
    title: 'Your Interests',
    text: 'Coaching starts from each person’s natural interests, so communication, social skills, and confidence grow organically.',
  },
  {
    icon: RecordVoiceOverIcon,
    title: 'Foundations',
    text: 'Pivotal Response Treatment targets motivation, self-initiation, self-management, and responding to multiple cues.',
  },
  {
    icon: EmojiPeopleIcon,
    title: 'Second Language',
    text: 'We are all already bilingual. Tammy helps you master body language alongside the words you say.',
  },
];

const Individual: React.FC = () => {
  return (
    <>
      {/* Hero */}
      <AppSection tone="cream" sx={{ pt: { xs: 6, md: 10 } }}>
        <AppContainer>
          <Grid container spacing={{ xs: 6, md: 8 }} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 7 }}>
              <AppText variant="eyebrow" sx={{ mb: 2 }}>
                For individuals &amp; neurodivergent professionals
              </AppText>
              <AppText variant="h1" sx={{ mb: 3 }}>
                Every Voice Has Power. <Accent>Yours Deserves to be Heard.</Accent>
              </AppText>
              <AppText variant="lead" sx={{ mb: 4, maxWidth: 600 }}>
                1:1 Coaching for neurodivergent professionals and individuals. Discover and strengthen your voice through authentic connection.
              </AppText>
              <CtaGroup>
                <DirectCta id="individual_hero" location="hero" />
                <SecondaryCta id="individual_hero" location="hero" />
              </CtaGroup>
              <AppText variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                Call or email to discuss your communication goals and coaching or assessment options.
              </AppText>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <Box sx={{ position: 'relative', maxWidth: { xs: 380, md: 440 }, mx: 'auto' }}>
                <PhotoFrame variant="offset">
                  <Box
                    component="img"
                    src={tammyWithAustinImg}
                    alt="Tammy Summers with her public speaking client Austin Morales"
                    width={960}
                    height={1200}
                    sx={{ width: '100%', height: 'auto', aspectRatio: '4 / 5', objectFit: 'cover' }}
                  />
                </PhotoFrame>
                {/* Austin's result, pulled from his testimonial */}
                <AppCard
                  component="figure"
                  padded={false}
                  sx={{
                    position: 'absolute',
                    left: { xs: 12, md: -32 },
                    bottom: { xs: 36, md: 0 },
                    maxWidth: 260,
                    m: 0,
                    p: 2,
                    borderRadius: 3,
                    boxShadow: 8,
                  }}
                >
                  <AppText component="blockquote" variant="quote" sx={{ m: 0, mb: 1.5 }}>
                    &ldquo;It&apos;s my new job.&rdquo;
                  </AppText>
                  <Box component="figcaption" sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar src={austinMoralesTestimonial.avatar} alt="" sx={{ width: 40, height: 40 }} />
                    <Box>
                      <AppText variant="subtitle2" component="p" sx={{ fontWeight: 700, lineHeight: 1.2, color: 'text.primary' }}>
                        {austinMoralesTestimonial.author}
                      </AppText>
                      <AppText variant="caption" sx={{ color: 'text.secondary' }}>
                        {austinMoralesTestimonial.role}
                      </AppText>
                    </Box>
                  </Box>
                </AppCard>
              </Box>
            </Grid>
          </Grid>
        </AppContainer>
      </AppSection>

      {/* Pain points. No CTA here. */}
      <AppSection tone="sand">
        <AppContainer maxWidth="md">
          <SectionHeading title="When getting your message across feels difficult" />
          <PointGrid
            kind="pain"
            tone="gold"
            items={[
              'Finding the words you want in meetings or everyday conversations.',
              'Feeling nervous before a presentation or when you\'re put on the spot.',
              'Leaving a conversation unsure whether you were understood.',
              'Finding communication advice that fits the way you think and express yourself.'
            ]}
          />
          <AppText variant="statement" sx={{ textAlign: 'center', mt: 5 }}>
            You deserve support that helps you communicate in ways that work for you.
          </AppText>
        </AppContainer>
      </AppSection>

      {/* Reframe */}
      <AppSection tone="navy">
        <AppContainer maxWidth="md">
          <SectionHeading
            title={<>Master your verbal and <Accent>non-verbal communication.</Accent></>}
            subtitle="We use Pivotal Response Treatment (PRT) to target the foundations of communication: motivation, self-management, and confidence."
            sx={{ mb: 0 }}
          />
        </AppContainer>
      </AppSection>

      {/* Services breakdown */}
      <AppSection tone="cream">
        <AppContainer>
          <SectionHeading title="Specialized Coaching" />
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 4 }}>
              <ServiceCard
                accent="gold"
                title="Speech Coaching"
                description="Become a confident public speaker. We understand how to help neurodivergent individuals master the stage."
                image={speechCoachingImg}
                imageAlt="A speaker presenting to a room beside a session recap slide."
                features={['Public speaking techniques', 'Confidence building', 'Concise communication']}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ServiceCard
                accent="gold"
                title="Student & Career DISC"
                description="Discover your natural strengths and learn how to navigate academic or professional environments."
                image={studentDiscImg}
                imageAlt="Students working at their desks in a classroom."
                features={['Strengths identification', 'Communication styles', 'Career path alignment']}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ServiceCard
                accent="gold"
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

      <TestimonialsBand title="Client Success" testimonials={individualTestimonials} ctaId="individual_testimonials" />

      {/* Coaching approach */}
      <AppSection tone="cream">
        <AppContainer>
          <SectionHeading title="The Leadership Learners Approach" />
          <Grid container spacing={{ xs: 5, md: 6 }}>
            {approach.map(({ icon: Icon, title, text }) => (
              <Grid size={{ xs: 12, md: 4 }} key={title}>
                <Box sx={{ textAlign: 'center' }}>
                  <Icon aria-hidden="true" sx={{ fontSize: 48, color: 'brand.goldText', mb: 1.5 }} />
                  <AppText variant="h3" component="h3" sx={{ fontSize: '1.5rem', mb: 1 }}>{title}</AppText>
                  <AppText variant="body1">{text}</AppText>
                </Box>
              </Grid>
            ))}
          </Grid>
        </AppContainer>
      </AppSection>

      {/* Transformation outcomes */}
      <AppSection tone="sand">
        <AppContainer maxWidth="md">
          <SectionHeading title="What change looks like." />
          <PointGrid
            kind="outcome"
            tone="gold"
            items={[
              'Speaking up in meetings and everyday conversations with more confidence.',
              'Public speaking that feels manageable rather than insurmountable.',
              'Techniques that are easy to learn for answering questions concisely.',
              'Body language that makes the first impression you intend.'
            ]}
          />
        </AppContainer>
      </AppSection>

      {/* Plan: what working together looks like */}
      <StepPlanSection
        title="How to get started with individual support"
        subtitle="Start with a call or email about what you'd like to work on."
        ctaId="individual_plan"
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

      <ClosingCtaBand
        title={<>Take the next step toward <Accent>speaking with confidence.</Accent></>}
        subtitle="Contact Tammy to discuss public speaking, everyday communication, or understanding your communication style."
        ctaId="individual_final"
        note={<ServiceAreaLine>{SERVICE_AREA_SHORT}</ServiceAreaLine>}
      />
    </>
  );
};

export default Individual;
