import React from 'react';
import { formatINR } from '../../utils/carLoanCalculator';

/**
 * Lightweight SVG Donut Chart displaying Car Loan Principal vs Interest distribution
 */
export default function CarLoanChart({
  principal,
  totalInterest,
  totalRepayment,
  principalPercent,
  interestPercent
}) {
  const size = 180;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2; // radius = 78
  const circumference = 2 * Math.PI * radius; // ~490.09

  const safePrincipalPercent = Math.max(0, Math.min(100, principalPercent || 0));
  const principalDash = (safePrincipalPercent / 100) * circumference;
  const interestDash = circumference - principalDash;

  return (
    <div className="hl-chart-wrapper cl-chart-wrapper" aria-label="Car Loan payment split breakdown">
      <div className="hl-chart-svg-container">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="hl-donut-svg"
          role="img"
          aria-label={`Donut chart showing ${safePrincipalPercent}% principal and ${(100 - safePrincipalPercent).toFixed(1)}% interest`}
        >
          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#EEF2F6"
            strokeWidth={strokeWidth}
          />

          {/* Principal Segment (Deep Navy) */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#102A43"
            strokeWidth={strokeWidth}
            strokeDasharray={`${principalDash} ${circumference}`}
            strokeDashoffset="0"
            strokeLinecap="round"
            className="hl-circle-principal"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />

          {/* Interest Segment (Gold) */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#D4A84F"
            strokeWidth={strokeWidth}
            strokeDasharray={`${interestDash} ${circumference}`}
            strokeDashoffset={-principalDash}
            strokeLinecap="round"
            className="hl-circle-interest"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </svg>

        {/* Center Text */}
        <div className="hl-chart-center-content">
          <span className="hl-chart-center-label">Total Payable</span>
          <span className="hl-chart-center-value">{formatINR(totalRepayment)}</span>
        </div>
      </div>

      {/* Legend */}
      <div className="hl-chart-legend">
        <div className="hl-legend-row">
          <div className="hl-legend-dot principal-dot" aria-hidden="true" />
          <div className="hl-legend-meta">
            <span className="hl-legend-title">Principal Loan Amount</span>
            <div className="hl-legend-numbers">
              <strong className="hl-legend-amount">{formatINR(principal)}</strong>
              <span className="hl-legend-badge">({safePrincipalPercent}%)</span>
            </div>
          </div>
        </div>

        <div className="hl-legend-row">
          <div className="hl-legend-dot interest-dot" aria-hidden="true" />
          <div className="hl-legend-meta">
            <span className="hl-legend-title">Total Interest Payable</span>
            <div className="hl-legend-numbers">
              <strong className="hl-legend-amount">{formatINR(totalInterest)}</strong>
              <span className="hl-legend-badge gold-badge">({(100 - safePrincipalPercent).toFixed(1)}%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
