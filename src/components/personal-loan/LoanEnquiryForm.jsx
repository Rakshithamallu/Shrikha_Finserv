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
  Sparkles,
  Info
} from 'lucide-react';
import { formatINR } from '../../utils/emiCalculator';

export default function LoanEnquiryForm({ initialValues, updatedFromCalculatorTimestamp }) {
  // Form fields state
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    employmentType: 'Salaried',
    monthlyIncome: '',
    loanAmount: initialValues?.loanAmount ? String(initialValues.loanAmount) : '300000',
    loanTenure: initialValues?.tenureYears ? String(initialValues.tenureYears) : '3',
    city: 'Mysore',
    preferredContact: 'Phone Call',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [showPrefillNotification, setShowPrefillNotification] = useState(false);

  // When initialValues change (from Proceed to Enquiry), sync to form without affecting calculator
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

  // Validation function for a specific field
  const validateSingleField = (name, value) => {
    switch (name) {
      case 'fullName': {
        const trimmed = (value || '').trim();
        if (!trimmed) return 'Full Name is required.';
        if (trimmed.length < 2) return 'Full Name must be at least 2 characters.';
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
        if (/^(\d)\1{9}$/.test(standard10)) return 'Please enter a valid, reachable mobile number.';
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

      case 'employmentType': {
        if (!['Salaried', 'Self-employed'].includes(value)) {
          return 'Please select a valid employment type.';
        }
        return null;
      }

      case 'monthlyIncome': {
        const num = Number(String(value).replace(/[^0-9]/g, ''));
        if (!value || isNaN(num) || num <= 0) {
          return 'Please enter a valid positive monthly income in ₹.';
        }
        if (num < 5000) {
          return 'Minimum indicative monthly income for consideration is ₹5,000.';
        }
        return null;
      }

      case 'loanAmount': {
        const num = Number(String(value).replace(/[^0-9]/g, ''));
        if (!value || isNaN(num) || num <= 0) {
          return 'Please enter a valid loan amount in ₹.';
        }
        if (num < 25000) {
          return 'Minimum personal loan amount is ₹25,000.';
        }
        if (num > 10000000) {
          return 'Maximum personal loan amount is ₹1,00,00,000.';
        }
        return null;
      }

      case 'loanTenure': {
        const num = Number(value);
        if (!value || isNaN(num) || num < 1 || num > 7) {
          return 'Please select a loan tenure between 1 and 7 years.';
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

  // Handle changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const err = validateSingleField(name, value);
      setErrors(prev => ({ ...prev, [name]: err }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const err = validateSingleField(name, value);
    setErrors(prev => ({ ...prev, [name]: err }));
  };

  // Reset form
  const handleResetForm = () => {
    setFormData({
      fullName: '',
      mobileNumber: '',
      email: '',
      employmentType: 'Salaried',
      monthlyIncome: '',
      loanAmount: '300000',
      loanTenure: '3',
      city: 'Mysore',
      preferredContact: 'Phone Call',
      message: ''
    });
    setErrors({});
    setTouched({});
    setSubmittedData(null);
  };

  // Submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    const fieldNames = [
      'fullName',
      'mobileNumber',
      'email',
      'employmentType',
      'monthlyIncome',
      'loanAmount',
      'loanTenure',
      'city',
      'preferredContact'
    ];

    fieldNames.forEach(field => {
      const err = validateSingleField(field, formData[field]);
      if (err) newErrors[field] = err;
    });

    // Mark all as touched
    const allTouched = {};
    fieldNames.forEach(f => { allTouched[f] = true; });
    setTouched(allTouched);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      // Scroll to first invalid field
      const firstErrorKey = Object.keys(newErrors)[0];
      const el = document.getElementById(`field-${firstErrorKey}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // Submission in progress
    setIsSubmitting(true);

    try {
      /**
       * =========================================================================
       * FUTURE API ENDPOINT INTEGRATION POINT
       * =========================================================================
       * To connect to a live backend endpoint in production:
       * 
       * const response = await fetch('/api/enquiries', {
       *   method: 'POST',
       *   headers: { 'Content-Type': 'application/json' },
       *   body: JSON.stringify({
       *     service: 'Personal Loan',
       *     fullName: formData.fullName,
       *     mobileNumber: formData.mobileNumber,
       *     email: formData.email,
       *     employmentType: formData.employmentType,
       *     monthlyIncome: Number(formData.monthlyIncome),
       *     loanAmount: Number(formData.loanAmount),
       *     tenureYears: Number(formData.loanTenure),
       *     city: formData.city,
       *     preferredContact: formData.preferredContact,
       *     message: formData.message,
       *     source: 'Personal Loan Dedicated Page',
       *     timestamp: new Date().toISOString()
       *   })
       * });
       * const result = await response.json();
       * =========================================================================
       */

      // Simulated network processing latency (800ms) for realistic UX
      await new Promise(resolve => setTimeout(resolve, 800));

      // Successfully validated demo submission
      setSubmittedData({
        fullName: formData.fullName,
        mobileNumber: formData.mobileNumber,
        email: formData.email,
        employmentType: formData.employmentType,
        monthlyIncome: formData.monthlyIncome,
        loanAmount: formData.loanAmount,
        loanTenure: formData.loanTenure,
        city: formData.city,
        preferredContact: formData.preferredContact,
        message: formData.message,
        validatedAt: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      });
    } catch (err) {
      console.error('Submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="personal-loan-enquiry-form"
      className="section section-alt enquiry-section"
      aria-label="Personal Loan Enquiry Form"
    >
      <div className="container container-narrow">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag section-tag-gold">
            <Send size={14} />
            <span>Direct Guidance</span>
          </div>
          <h2 className="section-title">
            Enquire About a <span className="highlight-text">Personal Loan</span>
          </h2>
          <p className="section-desc">
            Share your details and our team can contact you to discuss available options.
          </p>
        </div>

        {/* Prefill Notification Banner */}
        {showPrefillNotification && (
          <div className="prefill-notification-banner" role="status">
            <Sparkles size={18} className="banner-icon" />
            <div>
              <strong>Calculator Values Transferred:</strong> Loan amount (₹{Number(formData.loanAmount).toLocaleString('en-IN')}) and tenure ({formData.loanTenure} years) have been pre-filled below. You may edit them at any time.
            </div>
          </div>
        )}

        {/* Success State View */}
        {submittedData ? (
          <div className="enquiry-success-card" role="region" aria-label="Submission Result">
            <div className="success-icon-wrapper">
              <CheckCircle2 size={48} className="success-icon" />
            </div>
            <h3 className="success-title">Enquiry Form Validated Successfully!</h3>
            <p className="success-subtitle">
              Thank you, <strong>{submittedData.fullName}</strong>. Your preliminary details for a personal loan have passed all frontend validation checks.
            </p>

            {/* Validation Details Summary */}
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
                <span className="summary-lbl">Loan Amount:</span>
                <span className="summary-val">{formatINR(submittedData.loanAmount)}</span>
              </div>
              <div className="summary-item">
                <span className="summary-lbl">Tenure:</span>
                <span className="summary-val">{submittedData.loanTenure} Years</span>
              </div>
              <div className="summary-item">
                <span className="summary-lbl">City:</span>
                <span className="summary-val">{submittedData.city}</span>
              </div>
              <div className="summary-item">
                <span className="summary-lbl">Contact Via:</span>
                <span className="summary-val">{submittedData.preferredContact}</span>
              </div>
            </div>

            {/* Strict Factual Disclaimer regarding Demo Mode */}
            <div className="demo-notice-box">
              <Info size={20} className="notice-icon" />
              <div className="notice-content">
                <strong>Demonstration Mode Notice</strong>
                <p>
                  This enquiry was successfully validated in the browser interface. In accordance with current demonstration constraints, this form has <strong>not been transmitted to a live CRM or external lender database</strong>, and no actual representative notification or credit bureau inquiry has been performed.
                </p>
                <p>
                  To connect directly with the Shrikha Finserv office in Mysore, please reach out via phone at <a href="tel:8792953082" className="phone-inline-link">8792953082</a> or email <a href="mailto:shrikhafinserv@gmail.com" className="phone-inline-link">shrikhafinserv@gmail.com</a>.
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
          /* Main Enquiry Form */
          <form
            className="enquiry-form-card"
            onSubmit={handleSubmit}
            noValidate
            aria-label="Personal Loan Enquiry Submission Form"
          >
            <div className="form-grid-2col">
              {/* 1. Full Name */}
              <div className="form-group" id="field-fullName">
                <label htmlFor="input-fullName" className="form-label">
                  <span>Full Name <span className="required-mark">*</span></span>
                  {touched.fullName && !errors.fullName && (
                    <span className="valid-label-badge"><CheckCircle2 size={12} /> Valid</span>
                  )}
                </label>
                <div className="input-with-icon">
                  <User size={18} className="input-icon" />
                  <input
                    id="input-fullName"
                    name="fullName"
                    type="text"
                    className={`form-input ${touched.fullName && errors.fullName ? 'has-error' : ''}`}
                    placeholder="e.g. Suresh Kumar"
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
              <div className="form-group" id="field-mobileNumber">
                <label htmlFor="input-mobileNumber" className="form-label">
                  <span>Mobile Number <span className="required-mark">*</span></span>
                  {touched.mobileNumber && !errors.mobileNumber && (
                    <span className="valid-label-badge"><CheckCircle2 size={12} /> Valid</span>
                  )}
                </label>
                <div className="input-with-icon">
                  <Phone size={18} className="input-icon" />
                  <input
                    id="input-mobileNumber"
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
              <div className="form-group" id="field-email">
                <label htmlFor="input-email" className="form-label">
                  <span>Email Address <span className="required-mark">*</span></span>
                  {touched.email && !errors.email && (
                    <span className="valid-label-badge"><CheckCircle2 size={12} /> Valid</span>
                  )}
                </label>
                <div className="input-with-icon">
                  <Mail size={18} className="input-icon" />
                  <input
                    id="input-email"
                    name="email"
                    type="email"
                    className={`form-input ${touched.email && errors.email ? 'has-error' : ''}`}
                    placeholder="e.g. name@example.com"
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
              <div className="form-group" id="field-employmentType">
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
              <div className="form-group" id="field-monthlyIncome">
                <label htmlFor="input-monthlyIncome" className="form-label">
                  <span>Monthly In-Hand Income (₹) <span className="required-mark">*</span></span>
                  {touched.monthlyIncome && !errors.monthlyIncome && (
                    <span className="valid-label-badge"><CheckCircle2 size={12} /> Valid</span>
                  )}
                </label>
                <div className="input-with-icon">
                  <IndianRupee size={18} className="input-icon" />
                  <input
                    id="input-monthlyIncome"
                    name="monthlyIncome"
                    type="number"
                    min="1000"
                    step="1000"
                    className={`form-input ${touched.monthlyIncome && errors.monthlyIncome ? 'has-error' : ''}`}
                    placeholder="e.g. 50000"
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

              {/* 6. Requested Loan Amount */}
              <div className="form-group" id="field-loanAmount">
                <label htmlFor="input-loanAmount" className="form-label">
                  <span>Loan Amount Required (₹) <span className="required-mark">*</span></span>
                  {touched.loanAmount && !errors.loanAmount && (
                    <span className="valid-label-badge"><CheckCircle2 size={12} /> Valid</span>
                  )}
                </label>
                <div className="input-with-icon">
                  <IndianRupee size={18} className="input-icon" />
                  <input
                    id="input-loanAmount"
                    name="loanAmount"
                    type="number"
                    min="25000"
                    max="10000000"
                    step="5000"
                    className={`form-input ${touched.loanAmount && errors.loanAmount ? 'has-error' : ''}`}
                    placeholder="e.g. 300000"
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

              {/* 7. Preferred Loan Tenure */}
              <div className="form-group" id="field-loanTenure">
                <label htmlFor="input-loanTenure" className="form-label">
                  <span>Preferred Loan Tenure <span className="required-mark">*</span></span>
                </label>
                <div className="input-with-icon">
                  <Clock size={18} className="input-icon" />
                  <select
                    id="input-loanTenure"
                    name="loanTenure"
                    className="form-select"
                    value={formData.loanTenure}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-required="true"
                  >
                    <option value="1">1 Year (12 Months)</option>
                    <option value="2">2 Years (24 Months)</option>
                    <option value="3">3 Years (36 Months)</option>
                    <option value="4">4 Years (48 Months)</option>
                    <option value="5">5 Years (60 Months)</option>
                    <option value="6">6 Years (72 Months)</option>
                    <option value="7">7 Years (84 Months)</option>
                  </select>
                </div>
              </div>

              {/* 8. City */}
              <div className="form-group" id="field-city">
                <label htmlFor="input-city" className="form-label">
                  <span>City / Town in Karnataka <span className="required-mark">*</span></span>
                  {touched.city && !errors.city && (
                    <span className="valid-label-badge"><CheckCircle2 size={12} /> Valid</span>
                  )}
                </label>
                <div className="input-with-icon">
                  <MapPin size={18} className="input-icon" />
                  <input
                    id="input-city"
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

              {/* 9. Preferred Contact Method */}
              <div className="form-group form-group-span-2" id="field-preferredContact">
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

              {/* 10. Optional Message */}
              <div className="form-group form-group-span-2" id="field-message">
                <label htmlFor="input-message" className="form-label">
                  <span>Additional Details / Notes</span>
                  <span className="optional-mark">(Optional)</span>
                </label>
                <div className="input-with-icon">
                  <MessageSquare size={18} className="input-icon textarea-icon" />
                  <textarea
                    id="input-message"
                    name="message"
                    rows={3}
                    className="form-textarea"
                    placeholder="Any specific requirement, employer details, or existing liabilities you wish to share..."
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Privacy & Anti-Spam Notice */}
            <div className="form-privacy-note">
              <ShieldCheck size={16} className="shield-icon" />
              <span>
                Your privacy is paramount. Shrikha Finserv will never sell or rent your personal information to unauthorized third-party marketing brokers.
              </span>
            </div>

            {/* Form Actions */}
            <div className="form-actions-row">
              <button
                type="submit"
                className="btn btn-primary btn-lg submit-enquiry-btn"
                disabled={isSubmitting}
                id="btn-submit-personal-loan-enquiry"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="spinner" />
                    <span>Validating Enquiry...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Personal Loan Enquiry</span>
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
