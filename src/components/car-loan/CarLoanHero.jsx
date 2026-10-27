import React from 'react';
import {
  Car,
  Calculator,
  Send,
  ChevronRight,
  Clock,
  ShieldCheck,
  Sparkles,
  Percent,
  CheckCircle2
} from 'lucide-react';

export default function CarLoanHero({ onBackToServices, onCalculateClick, onEnquireClick }) {
  return (
    <section className="personal-loan-hero-section hl-hero-section cl-hero-section pl-enquiry-hero" aria-label="Car Loan Overview">
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
          <span className="breadcrumb-current" aria-current="page">Car Loan</span>
        </nav>

        {/* Hero Grid */}
        <div className="pl-hero-grid">
          <div className="pl-hero-content">
            <div className="section-tag section-tag-gold hero-badge-tag">
              <Sparkles size={14} />
              <span>Auto Finance Advisory • Mysore & Karnataka</span>
            </div>

            <h1 className="pl-hero-title">
              Drive Your Dream Car with the <span className="highlight-text-gold">Right Financing Plan</span>
            </h1>

            <p className="pl-hero-subtitle">
              Explore your car financing options and calculate your estimated monthly EMI. Adjust your loan amount, repayment period, and interest rate to understand your potential repayment commitments.
            </p>

            {/* Quick Hero Features List */}
            <div className="pl-hero-features-list">
              <div className="hero-feature-item">
                <Clock size={18} className="feat-icon" />
                <span>Tenures from 1 to 8 Years</span>
              </div>
              <div className="hero-feature-item">
                <Percent size={18} className="feat-icon" />
                <span>Illustrative Rates from 8.5% p.a.</span>
              </div>
              <div className="hero-feature-item">
                <ShieldCheck size={18} className="feat-icon" />
                <span>New & Pre-Owned Financing</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pl-hero-actions">
              <button
                type="button"
                className="btn btn-gold btn-lg pl-hero-btn-primary"
                onClick={onCalculateClick}
                id="hero-btn-cl-calculate-emi"
              >
                <Calculator size={18} />
                <span>Calculate Your EMI</span>
              </button>

              <button
                type="button"
                className="btn btn-outline-white btn-lg pl-hero-btn-secondary"
                onClick={onEnquireClick}
                id="hero-btn-cl-enquire-now"
              >
                <span>Enquire About a Car Loan</span>
                <Send size={18} />
              </button>
            </div>
          </div>

          {/* Right Visual Card */}
          <div className="pl-hero-visual-card">
            <div className="visual-card-glass">
              <div className="visual-icon-bubble">
                <Car size={36} className="visual-icon" />
              </div>
              <div className="visual-meta">
                <span className="visual-badge">Mobility Finance</span>
                <h3 className="visual-title">Car Loan Snapshot</h3>
              </div>

              <div className="visual-stat-row">
                <div className="v-stat-item">
                  <span className="v-stat-lbl">Loan Range</span>
                  <strong className="v-stat-val">₹1 Lakh – ₹50 Lakh</strong>
                </div>
                <div className="v-stat-item">
                  <span className="v-stat-lbl">Repayment Tenure</span>
                  <strong className="v-stat-val">Up to 8 Years</strong>
                </div>
              </div>

              <div className="visual-bullet-points">
                <div className="v-bullet">
                  <div className="v-dot" />
                  <span>Funding up to 85%–100% of on-road vehicle cost</span>
                </div>
                <div className="v-bullet">
                  <div className="v-dot" />
                  <span>Hassle-free financing for verified pre-owned cars</span>
                </div>
                <div className="v-bullet">
                  <div className="v-dot" />
                  <span>Fast dealer quotation review & documentation guidance</span>
                </div>
              </div>

              <div className="visual-note-strip">
                <CheckCircle2 size={15} />
                <span>Assisting car buyers across Mysore, Mandya, Bengaluru & Karnataka</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
