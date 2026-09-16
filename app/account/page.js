import { StorageReady } from '@/components/common/StorageReady';
import { AccountPage } from '@/components/account/AccountPage';
export const metadata = { title: 'Your account' };
export default function Page() { return <StorageReady><AccountPage /></StorageReady>; }
