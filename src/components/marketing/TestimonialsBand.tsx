import React from 'react';
import { Box } from '@mui/material';
import AppSection from '../ui/AppSection';
import AppContainer from '../ui/AppContainer';
import SectionHeading from '../ui/SectionHeading';
import TestimonialCard from './TestimonialCard';
import CtaGroup from './CtaGroup';
import DirectCta from './DirectCta';
import type { Testimonial } from '../../content/testimonials';

interface TestimonialsBandProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  testimonials: Testimonial[];
  /** Analytics prefix for the DirectCta under the cards, e.g. 'home_testimonials'. */
  ctaId: string;
}

// Clients in their own words, on a navy band, then the direct CTA.
const TestimonialsBand: React.FC<TestimonialsBandProps> = ({ title, subtitle, testimonials, ctaId }) => (
  <AppSection tone="navy">
    <AppContainer>
      <SectionHeading title={title} subtitle={subtitle} />
      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: { xs: '1fr', md: `repeat(${testimonials.length}, 1fr)` },
          maxWidth: testimonials.length < 3 ? 900 : 'none',
          mx: 'auto',
        }}
      >
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.author} {...testimonial} />
        ))}
      </Box>
      <CtaGroup align="center" sx={{ mt: { xs: 5, md: 6 } }}>
        <DirectCta id={ctaId} location="testimonials" />
      </CtaGroup>
    </AppContainer>
  </AppSection>
);

export default TestimonialsBand;
