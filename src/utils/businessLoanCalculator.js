/**
 * Shrikha Finserv — Business Loan EMI Calculator Utilities
 * 
 * Standard reducing-balance EMI formula:
 * EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)
 * 
 * Where:
 * P = Principal loan amount (₹30,000 to ₹1,00,00,000)
 * r = Monthly interest rate (annual interest rate / 12 / 100)
 * n = Total number of monthly installments (tenure in years * 12, up to 7 years)
 */

export const BUSINESS_LOAN_DEFAULTS = {
  LOAN_AMOUNT: 500000, // ₹5 Lakh
  MIN_LOAN_AMOUNT: 30000, // ₹30,000
  MAX_LOAN_AMOUNT: 10000000, // ₹1,00,00,000 (1 Crore)
  LOAN_AMOUNT_STEP: 25000,

  TENURE_YEARS: 3, // 3 Years (36 Months)
  MIN_TENURE_YEARS: 1,
  MAX_TENURE_YEARS: 7,

  ANNUAL_INTEREST_RATE: 12.0, // 12% p.a.
  MIN_INTEREST_RATE: 9.99, // 9.99% p.a.
  MAX_INTEREST_RATE: 24.0, // 24% p.a.
  INTEREST_RATE_STEP: 0.1,

  // Business Funding Planner Defaults
  PURPOSE: 'Working Capital',
  FUNDING_REQUIREMENT: 1000000, // ₹10 Lakh
  AVAILABLE_FUNDS: 300000 // ₹3 Lakh
};

export const BUSINESS_PURPOSES = [
  'Working Capital',
  'Inventory Purchase',
  'Equipment or Machinery',
  'Business Expansion',
  'Office or Shop Setup',
  'Other Business Needs'
];

export const BUSINESS_TYPES = [
  'Sole Proprietorship',
  'Partnership',
  'Private Limited Company',
  'Limited Liability Partnership',
  'Other'
];

export const BUSINESS_INDUSTRIES = [
  'Retail',
  'Manufacturing',
  'Trading',
  'Services',
  'Healthcare',
  'Hospitality',
  'Information Technology',
  'Other'
];

export const BUSINESS_VINTAGES = [
  'Less than 1 year',
  '1–3 years',
  '3–5 years',
  'More than 5 years'
];

export const LOAN_PURPOSES_FORM = [
  'Working Capital',
  'Inventory',
  'Equipment or Machinery',
  'Expansion',
  'Other Business Needs'
];

/**
 * Calculates monthly EMI, total interest, and total repayment amount
 * based on reducing-balance method.
 * 
 * @param {number} principal - Loan amount in rupees
 * @param {number} annualRate - Annual interest rate in percent (e.g. 12)
 * @param {number} tenureYears - Loan tenure in years (e.g. 3)
 * @returns {object} Calculation results with rounded integer values
 */
export function calculateBusinessLoanEMI(principal, annualRate, tenureYears) {
  const p = Math.max(0, Number(principal) || 0);
  const rate = Math.max(0, Number(annualRate) || 0);
  const years = Math.max(0, Number(tenureYears) || 0);
  const n = Math.round(years * 12);

  if (n <= 0 || p <= 0) {
    return {
      monthlyEMI: 0,
      totalInterest: 0,
      totalRepayment: 0,
      principal: p,
      principalPercent: 100,
      interestPercent: 0,
      tenureMonths: n,
      tenureYears: years
    };
  }

  // Zero interest rate edge case (0% interest)
  if (rate === 0) {
    const emi = Math.round(p / n);
    return {
      monthlyEMI: emi,
      totalInterest: 0,
      totalRepayment: p,
      principal: p,
      principalPercent: 100,
      interestPercent: 0,
      tenureMonths: n,
      tenureYears: years
    };
  }

  // Standard reducing-balance formula
  const r = rate / (12 * 100);
  const factor = Math.pow(1 + r, n);

  if (factor === 1 || isNaN(factor) || !isFinite(factor)) {
    const emi = Math.round(p / n);
    return {
      monthlyEMI: emi,
      totalInterest: 0,
      totalRepayment: p,
      principal: p,
      principalPercent: 100,
      interestPercent: 0,
      tenureMonths: n,
      tenureYears: years
    };
  }

  const rawEMI = (p * r * factor) / (factor - 1);
  const monthlyEMI = Math.round(rawEMI);
  const totalRepayment = monthlyEMI * n;
  const totalInterest = Math.max(0, totalRepayment - p);

  const principalPercent = totalRepayment > 0
    ? Math.min(100, Math.max(0, Number(((p / totalRepayment) * 100).toFixed(1))))
    : 100;
  const interestPercent = totalRepayment > 0
    ? Math.min(100, Math.max(0, Number((100 - principalPercent).toFixed(1))))
    : 0;

  return {
    monthlyEMI,
    totalInterest,
    totalRepayment,
    principal: p,
    principalPercent,
    interestPercent,
    tenureMonths: n,
    tenureYears: years
  };
}

/**
 * Formats a numeric value into Indian Rupee format (e.g. ₹5,00,000)
 * 
 * @param {number} value
 * @returns {string}
 */
export function formatINR(value) {
  if (value === null || value === undefined || isNaN(value)) {
    return '₹0';
  }
  const rounded = Math.round(Number(value));
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(rounded);
}

/**
 * Compact Indian Rupee format for tags and chips (e.g. ₹5L, ₹1Cr)
 * 
 * @param {number} value
 * @returns {string}
 */
export function formatCompactINR(value) {
  if (!value || isNaN(value)) return '₹0';
  const val = Number(value);
  if (val >= 10000000) {
    const cr = (val / 10000000).toFixed(val % 10000000 === 0 ? 0 : 2);
    return `₹${cr} Cr`;
  }
  if (val >= 100000) {
    const l = (val / 100000).toFixed(val % 100000 === 0 ? 0 : 1);
    return `₹${l} L`;
  }
  if (val >= 1000) {
    const k = (val / 1000).toFixed(val % 1000 === 0 ? 0 : 1);
    return `₹${k} K`;
  }
  return `₹${val}`;
}

export const BUSINESS_AMOUNT_PRESETS = [
  100000,
  300000,
  500000,
  1000000,
  2500000,
  5000000
];

export const BUSINESS_TENURE_PRESETS = [1, 2, 3, 5, 7];

export const BUSINESS_RATE_PRESETS = [9.99, 11.5, 12.0, 14.5, 16.0, 18.0];
