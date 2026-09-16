import Link from "next/link";
import React from "react";
export function Breadcrumb({
  items
}) {
  return <nav className="market-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link>{items.map(([label, path], i) => <React.Fragment key={`${label}-${i}`}><span>/</span>{path ? <Link href={`${path}`}>{label}</Link> : <span aria-current="page">{label}</span>}</React.Fragment>)}</nav>;
}
