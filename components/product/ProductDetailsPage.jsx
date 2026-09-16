"use client";

import { ArrowRightOutlined } from "@ant-design/icons";
import { Breadcrumb } from "@/components/layout/Breadcrumb.jsx";
import { EnvironmentOutlined } from "@ant-design/icons";
import { HeartOutlined } from "@ant-design/icons";
import { HomeOutlined } from "@ant-design/icons";
import Link from "next/link";
import { NotFound } from "@/components/common/NotFound.jsx";
import { Page } from "@/components/layout/Page.jsx";
import { ProductCard } from "@/components/product/ProductCard.jsx";
import { Quantity } from "@/components/cart/Quantity.jsx";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { TruckOutlined } from "@ant-design/icons";
import { categoryTabs } from "@/lib/catalog";
import { farmData } from "@/lib/catalog";
import { money } from "@/lib/market-model";
import { packPrice } from "@/lib/market-model";
import { productData } from "@/lib/catalog";
import { slugify } from "@/lib/market-model";
import { useMarket } from "@/context/MarketContext.jsx";
import { useState } from "react";
export function ProductDetailsPage({
  slug
}) {
  const m = useMarket();
  const product = productData.find(p => slugify(p.title) === slug);
  const [quantity, setQuantity] = useState(1);
  const [pack, setPack] = useState('single');
  const [photo, setPhoto] = useState(0);
  if (!product) return <NotFound />;
  const f = farmData[product.farmId];
  const photos = [{
    src: product.image,
    label: product.title
  }, {
    src: f.image,
    label: `Meet ${f.name}`
  }];
  const total = packPrice(product, pack) * quantity;
  const related = productData.filter(p => p.farmId === product.farmId && p.title !== product.title).slice(0, 4);
  return <Page className="market-detail"><div className="market-container"><Breadcrumb items={[['Farms', '/farms'], [f.name, `/farm/${product.farmId}`], [product.title]]} /><div className="market-detail-grid"><div className="market-gallery"><div className={`market-main-photo ${photo === 1 ? 'is-farm' : ''}`}><img src={photos[photo].src} alt={photos[photo].label} />{product.tag && <span className="market-product-tag">{product.tag}</span>}</div><div className="market-thumbnails">{photos.map((p, i) => <button key={p.src} className={photo === i ? 'selected' : ''} onClick={() => setPhoto(i)} aria-label={`Show ${p.label}`} aria-pressed={photo === i}><img src={p.src} alt="" /><span>{i === 0 ? 'The product' : 'The producer'}</span></button>)}</div><div className="market-assurances"><span><HomeOutlined /> Named producer</span><span><TruckOutlined /> Carefully packed</span><span><HeartOutlined /> Made with care</span></div></div><article className="market-detail-copy"><span className="market-kicker">{categoryTabs.find(c => c.id === product.category)?.label}</span><h1>{product.title}</h1><Link className="market-origin" href={`/farm/${product.farmId}`}><img src={f.image} alt="" /><span><small>Fresh from</small><strong>{f.name}</strong><small><EnvironmentOutlined /> {f.location}</small></span><ArrowRightOutlined /></Link><p>{f.summary}</p><div className="market-detail-price"><strong>{money(packPrice(product, pack))}</strong><span>per {pack === 'family' ? '3-pack bundle' : 'pack'}</span></div><fieldset className="market-pack-options"><legend>Choose your pack</legend>{['single', 'family'].map(value => <label key={value} className={pack === value ? 'selected' : ''}><input type="radio" name="pack" value={value} checked={pack === value} onChange={() => setPack(value)} /><span><strong>{value === 'single' ? 'Single pack' : '3-pack bundle'}</strong><small>{value === 'single' ? 'Just what you need' : 'Save 10% on three packs'}</small></span><b>{money(packPrice(product, value))}</b></label>)}</fieldset><div className="market-detail-buy"><Quantity value={quantity} onChange={q => setQuantity(Math.max(1, q))} label={product.title} /><button className="market-primary" onClick={() => m.add(product, quantity, pack, true)}><ShoppingCartOutlined /> Add to basket · {money(total)}</button></div><button className="market-delivery-check" onClick={() => m.setLocationOpen(true)}><EnvironmentOutlined /><span>{m.location ? `Delivery address: ${m.location.city} ${m.location.postcode}` : 'Choose your delivery location'}<small>Confirm your address before adding to your basket</small></span><ArrowRightOutlined /></button><div className="market-detail-sections"><details open><summary>About this product</summary><p>{product.title}, selected from {f.name}. {f.summary} The price shown is for the labelled pack; a bundle contains three of the same pack.</p></details><details><summary>Delivery & storage</summary><p>Choose an available preview delivery day at checkout. Follow the storage and use-by instructions on the product label. Live delivery coverage and stock must be confirmed when ordering is connected.</p></details></div></article></div><section className="market-related"><div className="market-section-heading"><div><span className="eyebrow">Keep it in the farm family</span><h2>More from {f.name}.</h2></div><Link href={`/farm/${product.farmId}`} className="market-link">Visit the farm <ArrowRightOutlined /></Link></div><div className="market-product-grid four">{related.map(p => <ProductCard key={p.title} item={p} />)}</div>{!related.length && <Link className="market-link" href="/products">Discover products from other farms <ArrowRightOutlined /></Link>}</section></div></Page>;
}
