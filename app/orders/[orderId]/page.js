import OrdersView from '@/components/account/OrdersView.jsx';

export const metadata = {
  title: 'Order details'
};

/** `/orders/[orderId]` */
export default async function OrderDetailPage({ params }) {
  const { orderId } = await params;

  return <OrdersView orderId={orderId} />;
}
