import React from 'react';
import Link from 'next/link';
import { routes } from '@/lib/routes.js';

/** Trail used on every marketplace screen. Items are `[label, href]` pairs. */
export default function Breadcrumb({ items }) {
  return (
    <nav className="market-breadcrumb" aria-label="Breadcrumb">
      <Link href={routes.home}>Home</Link>
      {items.map(([label, path], index) => (
        <React.Fragment key={`${label}-${index}`}>
          <span>/</span>
          {path ? <Link href={path}>{label}</Link> : <span aria-current="page">{label}</span>}
        </React.Fragment>
      ))}
    </nav>
  );
}
