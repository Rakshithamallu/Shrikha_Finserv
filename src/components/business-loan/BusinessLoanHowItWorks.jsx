import React from 'react';
import { Briefcase, Calculator, Send, Users, Workflow } from 'lucide-react';

export default function BusinessLoanHowItWorks() {
  const steps = [
    {
      number: '01',
      icon: Briefcase,
      title: 'Share Your Business Funding Requirement',
      description: 'Outline your capital needs—whether for working capital, bulk inventory procurement, new machinery, or opening a second business branch.'
    },
    {
      icon: Calculator,
      number: '02',
      title: 'Calculate Your Estimated Monthly EMI',
      description: 'Use our Business Loan EMI Calculator to evaluate different principal amounts, repayment terms (1–7 years), and interest rates against monthly cashflow.'
    },
    {
      icon: Send,
      number: '03',
      title: 'Submit Your Enquiry',
      description: 'Share your basic business registration, turnover bracket, and contact preference through our secure form with zero upfront fees.'
    },
    {
      icon: Users,
      number: '04',
      title: 'Discuss Available Options with the Team',
      description: 'Our Mysore-based commercial advisory team connects with you to evaluate eligibility, review paperwork, and compare competing bank terms.'
    }
  ];

  return (
    <section className="section hl-how-it-works-section bl-how-it-works-section" aria-label="How Business Loan Guidance Works">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Workflow size={14} />
            <span>Structured Process</span>
          </div>
          <h2 className="section-title">
            How It Works: <span className="highlight-text">From Planning to Disbursal</span>
          </h2>
          <p className="section-desc">
            Four clear steps designed to make commercial financing straightforward, transparent, and aligned with your business cycle.
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
