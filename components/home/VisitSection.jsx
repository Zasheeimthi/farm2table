'use client';

import { ArrowRightOutlined, CompassOutlined, HeartOutlined, ShoppingOutlined } from '@ant-design/icons';
import { routes } from '@/lib/routes.js';
import { useGo } from '@/hooks/useGo.js';
import CatalogImage from '@/components/common/CatalogImage.jsx';

/** "Visit with kids" section with the family activity cards. */
export default function VisitSection() {
  const go = useGo();

  return (
    <section className="visit-section section-block">
      <div className="visit-image image-reveal">
        <CatalogImage src="/ferme/13305.jpg" alt="Family visiting a farm garden" sizes="(max-width: 900px) 90vw, 520px" />
      </div>
      <div className="visit-copy family-visit scroll-reveal">
        <span className="family-visit-kicker">Little adventures. Lasting memories.</span>
        <h2>Visit with kids<span>.</span></h2>
        <p>Discover family visits with our farm partners. Contact us to ask about farm walks, meeting growers, and spending a day close to nature.</p>
        <div className="family-activities">
          <article><span aria-hidden="true"><CompassOutlined /></span><h3>Guided walks</h3><p>Meet growers and see the fields.</p></article>
          <article><span aria-hidden="true"><ShoppingOutlined /></span><h3>Mini harvest</h3><p>Pick seasonal greens with our team.</p></article>
          <article><span aria-hidden="true"><HeartOutlined /></span><h3>Animal care</h3><p>Learn gentle farm routines up close.</p></article>
        </div>
        <div className="family-visit-actions">
          <button type="button" onClick={() => go(routes.contact)}>Plan your visit <ArrowRightOutlined /></button>
        </div>
      </div>
      <div className="visit-small image-reveal">
        <CatalogImage src="/photography/pasture.jpg" alt="Cows grazing in a sunny pasture" loading="lazy" sizes="250px" />
      </div>
    </section>
  );
}
