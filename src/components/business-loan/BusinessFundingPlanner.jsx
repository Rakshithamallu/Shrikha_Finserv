import React, { useState } from 'react';
import {
  Briefcase,
  IndianRupee,
  Calculator,
  ArrowUp,
  AlertCircle,
  Sparkles,
  Info,
  Layers
} from 'lucide-react';
import {
  BUSINESS_LOAN_DEFAULTS,
  BUSINESS_PURPOSES,
  formatINR,
  formatCompactINR
} from '../../utils/businessLoanCalculator';

export default function BusinessFundingPlanner({ onTransferLoanAmount }) {
  const [purpose, setPurpose] = useState(BUSINESS_LOAN_DEFAULTS.PURPOSE);
  const [requirement, setRequirement] = useState(BUSINESS_LOAN_DEFAULTS.FUNDING_REQUIREMENT); // ₹10 Lakh
  const [availableFunds, setAvailableFunds] = useState(BUSINESS_LOAN_DEFAULTS.AVAILABLE_FUNDS); // ₹3 Lakh
  const [rawReqInput, setRawReqInput] = useState(String(BUSINESS_LOAN_DEFAULTS.FUNDING_REQUIREMENT));
  const [rawAvailInput, setRawAvailInput] = useState(String(BUSINESS_LOAN_DEFAULTS.AVAILABLE_FUNDS));

  // Validations
  const isReqInvalid = requirement <= 0;
  const isAvailInvalid = availableFunds < 0 || availableFunds > requirement;

  const estimatedFundingGap = isReqInvalid || isAvailInvalid
    ? 0
    : Math.max(0, requirement - availableFunds);

  const selfFundedPercent = requirement > 0
    ? Math.min(100, Math.max(0, ((availableFunds / requirement) * 100).toFixed(0)))
    : 0;

  const handleReqChange = (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    setRawReqInput(raw);
    if (raw !== '') {
      const num = Number(raw);
      setRequirement(num);
    } else {
      setRequirement(0);
    }
  };

  const handleAvailChange = (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    setRawAvailInput(raw);
    if (raw !== '') {
      const num = Number(raw);
      setAvailableFunds(num);
    } else {
      setAvailableFunds(0);
    }
  };

  const handleTransfer = () => {
    if (estimatedFundingGap > 0 && !isReqInvalid && !isAvailInvalid) {
      onTransferLoanAmount(estimatedFundingGap, purpose);
    }
  };

  return (
    <div className="property-planning-card bl-planning-card" id="plan-your-business-funding">
      <div className="planning-header">
        <div className="planning-title-box">
          <div className="planning-icon-wrapper bl-planning-icon-wrap">
            <Briefcase size={22} className="planning-icon" />
          </div>
          <div>
            <div className="section-tag section-tag-gold planning-tag">
              <Sparkles size={13} />
              <span>Capital Assessment Tool</span>
            </div>
            <h3 className="planning-title">Plan Your Business Funding</h3>
          </div>
        </div>
        <p className="planning-subtitle">
          Determine your net external borrowing requirement by balancing total project capital against your internal operational cash reserves.
        </p>
      </div>

      <div className="planning-grid">
        {/* Field 1: Business Purpose */}
        <div className="planning-field full-width-field">
          <label htmlFor="planner-business-purpose" className="planning-label">
            <span>Primary Business Purpose</span>
            <span className="planning-live-badge">{purpose}</span>
          </label>
          <div className="custom-select-wrapper">
            <select
              id="planner-business-purpose"
              className="form-control select-control"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
            >
              {BUSINESS_PURPOSES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          {/* Quick Purpose Chips */}
          <div className="quick-presets">
            {BUSINESS_PURPOSES.map((item) => (
              <button
                key={item}
                type="button"
                className={`preset-chip ${purpose === item ? 'is-active' : ''}`}
                onClick={() => setPurpose(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Field 2: Total Funding Requirement */}
        <div className="planning-field">
          <label htmlFor="planner-funding-requirement" className="planning-label">
            <span>Estimated Funding Requirement (₹)</span>
            <span className="planning-live-badge">{formatINR(requirement)}</span>
          </label>
          <div className={`calc-input-box ${isReqInvalid ? 'has-error' : ''}`}>
            <span className="currency-prefix">₹</span>
            <input
              id="planner-funding-requirement"
              type="text"
              inputMode="numeric"
              className="calc-number-input"
              value={rawReqInput ? Number(rawReqInput).toLocaleString('en-IN') : ''}
              onChange={handleReqChange}
              placeholder="e.g. 10,00,000"
            />
          </div>
          <div className="quick-presets">
            {[300000, 500000, 1000000, 2500000, 5000000].map(val => (
              <button
                key={val}
                type="button"
                className={`preset-chip ${requirement === val ? 'is-active' : ''}`}
                onClick={() => {
                  setRequirement(val);
                  setRawReqInput(String(val));
                }}
              >
                {formatCompactINR(val)}
              </button>
            ))}
          </div>
          {isReqInvalid && (
            <p className="form-error-msg" role="alert">
              <AlertCircle size={14} /> <span>Funding requirement must be a positive amount.</span>
            </p>
          )}
        </div>

        {/* Field 3: Available Funds */}
        <div className="planning-field">
          <label htmlFor="planner-available-funds" className="planning-label">
            <span>Available Funds / Self-Contribution (₹)</span>
            <span className="planning-live-badge">
              {formatINR(availableFunds)} ({selfFundedPercent}%)
            </span>
          </label>
          <div className={`calc-input-box ${isAvailInvalid ? 'has-error' : ''}`}>
            <span className="currency-prefix">₹</span>
            <input
              id="planner-available-funds"
              type="text"
              inputMode="numeric"
              className="calc-number-input"
              value={rawAvailInput ? Number(rawAvailInput).toLocaleString('en-IN') : ''}
              onChange={handleAvailChange}
              placeholder="e.g. 3,00,000 (Optional)"
            />
          </div>
          <div className="quick-presets">
            {[10, 20, 30, 40, 50].map(pct => {
              const val = Math.round((requirement * pct) / 100);
              return (
                <button
                  key={pct}
                  type="button"
                  className="preset-chip"
                  onClick={() => {
                    setAvailableFunds(val);
                    setRawAvailInput(String(val));
                  }}
                >
                  {pct}% ({formatCompactINR(val)})
                </button>
              );
            })}
          </div>
          {isAvailInvalid && (
            <p className="form-error-msg" role="alert">
              <AlertCircle size={14} /> <span>Available funds cannot be negative or exceed the total funding requirement.</span>
            </p>
          )}
        </div>

        {/* Calculated Result Box & Transfer Action */}
        <div className="planning-result-box bl-funding-gap-box">
          <div className="planning-result-meta">
            <span className="result-label">Estimated Funding Gap (Loan Amount Required)</span>
            <strong className="result-figure">
              {isReqInvalid || isAvailInvalid ? '₹0' : formatINR(estimatedFundingGap)}
            </strong>
            <span className="result-formula">
              Total Requirement ({formatCompactINR(requirement)}) − Available Reserves ({formatCompactINR(availableFunds)})
            </span>
          </div>

          <button
            type="button"
            className="btn btn-primary btn-transfer-loan"
            onClick={handleTransfer}
            disabled={estimatedFundingGap <= 0 || isReqInvalid || isAvailInvalid}
            id="btn-calculate-my-business-emi"
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
          <strong>Planning Note:</strong> This is an illustrative estimation tool and does not determine actual loan eligibility or final sanctioned loan amounts. Lenders evaluate financial statements, GST filings, and cashflow debt service ratios (DSCR).
        </span>
      </div>
    </div>
  );
}
