import { NextResponse } from 'next/server';
import { backendFetch, hasBackend, BackendError } from '@/lib/server/backend';

export const dynamic = 'force-dynamic';

/** POST /api/auth/forgot-password - trigger a reset email via your auth service. */
export async function POST(request) {
  let details;
  try {
    details = await request.json();
  } catch {
    return NextResponse.json({ message: 'Invalid JSON body' }, { status: 400 });
  }

  const email = details?.email;
  if (!email) {
    return NextResponse.json({ message: 'An email address is required.' }, { status: 400 });
  }

  if (!hasBackend()) {
    return NextResponse.json(
      { message: 'Password recovery is not connected yet. No reset email has been sent.', connected: false },
      { status: 501 }
    );
  }

  try {
    await backendFetch('/auth/forgot-password', { method: 'POST', body: { email } });
    // Always answer the same way so the endpoint cannot be used to probe accounts.
    return NextResponse.json({ sent: true, connected: true });
  } catch (error) {
    if (error instanceof BackendError && error.status === 404) {
      return NextResponse.json({ sent: true, connected: true });
    }
    return NextResponse.json(
      { message: error.message },
      { status: error instanceof BackendError ? error.status : 502 }
    );
  }
}
