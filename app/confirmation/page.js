import { Suspense } from 'react';
import { StorageReady } from '@/components/common/StorageReady';
import { ConfirmationPage } from '@/components/checkout/ConfirmationPage';
export const metadata = { title: 'Order confirmation' };
export default function Page() { return <Suspense fallback={null}><StorageReady><ConfirmationPage /></StorageReady></Suspense>; }
