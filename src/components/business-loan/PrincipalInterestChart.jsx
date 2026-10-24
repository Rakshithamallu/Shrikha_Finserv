import React from 'react';
import { formatINR } from '../../utils/businessLoanCalculator';

/**
 * PrincipalInterestChart
 * Visualizes the proportion of Principal and Interest in an Equated Monthly Installment structure.
 */
export default function PrincipalInterestChart({
  principal = 0,
  totalInterest = 0,
  principalPercent = 50,
  interestPercent = 50
}) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius; // ~339.29

  // Circumference offsets
  const principalStroke = (principalPercent / 100) * circumference;
  const interestStroke = (interestPercent / 100) * circumference;

  return (
    <div className="emi-chart-wrapper" aria-label="Business Loan Principal vs Interest Breakdown Chart">
      <div className="donut-chart-box">
        <svg
          viewBox="0 0 140 140"
          className="donut-svg"
          role="img"
          aria-label={`Donut chart showing ${principalPercent}% Principal and ${interestPercent}% Interest`}
        >
          {/* Background Track */}
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="transparent"
            stroke="#E2E8F0"
            strokeWidth="16"
          />

          {/* Principal Segment (Gold #D4A84F) */}
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="transparent"
            stroke="#D4A84F"
            strokeWidth="16"
            strokeDasharray={`${principalStroke} ${circumference}`}
            strokeDashoffset="0"
            transform="rotate(-90 70 70)"
            className="chart-segment-principal"
          />

          {/* Interest Segment (Navy #102A43) */}
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="transparent"
            stroke="#102A43"
            strokeWidth="16"
            strokeDasharray={`${interestStroke} ${circumference}`}
            strokeDashoffset={`-${principalStroke}`}
            transform="rotate(-90 70 70)"
            className="chart-segment-interest"
          />

          {/* Inner Text Center */}
          <text
            x="70"
            y="65"
            textAnchor="middle"
            className="chart-center-percent"
            fill="#102A43"
            fontSize="18"
            fontWeight="700"
          >
            {principalPercent}%
          </text>
          <text
            x="70"
            y="81"
            textAnchor="middle"
            className="chart-center-label"
            fill="#526579"
            fontSize="9"
            fontWeight="500"
          >
            Principal
          </text>
        </svg>
      </div>

      {/* Legend & Breakdown Badges */}
      <div className="chart-legend-grid">
        <div className="legend-row">
          <div className="legend-marker-box">
            <span className="legend-color-dot dot-principal" style={{ backgroundColor: '#D4A84F' }} />
            <span className="legend-text">Principal Amount</span>
          </div>
          <div className="legend-values">
            <strong className="legend-inr">{formatINR(principal)}</strong>
            <span className="legend-pct">({principalPercent}%)</span>
          </div>
        </div>

        <div className="legend-row">
          <div className="legend-marker-box">
            <span className="legend-color-dot dot-interest" style={{ backgroundColor: '#102A43' }} />
            <span className="legend-text">Total Interest</span>
          </div>
          <div className="legend-values">
            <strong className="legend-inr">{formatINR(totalInterest)}</strong>
            <span className="legend-pct">({interestPercent}%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
