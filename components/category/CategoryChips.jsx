"use client";

import { categoryTabs } from "@/lib/catalog";
export function CategoryChips({
  value,
  onChange,
  available
}) {
  return <div className="market-chips" aria-label="Categories">{categoryTabs.filter(c => !available || c.id === 'all' || available.includes(c.id)).map(c => <button key={c.id} className={c.id === value ? 'selected' : ''} aria-pressed={c.id === value} onClick={() => onChange(c.id)}>{c.icon}{c.id === 'all' ? 'All categories' : c.label}</button>)}</div>;
}
