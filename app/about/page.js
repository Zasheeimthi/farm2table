import AboutView from '@/components/content/AboutView.jsx';

export const metadata = {
  title: 'About us',
  description: 'Farm to Table connects homes with growers, dairies, butchers and fishers who care about every step from field to delivery.'
};

/** `/about` */
export default function AboutPage() {
  return <AboutView />;
}
