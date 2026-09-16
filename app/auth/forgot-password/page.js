import { Suspense } from 'react';
import { AuthPage } from '@/components/auth/AuthPage';
import { StorageReady } from '@/components/common/StorageReady';
export const metadata = { title: 'Reset password' };
export default function Page() { return <Suspense fallback={null}><StorageReady><AuthPage mode="forgot-password" /></StorageReady></Suspense>; }
