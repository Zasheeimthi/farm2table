import { CheckCircleOutlined, CompassOutlined, HomeOutlined, TagOutlined } from '@ant-design/icons';
import { marketplaceBenefits } from '@/constants/content.js';
import CatalogImage from '@/components/common/CatalogImage.jsx';

const benefitIcons = [<HomeOutlined key="home" />, <TagOutlined key="tag" />, <CheckCircleOutlined key="check" />, <CompassOutlined key="compass" />];

/** "Why Choose Farm to Table?" panel with the trust benefits. */
export default function WhyChooseSection() {
  return (
    <div className="why-panel scroll-reveal">
      <div className="why-image">
        <CatalogImage src="/storefront/585.jpg" alt="Farmer holding fresh greens and milk from the farm" sizes="(max-width: 900px) 90vw, 460px" />
      </div>
      <div className="why-copy">
        <span className="eyebrow">Local roots. Clean delivery.</span>
        <h2>Why Choose Farm to Table?</h2>
        <p>We bring you the best from local farms. Pure, fresh and healthy products for your family.</p>
        <div className="why-benefits">
          {marketplaceBenefits.map((benefit, index) => (
            <article key={benefit.title}>
              <span>{benefitIcons[index]}</span>
              <strong>{benefit.title}</strong>
              <small>{benefit.text}</small>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
