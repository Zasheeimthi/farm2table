'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeftOutlined, ArrowRightOutlined, SafetyOutlined } from '@ant-design/icons';
import { routes } from '@/lib/routes.js';
import { useGo } from '@/hooks/useGo.js';
import { useMarket } from '@/context/MarketContext.jsx';
import Page from '@/components/common/Page.jsx';
import OrderSummary from '@/components/cart/OrderSummary.jsx';
import CatalogImage from '@/components/common/CatalogImage.jsx';

/**
 * Sign in / register / forgot-password (`/auth/[mode]`).
 *
 * `next` and the checkout gate come from the URL, so the checkout short-cut
 * ("Log in to continue" with the basket summary) still works exactly as before.
 */
export default function AuthView({ mode = 'login', next: nextParam = '', formOpen = false }) {
  const market = useMarket();
  const go = useGo();
  const [error, setError] = useState('');
  const [show, setShow] = useState(false);

  const register = mode === 'register';
  const reset = mode === 'forgot-password';
  const checkoutGate = !register && !reset && nextParam === '/checkout' && !formOpen;
  const next = nextParam === '/checkout' ? '/checkout' : '/farms';

  const submit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (register && data.get('password') !== data.get('confirm')) {
      setError('Your passwords do not match. Please try again.');
      return;
    }
    if (!register && !reset) {
      market.setAuthenticated(true);
      go(next);
      return;
    }
    setError(reset
      ? 'Password recovery is not connected yet. No reset email has been sent.'
      : 'Account services are not connected yet. You can continue browsing and try checkout as a guest.');
  };

  if (checkoutGate) {
    return (
      <Page className="market-checkout-gate">
        <div className="market-container">
          <div className="market-checkout-gate-layout">
            <section className="market-form-card market-login-card">
              <span className="market-login-icon"><SafetyOutlined /></span>
              <div>
                <span className="eyebrow">Account</span>
                <h1>Log in to continue</h1>
                <p>Sign in or create an account to continue with delivery and payment details.</p>
              </div>
              <h2>Sign in to continue checkout.</h2>
              <p>Log in to choose your delivery address and payment option while your basket summary stays available here.</p>
              <button className="market-primary" type="button" onClick={() => go(routes.authWithNext('login', routes.checkout, true))}>
                Login to continue <ArrowRightOutlined />
              </button>
              <p className="market-login-create">
                New here? <Link href={routes.authWithNext('register', routes.checkout)}>Create an account</Link>
              </p>
            </section>
            <OrderSummary lines={market.lines} />
          </div>
        </div>
      </Page>
    );
  }

  return (
    <Page className="market-auth">
      <div className="market-auth-visual">
        <CatalogImage
          src="/storefront/hero-swedish-farmhouse.jpg"
          alt="Farmhouse surrounded by green fields"
          sizes="(max-width: 900px) 100vw, 50vw"
          priority
        />
        <div>
          <span className="eyebrow">Fresh · local · together</span>
          <h1>Good food starts<br />with <em>good farms.</em></h1>
          <p>A community of independent producers.<br />A better connection to your food.</p>
        </div>
      </div>
      <div className="market-auth-copy">
        <Link className="market-link" href={routes.home}><ArrowLeftOutlined /> Back to home</Link>
        <h2>{reset ? 'Forgot your password?' : register ? 'Join the farm community.' : 'Welcome back.'}</h2>
        <p>
          {reset
            ? 'Enter the email address linked to your account.'
            : register
              ? 'A little closer to the people who grow your food.'
              : 'Your favourite farms are waiting for you.'}
        </p>
        <form className="market-form" onSubmit={submit}>
          {register && (
            <div className="market-field-pair">
              <label>First name<input name="firstName" autoComplete="given-name" required /></label>
              <label>Last name<input name="lastName" autoComplete="family-name" required /></label>
            </div>
          )}
          <label>Email address<input name="email" type="email" autoComplete="email" required /></label>
          {register && <label>Mobile number<input name="phone" type="tel" autoComplete="tel" required pattern="[+0-9 ()-]{7,20}" /></label>}
          {!reset && (
            <>
              <label>
                Password
                <div className="market-password">
                  <input
                    name="password"
                    type={show ? 'text' : 'password'}
                    autoComplete={register ? 'new-password' : 'current-password'}
                    minLength={register ? 8 : 1}
                    required
                  />
                  <button type="button" onClick={() => setShow(!show)} aria-label={show ? 'Hide password' : 'Show password'}>
                    {show ? 'Hide' : 'Show'}
                  </button>
                </div>
              </label>
              {register
                ? <label>Confirm password<input name="confirm" type={show ? 'text' : 'password'} autoComplete="new-password" minLength={8} required /></label>
                : <Link className="market-link" href={routes.forgotPassword}>Forgot password?</Link>}
            </>
          )}
          {error && <p className="market-error" role="alert">{error}</p>}
          <button className="market-primary" type="submit">
            {reset ? 'Send reset link' : register ? 'Create account' : 'Sign in'} <ArrowRightOutlined />
          </button>
        </form>
        <p className="market-note">Account services are not connected in this preview. No credentials are stored or submitted.</p>
        <p>
          {reset
            ? <Link href={routes.login}>Back to sign in</Link>
            : register
              ? <>Already have an account? <Link href={routes.authWithNext('login', next)}>Sign in</Link></>
              : <>New around here? <Link href={routes.authWithNext('register', next)}>Create account</Link></>}
        </p>
        <Link className="market-secondary" href={next}>
          {next === '/checkout' ? 'Continue checkout as a guest' : 'Explore farms as a guest'} <ArrowRightOutlined />
        </Link>
      </div>
    </Page>
  );
}
