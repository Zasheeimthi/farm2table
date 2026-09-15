'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Browser-storage backed state.
 *
 * The Vite version read localStorage during the initial render, which would
 * desync server HTML from the first client render. Here the state starts from
 * the fallback, hydrates from storage in an effect, and writes back only after
 * hydration - so SSR output stays stable and the basket still survives reloads.
 */
export function useStored(key, fallback, session = false) {
  const storage = () => (session ? sessionStorage : localStorage);

  const [value, setValue] = useState(fallback);
  const hydrated = useRef(false);

  useEffect(() => {
    hydrated.current = true;
    try {
      const raw = storage().getItem(`farmtable:${key}`);
      if (raw != null) setValue(JSON.parse(raw));
    } catch {
      /* Ignore malformed or unavailable storage - the app stays usable. */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, session]);

  const update = useCallback(
    (next) => {
      setValue((current) => {
        const resolved = typeof next === 'function' ? next(current) : next;
        try {
          storage().setItem(`farmtable:${key}`, JSON.stringify(resolved));
        } catch {
          /* The basket remains usable when browser storage is unavailable. */
        }
        return resolved;
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [key, session]
  );

  return [value, update, hydrated];
}

export function readStore(key, fallback, session = false) {
  try {
    const store = session ? sessionStorage : localStorage;
    return JSON.parse(store.getItem(`farmtable:${key}`)) ?? fallback;
  } catch {
    return fallback;
  }
}
