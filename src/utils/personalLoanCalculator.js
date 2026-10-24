/**
 * Shrikha Finserv — Personal Loan EMI Calculator Utilities
 * 
 * Standard reducing-balance EMI formula:
 * EMI = P × R × (1 + R)^N / ((1 + R)^N - 1)
 * 
 * Where:
 * P = Principal loan amount (₹10,000 to ₹50,00,000)
 * R = Monthly interest rate (annual interest rate / 12 / 100)
 * N = Total number of monthly instalments (6 to 84 months)
 */

export const PERSONAL_LOAN_DEFAULTS = {
  LOAN_AMOUNT: 500000, // ₹5 Lakh default
  MIN_LOAN_AMOUNT: 10000, // ₹10,000
  MAX_LOAN_AMOUNT: 5000000, // ₹50 Lakh
  LOAN_AMOUNT_STEP: 10000,

  TENURE_MONTHS: 36, // 36 Months (3 Years) default
  MIN_TENURE_MONTHS: 6,
  MAX_TENURE_MONTHS: 84,
  TENURE_MONTHS_STEP: 1,

  ANNUAL_INTEREST_RATE: 12.0, // 12% p.a. default
  MIN_INTEREST_RATE: 8.0, // 8% p.a.
  MAX_INTEREST_RATE: 30.0, // 30% p.a.
  INTEREST_RATE_STEP: 0.1
};

export const TENURE_MONTHS_OPTIONS = [
  { value: 6, label: '6 Months (0.5 Year)' },
  { value: 12, label: '12 Months (1 Year)' },
  { value: 18, label: '18 Months (1.5 Years)' },
  { value: 24, label: '24 Months (2 Years)' },
  { value: 36, label: '36 Months (3 Years)' },
  { value: 48, label: '48 Months (4 Years)' },
  { value: 60, label: '60 Months (5 Years)' },
  { value: 72, label: '72 Months (6 Years)' },
  { value: 84, label: '84 Months (7 Years)' }
];

export const OCCUPATION_TYPES = [
  'Salaried',
  'Self Employed Professional',
  'Self Employed Business',
  'Doctor / Healthcare Professional',
  'Chartered Accountant',
  'Other Occupation'
];

export const COMPANY_STRUCTURES = [
  'Private Limited',
  'Public Limited',
  'Partnership',
  'Proprietorship',
  'Limited Liability Partnership (LLP)',
  'Government / PSU',
  'Other'
];

export const INCOME_MODES = [
  'Bank Transfer / Direct Deposit',
  'Cheque',
  'Cash'
];

export const PRIMARY_BANKS = [
  'HDFC Bank',
  'State Bank of India (SBI)',
  'ICICI Bank',
  'Axis Bank',
  'Kotak Mahindra Bank',
  'Punjab National Bank',
  'Bank of Baroda',
  'Canara Bank',
  'Union Bank of India',
  'IndusInd Bank',
  'Federal Bank',
  'Other Bank'
];

export const CAR_OWNERSHIP_OPTIONS = [
  'Yes',
  'No'
];

export const CIBIL_SCORE_OPTIONS = [
  'Excellent (750+)',
  'Good (700 - 749)',
  'Average (650 - 699)',
  'Below 650',
  'Not Sure / No Credit History'
];

export const GENDER_OPTIONS = [
  'Male',
  'Female',
  'Other'
];

export const EMPLOYMENT_TYPES = [
  'Salaried',
  'Self-employed',
  'Business Owner'
];

export const CONTACT_METHODS = [
  'Phone Call',
  'Email'
];

/**
 * Calculates monthly EMI, total interest, and total repayment amount
 * based on reducing-balance method.
 * 
 * @param {number} principal - Loan amount in rupees
 * @param {number} annualRate - Annual interest rate in percent (e.g. 12.0)
 * @param {number} tenureMonths - Total number of monthly instalments (e.g. 36)
 * @returns {object} Calculation results with rounded integer values
 */
export function calculatePersonalLoanEMI(principal, annualRate, tenureMonths) {
  const p = Math.max(0, Number(principal) || 0);
  const rate = Math.max(0, Number(annualRate) || 0);
  const n = Math.max(0, Math.round(Number(tenureMonths) || 0));

  if (n <= 0 || p <= 0) {
    return {
      monthlyEMI: 0,
      totalInterest: 0,
      totalRepayment: 0,
      principal: p,
      principalPercent: 100,
      interestPercent: 0,
      tenureMonths: n,
      tenureYears: (n / 12).toFixed(1)
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
      tenureYears: (n / 12).toFixed(1)
    };
  }

  // Standard reducing-balance formula:
  // R = monthly interest rate = annualRate / 12 / 100
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
      tenureYears: (n / 12).toFixed(1)
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
    tenureYears: (n / 12).toFixed(1)
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
 * Compact Indian Rupee format for tags and chips (e.g. ₹5 Lakh, ₹10 K)
 * 
 * @param {number} value
 * @returns {string}
 */
export function formatCompactINR(value) {
  if (!value || isNaN(value)) return '₹0';
  const val = Number(value);
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
    return `₹${k % 1 === 0 ? k : k.toFixed(0)} K`;
  }
  return `₹${val}`;
}

export const PERSONAL_AMOUNT_PRESETS = [
  50000,
  100000,
  300000,
  500000,
  1000000,
  2500000
];

export const PERSONAL_TENURE_PRESETS = [
  { months: 12, label: '1 Yr' },
  { months: 24, label: '2 Yrs' },
  { months: 36, label: '3 Yrs' },
  { months: 48, label: '4 Yrs' },
  { months: 60, label: '5 Yrs' },
  { months: 84, label: '7 Yrs' }
];

export const PERSONAL_RATE_PRESETS = [9.99, 11.5, 12.0, 14.0, 16.5, 18.0];
