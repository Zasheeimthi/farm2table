export const metadata = { title: 'Our farms', description: 'Meet independent growers, dairies and fisheries across Sweden - shop each producer’s harvest.' };

import { Suspense } from 'react';
import FarmsPage from '@/components/market/pages/FarmsPage';

export default function Page() {
  return (
    <Suspense fallback={<p role="status" className="page-view-loading">Loading…</p>}>
      <FarmsPage />
    </Suspense>
  );
}
