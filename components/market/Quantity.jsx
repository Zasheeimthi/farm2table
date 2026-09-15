'use client';

import React from 'react';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

export default function Quantity({ value, onChange, label }) { return <div className="market-quantity"><button aria-label={`Decrease ${label} quantity`} onClick={() => onChange(value - 1)} disabled={value <= 0}><MinusOutlined /></button><span aria-live="polite">{value}</span><button aria-label={`Increase ${label} quantity`} onClick={() => onChange(value + 1)} disabled={value >= 99}><PlusOutlined /></button></div>; }
