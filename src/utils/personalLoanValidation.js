/**
 * Shrikha Finserv — Personal Loan Form Validation Functions
 */

import {
  OCCUPATION_TYPES,
  COMPANY_STRUCTURES,
  INCOME_MODES,
  PRIMARY_BANKS,
  CAR_OWNERSHIP_OPTIONS,
  CIBIL_SCORE_OPTIONS,
  GENDER_OPTIONS
} from './personalLoanCalculator';

/**
 * Validates a single field in the personal loan application form.
 * 
 * @param {string} name - Field name
 * @param {any} value - Field value
 * @returns {string|null} Error message or null if valid
 */
export function validatePersonalLoanField(name, value) {
  switch (name) {
    case 'occupationType': {
      if (!value || !OCCUPATION_TYPES.includes(value)) {
        return 'Please select your occupation type.';
      }
      return null;
    }

    case 'companyName': {
      const trimmed = (value || '').trim();
      if (!trimmed) return 'Company / Business Name is required.';
      if (trimmed.length < 2) return 'Company Name must be at least 2 characters.';
      if (trimmed.length > 80) return 'Company Name cannot exceed 80 characters.';
      return null;
    }

    case 'companyStructure': {
      if (!value || !COMPANY_STRUCTURES.includes(value)) {
        return 'Please select your company structure.';
      }
      return null;
    }

    case 'incomeMode': {
      if (!value || !INCOME_MODES.includes(value)) {
        return 'Please select your salary / income mode.';
      }
      return null;
    }

    case 'primaryBank': {
      if (!value || !PRIMARY_BANKS.includes(value)) {
        return 'Please select your primary salary / bank account.';
      }
      return null;
    }

    case 'loanAmount': {
      const num = Number(String(value).replace(/[^0-9]/g, ''));
      if (!value || isNaN(num) || num <= 0) {
        return 'Please enter a valid required loan amount in ₹.';
      }
      if (num < 10000) {
        return 'Minimum required loan amount is ₹10,000.';
      }
      if (num > 5000000) {
        return 'Maximum personal loan amount is ₹50,00,000.';
      }
      return null;
    }

    case 'monthlyIncome': {
      const num = Number(String(value).replace(/[^0-9]/g, ''));
      if (!value || isNaN(num) || num <= 0) {
        return 'Please enter your monthly net income / turnover in ₹.';
      }
      if (num < 5000) {
        return 'Minimum indicative monthly income is ₹5,000.';
      }
      return null;
    }

    case 'ownsCar': {
      if (!value || !CAR_OWNERSHIP_OPTIONS.includes(value)) {
        return 'Please select if you own a four-wheeler (car).';
      }
      return null;
    }

    case 'cibilScore': {
      if (!value || !CIBIL_SCORE_OPTIONS.includes(value)) {
        return 'Please select your estimated CIBIL / Credit Score.';
      }
      return null;
    }

    case 'city': {
      const trimmed = (value || '').trim();
      if (!trimmed) return 'City of Residence is required.';
      if (trimmed.length < 2) return 'City must contain at least 2 characters.';
      return null;
    }

    case 'fullName': {
      const trimmed = (value || '').trim();
      if (!trimmed) return 'Full Name (As Per PAN Card) is required.';
      if (trimmed.length < 2) return 'Full Name must be at least 2 characters.';
      if (trimmed.length > 70) return 'Full Name cannot exceed 70 characters.';
      if (!/^[a-zA-Z\s.'-]+$/.test(trimmed)) {
        return 'Full Name should only contain letters, spaces, or hyphens.';
      }
      return null;
    }

    case 'email': {
      const trimmed = (value || '').trim();
      if (!trimmed) return 'Email Address is required.';
      if (/\s/.test(trimmed)) return 'Email address cannot contain spaces.';
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(trimmed)) return 'Please enter a valid email address (e.g. name@example.com).';
      return null;
    }

    case 'mobileNumber': {
      const raw = (value || '').trim().replace(/\D/g, '');
      let standard10 = raw;
      if (raw.length === 12 && raw.startsWith('91')) {
        standard10 = raw.slice(2);
      } else if (raw.length === 11 && raw.startsWith('0')) {
        standard10 = raw.slice(1);
      }
      if (!standard10) return 'Mobile Number is required.';
      if (standard10.length !== 10) return 'Please enter a valid 10-digit Indian mobile number.';
      if (!/^[6-9]/.test(standard10)) return 'Indian mobile numbers must start with 6, 7, 8, or 9.';
      if (/^(\d)\1{9}$/.test(standard10)) return 'Please enter a valid mobile number.';
      return null;
    }

    case 'dob': {
      if (!value) return 'Date of Birth is required.';
      // Check date format YYYY-MM-DD or DD-MM-YYYY
      let birthDate;
      if (value.includes('-')) {
        const parts = value.split('-');
        if (parts[0].length === 4) {
          // YYYY-MM-DD
          birthDate = new Date(value);
        } else {
          // DD-MM-YYYY
          birthDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
        }
      } else {
        birthDate = new Date(value);
      }

      if (isNaN(birthDate.getTime())) {
        return 'Please enter a valid Date of Birth (dd-mm-yyyy).';
      }

      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      if (age < 18) {
        return 'Applicant must be at least 18 years of age.';
      }
      if (age > 75) {
        return 'Applicant age exceeds eligible borrowing limit (max 75 years).';
      }
      return null;
    }

    case 'gender': {
      if (!value || !GENDER_OPTIONS.includes(value)) {
        return 'Please select your gender.';
      }
      return null;
    }

    case 'loanTenure': {
      const num = Number(value);
      if (!value || isNaN(num) || num < 6 || num > 84) {
        return 'Please select a tenure between 6 and 84 months.';
      }
      return null;
    }

    default:
      return null;
  }
}
