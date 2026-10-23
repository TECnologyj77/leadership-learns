import React from 'react';
import { Box } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';

const OFFSET = '18px';

interface PhotoFrameProps {
  /**
   * 'offset': a gold block behind the photo, 18px down and to the right (hero
   * photos and the hero video). 'outline': a 2px gold outline 18px up and to
   * the left (Tammy's portraits).
   */
  variant: 'offset' | 'outline';
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

// Frames a photo or video with 20px corners. The frame reserves room for its
// offset, so it never spills past the column (or the phone screen).
const PhotoFrame: React.FC<PhotoFrameProps> = ({ variant, children, sx }) => {
  const offset = variant === 'offset';

  return (
    <Box
      sx={[
        {
          position: 'relative',
          ...(offset ? { mr: OFFSET, mb: OFFSET } : { mt: OFFSET, ml: OFFSET }),
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            borderRadius: 5,
            transform: offset ? `translate(${OFFSET}, ${OFFSET})` : `translate(-${OFFSET}, -${OFFSET})`,
            ...(offset ? { bgcolor: 'brand.gold' } : { border: '2px solid', borderColor: 'brand.gold' }),
          },
          '& > *': { position: 'relative', display: 'block', borderRadius: 5, overflow: 'hidden' },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Box>
  );
};

export default PhotoFrame;
