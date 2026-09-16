'use client';

import { useMarket } from '@/context/MarketContext.jsx';
import { useStorefront } from '@/context/StorefrontContext.jsx';
import CarePanel from './CarePanel.jsx';
import CategoryDiscovery from './CategoryDiscovery.jsx';
import FarmStory from './FarmStory.jsx';
import FaqSection from './FaqSection.jsx';
import FeaturedFarms from './FeaturedFarms.jsx';
import FeaturedProducts from './FeaturedProducts.jsx';
import HeroSection from './HeroSection.jsx';
import ReviewsSection from './ReviewsSection.jsx';
import ShoppingJourney from './ShoppingJourney.jsx';
import VisitSection from './VisitSection.jsx';
import WhyChooseSection from './WhyChooseSection.jsx';

/** Home page composition — same sections, same order as the original storefront. */
export default function HomeView({ products }) {
  const market = useMarket();
  const { activeCategory, setActiveCategory } = useStorefront();

  return (
    <main>
      <HeroSection />
      <CategoryDiscovery />
      <FeaturedFarms />
      <section className="market-flow section-block wide">
        <WhyChooseSection />
        <ShoppingJourney />
      </section>
      <FeaturedProducts
        products={products}
        activeCategory={activeCategory}
        onChange={setActiveCategory}
        onAdd={market.add}
      />
      <FarmStory />
      <CarePanel />
      <VisitSection />
      <ReviewsSection />
      <FaqSection />
    </main>
  );
}
