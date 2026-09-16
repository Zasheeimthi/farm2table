import { StorageReady } from '@/components/common/StorageReady';
import { OrdersPage } from '@/components/account/OrdersPage';
export const metadata = { title: 'Your orders' };
export default function Page() { return <StorageReady><OrdersPage /></StorageReady>; }
