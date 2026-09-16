import { StorageReady } from '@/components/common/StorageReady';
import { SavedPage } from '@/components/account/SavedPage';
export const metadata = { title: 'Saved favourites' };
export default function Page() { return <StorageReady><SavedPage /></StorageReady>; }
