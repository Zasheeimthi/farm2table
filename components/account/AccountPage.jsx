"use client";

import { ArrowRightOutlined } from "@ant-design/icons";
import { EnvironmentOutlined } from "@ant-design/icons";
import { Heading } from "@/components/layout/Heading.jsx";
import { HeartOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Page } from "@/components/layout/Page.jsx";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useMarket } from "@/context/MarketContext.jsx";
export function AccountPage() {
  const m = useMarket();
  return <Page><div className="market-container"><Heading eyebrow="Your little corner of the farm community" title={<>Make yourself <em>at home.</em></>}>Keep your favourites close and pick up where you left off.</Heading><div className="market-account-grid"><Link href="/saved"><HeartOutlined /><h2>Saved favourites</h2><p>{m.saved.length} products and farms to come back to.</p><span>See favourites <ArrowRightOutlined /></span></Link><Link href="/orders"><ShoppingCartOutlined /><h2>My orders</h2><p>Review the checkout previews saved in this session.</p><span>View orders <ArrowRightOutlined /></span></Link><button onClick={() => m.setLocationOpen(true)}><EnvironmentOutlined /><h2>Delivery location</h2><p>{m.location ? `${m.location.street}, ${m.location.city}` : 'Choose where your fresh finds should arrive.'}</p><span>{m.location ? 'Change address' : 'Add an address'} <ArrowRightOutlined /></span></button></div><section className="market-account-signin"><div><h2>A fresh start, every visit.</h2><p>Sign-in and account creation are ready for connection to your account service.</p></div><Link href="/auth/login" className="market-secondary">Sign in</Link><Link href="/auth/register" className="market-primary">Create account <ArrowRightOutlined /></Link></section></div></Page>;
}
