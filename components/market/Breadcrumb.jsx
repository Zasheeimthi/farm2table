'use client';

import React from 'react';

export default function Breadcrumb({ items }) { return <nav className="market-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a>{items.map(([label, path], i) => <React.Fragment key={`${label}-${i}`}><span>/</span>{path ? <a href={`#${path}`}>{label}</a> : <span aria-current="page">{label}</span>}</React.Fragment>)}</nav>; }
