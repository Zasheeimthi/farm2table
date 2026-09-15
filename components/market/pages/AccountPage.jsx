'use client';

import React from 'react';
import { ArrowRightOutlined, EnvironmentOutlined, HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useMarket } from '@/components/providers/MarketProvider';
import Page from '@/components/market/Page';
import Heading from '@/components/market/Heading';

export default function AccountPage() { const m = useMarket(); return <Page><div className="market-container"><Heading eyebrow="Your little corner of the farm community" title={<>Make yourself <em>at home.</em></>}>Keep your favourites close and pick up where you left off.</Heading><div className="market-account-grid"><a href="/saved"><HeartOutlined /><h2>Saved favourites</h2><p>{m.saved.length} products and farms to come back to.</p><span>See favourites <ArrowRightOutlined /></span></a><a href="/orders"><ShoppingCartOutlined /><h2>My orders</h2><p>Review the checkout previews saved in this session.</p><span>View orders <ArrowRightOutlined /></span></a><button onClick={() => m.setLocationOpen(true)}><EnvironmentOutlined /><h2>Delivery location</h2><p>{m.location ? `${m.location.street}, ${m.location.city}` : 'Choose where your fresh finds should arrive.'}</p><span>{m.location ? 'Change address' : 'Add an address'} <ArrowRightOutlined /></span></button></div><section className="market-account-signin"><div><h2>A fresh start, every visit.</h2><p>Sign-in and account creation are ready for connection to your account service.</p></div><a href="/auth/login" className="market-secondary">Sign in</a><a href="/auth/register" className="market-primary">Create account <ArrowRightOutlined /></a></section></div></Page>; }
