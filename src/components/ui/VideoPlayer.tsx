import React from 'react';
import { Box, Paper } from '@mui/material';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  variant?: 'vertical' | 'horizontal';
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, poster, variant = 'horizontal' }) => {
  const aspectRatio = variant === 'vertical' ? (16 / 9) * 100 : (9 / 16) * 100;

  return (
    <Paper 
      elevation={4} 
      sx={{ 
        overflow: 'hidden', 
        borderRadius: 4,
        position: 'relative',
        width: '100%',
        maxWidth: variant === 'vertical' ? 350 : '100%',
        mx: 'auto'
      }}
    >
      <Box 
        sx={{ 
          position: 'relative', 
          pt: `${aspectRatio}%`,
          bgcolor: 'black'
        }}
      >
        <Box 
          component="video"
          controls
          playsInline
          poster={poster}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </Box>
      </Box>
    </Paper>
  );
};

export default VideoPlayer;
