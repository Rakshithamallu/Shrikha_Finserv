import React, { useState, useMemo, useEffect } from 'react';
import {
  Calculator,
  RotateCcw,
  IndianRupee,
  Calendar,
  Percent,
  Info,
  Sliders,
  Home
} from 'lucide-react';
import {
  HOME_LOAN_DEFAULTS,
  calculateHomeLoanEMI,
  formatINR,
  formatCompactINR,
  HOME_LOAN_AMOUNT_PRESETS,
  HOME_LOAN_TENURE_PRESETS,
  HOME_LOAN_RATE_PRESETS
} from '../../utils/homeLoanCalculator';
import HomeLoanResults from './HomeLoanResults';
import PropertyPlanningCalculator from './PropertyPlanningCalculator';

export default function HomeLoanCalculator({
  transferredAmount,
  transferredTimestamp,
  onProceedToEnquiry
}) {
  const [loanAmount, setLoanAmount] = useState(HOME_LOAN_DEFAULTS.LOAN_AMOUNT);
  const [tenureYears, setTenureYears] = useState(HOME_LOAN_DEFAULTS.TENURE_YEARS);
  const [annualRate, setAnnualRate] = useState(HOME_LOAN_DEFAULTS.ANNUAL_INTEREST_RATE);

  const [rawAmountInput, setRawAmountInput] = useState(String(HOME_LOAN_DEFAULTS.LOAN_AMOUNT));
  const [rawTenureInput, setRawTenureInput] = useState(String(HOME_LOAN_DEFAULTS.TENURE_YEARS));
  const [rawRateInput, setRawRateInput] = useState(String(HOME_LOAN_DEFAULTS.ANNUAL_INTEREST_RATE));

  // When transferred from Property Planning Assistant
  useEffect(() => {
    if (transferredAmount && transferredAmount > 0) {
      setLoanAmount(transferredAmount);
      setRawAmountInput(String(transferredAmount));
    }
  }, [transferredTimestamp]);

  // Live calculation results
  const results = useMemo(() => {
    return calculateHomeLoanEMI(loanAmount, annualRate, tenureYears);
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
        setLoanAmount(Math.min(HOME_LOAN_DEFAULTS.MAX_LOAN_AMOUNT, num));
      }
    }
  };

  const handleAmountBlur = () => {
    let num = Number(rawAmountInput);
    if (isNaN(num) || num < HOME_LOAN_DEFAULTS.MIN_LOAN_AMOUNT) {
      num = HOME_LOAN_DEFAULTS.MIN_LOAN_AMOUNT;
    } else if (num > HOME_LOAN_DEFAULTS.MAX_LOAN_AMOUNT) {
      num = HOME_LOAN_DEFAULTS.MAX_LOAN_AMOUNT;
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
        setTenureYears(Math.min(HOME_LOAN_DEFAULTS.MAX_TENURE_YEARS, num));
      }
    }
  };

  const handleTenureBlur = () => {
    let num = Number(rawTenureInput);
    if (isNaN(num) || num < HOME_LOAN_DEFAULTS.MIN_TENURE_YEARS) {
      num = HOME_LOAN_DEFAULTS.MIN_TENURE_YEARS;
    } else if (num > HOME_LOAN_DEFAULTS.MAX_TENURE_YEARS) {
      num = HOME_LOAN_DEFAULTS.MAX_TENURE_YEARS;
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
      setAnnualRate(Math.min(HOME_LOAN_DEFAULTS.MAX_INTEREST_RATE, num));
    }
  };

  const handleRateBlur = () => {
    let num = Number(rawRateInput);
    if (isNaN(num) || num < HOME_LOAN_DEFAULTS.MIN_INTEREST_RATE) {
      num = HOME_LOAN_DEFAULTS.MIN_INTEREST_RATE;
    } else if (num > HOME_LOAN_DEFAULTS.MAX_INTEREST_RATE) {
      num = HOME_LOAN_DEFAULTS.MAX_INTEREST_RATE;
    }
    setAnnualRate(num);
    setRawRateInput(String(num));
  };

  const handleReset = () => {
    setLoanAmount(HOME_LOAN_DEFAULTS.LOAN_AMOUNT);
    setRawAmountInput(String(HOME_LOAN_DEFAULTS.LOAN_AMOUNT));
    setTenureYears(HOME_LOAN_DEFAULTS.TENURE_YEARS);
    setRawTenureInput(String(HOME_LOAN_DEFAULTS.TENURE_YEARS));
    setAnnualRate(HOME_LOAN_DEFAULTS.ANNUAL_INTEREST_RATE);
    setRawRateInput(String(HOME_LOAN_DEFAULTS.ANNUAL_INTEREST_RATE));
  };

  const handleProceedClick = () => {
    if (onProceedToEnquiry) {
      onProceedToEnquiry({
        loanAmount,
        tenureYears
      });
    }
  };

  const handleTransferFromPlanner = (amount) => {
    setLoanAmount(amount);
    setRawAmountInput(String(amount));
    // Scroll to top of calculator
    const el = document.getElementById('home-loan-calculator');
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home-loan-calculator"
      className="section hl-calculator-section"
      aria-label="Interactive Home Loan EMI Calculator"
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag section-tag-gold">
            <Calculator size={14} />
            <span>Interactive Financial Tool</span>
          </div>
          <h2 className="section-title">
            Home Loan <span className="highlight-text">EMI Calculator</span>
          </h2>
          <p className="section-desc">
            Calculate your estimated monthly installment, total interest, and total repayment amount across customized housing loan tenures up to 30 years.
          </p>
        </div>

        {/* Main Two-Column Calculator Layout */}
        <div className="calculator-layout-card">
          {/* Left Column: Input Controls */}
          <div className="calculator-inputs-column">
            <div className="column-top-bar">
              <div className="inputs-heading-wrap">
                <Sliders size={20} className="column-icon" />
                <h3 className="column-title">Home Financing Inputs</h3>
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

            {/* Input 1: Loan Amount */}
            <div className="calc-field-group">
              <div className="calc-field-header">
                <label htmlFor="hl-loan-amount" className="calc-label">
                  <span className="label-icon-box">
                    <IndianRupee size={16} />
                  </span>
                  <span>Home Loan Amount</span>
                </label>
                <div className="calc-input-box">
                  <span className="currency-prefix">₹</span>
                  <input
                    id="hl-loan-amount"
                    type="text"
                    inputMode="numeric"
                    className="calc-number-input"
                    value={rawAmountInput ? Number(rawAmountInput).toLocaleString('en-IN') : ''}
                    onChange={handleAmountInput}
                    onBlur={handleAmountBlur}
                    aria-label="Home Loan Amount in Rupees"
                  />
                </div>
              </div>

              {/* Slider */}
              <div className="calc-slider-wrapper">
                <input
                  type="range"
                  id="hl-loan-amount-slider"
                  min={HOME_LOAN_DEFAULTS.MIN_LOAN_AMOUNT}
                  max={HOME_LOAN_DEFAULTS.MAX_LOAN_AMOUNT}
                  step={HOME_LOAN_DEFAULTS.LOAN_AMOUNT_STEP}
                  value={loanAmount}
                  onChange={handleAmountSlider}
                  className="calc-range-slider"
                  aria-label="Home Loan Amount Slider"
                />
                <div className="slider-limits">
                  <span>Min: {formatCompactINR(HOME_LOAN_DEFAULTS.MIN_LOAN_AMOUNT)}</span>
                  <span className="slider-current-label">{formatINR(loanAmount)}</span>
                  <span>Max: {formatCompactINR(HOME_LOAN_DEFAULTS.MAX_LOAN_AMOUNT)}</span>
                </div>
              </div>

              {/* Presets */}
              <div className="quick-presets" role="group" aria-label="Quick home loan amount presets">
                {HOME_LOAN_AMOUNT_PRESETS.map((preset) => (
                  <button
                    key={preset.value}
                    type="button"
                    className={`preset-chip ${loanAmount === preset.value ? 'is-active' : ''}`}
                    onClick={() => {
                      setLoanAmount(preset.value);
                      setRawAmountInput(String(preset.value));
                    }}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input 2: Loan Tenure */}
            <div className="calc-field-group">
              <div className="calc-field-header">
                <label htmlFor="hl-tenure-years" className="calc-label">
                  <span className="label-icon-box">
                    <Calendar size={16} />
                  </span>
                  <span>Repayment Tenure</span>
                </label>
                <div className="calc-input-box">
                  <input
                    id="hl-tenure-years"
                    type="text"
                    inputMode="numeric"
                    className="calc-number-input text-right"
                    value={rawTenureInput}
                    onChange={handleTenureInput}
                    onBlur={handleTenureBlur}
                    aria-label="Home Loan Tenure in Years"
                  />
                  <span className="unit-suffix">Years</span>
                </div>
              </div>

              {/* Slider */}
              <div className="calc-slider-wrapper">
                <input
                  type="range"
                  id="hl-tenure-slider"
                  min={HOME_LOAN_DEFAULTS.MIN_TENURE_YEARS}
                  max={HOME_LOAN_DEFAULTS.MAX_TENURE_YEARS}
                  step={1}
                  value={tenureYears}
                  onChange={handleTenureSlider}
                  className="calc-range-slider"
                  aria-label="Home Loan Tenure Slider"
                />
                <div className="slider-limits">
                  <span>Min: 1 Year (12 Mo)</span>
                  <span className="slider-current-label">{tenureYears} Years ({tenureYears * 12} Months)</span>
                  <span>Max: 30 Years (360 Mo)</span>
                </div>
              </div>

              {/* Presets */}
              <div className="quick-presets" role="group" aria-label="Quick tenure presets">
                {HOME_LOAN_TENURE_PRESETS.map((preset) => (
                  <button
                    key={preset.value}
                    type="button"
                    className={`preset-chip ${tenureYears === preset.value ? 'is-active' : ''}`}
                    onClick={() => {
                      setTenureYears(preset.value);
                      setRawTenureInput(String(preset.value));
                    }}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input 3: Annual Interest Rate */}
            <div className="calc-field-group">
              <div className="calc-field-header">
                <label htmlFor="hl-interest-rate" className="calc-label">
                  <span className="label-icon-box">
                    <Percent size={16} />
                  </span>
                  <span>Annual Interest Rate (% p.a.)</span>
                </label>
                <div className="calc-input-box">
                  <input
                    id="hl-interest-rate"
                    type="text"
                    inputMode="decimal"
                    className="calc-number-input text-right"
                    value={rawRateInput}
                    onChange={handleRateInput}
                    onBlur={handleRateBlur}
                    aria-label="Annual Interest Rate Percentage"
                  />
                  <span className="unit-suffix">% p.a.</span>
                </div>
              </div>

              {/* Slider */}
              <div className="calc-slider-wrapper">
                <input
                  type="range"
                  id="hl-rate-slider"
                  min={HOME_LOAN_DEFAULTS.MIN_INTEREST_RATE}
                  max={HOME_LOAN_DEFAULTS.MAX_INTEREST_RATE}
                  step={HOME_LOAN_DEFAULTS.INTEREST_RATE_STEP}
                  value={annualRate}
                  onChange={handleRateSlider}
                  className="calc-range-slider"
                  aria-label="Home Loan Interest Rate Slider"
                />
                <div className="slider-limits">
                  <span>Min: {HOME_LOAN_DEFAULTS.MIN_INTEREST_RATE}%</span>
                  <span className="slider-current-label">{annualRate}% p.a.</span>
                  <span>Max: {HOME_LOAN_DEFAULTS.MAX_INTEREST_RATE}%</span>
                </div>
              </div>

              {/* Presets */}
              <div className="quick-presets" role="group" aria-label="Indicative Home Loan rate presets">
                {HOME_LOAN_RATE_PRESETS.map((preset) => (
                  <button
                    key={preset.value}
                    type="button"
                    className={`preset-chip ${annualRate === preset.value ? 'is-active' : ''}`}
                    onClick={() => {
                      setAnnualRate(preset.value);
                      setRawRateInput(String(preset.value));
                    }}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Informative Disclaimer Callout */}
            <div className="calculator-info-callout">
              <Info size={18} className="info-icon" />
              <p>
                <strong>Illustrative Parameter Notice:</strong> The rates (0.5%–15%) and amounts in this calculator are for planning and estimation purposes. Actual interest rates, processing fees, sanctioned tenure, and loan-to-value limits depend on partner bank or NBFC lending norms, property title clearance, and applicant credit assessment.
              </p>
            </div>
          </div>

          {/* Right Column: Live Results & Summary */}
          <div className="calculator-results-column">
            <HomeLoanResults
              results={results}
              tenureYears={tenureYears}
              annualRate={annualRate}
              onProceedToEnquiry={handleProceedClick}
            />
          </div>
        </div>

        {/* Section 8: Optional Home Loan Planning Details */}
        <PropertyPlanningCalculator
          onTransferLoanAmount={handleTransferFromPlanner}
        />
      </div>
    </section>
  );
}
