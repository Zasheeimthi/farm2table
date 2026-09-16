import ProductsView from '@/components/shop/ProductsView.jsx';

export const metadata = {
  title: 'Shop products',
  description: 'Shop the weekly harvest, everyday staples and pantry goods from trusted local producers.'
};

/** `/products?category=…&farm=…&search=…` */
export default async function ProductsPage({ searchParams }) {
  const params = await searchParams;

  return (
    <ProductsView
      search={typeof params.search === 'string' ? params.search : ''}
      category={typeof params.category === 'string' ? params.category : 'all'}
      farm={typeof params.farm === 'string' ? params.farm : 'all'}
    />
  );
}
