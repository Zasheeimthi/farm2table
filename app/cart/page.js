import { StorageReady } from '@/components/common/StorageReady';
import { CartPage } from '@/components/cart/CartPage';
export const metadata = { title: 'Your basket' };
export default function Page() { return <StorageReady><CartPage /></StorageReady>; }
