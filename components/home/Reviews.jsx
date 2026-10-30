"use client";

import { ArrowLeftOutlined } from "@ant-design/icons";
import { ArrowRightOutlined } from "@ant-design/icons";
import { StarFilled } from "@ant-design/icons";
import { useState } from "react";
export function Reviews() {
  const [activeReview, setActiveReview] = useState(0);
  const [title, text, name] = reviews[activeReview];
  const moveReview = direction => {
    setActiveReview(current => (current + direction + reviews.length) % reviews.length);
  };
  return <section className="reviews-section">
      <h2 className="scroll-reveal">Röster om lokal mat</h2>
      <div className="reviews-carousel scroll-reveal">
        <article className="review-score-card">
          <span className="eyebrow">Exempelomdömen</span>
          <strong>4.9</strong>
          <div><StarFilled /><StarFilled /><StarFilled /><StarFilled /><StarFilled /></div>
          <p>Illustration av kundomdömen. Betyget är exempeldata.</p>
        </article>
        <article className="review-feature-card">
          <div className="review-topline">
            <span><StarFilled /><StarFilled /><StarFilled /><StarFilled /><StarFilled /></span>
            <small>Exempel</small>
          </div>
          <h3>{title}</h3>
          <p>{text}</p>
          <em>{name}</em>
          <div className="review-controls" aria-label="Välj omdöme">
            <button type="button" onClick={() => moveReview(-1)} aria-label="Föregående omdöme"><ArrowLeftOutlined /></button>
            <div>
              {reviews.map((review, index) => <button className={index === activeReview ? 'active' : ''} type="button" aria-label={`Visa omdöme ${index + 1}`} onClick={() => setActiveReview(index)} key={review[0]} />)}
            </div>
            <button type="button" onClick={() => moveReview(1)} aria-label="Nästa omdöme"><ArrowRightOutlined /></button>
          </div>
        </article>
        <div className="review-mini-stack">
          {reviews.map((review, index) => <button className={index === activeReview ? 'active' : ''} type="button" onClick={() => setActiveReview(index)} key={`${review[0]}-mini`}>
              <span>{review[0]}</span>
              <small>{review[2]}</small>
            </button>)}
        </div>
      </div>
    </section>;
}
export const reviews = [['Fin kvalitet', 'Allt kom fram omsorgsfullt packat och var enkelt att ta hand om.', 'MS'], ['Nära lokala gårdar', 'Jag uppskattar att kunna se vilken gård varje produkt kommer från.', 'Sarah Smith'], ['Smaker att återvända till', 'Det är roligt att upptäcka grönsaker och mejeriprodukter från gårdarna.', 'John K']];
