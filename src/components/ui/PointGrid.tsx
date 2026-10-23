import React from 'react';
import { Box } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined';
import AppText from './AppText';
import AppCard from './AppCard';

interface PointGridProps {
  items: string[];
  /** 'pain' marks each point with a short rule; 'outcome' with a tick. */
  kind: 'pain' | 'outcome';
  /** Navy for the corporate side, gold text for the individual side. */
  tone?: 'navy' | 'gold';
}

// Points as small white cards, two to a row from sm up: the pain points a
// page names, or the change it works toward.
const PointGrid: React.FC<PointGridProps> = ({ items, kind, tone = 'navy' }) => {
  const color = tone === 'navy' ? 'brand.navy' : 'brand.goldText';

  return (
    <Box
      component="ul"
      sx={{ listStyle: 'none', p: 0, m: 0, display: 'grid', gap: 2.5, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' } }}
    >
      {items.map((item) => (
        <AppCard component="li" key={item} padded={false} sx={{ p: 3, display: 'flex', alignItems: 'flex-start', gap: 2 }}>
          {kind === 'outcome' ? (
            <CheckCircleOutlineIcon aria-hidden="true" sx={{ color, mt: '2px', flexShrink: 0 }} />
          ) : (
            <Box aria-hidden="true" sx={{ width: 16, height: 3, mt: '13px', borderRadius: 1, bgcolor: color, flexShrink: 0 }} />
          )}
          <AppText variant="body1" sx={{ color: 'text.primary' }}>{item}</AppText>
        </AppCard>
      ))}
    </Box>
  );
};

export default PointGrid;
