import React from 'react';
import { ArrowDownRight, ShieldCheck, Sparkles, Car, Clock, Percent } from 'lucide-react';
import { formatINR } from '../../utils/carLoanCalculator';
import CarLoanChart from './CarLoanChart';

export default function CarLoanResults({
  results,
  carType,
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
    <div className="hl-results-card cl-results-card">
      <div className="hl-results-header">
        <div className="hl-results-tag">
          <Sparkles size={14} />
          <span>Vehicle Finance Breakdown</span>
        </div>
        <span className="hl-tenure-tag">{carType} • {tenureYears} Years</span>
      </div>

      {/* Monthly Car Loan EMI (Largest figure in navy blue) */}
      <div className="hl-monthly-emi-highlight cl-monthly-emi-highlight">
        <span className="hl-emi-caption">Estimated Monthly Car Loan EMI</span>
        <div className="hl-emi-figure-wrap">
          <span className="hl-emi-large-figure" id="live-car-loan-emi">
            {formatINR(monthlyEMI)}
          </span>
          <span className="hl-emi-freq">/ month</span>
        </div>
        <div className="hl-emi-sub-params">
          <span><Percent size={13} /> {annualRate}% p.a.</span>
          <span className="param-sep">•</span>
          <span><Clock size={13} /> {tenureYears} Yrs ({tenureMonths} Mo)</span>
          <span className="param-sep">•</span>
          <span><Car size={13} /> {carType}</span>
        </div>
      </div>

      {/* Principal vs Interest Donut Chart */}
      <div className="hl-chart-section">
        <h4 className="hl-chart-title">Payment Proportion (Principal vs. Interest)</h4>
        <CarLoanChart
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
          <span className="hl-metric-label">Vehicle Category</span>
          <strong className="hl-metric-val">{carType}</strong>
        </div>

        <div className="hl-metric-card">
          <span className="hl-metric-label">Repayment Tenure</span>
          <strong className="hl-metric-val">{tenureYears} Years ({tenureMonths} EMIs)</strong>
        </div>

        <div className="hl-metric-card">
          <span className="hl-metric-label">Interest Rate</span>
          <strong className="hl-metric-val">{annualRate}% p.a.</strong>
        </div>
      </div>

      {/* Action: Proceed to Enquiry */}
      <div className="hl-results-action-area">
        <button
          type="button"
          className="btn btn-gold btn-lg btn-proceed-hl-enquiry"
          onClick={onProceedToEnquiry}
          id="btn-proceed-car-loan-enquiry"
          aria-label="Proceed to Car Loan Enquiry Form with current calculated amounts"
        >
          <span>Proceed to Enquiry</span>
          <ArrowDownRight size={18} />
        </button>
        <p className="hl-action-note">
          Transfers <strong>{carType}</strong>, <strong>{formatINR(principal)}</strong>, and <strong>{tenureYears} yrs</strong> directly into the enquiry form below.
        </p>
      </div>

      {/* Compliance Note */}
      <div className="hl-compliance-note">
        <ShieldCheck size={16} className="note-icon" />
        <span>
          Illustrative estimate. Final car loan sanction, interest rate, down payment requirements, and loan-to-value (LTV) limits are governed by the lending institution's credit policy.
        </span>
      </div>
    </div>
  );
}
