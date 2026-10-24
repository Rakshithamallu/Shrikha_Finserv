import React from 'react';
import { Compass, FileCheck, Headphones, GitCompare, ShieldCheck } from 'lucide-react';

export default function PersonalLoanWhyUs() {
  const features = [
    {
      icon: Compass,
      title: 'Guidance on Available Loan Options',
      description: 'We help you assess options across leading partner banks and NBFCs, matching your unique financial background with appropriate borrower criteria.'
    },
    {
      icon: FileCheck,
      title: 'Assistance with Documentation',
      description: 'Receive step-by-step checklists and structured review for income proofs, bank statements, KYC documents, and employer verification.'
    },
    {
      icon: Headphones,
      title: 'Support Throughout the Process',
      description: 'From your preliminary consultation through application follow-ups, our Mysore-based advisory team provides accessible, personal support.'
    },
    {
      icon: GitCompare,
      title: 'Help Comparing Lender Terms',
      description: 'Get transparent comparisons of reducing-balance interest rates, processing charges, prepayment penalties, and tenure flexibility.'
    }
  ];

  return (
    <section className="section section-alt pl-why-us-section" aria-label="Why Choose Shrikha Finserv for Personal Loans">
      <div className="container">
        <div className="section-header">
          <div className="section-tag section-tag-gold">
            <ShieldCheck size={14} />
            <span>Advisory Excellence</span>
          </div>
          <h2 className="section-title">
            Why Choose <span className="highlight-text">Shrikha Finserv?</span>
          </h2>
          <p className="section-desc">
            A responsible, transparent approach focused on clear guidance rather than unsubstantiated claims.
          </p>
        </div>

        <div className="pl-features-grid">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div key={idx} className="pl-feature-card">
                <div className="feat-icon-box">
                  <Icon size={24} className="feat-svg" />
                </div>
                <h3 className="feat-title">{feat.title}</h3>
                <p className="feat-desc">{feat.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
