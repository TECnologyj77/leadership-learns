import React from 'react';
import { Box, Paper } from '@mui/material';
import { CheckCircleOutlined as CheckCircleOutlineIcon } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import AppText from '../ui/AppText';
import AppButton from '../ui/AppButton';

interface CoachingPathCardProps {
  title: string;
  description: string;
  path: string;
  buttonText: string;
  /** Who the path is for, shown above the title so visitors can self-select. */
  audience?: string;
  /** Services already offered on the linked page. */
  items?: string[];
  icon?: React.ReactNode;
  variant?: 'corporate' | 'individual';
}

const CoachingPathCard: React.FC<CoachingPathCardProps> = ({
  title,
  description,
  path,
  buttonText,
  audience,
  items,
  icon,
  variant = 'corporate'
}) => {
  const accent = variant === 'corporate' ? 'primary' : 'secondary';

  return (
    <Paper 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        borderRadius: 3,
        borderTop: '6px solid',
        borderTopColor: `${accent}.main`,
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: 10,
        },
      }}
    >
      <Box sx={{ p: { xs: 3, md: 4 }, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box sx={{ mb: 2, color: `${accent}.main` }}>
          {icon}
        </Box>
        {audience && (
          <AppText
            variant="overline"
            sx={{ color: `${accent}.dark`, fontWeight: 700, letterSpacing: '0.08em' }}
          >
            {audience}
          </AppText>
        )}
        <AppText variant="h4" component="h3" gutterBottom sx={{ fontWeight: 700, color: 'text.primary' }}>
          {title}
        </AppText>
        <AppText variant="body1" color="text.secondary" sx={{ mb: 3, flexGrow: items ? 0 : 1 }}>
          {description}
        </AppText>
        {items && (
          <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, mb: 4, flexGrow: 1 }}>
            {items.map((item) => (
              <Box
                component="li"
                key={item}
                sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 1.5 }}
              >
                <CheckCircleOutlineIcon fontSize="small" color={accent} sx={{ mt: '2px' }} />
                <AppText variant="body2">{item}</AppText>
              </Box>
            ))}
          </Box>
        )}
        <AppButton 
          variant="contained" 
          color={accent}
          size="large"
          fullWidth
          component={RouterLink}
          to={path}
          sx={{ mt: items ? 0 : 'auto' }}
        >
          {buttonText}
        </AppButton>
      </Box>
    </Paper>
  );
};

export default CoachingPathCard;
