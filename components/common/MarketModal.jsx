'use client';

import { Modal } from 'antd';

/** Shared shell for the storefront dialogs (delivery location + search). */
export default function MarketModal({ className = '', ...props }) {
  return <Modal footer={null} className={`market-modal ${className}`.trim()} {...props} />;
}
