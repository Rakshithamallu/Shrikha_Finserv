/**
 * Shrikha Finserv — Car Loan EMI Calculator Utilities
 * 
 * Standard reducing-balance EMI formula:
 * EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)
 * 
 * Where:
 * P = Principal loan amount (₹1,00,000 to ₹50,00,000)
 * r = Monthly interest rate (annual interest rate / 12 / 100)
 * n = Total number of monthly installments (tenure in years * 12, up to 8 years)
 */

export const CAR_LOAN_DEFAULTS = {
  CAR_TYPE: 'New Car', // 'New Car' | 'Pre-Owned Car'
  LOAN_AMOUNT: 1000000, // ₹10 Lakh
  MIN_LOAN_AMOUNT: 100000, // ₹1 Lakh
  MAX_LOAN_AMOUNT: 5000000, // ₹50 Lakh
  LOAN_AMOUNT_STEP: 25000,

  TENURE_YEARS: 5, // 5 Years (60 Months)
  MIN_TENURE_YEARS: 1,
  MAX_TENURE_YEARS: 8,

  ANNUAL_INTEREST_RATE: 8.5, // 8.5% p.a.
  MIN_INTEREST_RATE: 7.0,
  MAX_INTEREST_RATE: 15.0,
  INTEREST_RATE_STEP: 0.1,

  ON_ROAD_PRICE: 1250000, // ₹12.5 Lakh
  DOWN_PAYMENT: 250000 // ₹2.5 Lakh (20%)
};

/**
 * Calculates monthly EMI, total interest, and total repayment amount
 * based on reducing-balance method.
 * 
 * @param {number} principal - Loan amount in rupees
 * @param {number} annualRate - Annual interest rate in percent (e.g. 8.5)
 * @param {number} tenureYears - Loan tenure in years (e.g. 5)
 * @param {string} carType - 'New Car' | 'Pre-Owned Car'
 * @returns {object} Calculation results with rounded integer values
 */
export function calculateCarLoanEMI(principal, annualRate, tenureYears, carType = 'New Car') {
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
      tenureYears: years,
      carType
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
      tenureYears: years,
      carType
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
      tenureYears: years,
      carType
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
    tenureYears: years,
    carType
  };
}

/**
 * Formats a numeric value into Indian Rupee format (e.g. ₹10,00,000)
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
 * Formats large amounts into readable compact Indian strings (e.g. ₹3 Lakh, ₹10 Lakh, ₹50 Lakh)
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

export const CAR_LOAN_AMOUNT_PRESETS = [
  { label: '₹3 Lakh', value: 300000 },
  { label: '₹5 Lakh', value: 500000 },
  { label: '₹10 Lakh', value: 1000000 },
  { label: '₹15 Lakh', value: 1500000 },
  { label: '₹25 Lakh', value: 2500000 },
  { label: '₹40 Lakh', value: 4000000 }
];

export const CAR_LOAN_TENURE_PRESETS = [
  { label: '1 Year', value: 1 },
  { label: '3 Years', value: 3 },
  { label: '5 Years', value: 5 },
  { label: '7 Years', value: 7 },
  { label: '8 Years', value: 8 }
];

export const CAR_LOAN_RATE_PRESETS = [
  { label: '7.5%', value: 7.5 },
  { label: '8.0%', value: 8.0 },
  { label: '8.5%', value: 8.5 },
  { label: '9.5%', value: 9.5 },
  { label: '11.0%', value: 11.0 }
];
