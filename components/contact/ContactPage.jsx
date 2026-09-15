'use client';

import React from 'react';
import { ArrowRightOutlined, CalendarOutlined, CoffeeOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import Footer from '@/components/layout/Footer';

export default function ContactPage() {
  const prepareEmail = (event) => {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const body = `${fields.get('message')}\n\nFrom: ${fields.get('name')}\nEmail: ${fields.get('email')}`;
    window.location.href = `mailto:support@farmtotable.com?subject=${encodeURIComponent('Farm to Table enquiry')}&body=${encodeURIComponent(body)}`;
  };

  return (
    <main className="page-view contact-experience">
      <section className="contact-intro section-block">
        <span className="contact-kicker">Let’s talk</span>
        <h1>Good food starts with<br />a good conversation<span>.</span></h1>
        <p>Questions about your delivery, our farms, or what’s fresh? We’re here to help.</p>
      </section>
      <section className="contact-workspace section-block" aria-label="Contact our team">
        <aside className="contact-support">
          <span className="contact-support-symbol" aria-hidden="true"><CoffeeOutlined /></span>
          <h2>A little help,<br />a human touch.</h2>
          <p>Find the right way to reach our team.</p>
          <a className="contact-method" href="mailto:support@farmtotable.com">
            <MailOutlined /><span><small>Email us</small><strong>support@farmtotable.com</strong></span><ArrowRightOutlined />
          </a>
          <a className="contact-method" href="tel:+4683455678">
            <PhoneOutlined /><span><small>Give us a call</small><strong>+46 8 345 5678</strong></span><ArrowRightOutlined />
          </a>
          <div className="contact-hours">
            <CalendarOutlined />
            <div><strong>Delivery support</strong><p>Monday–Saturday · 08:00–18:00</p></div>
          </div>
        </aside>
        <form className="contact-message" onSubmit={prepareEmail}>
          <div className="contact-message-heading"><span>We’re listening</span><h2>How can we help?</h2></div>
          <div className="contact-field-row">
            <label htmlFor="contact-name">Your name<input id="contact-name" name="name" autoComplete="name" placeholder="Full name" required /></label>
            <label htmlFor="contact-email">Email address<input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label>
          </div>
          <label htmlFor="contact-message">Your message<textarea id="contact-message" name="message" placeholder="Tell us a little about what you need…" rows={5} required /></label>
          <div className="contact-send-row">
            <p>Continue in your email app to review and send your message.</p>
            <button type="submit">Continue in email <ArrowRightOutlined /></button>
          </div>
        </form>
      </section>
      <Footer />
    </main>
  );
}
