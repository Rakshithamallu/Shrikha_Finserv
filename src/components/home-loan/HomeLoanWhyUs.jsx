import React from 'react';
import { Compass, FileText, Headphones, GitCompare, ShieldCheck } from 'lucide-react';

export default function HomeLoanWhyUs() {
  const cards = [
    {
      icon: Compass,
      title: 'Guidance on Home-Financing Options',
      description: 'Navigate housing finance programs across major banks and HFCs, evaluating suitable options whether you are buying an apartment, building a home, or purchasing a plot.'
    },
    {
      icon: FileText,
      title: 'Assistance with Documentation',
      description: 'Get comprehensive support reviewing required property papers (Khata certificate, title deeds, encumbrance certificate) and personal income proofs before formal submission.'
    },
    {
      icon: Headphones,
      title: 'Support Throughout the Enquiry Process',
      description: 'Our Mysore-based team offers accessible, continuous assistance from initial borrowing estimation through to lender coordination and sanction formalities.'
    },
    {
      icon: GitCompare,
      title: 'Help Comparing Available Lender Terms',
      description: 'Receive transparent comparisons of floating vs. fixed interest rates, processing fees, loan-to-value (LTV) limits, and prepayment terms to make an informed choice.'
    }
  ];

  return (
    <section className="section section-alt hl-why-us-section" aria-label="Why Choose Shrikha Finserv for Home Loans">
      <div className="container">
        <div className="section-header">
          <div className="section-tag section-tag-gold">
            <ShieldCheck size={14} />
            <span>Trusted Guidance</span>
          </div>
          <h2 className="section-title">
            Why Choose <span className="highlight-text">Shrikha Finserv?</span>
          </h2>
          <p className="section-desc">
            A transparent advisory approach focused on factual comparisons, legal property norms, and customized borrower support.
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
