import React from 'react';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import AppButton from '../ui/AppButton';
import { SECONDARY_CTA } from '../../lib/site-config';

interface SecondaryCtaProps {
  /** Where it sits, e.g. 'home_hero': the button reports home_hero_email. */
  id: string;
  location: string;
  /** Spells out the address or number (the Contact page). */
  long?: boolean;
  fullWidth?: boolean;
}

// On a narrow phone a long email address wraps after the @ rather than mid-word.
const withAddressBreak = (label: string) => {
  const [before, after] = label.split('@');
  return after === undefined ? label : <>{before}@<wbr />{after}</>;
};

// The other way in beside DirectCta ("Email Tammy" while the call is the
// direct CTA). An outline button: navy on light surfaces, white on navy ones.
const SecondaryCta: React.FC<SecondaryCtaProps> = ({ id, location, long, fullWidth }) => (
  <AppButton
    analytics={{ id: `${id}_${SECONDARY_CTA.idSuffix}`, location, intent: 'contact', contactMethod: SECONDARY_CTA.method }}
    variant="outlined"
    color="primary"
    size="large"
    fullWidth={fullWidth}
    href={SECONDARY_CTA.href}
    startIcon={SECONDARY_CTA.method === 'phone' ? <PhoneOutlinedIcon /> : <MailOutlinedIcon />}
  >
    {long ? withAddressBreak(SECONDARY_CTA.longLabel) : SECONDARY_CTA.label}
  </AppButton>
);

export default SecondaryCta;
