import React, { useState, useMemo, useEffect } from 'react';
import {
  Calculator,
  RotateCcw,
  IndianRupee,
  Calendar,
  Percent,
  Info,
  Sliders,
  Car,
  Sparkles
} from 'lucide-react';
import {
  CAR_LOAN_DEFAULTS,
  calculateCarLoanEMI,
  formatINR,
  formatCompactINR,
  CAR_LOAN_AMOUNT_PRESETS,
  CAR_LOAN_TENURE_PRESETS,
  CAR_LOAN_RATE_PRESETS
} from '../../utils/carLoanCalculator';
import CarLoanResults from './CarLoanResults';
import CarPurchasePlanner from './CarPurchasePlanner';

export default function CarLoanCalculator({
  transferredAmount,
  transferredTimestamp,
  onProceedToEnquiry
}) {
  const [carType, setCarType] = useState(CAR_LOAN_DEFAULTS.CAR_TYPE); // 'New Car' | 'Pre-Owned Car'
  const [loanAmount, setLoanAmount] = useState(CAR_LOAN_DEFAULTS.LOAN_AMOUNT);
  const [tenureYears, setTenureYears] = useState(CAR_LOAN_DEFAULTS.TENURE_YEARS);
  const [annualRate, setAnnualRate] = useState(CAR_LOAN_DEFAULTS.ANNUAL_INTEREST_RATE);

  const [rawAmountInput, setRawAmountInput] = useState(String(CAR_LOAN_DEFAULTS.LOAN_AMOUNT));
  const [rawTenureInput, setRawTenureInput] = useState(String(CAR_LOAN_DEFAULTS.TENURE_YEARS));
  const [rawRateInput, setRawRateInput] = useState(String(CAR_LOAN_DEFAULTS.ANNUAL_INTEREST_RATE));

  // If amount transferred from Car Purchase Planner
  useEffect(() => {
    if (transferredAmount && transferredAmount > 0) {
      setLoanAmount(transferredAmount);
      setRawAmountInput(String(transferredAmount));
    }
  }, [transferredTimestamp]);

  // Live calculation results
  const results = useMemo(() => {
    return calculateCarLoanEMI(loanAmount, annualRate, tenureYears, carType);
  }, [loanAmount, annualRate, tenureYears, carType]);

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
        setLoanAmount(Math.min(CAR_LOAN_DEFAULTS.MAX_LOAN_AMOUNT, num));
      }
    }
  };

  const handleAmountBlur = () => {
    let num = Number(rawAmountInput);
    if (isNaN(num) || num < CAR_LOAN_DEFAULTS.MIN_LOAN_AMOUNT) {
      num = CAR_LOAN_DEFAULTS.MIN_LOAN_AMOUNT;
    } else if (num > CAR_LOAN_DEFAULTS.MAX_LOAN_AMOUNT) {
      num = CAR_LOAN_DEFAULTS.MAX_LOAN_AMOUNT;
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
        setTenureYears(Math.min(CAR_LOAN_DEFAULTS.MAX_TENURE_YEARS, num));
      }
    }
  };

  const handleTenureBlur = () => {
    let num = Number(rawTenureInput);
    if (isNaN(num) || num < CAR_LOAN_DEFAULTS.MIN_TENURE_YEARS) {
      num = CAR_LOAN_DEFAULTS.MIN_TENURE_YEARS;
    } else if (num > CAR_LOAN_DEFAULTS.MAX_TENURE_YEARS) {
      num = CAR_LOAN_DEFAULTS.MAX_TENURE_YEARS;
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
      setAnnualRate(Math.min(CAR_LOAN_DEFAULTS.MAX_INTEREST_RATE, num));
    }
  };

  const handleRateBlur = () => {
    let num = Number(rawRateInput);
    if (isNaN(num) || num < CAR_LOAN_DEFAULTS.MIN_INTEREST_RATE) {
      num = CAR_LOAN_DEFAULTS.MIN_INTEREST_RATE;
    } else if (num > CAR_LOAN_DEFAULTS.MAX_INTEREST_RATE) {
      num = CAR_LOAN_DEFAULTS.MAX_INTEREST_RATE;
    }
    setAnnualRate(num);
    setRawRateInput(String(num));
  };

  // Reset to default settings
  const handleReset = () => {
    setCarType(CAR_LOAN_DEFAULTS.CAR_TYPE);
    setLoanAmount(CAR_LOAN_DEFAULTS.LOAN_AMOUNT);
    setRawAmountInput(String(CAR_LOAN_DEFAULTS.LOAN_AMOUNT));
    setTenureYears(CAR_LOAN_DEFAULTS.TENURE_YEARS);
    setRawTenureInput(String(CAR_LOAN_DEFAULTS.TENURE_YEARS));
    setAnnualRate(CAR_LOAN_DEFAULTS.ANNUAL_INTEREST_RATE);
    setRawRateInput(String(CAR_LOAN_DEFAULTS.ANNUAL_INTEREST_RATE));
  };

  const handleProceedClick = () => {
    if (onProceedToEnquiry) {
      onProceedToEnquiry({
        carType,
        loanAmount,
        tenureYears
      });
    }
  };

  const handleTransferFromPlanner = (amount) => {
    setLoanAmount(amount);
    setRawAmountInput(String(amount));
    const el = document.getElementById('car-loan-calculator');
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="car-loan-calculator"
      className="section hl-calculator-section cl-calculator-section"
      aria-label="Interactive Car Loan EMI Calculator"
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag section-tag-gold">
            <Calculator size={14} />
            <span>Interactive Financial Tool</span>
          </div>
          <h2 className="section-title">
            Car Loan <span className="highlight-text">EMI Calculator</span>
          </h2>
          <p className="section-desc">
            Estimate your monthly repayment installment, total interest, and complete cost of financing for new and pre-owned vehicle purchases across Karnataka.
          </p>
        </div>

        {/* Main Two-Column Calculator Layout */}
        <div className="calculator-layout-card">
          {/* Left Column: Input Controls */}
          <div className="calculator-inputs-column">
            <div className="column-top-bar">
              <div className="inputs-heading-wrap">
                <Sliders size={20} className="column-icon" />
                <h3 className="column-title">Car Financing Parameters</h3>
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

            {/* Field A: Car Type Segmented Control */}
            <div className="calc-field-group">
              <label className="calc-label">
                <span className="label-icon-box">
                  <Car size={16} />
                </span>
                <span>Select Vehicle Category</span>
              </label>
              <div className="car-type-segmented-control" role="radiogroup" aria-label="Vehicle Category">
                <button
                  type="button"
                  role="radio"
                  aria-checked={carType === 'New Car'}
                  className={`car-type-btn ${carType === 'New Car' ? 'is-active' : ''}`}
                  onClick={() => setCarType('New Car')}
                >
                  <Sparkles size={16} />
                  <span>New Car</span>
                </button>
                <button
                  type="button"
                  role="radio"
                  aria-checked={carType === 'Pre-Owned Car'}
                  className={`car-type-btn ${carType === 'Pre-Owned Car' ? 'is-active' : ''}`}
                  onClick={() => setCarType('Pre-Owned Car')}
                >
                  <Car size={16} />
                  <span>Pre-Owned Car</span>
                </button>
              </div>
            </div>

            {/* Field B: Loan Amount */}
            <div className="calc-field-group">
              <div className="calc-field-header">
                <label htmlFor="cl-loan-amount" className="calc-label">
                  <span className="label-icon-box">
                    <IndianRupee size={16} />
                  </span>
                  <span>Loan Amount (₹)</span>
                </label>
                <div className="calc-input-box">
                  <span className="currency-prefix">₹</span>
                  <input
                    id="cl-loan-amount"
                    type="text"
                    inputMode="numeric"
                    className="calc-number-input"
                    value={rawAmountInput ? Number(rawAmountInput).toLocaleString('en-IN') : ''}
                    onChange={handleAmountInput}
                    onBlur={handleAmountBlur}
                    aria-label="Loan Amount in Rupees"
                  />
                </div>
              </div>

              {/* Slider */}
              <div className="calc-slider-wrapper">
                <input
                  type="range"
                  id="cl-loan-amount-slider"
                  min={CAR_LOAN_DEFAULTS.MIN_LOAN_AMOUNT}
                  max={CAR_LOAN_DEFAULTS.MAX_LOAN_AMOUNT}
                  step={CAR_LOAN_DEFAULTS.LOAN_AMOUNT_STEP}
                  value={loanAmount}
                  onChange={handleAmountSlider}
                  className="calc-range-slider"
                  aria-label="Loan Amount Slider"
                />
                <div className="slider-limits">
                  <span>Min: {formatCompactINR(CAR_LOAN_DEFAULTS.MIN_LOAN_AMOUNT)}</span>
                  <span className="slider-current-label">{formatINR(loanAmount)}</span>
                  <span>Max: {formatCompactINR(CAR_LOAN_DEFAULTS.MAX_LOAN_AMOUNT)}</span>
                </div>
              </div>

              {/* Presets */}
              <div className="quick-presets" role="group" aria-label="Quick car loan amount presets">
                {CAR_LOAN_AMOUNT_PRESETS.map((preset) => (
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

            {/* Field C: Loan Tenure */}
            <div className="calc-field-group">
              <div className="calc-field-header">
                <label htmlFor="cl-tenure-years" className="calc-label">
                  <span className="label-icon-box">
                    <Calendar size={16} />
                  </span>
                  <span>Loan Tenure</span>
                </label>
                <div className="calc-input-box">
                  <input
                    id="cl-tenure-years"
                    type="text"
                    inputMode="numeric"
                    className="calc-number-input text-right"
                    value={rawTenureInput}
                    onChange={handleTenureInput}
                    onBlur={handleTenureBlur}
                    aria-label="Loan Tenure in Years"
                  />
                  <span className="unit-suffix">Years</span>
                </div>
              </div>

              {/* Slider */}
              <div className="calc-slider-wrapper">
                <input
                  type="range"
                  id="cl-tenure-slider"
                  min={CAR_LOAN_DEFAULTS.MIN_TENURE_YEARS}
                  max={CAR_LOAN_DEFAULTS.MAX_TENURE_YEARS}
                  step={1}
                  value={tenureYears}
                  onChange={handleTenureSlider}
                  className="calc-range-slider"
                  aria-label="Car Loan Tenure Slider"
                />
                <div className="slider-limits">
                  <span>Min: 1 Year (12 Mo)</span>
                  <span className="slider-current-label">{tenureYears} Years ({tenureYears * 12} Months)</span>
                  <span>Max: 8 Years (96 Mo)</span>
                </div>
              </div>

              {/* Presets */}
              <div className="quick-presets" role="group" aria-label="Quick tenure presets">
                {CAR_LOAN_TENURE_PRESETS.map((preset) => (
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

            {/* Field D: Annual Interest Rate */}
            <div className="calc-field-group">
              <div className="calc-field-header">
                <label htmlFor="cl-interest-rate" className="calc-label">
                  <span className="label-icon-box">
                    <Percent size={16} />
                  </span>
                  <span>Annual Interest Rate (% p.a.)</span>
                </label>
                <div className="calc-input-box">
                  <input
                    id="cl-interest-rate"
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
                  id="cl-rate-slider"
                  min={CAR_LOAN_DEFAULTS.MIN_INTEREST_RATE}
                  max={CAR_LOAN_DEFAULTS.MAX_INTEREST_RATE}
                  step={CAR_LOAN_DEFAULTS.INTEREST_RATE_STEP}
                  value={annualRate}
                  onChange={handleRateSlider}
                  className="calc-range-slider"
                  aria-label="Car Loan Interest Rate Slider"
                />
                <div className="slider-limits">
                  <span>Min: {CAR_LOAN_DEFAULTS.MIN_INTEREST_RATE}%</span>
                  <span className="slider-current-label">{annualRate}% p.a.</span>
                  <span>Max: {CAR_LOAN_DEFAULTS.MAX_INTEREST_RATE}%</span>
                </div>
              </div>

              {/* Presets */}
              <div className="quick-presets" role="group" aria-label="Indicative rate presets">
                {CAR_LOAN_RATE_PRESETS.map((preset) => (
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
                <strong>Illustrative Parameter Notice:</strong> The rates (7%–15%) and loan figures in this calculator represent indicative market baselines. Final sanctioned rates, loan-to-value (LTV) limits, processing charges, and permissible tenure depend on partner lender policies, vehicle classification (new vs. certified used), and applicant creditworthiness.
              </p>
            </div>
          </div>

          {/* Right Column: Live Results & Summary */}
          <div className="calculator-results-column">
            <CarLoanResults
              results={results}
              carType={carType}
              tenureYears={tenureYears}
              annualRate={annualRate}
              onProceedToEnquiry={handleProceedClick}
            />
          </div>
        </div>

        {/* Section 9: Car Purchase Planning Section */}
        <CarPurchasePlanner
          onTransferLoanAmount={handleTransferFromPlanner}
        />
      </div>
    </section>
  );
}
