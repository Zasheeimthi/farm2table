import { Suspense } from 'react';
import { FarmsPage } from '@/components/farm/FarmsPage';
export const metadata = { title: 'Our farms' };
export default function Page() { return <Suspense fallback={null}><FarmsPage /></Suspense>; }
