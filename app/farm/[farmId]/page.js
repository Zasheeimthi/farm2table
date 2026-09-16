import { notFound } from 'next/navigation';
import { farmData } from '@/lib/catalog.js';
import { farmIds } from '@/lib/products.js';
import FarmView from '@/components/farm/FarmView.jsx';

/** Pre-render every producer page at build time. */
export function generateStaticParams() {
  return farmIds.map((farmId) => ({ farmId }));
}

/** Unknown slugs fall through to the shared 404 page instead of being generated on demand. */
export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { farmId } = await params;
  const farm = farmData[farmId];

  if (!farm) return { title: 'Farm not found' };

  return {
    title: farm.name,
    description: farm.summary
  };
}

/** `/farm/[farmId]` */
export default async function FarmPage({ params }) {
  const { farmId } = await params;
  const farm = farmData[farmId];

  if (!farm) notFound();

  return <FarmView farmId={farmId} farm={farm} />;
}
