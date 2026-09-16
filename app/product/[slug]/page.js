import { notFound } from 'next/navigation';
import { ProductDetailsPage } from '@/components/product/ProductDetailsPage';
import { farmData, productData } from '@/lib/catalog';
import { slugify } from '@/lib/market-model';
export function generateStaticParams() { return productData.map(p => ({ slug: slugify(p.title) })); }
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = productData.find(p => slugify(p.title) === slug);
  return { title: item?.title || 'Not found' };
}
export default async function Page({ params }) {
  const { slug } = await params;
  if (!(productData.find(p => slugify(p.title) === slug))) notFound();
  return <ProductDetailsPage key={slug} slug={slug} />;
}
