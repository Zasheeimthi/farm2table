import { Suspense } from 'react';
import { AuthPage } from '@/components/auth/AuthPage';
import { StorageReady } from '@/components/common/StorageReady';
export const metadata = { title: 'Create account' };
export default function Page() { return <Suspense fallback={null}><StorageReady><AuthPage mode="register" /></StorageReady></Suspense>; }
