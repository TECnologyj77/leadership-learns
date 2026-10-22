import React from 'react';
import { Box } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import AppText from './AppText';

interface ServiceAreaLineProps {
  /** One of the SERVICE_AREA lines in site-config. */
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

// Where Tammy works, behind a map pin.
const ServiceAreaLine: React.FC<ServiceAreaLineProps> = ({ children, sx }) => (
  <Box sx={[{ display: 'flex', alignItems: 'flex-start', gap: 1 }, ...(Array.isArray(sx) ? sx : [sx])]}>
    <PlaceOutlinedIcon aria-hidden="true" sx={{ fontSize: 20, mt: '2px', flexShrink: 0, color: 'surface.accent' }} />
    <AppText variant="body2" sx={{ color: 'surface.muted', fontWeight: 500 }}>
      {children}
    </AppText>
  </Box>
);

export default ServiceAreaLine;
