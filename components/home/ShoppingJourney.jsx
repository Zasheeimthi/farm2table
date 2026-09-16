import { EnvironmentOutlined, HomeOutlined, ShoppingOutlined, TruckOutlined } from '@ant-design/icons';
import { journeySteps } from '@/constants/content.js';

const stepIcons = [<EnvironmentOutlined key="location" />, <HomeOutlined key="farm" />, <ShoppingOutlined key="shop" />, <TruckOutlined key="delivery" />];

/** "How it works" — the four-step shopping journey. */
export default function ShoppingJourney() {
  return (
    <section className="shopping-journey scroll-reveal" aria-labelledby="shopping-journey-title">
      <div className="shopping-journey-heading">
        <div>
          <span className="shopping-journey-kicker">From their farm to your home</span>
          <h2 id="shopping-journey-title">How it works<span>.</span></h2>
        </div>
        <p>Fresh food. Four simple steps.</p>
      </div>
      <ol className="shopping-journey-steps">
        {journeySteps.map((step, index) => (
          <li key={step.number}>
            <div className="shopping-journey-card-top">
              <span className="shopping-journey-icon" aria-hidden="true">{stepIcons[index]}</span>
              <span className="shopping-journey-number" aria-hidden="true">0{step.number}</span>
            </div>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
