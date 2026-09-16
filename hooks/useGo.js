'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

/** Drop-in replacement for the old hash-router `go(path)` helper. */
export function useGo() {
  const router = useRouter();
  return useCallback((path, options) => router.push(path, options), [router]);
}
