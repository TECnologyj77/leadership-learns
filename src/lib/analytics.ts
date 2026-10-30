type PostHogClient = typeof import('posthog-js').default;

export interface CtaTracking {
  id: string;
  location: string;
  intent: 'contact' | 'corporate' | 'individual' | 'about' | 'blog';
  contactMethod?: 'phone' | 'email';
}

const productionHosts = ['leadershiplearners.com', 'www.leadershiplearners.com', 'leadership-learners.netlify.app'];
let initialized = false;
let loading = false;
let posthog: PostHogClient | null = null;
let pageviewCaptured = false;

export function initializeAnalytics() {
  const key = import.meta.env.VITE_POSTHOG_PROJECT_TOKEN || import.meta.env.VITE_POSTHOG_KEY;
  const enabled = import.meta.env.VITE_POSTHOG_ENABLED;
  // Dashboards filter on this label, so only a production build on a live host is 'production'.
  const environment = import.meta.env.DEV
    ? 'development'
    : productionHosts.includes(window.location.hostname) ? 'production' : 'preview';
  if (initialized || loading || !key || enabled === 'false' || (enabled !== 'true' && environment !== 'production')) return;
  loading = true;
  void import('posthog-js').then(({ default: client }) => {
    client.init(key, {
      api_host: import.meta.env.VITE_POSTHOG_HOST ,
      ui_host: import.meta.env.VITE_POSTHOG_HOST,
      autocapture: true,
      capture_pageview: true,
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
    // Runs before the first automatic pageview, so every event carries the label.
    loaded: (instance) => {
      instance.register({ site: 'leadership_learners', environment });
    },
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
    posthog = client;
    initialized = true;
    loading = false;
    if (!pageviewCaptured) trackPageview(window.location.pathname);
  }).catch(() => {
    loading = false;
  });
}

export function trackPageview(pathname: string) {
  if (!initialized || !posthog) return;
  posthog.capture('$pageview', { $current_url: `${window.location.origin}${pathname}`, page_path: pathname });
  if (pathname === '/contact') posthog.capture('contact_page_viewed', { page_path: pathname });
  pageviewCaptured = true;
}

export function trackCta(cta: CtaTracking) {
  if (!initialized || !posthog) return;
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
