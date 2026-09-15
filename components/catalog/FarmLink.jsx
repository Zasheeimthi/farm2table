'use client';

import React from 'react';
import { useGo } from '@/lib/navigation';
import { useCatalog } from '@/components/providers/CatalogProvider';

export default function FarmLink({ farmId }) {
  const go = useGo();
  const { farmData, productData, categoryTabs } = useCatalog();

  const farm = farmData[farmId];
  return (
    <button className="farm-link" onClick={() => go(`/farm/${farmId}`)}>
      {farm.name}
    </button>
  );
}
