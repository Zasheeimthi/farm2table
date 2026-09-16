'use client';

import { useEffect, useLayoutEffect, useState } from 'react';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

function readStore(key, fallback, session) {
  try {
    const storage = session ? window.sessionStorage : window.localStorage;
    const raw = storage.getItem(`farmtable:${key}`);
    return raw === null ? fallback : JSON.parse(raw) ?? fallback;
  } catch {
    return fallback;
  }
}

/**
 * Storage-backed state that is safe to server render.
 *
 * The server (and the first client render) always uses `fallback`, then the
 * persisted value is adopted before the browser paints (layout effect). That
 * keeps hydration markup stable while still restoring the basket, saved items,
 * delivery location and session orders.
 */
export function useStored(key, fallback, session = false) {
  const [value, setValue] = useState(fallback);
  const [hydrated, setHydrated] = useState(false);

  useIsomorphicLayoutEffect(() => {
    setValue(readStore(key, fallback, session));
    setHydrated(true);
  }, [key, session]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      const storage = session ? window.sessionStorage : window.localStorage;
      storage.setItem(`farmtable:${key}`, JSON.stringify(value));
    } catch {
      /* The basket stays usable when browser storage is unavailable. */
    }
  }, [key, value, session, hydrated]);

  return [value, setValue, hydrated];
}
