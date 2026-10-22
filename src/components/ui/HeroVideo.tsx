import React, { useRef, useState } from 'react';
import { Box } from '@mui/material';

interface HeroVideoProps {
  src: string;
  poster: string;
}

// The 9:16 intro video. Until it plays it shows the poster with one large play
// button and no native controls; pressing the button plays it, brings the
// controls in and moves focus to the video so keyboard users can carry on.
const HeroVideo: React.FC<HeroVideoProps> = ({ src, poster }) => {
  const video = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const play = () => {
    const element = video.current;
    if (!element) return;
    setStarted(true);
    element.focus();
    // A refused autoplay leaves the controls up, so the visitor can press play themselves.
    void element.play().catch(() => {});
  };

  return (
    <Box sx={{ position: 'relative', aspectRatio: '9 / 16', bgcolor: 'brand.navyDeep' }}>
      <Box
        component="video"
        ref={video}
        controls={started}
        playsInline
        preload="none"
        poster={poster}
        tabIndex={-1}
        aria-label="Leadership Learners overview video"
        // The frame clips its corners, so the focus ring sits just inside the edge.
        sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', '&:focus-visible': { outlineOffset: -5 } }}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </Box>
      {!started && (
        // The whole poster plays the video; the circle is what keyboard focus outlines.
        <Box
          component="button"
          type="button"
          onClick={play}
          aria-label="Play Tammy's intro video"
          sx={{
            position: 'absolute',
            inset: 0,
            p: 0,
            border: 0,
            bgcolor: 'transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '&:focus-visible': { outline: 'none' },
            '&:focus-visible .play-circle': { outline: '3px solid', outlineColor: 'surface.focus', outlineOffset: 4 },
            '&:hover .play-circle': { transform: 'scale(1.06)' },
          }}
        >
          <Box
            className="play-circle"
            sx={{
              width: 76,
              height: 76,
              borderRadius: '50%',
              bgcolor: 'brand.white',
              opacity: 0.94,
              boxShadow: '0 12px 32px rgba(20, 39, 63, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.2s',
              color: 'brand.navy',
            }}
          >
            {/* Nudged right, so the triangle looks centred in the circle. */}
            <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true" focusable="false" style={{ marginLeft: 4 }}>
              <path d="M6 4.5v15l13-7.5z" fill="currentColor" />
            </svg>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default HeroVideo;
