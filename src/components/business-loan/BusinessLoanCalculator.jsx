import React, { useState, useMemo, useEffect } from 'react';
import {
  Calculator,
  RotateCcw,
  IndianRupee,
  Calendar,
  Percent,
  Info,
  Sliders,
  Briefcase,
  Sparkles
} from 'lucide-react';
import {
  BUSINESS_LOAN_DEFAULTS,
  calculateBusinessLoanEMI,
  formatINR,
  formatCompactINR,
  BUSINESS_AMOUNT_PRESETS,
  BUSINESS_TENURE_PRESETS,
  BUSINESS_RATE_PRESETS
} from '../../utils/businessLoanCalculator';
import BusinessLoanResults from './BusinessLoanResults';
import BusinessFundingPlanner from './BusinessFundingPlanner';

export default function BusinessLoanCalculator({
  transferredAmount,
  transferredTimestamp,
  onProceedToEnquiry
}) {
  const [loanAmount, setLoanAmount] = useState(BUSINESS_LOAN_DEFAULTS.LOAN_AMOUNT);
  const [tenureYears, setTenureYears] = useState(BUSINESS_LOAN_DEFAULTS.TENURE_YEARS);
  const [annualRate, setAnnualRate] = useState(BUSINESS_LOAN_DEFAULTS.ANNUAL_INTEREST_RATE);
  const [selectedPurpose, setSelectedPurpose] = useState('Working Capital');

  const [rawAmountInput, setRawAmountInput] = useState(String(BUSINESS_LOAN_DEFAULTS.LOAN_AMOUNT));
  const [rawTenureInput, setRawTenureInput] = useState(String(BUSINESS_LOAN_DEFAULTS.TENURE_YEARS));
  const [rawRateInput, setRawRateInput] = useState(String(BUSINESS_LOAN_DEFAULTS.ANNUAL_INTEREST_RATE));

  // If amount transferred from Business Funding Planner
  useEffect(() => {
    if (transferredAmount && transferredAmount > 0) {
      setLoanAmount(transferredAmount);
      setRawAmountInput(String(transferredAmount));
    }
  }, [transferredTimestamp]);

  // Live calculation results
  const results = useMemo(() => {
    return calculateBusinessLoanEMI(loanAmount, annualRate, tenureYears);
  }, [loanAmount, annualRate, tenureYears]);

  // Handlers: Loan Amount
  const handleAmountSlider = (e) => {
    const val = Number(e.target.value);
    setLoanAmount(val);
    setRawAmountInput(String(val));
  };

  const handleAmountInput = (e) => {
    const cleaned = e.target.value.replace(/[^0-9]/g, '');
    setRawAmountInput(cleaned);
    if (cleaned !== '') {
      const num = Number(cleaned);
      if (!isNaN(num)) {
        setLoanAmount(Math.min(BUSINESS_LOAN_DEFAULTS.MAX_LOAN_AMOUNT, num));
      }
    }
  };

  const handleAmountBlur = () => {
    let num = Number(rawAmountInput);
    if (isNaN(num) || num < BUSINESS_LOAN_DEFAULTS.MIN_LOAN_AMOUNT) {
      num = BUSINESS_LOAN_DEFAULTS.MIN_LOAN_AMOUNT;
    } else if (num > BUSINESS_LOAN_DEFAULTS.MAX_LOAN_AMOUNT) {
      num = BUSINESS_LOAN_DEFAULTS.MAX_LOAN_AMOUNT;
    }
    setLoanAmount(num);
    setRawAmountInput(String(num));
  };

  // Handlers: Tenure
  const handleTenureSlider = (e) => {
    const val = Number(e.target.value);
    setTenureYears(val);
    setRawTenureInput(String(val));
  };

  const handleTenureInput = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setRawTenureInput(val);
    if (val !== '') {
      const num = Number(val);
      if (!isNaN(num)) {
        setTenureYears(Math.min(BUSINESS_LOAN_DEFAULTS.MAX_TENURE_YEARS, num));
      }
    }
  };

  const handleTenureBlur = () => {
    let num = Number(rawTenureInput);
    if (isNaN(num) || num < BUSINESS_LOAN_DEFAULTS.MIN_TENURE_YEARS) {
      num = BUSINESS_LOAN_DEFAULTS.MIN_TENURE_YEARS;
    } else if (num > BUSINESS_LOAN_DEFAULTS.MAX_TENURE_YEARS) {
      num = BUSINESS_LOAN_DEFAULTS.MAX_TENURE_YEARS;
    }
    setTenureYears(num);
    setRawTenureInput(String(num));
  };

  // Handlers: Interest Rate
  const handleRateSlider = (e) => {
    const val = Number(e.target.value);
    setAnnualRate(val);
    setRawRateInput(String(val));
  };

  const handleRateInput = (e) => {
    const val = e.target.value.replace(/[^0-9.]/g, '');
    setRawRateInput(val);
    if (val !== '' && !isNaN(Number(val))) {
      const num = Number(val);
      setAnnualRate(Math.min(BUSINESS_LOAN_DEFAULTS.MAX_INTEREST_RATE, num));
    }
  };

  const handleRateBlur = () => {
    let num = Number(rawRateInput);
    if (isNaN(num) || num < BUSINESS_LOAN_DEFAULTS.MIN_INTEREST_RATE) {
      num = BUSINESS_LOAN_DEFAULTS.MIN_INTEREST_RATE;
    } else if (num > BUSINESS_LOAN_DEFAULTS.MAX_INTEREST_RATE) {
      num = BUSINESS_LOAN_DEFAULTS.MAX_INTEREST_RATE;
    }
    setAnnualRate(num);
    setRawRateInput(String(num));
  };

  // Reset to defaults
  const handleReset = () => {
    setLoanAmount(BUSINESS_LOAN_DEFAULTS.LOAN_AMOUNT);
    setRawAmountInput(String(BUSINESS_LOAN_DEFAULTS.LOAN_AMOUNT));
    setTenureYears(BUSINESS_LOAN_DEFAULTS.TENURE_YEARS);
    setRawTenureInput(String(BUSINESS_LOAN_DEFAULTS.TENURE_YEARS));
    setAnnualRate(BUSINESS_LOAN_DEFAULTS.ANNUAL_INTEREST_RATE);
    setRawRateInput(String(BUSINESS_LOAN_DEFAULTS.ANNUAL_INTEREST_RATE));
  };

  const handleProceedClick = () => {
    if (onProceedToEnquiry) {
      onProceedToEnquiry({
        loanAmount,
        tenureYears,
        loanPurpose: selectedPurpose
      });
    }
  };

  const handleTransferFromPlanner = (amount, purpose) => {
    setLoanAmount(amount);
    setRawAmountInput(String(amount));
    if (purpose) {
      setSelectedPurpose(purpose);
    }
    const el = document.getElementById('business-loan-calculator');
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="business-loan-calculator"
      className="section hl-calculator-section bl-calculator-section"
      aria-label="Interactive Business Loan EMI Calculator"
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag section-tag-gold">
            <Calculator size={14} />
            <span>Commercial Finance Simulator</span>
          </div>
          <h2 className="section-title">
            Business Loan <span className="highlight-text">EMI Calculator</span>
          </h2>
          <p className="section-desc">
            Estimate your monthly repayments for working capital, machinery procurement, inventory buildup, or business expansion with our transparent reducing-balance calculator.
          </p>
        </div>

        {/* Main Two-Column Calculator Layout */}
        <div className="calculator-layout-card">
          {/* Left Column: Input Controls */}
          <div className="calculator-inputs-column">
            <div className="column-top-bar">
              <div className="inputs-heading-wrap">
                <Sliders size={20} className="column-icon" />
                <h3 className="column-title">Financing Inputs</h3>
              </div>
              <button
                type="button"
                className="reset-calculator-btn"
                onClick={handleReset}
                title="Restore default calculator settings"
                aria-label="Reset Calculator"
              >
                <RotateCcw size={15} />
                <span>Reset Defaults</span>
              </button>
            </div>

            {/* Field A: Business Loan Amount */}
            <div className="calc-field-group">
              <div className="calc-field-header">
                <label htmlFor="bl-loan-amount" className="calc-label">
                  <span className="label-icon-box">
                    <IndianRupee size={16} />
                  </span>
                  <span>Business Loan Amount (₹)</span>
                </label>
                <div className="calc-input-box">
                  <span className="currency-prefix">₹</span>
                  <input
                    id="bl-loan-amount"
                    type="text"
                    inputMode="numeric"
                    className="calc-number-input"
                    value={rawAmountInput ? Number(rawAmountInput).toLocaleString('en-IN') : ''}
                    onChange={handleAmountInput}
                    onBlur={handleAmountBlur}
                    aria-label="Business loan amount in rupees"
                  />
                </div>
              </div>

              {/* Range Slider */}
              <div className="range-slider-wrapper">
                <input
                  type="range"
                  min={BUSINESS_LOAN_DEFAULTS.MIN_LOAN_AMOUNT}
                  max={BUSINESS_LOAN_DEFAULTS.MAX_LOAN_AMOUNT}
                  step={BUSINESS_LOAN_DEFAULTS.LOAN_AMOUNT_STEP}
                  value={loanAmount}
                  onChange={handleAmountSlider}
                  className="calc-range-slider"
                  aria-label="Adjust Business Loan Amount"
                />
                <div className="slider-track-fill" style={{
                  width: `${((loanAmount - BUSINESS_LOAN_DEFAULTS.MIN_LOAN_AMOUNT) / (BUSINESS_LOAN_DEFAULTS.MAX_LOAN_AMOUNT - BUSINESS_LOAN_DEFAULTS.MIN_LOAN_AMOUNT)) * 100}%`
                }} />
              </div>

              {/* Quick Amount Presets */}
              <div className="quick-presets">
                {BUSINESS_AMOUNT_PRESETS.map((val) => (
                  <button
                    key={val}
                    type="button"
                    className={`preset-chip ${loanAmount === val ? 'is-active' : ''}`}
                    onClick={() => {
                      setLoanAmount(val);
                      setRawAmountInput(String(val));
                    }}
                  >
                    {formatCompactINR(val)}
                  </button>
                ))}
              </div>
            </div>

            {/* Field B: Loan Tenure (Years) */}
            <div className="calc-field-group">
              <div className="calc-field-header">
                <label htmlFor="bl-loan-tenure" className="calc-label">
                  <span className="label-icon-box">
                    <Calendar size={16} />
                  </span>
                  <span>Loan Tenure (Years)</span>
                </label>
                <div className="calc-input-box tenure-input-box">
                  <input
                    id="bl-loan-tenure"
                    type="text"
                    inputMode="numeric"
                    className="calc-number-input"
                    value={rawTenureInput}
                    onChange={handleTenureInput}
                    onBlur={handleTenureBlur}
                    aria-label="Loan tenure in years"
                  />
                  <span className="tenure-unit-label">Years</span>
                </div>
              </div>

              {/* Range Slider */}
              <div className="range-slider-wrapper">
                <input
                  type="range"
                  min={BUSINESS_LOAN_DEFAULTS.MIN_TENURE_YEARS}
                  max={BUSINESS_LOAN_DEFAULTS.MAX_TENURE_YEARS}
                  step={1}
                  value={tenureYears}
                  onChange={handleTenureSlider}
                  className="calc-range-slider"
                  aria-label="Adjust Business Loan Tenure"
                />
                <div className="slider-track-fill" style={{
                  width: `${((tenureYears - BUSINESS_LOAN_DEFAULTS.MIN_TENURE_YEARS) / (BUSINESS_LOAN_DEFAULTS.MAX_TENURE_YEARS - BUSINESS_LOAN_DEFAULTS.MIN_TENURE_YEARS)) * 100}%`
                }} />
              </div>

              {/* Quick Tenure Presets */}
              <div className="quick-presets">
                {BUSINESS_TENURE_PRESETS.map((yrs) => (
                  <button
                    key={yrs}
                    type="button"
                    className={`preset-chip ${tenureYears === yrs ? 'is-active' : ''}`}
                    onClick={() => {
                      setTenureYears(yrs);
                      setRawTenureInput(String(yrs));
                    }}
                  >
                    {yrs} {yrs === 1 ? 'Year' : 'Years'}
                  </button>
                ))}
              </div>
            </div>

            {/* Field C: Annual Interest Rate (% p.a.) */}
            <div className="calc-field-group">
              <div className="calc-field-header">
                <label htmlFor="bl-interest-rate" className="calc-label">
                  <span className="label-icon-box">
                    <Percent size={16} />
                  </span>
                  <span>Annual Interest Rate (% p.a.)</span>
                </label>
                <div className="calc-input-box rate-input-box">
                  <input
                    id="bl-interest-rate"
                    type="text"
                    inputMode="decimal"
                    className="calc-number-input"
                    value={rawRateInput}
                    onChange={handleRateInput}
                    onBlur={handleRateBlur}
                    aria-label="Annual interest rate in percentage"
                  />
                  <span className="rate-unit-label">% p.a.</span>
                </div>
              </div>

              {/* Range Slider */}
              <div className="range-slider-wrapper">
                <input
                  type="range"
                  min={BUSINESS_LOAN_DEFAULTS.MIN_INTEREST_RATE}
                  max={BUSINESS_LOAN_DEFAULTS.MAX_INTEREST_RATE}
                  step={0.1}
                  value={annualRate}
                  onChange={handleRateSlider}
                  className="calc-range-slider"
                  aria-label="Adjust Business Loan Interest Rate"
                />
                <div className="slider-track-fill" style={{
                  width: `${((annualRate - BUSINESS_LOAN_DEFAULTS.MIN_INTEREST_RATE) / (BUSINESS_LOAN_DEFAULTS.MAX_INTEREST_RATE - BUSINESS_LOAN_DEFAULTS.MIN_INTEREST_RATE)) * 100}%`
                }} />
              </div>

              {/* Quick Rate Presets */}
              <div className="quick-presets">
                {BUSINESS_RATE_PRESETS.map((rate) => (
                  <button
                    key={rate}
                    type="button"
                    className={`preset-chip ${annualRate === rate ? 'is-active' : ''}`}
                    onClick={() => {
                      setAnnualRate(rate);
                      setRawRateInput(String(rate));
                    }}
                  >
                    {rate}%
                  </button>
                ))}
              </div>
            </div>

            {/* Regulatory Guidance Note */}
            <div className="calc-guidance-callout">
              <Info size={16} className="guidance-icon" />
              <p className="guidance-text">
                <strong>Illustrative Settings:</strong> These interest rates, tenure limits, and loan amounts are representative calculations. Actual sanctioned rates, processing charges, and limits depend on bank assessment of business vintage, turnover, balance sheet health, and credit profile.
              </p>
            </div>
          </div>

          {/* Right Column: Results & Visualisation */}
          <div className="calculator-results-column">
            <BusinessLoanResults
              results={results}
              annualRate={annualRate}
              onReset={handleReset}
              onProceedToEnquiry={handleProceedClick}
            />
          </div>
        </div>

        {/* Business Funding Planner Module */}
        <BusinessFundingPlanner
          onTransferLoanAmount={handleTransferFromPlanner}
        />
      </div>
    </section>
  );
}
