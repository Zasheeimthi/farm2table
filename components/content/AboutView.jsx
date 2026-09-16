import CatalogImage from '@/components/common/CatalogImage.jsx';

const values = [
  { title: 'Quality first', text: 'We carefully select products and producers who meet our standards for freshness, quality, and responsible production.' },
  { title: 'From trusted farms', text: 'We build long-term relationships with growers and makers who care for their land, animals, and products with integrity.' },
  { title: 'Transparency matters', text: 'We want you to know more about the food you eat—from its origin to the people behind it.' },
  { title: 'Supporting farmers', text: 'When you shop with Farm to Table, you help support the livelihoods of farmers and local food producers.' },
  { title: 'Better food, better future', text: 'We believe responsible food production can benefit families, communities, and the environment alike.' },
  { title: 'Honest sourcing', text: 'Every product we feature speaks to a simpler, clearer, and more meaningful relationship between farm and table.' }
];

/** About page (`/about`) — static content, no client state. */
export default function AboutView() {
  return (
    <main className="page-view simple-page">
      <section className="page-hero about-hero">
        <div className="about-hero-copy">
          <span className="eyebrow">About Farm to Table</span>
          <h1>From our farms to your table</h1>
        </div>
        <div className="about-hero-intro">
          <p>We believe great food starts with responsible farming, honest sourcing, and a real connection between the people who grow food and the people who enjoy it.</p>
        </div>
      </section>

      <section className="about-story section-block wide">
        <div className="about-story-image image-reveal">
          <CatalogImage src="/storefront/585.jpg" alt="Farmer carrying fresh produce in a field" sizes="(max-width: 900px) 90vw, 520px" />
        </div>
        <div className="about-story-copy scroll-reveal">
          <span className="eyebrow">Our story</span>
          <h2>Farm to Table was created with one simple idea.</h2>
          <p>Good food should be more accessible, more transparent, and more connected to the people and land behind it. We wanted to create a better way to shop for food—one where you can know where it comes from, who grows it, and why it is worth choosing.</p>
          <p>Today, too much food moves through long supply chains before it reaches our homes. We are building a more thoughtful alternative: a marketplace that brings trusted farms, makers, and local producers directly to people who care about quality and origin.</p>
        </div>
      </section>

      <section className="about-values section-block wide">
        <div className="section-heading long-heading">
          <span className="eyebrow">What we believe</span>
          <h2>Fresh food, trusted farms, and a better future.</h2>
        </div>
        <div className="about-grid">
          {values.map((value) => (
            <article key={value.title}>
              <h3>{value.title}</h3>
              <p>{value.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-promise section-block wide">
        <div className="promise-panel scroll-reveal">
          <span className="eyebrow">Our promise</span>
          <h2>We make every step thoughtful.</h2>
          <p>From sourcing to delivery, we are committed to making the experience as careful, transparent, and enjoyable as possible. Our mission is simple: to bring you food you can feel good about serving to your family.</p>
          <div className="promise-quote">
            <strong>Good food. Trusted farmers. A better connection from farm to table.</strong>
          </div>
        </div>
      </section>

      <section className="about-cta section-block wide">
        <div className="cta-panel scroll-reveal">
          <span className="eyebrow">Farm to Table</span>
          <h2>Know your food. Support your farmers. Taste the difference.</h2>
        </div>
      </section>
    </main>
  );
}
