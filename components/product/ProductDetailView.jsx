'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRightOutlined, EnvironmentOutlined, HeartOutlined, HomeOutlined, ShoppingCartOutlined, TruckOutlined } from '@ant-design/icons';
import { categoryLabel } from '@/lib/catalog.js';
import { packPrice } from '@/lib/market-model.js';
import { relatedProducts } from '@/lib/products.js';
import { routes } from '@/lib/routes.js';
import { money } from '@/utils/format.js';
import { useMarket } from '@/context/MarketContext.jsx';
import Page from '@/components/common/Page.jsx';
import Breadcrumb from '@/components/common/Breadcrumb.jsx';
import QuantityStepper from '@/components/common/QuantityStepper.jsx';
import CatalogImage from '@/components/common/CatalogImage.jsx';
import MarketProductCard from './MarketProductCard.jsx';

const packs = [
  { value: 'single', title: 'Single pack', note: 'Just what you need' },
  { value: 'family', title: '3-pack bundle', note: 'Save 10% on three packs' }
];

/** Product page (`/product/[slug]`). Product and farm are resolved on the server. */
export default function ProductDetailView({ product, farm }) {
  const market = useMarket();
  const [quantity, setQuantity] = useState(1);
  const [pack, setPack] = useState('single');
  const [photo, setPhoto] = useState(0);

  const photos = [{ src: product.image, label: product.title }, { src: farm.image, label: `Meet ${farm.name}` }];
  const total = packPrice(product, pack) * quantity;
  const related = relatedProducts(product);

  return (
    <Page className="market-detail">
      <div className="market-container">
        <Breadcrumb items={[['Farms', routes.farms], [farm.name, routes.farm(product.farmId)], [product.title]]} />
        <div className="market-detail-grid">
          <div className="market-gallery">
            <div className={`market-main-photo ${photo === 1 ? 'is-farm' : ''}`}>
              <CatalogImage src={photos[photo].src} alt={photos[photo].label} sizes="(max-width: 900px) 90vw, 520px" />
              {product.tag && <span className="market-product-tag">{product.tag}</span>}
            </div>
            <div className="market-thumbnails">
              {photos.map((item, index) => (
                <button
                  key={item.src}
                  className={photo === index ? 'selected' : ''}
                  onClick={() => setPhoto(index)}
                  aria-label={`Show ${item.label}`}
                  aria-pressed={photo === index}
                >
                  <CatalogImage src={item.src} alt="" sizes="46px" />
                  <span>{index === 0 ? 'The product' : 'The producer'}</span>
                </button>
              ))}
            </div>
            <div className="market-assurances">
              <span><HomeOutlined /> Named producer</span>
              <span><TruckOutlined /> Carefully packed</span>
              <span><HeartOutlined /> Made with care</span>
            </div>
          </div>
          <article className="market-detail-copy">
            <span className="market-kicker">{categoryLabel(product.category)}</span>
            <h1>{product.title}</h1>
            <Link className="market-origin" href={routes.farm(product.farmId)}>
              <CatalogImage src={farm.image} alt="" sizes="46px" />
              <span>
                <small>Fresh from</small>
                <strong>{farm.name}</strong>
                <small><EnvironmentOutlined /> {farm.location}</small>
              </span>
              <ArrowRightOutlined />
            </Link>
            <p>{farm.summary}</p>
            <div className="market-detail-price">
              <strong>{money(packPrice(product, pack))}</strong>
              <span>per {pack === 'family' ? '3-pack bundle' : 'pack'}</span>
            </div>
            <fieldset className="market-pack-options">
              <legend>Choose your pack</legend>
              {packs.map((option) => (
                <label key={option.value} className={pack === option.value ? 'selected' : ''}>
                  <input type="radio" name="pack" value={option.value} checked={pack === option.value} onChange={() => setPack(option.value)} />
                  <span><strong>{option.title}</strong><small>{option.note}</small></span>
                  <b>{money(packPrice(product, option.value))}</b>
                </label>
              ))}
            </fieldset>
            <div className="market-detail-buy">
              <QuantityStepper value={quantity} onChange={(next) => setQuantity(Math.max(1, next))} label={product.title} />
              <button className="market-primary" onClick={() => market.add(product, quantity, pack, true)}>
                <ShoppingCartOutlined /> Add to basket · {money(total)}
              </button>
            </div>
            <button className="market-delivery-check" onClick={() => market.setLocationOpen(true)}>
              <EnvironmentOutlined />
              <span>
                {market.location ? `Delivery address: ${market.location.city} ${market.location.postcode}` : 'Choose your delivery location'}
                <small>Confirm your address before adding to your basket</small>
              </span>
              <ArrowRightOutlined />
            </button>
            <div className="market-detail-sections">
              <details open>
                <summary>About this product</summary>
                <p>{product.title}, selected from {farm.name}. {farm.summary} The price shown is for the labelled pack; a bundle contains three of the same pack.</p>
              </details>
              <details>
                <summary>Delivery &amp; storage</summary>
                <p>Choose an available preview delivery day at checkout. Follow the storage and use-by instructions on the product label. Live delivery coverage and stock must be confirmed when ordering is connected.</p>
              </details>
            </div>
          </article>
        </div>
        <section className="market-related">
          <div className="market-section-heading">
            <div>
              <span className="eyebrow">Keep it in the farm family</span>
              <h2>More from {farm.name}.</h2>
            </div>
            <Link href={routes.farm(product.farmId)} className="market-link">Visit the farm <ArrowRightOutlined /></Link>
          </div>
          <div className="market-product-grid four">
            {related.map((item) => <MarketProductCard key={item.title} item={item} />)}
          </div>
          {!related.length && (
            <Link className="market-link" href={routes.products}>Discover products from other farms <ArrowRightOutlined /></Link>
          )}
        </section>
      </div>
    </Page>
  );
}
