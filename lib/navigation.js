'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Navigation helper. Replaces the hash-based `setRoute`/`go` from the Vite app.
 * Returns a stable callback so it can be used inside effects and event handlers.
 */
export function useGo() {
  const router = useRouter();
  return useCallback(
    (path, options) => {
      if (!path) return;
      if (options?.replace) router.replace(path);
      else router.push(path);
    },
    [router]
  );
}

export { productPath } from '@/lib/market-model';
