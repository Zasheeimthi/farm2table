'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRightOutlined, CheckCircleOutlined, EditOutlined, EnvironmentOutlined, PlusOutlined } from '@ant-design/icons';
import { deliveryDates, validAddress } from '@/lib/market-model.js';
import { routes } from '@/lib/routes.js';
import { useGo } from '@/hooks/useGo.js';
import { usePaymentCards } from '@/hooks/usePaymentCards.js';
import { useMarket } from '@/context/MarketContext.jsx';
import Page from '@/components/common/Page.jsx';
import PageHeading from '@/components/common/PageHeading.jsx';
import Breadcrumb from '@/components/common/Breadcrumb.jsx';
import CheckoutProgress from '@/components/common/CheckoutProgress.jsx';
import OrderSummary from '@/components/cart/OrderSummary.jsx';
import CartView from '@/components/cart/CartView.jsx';
import AddressFields from './AddressFields.jsx';
import PaymentMethodSection from './PaymentMethodSection.jsx';

/** Delivery + payment details step (`/checkout`). */
export default function CheckoutView() {
  const market = useMarket();
  const go = useGo();
  const dates = deliveryDates();
  const [form, setForm] = useState(() => ({
    ...market.location,
    ...market.draft,
    date: dates.some((date) => date.value === market.draft.date) ? market.draft.date : dates[0].value,
    time: market.draft.time || '09:00–12:00'
  }));
  const [error, setError] = useState('');
  const payment = usePaymentCards();
  const submitted = useRef(false);
  const { setDraft, location: deliveryLocation } = market;

  useEffect(() => { setDraft(form); }, [form, setDraft]);
  useEffect(() => {
    if (deliveryLocation) setForm((current) => ({ ...current, ...deliveryLocation }));
  }, [deliveryLocation]);

  if (!market.lines.length) return <CartView />;

  const field = (name) => ({ value: form[name] || '', onChange: (event) => setForm({ ...form, [name]: event.target.value }) });

  const submit = (event) => {
    event.preventDefault();
    if (!validAddress(form)) {
      setError('Please check your address before placing the order.');
      return;
    }
    if (!payment.selectedCard) {
      payment.setCardError('Choose a saved card or add a new card to continue.');
      return;
    }
    if (submitted.current) return;
    submitted.current = true;
    market.setDraft(form);
    market.setLocation({ street: form.street, city: form.city, postcode: form.postcode });
    const id = `HEA-${Date.now()}`;
    const order = {
      id,
      created: new Date().toISOString(),
      lines: market.lines,
      draft: form,
      method: 'card',
      card: payment.selectedCard,
      paymentStatus: 'Payment successful',
      status: 'Payment successful'
    };
    market.setOrders((previous) => [order, ...(Array.isArray(previous) ? previous : [])]);
    market.setCart([]);
    go(`${routes.confirmation}?order=${id}`);
  };

  const addressLabel = [form.street, form.postcode, form.city].filter(Boolean).join(', ') || 'Choose an address on the map';
  const addressDetail = [form.city, form.postcode].filter(Boolean).join(' · ') || 'Sweden';

  return (
    <Page>
      <div className="market-container">
        <Breadcrumb items={[['Basket', routes.cart], ['Delivery']]} />
        <PageHeading eyebrow="A little closer to your table" title={<>Where should we <em>deliver?</em></>}>
          Add your details, delivery address, and payment method for your preview order.
        </PageHeading>
        <CheckoutProgress step={1} />
        <div className="market-checkout-layout">
          <form id="delivery-form" className="market-form" onSubmit={submit}>
            <section className="market-form-card">
              <div className="market-card-title"><span>01</span><h2>Your details</h2></div>
              <p className="market-note">
                Continue as a guest, or <Link href={routes.authWithNext('login', routes.checkout)}>sign in</Link> when account services are connected.
              </p>
              <div className="market-field-pair">
                <label>First name<input {...field('firstName')} autoComplete="given-name" required /></label>
                <label>Last name<input {...field('lastName')} autoComplete="family-name" required /></label>
              </div>
              <div className="market-field-pair">
                <label>Email address<input {...field('email')} type="email" autoComplete="email" required /></label>
                <label>Mobile number<input {...field('phone')} type="tel" autoComplete="tel" pattern="[+0-9 ()-]{7,20}" required /></label>
              </div>
            </section>

            <section className="market-form-card">
              <div className="market-card-title">
                <span>02</span><h2>Delivery address</h2>
                {(form.street || form.city) && <span className="market-selection-badge">Selected</span>}
              </div>
              <p className="market-note">Choose a saved address or search the map for a new one.</p>
              <div className="market-address-card">
                <div className="market-address-heading">
                  <EnvironmentOutlined />
                  <span><strong>{addressLabel}</strong><small>{addressDetail}</small></span>
                  {(form.street || form.city) && <em className="market-address-default">Default</em>}
                </div>
                <div className="market-address-actions">
                  <button className="market-address-selected" type="button"><CheckCircleOutlined /> Selected address</button>
                  <button className="market-secondary market-address-edit" type="button" onClick={() => market.setLocationOpen(true)}><EditOutlined /> Edit</button>
                </div>
              </div>
              <button className="market-add-address" type="button" onClick={() => market.setLocationOpen(true)}>
                <PlusOutlined /> Add new address <ArrowRightOutlined />
              </button>
              <div className="market-address-fields">
                <span className="market-subheading">Address details</span>
                <AddressFields value={form} onChange={setForm} />
                <label>Apartment or floor <small>(optional)</small><input {...field('apartment')} autoComplete="address-line2" /></label>
              </div>
              <p className="market-note">Sweden · Live delivery eligibility is not yet connected.</p>
            </section>

            <PaymentMethodSection payment={payment} number="03" />
            {error && <p role="alert" className="market-error">{error}</p>}
          </form>

          <OrderSummary lines={market.lines}>
            <div className="market-summary-meta">
              <div><span>Deliver to</span><strong>{[form.street, form.city].filter(Boolean).join(', ') || 'Choose an address'}</strong></div>
              <div><span>Pay with</span><strong>{payment.selectedCard ? `${payment.selectedCard.brand} •••• ${payment.selectedCard.last4}` : 'Choose a card'}</strong></div>
            </div>
            <button className="market-primary" type="submit" form="delivery-form">Place order <ArrowRightOutlined /></button>
            <p className="market-summary-note">Card details are handled securely by Stripe. This preview does not submit payment.</p>
            <Link className="market-summary-back" href={routes.cart}>Back to basket</Link>
          </OrderSummary>
        </div>
      </div>
    </Page>
  );
}
