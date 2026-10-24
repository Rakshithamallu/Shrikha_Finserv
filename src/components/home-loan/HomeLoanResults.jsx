import React from 'react';
import { ArrowDownRight, ShieldCheck, Sparkles, Home, Clock, Percent } from 'lucide-react';
import { formatINR } from '../../utils/homeLoanCalculator';
import PrincipalInterestChart from './PrincipalInterestChart';

export default function HomeLoanResults({
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
    <div className="hl-results-card">
      <div className="hl-results-header">
        <div className="hl-results-tag">
          <Sparkles size={14} />
          <span>Live Repayment Summary</span>
        </div>
        <span className="hl-tenure-tag">{tenureYears} Years ({tenureMonths} Months)</span>
      </div>

      {/* Primary Monthly EMI Display (Largest and most prominent figure in navy blue) */}
      <div className="hl-monthly-emi-highlight">
        <span className="hl-emi-caption">Estimated Monthly Home Loan EMI</span>
        <div className="hl-emi-figure-wrap">
          <span className="hl-emi-large-figure" id="live-home-loan-emi">
            {formatINR(monthlyEMI)}
          </span>
          <span className="hl-emi-freq">/ month</span>
        </div>
        <div className="hl-emi-sub-params">
          <span><Percent size={13} /> {annualRate}% p.a.</span>
          <span className="param-sep">•</span>
          <span><Clock size={13} /> {tenureYears} Yrs</span>
          <span className="param-sep">•</span>
          <span><Home size={13} /> {formatINR(principal)}</span>
        </div>
      </div>

      {/* Principal vs Interest Donut Chart */}
      <div className="hl-chart-section">
        <h4 className="hl-chart-title">Principal & Interest Distribution</h4>
        <PrincipalInterestChart
          principal={principal}
          totalInterest={totalInterest}
          totalRepayment={totalRepayment}
          principalPercent={principalPercent}
          interestPercent={interestPercent}
        />
      </div>

      {/* Summary Metrics Grid */}
      <div className="hl-summary-grid">
        <div className="hl-metric-card">
          <span className="hl-metric-label">Principal Amount</span>
          <strong className="hl-metric-val">{formatINR(principal)}</strong>
        </div>

        <div className="hl-metric-card">
          <span className="hl-metric-label">Total Interest Payable</span>
          <strong className="hl-metric-val text-gold">{formatINR(totalInterest)}</strong>
        </div>

        <div className="hl-metric-card hl-metric-card-primary">
          <span className="hl-metric-label">Total Repayment Amount</span>
          <strong className="hl-metric-val text-navy">{formatINR(totalRepayment)}</strong>
        </div>

        <div className="hl-metric-card">
          <span className="hl-metric-label">Loan Tenure</span>
          <strong className="hl-metric-val">{tenureYears} Years</strong>
        </div>

        <div className="hl-metric-card">
          <span className="hl-metric-label">Annual Interest Rate</span>
          <strong className="hl-metric-val">{annualRate}% p.a.</strong>
        </div>

        <div className="hl-metric-card">
          <span className="hl-metric-label">Number of EMIs</span>
          <strong className="hl-metric-val">{tenureMonths} Months</strong>
        </div>
      </div>

      {/* Action: Proceed to Enquiry */}
      <div className="hl-results-action-area">
        <button
          type="button"
          className="btn btn-gold btn-lg btn-proceed-hl-enquiry"
          onClick={onProceedToEnquiry}
          id="btn-proceed-home-loan-enquiry"
          aria-label="Proceed to Home Loan Enquiry Form with current calculated values"
        >
          <span>Proceed to Enquiry</span>
          <ArrowDownRight size={18} />
        </button>
        <p className="hl-action-note">
          Transfers <strong>{formatINR(principal)}</strong> & <strong>{tenureYears} yrs</strong> into the enquiry form below.
        </p>
      </div>

      {/* Disclaimer reminder */}
      <div className="hl-compliance-note">
        <ShieldCheck size={16} className="note-icon" />
        <span>
          Illustrative calculation. Final EMI, sanction terms, down payment, and interest rate are determined by the partner lending bank/NBFC.
        </span>
      </div>
    </div>
  );
}
