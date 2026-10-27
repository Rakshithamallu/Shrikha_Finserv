import React from 'react';
import {
  Wallet,
  Calculator,
  Send,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Clock,
  Sparkles,
  Award
} from 'lucide-react';

export default function PersonalLoanHero({ onBackToServices, onCalculateClick, onEnquireClick }) {
  return (
    <section className="personal-loan-hero-section pl-enquiry-hero" aria-label="Personal Loan Overview">
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
          <span className="breadcrumb-current" aria-current="page">Personal Loan</span>
        </nav>

        {/* Hero Main Content */}
        <div className="pl-hero-grid">
          <div className="pl-hero-content">
            <div className="section-tag section-tag-gold hero-badge-tag">
              <Sparkles size={14} />
              <span>Dedicated Financial Solutions • Mysore & Karnataka</span>
            </div>

            <h1 className="pl-hero-title">
              Personal Loan Solutions <span className="highlight-text-gold">Tailored to You</span>
            </h1>

            <p className="pl-hero-subtitle">
              Explore your borrowing options and estimate your monthly repayments with our easy-to-use Personal Loan EMI Calculator.
            </p>

            {/* Quick Hero Features List */}
            <div className="pl-hero-features-list">
              <div className="hero-feature-item">
                <Clock size={18} className="feat-icon" />
                <span>Tenures from 1 to 7 Years</span>
              </div>
              <div className="hero-feature-item">
                <ShieldCheck size={18} className="feat-icon" />
                <span>Zero Advance Sanction Fees</span>
              </div>
              <div className="hero-feature-item">
                <Award size={18} className="feat-icon" />
                <span>Objective Lender Comparison</span>
              </div>
            </div>

            {/* Primary & Secondary Hero Action Buttons */}
            <div className="pl-hero-actions">
              <button
                type="button"
                className="btn btn-gold btn-lg pl-hero-btn-primary"
                onClick={onCalculateClick}
                id="hero-btn-calculate-emi"
              >
                <Calculator size={18} />
                <span>Calculate Your EMI</span>
              </button>

              <button
                type="button"
                className="btn btn-outline-white btn-lg pl-hero-btn-secondary"
                onClick={onEnquireClick}
                id="hero-btn-enquire-now"
              >
                <span>Enquire Now</span>
                <Send size={18} />
              </button>
            </div>
          </div>

          {/* Right Visual Card / Illustration */}
          <div className="pl-hero-visual-card">
            <div className="visual-card-glass">
              <div className="visual-icon-bubble">
                <Wallet size={36} className="visual-icon" />
              </div>
              <div className="visual-meta">
                <span className="visual-badge">Individual Financing</span>
                <h3 className="visual-title">Personal Loan Highlights</h3>
              </div>

              <div className="visual-stat-row">
                <div className="v-stat-item">
                  <span className="v-stat-lbl">Loan Range</span>
                  <strong className="v-stat-val">₹25,000 – ₹1 Cr</strong>
                </div>
                <div className="v-stat-item">
                  <span className="v-stat-lbl">Illustrative Rates</span>
                  <strong className="v-stat-val">9.99% – 24% p.a.</strong>
                </div>
              </div>

              <div className="visual-bullet-points">
                <div className="v-bullet">
                  <div className="v-dot" />
                  <span>Medical emergencies & family events</span>
                </div>
                <div className="v-bullet">
                  <div className="v-dot" />
                  <span>Home renovations & consumer purchases</span>
                </div>
                <div className="v-bullet">
                  <div className="v-dot" />
                  <span>Debt consolidation under lower interest</span>
                </div>
              </div>

              <div className="visual-note-strip">
                <ShieldCheck size={14} />
                <span>Assisting both salaried & self-employed applicants across Karnataka</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
