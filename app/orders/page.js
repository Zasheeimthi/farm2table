import OrdersView from '@/components/account/OrdersView.jsx';

export const metadata = {
  title: 'My orders'
};

/** `/orders` */
export default function OrdersPage() {
  return <OrdersView />;
}
