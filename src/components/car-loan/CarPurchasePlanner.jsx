import React, { useState } from 'react';
import {
  Car,
  IndianRupee,
  Calculator,
  ArrowUp,
  AlertCircle,
  Sparkles,
  Info
} from 'lucide-react';
import {
  CAR_LOAN_DEFAULTS,
  formatINR,
  formatCompactINR
} from '../../utils/carLoanCalculator';

export default function CarPurchasePlanner({ onTransferLoanAmount }) {
  const [onRoadPrice, setOnRoadPrice] = useState(CAR_LOAN_DEFAULTS.ON_ROAD_PRICE); // ₹12.5 Lakh
  const [downPayment, setDownPayment] = useState(CAR_LOAN_DEFAULTS.DOWN_PAYMENT); // ₹2.5 Lakh
  const [rawPriceInput, setRawPriceInput] = useState(String(CAR_LOAN_DEFAULTS.ON_ROAD_PRICE));
  const [rawDownInput, setRawDownInput] = useState(String(CAR_LOAN_DEFAULTS.DOWN_PAYMENT));

  const isDownPaymentInvalid = downPayment > onRoadPrice || downPayment < 0;
  const isPriceInvalid = onRoadPrice <= 0;
  const estimatedLoanAmount = isDownPaymentInvalid || isPriceInvalid
    ? 0
    : Math.max(0, onRoadPrice - downPayment);

  const downPaymentPercent = onRoadPrice > 0
    ? Math.min(100, Math.max(0, ((downPayment / onRoadPrice) * 100).toFixed(0)))
    : 0;

  const handlePriceChange = (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    setRawPriceInput(raw);
    if (raw !== '') {
      const num = Number(raw);
      setOnRoadPrice(num);
    }
  };

  const handleDownChange = (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    setRawDownInput(raw);
    if (raw !== '') {
      const num = Number(raw);
      setDownPayment(num);
    }
  };

  const handleQuickPercent = (percent) => {
    const calculatedDown = Math.round((onRoadPrice * percent) / 100);
    setDownPayment(calculatedDown);
    setRawDownInput(String(calculatedDown));
  };

  const handleTransferToCalculator = () => {
    if (estimatedLoanAmount > 0 && !isDownPaymentInvalid && !isPriceInvalid) {
      onTransferLoanAmount(estimatedLoanAmount);
    }
  };

  return (
    <div className="property-planning-card cl-planning-card" id="plan-your-car-purchase">
      <div className="planning-header">
        <div className="planning-title-box">
          <div className="planning-icon-wrapper cl-planning-icon-wrap">
            <Car size={22} className="planning-icon" />
          </div>
          <div>
            <div className="section-tag section-tag-gold planning-tag">
              <Sparkles size={13} />
              <span>Budgeting Assistant</span>
            </div>
            <h3 className="planning-title">Plan Your Car Purchase & Margin Money</h3>
          </div>
        </div>
        <p className="planning-subtitle">
          Calculate your estimated vehicle borrowing amount based on the total on-road price and your self-funded down payment.
        </p>
      </div>

      <div className="planning-grid">
        {/* Field 1: On-Road Price */}
        <div className="planning-field">
          <label htmlFor="planner-on-road-price" className="planning-label">
            <span>Estimated On-Road Car Price (₹)</span>
            <span className="planning-live-badge">{formatINR(onRoadPrice)}</span>
          </label>
          <div className="calc-input-box">
            <span className="currency-prefix">₹</span>
            <input
              id="planner-on-road-price"
              type="text"
              inputMode="numeric"
              className="calc-number-input"
              value={rawPriceInput ? Number(rawPriceInput).toLocaleString('en-IN') : ''}
              onChange={handlePriceChange}
              placeholder="e.g. 12,50,000"
            />
          </div>
          <div className="quick-presets">
            {[600000, 1000000, 1500000, 2500000].map(val => (
              <button
                key={val}
                type="button"
                className={`preset-chip ${onRoadPrice === val ? 'is-active' : ''}`}
                onClick={() => {
                  setOnRoadPrice(val);
                  setRawPriceInput(String(val));
                }}
              >
                {formatCompactINR(val)}
              </button>
            ))}
          </div>
        </div>

        {/* Field 2: Down Payment */}
        <div className="planning-field">
          <label htmlFor="planner-down-payment" className="planning-label">
            <span>Down Payment (₹)</span>
            <span className="planning-live-badge">{formatINR(downPayment)} ({downPaymentPercent}%)</span>
          </label>
          <div className={`calc-input-box ${isDownPaymentInvalid ? 'has-error' : ''}`}>
            <span className="currency-prefix">₹</span>
            <input
              id="planner-down-payment"
              type="text"
              inputMode="numeric"
              className="calc-number-input"
              value={rawDownInput ? Number(rawDownInput).toLocaleString('en-IN') : ''}
              onChange={handleDownChange}
              placeholder="e.g. 2,50,000"
            />
          </div>
          {/* Quick Down Payment Percentages (10%, 15%, 20%, 30%) */}
          <div className="quick-presets">
            {[10, 15, 20, 25, 30].map(pct => (
              <button
                key={pct}
                type="button"
                className="preset-chip"
                onClick={() => handleQuickPercent(pct)}
              >
                {pct}% ({formatCompactINR(Math.round((onRoadPrice * pct) / 100))})
              </button>
            ))}
          </div>
          {isDownPaymentInvalid && (
            <p className="form-error-msg" role="alert">
              <AlertCircle size={14} /> <span>Down payment cannot exceed the on-road car price or be negative.</span>
            </p>
          )}
        </div>

        {/* Result Box & Transfer Action */}
        <div className="planning-result-box">
          <div className="planning-result-meta">
            <span className="result-label">Estimated Loan Amount Required</span>
            <strong className="result-figure">
              {isDownPaymentInvalid || isPriceInvalid ? '₹0' : formatINR(estimatedLoanAmount)}
            </strong>
            <span className="result-formula">
              On-Road Price ({formatCompactINR(onRoadPrice)}) − Down Payment ({formatCompactINR(downPayment)})
            </span>
          </div>

          <button
            type="button"
            className="btn btn-primary btn-transfer-loan"
            onClick={handleTransferToCalculator}
            disabled={estimatedLoanAmount <= 0 || isDownPaymentInvalid || isPriceInvalid}
            id="btn-calculate-my-car-emi"
          >
            <Calculator size={18} />
            <span>Calculate My EMI</span>
            <ArrowUp size={16} />
          </button>
        </div>
      </div>

      <div className="planning-disclaimer-strip">
        <Info size={16} className="info-icon" />
        <span>
          <strong>Lender LTV Guidelines:</strong> Leading banks and NBFCs typically provide financing up to 85%–100% of the ex-showroom or on-road vehicle cost depending on the vehicle brand, model, and borrower profile. This estimate does not determine actual sanctioned credit eligibility.
        </span>
      </div>
    </div>
  );
}
