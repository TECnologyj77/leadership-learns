import posthog from 'posthog-js';

export interface CtaTracking {
  id: string;
  location: string;
  intent: 'contact' | 'corporate' | 'individual' | 'about' | 'blog';
  contactMethod?: 'phone' | 'email';
}

const productionHosts = ['leadershiplearners.com', 'www.leadershiplearners.com'];
let initialized = false;

export function initializeAnalytics() {
  const key = import.meta.env.VITE_POSTHOG_KEY;
  const enabled = import.meta.env.VITE_POSTHOG_ENABLED;
  const isProductionSite = import.meta.env.PROD && productionHosts.includes(window.location.hostname);
  if (initialized || !key || enabled === 'false' || (enabled !== 'true' && !isProductionSite)) return;

  posthog.init(key, {
    api_host: import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com',
    ui_host: 'https://us.posthog.com',
    autocapture: false,
    capture_pageview: false,
    capture_pageleave: true,
    person_profiles: 'identified_only',
    disable_session_recording: false,
    session_recording: {
      maskAllInputs: true,
      maskTextSelector: '.ph-mask',
      blockSelector: '.ph-no-capture',
      recordHeaders: false,
      recordBody: false,
      recordCrossOriginIframes: false,
    },
    capture_exceptions: true,
    before_send: (event) => {
      // Keep attribution from the SDK, but strip query strings and fragments
      // from URLs so future contact-form or campaign links cannot leak values.
      if (event?.properties) {
        for (const name of ['$current_url', '$referrer', '$initial_current_url', '$initial_referrer']) {
          const value = event.properties[name];
          if (typeof value !== 'string') continue;
          try {
            const url = new URL(value);
            event.properties[name] = `${url.origin}${url.pathname}`;
          } catch {
            delete event.properties[name];
          }
        }
      }
      return event;
    },
  });
  posthog.register({
    site: 'leadership_learners',
    environment: isProductionSite ? 'production' : import.meta.env.DEV ? 'development' : 'preview',
  });
  initialized = true;
}

export function trackPageview(pathname: string) {
  if (!initialized) return;
  posthog.capture('$pageview', { $current_url: `${window.location.origin}${pathname}`, page_path: pathname });
  if (pathname === '/contact') posthog.capture('contact_page_viewed', { page_path: pathname });
}

export function trackCta(cta: CtaTracking) {
  if (!initialized) return;
  const properties = {
    cta_id: cta.id,
    cta_location: cta.location,
    cta_intent: cta.intent,
    page_path: window.location.pathname,
  };
  // Analytics must never prevent a link from opening or a menu from closing.
  try {
    posthog.capture('cta_clicked', properties);
    if (cta.contactMethod) {
      posthog.capture('contact_attempted', {
        ...properties,
        contact_method: cta.contactMethod,
      }, { send_instantly: true, transport: 'sendBeacon' });
    }
  } catch {
    // A blocked analytics endpoint does not change the visitor's action.
  }
}
