/**
 * Storefront copy and navigation.
 *
 * Icons live with their components, so this module stays plain data and can be
 * imported from Server Components too.
 */

export const primaryNav = [
  { label: 'Home', href: '/' },
  { label: 'Farms', href: '/farms' },
  { label: 'Products', href: '/products' },
  { label: 'About', href: '/about' },
  { label: 'Contact us', href: '/contact' }
];

export const contactDetails = {
  company: 'Farm to Table',
  street: '77 Market Street',
  city: 'Stockholm, Sweden',
  phone: '+46 8 345 5678',
  phoneHref: 'tel:+4683455678',
  email: 'support@farmtotable.com'
};

export const socialLinks = [
  { label: 'Facebook', icon: 'facebook' },
  { label: 'Instagram', icon: 'instagram' }
];

export const footerStamps = ['Organic', 'Local', 'Fresh'];

/** "How it works" — icons are attached by components/home/ShoppingJourney.jsx. */
export const journeySteps = [
  { number: '1', title: 'Choose Location', text: 'Enter your delivery location' },
  { number: '2', title: 'Select Farm', text: 'Browse farms near you' },
  { number: '3', title: 'Shop Products', text: 'Add fresh products to cart' },
  { number: '4', title: 'Fast Delivery', text: 'We deliver to your doorstep' }
];

/** "Why choose Farm to Table" — icons are attached by components/home/WhyChooseSection.jsx. */
export const marketplaceBenefits = [
  { title: 'Direct from Farms', text: 'No middlemen' },
  { title: 'Farm Fresh', text: 'Picked with care' },
  { title: 'Healthy & Safe', text: 'Chemical free' },
  { title: 'Sustainable', text: 'Good for nature' }
];

export const customerReviews = [
  { title: 'Excellent quality', text: 'Everything arrived cold, clean, and beautifully packed.', name: 'MS' },
  { title: 'Trusted local farms', text: 'I love seeing which farm each product comes from.', name: 'Sarah Smith' },
  { title: 'Fresh and reliable', text: 'The vegetables and dairy feel premium every week.', name: 'John K' }
];

export const reviewSummary = { score: '4.9', note: 'Based on 3,442 fresh delivery reviews.' };

export const faqItems = [
  { question: 'Where does the produce come from?', answer: 'Every item is connected to a named farm, dairy, fishery, or local producer so customers can shop with clear origin details.' },
  { question: 'Can customers choose a delivery day?', answer: 'You can choose a delivery day and time in the checkout preview. Live availability will be confirmed when ordering is connected.' },
  { question: 'How are chilled products handled?', answer: 'Dairy, meat, fish, and fresh drinks are packed with cold-chain care in clean reusable delivery boxes.' },
  { question: 'Can I view farm details before buying?', answer: 'Yes. Farm names open a dedicated farm page with location, practices, product list, and producer story.' }
];
