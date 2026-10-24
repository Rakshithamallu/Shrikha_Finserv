import React from 'react';
import { Search, Calculator, Send, Users, Workflow } from 'lucide-react';

export default function PersonalLoanHowItWorks() {
  const steps = [
    {
      number: '01',
      icon: Search,
      title: 'Explore Your Loan Requirements',
      description: 'Identify your financial purpose, whether funding an upcoming milestone, managing unexpected medical costs, or consolidating existing liabilities.'
    },
    {
      number: '02',
      icon: Calculator,
      title: 'Estimate Your EMI',
      description: 'Use our interactive Personal Loan EMI Calculator above to model comfortable monthly installments based on your target borrowing amount and tenure.'
    },
    {
      number: '03',
      icon: Send,
      title: 'Submit Your Enquiry',
      description: 'Fill in your contact details, income range, and preferred loan parameters in our enquiry form with zero advance fee requirements.'
    },
    {
      number: '04',
      icon: Users,
      title: 'Discuss Options with Our Team',
      description: 'Our Mysore team will contact you to review your eligibility, documentation criteria, and explain suitable provider options clearly.'
    }
  ];

  return (
    <section className="section pl-how-it-works-section" aria-label="How Personal Loan Guidance Works">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Workflow size={14} />
            <span>Simple & Transparent</span>
          </div>
          <h2 className="section-title">
            How It Works: <span className="highlight-text">Your Path to Clarity</span>
          </h2>
          <p className="section-desc">
            Four structured steps to evaluate your personal financing options safely and objectively.
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
