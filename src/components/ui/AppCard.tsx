import React from 'react';
import { Box } from '@mui/material';
import type { BoxProps, SxProps, Theme } from '@mui/material';
import { cardPadding } from '../../theme/tokens';

interface AppCardProps extends Omit<BoxProps, 'sx'> {
  /** A 5px top border: navy for the corporate side, gold for the individual side. */
  accent?: 'navy' | 'gold';
  /** False for cards whose content runs to the edge, such as a photo on top. */
  padded?: boolean;
  sx?: SxProps<Theme>;
}

// The white card: a hairline border, 16px corners and 36px of padding. It
// keeps light-surface colours even on a navy band.
const AppCard: React.FC<AppCardProps> = ({ children, accent, padded = true, sx, ...props }) => (
  <Box
    {...props}
    sx={[
      (theme) => theme.mixins.lightSurface,
      {
        bgcolor: 'brand.white',
        border: 1,
        borderColor: 'brand.cardBorder',
        borderRadius: 4,
        overflow: 'hidden',
      },
      padded && { p: cardPadding },
      accent === 'navy' && { borderTop: '5px solid', borderTopColor: 'brand.navy' },
      accent === 'gold' && { borderTop: '5px solid', borderTopColor: 'brand.gold' },
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
  >
    {children}
  </Box>
);

export default AppCard;
