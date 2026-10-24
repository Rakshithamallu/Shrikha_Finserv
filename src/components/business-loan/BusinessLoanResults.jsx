import React from 'react';
import {
  RotateCcw,
  Send,
  IndianRupee,
  Clock,
  Percent,
  TrendingUp,
  FileCheck2,
  Sparkles,
  Info
} from 'lucide-react';
import { formatINR } from '../../utils/businessLoanCalculator';
import PrincipalInterestChart from './PrincipalInterestChart';

export default function BusinessLoanResults({
  results,
  annualRate,
  onReset,
  onProceedToEnquiry
}) {
  const {
    monthlyEMI,
    principal,
    totalInterest,
    totalRepayment,
    principalPercent,
    interestPercent,
    tenureYears,
    tenureMonths
  } = results;

  return (
    <div className="calculator-results-panel bl-results-panel">
      {/* 1. Monthly EMI Highlight Card */}
      <div className="monthly-emi-highlight-card bl-monthly-emi-highlight">
        <div className="highlight-tag">
          <Sparkles size={14} />
          <span>Estimated Monthly Instalment</span>
        </div>
        <div className="highlight-figure-box">
          <span className="figure-currency">₹</span>
          <span className="figure-amount">{monthlyEMI.toLocaleString('en-IN')}</span>
          <span className="figure-period">/ month</span>
        </div>
        <p className="highlight-caption">
          For {tenureYears} Years ({tenureMonths} Monthly Instalments) at {annualRate}% p.a.
        </p>
      </div>

      {/* 2. Visual Donut Breakdown Chart */}
      <div className="results-chart-section">
        <h4 className="chart-heading">Payment Composition</h4>
        <PrincipalInterestChart
          principal={principal}
          totalInterest={totalInterest}
          principalPercent={principalPercent}
          interestPercent={interestPercent}
        />
      </div>

      {/* 3. Four Core Loan Breakdown Summary Cards */}
      <div className="loan-breakdown-grid four-col-summary">
        <div className="breakdown-card">
          <span className="breakdown-lbl">Monthly EMI</span>
          <strong className="breakdown-val emi-accent">{formatINR(monthlyEMI)}</strong>
        </div>

        <div className="breakdown-card">
          <span className="breakdown-lbl">Principal Amount</span>
          <strong className="breakdown-val">{formatINR(principal)}</strong>
        </div>

        <div className="breakdown-card">
          <span className="breakdown-lbl">Total Interest</span>
          <strong className="breakdown-val text-interest">{formatINR(totalInterest)}</strong>
        </div>

        <div className="breakdown-card">
          <span className="breakdown-lbl">Total Repayment</span>
          <strong className="breakdown-val highlight-bold">{formatINR(totalRepayment)}</strong>
        </div>
      </div>

      {/* 4. Active Parameters Summary Strip */}
      <div className="active-parameters-strip">
        <div className="param-item">
          <span className="param-label">Borrowing Sum:</span>
          <span className="param-value">{formatINR(principal)}</span>
        </div>
        <div className="param-item">
          <span className="param-label">Repayment Tenure:</span>
          <span className="param-value">{tenureYears} Years</span>
        </div>
        <div className="param-item">
          <span className="param-label">Annual Interest:</span>
          <span className="param-value">{annualRate}% p.a.</span>
        </div>
      </div>

      {/* 5. Action Buttons: Reset & Proceed to Enquiry */}
      <div className="results-action-buttons">
        <button
          type="button"
          className="btn btn-outline-primary btn-reset-calc"
          onClick={onReset}
          id="btn-bl-reset-calculator"
          aria-label="Reset Calculator to Defaults"
        >
          <RotateCcw size={16} />
          <span>Reset Calculator</span>
        </button>

        <button
          type="button"
          className="btn btn-primary btn-proceed-enquiry"
          onClick={onProceedToEnquiry}
          id="btn-bl-proceed-enquiry"
          aria-label="Proceed to Business Loan Enquiry Form"
        >
          <span>Proceed to Enquiry</span>
          <Send size={16} />
        </button>
      </div>

      <div className="results-footnote">
        <Info size={14} className="footnote-icon" />
        <span>
          Illustrative calculation based on reducing-balance method. Actual sanctioned terms depend on lender assessment, turnover, and eligibility.
        </span>
      </div>
    </div>
  );
}
