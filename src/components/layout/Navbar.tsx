import React, { useEffect, useRef, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  useTheme,
  styled
} from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';
import AppContainer from '../ui/AppContainer';
import BrandLogo from '../brand/BrandLogo';
import DirectCta from '../marketing/DirectCta';
import MobileMenu from './MobileMenu';
import type { MenuItem } from './MobileMenu';
import { useHideOnScroll } from '../../lib/use-hide-on-scroll';

// Gold on hover and focus. The underline stays, thicker, on the current page,
// so the current page never relies on colour alone.
const NavLink = styled(RouterLink)(({ theme }) => ({
  textDecorationLine: 'underline',
  textDecorationColor: 'transparent',
  textDecorationThickness: 2,
  textUnderlineOffset: '0.45em',
  color: theme.palette.onNavy.nav,
  fontWeight: 500,
  fontSize: '0.95rem',
  transition: 'color 0.2s, text-decoration-color 0.2s',
  display: 'inline-flex',
  alignItems: 'center',
  minHeight: 44,
  '&:hover, &:focus-visible': {
    color: theme.palette.brand.gold,
    textDecorationColor: theme.palette.brand.gold,
  },
  '&.active': {
    color: theme.palette.brand.white,
    textDecorationColor: theme.palette.brand.gold,
    textDecorationThickness: 3,
  },
}));

const navItems: MenuItem[] = [
  { name: 'Corporate', path: '/corporate' },
  { name: 'Individual', path: '/individual' },
  { name: 'About', path: '/about' },
  { name: 'Blog', path: '/blog' },
];

// The phone menu lists Contact as a page like the rest; the direct CTA sits
// below the pages in the menu, in the header from sm up and in the action bar
// on phones.
const menuItems: MenuItem[] = [
  ...navItems,
  { name: 'Contact', path: '/contact', analytics: { id: 'nav_menu_contact', location: 'mobile_menu', intent: 'contact' } },
];

// Phones: logo and Menu; the header slides away while the visitor reads down
// and returns when they scroll up. From sm: the direct CTA joins Menu and the
// header stays put. From md: the page links replace Menu.
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
      color="primary"
      elevation={0}
      inert={hidden}
      onFocus={(event: React.FocusEvent<HTMLElement>) => setKeyboardFocusInside(event.target.matches(':focus-visible'))}
      onBlur={(event: React.FocusEvent<HTMLElement>) => {
        if (!(event.relatedTarget instanceof Node && event.currentTarget.contains(event.relatedTarget))) setKeyboardFocusInside(false);
      }}
      sx={[
        (t) => t.mixins.navySurface,
        {
          boxShadow: 'none',
          borderBottom: '3px solid',
          borderBottomColor: 'brand.gold',
          transition: 'transform 200ms ease-out',
          transform: hidden ? 'translateY(-100%)' : 'none',
        },
      ]}
    >
      <AppContainer>
        {/* Static, so the menu panel hangs from the full-width header, not the padded toolbar. */}
        <Toolbar sx={{ position: 'static', justifyContent: 'space-between', gap: 2, px: { xs: 0 }, minHeight: { xs: 64, md: 76 } }}>
          <Box
            component={RouterLink}
            to="/"
            aria-label="Leadership Learners"
            sx={{
              display: 'flex',
              alignItems: 'center',
              minWidth: 0,
              minHeight: 44,
              textDecoration: 'none',
              borderRadius: 1,
            }}
          >
            <BrandLogo size="header" />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, md: 2.5, lg: 4 }, flexShrink: 0 }}>
            <Box component="nav" aria-label="Primary navigation" sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: { md: 2.5, lg: 4 } }}>
              {navItems.map((item) => (
                <NavLink key={item.name} to={item.path}>
                  {item.name}
                </NavLink>
              ))}
            </Box>
            <DirectCta id="header" location="header" size="header" sx={{ display: { xs: 'none', sm: 'inline-flex' } }} />
            <MobileMenu items={menuItems} open={menuOpen} onOpenChange={setMenuOpen} />
          </Box>
        </Toolbar>
      </AppContainer>
    </AppBar>
  );
};

export default Navbar;
