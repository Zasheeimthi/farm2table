'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRightOutlined, CheckCircleOutlined, EditOutlined, EnvironmentOutlined, PlusOutlined } from '@ant-design/icons';
import { useMarket } from '@/components/providers/MarketProvider';
import { useGo } from '@/lib/navigation';
import { deliveryDates, validAddress } from '@/lib/market-model';
import { usePaymentCards } from '@/lib/use-payment-cards';
import Page from '@/components/market/Page';
import Breadcrumb from '@/components/market/Breadcrumb';
import Heading from '@/components/market/Heading';
import Progress from '@/components/market/Progress';
import OrderSummary from '@/components/market/OrderSummary';
import AddressFields from '@/components/market/AddressFields';
import PaymentMethodSection from '@/components/market/PaymentMethodSection';
import CartPage from '@/components/market/pages/CartPage';

export default function CheckoutPage() {
  const go = useGo();

  const m = useMarket(); const dates = deliveryDates();
  const [form, setForm] = useState(() => ({ ...m.location, ...m.draft, date: dates.some((d) => d.value === m.draft.date) ? m.draft.date : dates[0].value, time: m.draft.time || '09:00–12:00' }));
  const [error, setError] = useState('');
  const payment = usePaymentCards();
  const submitted = useRef(false);
  useEffect(() => { m.setDraft(form); }, [form, m.setDraft]);
  useEffect(() => { if (m.location) setForm((current) => ({ ...current, ...m.location })); }, [m.location?.street, m.location?.city, m.location?.postcode]);
  if (!m.lines.length) return <CartPage />;
  const field = (name) => ({ value: form[name] || '', onChange: (e) => setForm({ ...form, [name]: e.target.value }) });
  const submit = (e) => {
    e.preventDefault();
    if (!validAddress(form)) { setError('Please check your address before placing the order.'); return; }
    if (!payment.selectedCard) { payment.setCardError('Choose a saved card or add a new card to continue.'); return; }
    if (submitted.current) return;
    submitted.current = true;
    m.setDraft(form); m.setLocation({ street: form.street, city: form.city, postcode: form.postcode });
    const id = `HEA-${Date.now()}`;
    const order = { id, created: new Date().toISOString(), lines: m.lines, draft: form, method: 'card', card: payment.selectedCard, paymentStatus: 'Payment successful', status: 'Payment successful' };
    m.setOrders((previous) => [order, ...(Array.isArray(previous) ? previous : [])]); m.setCart([]); go(`/confirmation?order=${id}`);
  };
  const addressLabel = [form.street, form.postcode, form.city].filter(Boolean).join(', ') || 'Choose an address on the map';
  const addressDetail = [form.city, form.postcode].filter(Boolean).join(' · ') || 'Sweden';
  return <Page><div className="market-container"><Breadcrumb items={[[ 'Basket', '/cart' ], [ 'Delivery' ]]} /><Heading eyebrow="A little closer to your table" title={<>Where should we <em>deliver?</em></>}>Add your details, delivery address, and payment method for your preview order.</Heading><Progress step={1} /><div className="market-checkout-layout"><form id="delivery-form" className="market-form" onSubmit={submit}><section className="market-form-card"><div className="market-card-title"><span>01</span><h2>Your details</h2></div><p className="market-note">Continue as a guest, or <a href="/auth/login?next=/checkout">sign in</a> when account services are connected.</p><div className="market-field-pair"><label>First name<input {...field('firstName')} autoComplete="given-name" required /></label><label>Last name<input {...field('lastName')} autoComplete="family-name" required /></label></div><div className="market-field-pair"><label>Email address<input {...field('email')} type="email" autoComplete="email" required /></label><label>Mobile number<input {...field('phone')} type="tel" autoComplete="tel" pattern="[+0-9 ()-]{7,20}" required /></label></div></section><section className="market-form-card"><div className="market-card-title"><span>02</span><h2>Delivery address</h2>{(form.street || form.city) && <span className="market-selection-badge">Selected</span>}</div><p className="market-note">Choose a saved address or search the map for a new one.</p><div className="market-address-card"><div className="market-address-heading"><EnvironmentOutlined /><span><strong>{addressLabel}</strong><small>{addressDetail}</small></span>{(form.street || form.city) && <em className="market-address-default">Default</em>}</div><div className="market-address-actions"><button className="market-address-selected" type="button"><CheckCircleOutlined /> Selected address</button><button className="market-secondary market-address-edit" type="button" onClick={() => m.setLocationOpen(true)}><EditOutlined /> Edit</button></div></div><button className="market-add-address" type="button" onClick={() => m.setLocationOpen(true)}><PlusOutlined /> Add new address <ArrowRightOutlined /></button><div className="market-address-fields"><span className="market-subheading">Address details</span><AddressFields value={form} onChange={setForm} /><label>Apartment or floor <small>(optional)</small><input {...field('apartment')} autoComplete="address-line2" /></label></div><p className="market-note">Sweden · Live delivery eligibility is not yet connected.</p></section><PaymentMethodSection payment={payment} number="03" />{error && <p role="alert" className="market-error">{error}</p>}</form><OrderSummary lines={m.lines}><div className="market-summary-meta"><div><span>Deliver to</span><strong>{[form.street, form.city].filter(Boolean).join(', ') || 'Choose an address'}</strong></div><div><span>Pay with</span><strong>{payment.selectedCard ? `${payment.selectedCard.brand} •••• ${payment.selectedCard.last4}` : 'Choose a card'}</strong></div></div><button className="market-primary" type="submit" form="delivery-form">Place order <ArrowRightOutlined /></button><p className="market-summary-note">Card details are handled securely by Stripe. This preview does not submit payment.</p><a className="market-summary-back" href="/cart">Back to basket</a></OrderSummary></div></div></Page>;
}
