import React from 'react';
import { Grid, Box, Link, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AppText from '../ui/AppText';
import AppContainer from '../ui/AppContainer';
import logo from '../../assets/logo.jpg';

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
              <AppText variant="h6" sx={{ fontWeight: 700 }}>
                Leadership Learners
              </AppText>
            </Box>
            <AppText variant="body2" sx={{ opacity: 0.8, maxWidth: 300 }}>
              Explore leadership development, coaching, and communication support.
            </AppText>
          </Grid>
          
          <Grid size={{ xs: 6, md: 2 }}>
            <AppText variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Solutions
            </AppText>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link component={RouterLink} to="/corporate" color="inherit" underline="hover" variant="body2">Corporate</Link>
              <Link component={RouterLink} to="/individual" color="inherit" underline="hover" variant="body2">Individual</Link>
              <Link component={RouterLink} to="/blog" color="inherit" underline="hover" variant="body2">Blog</Link>
            </Box>
          </Grid>

          <Grid size={{ xs: 6, md: 2 }}>
            <AppText variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Company
            </AppText>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link component={RouterLink} to="/about" color="inherit" underline="hover" variant="body2">About Us</Link>
              <Link component={RouterLink} to="/contact" color="inherit" underline="hover" variant="body2">Contact</Link>
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
