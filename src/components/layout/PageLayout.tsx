import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const { pathname } = useLocation();

  // A CTA clicked at the bottom of a long page should land at the top of the
  // next page, not halfway down it.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box
        component="a"
        href="#main-content"
        sx={{
          position: 'fixed',
          left: 16,
          top: -80,
          zIndex: 'tooltip',
          px: 2,
          py: 1.5,
          borderRadius: 1,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          textDecoration: 'none',
          fontWeight: 600,
          transition: 'top 0.2s',
          '&:focus': { top: 16 },
        }}
      >
        Skip to main content
      </Box>
      <Navbar />
      <Box component="main" id="main-content" tabIndex={-1} sx={{ flexGrow: 1, outline: 'none' }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default PageLayout;
