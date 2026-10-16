import React from 'react';
import { Box } from '@mui/material';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import AppButton from '../ui/AppButton';
import { CALL_LABEL, EMAIL_LABEL, ORG_EMAIL, ORG_PHONE_E164 } from '../../lib/site-config';

interface DirectCtaProps {
  /** e.g. 'home_hero': the buttons report home_hero_call and home_hero_email. */
  id: string;
  location: string;
  /** The call button's fill: navy or gold, as the section's design calls for. */
  color?: 'primary' | 'secondary';
  /** The section behind the buttons; on navy the email button is outlined in white. */
  surface?: 'light' | 'dark';
  align?: 'flex-start' | 'center';
  /** Further buttons that share the row, after the email button. */
  children?: React.ReactNode;
}

// The direct CTA: call Tammy, with email as the secondary way in. Full width
// on phones, where a thumb reaches for it; natural width from sm up.
const DirectCta: React.FC<DirectCtaProps> = ({ id, location, color = 'secondary', surface = 'dark', align = 'flex-start', children }) => (
  <Box
    sx={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 1.5,
      justifyContent: align,
      '& > *': { width: { xs: '100%', sm: 'auto' } },
    }}
  >
    <AppButton
      analytics={{ id: `${id}_call`, location, intent: 'contact', contactMethod: 'phone' }}
      variant="contained"
      color={color}
      size="large"
      href={`tel:${ORG_PHONE_E164}`}
      startIcon={<PhoneOutlinedIcon />}
    >
      {CALL_LABEL}
    </AppButton>
    <AppButton
      analytics={{ id: `${id}_email`, location, intent: 'contact', contactMethod: 'email' }}
      variant="outlined"
      color={surface === 'dark' ? 'inherit' : 'primary'}
      size="large"
      href={`mailto:${ORG_EMAIL}`}
      startIcon={<MailOutlinedIcon />}
    >
      {EMAIL_LABEL}
    </AppButton>
    {children}
  </Box>
);

export default DirectCta;
