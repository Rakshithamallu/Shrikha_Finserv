import React from 'react';
import {
  Calculator,
  RotateCcw,
  IndianRupee,
  Calendar,
  Percent,
  Info,
  Sliders,
  Sparkles
} from 'lucide-react';
import {
  PERSONAL_LOAN_DEFAULTS,
  formatINR,
  formatCompactINR,
  PERSONAL_AMOUNT_PRESETS,
  PERSONAL_TENURE_PRESETS,
  PERSONAL_RATE_PRESETS
} from '../../utils/personalLoanCalculator';

export default function PersonalLoanEMICalculator({
  loanAmount,
  onLoanAmountChange,
  tenureMonths,
  onTenureChange,
  annualRate,
  onRateChange,
  results,
  onReset
}) {
  const {
    monthlyEMI,
    principal,
    totalInterest,
    totalRepayment,
    principalPercent,
    interestPercent
  } = results;

  // Handlers for Loan Amount
  const handleAmountSlider = (e) => {
    const val = Number(e.target.value);
    onLoanAmountChange(val);
  };

  const handleAmountInput = (e) => {
    const cleaned = e.target.value.replace(/[^0-9]/g, '');
    if (cleaned !== '') {
      const num = Number(cleaned);
      if (!isNaN(num)) {
        onLoanAmountChange(Math.min(PERSONAL_LOAN_DEFAULTS.MAX_LOAN_AMOUNT, num));
      }
    } else {
      onLoanAmountChange(0);
    }
  };

  const handleAmountBlur = () => {
    if (loanAmount < PERSONAL_LOAN_DEFAULTS.MIN_LOAN_AMOUNT) {
      onLoanAmountChange(PERSONAL_LOAN_DEFAULTS.MIN_LOAN_AMOUNT);
    } else if (loanAmount > PERSONAL_LOAN_DEFAULTS.MAX_LOAN_AMOUNT) {
      onLoanAmountChange(PERSONAL_LOAN_DEFAULTS.MAX_LOAN_AMOUNT);
    }
  };

  // Handlers for Tenure (in months)
  const handleTenureSlider = (e) => {
    const val = Number(e.target.value);
    onTenureChange(val);
  };

  const handleTenureInput = (e) => {
    const cleaned = e.target.value.replace(/[^0-9]/g, '');
    if (cleaned !== '') {
      const num = Number(cleaned);
      if (!isNaN(num)) {
        onTenureChange(Math.min(PERSONAL_LOAN_DEFAULTS.MAX_TENURE_MONTHS, num));
      }
    } else {
      onTenureChange(0);
    }
  };

  const handleTenureBlur = () => {
    if (tenureMonths < PERSONAL_LOAN_DEFAULTS.MIN_TENURE_MONTHS) {
      onTenureChange(PERSONAL_LOAN_DEFAULTS.MIN_TENURE_MONTHS);
    } else if (tenureMonths > PERSONAL_LOAN_DEFAULTS.MAX_TENURE_MONTHS) {
      onTenureChange(PERSONAL_LOAN_DEFAULTS.MAX_TENURE_MONTHS);
    }
  };

  // Handlers for Interest Rate
  const handleRateSlider = (e) => {
    const val = Number(e.target.value);
    onRateChange(val);
  };

  const handleRateInput = (e) => {
    const cleaned = e.target.value.replace(/[^0-9.]/g, '');
    if (cleaned !== '' && !isNaN(Number(cleaned))) {
      const num = Number(cleaned);
      onRateChange(Math.min(PERSONAL_LOAN_DEFAULTS.MAX_INTEREST_RATE, num));
    }
  };

  const handleRateBlur = () => {
    if (annualRate < PERSONAL_LOAN_DEFAULTS.MIN_INTEREST_RATE) {
      onRateChange(PERSONAL_LOAN_DEFAULTS.MIN_INTEREST_RATE);
    } else if (annualRate > PERSONAL_LOAN_DEFAULTS.MAX_INTEREST_RATE) {
      onRateChange(PERSONAL_LOAN_DEFAULTS.MAX_INTEREST_RATE);
    }
  };

  // Converted year label helper
  const yearsEquivalent = (tenureMonths / 12).toFixed(1);

  return (
    <div className="calculator-card pl-enquiry-calculator-card" id="personal-loan-emi-calculator">
      {/* Header */}
      <div className="card-top-header">
        <div className="card-title-wrap">
          <div className="calculator-icon-badge">
            <Calculator size={20} />
          </div>
          <div>
            <h3 className="card-heading">Personal Loan EMI Calculator</h3>
            <p className="card-subheading">
              Estimate your monthly instalment, total interest, and total repayment.
            </p>
          </div>
        </div>

        <button
          type="button"
          className="reset-calculator-btn"
          onClick={onReset}
          title="Restore default settings"
          aria-label="Reset Calculator"
        >
          <RotateCcw size={15} />
          <span>Reset</span>
        </button>
      </div>

      {/* Input Controls */}
      <div className="calc-inputs-stack">
        {/* Field A: Loan Amount */}
        <div className="calc-field-group">
          <div className="calc-field-header">
            <label htmlFor="ple-loan-amount" className="calc-label">
              <span className="label-icon-box">
                <IndianRupee size={15} />
              </span>
              <span>Loan Amount (₹)</span>
            </label>
            <div className="calc-input-box">
              <span className="currency-prefix">₹</span>
              <input
                id="ple-loan-amount"
                type="text"
                inputMode="numeric"
                className="calc-number-input"
                value={loanAmount ? Number(loanAmount).toLocaleString('en-IN') : ''}
                onChange={handleAmountInput}
                onBlur={handleAmountBlur}
                aria-label="Required personal loan amount in rupees"
              />
            </div>
          </div>

          <div className="range-slider-wrapper">
            <input
              type="range"
              min={PERSONAL_LOAN_DEFAULTS.MIN_LOAN_AMOUNT}
              max={PERSONAL_LOAN_DEFAULTS.MAX_LOAN_AMOUNT}
              step={PERSONAL_LOAN_DEFAULTS.LOAN_AMOUNT_STEP}
              value={loanAmount}
              onChange={handleAmountSlider}
              className="calc-range-slider"
              aria-label="Adjust personal loan amount"
            />
            <div
              className="slider-track-fill"
              style={{
                width: `${((loanAmount - PERSONAL_LOAN_DEFAULTS.MIN_LOAN_AMOUNT) / (PERSONAL_LOAN_DEFAULTS.MAX_LOAN_AMOUNT - PERSONAL_LOAN_DEFAULTS.MIN_LOAN_AMOUNT)) * 100}%`
              }}
            />
          </div>

          {/* Quick Amount Chips */}
          <div className="quick-presets">
            {PERSONAL_AMOUNT_PRESETS.map((val) => (
              <button
                key={val}
                type="button"
                className={`preset-chip ${loanAmount === val ? 'is-active' : ''}`}
                onClick={() => onLoanAmountChange(val)}
              >
                {formatCompactINR(val)}
              </button>
            ))}
          </div>
        </div>

        {/* Field B: Annual Interest Rate */}
        <div className="calc-field-group">
          <div className="calc-field-header">
            <label htmlFor="ple-interest-rate" className="calc-label">
              <span className="label-icon-box">
                <Percent size={15} />
              </span>
              <span>Interest Rate (% p.a.)</span>
            </label>
            <div className="calc-input-box rate-input-box">
              <input
                id="ple-interest-rate"
                type="text"
                inputMode="decimal"
                className="calc-number-input"
                value={annualRate}
                onChange={handleRateInput}
                onBlur={handleRateBlur}
                aria-label="Annual interest rate in percent"
              />
              <span className="rate-unit-label">% p.a.</span>
            </div>
          </div>

          <div className="range-slider-wrapper">
            <input
              type="range"
              min={PERSONAL_LOAN_DEFAULTS.MIN_INTEREST_RATE}
              max={PERSONAL_LOAN_DEFAULTS.MAX_INTEREST_RATE}
              step={PERSONAL_LOAN_DEFAULTS.INTEREST_RATE_STEP}
              value={annualRate}
              onChange={handleRateSlider}
              className="calc-range-slider"
              aria-label="Adjust interest rate"
            />
            <div
              className="slider-track-fill"
              style={{
                width: `${((annualRate - PERSONAL_LOAN_DEFAULTS.MIN_INTEREST_RATE) / (PERSONAL_LOAN_DEFAULTS.MAX_INTEREST_RATE - PERSONAL_LOAN_DEFAULTS.MIN_INTEREST_RATE)) * 100}%`
              }}
            />
          </div>

          <div className="quick-presets">
            {PERSONAL_RATE_PRESETS.map((rate) => (
              <button
                key={rate}
                type="button"
                className={`preset-chip ${annualRate === rate ? 'is-active' : ''}`}
                onClick={() => onRateChange(rate)}
              >
                {rate}%
              </button>
            ))}
          </div>

          <span className="field-hint-text">
            *Illustrative assumptions for estimation purposes; actual lender rates may vary based on eligibility.
          </span>
        </div>

        {/* Field C: Loan Tenure (in Months) */}
        <div className="calc-field-group">
          <div className="calc-field-header">
            <label htmlFor="ple-loan-tenure" className="calc-label">
              <span className="label-icon-box">
                <Calendar size={15} />
              </span>
              <span>Loan Tenure ({tenureMonths} Months / {yearsEquivalent} Yrs)</span>
            </label>
            <div className="calc-input-box tenure-input-box">
              <input
                id="ple-loan-tenure"
                type="text"
                inputMode="numeric"
                className="calc-number-input"
                value={tenureMonths}
                onChange={handleTenureInput}
                onBlur={handleTenureBlur}
                aria-label="Loan tenure in months"
              />
              <span className="tenure-unit-label">Months</span>
            </div>
          </div>

          <div className="range-slider-wrapper">
            <input
              type="range"
              min={PERSONAL_LOAN_DEFAULTS.MIN_TENURE_MONTHS}
              max={PERSONAL_LOAN_DEFAULTS.MAX_TENURE_MONTHS}
              step={PERSONAL_LOAN_DEFAULTS.TENURE_MONTHS_STEP}
              value={tenureMonths}
              onChange={handleTenureSlider}
              className="calc-range-slider"
              aria-label="Adjust personal loan tenure in months"
            />
            <div
              className="slider-track-fill"
              style={{
                width: `${((tenureMonths - PERSONAL_LOAN_DEFAULTS.MIN_TENURE_MONTHS) / (PERSONAL_LOAN_DEFAULTS.MAX_TENURE_MONTHS - PERSONAL_LOAN_DEFAULTS.MIN_TENURE_MONTHS)) * 100}%`
              }}
            />
          </div>

          <div className="quick-presets">
            {PERSONAL_TENURE_PRESETS.map((item) => (
              <button
                key={item.months}
                type="button"
                className={`preset-chip ${tenureMonths === item.months ? 'is-active' : ''}`}
                onClick={() => onTenureChange(item.months)}
              >
                {item.months}M ({item.label})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Prominent Results Panel */}
      <div className="calc-results-section">
        <div className="monthly-emi-banner">
          <div className="banner-tag">
            <Sparkles size={14} />
            <span>Estimated Monthly EMI</span>
          </div>
          <div className="banner-amount">
            <span className="currency-symbol">₹</span>
            <span className="main-number">{monthlyEMI.toLocaleString('en-IN')}</span>
            <span className="per-month">/ month</span>
          </div>
          <p className="banner-subtext">
            For {tenureMonths} Months at {annualRate}% p.a.
          </p>
        </div>

        {/* 4 Summary Cards */}
        <div className="four-metrics-grid">
          <div className="metric-box">
            <span className="metric-label">Estimated Monthly EMI</span>
            <strong className="metric-value emi-color">{formatINR(monthlyEMI)}</strong>
          </div>

          <div className="metric-box">
            <span className="metric-label">Total Principal</span>
            <strong className="metric-value">{formatINR(principal)}</strong>
          </div>

          <div className="metric-box">
            <span className="metric-label">Total Interest Payable</span>
            <strong className="metric-value interest-color">{formatINR(totalInterest)}</strong>
          </div>

          <div className="metric-box">
            <span className="metric-label">Total Repayment Amount</span>
            <strong className="metric-value total-color">{formatINR(totalRepayment)}</strong>
          </div>
        </div>

        {/* Visual Progress Breakdown */}
        <div className="visual-progress-breakdown">
          <div className="progress-labels-row">
            <span className="progress-lbl">
              <span className="color-dot principal-dot" /> Principal ({principalPercent}%)
            </span>
            <span className="progress-lbl">
              <span className="color-dot interest-dot" /> Interest ({interestPercent}%)
            </span>
          </div>
          <div className="horizontal-progress-bar">
            <div
              className="progress-fill-principal"
              style={{ width: `${principalPercent}%` }}
              title={`Principal: ${principalPercent}%`}
            />
            <div
              className="progress-fill-interest"
              style={{ width: `${interestPercent}%` }}
              title={`Interest: ${interestPercent}%`}
            />
          </div>
        </div>

        {/* Disclaimer */}
        <div className="calc-disclaimer-box">
          <Info size={15} className="disclaimer-info-icon" />
          <p>
            These calculations are estimates based on the values entered. Actual interest rates, fees, eligibility, and repayment terms may vary. This calculator does not constitute a loan offer or guarantee of approval.
          </p>
        </div>
      </div>
    </div>
  );
}
