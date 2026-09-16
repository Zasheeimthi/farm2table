import { productData } from '@/lib/catalog.js';
import HomeView from '@/components/home/HomeView.jsx';

/** Home page — catalogue data is handed to the interactive home view. */
export default function HomePage() {
  return <HomeView products={productData} />;
}
