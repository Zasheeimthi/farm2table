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

const farmData = {
  solmarka: {
    name: 'Solmarka Farm',
    location: 'Blekede, Sweden',
    image: '/storefront/farm-detail-hero-solmarka.jpg',
    summary: 'A biodynamic farm growing seasonal vegetables, dairy, and small-batch fresh food with soil-first methods.',
    practices: ['Biodynamic', 'Organic', 'Seasonal harvest', 'Reusable boxes']
  },
  hagshult: {
    name: 'Hagshult Grasslands',
    location: 'Smaland, Sweden',
    image: '/ferme/6293.jpg',
    summary: 'Pasture-raised cattle from open grassland, focused on slow growth, welfare, and rich flavor.',
    practices: ['Grass-fed', 'Small scale', 'Traceable meat', 'Low waste']
  },
  bjare: {
    name: 'Bjare Chicken Farm',
    location: 'Bjare Peninsula',
    image: '/storefront/farm-sunny-side-clean.jpg',
    summary: 'Slow-growing chicken raised with generous space, clean feed, and careful regional delivery.',
    practices: ['Slow grown', 'Free range', 'Protein rich', 'Fresh packed']
  },
  hiddenfjord: {
    name: 'Hiddenfjord Fishery',
    location: 'Faroe Islands',
    image: '/storefront/farm-pure-roots-clean.jpg',
    summary: 'Premium salmon handled with cold-chain care and selected for clean texture and dependable quality.',
    practices: ['Cold chain', 'Seafood', 'Premium cuts', 'Fresh delivery']
  },
  almnas: {
    name: 'Almnas Dairy',
    location: 'Vastergotland',
    image: '/storefront/farm-heritage-clean.jpg',
    summary: 'Heritage dairy makers producing aged cheese and cultured products with a refined, local character.',
    practices: ['Aged cheese', 'Cultured dairy', 'Local makers', 'Rich flavor']
  },
  alvas: {
    name: 'Alvas Naturbete',
    location: 'Halland',
    image: '/ferme/visit-cow.jpg',
    summary: 'A pasture-focused dairy partner producing clean fermented staples from carefully managed herds.',
    practices: ['Pasture dairy', 'Fermented', 'Fresh milk', 'Small batch']
  },
  guldhaven: {
    name: 'Guldhaven',
    location: 'Kalix Coast',
    image: '/ferme/bundle-cheese.jpg',
    summary: 'Northern seafood specialists supplying delicate roe and carefully packed coastal produce.',
    practices: ['Coastal', 'Specialty seafood', 'Premium', 'Chilled delivery']
  },
  farmtable: {
    name: 'Farm to Table Market',
    location: 'Local partner network',
    image: '/storefront/hero-produce.jpg',
    summary: 'Curated bundles and pantry essentials assembled from nearby partner farms for weekly delivery.',
    practices: ['Curated boxes', 'Pantry', 'Kitchen goods', 'Weekly delivery']
  }
};

const categoryTabs = [
  { id: 'all', label: 'All Produce', icon: <AppstoreOutlined /> },
  { id: 'meat-fish', label: 'Meat, Chicken & Fish', icon: <SkinOutlined /> },
  { id: 'dairy', label: 'Dairy & Cheese', icon: <CoffeeOutlined /> },
  { id: 'vegetables', label: 'Vegetables & Roots', icon: <HomeOutlined /> },
  { id: 'pantry', label: 'Pantry', icon: <InboxOutlined /> },
  { id: 'drinks', label: 'Drinks', icon: <CompassOutlined /> },
  { id: 'kitchen', label: 'To the Kitchen', icon: <ShoppingOutlined /> }
];

const productData = [
  { title: 'Low-Pasteurized Whole Milk 1L', category: 'dairy', farmId: 'solmarka', price: '56 kr', image: '/ferme/product-milk.jpg', tag: 'Organic' },
  { title: 'Grassland Yoghurt 1L', category: 'dairy', farmId: 'alvas', price: '56 kr', image: '/ferme/product-kefir.jpg', tag: 'Fresh' },
  { title: 'Biodynamic Yoghurt 1L', category: 'dairy', farmId: 'solmarka', price: '56 kr', image: '/ferme/product-kefir.jpg' },
  { title: 'Biodynamic Vegetable Box', category: 'vegetables', farmId: 'solmarka', price: '279 kr', image: '/ferme/product-sprouts.jpg', tag: 'Box' },
  { title: 'Grass-Fed Minced Beef 500g', category: 'meat-fish', farmId: 'hagshult', price: '172 kr', image: '/ferme/fresh-beef-cubes.png' },
  { title: 'Grass-Fed Minced Beef Box 4kg', category: 'meat-fish', farmId: 'hagshult', price: '1 256 kr', image: '/ferme/assortment-raw-meat-cuts.png', tag: 'Family' },
  { title: 'Organic Ribeye Grass-Fed Beef', category: 'meat-fish', farmId: 'farmtable', price: 'From 213 kr', image: '/ferme/fresh-beef-cubes.png' },
  { title: 'Organic Grass-Fed Starter Meat Box', category: 'meat-fish', farmId: 'farmtable', price: '1 144 kr', image: '/ferme/assortment-raw-meat-cuts.png', tag: 'Bundle' },
  { title: 'Organic Beef Stew Cuts 500g', category: 'meat-fish', farmId: 'farmtable', price: '147 kr', image: '/ferme/fresh-beef-cubes.png' },
  { title: 'Organic Tenderloin Grass-Fed Beef', category: 'meat-fish', farmId: 'farmtable', price: 'From 327 kr', image: '/ferme/fresh-beef-cubes.png' },
  { title: 'Organic Minced Beef 450g', category: 'meat-fish', farmId: 'farmtable', price: '133 kr', image: '/ferme/fresh-beef-cubes.png' },
  { title: 'Organic New Potatoes 1kg', category: 'vegetables', farmId: 'solmarka', price: '51 kr', image: '/ferme/product-avocado.jpg' },
  { title: 'Biodynamic Potatoes 1kg', category: 'vegetables', farmId: 'solmarka', price: '37 kr', image: '/ferme/product-avocado.jpg' },
  { title: 'Organic Tomato 200g', category: 'vegetables', farmId: 'solmarka', price: '37 kr', image: '/ferme/product-avocado.jpg' },
  { title: 'Organic Cucumber', category: 'vegetables', farmId: 'solmarka', price: '32 kr', image: '/ferme/product-avocado.jpg' },
  { title: 'Organic Early Carrots Bunch', category: 'vegetables', farmId: 'solmarka', price: '46 kr', image: '/ferme/product-sprouts.jpg' },
  { title: 'Organic Fresh Corn', category: 'vegetables', farmId: 'solmarka', price: '23 kr', image: '/ferme/product-sprouts.jpg' },
  { title: 'Organic Garlic', category: 'vegetables', farmId: 'solmarka', price: '30 kr', image: '/ferme/product-sprouts.jpg' },
  { title: 'Organic Yellow Onion Bunch', category: 'vegetables', farmId: 'solmarka', price: '36 kr', image: '/ferme/product-sprouts.jpg' },
  { title: 'Organic Kale 200g', category: 'vegetables', farmId: 'solmarka', price: '30 kr', image: '/ferme/product-sprouts.jpg' },
  { title: 'Organic Zucchini', category: 'vegetables', farmId: 'solmarka', price: '26 kr', image: '/ferme/product-avocado.jpg' },
  { title: 'Organic White Cabbage 500g', category: 'vegetables', farmId: 'solmarka', price: '37 kr', image: '/ferme/product-avocado.jpg' },
  { title: 'Organic Baking Potato', category: 'vegetables', farmId: 'solmarka', price: '17 kr', image: '/ferme/product-avocado.jpg' },
  { title: 'Organic Eldost 100g', category: 'dairy', farmId: 'solmarka', price: '46 kr', image: '/ferme/product-cheese.jpg' },
  { title: 'Slow-Grown Chicken Breast Box', category: 'meat-fish', farmId: 'bjare', price: '1 189 kr', image: '/ferme/product-chicken.jpg' },
  { title: 'Slow-Grown Chicken Thigh Box', category: 'meat-fish', farmId: 'bjare', price: '1 294 kr', image: '/ferme/product-chicken.jpg' },
  { title: 'Two-Pack Chicken Breast Fillets', category: 'meat-fish', farmId: 'bjare', price: '297 kr', image: '/ferme/product-chicken.jpg' },
  { title: 'Whole Slow-Grown Chicken 1.6kg', category: 'meat-fish', farmId: 'bjare', price: '229 kr', image: '/ferme/product-chicken.jpg' },
  { title: 'Two-Pack Chicken Legs', category: 'meat-fish', farmId: 'bjare', price: '114 kr', image: '/ferme/product-chicken.jpg' },
  { title: 'Faroe Salmon Fillet 400g', category: 'meat-fish', farmId: 'hiddenfjord', price: '194 kr', image: '/storefront/category-meat-fresh.png' },
  { title: 'Faroe Salmon Fillet Box 4kg', category: 'meat-fish', farmId: 'hiddenfjord', price: '1 740 kr', image: '/storefront/category-meat-fresh.png', tag: 'Premium' },
  { title: 'Salmon Tail Cuts 200g', category: 'meat-fish', farmId: 'hiddenfjord', price: '76 kr', image: '/storefront/category-meat-fresh.png' },
  { title: 'Fresh Minced Salmon 400g', category: 'meat-fish', farmId: 'hiddenfjord', price: '145 kr', image: '/storefront/category-meat-fresh.png' },
  { title: 'Hot-Smoked Salmon 450g', category: 'meat-fish', farmId: 'hiddenfjord', price: '274 kr', image: '/storefront/category-meat-fresh.png' },
  { title: 'Cured Salmon 150g', category: 'meat-fish', farmId: 'hiddenfjord', price: '89 kr', image: '/storefront/category-meat-fresh.png' },
  { title: 'Cold-Smoked Salmon 150g', category: 'meat-fish', farmId: 'hiddenfjord', price: '89 kr', image: '/storefront/category-meat-fresh.png' },
  { title: 'Whole Salmon Side 1.9kg', category: 'meat-fish', farmId: 'hiddenfjord', price: '784 kr', image: '/storefront/category-meat-fresh.png' },
  { title: 'Kalix Roe 500g', category: 'meat-fish', farmId: 'guldhaven', price: '1 249 kr', image: '/ferme/bundle-cheese.jpg', tag: 'Rare' },
  { title: 'Biodynamic Fresh Cheese 200g', category: 'dairy', farmId: 'solmarka', price: '51 kr', image: '/ferme/product-cheese.jpg' },
  { title: 'Organic Creme Fraiche 2dl', category: 'dairy', farmId: 'alvas', price: '58 kr', image: '/ferme/product-milk.jpg' },
  { title: 'Almnas Tegel Aged Cheese', category: 'dairy', farmId: 'almnas', price: '124 kr', image: '/ferme/product-cheese.jpg' },
  { title: 'Almnas Anno 1225 Cheese', category: 'dairy', farmId: 'almnas', price: '356 kr', image: '/ferme/product-cheese.jpg' },
  { title: 'Almnas Large Format Cheese', category: 'dairy', farmId: 'almnas', price: '389 kr', image: '/ferme/product-cheese.jpg' },
  { title: 'Organic Ginger Snaps 160g', category: 'pantry', farmId: 'farmtable', price: '49 kr', image: '/ferme/product-cookies.jpg' },
  { title: 'Weekly Pantry Box', category: 'pantry', farmId: 'farmtable', price: '800 kr', image: '/ferme/product-cookies.jpg' },
  { title: 'Kitchen Glass Jar Set', category: 'kitchen', farmId: 'farmtable', price: '199 kr', image: '/ferme/bundle-cheese.jpg' },
  { title: 'Reusable Produce Bags', category: 'kitchen', farmId: 'farmtable', price: '149 kr', image: '/ferme/bundle-dairy.jpg' },
  { title: 'Blueberry & Acai Kefir 250ml', category: 'drinks', farmId: 'alvas', price: '39 kr', image: '/ferme/product-kefir.jpg' },
  { title: 'Fresh Farm Drink Selection', category: 'drinks', farmId: 'farmtable', price: 'From 89 kr', image: '/ferme/bundle-breakfast.jpg' }
];

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
  ['Can customers choose a delivery day?', 'Yes. Delivery slots can be selected during checkout based on the customer location and the weekly farm delivery schedule.'],
  ['How are chilled products handled?', 'Dairy, meat, fish, and fresh drinks are packed with cold-chain care in clean reusable delivery boxes.'],
  ['Can I view farm details before buying?', 'Yes. Farm names open a dedicated farm page with location, practices, product list, and producer story.']
];

const farmBenefits = [
  ['Chemical Free', 'No harsh chemicals, only natural farming.', <CheckCircleOutlined />],
  ['Sustainably Grown', 'Eco-friendly practices from field to box.', <CompassOutlined />],
  ['Locally Sourced', 'Fresh produce delivered from nearby farms.', <EnvironmentOutlined />],
  ['Animal Welfare', 'Humane care for every partner animal.', <HeartOutlined />],
  ['Farm Fresh', 'Harvested at peak freshness for better quality.', <TagOutlined />]
];

const supportBenefits = [
  ['Fast Delivery', 'To your doorstep', <TruckOutlined />],
  ['Secure Payments', 'Safe and trusted', <ShoppingCartOutlined />],
  ['100% Natural', 'No chemicals', <CheckCircleOutlined />],
  ['Help Center', 'We are here to help', <PhoneOutlined />]
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

function findProductBySlug(slug, products) {
  return products.find((product) => slugify(product.title) === slug);
}

function Brand({ onHome }) {
  return (
    <button className="brand-text" onClick={onHome} aria-label="Farm to Table home">
      Farm to Table
    </button>
  );
}

function Header({ route, setActiveCategory, cartCount, lastAddedSlug, isScrolled }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const nav = [
    ['Home', '/'],
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
            className={route.path === path ? 'active' : ''}
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
      </nav>
      <div className="header-actions" aria-label="Quick actions">
        <button className="header-icon-button" type="button" onClick={() => setRoute('/contact')} aria-label="Open account and support">
          <TeamOutlined />
        </button>
        <Badge count={cartCount} color="#FE5D02">
          <button
            className="header-cart-button"
            type="button"
            onClick={() => setRoute(lastAddedSlug ? `/cart?item=${lastAddedSlug}` : '/cart')}
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
      <button className="heart-btn" aria-label={`Save ${item.title}`}><HeartOutlined /></button>
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
  const [heroLocation, setHeroLocation] = useState('Uppsala, Sweden');
  const heroProducts = (activeCategory === 'all'
    ? products
    : products.filter((product) => product.category === activeCategory)
  ).slice(0, 8);

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setHeroLocation('Local delivery area');
      return;
    }

    setHeroLocation('Finding your area...');
    navigator.geolocation.getCurrentPosition(
      () => setHeroLocation('Delivery near you'),
      () => setHeroLocation('Local delivery area')
    );
  };

  const searchProducts = () => {
    setRoute(`/products?search=${encodeURIComponent(heroSearch.trim())}`);
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
                placeholder="Search Products or Categories"
                aria-label="Search products, farms or categories"
              />
            </div>
            <button className="hero-location" type="button" onClick={detectLocation}>
              <EnvironmentOutlined />
              <span>{heroLocation}</span>
            </button>
            <button className="hero-search-submit" type="submit">Explore <ArrowRightOutlined /></button>
          </form>
          <button className="hero-browse-link" type="button" onClick={() => setRoute('/products')}>
            Browse this week's harvest <ArrowRightOutlined />
          </button>
        </div>
      </section>

      <section className="category-discovery" aria-labelledby="category-discovery-title">
        <div className="category-discovery-heading">
          <div>
            <span>Good food starts here</span>
            <h2 id="category-discovery-title">Find your farm favourites.</h2>
          </div>
          <button type="button" onClick={() => { setActiveCategory('all'); setRoute('/products'); }}>Shop everything <ArrowRightOutlined /></button>
        </div>
        <div className="category-discovery-grid">
          {categoryTabs.slice(1).map((tab, index) => (
            <button className={`category-discovery-card category-tone-${index}`} type="button" key={tab.id} onClick={() => { setActiveCategory(tab.id); setRoute('/products'); }}>
              <span className="category-artwork"><CategoryArtwork category={tab.id} /></span>
              <span className="category-discovery-label">{tab.label}</span>
              <span className="category-discovery-arrow" aria-hidden="true"><ArrowRightOutlined /></span>
            </button>
          ))}
        </div>
      </section>

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
          <Button type="primary" onClick={() => { setActiveCategory('all'); setRoute('/products'); }}>View All Products</Button>
        </div>
      </section>

      <section id="about" className="farm-story section-block">
        <div className="farm-heading scroll-reveal">
          <h2>The<br />Farm</h2>
        </div>
        <div className="farm-copy scroll-reveal">
          <p>Farm to Table connects homes with growers, dairies, butchers, and fishers who care about every step from field to delivery.</p>
          <button onClick={() => setRoute('/about')}>Learn More</button>
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
          <p>The farm is open on selected weekends for families to explore fields, meet growers, and enjoy a slow day close to nature.</p>
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

function ProductsPage({ products, activeCategory, setActiveCategory, onAdd }) {
  const [searchTerm, setSearchTerm] = useState(() => getRoute().params.get('search') || '');
  const [sortOption, setSortOption] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  const categoryProducts = activeCategory === 'all'
    ? products
    : products.filter((product) => product.category === activeCategory);
  const filteredProducts = categoryProducts.filter((product) => {
    const farm = farmData[product.farmId];
    const haystack = `${product.title} ${farm.name} ${farm.location}`.toLowerCase();
    return haystack.includes(searchTerm.trim().toLowerCase());
  });
  const sortedProducts = [...filteredProducts].sort((firstProduct, secondProduct) => {
    if (sortOption === 'low-to-high' || sortOption === 'high-to-low') {
      const firstPrice = Number(firstProduct.price.replace(/[^0-9]/g, ''));
      const secondPrice = Number(secondProduct.price.replace(/[^0-9]/g, ''));
      return sortOption === 'low-to-high' ? firstPrice - secondPrice : secondPrice - firstPrice;
    }
    return 0;
  });
  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / productsPerPage));
  const activePage = Math.min(currentPage, totalPages);
  const visibleProducts = sortedProducts.slice(
    (activePage - 1) * productsPerPage,
    activePage * productsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchTerm, sortOption]);

  return (
    <main className="page-view">
      <section className="page-hero products-page-hero">
        <div className="products-page-heading">
          <span className="eyebrow products-page-eyebrow">Shop local produce</span>
          <h1>All Products</h1>
        </div>
        <p>Every item shows the farm or producer it comes from, with a curated assortment across meat, fish, dairy, vegetables, pantry, drinks, and kitchen goods.</p>
      </section>
      <section className="products-category-showcase section-block wide scroll-reveal" aria-label="Product category highlights">
        <div>
          <span className="eyebrow">Curated assortment</span>
          <h2>Shop by harvest mood</h2>
        </div>
        <div className="category-showcase-grid">
          {categoryTabs.map((tab) => {
            const total = tab.id === 'all'
              ? products.length
              : products.filter((product) => product.category === tab.id).length;
            return (
              <button
                className={activeCategory === tab.id ? 'active' : ''}
                onClick={() => setActiveCategory(tab.id)}
                type="button"
                key={tab.id}
              >
                <span>{tab.icon}</span>
                <strong>{tab.label}</strong>
                <small>{total} products</small>
              </button>
            );
          })}
        </div>
      </section>
      <section className="products-layout section-block wide">
        <aside className="filter-panel filter-panel-modern scroll-reveal">
          <h2>Assortment</h2>
          <CategoryFilter activeCategory={activeCategory} onChange={setActiveCategory} />
          <div className="sort-filter">
            <label htmlFor="sort-products">Sort by</label>
            <select id="sort-products" value={sortOption} onChange={(event) => setSortOption(event.target.value)}>
              <option value="popular">Popular</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
            </select>
          </div>
        </aside>
        <div className="products-results">
          <div className="products-toolbar">
            <Input
              prefix={<SearchOutlined />}
              placeholder="Search products or farms"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <span>{sortedProducts.length} products</span>
          </div>
          <div className="product-grid product-grid-page">
            {visibleProducts.map((product) => <ProductCard item={product} compact onAdd={onAdd} key={product.title} />)}
          </div>
          {totalPages > 1 && (
            <nav className="product-pagination" aria-label="Product pages">
              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                disabled={activePage === 1}
                aria-label="Previous page"
              >
                <ArrowLeftOutlined />
              </button>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                  className={page === activePage ? 'active' : ''}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  aria-current={page === activePage ? 'page' : undefined}
                  key={page}
                >
                  {page}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                disabled={activePage === totalPages}
                aria-label="Next page"
              >
                <ArrowRightOutlined />
              </button>
            </nav>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}

function ProductDetailsPage({ slug, products, onAdd }) {
  const product = findProductBySlug(slug, products) || products[0];
  const farm = farmData[product.farmId];
  const category = categoryTabs.find((tab) => tab.id === product.category)?.label;
  const [quantity, setQuantity] = useState(1);
  const [selectedPack, setSelectedPack] = useState('single');
  const galleryImages = [product.image, farm.image, '/storefront/hero-produce.jpg', '/ferme/farm-video.jpg'];
  const relatedProducts = products
    .filter((item) => item.category === product.category && item.title !== product.title)
    .slice(0, 4);

  return (
    <main className="page-view">
      <section className="product-detail-page section-block wide">
        <div className="breadcrumb-line">
          <button onClick={() => setRoute('/products')}>Products</button>
          <span>/</span>
          <strong>{product.title}</strong>
        </div>
        <div className="product-detail-grid">
          <div className="product-detail-gallery image-reveal">
            <div className="product-detail-media">
              {product.tag && <span className="sale-ribbon">{product.tag}</span>}
              <img src={galleryImages[0]} alt={product.title} />
            </div>
            <div className="product-detail-thumbs">
              {galleryImages.map((image, index) => (
                <img src={image} alt={`${product.title} view ${index + 1}`} key={`${image}-${index}`} />
              ))}
            </div>
            <div className="product-assurance-grid">
              <span><TruckOutlined /> Cold-chain delivery</span>
              <span><CheckCircleOutlined /> Farm verified</span>
              <span><TagOutlined /> Weekly fresh stock</span>
            </div>
          </div>
          <article className="product-detail-copy scroll-reveal">
            <div className="product-detail-kicker">
              <span className="product-category">{category}</span>
              <span><CheckCircleOutlined /> Farm verified</span>
            </div>
            <h1>{product.title}</h1>
            <p className="product-detail-intro">Premium produce selected from a trusted farm partner and packed for fresh home delivery.</p>
            <div className="product-detail-origin">
              <span><EnvironmentOutlined /> {farm.location}</span>
              <FarmLink farmId={product.farmId} />
            </div>
            <strong className="product-detail-price">{product.price}</strong>
            <div className="pack-options" aria-label="Pack size">
              <span>Choose your pack</span>
              <button className={selectedPack === 'single' ? 'active' : ''} type="button" onClick={() => setSelectedPack('single')}>
                <strong>1 pack</strong><small>{product.price}</small>
              </button>
              <button className={selectedPack === 'family' ? 'active' : ''} type="button" onClick={() => setSelectedPack('family')}>
                <strong>3 pack</strong><small>Save 10%</small>
              </button>
            </div>
            <div className="product-detail-buy-row">
              <div className="quantity-control" aria-label="Quantity selector">
                <button type="button" aria-label="Decrease quantity" onClick={() => setQuantity((value) => Math.max(1, value - 1))}><MinusOutlined /></button>
                <span>{quantity}</span>
                <button type="button" aria-label="Increase quantity" onClick={() => setQuantity((value) => value + 1)}><PlusOutlined /></button>
              </div>
              <Button type="primary" onClick={() => onAdd(product, quantity)}>Add to Cart</Button>
            </div>
            <Button className="product-farm-button" onClick={() => setRoute(`/farm/${product.farmId}`)}>View Farm</Button>
          </article>
        </div>
      </section>
      <section className="section-block wide related-products">
        <div className="section-heading">
          <h2>Similar Picks</h2>
          <Button onClick={() => setRoute('/products')}>View All Products</Button>
        </div>
        <div className="product-grid">
          {relatedProducts.map((item) => <ProductCard item={item} onAdd={onAdd} key={item.title} />)}
        </div>
      </section>
      <Footer />
    </main>
  );
}

function CartPage({ selectedSlug, products }) {
  const product = findProductBySlug(selectedSlug, products) || products[0];
  const farm = farmData[product.farmId];

  return (
    <main className="page-view">
      <section className="cart-page section-block wide">
        <span className="eyebrow">Secure checkout</span>
        <h1>Your Cart</h1>
        <div className="cart-layout">
          <article className="cart-items-card scroll-reveal">
            <div className="cart-item-row">
              <img src={product.image} alt={product.title} />
              <div>
                <span className="product-category">{categoryTabs.find((tab) => tab.id === product.category)?.label}</span>
                <h2>{product.title}</h2>
                <FarmLink farmId={product.farmId} />
                <p><EnvironmentOutlined /> {farm.location}</p>
              </div>
              <div className="quantity-control">
                <button type="button" aria-label="Decrease quantity"><MinusOutlined /></button>
                <span>1</span>
                <button type="button" aria-label="Increase quantity"><PlusOutlined /></button>
              </div>
              <strong>{product.price}</strong>
            </div>
            <button className="continue-link" type="button" onClick={() => setRoute('/products')}>
              Continue shopping
            </button>
          </article>
          <aside className="cart-summary-card scroll-reveal">
            <h2>Order Summary</h2>
            <div><span>Subtotal</span><strong>{product.price}</strong></div>
            <div><span>Delivery</span><strong>Free</strong></div>
            <div><span>Packaging</span><strong>0 kr</strong></div>
            <hr />
            <div className="cart-total"><span>Total</span><strong>{product.price}</strong></div>
            <Button type="primary" block onClick={() => setRoute(`/checkout?item=${slugify(product.title)}`)}>Proceed to Checkout</Button>
            <small>Fresh products are packed by source and delivered with cold-chain care.</small>
          </aside>
        </div>
      </section>
      <Footer />
    </main>
  );
}

function CheckoutPage({ selectedSlug, products }) {
  const product = findProductBySlug(selectedSlug, products) || products[0];

  return (
    <main className="page-view checkout-page">
      <section className="checkout-shell section-block wide">
        <div className="checkout-heading">
          <span className="eyebrow">Secure checkout</span>
          <h1>Checkout</h1>
          <p>Your details are protected and your fresh order will be packed with care.</p>
        </div>
        <div className="checkout-progress" aria-label="Checkout progress">
          <span className="active"><strong>1</strong> Delivery</span>
          <i />
          <span><strong>2</strong> Payment</span>
          <i />
          <span><strong>3</strong> Confirmation</span>
        </div>
        <div className="checkout-layout">
          <div className="checkout-form-column">
            <section className="checkout-card">
              <div className="checkout-card-heading"><span>1</span><h2>Delivery Address</h2></div>
              <div className="address-options">
                <label className="address-option selected">
                  <input type="radio" name="address" defaultChecked />
                  <span><strong>Home</strong><small>123, Green Valley Road<br />Uppsala, 755 04<br />Sweden<br /><br />+46 70 123 4567</small></span>
                  <em>Default</em>
                </label>
                <label className="address-option">
                  <input type="radio" name="address" />
                  <span><strong>Work</strong><small>Vaksalagatan 10<br />753 20 Uppsala<br />Sweden<br /><br />+46 70 987 6543</small></span>
                </label>
                <button className="add-address-option" type="button"><strong>+</strong><span>Add New Address</span></button>
              </div>
              <label className="checkout-check"><input type="checkbox" /> Deliver to a different address</label>
            </section>
            <section className="checkout-card">
              <div className="checkout-card-heading"><span>2</span><h2>Delivery Slot</h2></div>
              <div className="delivery-slot-row">
                <div className="date-options">
                  {['25', '26', '27', '28', '29'].map((date, index) => (
                    <button className={index === 0 ? 'selected' : ''} type="button" key={date}>
                      <small>{index === 0 ? 'Today' : index === 1 ? 'Tomorrow' : ['Tue', 'Wed', 'Thu'][index - 2]}</small><strong>{date}</strong>
                    </button>
                  ))}
                </div>
                <select defaultValue="9:00 AM - 11:00 AM" aria-label="Delivery time">
                  <option>9:00 AM - 11:00 AM</option>
                  <option>11:00 AM - 1:00 PM</option>
                  <option>2:00 PM - 4:00 PM</option>
                </select>
              </div>
              <small className="delivery-note">Fast delivery available</small>
            </section>
            <section className="checkout-card">
              <div className="checkout-card-heading"><span>3</span><h2>Order Notes <small>(Optional)</small></h2></div>
              <Input.TextArea rows={4} placeholder="Add order notes (e.g. gate code, special instructions)" />
            </section>
          </div>
          <aside className="checkout-summary checkout-card">
            <div className="checkout-summary-heading"><h2>Order Summary</h2><button type="button" onClick={() => setRoute(`/cart?item=${slugify(product.title)}`)}>Edit Cart</button></div>
            <div className="checkout-product-line">
              <img src={product.image} alt={product.title} />
              <span><strong>{product.title}</strong><small>{product.price}</small></span>
              <b>1</b>
            </div>
            <div className="checkout-totals"><span>Subtotal</span><strong>{product.price}</strong><span>Delivery Charge</span><strong>Free</strong><span>Packaging Charge</span><strong>0 kr</strong></div>
            <div className="checkout-total"><span>Total Amount</span><strong>{product.price}</strong><small>You are saving with free delivery</small></div>
            <Button type="primary" block onClick={() => setRoute(`/payment?item=${slugify(product.title)}`)}>Continue to Payment</Button>
            <p className="checkout-payment-note">Your payment details are encrypted and securely processed.</p>
          </aside>
        </div>
      </section>
      <Footer />
    </main>
  );
}

function PaymentPage({ selectedSlug, products }) {
  const product = findProductBySlug(selectedSlug, products) || products[0];

  return (
    <main className="page-view payment-page">
      <section className="checkout-shell section-block wide">
        <div className="payment-heading">
          <span className="eyebrow">Checkout / Payment</span>
          <h1>Payment</h1>
        </div>
        <div className="checkout-progress payment-progress" aria-label="Checkout progress">
          <span className="complete"><strong>1</strong> Delivery</span>
          <i />
          <span className="active"><strong>2</strong> Payment</span>
          <i />
          <span><strong>3</strong> Confirmation</span>
        </div>
        <div className="payment-layout">
          <div className="payment-methods">
            <section className="payment-card">
              <h2>Payment Options</h2>
              <p>Choose how you would like to pay for this order.</p>
              <label className="payment-option selected">
                <input type="radio" name="payment" defaultChecked />
                <strong className="payment-logo swish-logo">S</strong>
                <span><b>Swish</b><small>Pay instantly with Swish</small></span>
              </label>
              <label className="payment-option">
                <input type="radio" name="payment" />
                <strong className="payment-logo klarna-logo">K.</strong>
                <span><b>Klarna</b><small>Pay now or later with Klarna</small></span>
              </label>
              <Button type="primary" block onClick={() => setRoute(`/confirmation?item=${slugify(product.title)}`)}>Pay {product.price}</Button>
              <div className="payment-trust-row"><span><CheckCircleOutlined /> Encrypted and secure payment</span><span>You will review your order before confirmation.</span></div>
            </section>
          </div>
          <aside className="checkout-summary payment-summary checkout-card">
            <div className="checkout-summary-heading"><h2>Order Summary</h2><button type="button" onClick={() => setRoute(`/cart?item=${slugify(product.title)}`)}>Edit Cart</button></div>
            <div className="checkout-product-line">
              <img src={product.image} alt={product.title} />
              <span><strong>{product.title}</strong><small>{product.price}</small></span>
              <b>1</b>
            </div>
            <div className="checkout-totals"><span>Subtotal</span><strong>{product.price}</strong><span>Delivery Fee</span><strong>Free</strong><span>Discount</span><strong className="discount-value">- Free delivery</strong></div>
            <div className="checkout-total"><span>Total</span><strong>{product.price}</strong></div>
            <div className="payment-detail-box"><strong><EnvironmentOutlined /> Delivery Address</strong><button type="button">Edit</button><p>Home<br />123, Green Valley Road<br />Uppsala, Sweden</p></div>
            <div className="payment-detail-box"><strong><CalendarOutlined /> Delivery Slot</strong><button type="button">Edit</button><p>Tomorrow<br />9:00 AM - 11:00 AM</p></div>
          </aside>
        </div>
      </section>
      <Footer />
    </main>
  );
}

function ConfirmationPage({ selectedSlug, products }) {
  const product = findProductBySlug(selectedSlug, products) || products[0];

  return (
    <main className="page-view confirmation-page">
      <section className="checkout-shell section-block wide">
        <div className="confirmation-heading">
          <span className="eyebrow">Checkout / Confirmation</span>
          <h1>Order Success</h1>
        </div>
        <div className="checkout-progress confirmation-progress" aria-label="Checkout progress">
          <span className="complete"><strong>1</strong> Delivery</span>
          <i />
          <span className="complete"><strong>2</strong> Payment</span>
          <i />
          <span className="complete"><strong>3</strong> Confirmation</span>
        </div>
        <div className="confirmation-layout">
          <section className="confirmation-card">
            <div className="confirmation-mark"><CheckCircleOutlined /></div>
            <div>
              <h2>Order Placed Successfully!</h2>
              <p>Thank you for shopping with Farm to Table.</p>
            </div>
            <div className="confirmation-details">
              <span><small>Order ID</small><strong>FT2410524001</strong></span>
              <span><small>Payment Method</small><strong>Swish</strong></span>
              <span><small>Paid Amount</small><strong>{product.price}</strong></span>
              <span><small>Estimated Delivery</small><strong>Tomorrow, May 25<br />9:00 AM - 11:00 AM</strong></span>
            </div>
            <div className="confirmation-actions">
              <Button type="primary" onClick={() => setRoute(`/cart?item=${slugify(product.title)}`)}>Track Order</Button>
              <Button onClick={() => setRoute('/products')}>Continue Shopping</Button>
            </div>
          </section>
          <aside className="checkout-summary confirmation-summary checkout-card">
            <div className="checkout-summary-heading"><h2>Order Summary</h2></div>
            <div className="checkout-product-line">
              <img src={product.image} alt={product.title} />
              <span><strong>{product.title}</strong><small>{product.price}</small></span>
              <b>1</b>
            </div>
            <div className="checkout-totals"><span>Subtotal</span><strong>{product.price}</strong><span>Delivery Fee</span><strong>Free</strong><span>Packaging Charge</span><strong>0 kr</strong></div>
            <div className="checkout-total"><span>Total</span><strong>{product.price}</strong></div>
            <div className="payment-detail-box"><strong><EnvironmentOutlined /> Delivery Address</strong><p>Home<br />123, Green Valley Road<br />Uppsala, Sweden</p></div>
            <div className="payment-detail-box"><strong><CalendarOutlined /> Delivery Slot</strong><p>Tomorrow<br />9:00 AM - 11:00 AM</p></div>
          </aside>
        </div>
      </section>
      <Footer />
    </main>
  );
}

function FarmPage({ farmId, products, setActiveCategory, onAdd }) {
  const resolvedFarmId = farmData[farmId] ? farmId : 'farmtable';
  const farm = farmData[resolvedFarmId];
  const farmProducts = products.filter((product) => product.farmId === resolvedFarmId);
  const farmCategories = ['all', ...new Set(farmProducts.map((product) => product.category))];
  const [activeFarmCategory, setActiveFarmCategory] = useState('all');

  useEffect(() => {
    setActiveFarmCategory('all');
  }, [resolvedFarmId]);

  const visibleFarmProducts = activeFarmCategory === 'all'
    ? farmProducts
    : farmProducts.filter((product) => product.category === activeFarmCategory);
  const relatedFarmIds = Object.keys(farmData).filter((id) => id !== resolvedFarmId).slice(0, 5);
  const galleryImages = [
    farm.image,
    '/storefront/585.jpg',
    '/storefront/hero-produce.jpg',
    '/ferme/farm-video.jpg',
    '/ferme/visit-cow.jpg'
  ];
  const infoRows = [
    ['Location', farm.location, <EnvironmentOutlined />],
    ['Farm Size', resolvedFarmId === 'hiddenfjord' ? 'Cold-water coastal network' : '120 hectares'],
    ['Established', '2012', <CalendarOutlined />],
    ['Farmer', resolvedFarmId === 'farmtable' ? 'Local partner network' : 'Erik & Anna Johansson', <TeamOutlined />],
    ['Certifications', farm.practices.slice(0, 2).join(', '), <CheckCircleOutlined />],
    ['Business Hours', 'Mon - Sun: 08:00 AM - 06:00 PM', <CalendarOutlined />]
  ];

  return (
    <main className="page-view">
      <section className="farm-detail-top section-block wide">
        <div className="breadcrumb-line">
          <button onClick={() => setRoute('/')}>Home</button>
          <span>/</span>
          <button onClick={() => setRoute('/products')}>Products</button>
          <span>/</span>
          <strong>{farm.name}</strong>
        </div>
        <div className="farm-hero-grid">
          <article className="farm-detail-card scroll-reveal">
            <div className="farm-title-row">
              <h1>{farm.name}</h1>
              <span>Verified Farm</span>
            </div>
            <div className="farm-location-row">
              <span><EnvironmentOutlined /> {farm.location}</span>
              <span><CompassOutlined /> 3.2 km away</span>
            </div>
            <p>{farm.summary} We focus on clean produce, animal welfare, and direct farm-to-home freshness.</p>
            <div className="practice-row">
              {farm.practices.map((practice) => <span key={practice}>{practice}</span>)}
            </div>
            <div className="farm-action-row">
              <Button type="primary" onClick={() => document.getElementById('farm-products')?.scrollIntoView({ behavior: 'smooth' })}>
                View Products
              </Button>
              <Button onClick={() => setRoute('/contact')}><PhoneOutlined /> Contact Farm</Button>
            </div>
          </article>
          <div className="farm-hero-photo image-reveal">
            <img src={farm.image} alt={farm.name} />
            <div className="farm-icon-actions">
              <button aria-label={`Save ${farm.name}`}><HeartOutlined /></button>
              <button aria-label={`Share ${farm.name}`}><ShareAltOutlined /></button>
            </div>
            <div className="farm-stats">
              <span><strong>12+</strong>Years in Business</span>
              <span><strong>150+</strong>Happy Customers</span>
              <span><strong>98%</strong>Positive Reviews</span>
              <span><strong>{farmProducts.length}+</strong>Products Available</span>
            </div>
          </div>
        </div>
        <div className="farm-thumb-row">
          {galleryImages.map((image, index) => (
            <img src={image} alt={`${farm.name} gallery ${index + 1}`} key={`${image}-${index}`} />
          ))}
        </div>
      </section>

      <section className="farm-info-layout section-block wide">
        <article className="farm-content-card scroll-reveal">
          <h2>About {farm.name}</h2>
          <p>We are a family-focused farm partner dedicated to providing fresh, organic, and locally sourced food to our community. Our practices focus on sustainability, soil health, careful sourcing, and farm-level transparency.</p>
          <ul>
            <li><CheckCircleOutlined /> 100% organic fruits, vegetables, dairy, meat, and pantry staples</li>
            <li><CheckCircleOutlined /> Free-range and ethically managed animal care where applicable</li>
            <li><CheckCircleOutlined /> No synthetic pesticides or unnecessary chemical fertilizers</li>
            <li><CheckCircleOutlined /> Supporting local biodiversity and clean water initiatives</li>
            <li><CheckCircleOutlined /> Delivering farm-fresh goodness to your table</li>
          </ul>
        </article>
        <article className="farm-content-card farm-info-card scroll-reveal">
          <h2>Farm Information</h2>
          <div className="farm-info-list">
            {infoRows.map(([label, value, icon]) => (
              <div key={label}>
                <span>{icon || <HomeOutlined />}</span>
                <strong>{label}</strong>
                <p>{value}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="farm-benefits-panel section-block wide scroll-reveal">
        <h2>Why Choose {farm.name}?</h2>
        <div className="farm-benefit-grid">
          {farmBenefits.map(([title, text, icon]) => (
            <article key={title}>
              <span>{icon}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="farm-products" className="section-block wide farm-products">
        <div className="section-heading">
          <h2>Our Products</h2>
          <Button onClick={() => { setActiveCategory('all'); setRoute('/products'); }}>Back to Products</Button>
        </div>
        <div className="farm-product-tabs">
          {farmCategories.map((category) => {
            const label = category === 'all'
              ? 'All Products'
              : categoryTabs.find((tab) => tab.id === category)?.label;
            return (
              <button
                className={activeFarmCategory === category ? 'active' : ''}
                onClick={() => setActiveFarmCategory(category)}
                key={category}
              >
                {categoryTabs.find((tab) => tab.id === category)?.icon || <AppstoreOutlined />}
                {label}
              </button>
            );
          })}
        </div>
        <div className="product-grid">
          {visibleFarmProducts.map((product) => <ProductCard item={product} onAdd={onAdd} key={product.title} />)}
        </div>
      </section>

      <section className="farm-gallery-review section-block wide">
        <article className="farm-content-card gallery-card image-reveal">
          <div className="mini-heading-row">
            <h2>Farm Gallery</h2>
            <button>View All Photos</button>
          </div>
          <div className="gallery-mosaic">
            <img src={farm.image} alt={`${farm.name} wide view`} />
            <img src="/ferme/13305.jpg" alt="Farm visit" />
            <img src="/ferme/visit-cow.jpg" alt="Farm animal care" />
          </div>
        </article>
        <article className="farm-content-card customer-review-card scroll-reveal">
          <div className="mini-heading-row">
            <h2>What Our Customers Say</h2>
            <button>View All Reviews</button>
          </div>
          <div className="rating-row">
            <strong>4.8</strong>
            <span><StarFilled /><StarFilled /><StarFilled /><StarFilled /><StarFilled /></span>
            <p>(128 Reviews)</p>
          </div>
          <div className="featured-review">
            <strong>Maria Andersson</strong>
            <small>{farm.location}</small>
            <span><StarFilled /><StarFilled /><StarFilled /><StarFilled /><StarFilled /></span>
            <p>Amazing quality produce. You can really taste the difference, and everything arrives fresh, organic, and on time.</p>
          </div>
        </article>
      </section>

      <section className="farm-support-strip section-block wide scroll-reveal">
        <img src="/storefront/hero-produce.jpg" alt="Fresh produce box" />
        <article>
          <h2>Support Local Farms. Eat Fresh. Live Healthy.</h2>
          <p>When you choose local farms, you support your community and get the freshest products delivered to your door.</p>
          <Button type="primary" onClick={() => setRoute('/products')}>Explore More Farms</Button>
        </article>
        <div className="support-benefits">
          {supportBenefits.map(([title, text, icon]) => (
            <article key={title}>{icon}<strong>{title}</strong><small>{text}</small></article>
          ))}
        </div>
      </section>

      <section className="related-farms section-block wide">
        <div className="section-heading">
          <h2>You May Also Like</h2>
          <Button onClick={() => setRoute('/products')}>View All Farms</Button>
        </div>
        <div className="related-farm-grid">
          {relatedFarmIds.map((id) => {
            const related = farmData[id];
            return (
              <article className="related-farm-card scroll-reveal" key={id}>
                <button className="heart-btn" aria-label={`Save ${related.name}`}><HeartOutlined /></button>
                <img src={related.image} alt={related.name} />
                <h3>{related.name}</h3>
                <p>{related.location}</p>
                <button onClick={() => setRoute(`/farm/${id}`)}>View Farm</button>
              </article>
            );
          })}
        </div>
      </section>
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
          <button type="button" onClick={() => setRoute('/products')}>Products</button>
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

function App() {
  const [route, setRouteState] = useState(getRoute);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [cartCount, setCartCount] = useState(0);
  const [lastAddedSlug, setLastAddedSlug] = useState('');

  const addToCart = (product, quantity = 1) => {
    setCartCount((count) => count + quantity);
    setLastAddedSlug(slugify(product.title));
  };

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

  if (route.path === '/products') {
    page = <ProductsPage products={renderedProducts} activeCategory={activeCategory} setActiveCategory={setActiveCategory} onAdd={addToCart} />;
  } else if (route.path.startsWith('/product/')) {
    page = <ProductDetailsPage slug={route.path.replace('/product/', '')} products={renderedProducts} onAdd={addToCart} />;
  } else if (route.path === '/cart') {
    page = <CartPage selectedSlug={route.params.get('item')} products={renderedProducts} />;
  } else if (route.path === '/checkout') {
    page = <CheckoutPage selectedSlug={route.params.get('item')} products={renderedProducts} />;
  } else if (route.path === '/payment') {
    page = <PaymentPage selectedSlug={route.params.get('item')} products={renderedProducts} />;
  } else if (route.path === '/confirmation') {
    page = <ConfirmationPage selectedSlug={route.params.get('item')} products={renderedProducts} />;
  } else if (route.path.startsWith('/farm/')) {
    page = <FarmPage farmId={route.path.replace('/farm/', '')} products={renderedProducts} setActiveCategory={setActiveCategory} onAdd={addToCart} />;
  } else if (route.path === '/about') {
    page = <AboutPage />;
  } else if (route.path === '/contact') {
    page = <ContactPage />;
  }

  return (
    <div id="top" className="page-shell">
      <Header
        route={route}
        setActiveCategory={setActiveCategory}
        cartCount={cartCount}
        lastAddedSlug={lastAddedSlug}
        isScrolled={isScrolled}
      />
      {page}
    </div>
  );
}

export default App;
