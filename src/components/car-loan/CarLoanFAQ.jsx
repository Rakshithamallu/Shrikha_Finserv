import React, { useState } from 'react';
import { ChevronDown, HelpCircle, PhoneCall } from 'lucide-react';

const CAR_LOAN_FAQS = [
  {
    id: 'cl-faq-1',
    question: 'What is a Car Loan EMI?',
    answer: 'An Equated Monthly Installment (EMI) is a fixed monthly payment made to the lending institution to repay your auto loan over the chosen tenure. Each EMI includes both principal repayment and interest charged on the reducing loan balance.'
  },
  {
    id: 'cl-faq-2',
    question: 'How is Car Loan EMI calculated?',
    answer: 'Car loan EMIs are calculated using the reducing-balance formula: EMI = [P × r × (1 + r)^n] / [(1 + r)^n − 1], where P is your principal loan amount, r is your monthly interest rate (annual interest rate divided by 12 and 100), and n is the total number of monthly installments (tenure in years multiplied by 12). As you make monthly repayments, the principal balance decreases, reducing subsequent interest charges.'
  },
  {
    id: 'cl-faq-3',
    question: 'What is the difference between a new car loan and a pre-owned car loan?',
    answer: 'New car loans generally feature lower interest rates (starting around 8.5% p.a.), longer permissible repayment tenures (up to 7 or 8 years), and higher Loan-to-Value (LTV) limits (often up to 90%–100% of ex-showroom/on-road cost). Pre-owned car loans typically involve slightly higher interest rates (usually 10.5%–14% p.a.), shorter tenures (up to 5 years), and require physical vehicle valuation by the lending institution.'
  },
  {
    id: 'cl-faq-4',
    question: 'Can I change the loan amount and tenure?',
    answer: 'Yes, our interactive Car Loan EMI Calculator enables you to adjust the loan amount (from ₹1 Lakh up to ₹50 Lakh) and repayment tenure (from 1 to 8 years) freely using the sliders or direct numeric inputs, helping you model an installment that matches your monthly budget.'
  },
  {
    id: 'cl-faq-5',
    question: 'How much down payment may I need?',
    answer: 'Down payment requirements typically range between 10% and 20% of the on-road vehicle price for new cars, depending on the applicant\'s credit profile and lender policy. Some lenders offer 100% on-road funding for eligible salaried professionals with high credit scores. For pre-owned cars, a margin of 20% to 30% of the vehicle valuation is standard.'
  },
  {
    id: 'cl-faq-6',
    question: 'Does the calculator guarantee loan approval?',
    answer: 'No. The calculator is an illustrative estimating tool designed for personal planning. Use of this calculator does not constitute a formal loan offer or guarantee approval. Final credit sanction is subject to the lender\'s technical assessment, applicant credit score (CIBIL 750+ typically preferred), income stability, and KYC documentation.'
  },
  {
    id: 'cl-faq-7',
    question: 'What determines the interest rate on a car loan?',
    answer: 'Sanctioned interest rates are determined by the lender based on your credit score, employment stability (salaried vs. self-employed), monthly income, vehicle category (new vs. pre-owned), loan tenure, and existing relationship with the bank.'
  },
  {
    id: 'cl-faq-8',
    question: 'Can I use this calculator for a used car?',
    answer: 'Yes. Simply toggle the "Pre-Owned Car" option at the top of the calculator and input your expected used car borrowing amount, tenure, and applicable interest rate. You can also transfer these parameters directly into the enquiry form.'
  },
  {
    id: 'cl-faq-9',
    question: 'Does the calculator include insurance, registration, and processing charges?',
    answer: 'The calculator estimates monthly installments solely based on the principal loan amount entered. Statutory on-road costs such as RTO registration, road tax, comprehensive vehicle insurance, extended warranties, and lender processing fees are not automatically bundled unless you incorporate them into the total loan amount you enter.'
  }
];

export default function CarLoanFAQ() {
  const [openId, setOpenId] = useState('cl-faq-1');

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
    <section className="section section-alt hl-faq-section cl-faq-section" aria-label="Car Loan Frequently Asked Questions">
      <div className="container container-narrow">
        <div className="section-header">
          <div className="section-tag section-tag-gold">
            <HelpCircle size={14} />
            <span>Got Questions?</span>
          </div>
          <h2 className="section-title">
            Car Loan <span className="highlight-text">FAQs</span>
          </h2>
          <p className="section-desc">
            Clear, transparent answers regarding auto loan calculations, down payment norms, vehicle categories, and lender expectations.
          </p>
        </div>

        <div className="faq-accordion-list" role="presentation">
          {CAR_LOAN_FAQS.map((faq) => {
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
            <strong>Have questions about dealership quotations or used car valuation?</strong>
            <span>Our Mysore auto finance advisory team is here to assist you without obligation.</span>
          </div>
          <a href="tel:8792953082" className="btn btn-secondary btn-sm">
            Call 8792953082
          </a>
        </div>
      </div>
    </section>
  );
}
