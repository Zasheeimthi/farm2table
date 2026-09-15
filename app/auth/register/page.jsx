import { Suspense } from 'react';
import AuthPage from '@/components/market/pages/AuthPage';

export const metadata = { title: 'Create account' };

export default function Page() {
  return (
    <Suspense fallback={<p role="status" className="page-view-loading">Loading…</p>}>
      <AuthPage mode="register" />
    </Suspense>
  );
}
