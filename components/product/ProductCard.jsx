"use client";

import { HomeOutlined } from "@ant-design/icons";
import Link from "next/link";
import { PlusOutlined } from "@ant-design/icons";
import { Quantity } from "@/components/cart/Quantity.jsx";
import { categoryTabs } from "@/lib/catalog";
import { farmData } from "@/lib/catalog";
import { slugify } from "@/lib/market-model";
import { useMarket } from "@/context/MarketContext.jsx";
export function ProductCard({
  item
}) {
  const m = useMarket();
  const slug = slugify(item.title);
  const inCart = m.cart.find(l => l.slug === slug && l.pack === 'single');
  return <article className="market-product-card"><div className="market-product-image"><Link href={`/product/${slug}`}><img src={item.image} alt={item.title} loading="lazy" /></Link>{item.tag && <span className="market-product-tag">{item.tag}</span>}</div><div className="market-product-copy"><Link href={`/farm/${item.farmId}`} className="market-product-farm"><HomeOutlined /> {farmData[item.farmId].name}</Link><h3><Link href={`/product/${slug}`}>{item.title}</Link></h3><span className="market-product-category">{categoryTabs.find(c => c.id === item.category)?.label}</span><div className="market-product-bottom"><strong>{item.price}</strong>{inCart ? <Quantity value={inCart.quantity} label={item.title} onChange={q => m.updateQuantity(`${slug}:single`, q)} /> : <button className="market-add" onClick={() => m.add(item)} aria-label={`Add ${item.title}`}><PlusOutlined /> Add</button>}</div></div></article>;
}
