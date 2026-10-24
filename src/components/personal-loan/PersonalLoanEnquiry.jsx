import React, { useState, useMemo, useEffect } from 'react';
import {
  Wallet,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  AlertTriangle,
  Zap,
  ShieldCheck,
  Percent
} from 'lucide-react';
import {
  PERSONAL_LOAN_DEFAULTS,
  calculatePersonalLoanEMI
} from '../../utils/personalLoanCalculator';
import PersonalLoanForm from './PersonalLoanForm';
import PersonalLoanEMICalculator from './PersonalLoanEMICalculator';
import PersonalLoanWhyUs from './PersonalLoanWhyUs';
import PersonalLoanHowItWorks from './PersonalLoanHowItWorks';
import PersonalLoanFAQ from './PersonalLoanFAQ';

export default function PersonalLoanEnquiry({ onBackToServices }) {
  // Shared state connecting form and calculator
  const [loanAmount, setLoanAmount] = useState(PERSONAL_LOAN_DEFAULTS.LOAN_AMOUNT); // ₹5,00,000
  const [tenureMonths, setTenureMonths] = useState(PERSONAL_LOAN_DEFAULTS.TENURE_MONTHS); // 36 Months
  const [annualRate, setAnnualRate] = useState(PERSONAL_LOAN_DEFAULTS.ANNUAL_INTEREST_RATE); // 12% p.a.

  // Real-time calculated EMI results
  const results = useMemo(() => {
    return calculatePersonalLoanEMI(loanAmount, annualRate, tenureMonths);
  }, [loanAmount, annualRate, tenureMonths]);

  // Reset all to defaults
  const handleResetAll = () => {
    setLoanAmount(PERSONAL_LOAN_DEFAULTS.LOAN_AMOUNT);
    setTenureMonths(PERSONAL_LOAN_DEFAULTS.TENURE_MONTHS);
    setAnnualRate(PERSONAL_LOAN_DEFAULTS.ANNUAL_INTEREST_RATE);
  };

  return (
    <div className="personal-loan-enquiry-page">
      {/* Hero / Header Section */}
      <section className="personal-loan-hero-section pl-enquiry-hero" aria-label="Personal Loan Enquiry Header">
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
          {/* Breadcrumb Navigation: Home → Personal Loan → Enquiry */}
          <nav className="pl-breadcrumb" aria-label="Breadcrumb">
            <button
              type="button"
              className="breadcrumb-link"
              onClick={() => onBackToServices('hero')}
            >
              Home
            </button>
            <ChevronRight size={14} className="breadcrumb-sep" />
            <button
              type="button"
              className="breadcrumb-link"
              onClick={() => onBackToServices('services')}
            >
              Personal Loan
            </button>
            <ChevronRight size={14} className="breadcrumb-sep" />
            <span className="breadcrumb-current" aria-current="page">Enquiry</span>
          </nav>

          <div className="pl-enquiry-hero-grid">
            <div className="pl-enquiry-header-box">
              <div className="section-tag section-tag-gold hero-badge-tag">
                <Sparkles size={14} />
                <span>Instant Loan Modeling</span>
              </div>

              <h1 className="pl-enquiry-main-title">
                Personal Loan Enquiry
              </h1>

              <p className="pl-enquiry-primary-desc">
                Tell us a little about yourself and explore your estimated monthly loan repayments.
              </p>

              <p className="pl-enquiry-secondary-desc">
                Plan your personal loan with a simple enquiry form and an easy-to-use EMI calculator.
              </p>

              <div className="pl-enquiry-back-wrap">
                <button
                  type="button"
                  className="btn-back-link"
                  onClick={() => onBackToServices('services')}
                  title="Return to Personal Loans"
                >
                  <ArrowLeft size={16} />
                  <span>Back to Personal Loans</span>
                </button>
              </div>
            </div>

            {/* Right Side Visual Highlights (Filling empty space in theme colors) */}
            <div className="pl-enquiry-hero-visual" aria-hidden="true">
              <div className="pl-hero-stat-card pl-stat-card-1">
                <div className="pl-stat-icon-wrap">
                  <Zap size={18} />
                </div>
                <div className="pl-stat-info">
                  <span className="pl-stat-title">Quick Approvals</span>
                  <span className="pl-stat-sub">Minimal KYC & 100% digital verification</span>
                </div>
              </div>

              <div className="pl-hero-stat-card pl-stat-card-2">
                <div className="pl-stat-icon-wrap">
                  <ShieldCheck size={18} />
                </div>
                <div className="pl-stat-info">
                  <span className="pl-stat-title">Up to ₹50 Lakhs</span>
                  <span className="pl-stat-sub">Flexible tenure from 6 to 84 months</span>
                </div>
              </div>

              <div className="pl-hero-stat-card pl-stat-card-3">
                <div className="pl-stat-icon-wrap">
                  <Percent size={18} />
                </div>
                <div className="pl-stat-info">
                  <span className="pl-stat-title">From 10.5% p.a.</span>
                  <span className="pl-stat-sub">Competitive rates tailored to your profile</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Side-by-Side Area */}
      <section className="section pl-interactive-section" aria-label="Customer Enquiry and EMI Calculator">
        <div className="container">
          {/* Side-by-Side Two-Column Desktop Grid / Stacked on Mobile */}
          <div className="personal-loan-side-by-side-grid">
            {/* Column 1: Customer Enquiry Form Card */}
            <div className="grid-col-form">
              <PersonalLoanForm
                loanAmount={loanAmount}
                onLoanAmountChange={setLoanAmount}
                tenureMonths={tenureMonths}
                onTenureChange={setTenureMonths}
                onResetAll={handleResetAll}
              />
            </div>

            {/* Column 2: Interactive EMI Calculator Card */}
            <div className="grid-col-calculator">
              <PersonalLoanEMICalculator
                loanAmount={loanAmount}
                onLoanAmountChange={setLoanAmount}
                tenureMonths={tenureMonths}
                onTenureChange={setTenureMonths}
                annualRate={annualRate}
                onRateChange={setAnnualRate}
                results={results}
                onReset={handleResetAll}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Shrikha Finserv */}
      <PersonalLoanWhyUs />

      {/* How It Works */}
      <PersonalLoanHowItWorks />

      {/* Frequently Asked Questions */}
      <PersonalLoanFAQ />

      {/* Regulatory Disclaimer Section */}
      <section className="section pl-disclaimer-section" aria-label="Regulatory Disclaimer">
        <div className="container container-narrow">
          <div className="pl-mandatory-disclaimer-card">
            <div className="disclaimer-header">
              <AlertTriangle size={20} className="disclaimer-icon" />
              <h4 className="disclaimer-title">Regulatory & Calculator Disclaimer</h4>
            </div>
            <p className="disclaimer-body">
              These calculations are estimates based on the values entered. Actual interest rates, fees, eligibility, and repayment terms may vary. This calculator does not constitute a loan offer or guarantee of approval.
            </p>
            <div className="disclaimer-footer-row">
              <span>Shrikha Finserv • MIG 12, Block No. 9, WeCreate Space, Saraswathipuram, Mysore – 570009</span>
              <button
                type="button"
                className="btn-back-services-link"
                onClick={() => onBackToServices('services')}
              >
                <ArrowLeft size={14} />
                <span>Return to All Services</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
