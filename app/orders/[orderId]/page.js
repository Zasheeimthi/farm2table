import { OrdersPage } from '@/components/account/OrdersPage';
import { StorageReady } from '@/components/common/StorageReady';
export const metadata = { title: 'Order details' };
export default async function Page({ params }) {
  const { orderId } = await params;
  return <StorageReady><OrdersPage key={orderId} orderId={orderId} /></StorageReady>;
}
