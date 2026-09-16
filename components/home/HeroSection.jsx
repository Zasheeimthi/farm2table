'use client';

import { useState } from 'react';
import { ArrowRightOutlined, EnvironmentOutlined, SearchOutlined } from '@ant-design/icons';
import { routes } from '@/lib/routes.js';
import { useGo } from '@/hooks/useGo.js';
import { useMarket } from '@/context/MarketContext.jsx';

/** Home hero: background video, search field and delivery-location shortcut. */
export default function HeroSection() {
  const market = useMarket();
  const go = useGo();
  const [heroSearch, setHeroSearch] = useState('');
  const heroLocation = market.location?.city || 'Choose delivery location';

  const searchProducts = () => {
    go(routes.farmsBySearch(heroSearch.trim()));
  };

  return (
    <section className="hero-section">
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        aria-label="European farms and fresh farm produce"
      >
        <source src="/storefront/mixfarms.mp4" type="video/mp4" />
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
          <button className="hero-location" type="button" onClick={() => market.setLocationOpen(true)}>
            <EnvironmentOutlined />
            <span>{heroLocation}</span>
          </button>
          <button className="hero-search-submit" type="submit">Explore <ArrowRightOutlined /></button>
        </form>
      </div>
    </section>
  );
}
