import { Suspense } from 'react';
import AuthPage from '@/components/market/pages/AuthPage';

export const metadata = { title: 'Forgot password' };

export default function Page() {
  return (
    <Suspense fallback={<p role="status" className="page-view-loading">Loading…</p>}>
      <AuthPage mode="forgot-password" />
    </Suspense>
  );
}
