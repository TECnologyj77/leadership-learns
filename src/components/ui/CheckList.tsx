import React from 'react';
import { Box } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import AppText from './AppText';

interface CheckListProps {
  items: string[];
  /** Navy for the corporate side, gold text for the individual side. */
  tone?: 'navy' | 'gold';
}

// A short bulleted list inside a card, each item ticked.
const CheckList: React.FC<CheckListProps> = ({ items, tone = 'navy' }) => (
  <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
    {items.map((item) => (
      <Box component="li" key={item} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.25, '& + &': { mt: 1.25 } }}>
        <CheckIcon
          aria-hidden="true"
          sx={{ fontSize: 20, mt: '3px', flexShrink: 0, color: tone === 'navy' ? 'brand.navy' : 'brand.goldText' }}
        />
        <AppText variant="body1" sx={{ color: 'text.primary' }}>{item}</AppText>
      </Box>
    ))}
  </Box>
);

export default CheckList;
