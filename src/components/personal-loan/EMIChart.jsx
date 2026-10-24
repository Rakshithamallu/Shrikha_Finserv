import React from 'react';
import { formatINR } from '../../utils/emiCalculator';

/**
 * Lightweight, zero-dependency SVG Donut Chart representing Principal vs. Interest breakdown
 */
export default function EMIChart({ principal, totalInterest, totalRepayment, principalPercent, interestPercent }) {
  const size = 180;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2; // radius = 78
  const circumference = 2 * Math.PI * radius; // ~490.09

  // Calculate stroke dash offsets
  const safePrincipalPercent = Math.max(0, Math.min(100, principalPercent || 0));
  const principalDash = (safePrincipalPercent / 100) * circumference;
  const interestDash = circumference - principalDash;

  return (
    <div className="emi-chart-wrapper" aria-label="Loan repayment breakdown chart">
      <div className="chart-svg-container">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="donut-svg"
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

          {/* Principal Circle Segment (Navy / Primary) */}
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
            className="chart-circle-principal"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />

          {/* Interest Circle Segment (Gold / Accent) */}
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
            className="chart-circle-interest"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </svg>

        {/* Center Text in Donut */}
        <div className="chart-center-content">
          <span className="chart-center-label">Total Payable</span>
          <span className="chart-center-value">{formatINR(totalRepayment)}</span>
        </div>
      </div>

      {/* Legend */}
      <div className="chart-legend-grid">
        <div className="legend-item principal-item">
          <div className="legend-indicator-dot principal-dot" aria-hidden="true" />
          <div className="legend-meta">
            <span className="legend-title">Principal Loan Amount</span>
            <div className="legend-numbers">
              <strong className="legend-amount">{formatINR(principal)}</strong>
              <span className="legend-badge">({safePrincipalPercent}%)</span>
            </div>
          </div>
        </div>

        <div className="legend-item interest-item">
          <div className="legend-indicator-dot interest-dot" aria-hidden="true" />
          <div className="legend-meta">
            <span className="legend-title">Total Interest Payable</span>
            <div className="legend-numbers">
              <strong className="legend-amount">{formatINR(totalInterest)}</strong>
              <span className="legend-badge gold-badge">({(100 - safePrincipalPercent).toFixed(1)}%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
