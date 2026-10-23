import React from 'react';
import { Grid, Box, Link, Stack } from '@mui/material';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import { Link as RouterLink } from 'react-router-dom';
import AppText from '../ui/AppText';
import AppContainer from '../ui/AppContainer';
import BrandLogo from '../brand/BrandLogo';
import { trackCta } from '../../lib/analytics';
import { ORG_EMAIL, ORG_PHONE_DISPLAY, ORG_PHONE_E164, SERVICE_AREA } from '../../lib/site-config';

const footerLinkSx = {
  display: 'inline-flex',
  alignItems: 'center',
  minHeight: 44,
  color: 'onNavy.body',
  '&:hover, &:focus-visible': { color: 'brand.gold' },
} as const;

const contactLinkSx = { ...footerLinkSx, gap: 1, color: 'brand.white' } as const;

const FooterColumn: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <>
    <AppText variant="eyebrow" component="h2" sx={{ color: 'brand.white', mb: 1.5 }}>
      {title}
    </AppText>
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>{children}</Box>
  </>
);

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={[
        (theme) => theme.mixins.navySurface,
        { bgcolor: 'brand.navyDeep', borderTop: '3px solid', borderTopColor: 'brand.gold', pt: { xs: 7, md: 9 }, pb: 4 },
      ]}
    >
      <AppContainer>
        <Grid container spacing={{ xs: 5, md: 4 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <BrandLogo size="footer" />
            <AppText variant="body2" sx={{ mt: 2.5, maxWidth: 380 }}>
              Connect with Tammy today and discover what&apos;s possible when learning meets leadership.
            </AppText>
            <AppText variant="body2" sx={{ mt: 1.5, maxWidth: 380, color: 'brand.gold', fontWeight: 600 }}>
              Serving {SERVICE_AREA}.
            </AppText>
            <Stack sx={{ mt: 2 }}>
              <Link
                href={`tel:${ORG_PHONE_E164}`}
                onClick={() => trackCta({ id: 'footer_phone', location: 'footer', intent: 'contact', contactMethod: 'phone' })}
                underline="hover"
                variant="body2"
                sx={contactLinkSx}
              >
                <PhoneOutlinedIcon fontSize="small" />
                {ORG_PHONE_DISPLAY}
              </Link>
              <Link
                href={`mailto:${ORG_EMAIL}`}
                onClick={() => trackCta({ id: 'footer_email', location: 'footer', intent: 'contact', contactMethod: 'email' })}
                underline="hover"
                variant="body2"
                sx={{ ...contactLinkSx, wordBreak: 'break-word' }}
              >
                <MailOutlinedIcon fontSize="small" />
                {ORG_EMAIL}
              </Link>
            </Stack>
          </Grid>

          <Grid size={{ xs: 6, md: 3 }}>
            <FooterColumn title="Solutions">
              <Link component={RouterLink} to="/corporate" underline="hover" variant="body2" sx={footerLinkSx}>Corporate</Link>
              <Link component={RouterLink} to="/individual" underline="hover" variant="body2" sx={footerLinkSx}>Individual</Link>
              <Link component={RouterLink} to="/blog" underline="hover" variant="body2" sx={footerLinkSx}>Blog</Link>
            </FooterColumn>
          </Grid>

          <Grid size={{ xs: 6, md: 3 }}>
            <FooterColumn title="Company">
              <Link component={RouterLink} to="/about" underline="hover" variant="body2" sx={footerLinkSx}>About Us</Link>
              <Link component={RouterLink} to="/contact" onClick={() => trackCta({ id: 'footer_contact', location: 'footer', intent: 'contact' })} underline="hover" variant="body2" sx={footerLinkSx}>Contact Tammy</Link>
            </FooterColumn>
          </Grid>
        </Grid>

        <Box sx={{ mt: { xs: 5, md: 7 }, pt: 3, borderTop: 1, borderColor: 'onNavy.footerRule' }}>
          <AppText variant="body2">
            © {new Date().getFullYear()} Leadership Learners. All rights reserved.
          </AppText>
        </Box>
      </AppContainer>
    </Box>
  );
};

export default Footer;
