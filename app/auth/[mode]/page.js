import AuthView from '@/components/auth/AuthView.jsx';

/**
 * Account screens (`/auth/login`, `/auth/register`, `/auth/forgot-password`).
 * Like the original hash router, any other mode falls back to the sign-in form.
 */
const authModes = {
  login: { title: 'Sign in' },
  register: { title: 'Create account' },
  'forgot-password': { title: 'Reset password' }
};

export function generateStaticParams() {
  return Object.keys(authModes).map((mode) => ({ mode }));
}

export async function generateMetadata({ params }) {
  const { mode } = await params;
  return { title: authModes[mode]?.title || 'Account' };
}

/** `/auth/login`, `/auth/register`, `/auth/forgot-password` (all accept `?next=` and `?form=1`). */
export default async function AuthPage({ params, searchParams }) {
  const { mode } = await params;
  const query = await searchParams;

  return (
    <AuthView
      mode={mode}
      next={typeof query.next === 'string' ? query.next : ''}
      formOpen={query.form === '1'}
    />
  );
}
