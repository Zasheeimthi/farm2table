'use client';

import React from 'react';
import { useGo } from '@/lib/navigation';
import Page from '@/components/market/Page';
import Empty from '@/components/market/Empty';

export default function NotFound() { const go = useGo(); return <Page><div className="market-container"><Empty title="This path leads off the farm." text="The page, product, or producer you’re looking for could not be found." action="Back to our farms" onAction={() => go('/farms')} /></div></Page>; }
