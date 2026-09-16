'use client';

import Image from 'next/image';
import { Input } from 'antd';
import {
  ArrowRightOutlined,
  ArrowUpOutlined,
  FacebookFilled,
  InstagramFilled,
  MailOutlined,
  PhoneOutlined
} from '@ant-design/icons';
import { contactDetails, footerStamps } from '@/constants/content.js';
import { routes } from '@/lib/routes.js';
import { useGo } from '@/hooks/useGo.js';

/** Shared storefront footer, rendered once from the app layout. */
export default function SiteFooter() {
  const go = useGo();

  return (
    <footer className="page-footer">
      <div className="footer-main">
        <article className="footer-brand">
          <button className="footer-logo" type="button" onClick={() => go(routes.home)} aria-label="Farm to Table home">
            <Image className="footer-logo-image" src="/storefront/farmtotable-logo-white.png" alt="Farm to Table" width={1527} height={294} sizes="200px" />
          </button>
          <p>Fresh local produce, premium pantry goods, and trusted farms delivered with care.</p>
          <div className="social-row" aria-label="Social links">
            <button type="button" aria-label="Facebook"><FacebookFilled /></button>
            <button type="button" aria-label="Instagram"><InstagramFilled /></button>
          </div>
        </article>
        <article>
          <h3>Contact</h3>
          <p>{contactDetails.company}<br />{contactDetails.street}<br />{contactDetails.city}</p>
          <p><PhoneOutlined /> {contactDetails.phone}<br /><MailOutlined /> {contactDetails.email}</p>
        </article>
        <article className="footer-subscribe">
          <h3>Subscribe &amp; Get Farm Notes</h3>
          <Input placeholder="Enter your email" suffix={<ArrowRightOutlined />} />
          <div className="stamp-row">
            {footerStamps.map((stamp) => <span key={stamp}>{stamp}</span>)}
          </div>
        </article>
      </div>
      <div className="footer-bottom">
        <p>Copyright 2026 Farm to Table. All Rights Reserved.</p>
        <p>Terms &amp; Conditions &nbsp;&nbsp; Privacy Policy</p>
        <button
          className="footer-top-button"
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
        >
          <ArrowUpOutlined />
        </button>
      </div>
    </footer>
  );
}
