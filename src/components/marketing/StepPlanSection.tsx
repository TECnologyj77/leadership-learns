import React from 'react';
import { Box } from '@mui/material';
import AppText from '../ui/AppText';
import AppCard from '../ui/AppCard';
import AppSection from '../ui/AppSection';
import AppContainer from '../ui/AppContainer';
import SectionHeading from '../ui/SectionHeading';
import CtaGroup from './CtaGroup';
import DirectCta from './DirectCta';
import { fonts } from '../../theme/tokens';

export interface ProcessStep {
  title: string;
  description: string;
}

interface StepPlanSectionProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  steps: ProcessStep[];
  /** Analytics prefix for the DirectCta under the steps, e.g. 'home_plan'. */
  ctaId: string;
}

// The plan: what happens after reaching out, as numbered cards, then the
// direct CTA.
const StepPlanSection: React.FC<StepPlanSectionProps> = ({ title, subtitle, steps, ctaId }) => (
  <AppSection tone="cream">
    <AppContainer>
      <SectionHeading title={title} subtitle={subtitle} />
      <Box
        component="ol"
        sx={{ listStyle: 'none', p: 0, m: 0, display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: `repeat(${steps.length}, 1fr)` } }}
      >
        {steps.map((step, index) => (
          <AppCard component="li" key={step.title}>
            {/* The list itself numbers the steps for screen readers. */}
            <Box
              aria-hidden="true"
              sx={{
                width: 48,
                height: 48,
                mb: 2.5,
                borderRadius: '50%',
                bgcolor: 'brand.gold',
                color: 'brand.ink',
                fontFamily: fonts.serif,
                fontWeight: 600,
                fontSize: '1.375rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {index + 1}
            </Box>
            <AppText variant="h3" component="h3" sx={{ fontSize: '1.5rem', mb: 1 }}>
              {step.title}
            </AppText>
            <AppText variant="body1">{step.description}</AppText>
          </AppCard>
        ))}
      </Box>
      <CtaGroup align="center" sx={{ mt: { xs: 5, md: 6 } }}>
        <DirectCta id={ctaId} location="plan" />
      </CtaGroup>
    </AppContainer>
  </AppSection>
);

export default StepPlanSection;
