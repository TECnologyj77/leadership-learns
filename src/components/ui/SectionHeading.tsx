import React from 'react';
import { Box } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import AppText from './AppText';

interface SectionHeadingProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  eyebrow?: string;
  /** Navy for corporate-side labels; gold text otherwise. */
  eyebrowColor?: 'gold' | 'navy';
  align?: 'center' | 'left';
  /** The page's own heading (h1) or a section heading (h2). */
  level?: 'h1' | 'h2';
  sx?: SxProps<Theme>;
}

// A section's heading block: optional eyebrow, the heading, then a muted subtitle.
const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  eyebrow,
  eyebrowColor = 'gold',
  align = 'center',
  level = 'h2',
  sx,
}) => (
  <Box
    sx={[
      {
        textAlign: align,
        maxWidth: align === 'center' ? 760 : 'none',
        mx: align === 'center' ? 'auto' : 0,
        mb: { xs: 5, md: 7 },
      },
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
  >
    {eyebrow && (
      <AppText variant="eyebrow" color={eyebrowColor === 'navy' ? 'primary' : undefined} sx={{ mb: 1.5 }}>
        {eyebrow}
      </AppText>
    )}
    <AppText variant={level} component={level}>
      {title}
    </AppText>
    {subtitle && (
      <AppText variant="body1" sx={{ mt: 2, fontSize: '1.125rem', color: 'surface.muted' }}>
        {subtitle}
      </AppText>
    )}
  </Box>
);

export default SectionHeading;
