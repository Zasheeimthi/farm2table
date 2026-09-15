'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { farmData as seedFarms, productData as seedProducts, categoryTabs as seedCategories } from '@/lib/catalog';

const CatalogContext = createContext(null);

export const useCatalog = () => useContext(CatalogContext);

/**
 * Supplies the catalog to every component.
 *
 * The server (app/layout.jsx) fetches the catalog and passes it in as
 * `initialData`, so the first HTML paint already contains real products and
 * farms - no loading spinner, and search engines see the content.
 *
 * When the data came from a live backend, the client re-fetches through
 * /api/catalog on mount so the storefront picks up price or stock changes
 * without a full reload.
 */
export default function CatalogProvider({ initialData, children }) {
  const [catalog, setCatalog] = useState(initialData ?? null);
  const [source, setSource] = useState(initialData?.source ?? 'seed');

  const refresh = useCallback(async () => {
    try {
      const response = await fetch('/api/catalog', { cache: 'no-store' });
      if (!response.ok) return;
      const next = await response.json();
      if (next?.farmData && next?.productData) {
        setCatalog(next);
        setSource(next.source ?? 'api');
      }
    } catch {
      /* Keep whatever we already have - the storefront stays browsable. */
    }
  }, []);

  useEffect(() => {
    if (initialData?.source === 'api') refresh();
  }, [initialData?.source, refresh]);

  const value = useMemo(() => {
    const farmData = catalog?.farmData ?? seedFarms;
    const productData = catalog?.productData ?? seedProducts;
    const categoryTabs = catalog?.categoryTabs ?? seedCategories;
    return {
      farmData,
      productData,
      categoryTabs,
      source,
      refresh,
      productsByFarm: (farmId) => productData.filter((p) => p.farmId === farmId)
    };
  }, [catalog, source, refresh]);

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}
