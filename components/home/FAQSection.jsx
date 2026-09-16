"use client";

import { ArrowRightOutlined } from "@ant-design/icons";
import { MinusOutlined } from "@ant-design/icons";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "@/hooks/useNavigate";
import { useState } from "react";
export function FAQSection() {
  const go = useNavigate();
  const [openQuestion, setOpenQuestion] = useState(0);
  return <section className="faq-section section-block scroll-reveal" aria-labelledby="faq-title">
      <div className="faq-heading">
        <span className="eyebrow">Customer clarity</span>
        <h2 id="faq-title">Frequently Asked Questions</h2>
        <p>Simple answers for ordering fresh local food, choosing farms, and receiving deliveries with confidence.</p>
        <button className="faq-contact" type="button" onClick={() => go('/contact')}>
          Still have questions? <span>Talk to us <ArrowRightOutlined /></span>
        </button>
      </div>
      <div className="faq-list">
        {faqItems.map(([question, answer], index) => <article className={openQuestion === index ? 'is-open' : ''} key={question}>
            <h3>
              <button className="faq-trigger" type="button" id={`faq-question-${index}`} aria-expanded={openQuestion === index} aria-controls={`faq-answer-${index}`} onClick={() => setOpenQuestion(openQuestion === index ? null : index)}>
                <span className="faq-number" aria-hidden="true">0{index + 1}</span>
                <span>{question}</span>
                <span className="faq-toggle" aria-hidden="true">
                  {openQuestion === index ? <MinusOutlined /> : <PlusOutlined />}
                </span>
              </button>
            </h3>
            <div className="faq-answer" id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`} hidden={openQuestion !== index}>
              <p>{answer}</p>
            </div>
          </article>)}
      </div>
    </section>;
}
export const faqItems = [['Where does the produce come from?', 'Every item is connected to a named farm, dairy, fishery, or local producer so customers can shop with clear origin details.'], ['Can customers choose a delivery day?', 'You can choose a delivery day and time in the checkout preview. Live availability will be confirmed when ordering is connected.'], ['How are chilled products handled?', 'Dairy, meat, fish, and fresh drinks are packed with cold-chain care in clean reusable delivery boxes.'], ['Can I view farm details before buying?', 'Yes. Farm names open a dedicated farm page with location, practices, product list, and producer story.']];
