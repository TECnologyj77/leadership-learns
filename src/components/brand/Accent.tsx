import React from 'react';
import { Box } from '@mui/material';
import { fonts } from '../../theme/tokens';

// The italic phrase that ends a key headline, e.g. "Build a stronger team.
// <Accent>Speak with more confidence.</Accent>". Gold text on light surfaces,
// bright gold on navy ones (the surface sets which).
const Accent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Box
    component="span"
    sx={{
      fontFamily: fonts.serif,
      fontStyle: 'italic',
      fontWeight: 500,
      color: 'surface.accent',
    }}
  >
    {children}
  </Box>
);

export default Accent;
