'use client';

import React from 'react';
import { CheckCircleOutlined } from '@ant-design/icons';

export default function Progress({ step }) { return <nav className="market-progress" aria-label="Checkout progress">{['Basket', 'Delivery', 'Confirmation'].map((label, i) => <span key={label} className={i === step ? 'active' : i < step ? 'complete' : ''} aria-current={i === step ? 'step' : undefined}><b>{i < step ? <CheckCircleOutlined /> : i + 1}</b>{label}</span>)}</nav>; }
