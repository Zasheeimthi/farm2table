'use client';

import React from 'react';

export default function Page({ children, className = '' }) { return <main id="main-content" className={`page-view marketplace ${className}`}>{children}</main>; }
