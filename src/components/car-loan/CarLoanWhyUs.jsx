import React from 'react';
import { Compass, FileText, Clock, GitCompare, ShieldCheck } from 'lucide-react';

export default function CarLoanWhyUs() {
  const cards = [
    {
      icon: Compass,
      title: 'Guidance on Vehicle Financing Options',
      description: 'Navigate car loan schemes across top banks and NBFCs, matching your vehicle preference (brand-new showroom vs. certified pre-owned) with competitive provider terms.'
    },
    {
      icon: FileText,
      title: 'Assistance with Enquiry & Documentation',
      description: 'Get transparent guidance on required dealer proforma invoices, identity verification, income proofs, and vehicle registration paperwork before formal submission.'
    },
    {
      icon: Clock,
      title: 'Support in Understanding Repayments',
      description: 'We help you assess monthly cashflow commitments across flexible tenures from 1 to 8 years, ensuring your vehicle repayment fits comfortably within your budget.'
    },
    {
      icon: GitCompare,
      title: 'Help Comparing Available Lender Terms',
      description: 'Receive objective comparisons of fixed vs. floating rates, down payment requirements, hypothecation terms, and prepayment or foreclosure policies.'
    }
  ];

  return (
    <section className="section section-alt hl-why-us-section cl-why-us-section" aria-label="Why Choose Shrikha Finserv for Car Loans">
      <div className="container">
        <div className="section-header">
          <div className="section-tag section-tag-gold">
            <ShieldCheck size={14} />
            <span>Trusted Auto Advisory</span>
          </div>
          <h2 className="section-title">
            Why Choose <span className="highlight-text">Shrikha Finserv?</span>
          </h2>
          <p className="section-desc">
            A customer-first approach dedicated to clear vehicle financing guidance, verified documentation, and objective comparisons.
          </p>
        </div>

        <div className="pl-features-grid">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div key={idx} className="pl-feature-card">
                <div className="feat-icon-box">
                  <Icon size={24} className="feat-svg" />
                </div>
                <h3 className="feat-title">{card.title}</h3>
                <p className="feat-desc">{card.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
