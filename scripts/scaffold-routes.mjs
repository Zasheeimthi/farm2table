import fs from 'node:fs';
import path from 'node:path';
const write = (file, content) => { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, content); };
const routes = [
  ['', 'HomePage', 'home', 'Fresh food from local farms'],
  ['about', 'AboutPage', 'about', 'About us'],
  ['contact', 'ContactPage', 'contact', 'Contact us'],
  ['farms', 'FarmsPage', 'farm', 'Our farms', true],
  ['products', 'ProductsPage', 'shop', 'Products', true],
  ['cart', 'CartPage', 'cart', 'Your basket', false, true],
  ['checkout', 'CheckoutPage', 'checkout', 'Checkout', false, true],
  ['payment', 'PaymentPage', 'checkout', 'Payment', false, true],
  ['confirmation', 'ConfirmationPage', 'checkout', 'Order confirmation', true, true],
  ['account', 'AccountPage', 'account', 'Your account', false, true],
  ['orders', 'OrdersPage', 'account', 'Your orders', false, true],
  ['saved', 'SavedPage', 'account', 'Saved favourites', false, true],
];
for (const [route, component, folder, title, query, stored] of routes) {
  let content = `<${component} />`;
  if (stored) content = `<StorageReady>${content}</StorageReady>`;
  if (query) content = `<Suspense fallback={null}>${content}</Suspense>`;
  write(`app/${route ? route + '/' : ''}page.js`, `${query ? "import { Suspense } from 'react';\n" : ''}${stored ? "import { StorageReady } from '@/components/common/StorageReady';\n" : ''}import { ${component} } from '@/components/${folder}/${component}';\nexport const metadata = { title: '${title}' };\nexport default function Page() { return ${content}; }\n`);
}
for (const mode of ['login','register','forgot-password']) {
  write(`app/auth/${mode}/page.js`, `import { Suspense } from 'react';\nimport { AuthPage } from '@/components/auth/AuthPage';\nimport { StorageReady } from '@/components/common/StorageReady';\nexport const metadata = { title: '${mode === 'login' ? 'Sign in' : mode === 'register' ? 'Create account' : 'Reset password'}' };\nexport default function Page() { return <Suspense fallback={null}><StorageReady><AuthPage mode="${mode}" /></StorageReady></Suspense>; }\n`);
}
write('app/orders/[orderId]/page.js', `import { OrdersPage } from '@/components/account/OrdersPage';
import { StorageReady } from '@/components/common/StorageReady';
export const metadata = { title: 'Order details' };
export default async function Page({ params }) {
  const { orderId } = await params;
  return <StorageReady><OrdersPage key={orderId} orderId={orderId} /></StorageReady>;
}
`);
for (const [route, param, component, folder, prop] of [['farm','slug','FarmPage','farm','farmId'],['product','slug','ProductDetailsPage','product','slug']]) {
  const isFarm = route === 'farm';
  const lookup = isFarm ? 'farmData[slug]' : 'productData.find(p => slugify(p.title) === slug)';
  write(`app/${route}/[${param}]/page.js`, `import { notFound } from 'next/navigation';
import { ${component} } from '@/components/${folder}/${component}';
import { farmData, productData } from '@/lib/catalog';
import { slugify } from '@/lib/market-model';
export function generateStaticParams() { return ${isFarm ? 'Object.keys(farmData).map(slug => ({ slug }))' : 'productData.map(p => ({ slug: slugify(p.title) }))'}; }
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = ${lookup};
  return { title: item?.${isFarm ? 'name' : 'title'} || 'Not found' };
}
export default async function Page({ params }) {
  const { slug } = await params;
  if (!(${lookup})) notFound();
  return <${component} key={slug} ${prop}={slug} />;
}
`);
}
write('app/not-found.js', `import { NotFound } from '@/components/common/NotFound';\nexport default function NotFoundPage() { return <NotFound />; }\n`);
// Keep all stylesheet rules and their order; only map font names to next/font families.
for (const file of fs.readdirSync('styles')) {
  const target = `styles/${file}`;
  let css = fs.readFileSync(target, 'utf8').replace(/^@import url\('https:\/\/fonts.googleapis.com[^\n]+\n/, '');
  css = css.replace(/'Cormorant'/g, 'var(--font-cormorant)').replace(/'Instrument Sans'/g,'var(--font-instrument)').replace(/'Montserrat'/g,'var(--font-montserrat)');
  write(target, css);
}
