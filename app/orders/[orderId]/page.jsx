import OrdersPage from '@/components/market/pages/OrdersPage';

export default async function Page({ params }) {
  const { orderId } = await params;
  return <OrdersPage orderId={orderId} />;
}
