import React from 'react';
import { Box, Paper, Avatar } from '@mui/material';
import AppText from '../ui/AppText';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  avatar?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author, role, avatar }) => {
  return (
    <Paper 
      component="figure"
      sx={{ 
        p: 4, 
        m: 0,
        height: '100%', 
        borderRadius: 4, 
        display: 'flex', 
        flexDirection: 'column',
        position: 'relative'
      }}
    >
      <Box sx={{ color: 'primary.light', mb: 2, opacity: 0.3 }}>
        <FormatQuoteIcon sx={{ fontSize: 40 }} />
      </Box>
      <AppText component="blockquote" variant="body1" sx={{ fontStyle: 'italic', m: 0, mb: 4, flexGrow: 1 }}>
        "{quote}"
      </AppText>
      <Box component="figcaption" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {avatar && <Avatar src={avatar} alt={author} sx={{ width: 48, height: 48 }} />}
        <Box>
          <AppText variant="subtitle1" component="p" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
            {author}
          </AppText>
          <AppText variant="body2" color="text.secondary">
            {role}
          </AppText>
        </Box>
      </Box>
    </Paper>
  );
};

export default TestimonialCard;
