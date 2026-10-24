import React, { useState } from 'react';
import { ChevronDown, HelpCircle, PhoneCall } from 'lucide-react';

const BUSINESS_LOAN_FAQS = [
  {
    id: 'bl-faq-1',
    question: 'What is a Business Loan EMI?',
    answer: 'A Business Loan Equated Monthly Installment (EMI) is a fixed monthly sum paid by a business to the lending institution to repay its commercial borrowing over a designated tenure. Each installment consists of a portion toward the principal loan balance and a portion toward interest charged on the reducing balance.'
  },
  {
    id: 'bl-faq-2',
    question: 'How is Business Loan EMI calculated?',
    answer: 'Business loan EMIs are computed using the reducing-balance formula: EMI = [P × r × (1 + r)^n] / [(1 + r)^n − 1], where P is the principal loan amount, r is the monthly interest rate (annual interest rate divided by 12 and 100), and n is the total number of monthly installments (tenure in years multiplied by 12). As you service monthly installments, principal is amortized, reducing subsequent interest charges.'
  },
  {
    id: 'bl-faq-3',
    question: 'What can a business loan be used for?',
    answer: 'Business loans can be deployed for a wide range of eligible commercial purposes, including working capital management, purchasing raw materials or inventory, acquiring plant and machinery, office or retail renovations, technological upgrades, hiring specialized personnel, and geographical business expansion, subject to lender product guidelines.'
  },
  {
    id: 'bl-faq-4',
    question: 'Can I adjust the loan amount and repayment tenure?',
    answer: 'Yes. Our interactive Business Loan EMI Calculator allows you to adjust the loan amount from ₹30,000 up to ₹1,00,00,000 (₹1 Crore) and the repayment tenure from 1 to 7 years. You can use the synchronized sliders or numeric input fields to observe how different parameters impact your monthly cash outflows.'
  },
  {
    id: 'bl-faq-5',
    question: 'How does the interest rate affect my EMI?',
    answer: 'The interest rate directly impacts the total cost of borrowing and your monthly repayment. A higher interest rate increases both the monthly installment and the cumulative interest payable over the loan life. Longer tenures lower your monthly installment but increase the total interest paid.'
  },
  {
    id: 'bl-faq-6',
    question: 'What information may a lender consider when assessing a business loan?',
    answer: 'Lending institutions typically assess business vintage (usually 1 to 3+ years of operations), annual turnover, profitability trends, audited balance sheets and P&L statements, GST filing regularity, bank account average monthly balance (AMB), and the promoter\'s personal and commercial credit score (CIBIL 700+).'
  },
  {
    id: 'bl-faq-7',
    question: 'Does the EMI calculator guarantee loan approval?',
    answer: 'No. The calculator is an illustrative financial estimating tool designed for personal planning. Use of this calculator does not constitute a loan offer or sanction. Final approval, sanctioned amount, and applicable terms remain at the sole discretion of the respective lending institution following credit underwriting and verification.'
  },
  {
    id: 'bl-faq-8',
    question: 'Are processing fees included in the calculator?',
    answer: 'No. The calculator estimates repayments based purely on the principal loan amount entered. One-time processing fees (typically 1% to 3% + GST), documentation fees, valuation charges, and statutory stamp duty vary by lender and are not factored into the calculator unless manually added to your principal.'
  },
  {
    id: 'bl-faq-9',
    question: 'Can self-employed individuals enquire about business financing?',
    answer: 'Yes. Proprietors, partners, self-employed professionals (such as doctors, chartered accountants, and consultants), and MSME business owners are eligible to enquire about tailored commercial credit solutions. Eligibility depends on operational vintage, income proofs, and banking track record.'
  }
];

export default function BusinessLoanFAQ() {
  const [openIds, setOpenIds] = useState(['bl-faq-1']);

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
    <section className="section section-alt hl-faq-section bl-faq-section" aria-label="Business Loan Frequently Asked Questions">
      <div className="container container-narrow">
        <div className="section-header">
          <div className="section-tag section-tag-gold">
            <HelpCircle size={14} />
            <span>Got Questions?</span>
          </div>
          <h2 className="section-title">
            Business Loan <span className="highlight-text">FAQs</span>
          </h2>
          <p className="section-desc">
            Clear, transparent answers regarding business financing calculations, eligibility norms, tenure limits, and documentation requirements.
          </p>
        </div>

        <div className="faq-accordion-list" role="presentation">
          {BUSINESS_LOAN_FAQS.map((faq) => {
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
            <strong>Have questions about MSME schemes or working capital requirements?</strong>
            <span>Our Mysore commercial finance advisory team is here to assist you without obligation.</span>
          </div>
          <a href="tel:8792953082" className="btn btn-secondary btn-sm">
            Call 8792953082
          </a>
        </div>
      </div>
    </section>
  );
}
