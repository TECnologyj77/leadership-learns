import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageview } from '../../lib/analytics';

export default function RouteAnalytics() {
  const { pathname } = useLocation();
  const previousPath = useRef<string | null>(null);
  useEffect(() => {
    // StrictMode re-runs effects; query/hash changes aren't new pages.
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;
    trackPageview(pathname);
  }, [pathname]);
  return null;
}
