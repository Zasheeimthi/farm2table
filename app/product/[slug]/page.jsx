import ProductDetailsPage from '@/components/market/pages/ProductDetailsPage';
import { getProduct } from '@/lib/server/catalog';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { product } = await getProduct(slug);
  if (!product) return { title: 'Product not found' };
  return {
    title: product.title,
    description: `${product.title} for ${product.price}. Fresh from a local farm, delivered with care.`
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  return <ProductDetailsPage slug={slug} />;
}
