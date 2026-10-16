import { useEffect, useState } from 'react';

// Scrolled less than this from the top, the header always shows.
const ALWAYS_SHOW_ABOVE = 80;
// Ignore smaller movements, so a jittery thumb doesn't flicker the header.
const TOLERANCE = 10;

// True while the visitor reads down the page, false as soon as they scroll
// back up. Always false while `wideQuery` matches (no hiding on wide screens).
export function useHideOnScroll(wideQuery: string): boolean {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia(wideQuery);
    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      // Clamp iOS's rubber-band overscroll, which would otherwise read as scrolling back up.
      const maxY = document.documentElement.scrollHeight - window.innerHeight;
      const y = Math.min(Math.max(window.scrollY, 0), maxY);
      if (wide.matches || y < ALWAYS_SHOW_ABOVE) {
        setHidden(false);
        lastY = y;
        return;
      }
      if (Math.abs(y - lastY) < TOLERANCE) return;
      setHidden(y > lastY);
      lastY = y;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    wide.addEventListener('change', update);
    return () => {
      window.removeEventListener('scroll', onScroll);
      wide.removeEventListener('change', update);
      cancelAnimationFrame(frame);
    };
  }, [wideQuery]);

  return hidden;
}
