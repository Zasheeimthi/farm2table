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
  id, locale = "en"
}) {
  const original = farmData[id];
  const swedish = {
    solmarka: { location: 'Blekede, Sverige', summary: 'Upptäck Solmarka Farms sortiment av mejeriprodukter och grönsaker. Läs mer om gården och hitta dina favoriter i gårdsbutiken.' },
    hagshult: { location: 'Småland, Sverige', summary: 'Lär känna Hagshult Grasslands och människorna bakom gården. Utforska sortimentet och läs om verksamheten på gårdens egen sida.' },
    bjare: { location: 'Bjärehalvön', summary: 'Upptäck Bjäre Chicken Farm och gårdens produkter. Besök gårdsbutiken för att se sortiment och information om producenten.' },
  };
  const f = locale === 'sv' ? { ...original, ...swedish[id] } : original;
  const labels = { 'meat-fish': 'Kött, fågel & fisk', dairy: 'Mejeri & ost', vegetables: 'Grönsaker & rotfrukter', pantry: 'Skafferi', drinks: 'Drycker', kitchen: 'Till köket' };
  const products = productData.filter(p => p.farmId === id);
  const categories = [...new Set(products.map(p => p.category))];
  return <article className="market-farm-card"><div className="market-farm-image"><Link href={`/farm/${id}`}><img src={f.image} alt={f.name} loading="lazy" /></Link><span className="market-farm-badge"><HomeOutlined /> {locale === 'sv' ? 'Möt producenten' : id === 'farmtable' ? 'Partner collection' : 'Meet the producer'}</span><SaveButton id={`farm:${id}`} label={f.name} /></div><div className="market-farm-copy"><span className="market-kicker"><EnvironmentOutlined /> {f.location}</span><h2><Link href={`/farm/${id}`}>{f.name}</Link></h2><p>{f.summary}</p><div className="market-farm-actions"><div className="market-tags">{categories.slice(0, 2).map(c => <span key={c}>{locale === 'sv' ? labels[c] : categoryTabs.find(tab => tab.id === c)?.label}</span>)}</div><Link className="market-farm-bottom" href={`/farm/${id}`} aria-label={`Shop ${f.name}`}><span>{locale === 'sv' ? 'Handla från gården' : 'Shop farm'} <ArrowRightOutlined /></span></Link></div></div></article>;
}
