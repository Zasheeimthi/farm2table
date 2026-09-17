"use client";

export function Brand({
  onHome
}) {
  return <button className="brand-text" onClick={onHome} aria-label="Farm to Table home">
      <img className="brand-logo-image brand-logo-product" src="/storefront/farmtotable-logo.png" alt="Farm to Table" />
    </button>;
}
