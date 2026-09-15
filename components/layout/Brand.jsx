'use client';

import React from 'react';

export default function Brand({ onHome }) {
  return (
    <button className="brand-text" onClick={onHome} aria-label="Farm to Table home">
      <span className="store-brand-symbol" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none"><path d="M16 25V13m0 5C7 18 5 12 5 6c8 0 11 4 11 12Zm0-4C16 7 21 4 28 4c0 7-4 10-12 10Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><path d="M8 27h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg></span>
      <span>Farm to Table</span>
    </button>
  );
}
