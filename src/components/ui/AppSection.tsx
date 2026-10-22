import React from 'react';
import { Box } from '@mui/material';
import type { BoxProps, SxProps, Theme } from '@mui/material';

export type SectionTone = 'cream' | 'sand' | 'white' | 'navy';

interface AppSectionProps extends Omit<BoxProps, 'sx'> {
  /** Cream is the page background; sand alternates with it; navy is the navy band. */
  tone?: SectionTone;
  sx?: SxProps<Theme>;
}

const lightBackground = { cream: 'brand.cream', sand: 'brand.sand', white: 'brand.white' } as const;

// A full-width page section: 96px of vertical padding (72px on phones). The
// navy tone switches headings, text, accents and focus rings to their on-navy
// colours.
const AppSection: React.FC<AppSectionProps> = ({ children, tone = 'cream', sx, ...props }) => (
  <Box
    component="section"
    {...props}
    sx={[
      tone === 'navy' ? (theme) => theme.mixins.navySurface : { bgcolor: lightBackground[tone] },
      { py: { xs: 9, md: 12 } },
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
  >
    {children}
  </Box>
);

export default AppSection;
