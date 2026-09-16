'use client';

import Image from 'next/image';

/** Storefront logo lockup (white over the hero, dark once the header sticks). */
export default function Brand({ onHome }) {
  return (
    <button className="brand-text" onClick={onHome} aria-label="Farm to Table home">
      <Image className="brand-logo-image brand-logo-white" src="/storefront/farmtotable-logo-white.png" alt="Farm to Table" width={1527} height={294} sizes="200px" priority />
      <Image className="brand-logo-image brand-logo-dark" src="/storefront/farmtotable-logo-dark.png" alt="" width={1527} height={294} sizes="200px" aria-hidden="true" />
    </button>
  );
}
