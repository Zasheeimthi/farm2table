export const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
export const priceOf = (product) => Number(product.price.replace(/[^0-9.]/g, ''));
export const money = (value) => `${new Intl.NumberFormat('en-SE', { minimumFractionDigits: Number.isInteger(value) ? 0 : 2, maximumFractionDigits: 2 }).format(value)} kr`;
export const packPrice = (product, pack = 'single') => Math.round(priceOf(product) * (pack === 'family' ? 2.7 : 1) * 100) / 100;
export const lineId = (product, pack = 'single') => `${slugify(product.title)}:${pack}`;
export const go = (path) => { window.location.hash = path; };
export function normalizeCart(value, products) {
  if (!Array.isArray(value)) return [];
  return value.filter((line) => line && products.some((p) => slugify(p.title) === line.slug) && ['single', 'family'].includes(line.pack) && Number.isInteger(line.quantity) && line.quantity > 0 && line.quantity <= 99)
    .filter((line, index, all) => all.findIndex((other) => other.slug === line.slug && other.pack === line.pack) === index);
}
export function changeCart(cart, product, quantity = 1, pack = 'single') {
  const slug = slugify(product.title);
  const existing = cart.find((line) => line.slug === slug && line.pack === pack);
  const nextQuantity = Math.min(99, (existing?.quantity || 0) + quantity);
  return existing ? cart.map((line) => line === existing ? { ...line, quantity: nextQuantity } : line) : [...cart, { slug, pack, quantity: nextQuantity }];
}
export function cartLines(cart, products) {
  return normalizeCart(cart, products).map((line) => {
    const product = products.find((p) => slugify(p.title) === line.slug);
    const unitPrice = packPrice(product, line.pack);
    return { ...line, product, id: lineId(product, line.pack), unitPrice, total: Math.round(unitPrice * line.quantity * 100) / 100 };
  });
}
export const subtotalOf = (lines) => Math.round(lines.reduce((sum, line) => sum + line.total, 0) * 100) / 100;
export function deliveryDates(today = new Date()) {
  return Array.from({ length: 5 }, (_, i) => {
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i + 1, 12);
    return { value: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`, label: date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }) };
  });
}
export const validAddress = (address) => Boolean(address && /\d/.test(address.street || '') && (address.city || '').trim().length >= 2 && /^\d{3}\s?\d{2}$/.test(address.postcode || ''));
