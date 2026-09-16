import NotFoundView from '@/components/common/NotFoundView.jsx';

export const metadata = {
  title: 'Page not found'
};

/** Unknown routes fall back to the storefront "off the farm" empty state. */
export default function NotFound() {
  return <NotFoundView />;
}
