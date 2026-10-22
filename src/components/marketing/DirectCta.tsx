import React from 'react';
import type { SxProps, Theme } from '@mui/material';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import AppButton from '../ui/AppButton';
import { PRIMARY_CTA } from '../../lib/site-config';

interface DirectCtaProps {
  /** Where it sits, e.g. 'home_hero': the button reports home_hero_call. */
  id: string;
  location: string;
  /** 'header' is the 44px version for the site header. */
  size?: 'large' | 'header';
  fullWidth?: boolean;
  sx?: SxProps<Theme>;
}

// The direct CTA, and the only gold-filled control on the site. Its label and
// link come from PRIMARY_CTA, so changing that one constant swaps it
// everywhere. data-direct-cta lets the phone action bar step aside while one
// is on screen.
const DirectCta: React.FC<DirectCtaProps> = ({ id, location, size = 'large', fullWidth, sx }) => (
  <AppButton
    data-direct-cta=""
    analytics={{ id: `${id}_${PRIMARY_CTA.idSuffix}`, location, intent: 'contact', contactMethod: PRIMARY_CTA.method }}
    variant="contained"
    size={size === 'header' ? 'medium' : 'large'}
    fullWidth={fullWidth}
    href={PRIMARY_CTA.href}
    startIcon={PRIMARY_CTA.method === 'phone' ? <PhoneOutlinedIcon /> : <MailOutlinedIcon />}
    sx={[
      {
        bgcolor: 'brand.gold',
        color: 'brand.ink',
        whiteSpace: 'nowrap',
        '&:hover, &:active': { bgcolor: 'brand.goldHover' },
      },
      size === 'header' && { minHeight: 44, px: 2.25 },
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
  >
    {PRIMARY_CTA.label}
  </AppButton>
);

export default DirectCta;
