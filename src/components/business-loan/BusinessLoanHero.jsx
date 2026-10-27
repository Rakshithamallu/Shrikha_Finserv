import React from 'react';
import {
  Briefcase,
  Calculator,
  Send,
  ChevronRight,
  Clock,
  ShieldCheck,
  Sparkles,
  Percent,
  TrendingUp,
  Building2,
  CheckCircle2
} from 'lucide-react';

export default function BusinessLoanHero({ onBackToServices, onCalculateClick, onEnquireClick }) {
  return (
    <section className="personal-loan-hero-section hl-hero-section bl-hero-section pl-enquiry-hero" aria-label="Business Loan Overview">
      {/* Background Decorative Layer (Royal Navy + Gold Theme) */}
      <div className="pl-enquiry-bg-decor" aria-hidden="true">
        <div className="pl-enquiry-dot-grid" />
        <div className="pl-enquiry-ambient-orb-1" />
        <div className="pl-enquiry-ambient-orb-2" />
        <div className="pl-enquiry-concentric-rings">
          <div className="pl-ring pl-ring-outer" />
          <div className="pl-ring pl-ring-middle" />
          <div className="pl-ring pl-ring-inner" />
        </div>
        <div className="pl-decor-diamond pl-diamond-1" />
        <div className="pl-decor-diamond pl-diamond-2" />
        <div className="pl-decor-diamond pl-diamond-3" />
      </div>

      <div className="container pl-enquiry-hero-container">
        {/* Breadcrumb Navigation */}
        <nav className="pl-breadcrumb" aria-label="Breadcrumb">
          <button
            type="button"
            className="breadcrumb-link"
            onClick={onBackToServices}
          >
            Home
          </button>
          <ChevronRight size={14} className="breadcrumb-sep" />
          <button
            type="button"
            className="breadcrumb-link"
            onClick={onBackToServices}
          >
            Services
          </button>
          <ChevronRight size={14} className="breadcrumb-sep" />
          <span className="breadcrumb-current" aria-current="page">Business Loan</span>
        </nav>

        {/* Hero Grid */}
        <div className="pl-hero-grid">
          <div className="pl-hero-content">
            <div className="section-tag section-tag-gold hero-badge-tag">
              <Sparkles size={14} />
              <span>MSME & Commercial Advisory • Mysore & Karnataka</span>
            </div>

            <h1 className="pl-hero-title">
              Flexible Business Financing to <span className="highlight-text-gold">Support Your Growth</span>
            </h1>

            <p className="pl-hero-subtitle">
              Explore business financing options and estimate your monthly repayments. Use our Business Loan EMI Calculator to plan funding for working capital, inventory, equipment, expansion, and other eligible business needs.
            </p>

            {/* Quick Hero Features List */}
            <div className="pl-hero-features-list">
              <div className="hero-feature-item">
                <Clock size={18} className="feat-icon" />
                <span>Flexible Tenures: 1 to 7 Years</span>
              </div>
              <div className="hero-feature-item">
                <Percent size={18} className="feat-icon" />
                <span>Competitive Rates from 9.99% p.a.</span>
              </div>
              <div className="hero-feature-item">
                <TrendingUp size={18} className="feat-icon" />
                <span>Borrowing Up to ₹1 Crore</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pl-hero-actions">
              <button
                type="button"
                className="btn btn-gold btn-lg pl-hero-btn-primary"
                onClick={onCalculateClick}
                id="hero-btn-bl-calculate-emi"
              >
                <Calculator size={18} />
                <span>Calculate Your EMI</span>
              </button>

              <button
                type="button"
                className="btn btn-outline-white btn-lg pl-hero-btn-secondary"
                onClick={onEnquireClick}
                id="hero-btn-bl-enquire-now"
              >
                <span>Enquire About a Business Loan</span>
                <Send size={18} />
              </button>
            </div>
          </div>

          {/* Right Visual Card */}
          <div className="pl-hero-visual-card">
            <div className="visual-card-glass">
              <div className="visual-icon-bubble">
                <Briefcase size={36} className="visual-icon" />
              </div>
              <h3 className="visual-title">Commercial Capital Simulator</h3>
              <p className="visual-subtitle">
                Model monthly cashflows for retail shops, manufacturing units, trading enterprises, and professional services across Mysore.
              </p>

              <div className="visual-quick-stats">
                <div className="stat-pill">
                  <span className="stat-label">Min Loan:</span>
                  <span className="stat-num">₹30,000</span>
                </div>
                <div className="stat-pill">
                  <span className="stat-label">Max Limit:</span>
                  <span className="stat-num">₹1 Crore</span>
                </div>
                <div className="stat-pill">
                  <span className="stat-label">Method:</span>
                  <span className="stat-num">Reducing Balance</span>
                </div>
              </div>

              <div className="visual-trust-badge">
                <ShieldCheck size={16} />
                <span>Transparent Loan Guidance • Verified Documentation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
