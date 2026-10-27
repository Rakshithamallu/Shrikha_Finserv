import React, { useState } from 'react';
import { ChevronDown, HelpCircle, PhoneCall } from 'lucide-react';

const PERSONAL_LOAN_FAQS = [
  {
    id: 'pl-faq-1',
    question: 'What is a Personal Loan EMI?',
    answer: 'An Equated Monthly Installment (EMI) is the fixed sum of money payable each month to the lending bank or NBFC until the personal loan is completely repaid. Each EMI installment consists of both a principal repayment portion and an interest component.'
  },
  {
    id: 'pl-faq-2',
    question: 'How is my monthly EMI calculated?',
    answer: 'Our calculator utilizes the standard reducing-balance EMI formula: EMI = [P × r × (1 + r)^n] / [(1 + r)^n − 1], where P is your principal loan amount, r is your monthly interest rate (annual interest rate divided by 12 and 100), and n is the total number of monthly installments (tenure in years multiplied by 12). With every monthly installment, the principal balance reduces, which subsequently reduces the interest accrued for future months.'
  },
  {
    id: 'pl-faq-3',
    question: 'Can I change the loan amount and tenure?',
    answer: 'Yes, you can freely adjust both the loan amount (from ₹25,000 up to ₹1,00,00,000) and the tenure (from 1 to 7 years) using the sliders or direct numeric inputs in our calculator. You can experiment with different combinations to find an EMI installment that comfortably fits your monthly income.'
  },
  {
    id: 'pl-faq-4',
    question: 'Does the EMI calculator guarantee loan approval?',
    answer: 'No. The EMI calculator is strictly an illustrative and educational tool designed to help you estimate monthly repayments. Use of this calculator does not constitute a loan offer or guarantee approval. All formal loan approvals, sanctions, and loan amounts are determined solely by the respective lender after assessing your credit score (CIBIL), income stability, documentation, and underwriting criteria.'
  },
  {
    id: 'pl-faq-5',
    question: 'What determines the actual interest rate?',
    answer: 'The actual interest rate offered to you is determined by the lending institution based on your credit score, employment stability (salaried vs. self-employed), monthly in-hand income, existing debt obligations, and internal lender risk policies. Rates typically range between 9.99% and 24% per annum.'
  },
  {
    id: 'pl-faq-6',
    question: 'Do I need to submit an enquiry to use the calculator?',
    answer: 'No, our Personal Loan EMI Calculator is completely free and open to use without requiring any personal details, email address, or phone number. You are only prompted to share details if you decide to proceed with an enquiry so that our Mysore advisory team can guide you through lender options.'
  }
];

export default function PersonalLoanFAQ() {
  const [openId, setOpenId] = useState('pl-faq-1');

  const toggleFAQ = (id) => {
    setOpenId((prevId) => (prevId === id ? null : id));
  };

  const handleKeyDown = (e, id) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleFAQ(id);
    }
  };

  return (
    <section className="section section-alt pl-faq-section" aria-label="Personal Loan Frequently Asked Questions">
      <div className="container container-narrow">
        <div className="section-header">
          <div className="section-tag section-tag-gold">
            <HelpCircle size={14} />
            <span>Got Questions?</span>
          </div>
          <h2 className="section-title">
            Personal Loan <span className="highlight-text">FAQs</span>
          </h2>
          <p className="section-desc">
            Clear, transparent answers regarding loan calculations, eligibility, and the advisory process.
          </p>
        </div>

        <div className="faq-accordion-list" role="presentation">
          {PERSONAL_LOAN_FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            const contentId = `content-${faq.id}`;
            const headerId = `header-${faq.id}`;

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

        {/* Advisory Help Callout */}
        <div className="pl-faq-callout">
          <PhoneCall size={22} className="callout-icon" />
          <div className="callout-text">
            <strong>Have more questions about personal loan eligibility or documentation?</strong>
            <span>Our Mysore team is ready to guide you without obligation.</span>
          </div>
          <a href="tel:8792953082" className="btn btn-secondary btn-sm">
            Call 8792953082
          </a>
        </div>
      </div>
    </section>
  );
}
