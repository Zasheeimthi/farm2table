import FarmsView from '@/components/shop/FarmsView.jsx';

export const metadata = {
  title: 'Our farms',
  description: 'Meet the independent growers, dairies, fisheries and makers behind every Farm to Table basket.'
};

/** `/farms?category=…&search=…` */
export default async function FarmsPage({ searchParams }) {
  const params = await searchParams;

  return (
    <FarmsView
      search={typeof params.search === 'string' ? params.search : ''}
      category={typeof params.category === 'string' ? params.category : 'all'}
    />
  );
}
