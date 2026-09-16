import { Suspense } from 'react';
import { AuthPage } from '@/components/auth/AuthPage';
import { StorageReady } from '@/components/common/StorageReady';
export const metadata = { title: 'Sign in' };
export default function Page() { return <Suspense fallback={null}><StorageReady><AuthPage mode="login" /></StorageReady></Suspense>; }
