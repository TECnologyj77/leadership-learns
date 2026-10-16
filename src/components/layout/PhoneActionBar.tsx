import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import { useLocation } from 'react-router-dom';
import AppButton from '../ui/AppButton';
import { CALL_LABEL, EMAIL_LABEL, ORG_EMAIL, ORG_PHONE_E164 } from '../../lib/site-config';

// The page's own call buttons (DirectCta, and the Contact page's). The bar
// steps aside while one is fully on screen.
const PAGE_CTA_SELECTOR = 'main a[data-cta-id][href^="tel:"]';
// How long no page CTA must be in view before the bar returns, so scrolling
// past the short gap between two page CTAs never flashes it in and out.
const RETURN_DELAY_MS = 150;
// Kept free under the footer, so the bar never covers its last line.
const BAR_SPACE = 'calc(76px + env(safe-area-inset-bottom))';

// Phones only: keeps the call button, and email beside it, in thumb reach at
// the bottom of the screen, without doubling a call button already on screen.
const PhoneActionBar: React.FC = () => {
  const { pathname } = useLocation();
  // Starts hidden, so the prerendered page never flashes a bar that hydration
  // then removes. Before JavaScript runs, the page's own buttons do the job.
  const [pageCtaInView, setPageCtaInView] = useState(true);

  useEffect(() => {
    const targets = document.querySelectorAll(PAGE_CTA_SELECTOR);
    const inView = new Set<Element>();
    let returnTimer = 0;
    // Fully on screen, not just peeking in. The bar hides at once but returns
    // only once no page CTA has been in view for RETURN_DELAY_MS.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.intersectionRatio >= 0.99) inView.add(entry.target);
          else inView.delete(entry.target);
        }
        window.clearTimeout(returnTimer);
        if (inView.size > 0) setPageCtaInView(true);
        else returnTimer = window.setTimeout(() => setPageCtaInView(false), RETURN_DELAY_MS);
      },
      { threshold: [0, 1] },
    );
    targets.forEach((target) => observer.observe(target));
    // A page without its own CTA never gets an observer callback, so show the bar now.
    if (!targets.length) returnTimer = window.setTimeout(() => setPageCtaInView(false), RETURN_DELAY_MS);
    return () => {
      observer.disconnect();
      window.clearTimeout(returnTimer);
    };
  }, [pathname]);

  const hidden = pageCtaInView;

  return (
    <>
      <Box aria-hidden="true" sx={{ display: { xs: 'block', sm: 'none' }, height: BAR_SPACE, bgcolor: 'primary.main' }} />
      <Box
        inert={hidden}
        sx={{
          display: { xs: 'block', sm: 'none' },
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 0,
          // Below the header, so the open menu's scrim covers the bar too.
          zIndex: (theme) => theme.zIndex.appBar - 1,
          px: 2,
          pt: 1.5,
          pb: 'calc(12px + env(safe-area-inset-bottom))',
          bgcolor: 'rgba(255, 255, 255, 0.94)',
          backdropFilter: 'saturate(180%) blur(12px)',
          borderTop: 1,
          borderColor: 'divider',
          boxShadow: '0 -8px 24px rgba(15, 27, 45, 0.08)',
          transition: 'transform 200ms ease-out, visibility 200ms',
          ...(hidden && { transform: 'translateY(100%)', visibility: 'hidden' }),
        }}
      >
        <Box sx={{ display: 'flex', gap: 1, maxWidth: 560, mx: 'auto' }}>
          <AppButton
            analytics={{ id: 'action_bar_email', location: 'action_bar', intent: 'contact', contactMethod: 'email' }}
            variant="outlined"
            color="primary"
            href={`mailto:${ORG_EMAIL}`}
            aria-label={EMAIL_LABEL}
            startIcon={<MailOutlinedIcon />}
            sx={{
              flexShrink: 0,
              // Just the envelope on the narrowest phones, so the call label never gets cut off.
              minWidth: 48,
              px: 1.5,
              '& .MuiButton-startIcon': { mx: 0 },
              '& .label': { display: 'none' },
              '@media (min-width: 360px)': {
                px: 1.75,
                '& .MuiButton-startIcon': { ml: -0.5, mr: 1 },
                '& .label': { display: 'inline' },
              },
            }}
          >
            <span className="label">Email</span>
          </AppButton>
          <AppButton
            analytics={{ id: 'action_bar_call', location: 'action_bar', intent: 'contact', contactMethod: 'phone' }}
            variant="contained"
            color="primary"
            href={`tel:${ORG_PHONE_E164}`}
            startIcon={<PhoneOutlinedIcon />}
            sx={{ flex: 1, px: 1.5, whiteSpace: 'nowrap' }}
          >
            {CALL_LABEL}
          </AppButton>
        </Box>
      </Box>
    </>
  );
};

export default PhoneActionBar;
