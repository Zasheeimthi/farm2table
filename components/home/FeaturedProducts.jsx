'use client';

import { Button } from 'antd';
import { routes } from '@/lib/routes.js';
import { useGo } from '@/hooks/useGo.js';
import ProductCard from '@/components/product/ProductCard.jsx';
import CategoryFilter from './CategoryFilter.jsx';

/** Home page product grid, filtered by the shared active category. */
export default function FeaturedProducts({ products, activeCategory, onChange, onAdd }) {
  const go = useGo();
  const visibleProducts = (activeCategory === 'all'
    ? products
    : products.filter((product) => product.category === activeCategory)
  ).slice(0, 8);

  return (
    <section className="shop-section section-block">
      <div className="center-title scroll-reveal">
        <h2>Fresh &amp; Clean</h2>
        <CategoryFilter activeCategory={activeCategory} onChange={onChange} />
      </div>
      <div className="product-grid">
        {visibleProducts.map((product) => <ProductCard item={product} onAdd={onAdd} key={product.title} />)}
      </div>
      <div className="section-action">
        <Button type="primary" onClick={() => go(routes.productsByCategory(activeCategory))}>View All Products</Button>
      </div>
    </section>
  );
}
