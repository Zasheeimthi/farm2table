import { NextResponse } from 'next/server';
import { getCatalog, getProduct } from '@/lib/server/catalog';

export const dynamic = 'force-dynamic';

/** GET /api/products/:slug - one product, its farm, and sibling products. */
export async function GET(_request, { params }) {
  const { slug } = await params;
  const { product } = await getProduct(slug);

  if (!product) {
    return NextResponse.json({ message: 'Product not found', slug }, { status: 404 });
  }

  const { farmData, productData } = await getCatalog();
  const related = productData
    .filter((p) => p.farmId === product.farmId && p.title !== product.title)
    .slice(0, 4);

  return NextResponse.json({
    product,
    farm: farmData[product.farmId] ?? null,
    related
  });
}
