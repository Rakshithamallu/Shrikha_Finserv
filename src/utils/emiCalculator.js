/**
 * Shrikha Finserv — Personal Loan EMI Calculator Utilities
 * 
 * Standard reducing-balance EMI formula:
 * EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)
 * 
 * Where:
 * P = Principal loan amount
 * r = Monthly interest rate (annual interest rate / 12 / 100)
 * n = Total number of monthly installments (tenure in years * 12)
 */

export const CALCULATOR_DEFAULTS = {
  LOAN_AMOUNT: 300000,
  MIN_LOAN_AMOUNT: 25000,
  MAX_LOAN_AMOUNT: 10000000, // ₹1 Crore
  LOAN_AMOUNT_STEP: 25000,

  TENURE_YEARS: 3,
  MIN_TENURE_YEARS: 1,
  MAX_TENURE_YEARS: 7,

  ANNUAL_INTEREST_RATE: 12.0,
  MIN_INTEREST_RATE: 9.99,
  MAX_INTEREST_RATE: 24.0,
  INTEREST_RATE_STEP: 0.1
};

/**
 * Calculates monthly EMI, total interest, and total repayment amount
 * based on reducing-balance method.
 * 
 * @param {number} principal - Loan amount in rupees
 * @param {number} annualRate - Annual interest rate in percent (e.g. 12.0)
 * @param {number} tenureYears - Loan tenure in years (e.g. 3)
 * @returns {object} Calculation results with rounded integer values and internal precise numbers
 */
export function calculateEMI(principal, annualRate, tenureYears) {
  const p = Math.max(0, Number(principal) || 0);
  const rate = Math.max(0, Number(annualRate) || 0);
  const years = Math.max(0, Number(tenureYears) || 0);
  const n = Math.round(years * 12);

  // Guard against zero months or zero principal
  if (n <= 0 || p <= 0) {
    return {
      monthlyEMI: 0,
      totalInterest: 0,
      totalRepayment: 0,
      principal: p,
      principalPercent: 100,
      interestPercent: 0,
      tenureMonths: n
    };
  }

  // Zero interest rate edge case (0% interest)
  if (rate === 0) {
    const emi = Math.round(p / n);
    const totalRepayment = p;
    return {
      monthlyEMI: emi,
      totalInterest: 0,
      totalRepayment: totalRepayment,
      principal: p,
      principalPercent: 100,
      interestPercent: 0,
      tenureMonths: n
    };
  }

  // Standard reducing-balance formula
  const r = rate / (12 * 100); // monthly interest rate
  const factor = Math.pow(1 + r, n);
  
  // Guard against numerical issues
  if (factor === 1 || isNaN(factor) || !isFinite(factor)) {
    const emi = Math.round(p / n);
    return {
      monthlyEMI: emi,
      totalInterest: 0,
      totalRepayment: p,
      principal: p,
      principalPercent: 100,
      interestPercent: 0,
      tenureMonths: n
    };
  }

  const rawEMI = (p * r * factor) / (factor - 1);
  const monthlyEMI = Math.round(rawEMI);
  
  // Total repayment = monthlyEMI * number of installments
  const totalRepayment = monthlyEMI * n;
  const totalInterest = Math.max(0, totalRepayment - p);

  // Proportions for visual chart
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
    tenureMonths: n
  };
}

/**
 * Formats a numeric value into Indian Rupee format (e.g. ₹3,00,000)
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
 * Formats large amounts into readable compact Indian strings (e.g. ₹25 K, ₹3 Lakh, ₹1 Cr)
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

/**
 * Quick preset options for quick selection chips
 */
export const LOAN_AMOUNT_PRESETS = [
  { label: '₹1 Lakh', value: 100000 },
  { label: '₹3 Lakh', value: 300000 },
  { label: '₹5 Lakh', value: 500000 },
  { label: '₹10 Lakh', value: 1000000 },
  { label: '₹25 Lakh', value: 2500000 },
  { label: '₹50 Lakh', value: 5000000 }
];

export const TENURE_YEAR_PRESETS = [
  { label: '1 Year', value: 1 },
  { label: '2 Years', value: 2 },
  { label: '3 Years', value: 3 },
  { label: '4 Years', value: 4 },
  { label: '5 Years', value: 5 },
  { label: '7 Years', value: 7 }
];

export const INTEREST_RATE_PRESETS = [
  { label: '9.99%', value: 9.99 },
  { label: '11.5%', value: 11.5 },
  { label: '12%', value: 12.0 },
  { label: '13.5%', value: 13.5 },
  { label: '15%', value: 15.0 }
];
