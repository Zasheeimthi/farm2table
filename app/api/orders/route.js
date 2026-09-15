import { NextResponse } from 'next/server';
import { backendFetch, hasBackend, BackendError } from '@/lib/server/backend';
import { getCatalog } from '@/lib/server/catalog';
import { subtotalOf } from '@/lib/market-model';

export const dynamic = 'force-dynamic';

/**
 * GET /api/orders - order history for the signed-in customer.
 * Proxies to your backend when configured.
 */
export async function GET() {
  if (!hasBackend()) {
    return NextResponse.json({ orders: [], source: 'seed', message: 'Order history requires a backend.' });
  }
  try {
    const data = await backendFetch('/orders');
    return NextResponse.json({ orders: Array.isArray(data) ? data : data?.data ?? [], source: 'api' });
  } catch (error) {
    return NextResponse.json(
      { message: error.message, orders: [] },
      { status: error instanceof BackendError ? error.status : 502 }
    );
  }
}

/**
 * POST /api/orders - place an order.
 *
 * The basket is re-priced here from the server-side catalog rather than trusting
 * the totals sent by the browser, so a tampered client cannot alter the amount.
 */
export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: 'Invalid JSON body' }, { status: 400 });
  }

  const lines = Array.isArray(payload?.lines) ? payload.lines : [];
  if (!lines.length) {
    return NextResponse.json({ message: 'Your basket is empty.' }, { status: 400 });
  }

  const { productData } = await getCatalog();
  const { slugify, packPrice } = await import('@/lib/market-model');

  const priced = lines
    .map((line) => {
      const product = productData.find((p) => slugify(p.title) === line.slug);
      if (!product) return null;
      const unitPrice = packPrice(product, line.pack);
      const quantity = Math.min(99, Math.max(1, Number(line.quantity) || 1));
      return { slug: line.slug, pack: line.pack, quantity, unitPrice, total: unitPrice * quantity };
    })
    .filter(Boolean);

  if (!priced.length) {
    return NextResponse.json({ message: 'None of the basket items are available.' }, { status: 400 });
  }

  const draft = payload.draft ?? {};
  const { validAddress } = await import('@/lib/market-model');
  if (!validAddress(draft)) {
    return NextResponse.json({ message: 'Please provide a valid delivery address.' }, { status: 400 });
  }

  const order = {
    lines: priced,
    subtotal: subtotalOf(priced),
    delivery: draft,
    customer: { firstName: draft.firstName, lastName: draft.lastName, email: draft.email, phone: draft.phone },
    createdAt: new Date().toISOString()
  };

  if (!hasBackend()) {
    return NextResponse.json(
      {
        order: { id: `LOCAL-${Date.now()}`, ...order, status: 'Preview' },
        source: 'seed',
        message: 'No backend configured - this is a preview order and no payment was taken.'
      },
      { status: 201 }
    );
  }

  try {
    const created = await backendFetch('/orders', { method: 'POST', body: order });
    return NextResponse.json({ order: created, source: 'api' }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error instanceof BackendError ? error.status : 502 }
    );
  }
}
