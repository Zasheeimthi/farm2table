'use client';

import { createContext, useContext, useMemo, useState } from 'react';

const StorefrontContext = createContext(null);

export const useStorefront = () => useContext(StorefrontContext);

/**
 * The home page category selection is shared with the header (the logo and the
 * "Home"/"Products" nav entries reset it), exactly as the pre-migration
 * single-page shell did.
 */
export function StorefrontProvider({ children }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const value = useMemo(() => ({ activeCategory, setActiveCategory }), [activeCategory]);

  return <StorefrontContext.Provider value={value}>{children}</StorefrontContext.Provider>;
}
