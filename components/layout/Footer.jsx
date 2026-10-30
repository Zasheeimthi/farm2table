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
          <button className="footer-logo" type="button" onClick={() => go('/')} aria-label="Farm to Table startsida">
            <img className="footer-logo-image" src="/brand/farm-to-table-brochure.png" alt="Farm to Table" />
          </button>
          <p>Lokal mat. Större möjligheter. Egna digitala gårdsbutiker och en gemensam marknadsplats för producenter och kunder.</p>
          <div className="social-row" aria-label="Social links">
            <button type="button" aria-label="Facebook"><FacebookFilled /></button>
            <button type="button" aria-label="Instagram"><InstagramFilled /></button>
          </div>
        </article>
        <article>
          <h3>Kontakt</h3>
          <p>Farm to Table<br />77 Market Street<br />Stockholm, Sweden</p>
          <p><PhoneOutlined /> +46 8 345 5678<br /><MailOutlined /> support@farmtotable.com</p>
        </article>
        <article className="footer-subscribe">
          <h3>Nyheter från gårdarna</h3>
          <Input placeholder="Ange din e-postadress" suffix={<ArrowRightOutlined />} />
          <div className="stamp-row">
            <span>Gårdar</span><span>Lokalt</span><span>Säsong</span>
          </div>
        </article>
      </div>
      <div className="footer-bottom">
        <p>Copyright 2026 Farm to Table. Alla rättigheter förbehållna.</p>
        <p>Allmänna villkor &nbsp;&nbsp; Integritetspolicy</p>
        <button className="footer-top-button" type="button" onClick={() => window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })} aria-label="Tillbaka till toppen">
          <ArrowUpOutlined />
        </button>
      </div>
    </footer>;
}
