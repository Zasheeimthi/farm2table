'use client';

import React, { useState } from 'react';
import { Button } from 'antd';
import {
  ArrowRightOutlined, CheckCircleOutlined, CompassOutlined, EnvironmentOutlined,
  HeartOutlined, HomeOutlined, SearchOutlined, ShoppingOutlined, TagOutlined, TruckOutlined
} from '@ant-design/icons';
import { useMarket } from '@/components/providers/MarketProvider';
import { useGo } from '@/lib/navigation';
import ProductCard from '@/components/catalog/ProductCard';
import CategoryFilter from '@/components/catalog/CategoryFilter';
import CategoryArtwork from '@/components/catalog/CategoryArtwork';
import FeaturedFarms from '@/components/market/FeaturedFarms';
import Reviews from '@/components/home/Reviews';
import FAQSection from '@/components/home/FAQSection';

const steps = [
  ['1', 'Choose Location', 'Enter your delivery location', <EnvironmentOutlined />],
  ['2', 'Select Farm', 'Browse farms near you', <HomeOutlined />],
  ['3', 'Shop Products', 'Add fresh products to cart', <ShoppingOutlined />],
  ['4', 'Fast Delivery', 'We deliver to your doorstep', <TruckOutlined />]
];

const marketplaceBenefits = [
  ['Direct from Farms', 'No middlemen', <HomeOutlined />],
  ['Farm Fresh', 'Picked with care', <TagOutlined />],
  ['Healthy & Safe', 'Chemical free', <CheckCircleOutlined />],
  ['Sustainable', 'Good for nature', <CompassOutlined />]
];
import { useCatalog } from '@/components/providers/CatalogProvider';
import { useUi } from '@/components/providers/UiProvider';

export default function HomePage() {
  const go = useGo();
  const { farmData, productData, categoryTabs } = useCatalog();
  const { activeCategory, setActiveCategory } = useUi();
  const market = useMarket();
  const products = productData;
  const onAdd = market.add;

  const [heroSearch, setHeroSearch] = useState('');
  const heroLocation = market.location?.city || 'Choose delivery location';
  const heroProducts = (activeCategory === 'all'
    ? products
    : products.filter((product) => product.category === activeCategory)
  ).slice(0, 8);

  const detectLocation = () => market.setLocationOpen(true);

  const searchProducts = () => {
    go(`/farms?search=${encodeURIComponent(heroSearch.trim())}`);
  };

  return (
    <main>
      <section className="hero-section">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          aria-label="Farmer preparing fresh produce in a sunny field"
        >
          <source src="/storefront/hero-farmer.mp4" type="video/mp4" />
        </video>
        <div className="hero-content scroll-reveal">
          <span className="eyebrow">Local farms. Premium produces.</span>
          <h1>Fresh. Natural.<br /><em>Delivered to you.</em></h1>
          <p>Discover small-scale, nutritious food sourced directly from farms you can actually know.</p>
          <form className="hero-search" onSubmit={(event) => { event.preventDefault(); searchProducts(); }}>
            <div className="hero-search-query">
              <SearchOutlined />
              <input
                value={heroSearch}
                onChange={(event) => setHeroSearch(event.target.value)}
                placeholder="Search Farms, Categories"
                aria-label="Search products, farms or categories"
              />
            </div>
            <button className="hero-location" type="button" onClick={detectLocation}>
              <EnvironmentOutlined />
              <span>{heroLocation}</span>
            </button>
            <button className="hero-search-submit" type="submit">Explore <ArrowRightOutlined /></button>
          </form>
        </div>
      </section>

      <section className="category-discovery" aria-labelledby="category-discovery-title">
        <div className="category-discovery-heading">
          <div>
            <span>Good food starts here</span>
            <h2 id="category-discovery-title">Find your farm favourites.</h2>
          </div>
          <button type="button" onClick={() => { setActiveCategory('all'); go('/farms'); }}>Explore all farms <ArrowRightOutlined /></button>
        </div>
        <div className="category-discovery-grid">
          {categoryTabs.slice(1).map((tab, index) => (
            <button className={`category-discovery-card category-tone-${index}`} type="button" key={tab.id} onClick={() => { setActiveCategory(tab.id); go(`/farms?category=${tab.id}`); }}>
              <span className="category-artwork"><CategoryArtwork category={tab.id} /></span>
              <span className="category-discovery-label">{tab.label}</span>
              <span className="category-discovery-arrow" aria-hidden="true"><ArrowRightOutlined /></span>
            </button>
          ))}
        </div>
      </section>

      <FeaturedFarms />

      <section className="market-flow section-block wide">
        <div className="why-panel scroll-reveal">
          <div className="why-image">
            <img src="/storefront/585.jpg" alt="Farmer holding fresh greens and milk from the farm" />
          </div>
          <div className="why-copy">
            <span className="eyebrow">Local roots. Clean delivery.</span>
            <h2>Why Choose Farm to Table?</h2>
            <p>We bring you the best from local farms. Pure, fresh and healthy products for your family.</p>
            <div className="why-benefits">
              {marketplaceBenefits.map(([title, text, icon]) => (
                <article key={title}>
                  <span>{icon}</span>
                  <strong>{title}</strong>
                  <small>{text}</small>
                </article>
              ))}
            </div>
          </div>
        </div>
        <section className="shopping-journey scroll-reveal" aria-labelledby="shopping-journey-title">
          <div className="shopping-journey-heading">
            <div>
              <span className="shopping-journey-kicker">From their farm to your home</span>
              <h2 id="shopping-journey-title">How it works<span>.</span></h2>
            </div>
            <p>Fresh food. Four simple steps.</p>
          </div>
          <ol className="shopping-journey-steps">
            {steps.map(([number, title, text, icon]) => (
              <li key={number}>
                <div className="shopping-journey-card-top">
                  <span className="shopping-journey-icon" aria-hidden="true">{icon}</span>
                  <span className="shopping-journey-number" aria-hidden="true">0{number}</span>
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </section>
      </section>

      <section className="shop-section section-block">
        <div className="center-title scroll-reveal">
          <h2>Fresh & Clean</h2>
          <CategoryFilter activeCategory={activeCategory} onChange={setActiveCategory} />
        </div>
        <div className="product-grid">
          {heroProducts.map((product) => <ProductCard item={product} onAdd={onAdd} key={product.title} />)}
        </div>
        <div className="section-action">
          <Button type="primary" onClick={() => go(`/products?category=${activeCategory}`)}>View All Products</Button>
        </div>
      </section>

      <section id="about" className="farm-story section-block">
        <div className="farm-heading scroll-reveal">
          <h2>Our<br />Farms</h2>
        </div>
        <div className="farm-copy scroll-reveal">
          <p>Farm to Table connects homes with growers, dairies, butchers, and fishers who care about every step from field to delivery.</p>
          <button onClick={() => go('/farms')}>Meet Our Farms</button>
        </div>
        <div className="video-card image-reveal">
          <img src="/ferme/13305.jpg" alt="A family spending time together at the farm" loading="lazy" />
        </div>
      </section>

      <section className="care-panel scroll-reveal">
        <h2>We Care for Nature</h2>
        <div className="care-grid">
          <article>
            <span>01</span>
            <h3>Rare & pesticide-free</h3>
            <p>Small suppliers are chosen for clean growing and careful handling.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Traceable origins</h3>
            <p>Each product clearly connects back to a named farm or producer.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Packed lightly</h3>
            <p>Fresh deliveries use reusable boxes and simple, responsible packaging.</p>
          </article>
        </div>
      </section>

      <section className="visit-section section-block">
        <div className="visit-image image-reveal">
          <img src="/ferme/13305.jpg" alt="Family visiting a farm garden" />
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
            <button type="button" onClick={() => go('/contact')}>Plan your visit <ArrowRightOutlined /></button>
            {/* <span><CalendarOutlined /> Selected weekends</span> */}
          </div>
        </div>
        <div className="visit-small image-reveal">
          <img src="/photography/pasture.jpg" alt="Cows grazing in a sunny pasture" loading="lazy" />
        </div>
      </section>

      <Reviews />
      <FAQSection />
    </main>
  );
}
