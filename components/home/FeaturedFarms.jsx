"use client";

import { ArrowRightOutlined } from "@ant-design/icons";
import { FarmCard } from "@/components/farm/FarmCard.jsx";
import Link from "next/link";
export function FeaturedFarms() {
  return <section className="market-featured section-block wide"><div className="market-section-heading"><div><span className="eyebrow">Många gårdar. En gemensam marknadsplats.</span><h2>Möt våra producenter.</h2><p>Lokal mat har en berättelse. Lär känna människorna bakom din nästa måltid.</p></div><Link className="market-link" href="/farms">Utforska alla gårdar <ArrowRightOutlined /></Link></div><div className="market-farm-grid">{['solmarka', 'hagshult', 'bjare'].map(id => <FarmCard locale="sv" id={id} key={id} />)}</div></section>;
}
