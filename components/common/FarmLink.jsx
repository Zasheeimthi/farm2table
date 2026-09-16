'use client';

import { useGo } from '@/hooks/useGo.js';
import { farmData } from '@/lib/catalog.js';
import { farmPath } from '@/lib/products.js';

/** Farm credit button shown inside storefront product cards. */
export default function FarmLink({ farmId }) {
  const go = useGo();
  const farm = farmData[farmId];

  return (
    <button className="farm-link" onClick={() => go(farmPath(farmId))}>
      {farm.name}
    </button>
  );
}
