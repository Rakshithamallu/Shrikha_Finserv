import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircleQuestion } from 'lucide-react';
import { FAQS } from '../data/faqs';

export default function FAQ({ onAskQuestionClick }) {
  // First item open by default for immediate engagement
  const [openIds, setOpenIds] = useState(['faq-1']);

  const toggleFAQ = (id) => {
    if (openIds.includes(id)) {
      setOpenIds(openIds.filter(item => item !== id));
    } else {
      setOpenIds([...openIds, id]);
    }
  };

  const handleKeyDown = (e, id) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleFAQ(id);
    }
  };

  return (
    <section id="faqs" className="section section-alt faq-section" aria-label="Frequently Asked Questions">
      <div className="container container-narrow">
        <div className="section-header">
          <div className="section-tag section-tag-gold">
            <HelpCircle size={14} />
            <span>Got Questions?</span>
          </div>
          <h2 className="section-title">
            Frequently Asked <span className="highlight-text">Questions</span>
          </h2>
          <p className="section-desc">
            Find factual, transparent answers regarding our financial services, documentation, and advisory process.
          </p>
        </div>

        <div className="faq-accordion-list" role="presentation">
          {FAQS.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            const contentId = `faq-content-${faq.id}`;
            const headerId = `faq-header-${faq.id}`;

            return (
              <div
                key={faq.id}
                className={`faq-item-card ${isOpen ? 'is-open' : ''}`}
              >
                <button
                  type="button"
                  id={headerId}
                  className="faq-question-btn"
                  onClick={() => toggleFAQ(faq.id)}
                  onKeyDown={(e) => handleKeyDown(e, faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                >
                  <span className="faq-question-text">{faq.question}</span>
                  <span className={`faq-chevron-icon ${isOpen ? 'rotated' : ''}`} aria-hidden="true">
                    <ChevronDown size={20} />
                  </span>
                </button>

                <div
                  id={contentId}
                  role="region"
                  aria-labelledby={headerId}
                  className={`faq-answer-collapse ${isOpen ? 'is-open' : ''}`}
                >
                  <div className="faq-answer-inner">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Still have questions prompt */}
        <div className="faq-bottom-prompt">
          <MessageCircleQuestion size={24} className="prompt-icon" />
          <div className="prompt-text">
            <strong>Have a specific enquiry not covered above?</strong>
            <span>Our Mysore team is available to assist you personally.</span>
          </div>
          <a
            href="tel:8792953082"
            className="btn btn-secondary btn-sm prompt-btn"
          >
            Call 8792953082
          </a>
        </div>
      </div>
    </section>
  );
}
