export const metadata = { title: 'Order confirmed' };

import { Suspense } from 'react';
import ConfirmationPage from '@/components/market/pages/ConfirmationPage';

export default function Page() {
  return (
    <Suspense fallback={<p role="status" className="page-view-loading">Loading…</p>}>
      <ConfirmationPage />
    </Suspense>
  );
}
