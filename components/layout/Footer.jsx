"use client";

import { ArrowRightOutlined } from "@ant-design/icons";
import { ArrowUpOutlined } from "@ant-design/icons";
import { FacebookFilled } from "@ant-design/icons";
import { Input } from "antd";
import { InstagramFilled } from "@ant-design/icons";
import { MailOutlined } from "@ant-design/icons";
import { PhoneOutlined } from "@ant-design/icons";
import { useNavigate } from "@/hooks/useNavigate";
export function Footer() {
  const go = useNavigate();
  return <footer className="page-footer">
      <div className="footer-main">
        <article className="footer-brand">
          <button className="footer-logo" type="button" onClick={() => go('/')} aria-label="Farm to Table home">
            <img className="footer-logo-image" src="/storefront/farmtotable-logo-white.png" alt="Farm to Table" />
          </button>
          <p>Fresh local produce, premium pantry goods, and trusted farms delivered with care.</p>
          <div className="social-row" aria-label="Social links">
            <button type="button" aria-label="Facebook"><FacebookFilled /></button>
            <button type="button" aria-label="Instagram"><InstagramFilled /></button>
          </div>
        </article>
        <article>
          <h3>Contact</h3>
          <p>Farm to Table<br />77 Market Street<br />Stockholm, Sweden</p>
          <p><PhoneOutlined /> +46 8 345 5678<br /><MailOutlined /> support@farmtotable.com</p>
        </article>
        <article className="footer-subscribe">
          <h3>Subscribe & Get Farm Notes</h3>
          <Input placeholder="Enter your email" suffix={<ArrowRightOutlined />} />
          <div className="stamp-row">
            <span>Organic</span><span>Local</span><span>Fresh</span>
          </div>
        </article>
      </div>
      <div className="footer-bottom">
        <p>Copyright 2026 Farm to Table. All Rights Reserved.</p>
        <p>Terms & Conditions &nbsp;&nbsp; Privacy Policy</p>
        <button className="footer-top-button" type="button" onClick={() => window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })} aria-label="Back to top">
          <ArrowUpOutlined />
        </button>
      </div>
    </footer>;
}
