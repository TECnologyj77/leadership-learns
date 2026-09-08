import React from 'react';
import { Box } from '@mui/material';
import AppText from '../ui/AppText';
import type { Client, ClientMark } from '../../content/clients';

/**
 * Placeholder marks drawn in `currentColor`, used until a client's real
 * artwork is supplied via the `logo` field in `content/clients.ts`.
 */
const marks: Record<ClientMark, React.ReactNode> = {
  college: (
    <>
      <path d="M20 4.5L32.5 8.5V19c0 7.6-5.4 12.6-12.5 15.5C12.9 31.6 7.5 26.6 7.5 19V8.5z" />
      <path d="M13 16.5c2.3-1.4 4.7-1.4 7 .4v7.6c-2.3-1.8-4.7-1.8-7-.4z" />
      <path d="M27 16.5c-2.3-1.4-4.7-1.4-7 .4v7.6c2.3-1.8 4.7-1.8 7-.4z" />
    </>
  ),
  biotech: (
    <>
      <path d="M9 5c0 8 22 9 22 15s-22 7-22 15" />
      <path d="M31 5c0 8-22 9-22 15s22 7 22 15" />
      <path d="M13.5 10.5h13" />
      <path d="M13.5 29.5h13" />
    </>
  ),
  realEstate: (
    <>
      <path d="M6.5 19.5L20 7.5l13.5 12" />
      <path d="M10.5 16.5v16h19v-16" />
      <path d="M15.5 27.5v-4M20 27.5v-7M24.5 27.5v-10" strokeLinecap="round" />
    </>
  ),
};

interface ClientLogoProps {
  client: Client;
}

const ClientLogo: React.FC<ClientLogoProps> = ({ client }) => {
  const { name, mark, wordmark, logo } = client;
  const [topLine, bottomLine] = wordmark.length === 2 ? wordmark : [undefined, wordmark[0]];

  return (
    <Box
      sx={{
        // A white tile keeps supplied artwork legible on the navy section —
        // most brand logos are drawn for a light background.
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1.5,
        minWidth: { xs: 200, md: 220 },
        minHeight: { xs: 96, md: 116 },
        px: 3,
        py: 2,
        borderRadius: 3,
        bgcolor: 'background.paper',
        color: 'primary.main',
        boxShadow: 2,
        transition: 'box-shadow 200ms ease, transform 200ms ease',
        '&:hover': { boxShadow: 6, transform: 'translateY(-2px)' },
      }}
    >
      {logo ? (
        <Box
          component="img"
          src={logo}
          alt={name}
          sx={{
            display: 'block',
            maxHeight: { xs: 64, md: 80 },
            maxWidth: '100%',
            width: 'auto',
            objectFit: 'contain',
          }}
        />
      ) : (
        <>
          <Box
            component="svg"
            viewBox="0 0 40 40"
            aria-hidden="true"
            focusable="false"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinejoin="round"
            sx={{ width: { xs: 34, md: 40 }, height: { xs: 34, md: 40 }, flexShrink: 0 }}
          >
            {marks[mark]}
          </Box>
          <Box sx={{ textAlign: 'left' }}>
            {topLine && (
              <AppText
                component="span"
                sx={{
                  display: 'block',
                  fontSize: { xs: '0.6rem', md: '0.65rem' },
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  lineHeight: 1.2,
                  opacity: 0.75,
                }}
              >
                {topLine}
              </AppText>
            )}
            <AppText
              component="span"
              sx={{
                display: 'block',
                fontSize: { xs: '1.05rem', md: '1.2rem' },
                fontWeight: 700,
                letterSpacing: '-0.01em',
                lineHeight: 1.2,
                whiteSpace: 'nowrap',
              }}
            >
              {bottomLine}
            </AppText>
          </Box>
        </>
      )}
    </Box>
  );
};

export default ClientLogo;
