/**
 * Shrikha Finserv — Home Loan EMI Calculator Utilities
 * 
 * Standard reducing-balance EMI formula:
 * EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)
 * 
 * Where:
 * P = Principal loan amount (₹1,00,000 to ₹10,00,00,000)
 * r = Monthly interest rate (annual interest rate / 12 / 100)
 * n = Total number of monthly installments (tenure in years * 12, up to 30 years)
 */

export const HOME_LOAN_DEFAULTS = {
  LOAN_AMOUNT: 2500000, // ₹25 Lakh
  MIN_LOAN_AMOUNT: 100000, // ₹1 Lakh
  MAX_LOAN_AMOUNT: 100000000, // ₹10 Crore
  LOAN_AMOUNT_STEP: 50000,

  TENURE_YEARS: 20, // 20 Years
  MIN_TENURE_YEARS: 1,
  MAX_TENURE_YEARS: 30,

  ANNUAL_INTEREST_RATE: 8.5, // 8.5% p.a.
  MIN_INTEREST_RATE: 0.5,
  MAX_INTEREST_RATE: 15.0,
  INTEREST_RATE_STEP: 0.1,

  PROPERTY_VALUE: 4000000, // ₹40 Lakh
  DOWN_PAYMENT: 1500000 // ₹15 Lakh
};

/**
 * Calculates monthly EMI, total interest, and total repayment amount
 * based on reducing-balance method.
 * 
 * @param {number} principal - Loan amount in rupees
 * @param {number} annualRate - Annual interest rate in percent (e.g. 8.5)
 * @param {number} tenureYears - Loan tenure in years (e.g. 20)
 * @returns {object} Calculation results with rounded integer values
 */
export function calculateHomeLoanEMI(principal, annualRate, tenureYears) {
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
  const r = rate / (12 * 100); // monthly interest rate
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
 * Formats a numeric value into Indian Rupee format (e.g. ₹25,00,000)
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
 * Formats large amounts into readable compact Indian strings (e.g. ₹1 Lakh, ₹25 Lakh, ₹1 Cr)
 * 
 * @param {number} value
 * @returns {string}
 */
export function formatCompactINR(value) {
  const val = Number(value) || 0;
  if (val >= 10000000) {
    const cr = val / 10000000;
    return `₹${cr % 1 === 0 ? cr : cr.toFixed(1)} Cr`;
  }
  if (val >= 100000) {
    const lakh = val / 100000;
    return `₹${lakh % 1 === 0 ? lakh : lakh.toFixed(1)} Lakh`;
  }
  if (val >= 1000) {
    const k = val / 1000;
    return `₹${k % 1 === 0 ? k : k.toFixed(1)} K`;
  }
  return `₹${val}`;
}

export const HOME_LOAN_AMOUNT_PRESETS = [
  { label: '₹15 Lakh', value: 1500000 },
  { label: '₹25 Lakh', value: 2500000 },
  { label: '₹50 Lakh', value: 5000000 },
  { label: '₹75 Lakh', value: 7500000 },
  { label: '₹1 Crore', value: 10000000 },
  { label: '₹2 Crore', value: 20000000 }
];

export const HOME_LOAN_TENURE_PRESETS = [
  { label: '5 Years', value: 5 },
  { label: '10 Years', value: 10 },
  { label: '15 Years', value: 15 },
  { label: '20 Years', value: 20 },
  { label: '25 Years', value: 25 },
  { label: '30 Years', value: 30 }
];

export const HOME_LOAN_RATE_PRESETS = [
  { label: '7.5%', value: 7.5 },
  { label: '8.0%', value: 8.0 },
  { label: '8.5%', value: 8.5 },
  { label: '9.0%', value: 9.0 },
  { label: '9.5%', value: 9.5 }
];
