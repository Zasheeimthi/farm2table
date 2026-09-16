import { notFound } from 'next/navigation';
import { FarmPage } from '@/components/farm/FarmPage';
import { farmData, productData } from '@/lib/catalog';
import { slugify } from '@/lib/market-model';
export function generateStaticParams() { return Object.keys(farmData).map(slug => ({ slug })); }
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = farmData[slug];
  return { title: item?.name || 'Not found' };
}
export default async function Page({ params }) {
  const { slug } = await params;
  if (!(farmData[slug])) notFound();
  return <FarmPage key={slug} farmId={slug} />;
}
