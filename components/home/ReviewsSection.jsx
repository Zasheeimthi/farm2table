'use client';

import { useState } from 'react';
import { ArrowLeftOutlined, ArrowRightOutlined, StarFilled } from '@ant-design/icons';
import { customerReviews, reviewSummary } from '@/constants/content.js';

const stars = <><StarFilled /><StarFilled /><StarFilled /><StarFilled /><StarFilled /></>;

/** Customer review carousel + score card. */
export default function ReviewsSection() {
  const [activeReview, setActiveReview] = useState(0);
  const { title, text, name } = customerReviews[activeReview];
  const moveReview = (direction) => {
    setActiveReview((current) => (current + direction + customerReviews.length) % customerReviews.length);
  };

  return (
    <section className="reviews-section">
      <h2 className="scroll-reveal">Real Reviews From Real Customers</h2>
      <div className="reviews-carousel scroll-reveal">
        <article className="review-score-card">
          <span className="eyebrow">Verified buyers</span>
          <strong>{reviewSummary.score}</strong>
          <div>{stars}</div>
          <p>{reviewSummary.note}</p>
        </article>
        <article className="review-feature-card">
          <div className="review-topline">
            <span>{stars}</span>
            <small>3 days ago</small>
          </div>
          <h3>{title}</h3>
          <p>{text}</p>
          <em>{name}</em>
          <div className="review-controls" aria-label="Review carousel controls">
            <button type="button" onClick={() => moveReview(-1)} aria-label="Previous review"><ArrowLeftOutlined /></button>
            <div>
              {customerReviews.map((review, index) => (
                <button
                  className={index === activeReview ? 'active' : ''}
                  type="button"
                  aria-label={`Show review ${index + 1}`}
                  onClick={() => setActiveReview(index)}
                  key={review.title}
                />
              ))}
            </div>
            <button type="button" onClick={() => moveReview(1)} aria-label="Next review"><ArrowRightOutlined /></button>
          </div>
        </article>
        <div className="review-mini-stack">
          {customerReviews.map((review, index) => (
            <button
              className={index === activeReview ? 'active' : ''}
              type="button"
              onClick={() => setActiveReview(index)}
              key={`${review.title}-mini`}
            >
              <span>{review.title}</span>
              <small>{review.name}</small>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
