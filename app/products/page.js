import { Suspense } from 'react';
import { ProductsPage } from '@/components/shop/ProductsPage';
export const metadata = { title: 'Products' };
export default function Page() { return <Suspense fallback={null}><ProductsPage /></Suspense>; }
