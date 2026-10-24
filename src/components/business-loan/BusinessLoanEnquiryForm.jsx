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
  Building,
  Factory,
  Sparkles,
  Info,
  Calendar
} from 'lucide-react';
import {
  BUSINESS_TYPES,
  BUSINESS_INDUSTRIES,
  BUSINESS_VINTAGES,
  LOAN_PURPOSES_FORM,
  formatINR
} from '../../utils/businessLoanCalculator';

export default function BusinessLoanEnquiryForm({ initialValues, updatedFromCalculatorTimestamp }) {
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    businessName: '',
    businessType: 'Sole Proprietorship',
    industry: 'Retail',
    businessVintage: '1–3 years',
    monthlyTurnover: '',
    loanAmount: initialValues?.loanAmount ? String(initialValues.loanAmount) : '500000',
    loanPurpose: initialValues?.loanPurpose || 'Working Capital',
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

  // Sync when Proceed to Enquiry is triggered from calculator
  useEffect(() => {
    if (initialValues) {
      setFormData(prev => ({
        ...prev,
        loanAmount: initialValues.loanAmount ? String(initialValues.loanAmount) : prev.loanAmount,
        loanTenure: initialValues.tenureYears ? String(initialValues.tenureYears) : prev.loanTenure,
        loanPurpose: initialValues.loanPurpose || prev.loanPurpose
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

      case 'businessName': {
        const trimmed = (value || '').trim();
        if (!trimmed) return 'Business Name is required.';
        if (trimmed.length < 2) return 'Business Name must be at least 2 characters.';
        return null;
      }

      case 'businessType': {
        if (!BUSINESS_TYPES.includes(value)) {
          return 'Please select a valid business structure.';
        }
        return null;
      }

      case 'industry': {
        if (!BUSINESS_INDUSTRIES.includes(value)) {
          return 'Please select an industry sector.';
        }
        return null;
      }

      case 'businessVintage': {
        if (!BUSINESS_VINTAGES.includes(value)) {
          return 'Please select business operational vintage.';
        }
        return null;
      }

      case 'monthlyTurnover': {
        const num = Number(String(value).replace(/[^0-9]/g, ''));
        if (!value || isNaN(num) || num <= 0) {
          return 'Please enter a positive monthly turnover in ₹.';
        }
        return null;
      }

      case 'loanAmount': {
        const num = Number(String(value).replace(/[^0-9]/g, ''));
        if (!value || isNaN(num) || num <= 0) {
          return 'Please enter a valid business loan amount in ₹.';
        }
        if (num < 30000) {
          return 'Minimum business loan amount is ₹30,000.';
        }
        if (num > 10000000) {
          return 'Maximum business loan amount is ₹1,00,00,000 (₹1 Crore).';
        }
        return null;
      }

      case 'loanPurpose': {
        if (!LOAN_PURPOSES_FORM.includes(value)) {
          return 'Please select a loan purpose.';
        }
        return null;
      }

      case 'loanTenure': {
        const num = Number(value);
        if (!value || isNaN(num) || num < 1 || num > 7) {
          return 'Please select a tenure between 1 and 7 years.';
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
      businessName: '',
      businessType: 'Sole Proprietorship',
      industry: 'Retail',
      businessVintage: '1–3 years',
      monthlyTurnover: '',
      loanAmount: '500000',
      loanPurpose: 'Working Capital',
      loanTenure: '3',
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
      'businessName',
      'businessType',
      'industry',
      'businessVintage',
      'monthlyTurnover',
      'loanAmount',
      'loanPurpose',
      'loanTenure',
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
      const el = document.getElementById(`bl-field-${firstErr}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);

    try {
      /**
       * Future API Integration Endpoint:
       * POST /api/enquiries with JSON body
       */
      await new Promise(resolve => setTimeout(resolve, 800));

      setSubmittedData({
        fullName: formData.fullName,
        mobileNumber: formData.mobileNumber,
        email: formData.email,
        businessName: formData.businessName,
        businessType: formData.businessType,
        industry: formData.industry,
        businessVintage: formData.businessVintage,
        monthlyTurnover: formData.monthlyTurnover,
        loanAmount: formData.loanAmount,
        loanPurpose: formData.loanPurpose,
        loanTenure: formData.loanTenure,
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
      id="business-loan-enquiry-form"
      className="section section-alt hl-enquiry-section bl-enquiry-section"
      aria-label="Business Loan Enquiry Form"
    >
      <div className="container container-narrow">
        <div className="section-header">
          <div className="section-tag section-tag-gold">
            <Send size={14} />
            <span>Commercial Finance Enquiry</span>
          </div>
          <h2 className="section-title">
            Enquire About a <span className="highlight-text">Business Loan</span>
          </h2>
          <p className="section-desc">
            Tell us about your business and funding requirements to discuss available financing options with Shrikha Finserv.
          </p>
        </div>

        {/* Prefill Notification Banner */}
        {showPrefillNotification && (
          <div className="prefill-notification-banner" role="status">
            <Sparkles size={18} className="banner-icon" />
            <div>
              <strong>Calculator Values Transferred:</strong> Requested loan amount ({formatINR(formData.loanAmount)}), tenure ({formData.loanTenure} years), and purpose ({formData.loanPurpose}) have been pre-filled below. You can edit them anytime.
            </div>
          </div>
        )}

        {/* Success Confirmation View */}
        {submittedData ? (
          <div className="enquiry-success-card" role="region" aria-label="Business Loan Enquiry Confirmation">
            <div className="success-icon-wrapper">
              <CheckCircle2 size={48} className="success-icon" />
            </div>
            <h3 className="success-title">Business Loan Enquiry Validated Successfully!</h3>
            <p className="success-subtitle">
              Thank you, <strong>{submittedData.fullName}</strong>. Your business financing details for <strong>{submittedData.businessName}</strong> have passed all frontend checks.
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
                <span className="summary-lbl">Business Name:</span>
                <span className="summary-val">{submittedData.businessName}</span>
              </div>
              <div className="summary-item">
                <span className="summary-lbl">Business Structure:</span>
                <span className="summary-val">{submittedData.businessType}</span>
              </div>
              <div className="summary-item">
                <span className="summary-lbl">Industry Sector:</span>
                <span className="summary-val">{submittedData.industry}</span>
              </div>
              <div className="summary-item">
                <span className="summary-lbl">Business Vintage:</span>
                <span className="summary-val">{submittedData.businessVintage}</span>
              </div>
              <div className="summary-item">
                <span className="summary-lbl">Monthly Turnover:</span>
                <span className="summary-val">{formatINR(submittedData.monthlyTurnover)}</span>
              </div>
              <div className="summary-item">
                <span className="summary-lbl">Loan Amount Required:</span>
                <span className="summary-val">{formatINR(submittedData.loanAmount)}</span>
              </div>
              <div className="summary-item">
                <span className="summary-lbl">Purpose of Financing:</span>
                <span className="summary-val">{submittedData.loanPurpose}</span>
              </div>
              <div className="summary-item">
                <span className="summary-lbl">Requested Tenure:</span>
                <span className="summary-val">{submittedData.loanTenure} Years</span>
              </div>
              <div className="summary-item">
                <span className="summary-lbl">Operating City:</span>
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
                  This form submission has been validated in the browser for demonstration and architectural testing. In accordance with project instructions, your enquiry details have <strong>not been transmitted to a lender or CRM</strong>, and no representative notification has been initiated.
                </p>
                <p>
                  To speak directly with a Shrikha Finserv advisor regarding commercial finance in Mysore or Karnataka, please call <a href="tel:8792953082" className="phone-inline-link">8792953082</a> or email <a href="mailto:shrikhafinserv@gmail.com" className="phone-inline-link">shrikhafinserv@gmail.com</a>.
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
          /* Form Input Card */
          <div className="enquiry-form-card">
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-grid-two-col">
                {/* 1. Full Name */}
                <div className="form-group" id="bl-field-fullName">
                  <label htmlFor="bl-input-fullName" className="form-label">
                    <span>Full Name</span>
                    <span className="required-star">*</span>
                  </label>
                  <div className={`input-icon-wrapper ${touched.fullName && errors.fullName ? 'has-error' : ''}`}>
                    <User size={18} className="field-icon" />
                    <input
                      id="bl-input-fullName"
                      name="fullName"
                      type="text"
                      className="form-control"
                      value={formData.fullName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="e.g. Rajesh Kumar"
                      autoComplete="name"
                    />
                  </div>
                  {touched.fullName && errors.fullName && (
                    <p className="form-error-msg" role="alert">
                      <AlertCircle size={14} /> <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                {/* 2. Mobile Number */}
                <div className="form-group" id="bl-field-mobileNumber">
                  <label htmlFor="bl-input-mobileNumber" className="form-label">
                    <span>Mobile Number</span>
                    <span className="required-star">*</span>
                  </label>
                  <div className={`input-icon-wrapper ${touched.mobileNumber && errors.mobileNumber ? 'has-error' : ''}`}>
                    <Phone size={18} className="field-icon" />
                    <input
                      id="bl-input-mobileNumber"
                      name="mobileNumber"
                      type="tel"
                      className="form-control"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="e.g. 9876543210"
                      maxLength={14}
                      autoComplete="tel"
                    />
                  </div>
                  {touched.mobileNumber && errors.mobileNumber && (
                    <p className="form-error-msg" role="alert">
                      <AlertCircle size={14} /> <span>{errors.mobileNumber}</span>
                    </p>
                  )}
                </div>

                {/* 3. Email Address */}
                <div className="form-group" id="bl-field-email">
                  <label htmlFor="bl-input-email" className="form-label">
                    <span>Email Address</span>
                    <span className="required-star">*</span>
                  </label>
                  <div className={`input-icon-wrapper ${touched.email && errors.email ? 'has-error' : ''}`}>
                    <Mail size={18} className="field-icon" />
                    <input
                      id="bl-input-email"
                      name="email"
                      type="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="e.g. rajesh@enterprise.com"
                      autoComplete="email"
                    />
                  </div>
                  {touched.email && errors.email && (
                    <p className="form-error-msg" role="alert">
                      <AlertCircle size={14} /> <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* 4. Business Name */}
                <div className="form-group" id="bl-field-businessName">
                  <label htmlFor="bl-input-businessName" className="form-label">
                    <span>Business Name</span>
                    <span className="required-star">*</span>
                  </label>
                  <div className={`input-icon-wrapper ${touched.businessName && errors.businessName ? 'has-error' : ''}`}>
                    <Building size={18} className="field-icon" />
                    <input
                      id="bl-input-businessName"
                      name="businessName"
                      type="text"
                      className="form-control"
                      value={formData.businessName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="e.g. Mysore Precision Tools"
                    />
                  </div>
                  {touched.businessName && errors.businessName && (
                    <p className="form-error-msg" role="alert">
                      <AlertCircle size={14} /> <span>{errors.businessName}</span>
                    </p>
                  )}
                </div>

                {/* 5. Business Type */}
                <div className="form-group" id="bl-field-businessType">
                  <label htmlFor="bl-input-businessType" className="form-label">
                    <span>Business Structure / Type</span>
                    <span className="required-star">*</span>
                  </label>
                  <div className="custom-select-wrapper">
                    <select
                      id="bl-input-businessType"
                      name="businessType"
                      className="form-control select-control"
                      value={formData.businessType}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {BUSINESS_TYPES.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  {touched.businessType && errors.businessType && (
                    <p className="form-error-msg" role="alert">
                      <AlertCircle size={14} /> <span>{errors.businessType}</span>
                    </p>
                  )}
                </div>

                {/* 6. Industry */}
                <div className="form-group" id="bl-field-industry">
                  <label htmlFor="bl-input-industry" className="form-label">
                    <span>Industry Sector</span>
                    <span className="required-star">*</span>
                  </label>
                  <div className="custom-select-wrapper">
                    <select
                      id="bl-input-industry"
                      name="industry"
                      className="form-control select-control"
                      value={formData.industry}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {BUSINESS_INDUSTRIES.map(ind => (
                        <option key={ind} value={ind}>{ind}</option>
                      ))}
                    </select>
                  </div>
                  {touched.industry && errors.industry && (
                    <p className="form-error-msg" role="alert">
                      <AlertCircle size={14} /> <span>{errors.industry}</span>
                    </p>
                  )}
                </div>

                {/* 7. Business Vintage */}
                <div className="form-group" id="bl-field-businessVintage">
                  <label htmlFor="bl-input-businessVintage" className="form-label">
                    <span>Business Vintage (Years in Operation)</span>
                    <span className="required-star">*</span>
                  </label>
                  <div className="custom-select-wrapper">
                    <select
                      id="bl-input-businessVintage"
                      name="businessVintage"
                      className="form-control select-control"
                      value={formData.businessVintage}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {BUSINESS_VINTAGES.map(v => (
                        <option key={v} value={v}>{v}</option>
                      ))}
                    </select>
                  </div>
                  {touched.businessVintage && errors.businessVintage && (
                    <p className="form-error-msg" role="alert">
                      <AlertCircle size={14} /> <span>{errors.businessVintage}</span>
                    </p>
                  )}
                </div>

                {/* 8. Monthly Business Turnover */}
                <div className="form-group" id="bl-field-monthlyTurnover">
                  <label htmlFor="bl-input-monthlyTurnover" className="form-label">
                    <span>Monthly Business Turnover (₹)</span>
                    <span className="required-star">*</span>
                  </label>
                  <div className={`input-icon-wrapper ${touched.monthlyTurnover && errors.monthlyTurnover ? 'has-error' : ''}`}>
                    <IndianRupee size={18} className="field-icon" />
                    <input
                      id="bl-input-monthlyTurnover"
                      name="monthlyTurnover"
                      type="text"
                      inputMode="numeric"
                      className="form-control"
                      value={formData.monthlyTurnover ? Number(formData.monthlyTurnover.replace(/[^0-9]/g, '')).toLocaleString('en-IN') : ''}
                      onChange={(e) => {
                        const raw = e.target.value.replace(/[^0-9]/g, '');
                        setFormData(prev => ({ ...prev, monthlyTurnover: raw }));
                        if (touched.monthlyTurnover) {
                          const err = validateField('monthlyTurnover', raw);
                          setErrors(prev => ({ ...prev, monthlyTurnover: err }));
                        }
                      }}
                      onBlur={handleBlur}
                      placeholder="e.g. 5,00,000"
                    />
                  </div>
                  {touched.monthlyTurnover && errors.monthlyTurnover && (
                    <p className="form-error-msg" role="alert">
                      <AlertCircle size={14} /> <span>{errors.monthlyTurnover}</span>
                    </p>
                  )}
                </div>

                {/* 9. Loan Amount Required */}
                <div className="form-group" id="bl-field-loanAmount">
                  <label htmlFor="bl-input-loanAmount" className="form-label">
                    <span>Loan Amount Required (₹)</span>
                    <span className="required-star">*</span>
                  </label>
                  <div className={`input-icon-wrapper ${touched.loanAmount && errors.loanAmount ? 'has-error' : ''}`}>
                    <IndianRupee size={18} className="field-icon" />
                    <input
                      id="bl-input-loanAmount"
                      name="loanAmount"
                      type="text"
                      inputMode="numeric"
                      className="form-control"
                      value={formData.loanAmount ? Number(formData.loanAmount.replace(/[^0-9]/g, '')).toLocaleString('en-IN') : ''}
                      onChange={(e) => {
                        const raw = e.target.value.replace(/[^0-9]/g, '');
                        setFormData(prev => ({ ...prev, loanAmount: raw }));
                        if (touched.loanAmount) {
                          const err = validateField('loanAmount', raw);
                          setErrors(prev => ({ ...prev, loanAmount: err }));
                        }
                      }}
                      onBlur={handleBlur}
                      placeholder="e.g. 10,00,000"
                    />
                  </div>
                  {touched.loanAmount && errors.loanAmount && (
                    <p className="form-error-msg" role="alert">
                      <AlertCircle size={14} /> <span>{errors.loanAmount}</span>
                    </p>
                  )}
                </div>

                {/* 10. Loan Purpose */}
                <div className="form-group" id="bl-field-loanPurpose">
                  <label htmlFor="bl-input-loanPurpose" className="form-label">
                    <span>Loan Purpose</span>
                    <span className="required-star">*</span>
                  </label>
                  <div className="custom-select-wrapper">
                    <select
                      id="bl-input-loanPurpose"
                      name="loanPurpose"
                      className="form-control select-control"
                      value={formData.loanPurpose}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {LOAN_PURPOSES_FORM.map(purp => (
                        <option key={purp} value={purp}>{purp}</option>
                      ))}
                    </select>
                  </div>
                  {touched.loanPurpose && errors.loanPurpose && (
                    <p className="form-error-msg" role="alert">
                      <AlertCircle size={14} /> <span>{errors.loanPurpose}</span>
                    </p>
                  )}
                </div>

                {/* 11. Preferred Loan Tenure */}
                <div className="form-group" id="bl-field-loanTenure">
                  <label htmlFor="bl-input-loanTenure" className="form-label">
                    <span>Preferred Loan Tenure</span>
                    <span className="required-star">*</span>
                  </label>
                  <div className="custom-select-wrapper">
                    <select
                      id="bl-input-loanTenure"
                      name="loanTenure"
                      className="form-control select-control"
                      value={formData.loanTenure}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {[1, 2, 3, 4, 5, 6, 7].map(yrs => (
                        <option key={yrs} value={yrs}>
                          {yrs} {yrs === 1 ? 'Year' : 'Years'}
                        </option>
                      ))}
                    </select>
                  </div>
                  {touched.loanTenure && errors.loanTenure && (
                    <p className="form-error-msg" role="alert">
                      <AlertCircle size={14} /> <span>{errors.loanTenure}</span>
                    </p>
                  )}
                </div>

                {/* 12. City */}
                <div className="form-group" id="bl-field-city">
                  <label htmlFor="bl-input-city" className="form-label">
                    <span>Operating City / District</span>
                    <span className="required-star">*</span>
                  </label>
                  <div className={`input-icon-wrapper ${touched.city && errors.city ? 'has-error' : ''}`}>
                    <MapPin size={18} className="field-icon" />
                    <input
                      id="bl-input-city"
                      name="city"
                      type="text"
                      className="form-control"
                      value={formData.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="e.g. Mysore"
                    />
                  </div>
                  {touched.city && errors.city && (
                    <p className="form-error-msg" role="alert">
                      <AlertCircle size={14} /> <span>{errors.city}</span>
                    </p>
                  )}
                </div>

                {/* 13. Preferred Contact Method */}
                <div className="form-group full-width-field" id="bl-field-preferredContact">
                  <label htmlFor="bl-input-preferredContact" className="form-label">
                    <span>Preferred Contact Method</span>
                    <span className="required-star">*</span>
                  </label>
                  <div className="contact-method-pills" role="radiogroup" aria-label="Preferred Contact Method">
                    {['Phone Call', 'WhatsApp', 'Email'].map(method => (
                      <button
                        key={method}
                        type="button"
                        role="radio"
                        aria-checked={formData.preferredContact === method}
                        className={`method-pill-btn ${formData.preferredContact === method ? 'is-selected' : ''}`}
                        onClick={() => {
                          setFormData(prev => ({ ...prev, preferredContact: method }));
                          if (touched.preferredContact) {
                            setErrors(prev => ({ ...prev, preferredContact: null }));
                          }
                        }}
                      >
                        {method === 'Phone Call' && <Phone size={15} />}
                        {method === 'WhatsApp' && <Sparkles size={15} />}
                        {method === 'Email' && <Mail size={15} />}
                        <span>{method}</span>
                      </button>
                    ))}
                  </div>
                  {touched.preferredContact && errors.preferredContact && (
                    <p className="form-error-msg" role="alert">
                      <AlertCircle size={14} /> <span>{errors.preferredContact}</span>
                    </p>
                  )}
                </div>

                {/* 14. Optional Message */}
                <div className="form-group full-width-field">
                  <label htmlFor="bl-input-message" className="form-label">
                    <span>Additional Message or Collateral Details (Optional)</span>
                  </label>
                  <div className="input-icon-wrapper textarea-icon-wrapper">
                    <MessageSquare size={18} className="field-icon textarea-icon" />
                    <textarea
                      id="bl-input-message"
                      name="message"
                      rows={3}
                      className="form-control textarea-control"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe your funding timeline, GST registration status, or any specific collateral preferences..."
                    />
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="form-submit-row">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg submit-enquiry-btn"
                  disabled={isSubmitting}
                  id="btn-bl-submit-enquiry"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="spinner-icon" />
                      <span>Validating Enquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Submit Business Loan Enquiry</span>
                    </>
                  )}
                </button>
              </div>

              <div className="form-security-footer">
                <ShieldCheck size={16} className="security-icon" />
                <span>
                  Your commercial data is verified in-browser with zero unencrypted third-party sharing. No upfront evaluation charges.
                </span>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
