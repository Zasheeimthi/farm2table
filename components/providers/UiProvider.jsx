'use client';

import React, { createContext, useContext, useMemo, useState } from 'react';

const UiContext = createContext(null);

export const useUi = () => useContext(UiContext);

/**
 * Small slice of cross-page UI state.
 *
 * The category filter on the home page is reset when the header brand or the
 * main nav is used - behaviour that used to live in the single-page App
 * component and is now shared between Header and HomePage.
 */
export function UiProvider({ children }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const value = useMemo(
    () => ({ activeCategory, setActiveCategory }),
    [activeCategory]
  );

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
}
