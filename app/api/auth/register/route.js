import { NextResponse } from 'next/server';
import { backendFetch, hasBackend, BackendError } from '@/lib/server/backend';

export const dynamic = 'force-dynamic';

/** POST /api/auth/register - create an account through your identity service. */
export async function POST(request) {
  let details;
  try {
    details = await request.json();
  } catch {
    return NextResponse.json({ message: 'Invalid JSON body' }, { status: 400 });
  }

  const { email, password, firstName, lastName, phone } = details ?? {};
  if (!email || !password) {
    return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
  }
  if (String(password).length < 8) {
    return NextResponse.json({ message: 'Your password must be at least 8 characters.' }, { status: 400 });
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
    const account = await backendFetch('/auth/register', {
      method: 'POST',
      body: { email, password, firstName, lastName, phone }
    });
    return NextResponse.json({ account, connected: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error instanceof BackendError ? error.status : 502 }
    );
  }
}
