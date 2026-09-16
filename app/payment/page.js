import { StorageReady } from '@/components/common/StorageReady';
import { PaymentPage } from '@/components/checkout/PaymentPage';
export const metadata = { title: 'Payment' };
export default function Page() { return <StorageReady><PaymentPage /></StorageReady>; }
