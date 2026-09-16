'use client';

import { useEffect, useState } from 'react';

/** Tracks whether the storefront header should switch to its compact state. */
export function useIsScrolled(threshold = 24) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const syncScroll = () => setIsScrolled(window.scrollY > threshold);
    syncScroll();
    window.addEventListener('scroll', syncScroll, { passive: true });
    return () => window.removeEventListener('scroll', syncScroll);
  }, [threshold]);

  return isScrolled;
}
