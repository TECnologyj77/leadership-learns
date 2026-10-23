import React from 'react';
import { Box, Avatar } from '@mui/material';
import AppText from '../ui/AppText';
import AppCard from '../ui/AppCard';
import type { Testimonial } from '../../content/testimonials';
import { fonts } from '../../theme/tokens';

const TestimonialCard: React.FC<Testimonial> = ({ quote, author, role, avatar }) => (
  <AppCard component="figure" sx={{ m: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
    <Box
      aria-hidden="true"
      sx={{ fontFamily: fonts.serif, fontWeight: 600, fontSize: '56px', lineHeight: 1, height: 36, color: 'brand.quoteGold' }}
    >
      &ldquo;
    </Box>
    <AppText component="blockquote" variant="quote" sx={{ m: 0, mt: 1.5, mb: 3, flexGrow: 1 }}>
      {quote}
    </AppText>
    <Box component="figcaption" sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
      {/* The name beside it says who this is. */}
      {avatar && <Avatar src={avatar} alt="" sx={{ width: 48, height: 48 }} />}
      <Box>
        <AppText component="p" sx={{ fontWeight: 700, lineHeight: 1.3, color: 'text.primary' }}>
          {author}
        </AppText>
        <AppText variant="body2" sx={{ color: 'text.secondary' }}>
          {role}
        </AppText>
      </Box>
    </Box>
  </AppCard>
);

export default TestimonialCard;
