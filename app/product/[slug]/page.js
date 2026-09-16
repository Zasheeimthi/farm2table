import { notFound } from 'next/navigation';
import { farmData, productData } from '@/lib/catalog.js';
import { findProduct, productSlug } from '@/lib/products.js';
import ProductDetailView from '@/components/product/ProductDetailView.jsx';

/** Pre-render every catalogue product at build time. */
export function generateStaticParams() {
  return productData.map((product) => ({ slug: productSlug(product) }));
}

/** Unknown slugs fall through to the shared 404 page instead of being generated on demand. */
export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = findProduct(slug);

  if (!product) return { title: 'Product not found' };

  return {
    title: product.title,
    description: `${product.title} from ${product.price} — delivered from a named Farm to Table producer.`
  };
}

/** `/product/[slug]` */
export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = findProduct(slug);

  if (!product) notFound();

  const farm = farmData[product.farmId];

  return <ProductDetailView product={product} farm={farm} />;
}
