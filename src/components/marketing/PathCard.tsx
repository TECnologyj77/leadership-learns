import React from 'react';
import { Box } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link as RouterLink } from 'react-router-dom';
import AppText from '../ui/AppText';
import AppButton from '../ui/AppButton';
import AppCard from '../ui/AppCard';
import CheckList from '../ui/CheckList';

interface PathCardProps {
  /** Who the path is for, shown above the title so visitors can self-select. */
  audience: string;
  title: string;
  description: string;
  /** Services already offered on the linked page. */
  items: string[];
  path: string;
  buttonText: string;
  variant: 'corporate' | 'individual';
}

// One of the two ways in: navy top border for the corporate side, gold for
// the individual side.
const PathCard: React.FC<PathCardProps> = ({ audience, title, description, items, path, buttonText, variant }) => {
  const corporate = variant === 'corporate';

  return (
    <AppCard accent={corporate ? 'navy' : 'gold'} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <AppText variant="eyebrow" color={corporate ? 'primary' : undefined}>
        {audience}
      </AppText>
      <AppText variant="h3" component="h3" sx={{ mt: 1.5, mb: 1.5 }}>
        {title}
      </AppText>
      <AppText variant="body1" sx={{ mb: 3 }}>
        {description}
      </AppText>
      <CheckList items={items} tone={corporate ? 'navy' : 'gold'} />
      {/* Pinned to the bottom, so the two cards' buttons line up. */}
      <Box sx={{ mt: 'auto', pt: 4 }}>
        <AppButton
          analytics={{ id: `service_card_${variant}`, location: 'service_paths', intent: variant }}
          variant="contained"
          color="primary"
          size="large"
          component={RouterLink}
          to={path}
          endIcon={<ArrowForwardIcon />}
          sx={{ width: { xs: '100%', sm: 'auto' } }}
        >
          {buttonText}
        </AppButton>
      </Box>
    </AppCard>
  );
};

export default PathCard;
