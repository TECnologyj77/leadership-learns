import React from 'react';
import { Box } from '@mui/material';
import type { BoxProps } from '@mui/material';

interface AppSectionProps extends BoxProps {
  variant?: 'light' | 'dark' | 'white';
}

const AppSection: React.FC<AppSectionProps> = ({ 
  children, 
  variant = 'white', 
  sx, 
  ...props 
}) => {
  const getBgColor = () => {
    switch (variant) {
      case 'light':
        return 'background.default';
      case 'dark':
        return 'primary.main';
      case 'white':
      default:
        return 'background.paper';
    }
  };

  const getTextColor = () => {
    return variant === 'dark' ? 'primary.contrastText' : 'text.primary';
  };

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 }, // 64px to 96px, or 80-120 range as requested
        backgroundColor: getBgColor(),
        color: getTextColor(),
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default AppSection;
