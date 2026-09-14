import React from 'react';
import { Button, CircularProgress } from '@mui/material';
import type { ButtonProps } from '@mui/material';
import { trackCta } from '../../lib/analytics';
import type { CtaTracking } from '../../lib/analytics';

interface AppButtonProps extends ButtonProps {
  loading?: boolean;
  to?: string;
  component?: React.ElementType;
  analytics?: CtaTracking;
}

const AppButton: React.FC<AppButtonProps> = ({ 
  children, 
  loading, 
  disabled, 
  startIcon,
  analytics,
  onClick,
  ...props 
}) => {
  return (
    <Button
      disabled={disabled || loading}
      startIcon={loading ? <CircularProgress size={20} color="inherit" /> : startIcon}
      {...props}
      data-cta-id={analytics?.id}
      onClick={(event) => {
        onClick?.(event);
        if (analytics && !event.defaultPrevented) trackCta(analytics);
      }}
    >
      {children}
    </Button>
  );
};

export default AppButton;
