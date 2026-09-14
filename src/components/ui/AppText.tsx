import React from 'react';
import { Typography } from '@mui/material';
import type { TypographyProps } from '@mui/material';

interface AppTextProps extends TypographyProps {
  component?: React.ElementType;
  to?: string;
  /** Renders as a <p> with paragraph spacing (Typography dropped this prop). */
  paragraph?: boolean;
}

const AppText: React.FC<AppTextProps> = ({ children, paragraph, sx, ...props }) => {
  if (paragraph) {
    return (
      <Typography component="p" {...props} sx={{ mb: 2, ...sx }}>
        {children}
      </Typography>
    );
  }

  return (
    <Typography {...props} sx={sx}>
      {children}
    </Typography>
  );
};

export default AppText;
