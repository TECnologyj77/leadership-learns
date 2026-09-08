import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Box, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText,
  useTheme,
  useMediaQuery,
  styled
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink as RouterLink } from 'react-router-dom';
import AppButton from '../ui/AppButton';
import AppText from '../ui/AppText';
import AppContainer from '../ui/AppContainer';
import logo from '../../assets/logo.jpg';

const NavLink = styled(RouterLink)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.text.primary,
  fontWeight: 500,
  fontSize: '0.95rem',
  transition: 'color 0.2s',
  display: 'inline-flex',
  alignItems: 'center',
  minHeight: 44,
  '&:hover': {
    color: theme.palette.primary.main,
  },
  '&:focus-visible': {
    outline: `3px solid ${theme.palette.secondary.main}`,
    outlineOffset: 4,
    borderRadius: 2,
  },
  '&.active': {
    color: theme.palette.primary.main,
    fontWeight: 700,
  },
}));

const navItems = [
  { name: 'Corporate', path: '/corporate' },
  { name: 'Individual', path: '/individual' },
  { name: 'About', path: '/about' },
  { name: 'Blog', path: '/blog' },
];

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen((open) => !open);
  };

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  const drawer = (
    <Box component="nav" aria-label="Mobile navigation" sx={{ textAlign: 'center', p: 2 }}>
      <Box 
        component={RouterLink} 
        to="/"
        onClick={handleDrawerClose}
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          my: 2 
        }}
      >
        <Box component="img" src={logo} alt="Leadership Learners" sx={{ height: 40 }} />
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton 
              component={RouterLink} 
              to={item.path}
              onClick={handleDrawerClose}
              sx={{ textAlign: 'center' }}
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <AppButton
        variant="contained"
        color="primary"
        fullWidth
        component={RouterLink}
        to="/contact"
        onClick={handleDrawerClose}
        sx={{ mt: 2 }}
      >
        Contact Tammy
      </AppButton>
    </Box>
  );

  return (
    <AppBar position="sticky" color="default" elevation={1} sx={{ bgcolor: 'background.paper' }}>
      <AppContainer>
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 0 } }}>
          <Box 
            component={RouterLink} 
            to="/" 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              textDecoration: 'none' 
            }}
          >
            <Box 
              component="img" 
              src={logo} 
              alt="Leadership Learners" 
              sx={{ 
                height: { xs: 32, md: 40 },
                mr: 1
              }} 
            />
            <AppText 
              variant="h6" 
              component="span" 
              sx={{ 
                fontWeight: 700, 
                color: 'primary.main', 
                fontSize: { xs: '1.1rem', md: '1.4rem' },
                display: { xs: 'none', sm: 'block' }
              }}
            >
              Leadership Learners
            </AppText>
          </Box>

          {!isMobile ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {navItems.map((item) => (
                <NavLink key={item.name} to={item.path}>
                  {item.name}
                </NavLink>
              ))}
              <AppButton 
                variant="contained" 
                color="primary" 
                component={RouterLink} 
                to="/contact"
              >
                Contact Tammy
              </AppButton>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
              <AppButton
                variant="contained"
                color="primary"
                component={RouterLink}
                to="/contact"
                sx={{ minHeight: 44, px: 2, whiteSpace: 'nowrap' }}
              >
                Contact Tammy
              </AppButton>
              <IconButton
                color="inherit"
                aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-controls="mobile-navigation"
                aria-expanded={mobileOpen}
                onClick={handleDrawerToggle}
                sx={{ width: 48, height: 48 }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppContainer>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        <Box id="mobile-navigation">{drawer}</Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
