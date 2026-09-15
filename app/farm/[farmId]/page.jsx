import FarmPage from '@/components/market/pages/FarmPage';
import { getFarm } from '@/lib/server/catalog';

export async function generateMetadata({ params }) {
  const { farmId } = await params;
  const { farm } = await getFarm(farmId);
  if (!farm) return { title: 'Farm not found' };
  return { title: farm.name, description: `${farm.name} in ${farm.location}. ${farm.summary}` };
}

export default async function Page({ params }) {
  const { farmId } = await params;
  return <FarmPage farmId={farmId} />;
}
