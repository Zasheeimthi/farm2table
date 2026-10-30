"use client";

import { ArrowRightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { CategoryArtwork } from "@/components/category/CategoryArtwork.jsx";
import { CategoryFilter } from "@/components/category/CategoryFilter.jsx";
import { CompassOutlined } from "@ant-design/icons";
import { EnvironmentOutlined } from "@ant-design/icons";
import { FAQSection } from "@/components/home/FAQSection.jsx";
import { FeaturedFarms } from "@/components/home/FeaturedFarms.jsx";
import { Footer } from "@/components/layout/Footer.jsx";
import { HeartOutlined } from "@ant-design/icons";
import { ProductCard } from "@/components/product/HomeProductCard.jsx";
import { Reviews } from "@/components/home/Reviews.jsx";
import { SearchOutlined } from "@ant-design/icons";
import { ShoppingOutlined } from "@ant-design/icons";
import { categoryTabs } from "@/lib/catalog";
import { marketplaceBenefits } from "@/constants/home.jsx";
import { steps } from "@/constants/home.jsx";
import { useMarket } from "@/context/MarketContext.jsx";
import { useNavigate } from "@/hooks/useNavigate";
import { useState } from "react";
import { productData } from '@/lib/catalog';
export function HomePage() {
  const go = useNavigate();
  const [heroSearch, setHeroSearch] = useState('');
  const market = useMarket();
  const { activeCategory, setActiveCategory, add: onAdd } = market;
  const products = productData;
  const heroLocation = market.location?.city || 'Välj leveransplats';
  const heroProducts = (activeCategory === 'all' ? products : products.filter(product => product.category === activeCategory)).slice(0, 8);
  const detectLocation = () => market.setLocationOpen(true);
  const searchProducts = () => {
    go(`/farms?search=${encodeURIComponent(heroSearch.trim())}`);
  };
  return <main lang="sv">
      <section className="hero-section">
        <video className="hero-video" autoPlay muted loop playsInline aria-label="Gårdar och lokal mat från producenter">
          <source src="/storefront/mixfarms.mp4" type="video/mp4" />
        </video>
        <div className="hero-content scroll-reveal">
          <span className="eyebrow">Lokal mat. Större möjligheter.</span>
          <h1>Från din gård<br /><em>till fler bord.</em></h1>
          <p>Upptäck lokal mat och människorna bakom den. Farm to Table förenar gårdarnas egna digitala butiker med en gemensam marknadsplats.</p>
          <form className="hero-search" onSubmit={event => {
          event.preventDefault();
          searchProducts();
        }}>
            <div className="hero-search-query">
              <SearchOutlined />
              <input value={heroSearch} onChange={event => setHeroSearch(event.target.value)} placeholder="Sök gårdar och kategorier" aria-label="Sök produkter, gårdar eller kategorier" />
            </div>
            <button className="hero-location" type="button" onClick={detectLocation}>
              <EnvironmentOutlined />
              <span>{heroLocation}</span>
            </button>
            <button className="hero-search-submit" type="submit">Utforska <ArrowRightOutlined /></button>
          </form>
        </div>
      </section>

      <section className="category-discovery" aria-labelledby="category-discovery-title">
        <div className="category-discovery-heading">
          <div>
            <span>Närproducerat börjar här</span>
            <h2 id="category-discovery-title">Hitta dina favoriter från gården.</h2>
          </div>
          <button type="button" onClick={() => {
          setActiveCategory('all');
          go('/farms');
        }}>Utforska alla gårdar <ArrowRightOutlined /></button>
        </div>
        <div className="category-discovery-grid">
          {categoryTabs.slice(1).map((tab, index) => <button className={`category-discovery-card category-tone-${index}`} type="button" key={tab.id} onClick={() => {
          setActiveCategory(tab.id);
          go(`/farms?category=${tab.id}`);
        }}>
              <span className="category-artwork"><CategoryArtwork category={tab.id} /></span>
              <span className="category-discovery-label">{({'meat-fish':'Kött, fågel & fisk',dairy:'Mejeri & ost',vegetables:'Grönsaker & rotfrukter',pantry:'Skafferi',drinks:'Drycker',kitchen:'Till köket'})[tab.id] || tab.label}</span>
              <span className="category-discovery-arrow" aria-hidden="true"><ArrowRightOutlined /></span>
            </button>)}
        </div>
      </section>

      <FeaturedFarms />

      <section className="market-flow section-block wide">
        <div className="why-panel scroll-reveal">
          <div className="why-image">
            <img src="/storefront/585.jpg" alt="Producent med en korg av gårdens ostar" />
          </div>
          <div className="why-copy">
            <span className="eyebrow">Enklare försäljning. Starkare kundrelationer.</span>
            <h2>Varför Farm to Table?</h2>
            <p>Mer tid för det som verkligen räknas. Samla försäljning, beställningar och kundkontakt på ett ställe – och låt fler upptäcka din gård.</p>
            <div className="why-benefits">
              {marketplaceBenefits.map(([title, text, icon]) => <article key={title}>
                  <span>{icon}</span>
                  <strong>{title}</strong>
                  <small>{text}</small>
                </article>)}
            </div>
          </div>
        </div>
        <section className="shopping-journey scroll-reveal" aria-labelledby="shopping-journey-title">
          <div className="shopping-journey-heading">
            <div>
              <span className="shopping-journey-kicker">Från gården till ditt bord</span>
              <h2 id="shopping-journey-title">Så fungerar det<span>.</span></h2>
            </div>
            <p>Lokal mat. Fyra enkla steg.</p>
          </div>
          <ol className="shopping-journey-steps">
            {steps.map(([number, title, text, icon]) => <li key={number}>
                <div className="shopping-journey-card-top">
                  <span className="shopping-journey-icon" aria-hidden="true">{icon}</span>
                  <span className="shopping-journey-number" aria-hidden="true">0{number}</span>
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>)}
          </ol>
        </section>
      </section>

      <section className="shop-section section-block">
        <div className="center-title scroll-reveal">
          <h2>Smaker från våra producenter</h2>
          <CategoryFilter activeCategory={activeCategory} onChange={setActiveCategory} />
        </div>
        <div className="product-grid">
          {heroProducts.map(product => <ProductCard item={product} onAdd={onAdd} key={product.title} />)}
        </div>
        <div className="section-action">
          <Button type="primary" onClick={() => go(`/products?category=${activeCategory}`)}>Visa alla produkter</Button>
        </div>
      </section>

      <section id="about" className="farm-story section-block">
        <div className="farm-heading scroll-reveal">
          <h2>Våra<br />gårdar</h2>
        </div>
        <div className="farm-copy scroll-reveal">
          <p>Bakom varje gård finns människor, kunskap och en egen berättelse. Lär känna våra lokala producenter och hitta mat med ett tydligt ursprung.</p>
          <button onClick={() => go('/farms')}>Upptäck våra gårdar</button>
        </div>
        <div className="video-card image-reveal">
          <img src="/ferme/13305.jpg" alt="Barn som möter en kalv på gården" loading="lazy" />
        </div>
      </section>

      <section className="care-panel scroll-reveal">
        <h2>En framtid för lokal mat</h2>
        <div className="care-grid">
          <article>
            <span>01</span>
            <h3>Närmare producenten</h3>
            <p>Lär känna människorna bakom maten och deras sätt att arbeta.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Tydligt ursprung</h3>
            <p>Se vilken gård eller producent som står bakom varje produkt.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Starkare tillsammans</h3>
            <p>Direkta kundrelationer skapar nya möjligheter för lokala verksamheter.</p>
          </article>
        </div>
      </section>

      <section className="visit-section section-block">
        <div className="visit-image image-reveal">
          <img src="/ferme/13305.jpg" alt="Barn på besök i gårdens grönska" />
        </div>
        <div className="visit-copy family-visit scroll-reveal">
          <span className="family-visit-kicker">Nära gården. Nära människorna.</span>
          <h2>Upptäck livet på gården<span>.</span></h2>
          <p>Låt nyfikenheten på maten börja där den produceras. Kontakta oss för att fråga vilka gårdar som erbjuder besök och aktiviteter för familjer.</p>
          <div className="family-activities">
            <article><span aria-hidden="true"><CompassOutlined /></span><h3>Möt producenterna</h3><p>Fråga om gårdens arbete och livet på landet.</p></article>
            <article><span aria-hidden="true"><ShoppingOutlined /></span><h3>Följ säsongen</h3><p>Upptäck vad som växer och skördas just nu.</p></article>
            <article><span aria-hidden="true"><HeartOutlined /></span><h3>Lär känna gården</h3><p>Ta del av gårdens berättelse och vardag.</p></article>
          </div>
          <div className="family-visit-actions">
            <button type="button" onClick={() => go('/contact')}>Fråga om gårdsbesök <ArrowRightOutlined /></button>
            {/* <span><CalendarOutlined /> Selected weekends</span> */}
          </div>
        </div>
        <div className="visit-small image-reveal">
          <img src="/photography/pasture.jpg" alt="Kor som betar i en solig hage" loading="lazy" />
        </div>
      </section>

      <Reviews />
      <FAQSection />
      <Footer />
    </main>;
}
