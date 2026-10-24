import React from 'react';
import { ArrowDownRight, ShieldCheck, Sparkles, HelpCircle } from 'lucide-react';
import { formatINR } from '../../utils/emiCalculator';
import EMIChart from './EMIChart';

export default function LoanSummary({
  results,
  tenureYears,
  annualRate,
  onProceedToEnquiry
}) {
  const {
    monthlyEMI,
    principal,
    totalInterest,
    totalRepayment,
    principalPercent,
    interestPercent,
    tenureMonths
  } = results;

  return (
    <div className="loan-summary-card">
      <div className="summary-header">
        <div className="summary-badge">
          <Sparkles size={14} />
          <span>Live Calculation Breakdown</span>
        </div>
        <span className="summary-tenure-tag">{tenureYears} Years ({tenureMonths} Months)</span>
      </div>

      {/* Featured Monthly EMI Card */}
      <div className="monthly-emi-highlight">
        <span className="emi-label">Estimated Monthly EMI</span>
        <div className="emi-figure-wrap">
          <span className="emi-main-figure" id="live-monthly-emi">
            {formatINR(monthlyEMI)}
          </span>
          <span className="emi-per-month">/ month</span>
        </div>
        <p className="emi-subtitle">
          Based on an illustrative annual rate of <strong>{annualRate}%</strong> for <strong>{tenureYears} years</strong>.
        </p>
      </div>

      {/* Visual Chart Breakdown */}
      <div className="summary-chart-section">
        <h4 className="chart-heading">Payment Split</h4>
        <EMIChart
          principal={principal}
          totalInterest={totalInterest}
          totalRepayment={totalRepayment}
          principalPercent={principalPercent}
          interestPercent={interestPercent}
        />
      </div>

      {/* Three Detailed Metric Cards */}
      <div className="summary-metrics-grid">
        <div className="metric-box">
          <span className="metric-title">Principal Amount</span>
          <strong className="metric-value">{formatINR(principal)}</strong>
        </div>

        <div className="metric-box">
          <span className="metric-title">Total Interest</span>
          <strong className="metric-value text-accent">{formatINR(totalInterest)}</strong>
        </div>

        <div className="metric-box metric-box-highlight">
          <span className="metric-title">Total Amount Payable</span>
          <strong className="metric-value text-primary">{formatINR(totalRepayment)}</strong>
        </div>
      </div>

      {/* Action: Proceed to Enquiry */}
      <div className="summary-action-area">
        <button
          type="button"
          className="btn btn-gold btn-lg btn-proceed-enquiry"
          onClick={onProceedToEnquiry}
          id="btn-proceed-to-enquiry"
          aria-label="Proceed to Personal Loan Enquiry Form with current calculated amounts"
        >
          <span>Proceed to Enquiry</span>
          <ArrowDownRight size={18} />
        </button>
        <p className="action-hint">
          Clicking pre-fills this loan amount (<strong>{formatINR(principal)}</strong>) and tenure (<strong>{tenureYears} yrs</strong>) in the enquiry form below.
        </p>
      </div>

      {/* Regulatory Reminder Notice */}
      <div className="summary-compliance-note">
        <ShieldCheck size={16} className="compliance-icon" />
        <span>
          Illustrative estimate only. Final EMI, interest rate, and sanction terms are subject to lender credit policy and individual assessment.
        </span>
      </div>
    </div>
  );
}
