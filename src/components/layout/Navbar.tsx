import React, { useEffect, useRef, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  useTheme,
  styled
} from '@mui/material';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import { NavLink as RouterLink } from 'react-router-dom';
import AppButton from '../ui/AppButton';
import AppText from '../ui/AppText';
import AppContainer from '../ui/AppContainer';
import MobileMenu from './MobileMenu';
import type { MenuItem } from './MobileMenu';
import { useHideOnScroll } from '../../lib/use-hide-on-scroll';
import { CALL_LABEL, ORG_PHONE_E164 } from '../../lib/site-config';
import logo from '../../assets/logo.svg';

// The underline fades in on hover and stays, thicker, on the current page, so
// the current page never relies on colour alone.
const NavLink = styled(RouterLink)(({ theme }) => ({
  textDecorationLine: 'underline',
  textDecorationColor: 'transparent',
  textDecorationThickness: 2,
  textUnderlineOffset: '0.45em',
  color: theme.palette.text.primary,
  fontWeight: 500,
  fontSize: '0.95rem',
  transition: 'color 0.2s, text-decoration-color 0.2s',
  display: 'inline-flex',
  alignItems: 'center',
  minHeight: 44,
  '&:hover': {
    color: theme.palette.primary.main,
    textDecorationColor: theme.palette.gold.accent,
  },
  '&.active': {
    color: theme.palette.primary.main,
    textDecorationColor: theme.palette.gold.accent,
    textDecorationThickness: 3,
  },
}));

const navItems: MenuItem[] = [
  { name: 'Corporate', path: '/corporate' },
  { name: 'Individual', path: '/individual' },
  { name: 'About', path: '/about' },
  { name: 'Blog', path: '/blog' },
];

// The phone menu lists Contact as a page like the rest; the call button itself
// lives in the header from sm up and in the action bar on phones.
const menuItems: MenuItem[] = [
  ...navItems,
  { name: 'Contact', path: '/contact', analytics: { id: 'nav_menu_contact', location: 'mobile_menu', intent: 'contact' } },
];

// Phones: logo, name and Menu; the header slides away while the visitor reads
// down and returns when they scroll up. From sm: the call button joins Menu
// and the header stays put. From md: the page links replace Menu.
const Navbar: React.FC = () => {
  const theme = useTheme();
  const headerRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [keyboardFocusInside, setKeyboardFocusInside] = useState(false);
  const scrolledDown = useHideOnScroll(`(min-width: ${theme.breakpoints.values.sm}px)`);
  // Never slides away while the menu is open or a keyboard user is in it.
  // While away it is inert, so Tab never lands on a control nobody can see.
  const hidden = scrolledDown && !menuOpen && !keyboardFocusInside;

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const observer = new ResizeObserver(() => {
      document.documentElement.style.setProperty('--site-header-height', `${header.offsetHeight}px`);
    });
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  return (
    <AppBar
      ref={headerRef}
      component="header"
      position="sticky"
      color="default"
      elevation={0}
      inert={hidden}
      onFocus={(event: React.FocusEvent<HTMLElement>) => setKeyboardFocusInside(event.target.matches(':focus-visible'))}
      onBlur={(event: React.FocusEvent<HTMLElement>) => {
        if (!(event.relatedTarget instanceof Node && event.currentTarget.contains(event.relatedTarget))) setKeyboardFocusInside(false);
      }}
      sx={{
        bgcolor: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'saturate(180%) blur(12px)',
        boxShadow: 'none',
        borderBottom: 1,
        borderColor: 'divider',
        transition: 'transform 200ms ease-out',
        transform: hidden ? 'translateY(-100%)' : 'none',
      }}
    >
      <AppContainer>
        {/* Static, so the menu panel hangs from the full-width header, not the padded toolbar. */}
        <Toolbar sx={{ position: 'static', justifyContent: 'space-between', gap: 2, px: { xs: 0 } }}>
          <Box
            component={RouterLink}
            to="/"
            aria-label="Leadership Learners"
            sx={{
              display: 'flex',
              alignItems: 'center',
              minWidth: 0,
              textDecoration: 'none'
            }}
          >
            {/* The wordmark beside it names this link; the aria-label above covers
                the narrowest widths where that text is hidden. */}
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
                whiteSpace: 'nowrap',
                display: 'none',
                '@media (min-width: 360px)': { display: 'block' },
              }}
            >
              Leadership Learners
            </AppText>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 1, md: 3, lg: 4 }, flexShrink: 0 }}>
            <Box component="nav" aria-label="Primary navigation" sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: { md: 3, lg: 4 } }}>
              {navItems.map((item) => (
                <NavLink key={item.name} to={item.path}>
                  {item.name}
                </NavLink>
              ))}
            </Box>
            <AppButton
              analytics={{ id: 'header_call', location: 'header', intent: 'contact', contactMethod: 'phone' }}
              variant="contained"
              color="primary"
              href={`tel:${ORG_PHONE_E164}`}
              startIcon={<PhoneOutlinedIcon />}
              sx={{ display: { xs: 'none', sm: 'inline-flex' }, px: { sm: 2, lg: 3 }, fontSize: { sm: '0.95rem', lg: '1rem' }, whiteSpace: 'nowrap' }}
            >
              {CALL_LABEL}
            </AppButton>
            <MobileMenu items={menuItems} open={menuOpen} onOpenChange={setMenuOpen} />
          </Box>
        </Toolbar>
      </AppContainer>
    </AppBar>
  );
};

export default Navbar;
