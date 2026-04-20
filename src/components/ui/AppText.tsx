import React from 'react';
import { Typography } from '@mui/material';
import type { TypographyProps } from '@mui/material';

interface AppTextProps extends TypographyProps {
  component?: React.ElementType;
  to?: string;
  paragraph?: boolean;
}

const AppText: React.FC<AppTextProps> = ({ children, ...props }) => {
  return (
    <Typography {...props}>
      {children}
    </Typography>
  );
};

export default AppText;
