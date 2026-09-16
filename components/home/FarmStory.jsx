'use client';

import { routes } from '@/lib/routes.js';
import { useGo } from '@/hooks/useGo.js';
import CatalogImage from '@/components/common/CatalogImage.jsx';

/** "Our Farms" story block with the farm video card. */
export default function FarmStory() {
  const go = useGo();

  return (
    <section id="about" className="farm-story section-block">
      <div className="farm-heading scroll-reveal">
        <h2>Our<br />Farms</h2>
      </div>
      <div className="farm-copy scroll-reveal">
        <p>Farm to Table connects homes with growers, dairies, butchers, and fishers who care about every step from field to delivery.</p>
        <button onClick={() => go(routes.farms)}>Meet Our Farms</button>
      </div>
      <div className="video-card image-reveal">
        <CatalogImage src="/ferme/13305.jpg" alt="A family spending time together at the farm" loading="lazy" sizes="(max-width: 900px) 90vw, 560px" />
      </div>
    </section>
  );
}
