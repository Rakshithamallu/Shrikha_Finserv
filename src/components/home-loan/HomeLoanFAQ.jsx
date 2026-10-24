import React, { useState } from 'react';
import { ChevronDown, HelpCircle, PhoneCall } from 'lucide-react';

const HOME_LOAN_FAQS = [
  {
    id: 'hl-faq-1',
    question: 'What is a Home Loan EMI?',
    answer: 'An Equated Monthly Installment (EMI) is the fixed monthly sum payable to your housing finance lender to repay your home loan over an agreed tenure. Each EMI payment comprises two parts: repayment of the principal loan amount and payment of the accrued monthly interest.'
  },
  {
    id: 'hl-faq-2',
    question: 'How is Home Loan EMI calculated?',
    answer: 'Home loan EMIs are calculated using the reducing-balance formula: EMI = [P × r × (1 + r)^n] / [(1 + r)^n − 1], where P is the principal loan amount, r is the monthly interest rate (annual interest rate divided by 12 and 100), and n is the total number of monthly installments (tenure in years multiplied by 12). In the initial years, a higher proportion of your EMI goes towards interest; as the principal balance reduces over time, a greater share covers the principal amount.'
  },
  {
    id: 'hl-faq-3',
    question: 'Can I change the loan amount and tenure?',
    answer: 'Yes, our interactive Home Loan EMI Calculator allows you to adjust the loan amount (from ₹1 Lakh up to ₹10 Crore) and the repayment tenure (from 1 to 30 years) freely. Adjusting the tenure enables you to find an optimal balance between an affordable monthly EMI and the total interest payable over the life of the loan.'
  },
  {
    id: 'hl-faq-4',
    question: 'How much down payment may I need?',
    answer: 'Down payment requirements (the applicant\'s own contribution) typically range between 10% and 25% of the registered property agreement value, depending on the loan quantum and regulatory Loan-to-Value (LTV) limits set by the Reserve Bank of India and partner lenders. For loans up to ₹30 Lakh, lenders may fund up to 90%, whereas higher-value loans generally require an own contribution of 20% to 25% plus registration and stamp duty expenses.'
  },
  {
    id: 'hl-faq-5',
    question: 'Does the EMI calculator guarantee loan approval?',
    answer: 'No. The calculator is an illustrative and educational tool designed to help you project monthly repayment commitments. It does not constitute a loan offer or guarantee credit sanction. Formal approval depends on the lender\'s technical and legal verification of the property, your credit score (CIBIL), debt-to-income ratio, and income documentation.'
  },
  {
    id: 'hl-faq-6',
    question: 'Can I use a Home Loan for house construction?',
    answer: 'Yes, housing loans can be availed for self-construction of a residential house on a plot you already own, or for the combined purchase of a plot and construction. Lenders typically disburse construction loans in progressive stages or tranches based on certified architect or engineer construction milestones.'
  },
  {
    id: 'hl-faq-7',
    question: 'What determines my actual interest rate?',
    answer: 'Your sanctioned interest rate depends on multiple factors, including your credit score (typically 750+ for benchmark pricing), applicant employment type (salaried vs. self-employed), loan amount, gender of the primary applicant (many lenders offer special concessionary rates for women borrowers), and whether you opt for floating or fixed interest rates.'
  },
  {
    id: 'hl-faq-8',
    question: 'Can I enquire about transferring an existing home loan?',
    answer: 'Yes, you can enquire about a Home Loan Balance Transfer (refinancing) to move an existing home loan from another bank or NBFC to access lower interest rates or top-up funding. Our advisors can help you assess the net financial benefit after accounting for processing fees and transfer charges.'
  }
];

export default function HomeLoanFAQ() {
  const [openIds, setOpenIds] = useState(['hl-faq-1']);

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
    <section className="section section-alt hl-faq-section" aria-label="Home Loan Frequently Asked Questions">
      <div className="container container-narrow">
        <div className="section-header">
          <div className="section-tag section-tag-gold">
            <HelpCircle size={14} />
            <span>Got Questions?</span>
          </div>
          <h2 className="section-title">
            Home Loan <span className="highlight-text">FAQs</span>
          </h2>
          <p className="section-desc">
            Reliable, factual answers to help you understand housing loan calculations, down payment norms, and lender guidelines.
          </p>
        </div>

        <div className="faq-accordion-list" role="presentation">
          {HOME_LOAN_FAQS.map((faq) => {
            const isOpen = openIds.includes(faq.id);
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
            <strong>Have specific property or title clearance questions?</strong>
            <span>Our Mysore housing finance advisors are available to guide you personally.</span>
          </div>
          <a href="tel:8792953082" className="btn btn-secondary btn-sm">
            Call 8792953082
          </a>
        </div>
      </div>
    </section>
  );
}
