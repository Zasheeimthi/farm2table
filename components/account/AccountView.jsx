'use client';

import Link from 'next/link';
import { ArrowRightOutlined, EnvironmentOutlined, HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { routes } from '@/lib/routes.js';
import { useMarket } from '@/context/MarketContext.jsx';
import Page from '@/components/common/Page.jsx';
import PageHeading from '@/components/common/PageHeading.jsx';

/** Account hub (`/account`): favourites, orders and delivery location. */
export default function AccountView() {
  const market = useMarket();

  return (
    <Page>
      <div className="market-container">
        <PageHeading eyebrow="Your little corner of the farm community" title={<>Make yourself <em>at home.</em></>}>
          Keep your favourites close and pick up where you left off.
        </PageHeading>
        <div className="market-account-grid">
          <Link href={routes.saved}>
            <HeartOutlined />
            <h2>Saved favourites</h2>
            <p>{market.saved.length} products and farms to come back to.</p>
            <span>See favourites <ArrowRightOutlined /></span>
          </Link>
          <Link href={routes.orders}>
            <ShoppingCartOutlined />
            <h2>My orders</h2>
            <p>Review the checkout previews saved in this session.</p>
            <span>View orders <ArrowRightOutlined /></span>
          </Link>
          <button onClick={() => market.setLocationOpen(true)}>
            <EnvironmentOutlined />
            <h2>Delivery location</h2>
            <p>{market.location ? `${market.location.street}, ${market.location.city}` : 'Choose where your fresh finds should arrive.'}</p>
            <span>{market.location ? 'Change address' : 'Add an address'} <ArrowRightOutlined /></span>
          </button>
        </div>
        <section className="market-account-signin">
          <div>
            <h2>A fresh start, every visit.</h2>
            <p>Sign-in and account creation are ready for connection to your account service.</p>
          </div>
          <Link href={routes.login} className="market-secondary">Sign in</Link>
          <Link href={routes.register} className="market-primary">Create account <ArrowRightOutlined /></Link>
        </section>
      </div>
    </Page>
  );
}
