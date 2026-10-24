import React from 'react';
import { Compass, FileText, Clock, GitCompare, ShieldCheck } from 'lucide-react';

export default function BusinessLoanWhyUs() {
  const cards = [
    {
      icon: Compass,
      title: 'Guidance on Available Business Financing Options',
      description: 'Navigate working capital lines, machinery loans, bill discounting, and MSME expansion schemes across leading banks and NBFCs suited to your enterprise scale.'
    },
    {
      icon: FileText,
      title: 'Assistance with Documentation Requirements',
      description: 'Get transparent support gathering and organizing financial statements, audited P&L, balance sheets, GST returns, and bank statements before formal application.'
    },
    {
      icon: Clock,
      title: 'Support in Understanding Repayment Options',
      description: 'We help you assess monthly cashflow commitments across flexible tenures from 1 to 7 years, ensuring debt servicing aligns comfortably with operational cycles.'
    },
    {
      icon: GitCompare,
      title: 'Help Comparing Available Lender Terms',
      description: 'Receive objective comparisons of interest rate benchmarks, processing fees, collateral or hypothecation terms, and prepayment or foreclosure conditions.'
    }
  ];

  return (
    <section className="section section-alt hl-why-us-section bl-why-us-section" aria-label="Why Choose Shrikha Finserv for Business Loans">
      <div className="container">
        <div className="section-header">
          <div className="section-tag section-tag-gold">
            <ShieldCheck size={14} />
            <span>Commercial Finance Advisory</span>
          </div>
          <h2 className="section-title">
            Why Choose <span className="highlight-text">Shrikha Finserv?</span>
          </h2>
          <p className="section-desc">
            A dedicated, transparent approach helping Mysore and Karnataka entrepreneurs evaluate commercial credit options without false promises or hidden costs.
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
