import React from 'react';
import { AppstoreOutlined, SkinOutlined, CoffeeOutlined, HomeOutlined, InboxOutlined, CompassOutlined, ShoppingOutlined } from '@ant-design/icons';

export const farmData = {
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

export const categoryTabs = [
  { id: 'all', label: 'All Produce', icon: <AppstoreOutlined /> },
  { id: 'meat-fish', label: 'Meat, Chicken & Fish', icon: <SkinOutlined /> },
  { id: 'dairy', label: 'Dairy & Cheese', icon: <CoffeeOutlined /> },
  { id: 'vegetables', label: 'Vegetables & Roots', icon: <HomeOutlined /> },
  { id: 'pantry', label: 'Pantry', icon: <InboxOutlined /> },
  { id: 'drinks', label: 'Drinks', icon: <CompassOutlined /> },
  { id: 'kitchen', label: 'To the Kitchen', icon: <ShoppingOutlined /> }
];

export const productData = [
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

