"use client";

import { ArrowRightOutlined } from "@ant-design/icons";
import { EnvironmentOutlined } from "@ant-design/icons";
import { HomeOutlined } from "@ant-design/icons";
import Link from "next/link";
import { SaveButton } from "@/components/common/SaveButton.jsx";
import { categoryTabs } from "@/lib/catalog";
import { farmData } from "@/lib/catalog";
import { productData } from "@/lib/catalog";
export function FarmCard({
  id
}) {
  const f = farmData[id];
  const products = productData.filter(p => p.farmId === id);
  const categories = [...new Set(products.map(p => p.category))];
  return <article className="market-farm-card"><div className="market-farm-image"><Link href={`/farm/${id}`}><img src={f.image} alt={f.name} loading="lazy" /></Link><span className="market-farm-badge"><HomeOutlined /> {id === 'farmtable' ? 'Partner collection' : 'Meet the producer'}</span><SaveButton id={`farm:${id}`} label={f.name} /></div><div className="market-farm-copy"><span className="market-kicker"><EnvironmentOutlined /> {f.location}</span><h2><Link href={`/farm/${id}`}>{f.name}</Link></h2><p>{f.summary}</p><div className="market-farm-actions"><div className="market-tags">{categories.slice(0, 2).map(c => <span key={c}>{categoryTabs.find(tab => tab.id === c)?.label}</span>)}</div><Link className="market-farm-bottom" href={`/farm/${id}`} aria-label={`Shop ${f.name}`}><span>Shop farm <ArrowRightOutlined /></span></Link></div></div></article>;
}
