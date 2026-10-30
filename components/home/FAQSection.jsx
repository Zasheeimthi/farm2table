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
        <span className="eyebrow">Bra att veta</span>
        <h2 id="faq-title">Vanliga frågor och svar</h2>
        <p>Här hittar du svar om gårdarna, marknadsplatsen och verktygen som gör lokal försäljning enklare.</p>
        <button className="faq-contact" type="button" onClick={() => go('/contact')}>
          Har du fler frågor? <span>Kontakta oss <ArrowRightOutlined /></span>
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
export const faqItems = [
  ['Var kommer maten ifrån?', 'Varje produkt är kopplad till en gård eller producent. På gårdens sida kan du läsa mer om verksamheten, sortimentet och människorna bakom maten.'],
  ['Hur fungerar det att handla?', 'Välj plats, utforska gårdarna och lägg dina produkter i varukorgen. Kontrollera tillgängliga leveransalternativ och villkor innan du slutför din beställning.'],
  ['Vad får jag som producent?', 'En egen digital butikslänk och en plats på vår gemensamma marknadsplats. Verktyg för lager, beställningar, betalningar och statistik hjälper dig att samla arbetet och få bättre överblick. Kontakta oss för att komma igång.'],
  ['Vad innebär förhandsförsäljning och crowdfunding?', 'Låt kunderna vara med från början. Genom förhandsförsäljning kan du ta emot beställningar inför nästa skörd eller slakt. Crowdfunding kan ge kunder möjlighet att stötta en ny satsning. Kontakta oss för att prata om upplägg, villkor och leveransplan.']
];
