export interface AnalyticsConfig {
  projectToken: string;
  host: string;
}

export const getAnalyticsConfig = (): AnalyticsConfig | null => {
  if (!import.meta.env.PROD || import.meta.env.VITE_POSTHOG_ENABLED !== 'true') {
    return null;
  }

  if (typeof window === 'undefined') {
    return null;
  }

  const projectToken = import.meta.env.VITE_POSTHOG_PROJECT_TOKEN?.trim();
  const host = import.meta.env.VITE_POSTHOG_HOST?.trim();
  const allowedHost = import.meta.env.VITE_POSTHOG_ALLOWED_HOST;

  if (!projectToken || !host || !allowedHost) {
    return null;
  }

  if (window.location.hostname !== allowedHost) {
    return null;
  }

  return { projectToken, host };
};
