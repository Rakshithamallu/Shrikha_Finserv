import React from 'react';
import { Home, Calculator, Send, Users, Workflow } from 'lucide-react';

export default function HomeLoanHowItWorks() {
  const steps = [
    {
      number: '01',
      icon: Home,
      title: 'Share Your Home-Financing Requirements',
      description: 'Define your property goal—whether purchasing a ready flat, funding self-construction, renovating, or transferring an existing high-interest loan.'
    },
    {
      number: '02',
      icon: Calculator,
      title: 'Estimate Your Monthly EMI',
      description: 'Model your monthly commitment and repayment split using our interactive Home Loan EMI Calculator across varying tenures from 5 to 30 years.'
    },
    {
      number: '03',
      icon: Send,
      title: 'Submit Your Enquiry',
      description: 'Provide your preliminary property details, income, and preferred borrowing parameters through our structured online form with zero upfront fees.'
    },
    {
      number: '04',
      icon: Users,
      title: 'Discuss Options with the Team',
      description: 'Our Mysore housing finance advisors connect with you to review property documentation, compare bank offerings, and outline next steps clearly.'
    }
  ];

  return (
    <section className="section hl-how-it-works-section" aria-label="How Home Loan Guidance Works">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Workflow size={14} />
            <span>Structured Process</span>
          </div>
          <h2 className="section-title">
            How It Works: <span className="highlight-text">From Planning to Homeownership</span>
          </h2>
          <p className="section-desc">
            Four transparent steps designed to guide you through property finance decisions with absolute confidence.
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
