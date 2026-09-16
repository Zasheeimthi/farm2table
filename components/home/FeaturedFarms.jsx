import Link from 'next/link';
import { ArrowRightOutlined } from '@ant-design/icons';
import { routes } from '@/lib/routes.js';
import FarmCard from '@/components/farm/FarmCard.jsx';

const featuredFarmIds = ['solmarka', 'hagshult', 'bjare'];

/** Home page strip that introduces three producers. */
export default function FeaturedFarms() {
  return (
    <section className="market-featured section-block wide">
      <div className="market-section-heading">
        <div>
          <span className="eyebrow">Many farms. One fresh basket.</span>
          <h2>Meet your producers.</h2>
          <p>Good food has a story. Get to know the people behind yours.</p>
        </div>
        <Link className="market-link" href={routes.farms}>Explore all farms <ArrowRightOutlined /></Link>
      </div>
      <div className="market-farm-grid">
        {featuredFarmIds.map((id) => <FarmCard id={id} key={id} />)}
      </div>
    </section>
  );
}
