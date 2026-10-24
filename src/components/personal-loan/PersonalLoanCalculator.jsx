import React, { useState, useMemo } from 'react';
import {
  Calculator,
  RotateCcw,
  IndianRupee,
  Calendar,
  Percent,
  Info,
  CheckCircle2,
  Sliders
} from 'lucide-react';
import {
  CALCULATOR_DEFAULTS,
  calculateEMI,
  formatINR,
  formatCompactINR,
  LOAN_AMOUNT_PRESETS,
  TENURE_YEAR_PRESETS,
  INTEREST_RATE_PRESETS
} from '../../utils/emiCalculator';
import LoanSummary from './LoanSummary';

export default function PersonalLoanCalculator({ onProceedToEnquiry }) {
  // Input states
  const [loanAmount, setLoanAmount] = useState(CALCULATOR_DEFAULTS.LOAN_AMOUNT);
  const [tenureYears, setTenureYears] = useState(CALCULATOR_DEFAULTS.TENURE_YEARS);
  const [annualRate, setAnnualRate] = useState(CALCULATOR_DEFAULTS.ANNUAL_INTEREST_RATE);

  // Raw typing string states for fluid manual input
  const [rawAmountInput, setRawAmountInput] = useState(String(CALCULATOR_DEFAULTS.LOAN_AMOUNT));
  const [rawRateInput, setRawRateInput] = useState(String(CALCULATOR_DEFAULTS.ANNUAL_INTEREST_RATE));
  const [rawTenureInput, setRawTenureInput] = useState(String(CALCULATOR_DEFAULTS.TENURE_YEARS));

  // Compute live EMI results memoized
  const results = useMemo(() => {
    return calculateEMI(loanAmount, annualRate, tenureYears);
  }, [loanAmount, annualRate, tenureYears]);

  // Handlers for Loan Amount
  const handleAmountSliderChange = (e) => {
    const val = Number(e.target.value);
    setLoanAmount(val);
    setRawAmountInput(String(val));
  };

  const handleAmountInputChange = (e) => {
    const cleaned = e.target.value.replace(/[^0-9]/g, '');
    setRawAmountInput(cleaned);
    if (cleaned !== '') {
      const num = Number(cleaned);
      if (!isNaN(num)) {
        // Update live within bounds or partial
        setLoanAmount(Math.min(CALCULATOR_DEFAULTS.MAX_LOAN_AMOUNT, num));
      }
    }
  };

  const handleAmountInputBlur = () => {
    let num = Number(rawAmountInput);
    if (isNaN(num) || num < CALCULATOR_DEFAULTS.MIN_LOAN_AMOUNT) {
      num = CALCULATOR_DEFAULTS.MIN_LOAN_AMOUNT;
    } else if (num > CALCULATOR_DEFAULTS.MAX_LOAN_AMOUNT) {
      num = CALCULATOR_DEFAULTS.MAX_LOAN_AMOUNT;
    }
    setLoanAmount(num);
    setRawAmountInput(String(num));
  };

  // Handlers for Tenure
  const handleTenureSliderChange = (e) => {
    const val = Number(e.target.value);
    setTenureYears(val);
    setRawTenureInput(String(val));
  };

  const handleTenureInputChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setRawTenureInput(val);
    if (val !== '') {
      const num = Number(val);
      if (!isNaN(num)) {
        setTenureYears(Math.min(CALCULATOR_DEFAULTS.MAX_TENURE_YEARS, num));
      }
    }
  };

  const handleTenureInputBlur = () => {
    let num = Number(rawTenureInput);
    if (isNaN(num) || num < CALCULATOR_DEFAULTS.MIN_TENURE_YEARS) {
      num = CALCULATOR_DEFAULTS.MIN_TENURE_YEARS;
    } else if (num > CALCULATOR_DEFAULTS.MAX_TENURE_YEARS) {
      num = CALCULATOR_DEFAULTS.MAX_TENURE_YEARS;
    }
    setTenureYears(num);
    setRawTenureInput(String(num));
  };

  // Handlers for Interest Rate
  const handleRateSliderChange = (e) => {
    const val = Number(e.target.value);
    setAnnualRate(val);
    setRawRateInput(String(val));
  };

  const handleRateInputChange = (e) => {
    const val = e.target.value.replace(/[^0-9.]/g, '');
    setRawRateInput(val);
    if (val !== '' && !isNaN(Number(val))) {
      const num = Number(val);
      setAnnualRate(Math.min(CALCULATOR_DEFAULTS.MAX_INTEREST_RATE, num));
    }
  };

  const handleRateInputBlur = () => {
    let num = Number(rawRateInput);
    if (isNaN(num) || num < CALCULATOR_DEFAULTS.MIN_INTEREST_RATE) {
      num = CALCULATOR_DEFAULTS.MIN_INTEREST_RATE;
    } else if (num > CALCULATOR_DEFAULTS.MAX_INTEREST_RATE) {
      num = CALCULATOR_DEFAULTS.MAX_INTEREST_RATE;
    }
    setAnnualRate(num);
    setRawRateInput(String(num));
  };

  // Reset to default settings
  const handleReset = () => {
    setLoanAmount(CALCULATOR_DEFAULTS.LOAN_AMOUNT);
    setRawAmountInput(String(CALCULATOR_DEFAULTS.LOAN_AMOUNT));
    setTenureYears(CALCULATOR_DEFAULTS.TENURE_YEARS);
    setRawTenureInput(String(CALCULATOR_DEFAULTS.TENURE_YEARS));
    setAnnualRate(CALCULATOR_DEFAULTS.ANNUAL_INTEREST_RATE);
    setRawRateInput(String(CALCULATOR_DEFAULTS.ANNUAL_INTEREST_RATE));
  };

  const handleProceedClick = () => {
    if (onProceedToEnquiry) {
      onProceedToEnquiry({
        loanAmount,
        tenureYears
      });
    }
  };

  return (
    <section
      id="personal-loan-calculator"
      className="section calculator-section"
      aria-label="Interactive Personal Loan EMI Calculator"
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag section-tag-gold">
            <Calculator size={14} />
            <span>Interactive Financial Tool</span>
          </div>
          <h2 className="section-title">
            Personal Loan <span className="highlight-text">EMI Calculator</span>
          </h2>
          <p className="section-desc">
            Adjust the loan amount, tenure, and illustrative rate below to see your estimated monthly installment and repayment breakdown instantly.
          </p>
        </div>

        {/* Main Two-Column Calculator Card */}
        <div className="calculator-layout-card">
          {/* Left Column: Interactive Inputs */}
          <div className="calculator-inputs-column">
            <div className="column-top-bar">
              <div className="inputs-heading-wrap">
                <Sliders size={20} className="column-icon" />
                <h3 className="column-title">Borrowing Parameters</h3>
              </div>
              <button
                type="button"
                className="reset-calculator-btn"
                onClick={handleReset}
                title="Reset inputs to default values"
                aria-label="Reset Calculator"
              >
                <RotateCcw size={15} />
                <span>Reset Defaults</span>
              </button>
            </div>

            {/* Input 1: Loan Amount */}
            <div className="calc-field-group">
              <div className="calc-field-header">
                <label htmlFor="calc-loan-amount" className="calc-label">
                  <span className="label-icon-box">
                    <IndianRupee size={16} />
                  </span>
                  <span>Required Loan Amount</span>
                </label>
                <div className="calc-input-box">
                  <span className="currency-prefix">₹</span>
                  <input
                    id="calc-loan-amount"
                    type="text"
                    inputMode="numeric"
                    className="calc-number-input"
                    value={rawAmountInput ? Number(rawAmountInput).toLocaleString('en-IN') : ''}
                    onChange={handleAmountInputChange}
                    onBlur={handleAmountInputBlur}
                    aria-label="Loan Amount in Rupees"
                  />
                </div>
              </div>

              {/* Slider */}
              <div className="calc-slider-wrapper">
                <input
                  type="range"
                  id="calc-loan-amount-slider"
                  min={CALCULATOR_DEFAULTS.MIN_LOAN_AMOUNT}
                  max={CALCULATOR_DEFAULTS.MAX_LOAN_AMOUNT}
                  step={CALCULATOR_DEFAULTS.LOAN_AMOUNT_STEP}
                  value={loanAmount}
                  onChange={handleAmountSliderChange}
                  className="calc-range-slider"
                  aria-label="Loan Amount Slider"
                />
                <div className="slider-limits">
                  <span>Min: {formatCompactINR(CALCULATOR_DEFAULTS.MIN_LOAN_AMOUNT)}</span>
                  <span className="slider-current-label">{formatINR(loanAmount)}</span>
                  <span>Max: {formatCompactINR(CALCULATOR_DEFAULTS.MAX_LOAN_AMOUNT)}</span>
                </div>
              </div>

              {/* Quick Preset Chips */}
              <div className="quick-presets" role="group" aria-label="Popular loan amount presets">
                {LOAN_AMOUNT_PRESETS.map((preset) => (
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
                <label htmlFor="calc-tenure-years" className="calc-label">
                  <span className="label-icon-box">
                    <Calendar size={16} />
                  </span>
                  <span>Loan Tenure</span>
                </label>
                <div className="calc-input-box">
                  <input
                    id="calc-tenure-years"
                    type="text"
                    inputMode="numeric"
                    className="calc-number-input text-right"
                    value={rawTenureInput}
                    onChange={handleTenureInputChange}
                    onBlur={handleTenureInputBlur}
                    aria-label="Loan Tenure in Years"
                  />
                  <span className="unit-suffix">Years</span>
                </div>
              </div>

              {/* Slider */}
              <div className="calc-slider-wrapper">
                <input
                  type="range"
                  id="calc-tenure-slider"
                  min={CALCULATOR_DEFAULTS.MIN_TENURE_YEARS}
                  max={CALCULATOR_DEFAULTS.MAX_TENURE_YEARS}
                  step={1}
                  value={tenureYears}
                  onChange={handleTenureSliderChange}
                  className="calc-range-slider"
                  aria-label="Loan Tenure Slider"
                />
                <div className="slider-limits">
                  <span>Min: 1 Year (12 Mo)</span>
                  <span className="slider-current-label">{tenureYears} Years ({tenureYears * 12} Months)</span>
                  <span>Max: 7 Years (84 Mo)</span>
                </div>
              </div>

              {/* Tenure Preset Chips */}
              <div className="quick-presets" role="group" aria-label="Tenure in years">
                {TENURE_YEAR_PRESETS.map((preset) => (
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
                <label htmlFor="calc-interest-rate" className="calc-label">
                  <span className="label-icon-box">
                    <Percent size={16} />
                  </span>
                  <span>Illustrative Interest Rate</span>
                </label>
                <div className="calc-input-box">
                  <input
                    id="calc-interest-rate"
                    type="text"
                    inputMode="decimal"
                    className="calc-number-input text-right"
                    value={rawRateInput}
                    onChange={handleRateInputChange}
                    onBlur={handleRateInputBlur}
                    aria-label="Annual Interest Rate percentage"
                  />
                  <span className="unit-suffix">% p.a.</span>
                </div>
              </div>

              {/* Slider */}
              <div className="calc-slider-wrapper">
                <input
                  type="range"
                  id="calc-rate-slider"
                  min={CALCULATOR_DEFAULTS.MIN_INTEREST_RATE}
                  max={CALCULATOR_DEFAULTS.MAX_INTEREST_RATE}
                  step={CALCULATOR_DEFAULTS.INTEREST_RATE_STEP}
                  value={annualRate}
                  onChange={handleRateSliderChange}
                  className="calc-range-slider"
                  aria-label="Interest Rate Slider"
                />
                <div className="slider-limits">
                  <span>Min: {CALCULATOR_DEFAULTS.MIN_INTEREST_RATE}%</span>
                  <span className="slider-current-label">{annualRate}% p.a.</span>
                  <span>Max: {CALCULATOR_DEFAULTS.MAX_INTEREST_RATE}%</span>
                </div>
              </div>

              {/* Quick Interest Presets */}
              <div className="quick-presets" role="group" aria-label="Indicative interest rate options">
                {INTEREST_RATE_PRESETS.map((preset) => (
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

            {/* Disclaimer Callout Box */}
            <div className="calculator-info-callout">
              <Info size={18} className="info-icon" />
              <p>
                <strong>Important Note:</strong> These are example calculator settings for planning purposes and do not represent guaranteed Shrikha Finserv loan terms. Actual sanctioned rates (9.99%–24%), permissible loan amounts, and eligible tenures depend solely on the selected bank or NBFC lending criteria and your individual credit profile.
              </p>
            </div>
          </div>

          {/* Right Column: Live Results & Summary */}
          <div className="calculator-results-column">
            <LoanSummary
              results={results}
              tenureYears={tenureYears}
              annualRate={annualRate}
              onProceedToEnquiry={handleProceedClick}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
