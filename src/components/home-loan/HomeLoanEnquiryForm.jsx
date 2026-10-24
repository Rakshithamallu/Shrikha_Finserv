import React, { useState, useEffect } from 'react';
import {
  Send,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
  Phone,
  Mail,
  User,
  Briefcase,
  IndianRupee,
  Clock,
  MapPin,
  MessageSquare,
  Home,
  Building,
  Sparkles,
  Info
} from 'lucide-react';
import { formatINR } from '../../utils/homeLoanCalculator';

export const PROPERTY_PURPOSES = [
  'Purchase a new home',
  'Purchase a resale property',
  'Construct a house',
  'Renovate an existing home',
  'Purchase a residential plot, subject to lender offerings',
  'Transfer an existing home loan'
];

export default function HomeLoanEnquiryForm({ initialValues, updatedFromCalculatorTimestamp }) {
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    employmentType: 'Salaried',
    monthlyIncome: '',
    propertyValue: '',
    loanAmount: initialValues?.loanAmount ? String(initialValues.loanAmount) : '2500000',
    loanTenure: initialValues?.tenureYears ? String(initialValues.tenureYears) : '20',
    propertyPurpose: 'Purchase a new home',
    city: 'Mysore',
    preferredContact: 'Phone Call',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [showPrefillNotification, setShowPrefillNotification] = useState(false);

  useEffect(() => {
    if (initialValues) {
      setFormData(prev => ({
        ...prev,
        loanAmount: initialValues.loanAmount ? String(initialValues.loanAmount) : prev.loanAmount,
        loanTenure: initialValues.tenureYears ? String(initialValues.tenureYears) : prev.loanTenure
      }));
      setShowPrefillNotification(true);
      const timer = setTimeout(() => setShowPrefillNotification(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [updatedFromCalculatorTimestamp]);

  const validateField = (name, value) => {
    switch (name) {
      case 'fullName': {
        const trimmed = (value || '').trim();
        if (!trimmed) return 'Full Name is required.';
        if (trimmed.length < 2) return 'Full Name must contain at least 2 characters.';
        if (trimmed.length > 60) return 'Full Name cannot exceed 60 characters.';
        if (!/^[a-zA-Z\s.'-]+$/.test(trimmed)) {
          return 'Full Name should only contain letters, spaces, or hyphens.';
        }
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
        if (/^(\d)\1{9}$/.test(standard10)) return 'Please enter a reachable mobile number.';
        return null;
      }

      case 'email': {
        const trimmed = (value || '').trim();
        if (!trimmed) return 'Email address is required.';
        if (/\s/.test(trimmed)) return 'Email address cannot contain spaces.';
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(trimmed)) return 'Please enter a valid email address (e.g. name@example.com).';
        return null;
      }

      case 'employmentType': {
        if (!['Salaried', 'Self-employed'].includes(value)) {
          return 'Please select an employment type.';
        }
        return null;
      }

      case 'monthlyIncome': {
        const num = Number(String(value).replace(/[^0-9]/g, ''));
        if (!value || isNaN(num) || num <= 0) {
          return 'Please enter a positive monthly income in ₹.';
        }
        if (num < 10000) {
          return 'Minimum indicative monthly income for housing finance is ₹10,000.';
        }
        return null;
      }

      case 'propertyValue': {
        const num = Number(String(value).replace(/[^0-9]/g, ''));
        if (!value || isNaN(num) || num <= 0) {
          return 'Please enter the estimated property value in ₹.';
        }
        return null;
      }

      case 'loanAmount': {
        const num = Number(String(value).replace(/[^0-9]/g, ''));
        if (!value || isNaN(num) || num <= 0) {
          return 'Please enter a valid loan amount in ₹.';
        }
        if (num < 100000) {
          return 'Minimum home loan amount is ₹1,00,000.';
        }
        if (num > 100000000) {
          return 'Maximum home loan amount is ₹10,00,00,000.';
        }
        return null;
      }

      case 'loanTenure': {
        const num = Number(value);
        if (!value || isNaN(num) || num < 1 || num > 30) {
          return 'Please select a supported tenure between 5 and 30 years.';
        }
        return null;
      }

      case 'propertyPurpose': {
        if (!PROPERTY_PURPOSES.includes(value)) {
          return 'Please select a valid property purpose.';
        }
        return null;
      }

      case 'city': {
        const trimmed = (value || '').trim();
        if (!trimmed) return 'City is required.';
        if (trimmed.length < 2) return 'City must contain at least 2 characters.';
        return null;
      }

      case 'preferredContact': {
        if (!['Phone Call', 'WhatsApp', 'Email'].includes(value)) {
          return 'Please select a preferred contact method.';
        }
        return null;
      }

      default:
        return null;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const err = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: err }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const err = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: err }));
  };

  const handleResetForm = () => {
    setFormData({
      fullName: '',
      mobileNumber: '',
      email: '',
      employmentType: 'Salaried',
      monthlyIncome: '',
      propertyValue: '',
      loanAmount: '2500000',
      loanTenure: '20',
      propertyPurpose: 'Purchase a new home',
      city: 'Mysore',
      preferredContact: 'Phone Call',
      message: ''
    });
    setErrors({});
    setTouched({});
    setSubmittedData(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      'fullName',
      'mobileNumber',
      'email',
      'employmentType',
      'monthlyIncome',
      'propertyValue',
      'loanAmount',
      'loanTenure',
      'propertyPurpose',
      'city',
      'preferredContact'
    ];

    const newErrors = {};
    requiredFields.forEach(field => {
      const err = validateField(field, formData[field]);
      if (err) newErrors[field] = err;
    });

    const allTouched = {};
    requiredFields.forEach(f => { allTouched[f] = true; });
    setTouched(allTouched);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstErr = Object.keys(newErrors)[0];
      const el = document.getElementById(`hl-field-${firstErr}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);

    try {
      /**
       * =========================================================================
       * FUTURE API ENDPOINT INTEGRATION POINT
       * =========================================================================
       * To integrate with a live CRM or backend in production:
       * 
       * const response = await fetch('/api/enquiries', {
       *   method: 'POST',
       *   headers: { 'Content-Type': 'application/json' },
       *   body: JSON.stringify({
       *     service: 'Home Loan',
       *     fullName: formData.fullName,
       *     mobileNumber: formData.mobileNumber,
       *     email: formData.email,
       *     employmentType: formData.employmentType,
       *     monthlyIncome: Number(formData.monthlyIncome),
       *     propertyValue: Number(formData.propertyValue),
       *     loanAmount: Number(formData.loanAmount),
       *     tenureYears: Number(formData.loanTenure),
       *     propertyPurpose: formData.propertyPurpose,
       *     city: formData.city,
       *     preferredContact: formData.preferredContact,
       *     message: formData.message,
       *     source: 'Home Loan Dedicated Page',
       *     timestamp: new Date().toISOString()
       *   })
       * });
       * const data = await response.json();
       * =========================================================================
       */

      // Simulated network validation latency
      await new Promise(resolve => setTimeout(resolve, 800));

      setSubmittedData({
        fullName: formData.fullName,
        mobileNumber: formData.mobileNumber,
        email: formData.email,
        employmentType: formData.employmentType,
        monthlyIncome: formData.monthlyIncome,
        propertyValue: formData.propertyValue,
        loanAmount: formData.loanAmount,
        loanTenure: formData.loanTenure,
        propertyPurpose: formData.propertyPurpose,
        city: formData.city,
        preferredContact: formData.preferredContact,
        message: formData.message
      });
    } catch (err) {
      console.error('Submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="home-loan-enquiry-form"
      className="section section-alt hl-enquiry-section"
      aria-label="Home Loan Enquiry Form"
    >
      <div className="container container-narrow">
        <div className="section-header">
          <div className="section-tag section-tag-gold">
            <Send size={14} />
            <span>Dedicated Consultation</span>
          </div>
          <h2 className="section-title">
            Enquire About a <span className="highlight-text">Home Loan</span>
          </h2>
          <p className="section-desc">
            Tell us about your home-financing requirements so you can discuss available options with the Shrikha Finserv team.
          </p>
        </div>

        {/* Prefill Notification Banner */}
        {showPrefillNotification && (
          <div className="prefill-notification-banner" role="status">
            <Sparkles size={18} className="banner-icon" />
            <div>
              <strong>Calculator Values Transferred:</strong> Home loan amount (₹{Number(formData.loanAmount).toLocaleString('en-IN')}) and tenure ({formData.loanTenure} years) have been pre-filled below. You can freely adjust them as needed.
            </div>
          </div>
        )}

        {/* Success State View */}
        {submittedData ? (
          <div className="enquiry-success-card" role="region" aria-label="Home Loan Enquiry Confirmation">
            <div className="success-icon-wrapper">
              <CheckCircle2 size={48} className="success-icon" />
            </div>
            <h3 className="success-title">Home Loan Enquiry Validated Successfully!</h3>
            <p className="success-subtitle">
              Thank you, <strong>{submittedData.fullName}</strong>. Your home financing enquiry has passed all client-side validation rules.
            </p>

            <div className="success-summary-grid">
              <div className="summary-item">
                <span className="summary-lbl">Applicant Name:</span>
                <span className="summary-val">{submittedData.fullName}</span>
              </div>
              <div className="summary-item">
                <span className="summary-lbl">Mobile Number:</span>
                <span className="summary-val">{submittedData.mobileNumber}</span>
              </div>
              <div className="summary-item">
                <span className="summary-lbl">Email Address:</span>
                <span className="summary-val">{submittedData.email}</span>
              </div>
              <div className="summary-item">
                <span className="summary-lbl">Employment:</span>
                <span className="summary-val">{submittedData.employmentType}</span>
              </div>
              <div className="summary-item">
                <span className="summary-lbl">Property Purpose:</span>
                <span className="summary-val">{submittedData.propertyPurpose}</span>
              </div>
              <div className="summary-item">
                <span className="summary-lbl">Property Value:</span>
                <span className="summary-val">{formatINR(submittedData.propertyValue)}</span>
              </div>
              <div className="summary-item">
                <span className="summary-lbl">Loan Amount Required:</span>
                <span className="summary-val">{formatINR(submittedData.loanAmount)}</span>
              </div>
              <div className="summary-item">
                <span className="summary-lbl">Preferred Tenure:</span>
                <span className="summary-val">{submittedData.loanTenure} Years</span>
              </div>
              <div className="summary-item">
                <span className="summary-lbl">City:</span>
                <span className="summary-val">{submittedData.city}</span>
              </div>
              <div className="summary-item">
                <span className="summary-lbl">Preferred Contact:</span>
                <span className="summary-val">{submittedData.preferredContact}</span>
              </div>
            </div>

            {/* Clear Demonstration Mode Notice */}
            <div className="demo-notice-box">
              <Info size={20} className="notice-icon" />
              <div className="notice-content">
                <strong>Demonstration Mode Notice</strong>
                <p>
                  This form submission has been verified and validated locally. As part of this demonstration environment, your personal details have <strong>not been transmitted to a live CRM or external lender database</strong>, and no representative notification has been initiated.
                </p>
                <p>
                  To speak directly with a Shrikha Finserv advisor regarding housing finance options in Mysore or Karnataka, please call <a href="tel:8792953082" className="phone-inline-link">8792953082</a> or email <a href="mailto:shrikhafinserv@gmail.com" className="phone-inline-link">shrikhafinserv@gmail.com</a>.
                </p>
              </div>
            </div>

            <div className="success-actions">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleResetForm}
              >
                <RotateCcw size={16} />
                <span>Submit Another Enquiry</span>
              </button>
            </div>
          </div>
        ) : (
          /* Main Form */
          <form
            className="enquiry-form-card"
            onSubmit={handleSubmit}
            noValidate
            aria-label="Home Loan Enquiry Submission Form"
          >
            <div className="form-grid-2col">
              {/* 1. Full Name */}
              <div className="form-group" id="hl-field-fullName">
                <label htmlFor="hl-fullName" className="form-label">
                  <span>Full Name <span className="required-mark">*</span></span>
                  {touched.fullName && !errors.fullName && (
                    <span className="valid-label-badge"><CheckCircle2 size={12} /> Valid</span>
                  )}
                </label>
                <div className="input-with-icon">
                  <User size={18} className="input-icon" />
                  <input
                    id="hl-fullName"
                    name="fullName"
                    type="text"
                    className={`form-input ${touched.fullName && errors.fullName ? 'has-error' : ''}`}
                    placeholder="e.g. Anand Ranganath"
                    value={formData.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-required="true"
                    aria-invalid={!!(touched.fullName && errors.fullName)}
                  />
                </div>
                {touched.fullName && errors.fullName && (
                  <p className="form-error-msg" role="alert">
                    <AlertCircle size={14} /> <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              {/* 2. Mobile Number */}
              <div className="form-group" id="hl-field-mobileNumber">
                <label htmlFor="hl-mobileNumber" className="form-label">
                  <span>Mobile Number <span className="required-mark">*</span></span>
                  {touched.mobileNumber && !errors.mobileNumber && (
                    <span className="valid-label-badge"><CheckCircle2 size={12} /> Valid</span>
                  )}
                </label>
                <div className="input-with-icon">
                  <Phone size={18} className="input-icon" />
                  <input
                    id="hl-mobileNumber"
                    name="mobileNumber"
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    className={`form-input ${touched.mobileNumber && errors.mobileNumber ? 'has-error' : ''}`}
                    placeholder="10-digit mobile (e.g. 9876543210)"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-required="true"
                    aria-invalid={!!(touched.mobileNumber && errors.mobileNumber)}
                  />
                </div>
                {touched.mobileNumber && errors.mobileNumber && (
                  <p className="form-error-msg" role="alert">
                    <AlertCircle size={14} /> <span>{errors.mobileNumber}</span>
                  </p>
                )}
              </div>

              {/* 3. Email Address */}
              <div className="form-group" id="hl-field-email">
                <label htmlFor="hl-email" className="form-label">
                  <span>Email Address <span className="required-mark">*</span></span>
                  {touched.email && !errors.email && (
                    <span className="valid-label-badge"><CheckCircle2 size={12} /> Valid</span>
                  )}
                </label>
                <div className="input-with-icon">
                  <Mail size={18} className="input-icon" />
                  <input
                    id="hl-email"
                    name="email"
                    type="email"
                    className={`form-input ${touched.email && errors.email ? 'has-error' : ''}`}
                    placeholder="e.g. anand@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-required="true"
                    aria-invalid={!!(touched.email && errors.email)}
                  />
                </div>
                {touched.email && errors.email && (
                  <p className="form-error-msg" role="alert">
                    <AlertCircle size={14} /> <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* 4. Employment Type */}
              <div className="form-group" id="hl-field-employmentType">
                <label className="form-label">
                  <span>Employment Type <span className="required-mark">*</span></span>
                </label>
                <div className="radio-pill-group" role="radiogroup" aria-label="Employment Type">
                  <label className={`radio-pill-item ${formData.employmentType === 'Salaried' ? 'is-selected' : ''}`}>
                    <input
                      type="radio"
                      name="employmentType"
                      value="Salaried"
                      checked={formData.employmentType === 'Salaried'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <Briefcase size={16} />
                    <span>Salaried</span>
                  </label>
                  <label className={`radio-pill-item ${formData.employmentType === 'Self-employed' ? 'is-selected' : ''}`}>
                    <input
                      type="radio"
                      name="employmentType"
                      value="Self-employed"
                      checked={formData.employmentType === 'Self-employed'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <User size={16} />
                    <span>Self-employed / Business</span>
                  </label>
                </div>
              </div>

              {/* 5. Monthly Income */}
              <div className="form-group" id="hl-field-monthlyIncome">
                <label htmlFor="hl-monthlyIncome" className="form-label">
                  <span>Monthly In-Hand Income (₹) <span className="required-mark">*</span></span>
                  {touched.monthlyIncome && !errors.monthlyIncome && (
                    <span className="valid-label-badge"><CheckCircle2 size={12} /> Valid</span>
                  )}
                </label>
                <div className="input-with-icon">
                  <IndianRupee size={18} className="input-icon" />
                  <input
                    id="hl-monthlyIncome"
                    name="monthlyIncome"
                    type="number"
                    min="1000"
                    step="5000"
                    className={`form-input ${touched.monthlyIncome && errors.monthlyIncome ? 'has-error' : ''}`}
                    placeholder="e.g. 75000"
                    value={formData.monthlyIncome}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-required="true"
                    aria-invalid={!!(touched.monthlyIncome && errors.monthlyIncome)}
                  />
                </div>
                {touched.monthlyIncome && errors.monthlyIncome && (
                  <p className="form-error-msg" role="alert">
                    <AlertCircle size={14} /> <span>{errors.monthlyIncome}</span>
                  </p>
                )}
              </div>

              {/* 6. Estimated Property Value */}
              <div className="form-group" id="hl-field-propertyValue">
                <label htmlFor="hl-propertyValue" className="form-label">
                  <span>Estimated Property Value (₹) <span className="required-mark">*</span></span>
                  {touched.propertyValue && !errors.propertyValue && (
                    <span className="valid-label-badge"><CheckCircle2 size={12} /> Valid</span>
                  )}
                </label>
                <div className="input-with-icon">
                  <Building size={18} className="input-icon" />
                  <input
                    id="hl-propertyValue"
                    name="propertyValue"
                    type="number"
                    min="100000"
                    step="50000"
                    className={`form-input ${touched.propertyValue && errors.propertyValue ? 'has-error' : ''}`}
                    placeholder="e.g. 5000000"
                    value={formData.propertyValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-required="true"
                    aria-invalid={!!(touched.propertyValue && errors.propertyValue)}
                  />
                </div>
                {touched.propertyValue && errors.propertyValue && (
                  <p className="form-error-msg" role="alert">
                    <AlertCircle size={14} /> <span>{errors.propertyValue}</span>
                  </p>
                )}
              </div>

              {/* 7. Loan Amount Required */}
              <div className="form-group" id="hl-field-loanAmount">
                <label htmlFor="hl-loanAmount" className="form-label">
                  <span>Loan Amount Required (₹) <span className="required-mark">*</span></span>
                  {touched.loanAmount && !errors.loanAmount && (
                    <span className="valid-label-badge"><CheckCircle2 size={12} /> Valid</span>
                  )}
                </label>
                <div className="input-with-icon">
                  <IndianRupee size={18} className="input-icon" />
                  <input
                    id="hl-loanAmount"
                    name="loanAmount"
                    type="number"
                    min="100000"
                    max="100000000"
                    step="50000"
                    className={`form-input ${touched.loanAmount && errors.loanAmount ? 'has-error' : ''}`}
                    placeholder="e.g. 2500000"
                    value={formData.loanAmount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-required="true"
                    aria-invalid={!!(touched.loanAmount && errors.loanAmount)}
                  />
                </div>
                {touched.loanAmount && errors.loanAmount && (
                  <p className="form-error-msg" role="alert">
                    <AlertCircle size={14} /> <span>{errors.loanAmount}</span>
                  </p>
                )}
              </div>

              {/* 8. Preferred Loan Tenure */}
              <div className="form-group" id="hl-field-loanTenure">
                <label htmlFor="hl-loanTenure" className="form-label">
                  <span>Preferred Loan Tenure <span className="required-mark">*</span></span>
                </label>
                <div className="input-with-icon">
                  <Clock size={18} className="input-icon" />
                  <select
                    id="hl-loanTenure"
                    name="loanTenure"
                    className="form-select"
                    value={formData.loanTenure}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-required="true"
                  >
                    <option value="5">5 Years (60 Months)</option>
                    <option value="10">10 Years (120 Months)</option>
                    <option value="15">15 Years (180 Months)</option>
                    <option value="20">20 Years (240 Months)</option>
                    <option value="25">25 Years (300 Months)</option>
                    <option value="30">30 Years (360 Months)</option>
                  </select>
                </div>
              </div>

              {/* 9. Property Purpose */}
              <div className="form-group form-group-span-2" id="hl-field-propertyPurpose">
                <label htmlFor="hl-propertyPurpose" className="form-label">
                  <span>Property Purpose <span className="required-mark">*</span></span>
                </label>
                <div className="input-with-icon">
                  <Home size={18} className="input-icon" />
                  <select
                    id="hl-propertyPurpose"
                    name="propertyPurpose"
                    className="form-select"
                    value={formData.propertyPurpose}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-required="true"
                  >
                    {PROPERTY_PURPOSES.map((purpose) => (
                      <option key={purpose} value={purpose}>{purpose}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 10. City */}
              <div className="form-group" id="hl-field-city">
                <label htmlFor="hl-city" className="form-label">
                  <span>City / Town in Karnataka <span className="required-mark">*</span></span>
                  {touched.city && !errors.city && (
                    <span className="valid-label-badge"><CheckCircle2 size={12} /> Valid</span>
                  )}
                </label>
                <div className="input-with-icon">
                  <MapPin size={18} className="input-icon" />
                  <input
                    id="hl-city"
                    name="city"
                    type="text"
                    className={`form-input ${touched.city && errors.city ? 'has-error' : ''}`}
                    placeholder="e.g. Mysore, Bengaluru, Mandya..."
                    value={formData.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-required="true"
                    aria-invalid={!!(touched.city && errors.city)}
                  />
                </div>
                {touched.city && errors.city && (
                  <p className="form-error-msg" role="alert">
                    <AlertCircle size={14} /> <span>{errors.city}</span>
                  </p>
                )}
              </div>

              {/* 11. Preferred Contact Method */}
              <div className="form-group" id="hl-field-preferredContact">
                <label className="form-label">
                  <span>Preferred Contact Method <span className="required-mark">*</span></span>
                </label>
                <div className="contact-methods-pill-group" role="radiogroup" aria-label="Preferred Contact Method">
                  {['Phone Call', 'WhatsApp', 'Email'].map((method) => (
                    <label
                      key={method}
                      className={`method-pill-item ${formData.preferredContact === method ? 'is-selected' : ''}`}
                    >
                      <input
                        type="radio"
                        name="preferredContact"
                        value={method}
                        checked={formData.preferredContact === method}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <span>{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 12. Optional Message */}
              <div className="form-group form-group-span-2" id="hl-field-message">
                <label htmlFor="hl-message" className="form-label">
                  <span>Additional Information / Specific Requirements</span>
                  <span className="optional-mark">(Optional)</span>
                </label>
                <div className="input-with-icon">
                  <MessageSquare size={18} className="input-icon textarea-icon" />
                  <textarea
                    id="hl-message"
                    name="message"
                    rows={3}
                    className="form-textarea"
                    placeholder="Provide any details about the property stage (under-construction, ready-to-move, approved layout), existing loan balance if transferring, or co-applicant details..."
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Privacy note */}
            <div className="form-privacy-note">
              <ShieldCheck size={16} className="shield-icon" />
              <span>
                Your privacy and financial confidentiality are strictly respected. Shrikha Finserv does not sell or share borrower data with third-party marketing services.
              </span>
            </div>

            {/* Form Actions */}
            <div className="form-actions-row">
              <button
                type="submit"
                className="btn btn-primary btn-lg submit-enquiry-btn"
                disabled={isSubmitting}
                id="btn-submit-home-loan-enquiry"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="spinner" />
                    <span>Validating Enquiry...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Home Loan Enquiry</span>
                    <Send size={18} />
                  </>
                )}
              </button>

              <button
                type="button"
                className="btn btn-outline reset-form-btn"
                onClick={handleResetForm}
                disabled={isSubmitting}
              >
                <RotateCcw size={16} />
                <span>Reset Form</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
