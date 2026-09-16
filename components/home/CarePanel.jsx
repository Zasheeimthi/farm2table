const commitments = [
  { number: '01', title: 'Rare & pesticide-free', text: 'Small suppliers are chosen for clean growing and careful handling.' },
  { number: '02', title: 'Traceable origins', text: 'Each product clearly connects back to a named farm or producer.' },
  { number: '03', title: 'Packed lightly', text: 'Fresh deliveries use reusable boxes and simple, responsible packaging.' }
];

/** "We Care for Nature" commitment panel. */
export default function CarePanel() {
  return (
    <section className="care-panel scroll-reveal">
      <h2>We Care for Nature</h2>
      <div className="care-grid">
        {commitments.map((item) => (
          <article key={item.number}>
            <span>{item.number}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
