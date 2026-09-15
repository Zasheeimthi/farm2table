'use client';

import React from 'react';
import { ArrowRightOutlined } from '@ant-design/icons';
import FarmCard from '@/components/market/FarmCard';

export default function FeaturedFarms() {
  return <section className="market-featured section-block wide"><div className="market-section-heading"><div><span className="eyebrow">Many farms. One fresh basket.</span><h2>Meet your producers.</h2><p>Good food has a story. Get to know the people behind yours.</p></div><a className="market-link" href="/farms">Explore all farms <ArrowRightOutlined /></a></div><div className="market-farm-grid">{['solmarka', 'hagshult', 'bjare'].map((id) => <FarmCard id={id} key={id} />)}</div></section>;
}
