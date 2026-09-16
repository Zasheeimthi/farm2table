'use client';

import { routes } from '@/lib/routes.js';
import { useGo } from '@/hooks/useGo.js';
import Page from './Page.jsx';
import EmptyState from './EmptyState.jsx';

/** Fallback screen for unknown routes, products and producers. */
export default function NotFoundView() {
  const go = useGo();

  return (
    <Page>
      <div className="market-container">
        <EmptyState
          title="This path leads off the farm."
          text="The page, product, or producer you’re looking for could not be found."
          action="Back to our farms"
          onAction={() => go(routes.farms)}
        />
      </div>
    </Page>
  );
}
