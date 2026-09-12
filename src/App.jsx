import { farmData, categoryTabs, productData } from './catalog.jsx';
import { MarketProvider, useMarket, MarketTools, FarmsPage, ProductsPage, ProductDetailsPage, FarmPage, CartPage, CheckoutPage, PaymentPage, ConfirmationPage, AccountPage, AuthPage, OrdersPage, SavedPage, NotFound, FeaturedFarms, SaveButton } from './marketplace.jsx';
import React, { useEffect, useMemo, useState } from 'react';
import { Badge, Button, Input } from 'antd';
import {
  AppstoreOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  ArrowUpOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  CoffeeOutlined,
  CompassOutlined,
  EnvironmentOutlined,
  FacebookFilled,
  HeartOutlined,
  HomeOutlined,
  InboxOutlined,
  InstagramFilled,
  MailOutlined,
  MenuOutlined,
  MinusOutlined,
  PlusOutlined,
  PhoneOutlined,
  SearchOutlined,
  ShareAltOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  SkinOutlined,
  StarFilled,
  TagOutlined,
  TeamOutlined,
  TruckOutlined
} from '@ant-design/icons';

const steps = [
  ['1', 'Choose Location', 'Enter your delivery location', <EnvironmentOutlined />],
  ['2', 'Select Farm', 'Browse farms near you', <HomeOutlined />],
  ['3', 'Shop Products', 'Add fresh products to cart', <ShoppingOutlined />],
  ['4', 'Fast Delivery', 'We deliver to your doorstep', <TruckOutlined />]
];

const reviews = [
  ['Excellent quality', 'Everything arrived cold, clean, and beautifully packed.', 'MS'],
  ['Trusted local farms', 'I love seeing which farm each product comes from.', 'Sarah Smith'],
  ['Fresh and reliable', 'The vegetables and dairy feel premium every week.', 'John K']
];

const marketplaceBenefits = [
  ['Direct from Farms', 'No middlemen', <HomeOutlined />],
  ['Farm Fresh', 'Picked with care', <TagOutlined />],
  ['Healthy & Safe', 'Chemical free', <CheckCircleOutlined />],
  ['Sustainable', 'Good for nature', <CompassOutlined />]
];

const faqItems = [
  ['Where does the produce come from?', 'Every item is connected to a named farm, dairy, fishery, or local producer so customers can shop with clear origin details.'],
  ['Can customers choose a delivery day?', 'You can choose a delivery day and time in the checkout preview. Live availability will be confirmed when ordering is connected.'],
  ['How are chilled products handled?', 'Dairy, meat, fish, and fresh drinks are packed with cold-chain care in clean reusable delivery boxes.'],
  ['Can I view farm details before buying?', 'Yes. Farm names open a dedicated farm page with location, practices, product list, and producer story.']
];

function getRoute() {
  const hash = window.location.hash.replace(/^#/, '') || '/';
  const [path, query = ''] = hash.split('?');
  return { path, params: new URLSearchParams(query) };
}

function setRoute(path) {
  window.location.hash = path;
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function productPath(item) {
  return `/product/${slugify(item.title)}`;
}

function Brand({ onHome }) {
  return (
    <button className="brand-text" onClick={onHome} aria-label="Farm to Table home">
      Farm to Table
    </button>
  );
}

function Header({ route, setActiveCategory, cartCount, isScrolled }) {
  const market = useMarket();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  useEffect(() => { setMobileNavOpen(false); }, [route.path]);
  const nav = [
    ['Home', '/'],
    ['Farms', '/farms'],
    ['Products', '/products'],
    ['About', '/about'],
    ['Contact us', '/contact']
  ];

  return (
    <header className={`site-header ${route.path === '/' ? 'site-header-hero' : ''} ${isScrolled ? 'site-header-scrolled' : ''} ${route.path.startsWith('/product/') ? 'site-header-product' : ''} ${mobileNavOpen ? 'mobile-nav-open' : ''}`}>
      <button
        className="mobile-menu-toggle"
        type="button"
        aria-label={mobileNavOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={mobileNavOpen}
        onClick={() => setMobileNavOpen((isOpen) => !isOpen)}
      >
        <MenuOutlined />
      </button>
      <Brand onHome={() => { setActiveCategory('all'); setRoute('/'); }} />
      <nav aria-label="Primary navigation">
        {nav.map(([label, path]) => (
          <button
            className={route.path === path || (path === '/farms' && route.path.startsWith('/farm/')) ? 'active' : ''}
            onClick={() => {
              if (path === '/' || path === '/products') setActiveCategory('all');
              setRoute(path);
              setMobileNavOpen(false);
            }}
            key={path}
          >
            {label}
          </button>
        ))}
        <button className="mobile-search-action" onClick={() => { market.setSearchOpen(true); setMobileNavOpen(false); }}>Search</button>
      </nav>
      <div className="header-actions" aria-label="Quick actions">
        <button className="header-delivery" onClick={() => market.setLocationOpen(true)}><EnvironmentOutlined /> {market.location?.city || "Delivery location"}</button>
        <button className="header-search-button" aria-label="Search products and farms" onClick={() => market.setSearchOpen(true)}><SearchOutlined /></button>
        <button className="header-icon-button" type="button" onClick={() => setRoute('/account')} aria-label="Open my account">
          <TeamOutlined />
        </button>
        <Badge count={cartCount} color="#FE5D02">
          <button
            className="header-cart-button"
            type="button"
            onClick={() => setRoute('/cart')}
            aria-label="Open cart"
          >
            <ShoppingCartOutlined />
          </button>
        </Badge>
      </div>
    </header>
  );
}

function FarmLink({ farmId }) {
  const farm = farmData[farmId];
  return (
    <button className="farm-link" onClick={() => setRoute(`/farm/${farmId}`)}>
      {farm.name}
    </button>
  );
}

function ProductCard({ item, compact = false, onAdd }) {
  const farm = farmData[item.farmId];
  const category = categoryTabs.find((tab) => tab.id === item.category)?.label;
  const path = productPath(item);

  return (
    <article className={`product-card scroll-reveal ${compact ? 'compact' : ''}`}>
      <SaveButton className="heart-btn" id={`product:${slugify(item.title)}`} label={item.title} />
      {item.tag && <span className="sale-ribbon">{item.tag}</span>}
      <button className="product-image product-image-button" type="button" onClick={() => setRoute(path)} aria-label={`View ${item.title}`}>
        <img src={item.image} alt={item.title} />
      </button>
      <div className="product-info">
        <span className="product-category">{category}</span>
        <h3>
          <button className="product-title-button" type="button" onClick={() => setRoute(path)}>
            {item.title}
          </button>
        </h3>
        <div className="product-meta">
          <FarmLink farmId={item.farmId} />
          <span><EnvironmentOutlined /> {farm.location}</span>
        </div>
        <div className="product-card-bottom">
          <p>{item.price}</p>
          <button type="button" onClick={() => onAdd(item)}>Add</button>
        </div>
      </div>
    </article>
  );
}

function CategoryArtwork({ category }) {
  const artwork = {
    all: <><rect x="15" y="15" width="22" height="22" rx="5" fill="var(--category-accent)" /><rect x="47" y="15" width="22" height="22" rx="5" fill="var(--category-accent)" /><rect x="15" y="47" width="22" height="22" rx="5" fill="var(--category-accent)" /><rect x="47" y="47" width="22" height="22" rx="5" fill="var(--category-accent)" /></>,
    'meat-fish': <><path d="M14 39c13-20 35-20 48 0-13 20-35 20-48 0Z" fill="var(--category-accent)" /><path d="m62 39 13-13v26L62 39Z" fill="var(--category-accent)" /><path d="M43 23c-7 10-7 22 0 32M22 37h1" /><circle cx="25" cy="35" r="2" fill="currentColor" stroke="none" /></>,
    dairy: <><path d="M13 45 56 24l13 19v21H13V45Z" fill="var(--category-accent)" /><path d="m13 45 43 4 13-6M56 49v15" /><circle cx="27" cy="54" r="3" /><circle cx="43" cy="57" r="2" /><path d="m30 36 8 2m11-9 5 3" /></>,
    vegetables: <><path d="M51 25C28 23 24 52 15 68c20-5 47-17 43-34Z" fill="var(--category-accent)" /><path d="m50 28 1-17m4 19 16-10m-18 9 10-18M31 39l9 5m-15 7 8 5" /></>,
    pantry: <><rect x="22" y="23" width="38" height="45" rx="10" fill="var(--category-accent)" /><rect x="23" y="15" width="36" height="9" rx="3" /><path d="M23 37h36M23 56h36" /><path d="M36 47c3-6 9-6 12 0-3 6-9 6-12 0Z" /></>,
    drinks: <><path d="M30 22v12l-7 10v23h34V44l-7-10V22" fill="var(--category-accent)" /><rect x="29" y="13" width="22" height="9" rx="3" /><path d="M23 47h34M23 59h34m9-30 5-7m-3 16h8" /></>,
    kitchen: <><path d="M17 35h48v10c0 14-10 22-24 22S17 59 17 45V35Z" fill="var(--category-accent)" /><path d="M17 39H9v11h9m47-11h8v11H63M14 29h54M35 23v-5h12v5m-3 12 14-22" /></>
  };
  return <svg viewBox="0 0 84 84" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{artwork[category]}</svg>;
}

function CategoryFilter({ activeCategory, onChange }) {
  return (
    <div className="category-filters" role="group" aria-label="Product categories">
      {categoryTabs.map((tab) => (
        <button
          className="category-filter-card"
          data-category={tab.id}
          aria-pressed={activeCategory === tab.id}
          onClick={() => onChange(tab.id)}
          type="button"
          key={tab.id}
        >
          <span className="category-filter-art"><CategoryArtwork category={tab.id} /></span>
          <span className="category-filter-label">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}

function HomePage({ products, activeCategory, setActiveCategory, onAdd }) {
  const [heroSearch, setHeroSearch] = useState('');
  const market = useMarket();
  const heroLocation = market.location?.city || 'Choose delivery location';
  const heroProducts = (activeCategory === 'all'
    ? products
    : products.filter((product) => product.category === activeCategory)
  ).slice(0, 8);

  const detectLocation = () => market.setLocationOpen(true);

  const searchProducts = () => {
    setRoute(`/farms?search=${encodeURIComponent(heroSearch.trim())}`);
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
                placeholder="Search farms, products or categories"
                aria-label="Search products, farms or categories"
              />
            </div>
            <button className="hero-location" type="button" onClick={detectLocation}>
              <EnvironmentOutlined />
              <span>{heroLocation}</span>
            </button>
            <button className="hero-search-submit" type="submit">Explore <ArrowRightOutlined /></button>
          </form>
          <button className="hero-browse-link" type="button" onClick={() => setRoute('/farms')}>
            Explore our farm community <ArrowRightOutlined />
          </button>
        </div>
      </section>

      <section className="category-discovery" aria-labelledby="category-discovery-title">
        <div className="category-discovery-heading">
          <div>
            <span>Good food starts here</span>
            <h2 id="category-discovery-title">Find your farm favourites.</h2>
          </div>
          <button type="button" onClick={() => { setActiveCategory('all'); setRoute('/farms'); }}>Explore all farms <ArrowRightOutlined /></button>
        </div>
        <div className="category-discovery-grid">
          {categoryTabs.slice(1).map((tab, index) => (
            <button className={`category-discovery-card category-tone-${index}`} type="button" key={tab.id} onClick={() => { setActiveCategory(tab.id); setRoute(`/farms?category=${tab.id}`); }}>
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
          <Button type="primary" onClick={() => setRoute(`/products?category=${activeCategory}`)}>View All Products</Button>
        </div>
      </section>

      <section id="about" className="farm-story section-block">
        <div className="farm-heading scroll-reveal">
          <h2>Our<br />Farms</h2>
        </div>
        <div className="farm-copy scroll-reveal">
          <p>Farm to Table connects homes with growers, dairies, butchers, and fishers who care about every step from field to delivery.</p>
          <button onClick={() => setRoute('/farms')}>Meet Our Farms</button>
        </div>
        <div className="video-card image-reveal">
          <img src="/ferme/farm-video.jpg" alt="A child running through a farm field" />
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
            <button type="button" onClick={() => setRoute('/contact')}>Plan your visit <ArrowRightOutlined /></button>
            <span><CalendarOutlined /> Selected weekends</span>
          </div>
        </div>
        <div className="visit-small image-reveal">
          <img src="/ferme/visit-cow.jpg" alt="Feeding a cow on the farm" />
        </div>
      </section>

      <Reviews />
      <FAQSection />
      <Footer />
    </main>
  );
}

function AboutPage() {
  return (
    <main className="page-view simple-page">
      <section className="page-hero about-hero">
        <div className="about-hero-copy">
          <span className="eyebrow">About Farm to Table</span>
          <h1>From our farms to your table</h1>
        </div>
        <div className="about-hero-intro">
          <p>We believe great food starts with responsible farming, honest sourcing, and a real connection between the people who grow food and the people who enjoy it.</p>
        </div>
      </section>

      <section className="about-story section-block wide">
        <div className="about-story-image image-reveal">
          <img src="/storefront/585.jpg" alt="Farmer carrying fresh produce in a field" />
        </div>
        <div className="about-story-copy scroll-reveal">
          <span className="eyebrow">Our story</span>
          <h2>Farm to Table was created with one simple idea.</h2>
          <p>Good food should be more accessible, more transparent, and more connected to the people and land behind it. We wanted to create a better way to shop for food—one where you can know where it comes from, who grows it, and why it is worth choosing.</p>
          <p>Today, too much food moves through long supply chains before it reaches our homes. We are building a more thoughtful alternative: a marketplace that brings trusted farms, makers, and local producers directly to people who care about quality and origin.</p>
        </div>
      </section>

      <section className="about-values section-block wide">
        <div className="section-heading long-heading">
          <span className="eyebrow">What we believe</span>
          <h2>Fresh food, trusted farms, and a better future.</h2>
        </div>
        <div className="about-grid">
          <article>
            <h3>Quality first</h3>
            <p>We carefully select products and producers who meet our standards for freshness, quality, and responsible production.</p>
          </article>
          <article>
            <h3>From trusted farms</h3>
            <p>We build long-term relationships with growers and makers who care for their land, animals, and products with integrity.</p>
          </article>
          <article>
            <h3>Transparency matters</h3>
            <p>We want you to know more about the food you eat—from its origin to the people behind it.</p>
          </article>
          <article>
            <h3>Supporting farmers</h3>
            <p>When you shop with Farm to Table, you help support the livelihoods of farmers and local food producers.</p>
          </article>
          <article>
            <h3>Better food, better future</h3>
            <p>We believe responsible food production can benefit families, communities, and the environment alike.</p>
          </article>
          <article>
            <h3>Honest sourcing</h3>
            <p>Every product we feature speaks to a simpler, clearer, and more meaningful relationship between farm and table.</p>
          </article>
        </div>
      </section>

      <section className="about-promise section-block wide">
        <div className="promise-panel scroll-reveal">
          <span className="eyebrow">Our promise</span>
          <h2>We make every step thoughtful.</h2>
          <p>From sourcing to delivery, we are committed to making the experience as careful, transparent, and enjoyable as possible. Our mission is simple: to bring you food you can feel good about serving to your family.</p>
          <div className="promise-quote">
            <strong>Good food. Trusted farmers. A better connection from farm to table.</strong>
          </div>
        </div>
      </section>

      <section className="about-cta section-block wide">
        <div className="cta-panel scroll-reveal">
          <span className="eyebrow">Farm to Table</span>
          <h2>Know your food. Support your farmers. Taste the difference.</h2>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function ContactPage() {
  const prepareEmail = (event) => {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const body = `${fields.get('message')}\n\nFrom: ${fields.get('name')}\nEmail: ${fields.get('email')}`;
    window.location.href = `mailto:support@farmtotable.com?subject=${encodeURIComponent('Farm to Table enquiry')}&body=${encodeURIComponent(body)}`;
  };

  return (
    <main className="page-view contact-experience">
      <section className="contact-intro section-block">
        <span className="contact-kicker">Let’s talk</span>
        <h1>Good food starts with<br />a good conversation<span>.</span></h1>
        <p>Questions about your delivery, our farms, or what’s fresh? We’re here to help.</p>
      </section>
      <section className="contact-workspace section-block" aria-label="Contact our team">
        <aside className="contact-support">
          <span className="contact-support-symbol" aria-hidden="true"><CoffeeOutlined /></span>
          <h2>A little help,<br />a human touch.</h2>
          <p>Find the right way to reach our team.</p>
          <a className="contact-method" href="mailto:support@farmtotable.com">
            <MailOutlined /><span><small>Email us</small><strong>support@farmtotable.com</strong></span><ArrowRightOutlined />
          </a>
          <a className="contact-method" href="tel:+4683455678">
            <PhoneOutlined /><span><small>Give us a call</small><strong>+46 8 345 5678</strong></span><ArrowRightOutlined />
          </a>
          <div className="contact-hours">
            <CalendarOutlined />
            <div><strong>Delivery support</strong><p>Monday–Saturday · 08:00–18:00</p></div>
          </div>
        </aside>
        <form className="contact-message" onSubmit={prepareEmail}>
          <div className="contact-message-heading"><span>We’re listening</span><h2>How can we help?</h2></div>
          <div className="contact-field-row">
            <label htmlFor="contact-name">Your name<input id="contact-name" name="name" autoComplete="name" placeholder="Full name" required /></label>
            <label htmlFor="contact-email">Email address<input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label>
          </div>
          <label htmlFor="contact-message">Your message<textarea id="contact-message" name="message" placeholder="Tell us a little about what you need…" rows={5} required /></label>
          <div className="contact-send-row">
            <p>Continue in your email app to review and send your message.</p>
            <button type="submit">Continue in email <ArrowRightOutlined /></button>
          </div>
        </form>
      </section>
      <Footer />
    </main>
  );
}

function Reviews() {
  const [activeReview, setActiveReview] = useState(0);
  const [title, text, name] = reviews[activeReview];
  const moveReview = (direction) => {
    setActiveReview((current) => (current + direction + reviews.length) % reviews.length);
  };

  return (
    <section className="reviews-section">
      <h2 className="scroll-reveal">Real Reviews From Real Customers</h2>
      <div className="reviews-carousel scroll-reveal">
        <article className="review-score-card">
          <span className="eyebrow">Verified buyers</span>
          <strong>4.9</strong>
          <div><StarFilled /><StarFilled /><StarFilled /><StarFilled /><StarFilled /></div>
          <p>Based on 3,442 fresh delivery reviews.</p>
        </article>
        <article className="review-feature-card">
          <div className="review-topline">
            <span><StarFilled /><StarFilled /><StarFilled /><StarFilled /><StarFilled /></span>
            <small>3 days ago</small>
          </div>
          <h3>{title}</h3>
          <p>{text}</p>
          <em>{name}</em>
          <div className="review-controls" aria-label="Review carousel controls">
            <button type="button" onClick={() => moveReview(-1)} aria-label="Previous review"><ArrowLeftOutlined /></button>
            <div>
              {reviews.map((review, index) => (
                <button
                  className={index === activeReview ? 'active' : ''}
                  type="button"
                  aria-label={`Show review ${index + 1}`}
                  onClick={() => setActiveReview(index)}
                  key={review[0]}
                />
              ))}
            </div>
            <button type="button" onClick={() => moveReview(1)} aria-label="Next review"><ArrowRightOutlined /></button>
          </div>
        </article>
        <div className="review-mini-stack">
          {reviews.map((review, index) => (
            <button
              className={index === activeReview ? 'active' : ''}
              type="button"
              onClick={() => setActiveReview(index)}
              key={`${review[0]}-mini`}
            >
              <span>{review[0]}</span>
              <small>{review[2]}</small>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openQuestion, setOpenQuestion] = useState(0);

  return (
    <section className="faq-section section-block scroll-reveal" aria-labelledby="faq-title">
      <div className="faq-heading">
        <span className="eyebrow">Customer clarity</span>
        <h2 id="faq-title">Frequently Asked Questions</h2>
        <p>Simple answers for ordering fresh local food, choosing farms, and receiving deliveries with confidence.</p>
        <button className="faq-contact" type="button" onClick={() => setRoute('/contact')}>
          Still have questions? <span>Talk to us <ArrowRightOutlined /></span>
        </button>
      </div>
      <div className="faq-list">
        {faqItems.map(([question, answer], index) => (
          <article className={openQuestion === index ? 'is-open' : ''} key={question}>
            <h3>
              <button
                className="faq-trigger"
                type="button"
                id={`faq-question-${index}`}
                aria-expanded={openQuestion === index}
                aria-controls={`faq-answer-${index}`}
                onClick={() => setOpenQuestion(openQuestion === index ? null : index)}
              >
                <span className="faq-number" aria-hidden="true">0{index + 1}</span>
                <span>{question}</span>
                <span className="faq-toggle" aria-hidden="true">
                  {openQuestion === index ? <MinusOutlined /> : <PlusOutlined />}
                </span>
              </button>
            </h3>
            <div className="faq-answer" id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`} hidden={openQuestion !== index}>
              <p>{answer}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="page-footer">
      <div className="footer-main">
        <article className="footer-brand">
          <button className="footer-logo" type="button" onClick={() => setRoute('/')}>Farm to Table</button>
          <p>Fresh local produce, premium pantry goods, and trusted farms delivered with care.</p>
          <div className="social-row" aria-label="Social links">
            <button type="button" aria-label="Facebook"><FacebookFilled /></button>
            <button type="button" aria-label="Instagram"><InstagramFilled /></button>
          </div>
        </article>
        <article className="footer-links">
          <h3>Links</h3>
          <button type="button" onClick={() => setRoute('/')}>Home</button>
          <button type="button" onClick={() => setRoute('/farms')}>Our farms</button>
          <button type="button" onClick={() => setRoute('/products')}>Products</button>
          <button type="button" onClick={() => setRoute('/account')}>My account</button>
          <button type="button" onClick={() => setRoute('/orders')}>My orders</button>
          <button type="button" onClick={() => setRoute('/saved')}>Saved favourites</button>
          <button type="button" onClick={() => setRoute('/about')}>About</button>
          <button type="button" onClick={() => setRoute('/contact')}>Contact us</button>
        </article>
        <article>
          <h3>Contact</h3>
          <p>Farm to Table<br />77 Market Street<br />Stockholm, Sweden</p>
          <p><PhoneOutlined /> +46 8 345 5678<br /><MailOutlined /> support@farmtotable.com</p>
        </article>
        <article className="footer-subscribe">
          <h3>Subscribe & Get Farm Notes</h3>
          <Input placeholder="Enter your email" suffix={<ArrowRightOutlined />} />
          <div className="stamp-row">
            <span>Organic</span><span>Local</span><span>Fresh</span>
          </div>
        </article>
      </div>
      <div className="footer-bottom">
        <p>Copyright 2026 Farm to Table. All Rights Reserved.</p>
        <p>Terms & Conditions &nbsp;&nbsp; Privacy Policy</p>
        <button
          className="footer-top-button"
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
        >
          <ArrowUpOutlined />
        </button>
      </div>
    </footer>
  );
}

function StorefrontApp() {
  const market = useMarket();
  const [route, setRouteState] = useState(getRoute);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const cartCount = market.count;
  const addToCart = market.add;

  useEffect(() => {
    const syncRoute = () => setRouteState(getRoute());
    window.addEventListener('hashchange', syncRoute);
    return () => window.removeEventListener('hashchange', syncRoute);
  }, []);

  useEffect(() => {
    const syncScroll = () => setIsScrolled(window.scrollY > 24);
    syncScroll();
    window.addEventListener('scroll', syncScroll, { passive: true });
    return () => window.removeEventListener('scroll', syncScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [route.path]);

  useEffect(() => {
    const revealItems = document.querySelectorAll('.scroll-reveal, .image-reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -6% 0px' });

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [route.path, activeCategory]);

  const renderedProducts = useMemo(() => productData, []);

  let page = <HomePage products={renderedProducts} activeCategory={activeCategory} setActiveCategory={setActiveCategory} onAdd={addToCart} />;

  if (route.path === '/farms') {
    page = <FarmsPage params={route.params} />;
  } else if (route.path === '/products') {
    page = <ProductsPage params={route.params} />;
  } else if (route.path.startsWith('/product/')) {
    page = <ProductDetailsPage key={route.path} slug={route.path.replace('/product/', '')} />;
  } else if (route.path === '/cart') {
    page = <CartPage />;
  } else if (route.path === '/checkout') {
    page = <CheckoutPage />;
  } else if (route.path === '/payment') {
    page = <PaymentPage />;
  } else if (route.path === '/confirmation') {
    page = <ConfirmationPage params={route.params} />;
  } else if (route.path.startsWith('/farm/')) {
    page = <FarmPage key={route.path} farmId={route.path.replace('/farm/', '')} />;
  } else if (route.path === '/account') {
    page = <AccountPage />;
  } else if (route.path === '/orders' || route.path.startsWith('/orders/')) {
    page = <OrdersPage orderId={route.path.startsWith('/orders/') ? route.path.slice(8) : undefined} />;
  } else if (['/auth/login', '/auth/register', '/auth/forgot-password'].includes(route.path)) {
    page = <AuthPage key={route.path} mode={route.path.split('/').pop()} params={route.params} />;
  } else if (route.path === '/saved') {
    page = <SavedPage />;
  } else if (route.path === '/about') {
    page = <AboutPage />;
  } else if (route.path === '/contact') {
    page = <ContactPage />;
  } else if (route.path !== '/') {
    page = <NotFound />;
  }

  return (
    <div id="top" className="page-shell">
      <Header
        route={route}
        setActiveCategory={setActiveCategory}
        cartCount={cartCount}
        isScrolled={isScrolled}
      />
      {page}
      {!["/", "/about", "/contact"].includes(route.path) && <Footer />}
      <MarketTools />
    </div>
  );
}

export default function App() { return <MarketProvider><StorefrontApp /></MarketProvider>; }
