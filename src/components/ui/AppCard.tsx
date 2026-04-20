import React from 'react';
import { Paper, Box } from '@mui/material';
import type { PaperProps } from '@mui/material';

interface AppCardProps extends PaperProps {
  padding?: number | string;
}

const AppCard: React.FC<AppCardProps> = ({ children, padding = 3, ...props }) => {
  return (
    <Paper {...props}>
      <Box sx={{ p: padding }}>
        {children}
      </Box>
    </Paper>
  );
};

export default AppCard;
