import React from 'react';
import { Button, CircularProgress } from '@mui/material';
import type { ButtonProps } from '@mui/material';

interface AppButtonProps extends ButtonProps {
  loading?: boolean;
  to?: string;
  component?: React.ElementType;
}

const AppButton: React.FC<AppButtonProps> = ({ 
  children, 
  loading, 
  disabled, 
  startIcon, 
  ...props 
}) => {
  return (
    <Button
      disabled={disabled || loading}
      startIcon={loading ? <CircularProgress size={20} color="inherit" /> : startIcon}
      {...props}
    >
      {children}
    </Button>
  );
};

export default AppButton;
