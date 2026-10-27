import React from 'react';
import {
  Home,
  Calculator,
  Send,
  ChevronRight,
  Clock,
  ShieldCheck,
  Building2,
  Sparkles,
  Percent
} from 'lucide-react';

export default function HomeLoanHero({ onBackToServices, onCalculateClick, onEnquireClick }) {
  return (
    <section className="personal-loan-hero-section hl-hero-section pl-enquiry-hero" aria-label="Home Loan Overview">
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
          <span className="breadcrumb-current" aria-current="page">Home Loan</span>
        </nav>

        {/* Hero Grid */}
        <div className="pl-hero-grid">
          <div className="pl-hero-content">
            <div className="section-tag section-tag-gold hero-badge-tag">
              <Sparkles size={14} />
              <span>Housing Finance Guidance • Mysore & Karnataka</span>
            </div>

            <h1 className="pl-hero-title">
              Find the Right Home Loan for <span className="highlight-text-gold">Your Dream Home</span>
            </h1>

            <p className="pl-hero-subtitle">
              Plan your home financing with our interactive EMI calculator. Explore estimated monthly repayments based on your loan amount, interest rate, and repayment tenure.
            </p>

            {/* Quick Hero Features List */}
            <div className="pl-hero-features-list">
              <div className="hero-feature-item">
                <Clock size={18} className="feat-icon" />
                <span>Tenures up to 30 Years</span>
              </div>
              <div className="hero-feature-item">
                <Percent size={18} className="feat-icon" />
                <span>Illustrative Rates from 8.5% p.a.</span>
              </div>
              <div className="hero-feature-item">
                <ShieldCheck size={18} className="feat-icon" />
                <span>Zero Advance Sanction Fees</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pl-hero-actions">
              <button
                type="button"
                className="btn btn-gold btn-lg pl-hero-btn-primary"
                onClick={onCalculateClick}
                id="hero-btn-hl-calculate-emi"
              >
                <Calculator size={18} />
                <span>Calculate Your EMI</span>
              </button>

              <button
                type="button"
                className="btn btn-outline-white btn-lg pl-hero-btn-secondary"
                onClick={onEnquireClick}
                id="hero-btn-hl-enquire-now"
              >
                <span>Enquire About a Home Loan</span>
                <Send size={18} />
              </button>
            </div>
          </div>

          {/* Right Visual Card / Illustration */}
          <div className="pl-hero-visual-card">
            <div className="visual-card-glass">
              <div className="visual-icon-bubble">
                <Home size={36} className="visual-icon" />
              </div>
              <div className="visual-meta">
                <span className="visual-badge">Residential Financing</span>
                <h3 className="visual-title">Home Loan Snapshot</h3>
              </div>

              <div className="visual-stat-row">
                <div className="v-stat-item">
                  <span className="v-stat-lbl">Loan Range</span>
                  <strong className="v-stat-val">₹1 Lakh – ₹10 Cr</strong>
                </div>
                <div className="v-stat-item">
                  <span className="v-stat-lbl">Repayment Tenure</span>
                  <strong className="v-stat-val">Up to 30 Years</strong>
                </div>
              </div>

              <div className="visual-bullet-points">
                <div className="v-bullet">
                  <div className="v-dot" />
                  <span>Ready-to-move apartments & independent houses</span>
                </div>
                <div className="v-bullet">
                  <div className="v-dot" />
                  <span>Self-construction on approved residential plots</span>
                </div>
                <div className="v-bullet">
                  <div className="v-dot" />
                  <span>Home renovation, extension, and loan balance transfer</span>
                </div>
              </div>

              <div className="visual-note-strip">
                <Building2 size={15} />
                <span>Assisting prospective homebuyers across Mysore, Bangalore, and Karnataka</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
