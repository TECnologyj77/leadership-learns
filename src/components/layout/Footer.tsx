import React from 'react';
import { Grid, Box, Link, Divider, Stack } from '@mui/material';
import { PhoneOutlined as PhoneOutlinedIcon, MailOutlined as MailOutlinedIcon } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import AppText from '../ui/AppText';
import AppContainer from '../ui/AppContainer';
import logo from '../../assets/logo.jpg';

// Comfortable tap area for the stacked footer links on touch screens.
const footerLinkSx = { display: 'inline-flex', alignItems: 'center', minHeight: 36 } as const;

const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', pt: 8, pb: 4 }}>
      <AppContainer>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1.5 }}>
              <Box 
                component="img" 
                src={logo} 
                alt="Leadership Learners" 
                sx={{ height: 40, borderRadius: 1, bgcolor: 'white', p: 0.5 }} 
              />
              <AppText variant="h6" component="p" sx={{ fontWeight: 700 }}>
                Leadership Learners
              </AppText>
            </Box>
            <AppText variant="body2" sx={{ opacity: 0.8, maxWidth: 300 }}>
              Connect with Tammy today and discover what&apos;s possible when learning meets leadership.
            </AppText>
            <Stack spacing={1} sx={{ mt: 2 }}>
              <Link
                href="tel:+18586036709"
                color="inherit"
                underline="hover"
                variant="body2"
                sx={{ ...footerLinkSx, gap: 1 }}
              >
                <PhoneOutlinedIcon fontSize="small" />
                (858) 603-6709
              </Link>
              <Link
                href="mailto:t.summers@leadershiplearners.org"
                color="inherit"
                underline="hover"
                variant="body2"
                sx={{ ...footerLinkSx, gap: 1, wordBreak: 'break-word' }}
              >
                <MailOutlinedIcon fontSize="small" />
                t.summers@leadershiplearners.org
              </Link>
            </Stack>
          </Grid>
          
          <Grid size={{ xs: 6, md: 2 }}>
            <AppText variant="subtitle1" component="h2" sx={{ fontWeight: 600, mb: 2 }}>
              Solutions
            </AppText>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link component={RouterLink} to="/corporate" color="inherit" underline="hover" variant="body2" sx={footerLinkSx}>Corporate</Link>
              <Link component={RouterLink} to="/individual" color="inherit" underline="hover" variant="body2" sx={footerLinkSx}>Individual</Link>
              <Link component={RouterLink} to="/blog" color="inherit" underline="hover" variant="body2" sx={footerLinkSx}>Blog</Link>
            </Box>
          </Grid>

          <Grid size={{ xs: 6, md: 2 }}>
            <AppText variant="subtitle1" component="h2" sx={{ fontWeight: 600, mb: 2 }}>
              Company
            </AppText>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link component={RouterLink} to="/about" color="inherit" underline="hover" variant="body2" sx={footerLinkSx}>About Us</Link>
              <Link component={RouterLink} to="/contact" color="inherit" underline="hover" variant="body2" sx={footerLinkSx}>Contact Tammy</Link>
            </Box>
          </Grid>

        </Grid>
        
        <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <AppText variant="body2" sx={{ opacity: 0.6 }}>
            © {new Date().getFullYear()} Leadership Learners. All rights reserved.
          </AppText>
        </Box>
      </AppContainer>
    </Box>
  );
};

export default Footer;
