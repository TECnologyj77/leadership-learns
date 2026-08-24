import React from 'react';
import { Box, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AppText from '../ui/AppText';
import AppButton from '../ui/AppButton';

interface CoachingPathCardProps {
  title: string;
  description: string;
  path: string;
  buttonText: string;
  icon?: React.ReactNode;
  variant?: 'corporate' | 'individual';
}

const CoachingPathCard: React.FC<CoachingPathCardProps> = ({
  title,
  description,
  path,
  buttonText,
  icon,
  variant = 'corporate'
}) => {
  return (
    <Paper 
      sx={{ 
        p: 4,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: 10,
        },
      }}
    >
      <Box sx={{ mb: 3, color: variant === 'corporate' ? 'primary.main' : 'secondary.main' }}>
        {icon}
      </Box>
      <AppText variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'text.primary' }}>
        {title}
      </AppText>
      <AppText variant="body1" color="text.secondary" sx={{ mb: 4, flexGrow: 1 }}>
        {description}
      </AppText>
      <AppButton 
        variant="contained" 
        color={variant === 'corporate' ? 'primary' : 'secondary'}
        fullWidth
        component={RouterLink}
        to={path}
      >
        {buttonText}
      </AppButton>
    </Paper>
  );
};

export default CoachingPathCard;
