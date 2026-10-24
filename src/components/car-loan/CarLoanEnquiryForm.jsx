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
  Car,
  Sparkles,
  Info,
  Tag
} from 'lucide-react';
import { formatINR } from '../../utils/carLoanCalculator';

export const POPULAR_CAR_BRANDS = [
  'Maruti Suzuki',
  'Hyundai',
  'Tata Motors',
  'Mahindra',
  'Toyota',
  'Honda',
  'Kia',
  'Volkswagen',
  'Skoda',
  'MG Motor',
  'Renault',
  'Nissan',
  'Other Brand'
];

export default function CarLoanEnquiryForm({ initialValues, updatedFromCalculatorTimestamp }) {
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    employmentType: 'Salaried',
    monthlyIncome: '',
    carType: initialValues?.carType || 'New Car',
    carBrand: 'Maruti Suzuki',
    carModel: '',
    onRoadPrice: '',
    downPayment: '',
    loanAmount: initialValues?.loanAmount ? String(initialValues.loanAmount) : '1000000',
    loanTenure: initialValues?.tenureYears ? String(initialValues.tenureYears) : '5',
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
        carType: initialValues.carType || prev.carType,
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
          return 'Minimum indicative monthly income for vehicle finance is ₹10,000.';
        }
        return null;
      }

      case 'carType': {
        if (!['New Car', 'Pre-Owned Car'].includes(value)) {
          return 'Please select a car type (New Car or Pre-Owned Car).';
        }
        return null;
      }

      case 'carBrand': {
        const trimmed = (value || '').trim();
        if (!trimmed) return 'Car brand is required.';
        return null;
      }

      case 'carModel': {
        const trimmed = (value || '').trim();
        if (!trimmed) return 'Car model name is required.';
        if (trimmed.length < 2) return 'Model name must be at least 2 characters.';
        return null;
      }

      case 'onRoadPrice': {
        const num = Number(String(value).replace(/[^0-9]/g, ''));
        if (!value || isNaN(num) || num <= 0) {
          return 'Please enter the estimated on-road price in ₹.';
        }
        return null;
      }

      case 'downPayment': {
        const num = Number(String(value).replace(/[^0-9]/g, ''));
        const priceNum = Number(String(formData.onRoadPrice).replace(/[^0-9]/g, ''));
        if (value && !isNaN(num)) {
          if (num < 0) return 'Down payment cannot be negative.';
          if (priceNum > 0 && num > priceNum) {
            return 'Down payment cannot exceed the on-road car price.';
          }
        }
        return null;
      }

      case 'loanAmount': {
        const num = Number(String(value).replace(/[^0-9]/g, ''));
        if (!value || isNaN(num) || num <= 0) {
          return 'Please enter a valid loan amount in ₹.';
        }
        if (num < 100000) {
          return 'Minimum car loan amount is ₹1,00,000.';
        }
        if (num > 5000000) {
          return 'Maximum car loan amount is ₹50,00,000.';
        }
        return null;
      }

      case 'loanTenure': {
        const num = Number(value);
        if (!value || isNaN(num) || num < 1 || num > 8) {
          return 'Please select a tenure between 1 and 8 years.';
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
      carType: 'New Car',
      carBrand: 'Maruti Suzuki',
      carModel: '',
      onRoadPrice: '',
      downPayment: '',
      loanAmount: '1000000',
      loanTenure: '5',
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
      'carType',
      'carBrand',
      'carModel',
      'onRoadPrice',
      'downPayment',
      'loanAmount',
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
      const el = document.getElementById(`cl-field-${firstErr}`);
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
       *     service: 'Car Loan',
       *     fullName: formData.fullName,
       *     mobileNumber: formData.mobileNumber,
       *     email: formData.email,
       *     employmentType: formData.employmentType,
       *     monthlyIncome: Number(formData.monthlyIncome),
       *     carType: formData.carType,
       *     carBrand: formData.carBrand,
       *     carModel: formData.carModel,
       *     onRoadPrice: Number(formData.onRoadPrice),
       *     downPayment: Number(formData.downPayment || 0),
       *     loanAmount: Number(formData.loanAmount),
       *     tenureYears: Number(formData.loanTenure),
       *     city: formData.city,
       *     preferredContact: formData.preferredContact,
       *     message: formData.message,
       *     source: 'Car Loan Dedicated Page',
       *     timestamp: new Date().toISOString()
       *   })
       * });
       * const data = await response.json();
       * =========================================================================
       */

      await new Promise(resolve => setTimeout(resolve, 800));

      setSubmittedData({
        fullName: formData.fullName,
        mobileNumber: formData.mobileNumber,
        email: formData.email,
        employmentType: formData.employmentType,
        monthlyIncome: formData.monthlyIncome,
        carType: formData.carType,
        carBrand: formData.carBrand,
        carModel: formData.carModel,
        onRoadPrice: formData.onRoadPrice,
        downPayment: formData.downPayment || '0',
        loanAmount: formData.loanAmount,
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
      id="car-loan-enquiry-form"
      className="section section-alt hl-enquiry-section cl-enquiry-section"
      aria-label="Car Loan Enquiry Form"
    >
      <div className="container container-narrow">
        <div className="section-header">
          <div className="section-tag section-tag-gold">
            <Send size={14} />
            <span>Vehicle Advisory</span>
          </div>
          <h2 className="section-title">
            Enquire About a <span className="highlight-text">Car Loan</span>
          </h2>
          <p className="section-desc">
            Tell us about your vehicle purchase and financing requirements to discuss available options with Shrikha Finserv.
          </p>
        </div>

        {/* Prefill Notification Banner */}
        {showPrefillNotification && (
          <div className="prefill-notification-banner" role="status">
            <Sparkles size={18} className="banner-icon" />
            <div>
              <strong>Calculator Values Transferred:</strong> Vehicle category ({formData.carType}), loan amount (₹{Number(formData.loanAmount).toLocaleString('en-IN')}), and tenure ({formData.loanTenure} years) have been pre-filled below. You can adjust them anytime.
            </div>
          </div>
        )}

        {/* Success Confirmation View */}
        {submittedData ? (
          <div className="enquiry-success-card" role="region" aria-label="Car Loan Enquiry Confirmation">
            <div className="success-icon-wrapper">
              <CheckCircle2 size={48} className="success-icon" />
            </div>
            <h3 className="success-title">Car Loan Enquiry Validated Successfully!</h3>
            <p className="success-subtitle">
              Thank you, <strong>{submittedData.fullName}</strong>. Your car financing enquiry details have passed all frontend checks.
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
                <span className="summary-lbl">Vehicle Category:</span>
                <span className="summary-val">{submittedData.carType}</span>
              </div>
              <div className="summary-item">
                <span className="summary-lbl">Car Brand & Model:</span>
                <span className="summary-val">{submittedData.carBrand} {submittedData.carModel}</span>
              </div>
              <div className="summary-item">
                <span className="summary-lbl">On-Road Price:</span>
                <span className="summary-val">{formatINR(submittedData.onRoadPrice)}</span>
              </div>
              <div className="summary-item">
                <span className="summary-lbl">Down Payment:</span>
                <span className="summary-val">{formatINR(submittedData.downPayment)}</span>
              </div>
              <div className="summary-item">
                <span className="summary-lbl">Loan Amount Required:</span>
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
                  This form submission has been verified in the browser. In accordance with current demonstration constraints, your personal details have <strong>not been transmitted to a lender or CRM</strong>, and no representative notification has been initiated.
                </p>
                <p>
                  To speak directly with a Shrikha Finserv advisor regarding auto loans in Mysore or Karnataka, please call <a href="tel:8792953082" className="phone-inline-link">8792953082</a> or email <a href="mailto:shrikhafinserv@gmail.com" className="phone-inline-link">shrikhafinserv@gmail.com</a>.
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
            aria-label="Car Loan Enquiry Submission Form"
          >
            <div className="form-grid-2col">
              {/* 1. Full Name */}
              <div className="form-group" id="cl-field-fullName">
                <label htmlFor="cl-fullName" className="form-label">
                  <span>Full Name <span className="required-mark">*</span></span>
                  {touched.fullName && !errors.fullName && (
                    <span className="valid-label-badge"><CheckCircle2 size={12} /> Valid</span>
                  )}
                </label>
                <div className="input-with-icon">
                  <User size={18} className="input-icon" />
                  <input
                    id="cl-fullName"
                    name="fullName"
                    type="text"
                    className={`form-input ${touched.fullName && errors.fullName ? 'has-error' : ''}`}
                    placeholder="e.g. Ramesh Chandra"
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
              <div className="form-group" id="cl-field-mobileNumber">
                <label htmlFor="cl-mobileNumber" className="form-label">
                  <span>Mobile Number <span className="required-mark">*</span></span>
                  {touched.mobileNumber && !errors.mobileNumber && (
                    <span className="valid-label-badge"><CheckCircle2 size={12} /> Valid</span>
                  )}
                </label>
                <div className="input-with-icon">
                  <Phone size={18} className="input-icon" />
                  <input
                    id="cl-mobileNumber"
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
              <div className="form-group" id="cl-field-email">
                <label htmlFor="cl-email" className="form-label">
                  <span>Email Address <span className="required-mark">*</span></span>
                  {touched.email && !errors.email && (
                    <span className="valid-label-badge"><CheckCircle2 size={12} /> Valid</span>
                  )}
                </label>
                <div className="input-with-icon">
                  <Mail size={18} className="input-icon" />
                  <input
                    id="cl-email"
                    name="email"
                    type="email"
                    className={`form-input ${touched.email && errors.email ? 'has-error' : ''}`}
                    placeholder="e.g. ramesh@example.com"
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
              <div className="form-group" id="cl-field-employmentType">
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
                    <span>Self-employed</span>
                  </label>
                </div>
              </div>

              {/* 5. Monthly Income */}
              <div className="form-group" id="cl-field-monthlyIncome">
                <label htmlFor="cl-monthlyIncome" className="form-label">
                  <span>Monthly In-Hand Income (₹) <span className="required-mark">*</span></span>
                  {touched.monthlyIncome && !errors.monthlyIncome && (
                    <span className="valid-label-badge"><CheckCircle2 size={12} /> Valid</span>
                  )}
                </label>
                <div className="input-with-icon">
                  <IndianRupee size={18} className="input-icon" />
                  <input
                    id="cl-monthlyIncome"
                    name="monthlyIncome"
                    type="number"
                    min="1000"
                    step="5000"
                    className={`form-input ${touched.monthlyIncome && errors.monthlyIncome ? 'has-error' : ''}`}
                    placeholder="e.g. 60000"
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

              {/* 6. Car Type Selection */}
              <div className="form-group" id="cl-field-carType">
                <label className="form-label">
                  <span>Vehicle Category <span className="required-mark">*</span></span>
                </label>
                <div className="radio-pill-group" role="radiogroup" aria-label="Vehicle Category">
                  <label className={`radio-pill-item ${formData.carType === 'New Car' ? 'is-selected' : ''}`}>
                    <input
                      type="radio"
                      name="carType"
                      value="New Car"
                      checked={formData.carType === 'New Car'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <Sparkles size={16} />
                    <span>New Car</span>
                  </label>
                  <label className={`radio-pill-item ${formData.carType === 'Pre-Owned Car' ? 'is-selected' : ''}`}>
                    <input
                      type="radio"
                      name="carType"
                      value="Pre-Owned Car"
                      checked={formData.carType === 'Pre-Owned Car'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <Car size={16} />
                    <span>Pre-Owned Car</span>
                  </label>
                </div>
              </div>

              {/* 7. Car Brand */}
              <div className="form-group" id="cl-field-carBrand">
                <label htmlFor="cl-carBrand" className="form-label">
                  <span>Car Brand <span className="required-mark">*</span></span>
                </label>
                <div className="input-with-icon">
                  <Tag size={18} className="input-icon" />
                  <select
                    id="cl-carBrand"
                    name="carBrand"
                    className="form-select"
                    value={formData.carBrand}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-required="true"
                  >
                    {POPULAR_CAR_BRANDS.map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 8. Car Model */}
              <div className="form-group" id="cl-field-carModel">
                <label htmlFor="cl-carModel" className="form-label">
                  <span>Car Model / Variant <span className="required-mark">*</span></span>
                  {touched.carModel && !errors.carModel && (
                    <span className="valid-label-badge"><CheckCircle2 size={12} /> Valid</span>
                  )}
                </label>
                <div className="input-with-icon">
                  <Car size={18} className="input-icon" />
                  <input
                    id="cl-carModel"
                    name="carModel"
                    type="text"
                    className={`form-input ${touched.carModel && errors.carModel ? 'has-error' : ''}`}
                    placeholder="e.g. Swift ZXi / Creta SX / Nexon EV"
                    value={formData.carModel}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-required="true"
                    aria-invalid={!!(touched.carModel && errors.carModel)}
                  />
                </div>
                {touched.carModel && errors.carModel && (
                  <p className="form-error-msg" role="alert">
                    <AlertCircle size={14} /> <span>{errors.carModel}</span>
                  </p>
                )}
              </div>

              {/* 9. Estimated On-Road Price */}
              <div className="form-group" id="cl-field-onRoadPrice">
                <label htmlFor="cl-onRoadPrice" className="form-label">
                  <span>Estimated On-Road Price (₹) <span className="required-mark">*</span></span>
                  {touched.onRoadPrice && !errors.onRoadPrice && (
                    <span className="valid-label-badge"><CheckCircle2 size={12} /> Valid</span>
                  )}
                </label>
                <div className="input-with-icon">
                  <IndianRupee size={18} className="input-icon" />
                  <input
                    id="cl-onRoadPrice"
                    name="onRoadPrice"
                    type="number"
                    min="100000"
                    step="25000"
                    className={`form-input ${touched.onRoadPrice && errors.onRoadPrice ? 'has-error' : ''}`}
                    placeholder="e.g. 1250000"
                    value={formData.onRoadPrice}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-required="true"
                    aria-invalid={!!(touched.onRoadPrice && errors.onRoadPrice)}
                  />
                </div>
                {touched.onRoadPrice && errors.onRoadPrice && (
                  <p className="form-error-msg" role="alert">
                    <AlertCircle size={14} /> <span>{errors.onRoadPrice}</span>
                  </p>
                )}
              </div>

              {/* 10. Down Payment */}
              <div className="form-group" id="cl-field-downPayment">
                <label htmlFor="cl-downPayment" className="form-label">
                  <span>Down Payment (₹)</span>
                  <span className="optional-mark">(Self Contribution)</span>
                </label>
                <div className="input-with-icon">
                  <IndianRupee size={18} className="input-icon" />
                  <input
                    id="cl-downPayment"
                    name="downPayment"
                    type="number"
                    min="0"
                    step="25000"
                    className={`form-input ${touched.downPayment && errors.downPayment ? 'has-error' : ''}`}
                    placeholder="e.g. 250000"
                    value={formData.downPayment}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!(touched.downPayment && errors.downPayment)}
                  />
                </div>
                {touched.downPayment && errors.downPayment && (
                  <p className="form-error-msg" role="alert">
                    <AlertCircle size={14} /> <span>{errors.downPayment}</span>
                  </p>
                )}
              </div>

              {/* 11. Loan Amount Required */}
              <div className="form-group" id="cl-field-loanAmount">
                <label htmlFor="cl-loanAmount" className="form-label">
                  <span>Loan Amount Required (₹) <span className="required-mark">*</span></span>
                  {touched.loanAmount && !errors.loanAmount && (
                    <span className="valid-label-badge"><CheckCircle2 size={12} /> Valid</span>
                  )}
                </label>
                <div className="input-with-icon">
                  <IndianRupee size={18} className="input-icon" />
                  <input
                    id="cl-loanAmount"
                    name="loanAmount"
                    type="number"
                    min="100000"
                    max="5000000"
                    step="25000"
                    className={`form-input ${touched.loanAmount && errors.loanAmount ? 'has-error' : ''}`}
                    placeholder="e.g. 1000000"
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

              {/* 12. Preferred Loan Tenure */}
              <div className="form-group" id="cl-field-loanTenure">
                <label htmlFor="cl-loanTenure" className="form-label">
                  <span>Preferred Loan Tenure <span className="required-mark">*</span></span>
                </label>
                <div className="input-with-icon">
                  <Clock size={18} className="input-icon" />
                  <select
                    id="cl-loanTenure"
                    name="loanTenure"
                    className="form-select"
                    value={formData.loanTenure}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-required="true"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(yr => (
                      <option key={yr} value={String(yr)}>
                        {yr} {yr === 1 ? 'Year' : 'Years'} ({yr * 12} Months)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 13. City */}
              <div className="form-group" id="cl-field-city">
                <label htmlFor="cl-city" className="form-label">
                  <span>City / Town in Karnataka <span className="required-mark">*</span></span>
                  {touched.city && !errors.city && (
                    <span className="valid-label-badge"><CheckCircle2 size={12} /> Valid</span>
                  )}
                </label>
                <div className="input-with-icon">
                  <MapPin size={18} className="input-icon" />
                  <input
                    id="cl-city"
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

              {/* 14. Preferred Contact Method */}
              <div className="form-group" id="cl-field-preferredContact">
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

              {/* 15. Optional Message */}
              <div className="form-group form-group-span-2" id="cl-field-message">
                <label htmlFor="cl-message" className="form-label">
                  <span>Specific Requirements / Dealership Details</span>
                  <span className="optional-mark">(Optional)</span>
                </label>
                <div className="input-with-icon">
                  <MessageSquare size={18} className="input-icon textarea-icon" />
                  <textarea
                    id="cl-message"
                    name="message"
                    rows={3}
                    className="form-textarea"
                    placeholder="Dealership quotation status, delivery timeline, or existing car exchange plans you wish to mention..."
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
                Your privacy is paramount. Shrikha Finserv strictly protects applicant data and never shares personal contact details with unauthorized third-party dealerships or marketing portals.
              </span>
            </div>

            {/* Actions */}
            <div className="form-actions-row">
              <button
                type="submit"
                className="btn btn-primary btn-lg submit-enquiry-btn"
                disabled={isSubmitting}
                id="btn-submit-car-loan-enquiry"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="spinner" />
                    <span>Validating Enquiry...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Car Loan Enquiry</span>
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
