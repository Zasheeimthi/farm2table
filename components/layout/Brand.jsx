"use client";

export function Brand({
  onHome
}) {
  return <button className="brand-text" onClick={onHome} aria-label="Farm to Table startsida">
      <img className="brand-logo-image brand-logo-white" src="/brand/farm-to-table-brochure.png" alt="Farm to Table – Lokal mat. Större möjligheter." />
      <img className="brand-logo-image brand-logo-dark" src="/brand/farm-to-table-brochure.png" alt="Farm to Table – Lokal mat. Större möjligheter." />
    </button>;
}
