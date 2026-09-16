'use client';

import { useState } from 'react';
import { ArrowRightOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { faqItems } from '@/constants/content.js';
import { routes } from '@/lib/routes.js';
import { useGo } from '@/hooks/useGo.js';

/** Accessible FAQ accordion used at the bottom of the home page. */
export default function FaqSection() {
  const go = useGo();
  const [openQuestion, setOpenQuestion] = useState(0);

  return (
    <section className="faq-section section-block scroll-reveal" aria-labelledby="faq-title">
      <div className="faq-heading">
        <span className="eyebrow">Customer clarity</span>
        <h2 id="faq-title">Frequently Asked Questions</h2>
        <p>Simple answers for ordering fresh local food, choosing farms, and receiving deliveries with confidence.</p>
        <button className="faq-contact" type="button" onClick={() => go(routes.contact)}>
          Still have questions? <span>Talk to us <ArrowRightOutlined /></span>
        </button>
      </div>
      <div className="faq-list">
        {faqItems.map((item, index) => (
          <article className={openQuestion === index ? 'is-open' : ''} key={item.question}>
            <h3>
              <button
                className="faq-trigger"
                type="button"
                id={`faq-question-${index}`}
                aria-expanded={openQuestion === index}
                aria-controls={`faq-answer-${index}`}
                onClick={() => setOpenQuestion(openQuestion === index ? null : index)}
              >
                <span className="faq-number" aria-hidden="true">0{index + 1}</span>
                <span>{item.question}</span>
                <span className="faq-toggle" aria-hidden="true">
                  {openQuestion === index ? <MinusOutlined /> : <PlusOutlined />}
                </span>
              </button>
            </h3>
            <div className="faq-answer" id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`} hidden={openQuestion !== index}>
              <p>{item.answer}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
