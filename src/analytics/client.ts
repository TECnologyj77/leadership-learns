import { getAnalyticsConfig } from './config';

type AnalyticsClient = (typeof import('posthog-js'))['default'];

let client: AnalyticsClient | null = null;
let initializationStarted = false;

export const initializeAnalytics = (): void => {
  if (initializationStarted) {
    return;
  }

  const config = getAnalyticsConfig();

  if (!config) {
    return;
  }

  initializationStarted = true;

  void import('posthog-js')
    .then(({ default: posthog }) => {
      posthog.init(config.projectToken, {
        api_host: config.host,
        autocapture: false,
        capture_pageview: 'history_change',
        capture_pageleave: false,
        capture_dead_clicks: false,
        capture_exceptions: false,
        capture_heatmaps: false,
        capture_performance: false,
        disable_session_recording: true,
        person_profiles: 'never',
        persistence: 'memory',
        advanced_disable_flags: true,
        disable_surveys: true,
        debug: false,
      });

      client = posthog;
    })
    .catch(() => {
      initializationStarted = false;
    });
};

export const captureAnalyticsEvent = (
  eventName: string,
  properties?: Record<string, string>,
): void => {
  if (!client) {
    return;
  }

  client.capture(eventName, properties);
};
