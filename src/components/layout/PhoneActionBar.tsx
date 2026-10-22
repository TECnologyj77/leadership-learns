import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import { useLocation } from 'react-router-dom';
import AppButton from '../ui/AppButton';
import DirectCta from '../marketing/DirectCta';
import { SECONDARY_CTA } from '../../lib/site-config';

// The page's own direct CTAs. The bar steps aside while one is fully on screen.
const PAGE_CTA_SELECTOR = 'main [data-direct-cta]';
// How long no page CTA must be in view before the bar returns, so scrolling
// past the short gap between two page CTAs never flashes it in and out.
const RETURN_DELAY_MS = 150;
// Kept free under the footer, so the bar never covers its last line.
const BAR_SPACE = 'calc(76px + env(safe-area-inset-bottom))';

// Phones only: keeps the direct CTA, and the other way in beside it, in thumb
// reach at the bottom of the screen, without doubling a direct CTA already on
// screen.
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
      <Box aria-hidden="true" sx={{ display: { xs: 'block', sm: 'none' }, height: BAR_SPACE, bgcolor: 'brand.navyDeep' }} />
      <Box
        inert={hidden}
        sx={[
          (theme) => theme.mixins.navySurface,
          {
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
            borderTop: 1,
            borderColor: 'onNavy.divider',
            boxShadow: '0 -8px 24px rgba(15, 27, 45, 0.18)',
            transition: 'transform 200ms ease-out, visibility 200ms',
          },
          hidden && { transform: 'translateY(100%)', visibility: 'hidden' },
        ]}
      >
        <Box sx={{ display: 'flex', gap: 1, maxWidth: 560, mx: 'auto' }}>
          <AppButton
            analytics={{ id: `action_bar_${SECONDARY_CTA.idSuffix}`, location: 'action_bar', intent: 'contact', contactMethod: SECONDARY_CTA.method }}
            variant="outlined"
            color="primary"
            href={SECONDARY_CTA.href}
            aria-label={SECONDARY_CTA.label}
            startIcon={SECONDARY_CTA.method === 'phone' ? <PhoneOutlinedIcon /> : <MailOutlinedIcon />}
            sx={{
              flexShrink: 0,
              // Just the icon on the narrowest phones, so the direct CTA's label never gets cut off.
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
            <span className="label">{SECONDARY_CTA.method === 'phone' ? 'Call' : 'Email'}</span>
          </AppButton>
          <DirectCta id="action_bar" location="action_bar" size="header" sx={{ flex: 1, px: 1.5 }} />
        </Box>
      </Box>
    </>
  );
};

export default PhoneActionBar;
