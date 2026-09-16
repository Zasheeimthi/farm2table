import { CheckCircleOutlined } from '@ant-design/icons';

const steps = ['Basket', 'Delivery', 'Confirmation'];

/** Basket → Delivery → Confirmation progress rail. */
export default function CheckoutProgress({ step }) {
  return (
    <nav className="market-progress" aria-label="Checkout progress">
      {steps.map((label, index) => (
        <span key={label} className={index === step ? 'active' : index < step ? 'complete' : ''} aria-current={index === step ? 'step' : undefined}>
          <b>{index < step ? <CheckCircleOutlined /> : index + 1}</b>
          {label}
        </span>
      ))}
    </nav>
  );
}
