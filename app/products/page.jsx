export const metadata = { title: 'All products', description: 'Discover the weekly harvest, everyday staples and something a little special from our producers.' };

import { Suspense } from 'react';
import ProductsPage from '@/components/market/pages/ProductsPage';

export default function Page() {
  return (
    <Suspense fallback={<p role="status" className="page-view-loading">Loading…</p>}>
      <ProductsPage />
    </Suspense>
  );
}
