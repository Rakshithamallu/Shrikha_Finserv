import React, { useState } from 'react';
import {
  Building,
  IndianRupee,
  Calculator,
  ArrowUp,
  AlertCircle,
  Sparkles,
  Info,
  CheckCircle2
} from 'lucide-react';
import {
  HOME_LOAN_DEFAULTS,
  formatINR,
  formatCompactINR
} from '../../utils/homeLoanCalculator';

export default function PropertyPlanningCalculator({ onTransferLoanAmount }) {
  const [propertyValue, setPropertyValue] = useState(HOME_LOAN_DEFAULTS.PROPERTY_VALUE); // ₹40 Lakh
  const [downPayment, setDownPayment] = useState(HOME_LOAN_DEFAULTS.DOWN_PAYMENT); // ₹15 Lakh
  const [rawPropInput, setRawPropInput] = useState(String(HOME_LOAN_DEFAULTS.PROPERTY_VALUE));
  const [rawDownInput, setRawDownInput] = useState(String(HOME_LOAN_DEFAULTS.DOWN_PAYMENT));

  // Compute calculated loan requirement
  const isDownPaymentInvalid = downPayment > propertyValue;
  const estimatedLoanAmount = isDownPaymentInvalid ? 0 : Math.max(0, propertyValue - downPayment);
  const downPaymentPercent = propertyValue > 0
    ? Math.min(100, Math.max(0, ((downPayment / propertyValue) * 100).toFixed(0)))
    : 0;

  const handlePropChange = (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    setRawPropInput(raw);
    if (raw !== '') {
      const num = Number(raw);
      setPropertyValue(num);
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
    const calculatedDown = Math.round((propertyValue * percent) / 100);
    setDownPayment(calculatedDown);
    setRawDownInput(String(calculatedDown));
  };

  const handleTransferToCalculator = () => {
    if (estimatedLoanAmount > 0 && !isDownPaymentInvalid) {
      onTransferLoanAmount(estimatedLoanAmount);
    }
  };

  return (
    <div className="property-planning-card" id="plan-your-home-purchase">
      <div className="planning-header">
        <div className="planning-title-box">
          <div className="planning-icon-wrapper">
            <Building size={22} className="planning-icon" />
          </div>
          <div>
            <div className="section-tag section-tag-gold planning-tag">
              <Sparkles size={13} />
              <span>Planning Assistant</span>
            </div>
            <h3 className="planning-title">Plan Your Home Purchase & Down Payment</h3>
          </div>
        </div>
        <p className="planning-subtitle">
          Input your estimated purchase cost and available self-contribution to find your exact borrowing requirement.
        </p>
      </div>

      <div className="planning-grid">
        {/* Field 1: Property Value */}
        <div className="planning-field">
          <label htmlFor="planning-prop-value" className="planning-label">
            <span>Estimated Property Value</span>
            <span className="planning-live-badge">{formatINR(propertyValue)}</span>
          </label>
          <div className="calc-input-box">
            <span className="currency-prefix">₹</span>
            <input
              id="planning-prop-value"
              type="text"
              inputMode="numeric"
              className="calc-number-input"
              value={rawPropInput ? Number(rawPropInput).toLocaleString('en-IN') : ''}
              onChange={handlePropChange}
              placeholder="e.g. 40,00,000"
            />
          </div>
          <div className="quick-presets">
            {[3000000, 5000000, 7500000, 10000000].map(val => (
              <button
                key={val}
                type="button"
                className={`preset-chip ${propertyValue === val ? 'is-active' : ''}`}
                onClick={() => {
                  setPropertyValue(val);
                  setRawPropInput(String(val));
                }}
              >
                {formatCompactINR(val)}
              </button>
            ))}
          </div>
        </div>

        {/* Field 2: Down Payment */}
        <div className="planning-field">
          <label htmlFor="planning-down-payment" className="planning-label">
            <span>Available Down Payment (Self Contribution)</span>
            <span className="planning-live-badge">{formatINR(downPayment)} ({downPaymentPercent}%)</span>
          </label>
          <div className={`calc-input-box ${isDownPaymentInvalid ? 'has-error' : ''}`}>
            <span className="currency-prefix">₹</span>
            <input
              id="planning-down-payment"
              type="text"
              inputMode="numeric"
              className="calc-number-input"
              value={rawDownInput ? Number(rawDownInput).toLocaleString('en-IN') : ''}
              onChange={handleDownChange}
              placeholder="e.g. 15,00,000"
            />
          </div>
          {/* Quick Down Payment Percentages (10%, 20%, 25%, 30%) */}
          <div className="quick-presets">
            {[10, 15, 20, 25, 30].map(pct => (
              <button
                key={pct}
                type="button"
                className="preset-chip"
                onClick={() => handleQuickPercent(pct)}
              >
                {pct}% ({formatCompactINR(Math.round((propertyValue * pct) / 100))})
              </button>
            ))}
          </div>
          {isDownPaymentInvalid && (
            <p className="form-error-msg" role="alert">
              <AlertCircle size={14} /> <span>Down payment cannot be greater than the estimated property value.</span>
            </p>
          )}
        </div>

        {/* Result & Transfer Action */}
        <div className="planning-result-box">
          <div className="planning-result-meta">
            <span className="result-label">Estimated Loan Amount Required</span>
            <strong className="result-figure">
              {isDownPaymentInvalid ? '₹0' : formatINR(estimatedLoanAmount)}
            </strong>
            <span className="result-formula">
              Property Value ({formatCompactINR(propertyValue)}) − Down Payment ({formatCompactINR(downPayment)})
            </span>
          </div>

          <button
            type="button"
            className="btn btn-primary btn-transfer-loan"
            onClick={handleTransferToCalculator}
            disabled={estimatedLoanAmount <= 0 || isDownPaymentInvalid}
            id="btn-calculate-my-home-loan-emi"
          >
            <Calculator size={18} />
            <span>Calculate My Home Loan EMI</span>
            <ArrowUp size={16} />
          </button>
        </div>
      </div>

      <div className="planning-disclaimer-strip">
        <Info size={16} className="info-icon" />
        <span>
          <strong>LTV & Margin Norms:</strong> Partner banks and NBFCs typically finance between 75% and 90% of the registered property agreement value (Loan-to-Value ratio), subject to applicant eligibility and regulatory norms.
        </span>
      </div>
    </div>
  );
}
