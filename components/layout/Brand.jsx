"use client";

export function Brand({
  onHome
}) {
  return <button className="brand-text" onClick={onHome} aria-label="Farm to Table home">
      <img className="brand-logo-image brand-logo-white" src="/storefront/footer-white.png" alt="Farm to Table" />
      <img className="brand-logo-image brand-logo-dark" src="/storefront/farmtotable-logo-dark.png" alt="Farm to Table" />
    </button>;
}
