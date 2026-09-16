'use client';

import Link from 'next/link';
import { ArrowRightOutlined, EnvironmentOutlined, HomeOutlined } from '@ant-design/icons';
import { categoryLabel, farmData, productData } from '@/lib/catalog.js';
import { farmPath } from '@/lib/products.js';
import SaveButton from '@/components/common/SaveButton.jsx';
import CatalogImage from '@/components/common/CatalogImage.jsx';

/** Producer card used by the farms directory, the home page and saved items. */
export default function FarmCard({ id }) {
  const farm = farmData[id];
  const products = productData.filter((product) => product.farmId === id);
  const categories = [...new Set(products.map((product) => product.category))];
  const href = farmPath(id);

  return (
    <article className="market-farm-card">
      <div className="market-farm-image">
        <Link href={href}><CatalogImage src={farm.image} alt={farm.name} sizes="(max-width: 720px) 90vw, 380px" /></Link>
        <span className="market-farm-badge"><HomeOutlined /> {id === 'farmtable' ? 'Partner collection' : 'Meet the producer'}</span>
        <SaveButton id={`farm:${id}`} label={farm.name} />
      </div>
      <div className="market-farm-copy">
        <span className="market-kicker"><EnvironmentOutlined /> {farm.location}</span>
        <h2><Link href={href}>{farm.name}</Link></h2>
        <p>{farm.summary}</p>
        <div className="market-farm-actions">
          <div className="market-tags">
            {categories.slice(0, 2).map((category) => <span key={category}>{categoryLabel(category)}</span>)}
          </div>
          <Link className="market-farm-bottom" href={href} aria-label={`Shop ${farm.name}`}>
            <span>Shop farm <ArrowRightOutlined /></span>
          </Link>
        </div>
      </div>
    </article>
  );
}
