import ConfirmationView from '@/components/checkout/ConfirmationView.jsx';

export const metadata = {
  title: 'Order confirmed'
};

/** `/confirmation?order=HEA-…` */
export default async function ConfirmationPage({ searchParams }) {
  const params = await searchParams;

  return <ConfirmationView orderId={typeof params.order === 'string' ? params.order : ''} />;
}
