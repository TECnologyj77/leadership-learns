import React, { useEffect, useRef, useSyncExternalStore } from 'react';
import { Box, keyframes, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { NavLink } from 'react-router-dom';
import AppContainer from '../ui/AppContainer';
import DirectCta from '../marketing/DirectCta';
import { trackCta } from '../../lib/analytics';
import type { CtaTracking } from '../../lib/analytics';
import { fonts } from '../../theme/tokens';

export interface MenuItem {
  name: string;
  path: string;
  analytics?: CtaTracking;
}

interface MobileMenuProps {
  items: MenuItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Pixel strings: in sx, a bare 1 means 100%.
const visuallyHidden = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
} as const;

const panelIn = keyframes`
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: none; }
`;

// False during prerender and hydration, true once React runs in the browser.
const subscribeNever = () => () => {};
const useHydrated = () => useSyncExternalStore(subscribeNever, () => true, () => false);

// The menu below the md breakpoint: a Menu/Close button that drops the pages
// over the page from the bottom of the header. A native disclosure, so it
// works before hydration. It closes after a choice, Escape, a tap outside,
// tabbing away, or widening to the desktop nav.
const MobileMenu: React.FC<MobileMenuProps> = ({ items, open, onOpenChange }) => {
  const theme = useTheme();
  const disclosure = useRef<HTMLDetailsElement>(null);
  const summary = useRef<HTMLElement>(null);
  // aria-expanded only once React runs: before that the browser reports the disclosure's own state.
  const hydrated = useHydrated();

  useEffect(() => {
    const desktop = window.matchMedia(`(min-width: ${theme.breakpoints.values.md}px)`);
    const closeOnDesktop = () => {
      if (desktop.matches && disclosure.current) disclosure.current.open = false;
    };
    closeOnDesktop();
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, [theme.breakpoints.values.md]);

  // A menu opened before hydration is already open; let the header know.
  useEffect(() => {
    if (disclosure.current?.open) onOpenChange(true);
  }, [onOpenChange]);

  // Back and forward never leave the menu open over the next page. (Links in
  // the menu close it themselves; a route-change effect could instead close a
  // menu opened while the previous navigation was still rendering.)
  useEffect(() => {
    const closeOnHistory = () => {
      if (disclosure.current) disclosure.current.open = false;
    };
    window.addEventListener('popstate', closeOnHistory);
    return () => window.removeEventListener('popstate', closeOnHistory);
  }, []);

  const close = () => {
    if (disclosure.current) disclosure.current.open = false;
    summary.current?.focus({ preventScroll: true });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDetailsElement>) => {
    if (event.key === 'Escape' && disclosure.current?.open) {
      event.preventDefault();
      close();
    }
  };

  // Tabbing past the last link closes the menu rather than leaving it open over the page.
  const handleBlur = (event: React.FocusEvent<HTMLDetailsElement>) => {
    if (event.relatedTarget instanceof Node && !event.currentTarget.contains(event.relatedTarget)) {
      event.currentTarget.open = false;
    }
  };

  const handleNavigate = (event: React.MouseEvent<HTMLElement>) => {
    if (event.target instanceof Element && event.target.closest('a')) close();
  };

  // The scrim and the panel hang from the bottom of the sticky header
  // (top: 100%), so they cover the page instead of pushing it down, and stay
  // attached wherever the visitor has scrolled to.
  return (
    <Box
      component="details"
      ref={disclosure}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      onToggle={(event: React.SyntheticEvent<HTMLDetailsElement>) => onOpenChange(event.currentTarget.open)}
      sx={{
        display: { md: 'none' },
        '&:not([open]) .menu-close, &[open] .menu-open': { display: 'none' },
      }}
    >
      <Box
        component="summary"
        ref={summary}
        aria-expanded={hydrated ? open : undefined}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.75,
          minHeight: 44,
          pl: 1.25,
          pr: 1.75,
          borderRadius: 2.5,
          border: 1,
          borderColor: 'onNavy.divider',
          color: 'onNavy.nav',
          fontWeight: 600,
          fontSize: '0.95rem',
          whiteSpace: 'nowrap',
          cursor: 'pointer',
          listStyle: 'none',
          userSelect: 'none',
          transition: 'background-color 0.2s, color 0.2s',
          '&::-webkit-details-marker': { display: 'none' },
          '&:hover, details[open] > &': { bgcolor: 'color-mix(in srgb, currentColor 10%, transparent)' },
          '&:hover': { color: 'brand.gold' },
          // From sm the direct CTA shares the header, so the button keeps just
          // its icon on screen; the word stays for screen readers.
          [theme.breakpoints.up('sm')]: {
            justifyContent: 'center',
            minWidth: 44,
            px: 0,
            '& .menu-label': visuallyHidden,
          },
        }}
      >
        <MenuIcon className="menu-open" fontSize="small" />
        <CloseIcon className="menu-close" fontSize="small" />
        <span className="menu-open menu-label">Menu</span>
        <span className="menu-close menu-label">Close</span>
      </Box>

      {/* Mouse and touch only: keyboard users close with Escape or the Close button. */}
      <Box
        aria-hidden="true"
        onClick={close}
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: '100%',
          height: 'calc(100dvh - 100%)',
          bgcolor: 'rgba(15, 27, 45, 0.45)',
        }}
      />
      <Box
        component="nav"
        aria-label="Menu"
        onClick={handleNavigate}
        sx={[
          (t) => t.mixins.navySurface,
          {
            position: 'absolute',
            left: 0,
            right: 0,
            top: '100%',
            maxHeight: 'calc(100dvh - 100%)',
            overflowY: 'auto',
            borderBottom: '3px solid',
            borderBottomColor: 'brand.gold',
            boxShadow: '0 24px 48px -16px rgba(15, 27, 45, 0.45)',
            pt: 1,
            pb: 3,
            animation: `${panelIn} 180ms ease-out`,
          },
        ]}
      >
        <AppContainer>
          <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
            {items.map((item) => (
              <Box
                component="li"
                key={item.path}
                sx={{ '& + &': { borderTop: 1, borderColor: 'onNavy.divider' } }}
              >
                <Box
                  component={NavLink}
                  to={item.path}
                  data-cta-id={item.analytics?.id}
                  onClick={() => {
                    if (item.analytics) trackCta(item.analytics);
                  }}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 2,
                    minHeight: 60,
                    py: 1.5,
                    color: 'onNavy.nav',
                    fontFamily: fonts.serif,
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    letterSpacing: '-0.01em',
                    textDecoration: 'none',
                    '& svg': { color: 'onNavy.body', transition: 'transform 0.2s' },
                    '&:hover, &:focus-visible': { color: 'brand.gold', '& svg': { color: 'brand.gold', transform: 'translateX(3px)' } },
                    '&.active': {
                      color: 'brand.white',
                      '& span': {
                        textDecoration: 'underline',
                        textDecorationColor: theme.palette.brand.gold,
                        textDecorationThickness: 3,
                        textUnderlineOffset: '0.3em',
                      },
                    },
                  }}
                >
                  <span>{item.name}</span>
                  <ChevronRightIcon aria-hidden="true" />
                </Box>
              </Box>
            ))}
          </Box>
          <DirectCta id="mobile_menu" location="mobile_menu" fullWidth sx={{ mt: 2 }} />
        </AppContainer>
      </Box>
    </Box>
  );
};

export default MobileMenu;
