import React from 'react';
import { Car, Calculator, Send, Users, Workflow } from 'lucide-react';

export default function CarLoanHowItWorks() {
  const steps = [
    {
      number: '01',
      icon: Car,
      title: 'Choose Your Car Type',
      description: 'Select between a brand-new showroom car or a certified pre-owned vehicle based on your intended vehicle purchase and budget.'
    },
    {
      number: '02',
      icon: Calculator,
      title: 'Calculate Estimated Monthly EMI',
      description: 'Use our interactive Car Loan EMI Calculator to experiment with different loan amounts, repayment tenures (1–8 years), and interest rates.'
    },
    {
      number: '03',
      icon: Send,
      title: 'Submit Your Car Loan Enquiry',
      description: 'Provide preliminary vehicle details, estimated on-road price, and contact information through our structured form with zero upfront fees.'
    },
    {
      number: '04',
      icon: Users,
      title: 'Discuss Financing with the Team',
      description: 'Our Mysore auto finance team contacts you to review dealer proforma invoices, verify documentation, and help you evaluate bank options.'
    }
  ];

  return (
    <section className="section hl-how-it-works-section cl-how-it-works-section" aria-label="How Car Loan Guidance Works">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Workflow size={14} />
            <span>Structured Process</span>
          </div>
          <h2 className="section-title">
            How It Works: <span className="highlight-text">Your Road to Driving Home</span>
          </h2>
          <p className="section-desc">
            Four simple, transparent steps to evaluate your auto financing options without pressure or confusion.
          </p>
        </div>

        <div className="pl-steps-grid">
          {steps.map((st, i) => {
            const Icon = st.icon;
            return (
              <div key={i} className="pl-step-card">
                <div className="step-badge-row">
                  <span className="step-counter">{st.number}</span>
                  <div className="step-icon-wrapper">
                    <Icon size={20} className="step-svg" />
                  </div>
                </div>
                <h3 className="step-heading">{st.title}</h3>
                <p className="step-explanation">{st.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
