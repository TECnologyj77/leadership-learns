import React from 'react';
import { Box } from '@mui/material';
import LogoMark from './LogoMark';
import { fonts } from '../../theme/tokens';

const sizes = {
  header: { markWidth: 30, markHeight: 43, wordmark: '26px' },
  footer: { markWidth: 26, markHeight: 37, wordmark: '23px' },
} as const;

interface BrandLogoProps {
  size: keyof typeof sizes;
}

// The reversed logo for navy backgrounds: the gold mark, a thin divider, then
// the wordmark. The header shrinks it below lg so it fits beside the menu
// button and the direct CTA, and below 360px drops the wordmark (the header
// link's aria-label still names it).
const BrandLogo: React.FC<BrandLogoProps> = ({ size }) => {
  const { markWidth, markHeight, wordmark } = sizes[size];
  const compact = size === 'header';

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: compact ? { xs: 1.25, sm: 1.5, lg: 2 } : 2,
        '& svg': compact ? { width: { xs: 24, lg: markWidth }, height: { xs: 34, lg: markHeight } } : {},
      }}
    >
      <LogoMark width={markWidth} height={markHeight} />
      <Box
        aria-hidden="true"
        sx={{
          width: '1px',
          height: compact ? { xs: 26, lg: 32 } : 32,
          bgcolor: 'onNavy.divider',
          flexShrink: 0,
          '@media (max-width: 359.95px)': compact ? { display: 'none' } : {},
        }}
      />
      <Box
        component="span"
        sx={{
          fontFamily: fonts.serif,
          fontWeight: 600,
          fontSize: compact ? { xs: 'clamp(15px, 4.3vw, 20px)', sm: '20px', md: '22px', lg: wordmark } : wordmark,
          lineHeight: 1,
          letterSpacing: '-0.01em',
          color: 'brand.white',
          whiteSpace: 'nowrap',
          '@media (max-width: 359.95px)': compact ? { display: 'none' } : {},
        }}
      >
        Leadership Learners
      </Box>
    </Box>
  );
};

export default BrandLogo;
