import React, { useEffect, useRef, useState } from 'react';
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
import CloseIcon from '@mui/icons-material/Close';
import { NavLink as RouterLink } from 'react-router-dom';
import AppButton from '../ui/AppButton';
import AppText from '../ui/AppText';
import AppContainer from '../ui/AppContainer';
import logo from '../../assets/logo.svg';

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
  '&.active': {
    color: theme.palette.primary.main,
    fontWeight: 700,
    textDecoration: 'underline',
    textUnderlineOffset: '0.3em',
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
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const observer = new ResizeObserver(() => {
      document.documentElement.style.setProperty('--site-header-height', `${header.offsetHeight}px`);
    });
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen((open) => !open);
  };

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  const drawer = (
    <Box component="nav" aria-label="Primary navigation" sx={{ textAlign: 'center', p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton aria-label="Close navigation menu" onClick={handleDrawerClose} sx={{ width: 44, height: 44 }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box 
        component={RouterLink} 
        to="/"
        onClick={handleDrawerClose}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          flexWrap: 'wrap',
          my: 2,
          textDecoration: 'none'
        }}
      >
        <Box component="img" src={logo} alt="" sx={{ height: 32 }} />
        <AppText
          variant="subtitle1"
          component="span"
          sx={{ fontWeight: 700, color: 'primary.main', fontSize: '1rem', whiteSpace: 'nowrap' }}
        >
          Leadership Learners
        </AppText>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton 
              component={RouterLink} 
              to={item.path}
              onClick={handleDrawerClose}
              sx={{
                textAlign: 'center',
                '&.active': {
                  bgcolor: 'action.selected',
                  '& .MuiListItemText-primary': {
                    fontWeight: 700,
                    textDecoration: 'underline',
                    textUnderlineOffset: '0.3em',
                  },
                },
              }}
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
    <AppBar ref={headerRef} component="header" position="sticky" color="default" elevation={1} sx={{ bgcolor: 'background.paper' }}>
      <AppContainer>
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 0 } }}>
          <Box
            component={RouterLink}
            to="/"
            aria-label="Leadership Learners"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none'
            }}
          >
            {/* The wordmark beside it names this link; the aria-label above covers
                the narrow widths where that text is hidden. */}
            <Box
              component="img"
              src={logo}
              alt=""
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
            <Box component="nav" aria-label="Primary navigation" sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
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
                aria-controls={mobileOpen ? 'mobile-navigation' : undefined}
                aria-haspopup="dialog"
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

      {isMobile && <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerClose}
        slotProps={{ paper: { role: 'dialog', 'aria-modal': true, 'aria-label': 'Navigation menu' } }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        <Box id="mobile-navigation">{drawer}</Box>
      </Drawer>}
    </AppBar>
  );
};

export default Navbar;
