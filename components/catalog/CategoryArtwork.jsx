'use client';

import React from 'react';

export default function CategoryArtwork({ category }) {
  const artwork = {
    all: <><rect x="15" y="15" width="22" height="22" rx="5" fill="var(--category-accent)" /><rect x="47" y="15" width="22" height="22" rx="5" fill="var(--category-accent)" /><rect x="15" y="47" width="22" height="22" rx="5" fill="var(--category-accent)" /><rect x="47" y="47" width="22" height="22" rx="5" fill="var(--category-accent)" /></>,
    'meat-fish': <><path d="M14 39c13-20 35-20 48 0-13 20-35 20-48 0Z" fill="var(--category-accent)" /><path d="m62 39 13-13v26L62 39Z" fill="var(--category-accent)" /><path d="M43 23c-7 10-7 22 0 32M22 37h1" /><circle cx="25" cy="35" r="2" fill="currentColor" stroke="none" /></>,
    dairy: <><path d="M13 45 56 24l13 19v21H13V45Z" fill="var(--category-accent)" /><path d="m13 45 43 4 13-6M56 49v15" /><circle cx="27" cy="54" r="3" /><circle cx="43" cy="57" r="2" /><path d="m30 36 8 2m11-9 5 3" /></>,
    vegetables: <><path d="M51 25C28 23 24 52 15 68c20-5 47-17 43-34Z" fill="var(--category-accent)" /><path d="m50 28 1-17m4 19 16-10m-18 9 10-18M31 39l9 5m-15 7 8 5" /></>,
    pantry: <><rect x="22" y="23" width="38" height="45" rx="10" fill="var(--category-accent)" /><rect x="23" y="15" width="36" height="9" rx="3" /><path d="M23 37h36M23 56h36" /><path d="M36 47c3-6 9-6 12 0-3 6-9 6-12 0Z" /></>,
    drinks: <><path d="M30 22v12l-7 10v23h34V44l-7-10V22" fill="var(--category-accent)" /><rect x="29" y="13" width="22" height="9" rx="3" /><path d="M23 47h34M23 59h34m9-30 5-7m-3 16h8" /></>,
    kitchen: <><path d="M17 35h48v10c0 14-10 22-24 22S17 59 17 45V35Z" fill="var(--category-accent)" /><path d="M17 39H9v11h9m47-11h8v11H63M14 29h54M35 23v-5h12v5m-3 12 14-22" /></>
  };
  return <svg viewBox="0 0 84 84" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{artwork[category]}</svg>;
}
