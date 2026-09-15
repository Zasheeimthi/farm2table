import { NextResponse } from 'next/server';
import { backendFetch, hasBackend, BackendError } from '@/lib/server/backend';

export const dynamic = 'force-dynamic';

/**
 * POST /api/auth/login
 *
 * Credentials are forwarded to your auth service from the server, so the
 * browser never talks to it directly. Wire `backendFetch` to your identity
 * provider (or issue your own session cookie here).
 */
export async function POST(request) {
  let credentials;
  try {
    credentials = await request.json();
  } catch {
    return NextResponse.json({ message: 'Invalid JSON body' }, { status: 400 });
  }

  const { email, password } = credentials ?? {};
  if (!email || !password) {
    return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
  }

  if (!hasBackend()) {
    return NextResponse.json(
      {
        message: 'Account services are not connected yet. You can continue browsing and check out as a guest.',
        connected: false
      },
      { status: 501 }
    );
  }

  try {
    const session = await backendFetch('/auth/login', { method: 'POST', body: { email, password } });
    return NextResponse.json({ session, connected: true });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error instanceof BackendError ? error.status : 502 }
    );
  }
}
