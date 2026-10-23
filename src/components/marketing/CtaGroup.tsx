import React from 'react';
import { Box } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';

interface CtaGroupProps {
  align?: 'start' | 'center';
  /** One button per row at every width, each full width. */
  stacked?: boolean;
  sx?: SxProps<Theme>;
  children: React.ReactNode;
}

// A row of CTA buttons: full width on phones, where a thumb reaches for them;
// natural width, wrapping as needed, from sm up.
const CtaGroup: React.FC<CtaGroupProps> = ({ align = 'start', stacked, sx, children }) => (
  <Box
    sx={[
      {
        display: 'flex',
        flexDirection: stacked ? 'column' : 'row',
        flexWrap: 'wrap',
        gap: 1.5,
        justifyContent: align === 'center' ? 'center' : 'flex-start',
        '& > *': { width: stacked ? '100%' : { xs: '100%', sm: 'auto' } },
      },
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
  >
    {children}
  </Box>
);

export default CtaGroup;
