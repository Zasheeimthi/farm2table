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
      <h2 className="scroll-reveal">Real Reviews From Real Customers</h2>
      <div className="reviews-carousel scroll-reveal">
        <article className="review-score-card">
          <span className="eyebrow">Verified buyers</span>
          <strong>4.9</strong>
          <div><StarFilled /><StarFilled /><StarFilled /><StarFilled /><StarFilled /></div>
          <p>Based on 3,442 fresh delivery reviews.</p>
        </article>
        <article className="review-feature-card">
          <div className="review-topline">
            <span><StarFilled /><StarFilled /><StarFilled /><StarFilled /><StarFilled /></span>
            <small>3 days ago</small>
          </div>
          <h3>{title}</h3>
          <p>{text}</p>
          <em>{name}</em>
          <div className="review-controls" aria-label="Review carousel controls">
            <button type="button" onClick={() => moveReview(-1)} aria-label="Previous review"><ArrowLeftOutlined /></button>
            <div>
              {reviews.map((review, index) => <button className={index === activeReview ? 'active' : ''} type="button" aria-label={`Show review ${index + 1}`} onClick={() => setActiveReview(index)} key={review[0]} />)}
            </div>
            <button type="button" onClick={() => moveReview(1)} aria-label="Next review"><ArrowRightOutlined /></button>
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
export const reviews = [['Excellent quality', 'Everything arrived cold, clean, and beautifully packed.', 'MS'], ['Trusted local farms', 'I love seeing which farm each product comes from.', 'Sarah Smith'], ['Fresh and reliable', 'The vegetables and dairy feel premium every week.', 'John K']];
