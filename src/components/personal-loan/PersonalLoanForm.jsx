import React, { useState } from 'react';
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
  Calendar,
  Building,
  CreditCard,
  Car,
  ChevronDown,
  Info
} from 'lucide-react';
import {
  OCCUPATION_TYPES,
  COMPANY_STRUCTURES,
  INCOME_MODES,
  PRIMARY_BANKS,
  CAR_OWNERSHIP_OPTIONS,
  CIBIL_SCORE_OPTIONS,
  GENDER_OPTIONS,
  TENURE_MONTHS_OPTIONS,
  formatINR
} from '../../utils/personalLoanCalculator';
import { validatePersonalLoanField } from '../../utils/personalLoanValidation';

export default function PersonalLoanForm({
  loanAmount,
  onLoanAmountChange,
  tenureMonths,
  onTenureChange,
  onResetAll
}) {
  const [formData, setFormData] = useState({
    occupationType: '',
    companyName: '',
    companyStructure: '',
    incomeMode: '',
    primaryBank: '',
    monthlyIncome: '',
    ownsCar: '',
    cibilScore: '',
    city: '',
    fullName: '',
    email: '',
    mobileNumber: '',
    dob: '',
    gender: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  // Field change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const err = validatePersonalLoanField(name, value);
      setErrors(prev => ({ ...prev, [name]: err }));
    }
  };

  // Blur handler
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const err = validatePersonalLoanField(name, value);
    setErrors(prev => ({ ...prev, [name]: err }));
  };

  // Synchronized Loan Amount handler in Form
  const handleFormAmountChange = (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    if (raw !== '') {
      const num = Number(raw);
      onLoanAmountChange(num);
    } else {
      onLoanAmountChange(0);
    }

    if (touched.loanAmount) {
      const err = validatePersonalLoanField('loanAmount', raw);
      setErrors(prev => ({ ...prev, loanAmount: err }));
    }
  };

  const handleFormAmountBlur = () => {
    setTouched(prev => ({ ...prev, loanAmount: true }));
    const err = validatePersonalLoanField('loanAmount', loanAmount);
    setErrors(prev => ({ ...prev, loanAmount: err }));
  };

  // Synchronized Tenure handler in Form
  const handleFormTenureChange = (e) => {
    const months = Number(e.target.value);
    onTenureChange(months);

    if (touched.loanTenure) {
      const err = validatePersonalLoanField('loanTenure', months);
      setErrors(prev => ({ ...prev, loanTenure: err }));
    }
  };

  // Reset form and shared calculator values
  const handleReset = () => {
    setFormData({
      occupationType: '',
      companyName: '',
      companyStructure: '',
      incomeMode: '',
      primaryBank: '',
      monthlyIncome: '',
      ownsCar: '',
      cibilScore: '',
      city: '',
      fullName: '',
      email: '',
      mobileNumber: '',
      dob: '',
      gender: ''
    });
    setErrors({});
    setTouched({});
    setSubmittedData(null);
    if (onResetAll) {
      onResetAll();
    }
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fieldsToValidate = {
      occupationType: formData.occupationType,
      companyName: formData.companyName,
      companyStructure: formData.companyStructure,
      incomeMode: formData.incomeMode,
      primaryBank: formData.primaryBank,
      loanAmount: loanAmount,
      monthlyIncome: formData.monthlyIncome,
      ownsCar: formData.ownsCar,
      cibilScore: formData.cibilScore,
      city: formData.city,
      fullName: formData.fullName,
      email: formData.email,
      mobileNumber: formData.mobileNumber,
      dob: formData.dob,
      gender: formData.gender,
      loanTenure: tenureMonths
    };

    const newErrors = {};
    Object.keys(fieldsToValidate).forEach(key => {
      const err = validatePersonalLoanField(key, fieldsToValidate[key]);
      if (err) newErrors[key] = err;
    });

    const allTouched = {};
    Object.keys(fieldsToValidate).forEach(key => {
      allTouched[key] = true;
    });

    setTouched(allTouched);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstField = Object.keys(newErrors)[0];
      const el = document.getElementById(`ple-field-${firstField}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate quick frontend validation
      await new Promise(resolve => setTimeout(resolve, 600));

      setSubmittedData({
        occupationType: formData.occupationType,
        companyName: formData.companyName,
        companyStructure: formData.companyStructure,
        incomeMode: formData.incomeMode,
        primaryBank: formData.primaryBank,
        loanAmount: loanAmount,
        monthlyIncome: formData.monthlyIncome,
        ownsCar: formData.ownsCar,
        cibilScore: formData.cibilScore,
        city: formData.city,
        fullName: formData.fullName,
        email: formData.email,
        mobileNumber: formData.mobileNumber,
        dob: formData.dob,
        gender: formData.gender,
        loanTenure: tenureMonths
      });
    } catch (err) {
      console.error('Submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="enquiry-form-card pl-enquiry-form-card" id="personal-loan-enquiry-form">
      {submittedData ? (
        /* Local Validation Success Confirmation View */
        <div className="enquiry-success-view" role="region" aria-label="Personal Loan Application Confirmation">
          <div className="success-icon-wrapper">
            <CheckCircle2 size={44} className="success-icon" />
          </div>
          <h3 className="success-title">Your Loan Application Has Been Validated!</h3>
          <p className="success-subtitle">
            Thank you, <strong>{submittedData.fullName}</strong>. All required fields from your loan application have passed validation checks.
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
              <span className="summary-lbl">Date of Birth:</span>
              <span className="summary-val">{submittedData.dob}</span>
            </div>
            <div className="summary-item">
              <span className="summary-lbl">Gender:</span>
              <span className="summary-val">{submittedData.gender}</span>
            </div>
            <div className="summary-item">
              <span className="summary-lbl">City of Residence:</span>
              <span className="summary-val">{submittedData.city}</span>
            </div>
            <div className="summary-item">
              <span className="summary-lbl">Occupation Type:</span>
              <span className="summary-val">{submittedData.occupationType}</span>
            </div>
            <div className="summary-item">
              <span className="summary-lbl">Company / Business:</span>
              <span className="summary-val">{submittedData.companyName}</span>
            </div>
            <div className="summary-item">
              <span className="summary-lbl">Company Structure:</span>
              <span className="summary-val">{submittedData.companyStructure}</span>
            </div>
            <div className="summary-item">
              <span className="summary-lbl">Salary / Income Mode:</span>
              <span className="summary-val">{submittedData.incomeMode}</span>
            </div>
            <div className="summary-item">
              <span className="summary-lbl">Primary Salary Bank:</span>
              <span className="summary-val">{submittedData.primaryBank}</span>
            </div>
            <div className="summary-item">
              <span className="summary-lbl">Monthly Net Income:</span>
              <span className="summary-val">{formatINR(submittedData.monthlyIncome)}</span>
            </div>
            <div className="summary-item">
              <span className="summary-lbl">Owns Four-Wheeler:</span>
              <span className="summary-val">{submittedData.ownsCar}</span>
            </div>
            <div className="summary-item">
              <span className="summary-lbl">Estimated CIBIL Score:</span>
              <span className="summary-val">{submittedData.cibilScore}</span>
            </div>
            <div className="summary-item">
              <span className="summary-lbl">Required Loan Amount:</span>
              <span className="summary-val highlight-gold">{formatINR(submittedData.loanAmount)}</span>
            </div>
            <div className="summary-item">
              <span className="summary-lbl">Preferred Loan Tenure:</span>
              <span className="summary-val">{submittedData.loanTenure} Months ({(submittedData.loanTenure / 12).toFixed(1)} Yrs)</span>
            </div>
          </div>

          <div className="demo-notice-box">
            <Info size={18} className="notice-icon" />
            <div className="notice-content">
              <strong>Local Demonstration Notice</strong>
              <p>
                Your application details have been validated locally in your browser. As per current project mode, no data was transmitted to external servers, banks, or CRM systems.
              </p>
              <p>
                To speak directly with a certified loan advisor at Shrikha Finserv in Mysore, call <a href="tel:8792953082" className="phone-inline-link">8792953082</a>.
              </p>
            </div>
          </div>

          <div className="success-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleReset}
            >
              <RotateCcw size={16} />
              <span>Reset & Edit Application</span>
            </button>
          </div>
        </div>
      ) : (
        /* Form View */
        <div>
          <div className="form-card-header">
            <div className="form-header-badge">
              <User size={18} />
            </div>
            <div>
              <h3 className="form-card-title">Personal Loan Application</h3>
              <p className="form-card-subtitle">
                Fill in your employment, financial, and personal details below. Required loan amount and tenure sync in real time with the EMI calculator.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-fields-grid app-fields-grid">
              {/* Row 1, Col 1: Occupation Type */}
              <div className="form-group" id="ple-field-occupationType">
                <label htmlFor="ple-select-occupationType" className="form-label">
                  <span className="form-label-title">
                    <span>Occupation Type</span>
                    <span className="required-star">*</span>
                  </span>
                </label>
                <div className="custom-select-wrapper">
                  <select
                    id="ple-select-occupationType"
                    name="occupationType"
                    className={`form-control select-control ${touched.occupationType && errors.occupationType ? 'has-error' : ''}`}
                    value={formData.occupationType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="" disabled>Select Occupation</option>
                    {OCCUPATION_TYPES.map(occ => (
                      <option key={occ} value={occ}>{occ}</option>
                    ))}
                  </select>
                </div>
                {touched.occupationType && errors.occupationType && (
                  <p className="form-error-msg" role="alert">
                    <AlertCircle size={14} /> <span>{errors.occupationType}</span>
                  </p>
                )}
              </div>

              {/* Row 1, Col 2: Company / Business Name */}
              <div className="form-group" id="ple-field-companyName">
                <label htmlFor="ple-input-companyName" className="form-label">
                  <span className="form-label-title">
                    <span>Company / Business Name</span>
                    <span className="required-star">*</span>
                  </span>
                </label>
                <div className={`input-icon-wrapper ${touched.companyName && errors.companyName ? 'has-error' : ''}`}>
                  <Building size={16} className="field-icon" />
                  <input
                    id="ple-input-companyName"
                    name="companyName"
                    type="text"
                    className="form-control"
                    value={formData.companyName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="e.g. Acme Tech Pvt Ltd"
                  />
                </div>
                {touched.companyName && errors.companyName && (
                  <p className="form-error-msg" role="alert">
                    <AlertCircle size={14} /> <span>{errors.companyName}</span>
                  </p>
                )}
              </div>

              {/* Row 2, Col 1: Company Structure */}
              <div className="form-group" id="ple-field-companyStructure">
                <label htmlFor="ple-select-companyStructure" className="form-label">
                  <span className="form-label-title">
                    <span>Company Structure</span>
                    <span className="required-star">*</span>
                  </span>
                </label>
                <div className="custom-select-wrapper">
                  <select
                    id="ple-select-companyStructure"
                    name="companyStructure"
                    className={`form-control select-control ${touched.companyStructure && errors.companyStructure ? 'has-error' : ''}`}
                    value={formData.companyStructure}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="" disabled>Select Company Type</option>
                    {COMPANY_STRUCTURES.map(item => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                </div>
                {touched.companyStructure && errors.companyStructure && (
                  <p className="form-error-msg" role="alert">
                    <AlertCircle size={14} /> <span>{errors.companyStructure}</span>
                  </p>
                )}
              </div>

              {/* Row 2, Col 2: Salary / Income Mode */}
              <div className="form-group" id="ple-field-incomeMode">
                <label htmlFor="ple-select-incomeMode" className="form-label">
                  <span className="form-label-title">
                    <span>Salary / Income Mode</span>
                    <span className="required-star">*</span>
                  </span>
                </label>
                <div className="custom-select-wrapper">
                  <select
                    id="ple-select-incomeMode"
                    name="incomeMode"
                    className={`form-control select-control ${touched.incomeMode && errors.incomeMode ? 'has-error' : ''}`}
                    value={formData.incomeMode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="" disabled>Select Income Mode</option>
                    {INCOME_MODES.map(mode => (
                      <option key={mode} value={mode}>{mode}</option>
                    ))}
                  </select>
                </div>
                {touched.incomeMode && errors.incomeMode && (
                  <p className="form-error-msg" role="alert">
                    <AlertCircle size={14} /> <span>{errors.incomeMode}</span>
                  </p>
                )}
              </div>

              {/* Row 3, Col 1: Primary Salary / Bank Account */}
              <div className="form-group" id="ple-field-primaryBank">
                <label htmlFor="ple-select-primaryBank" className="form-label">
                  <span className="form-label-title">
                    <span>Primary Salary / Bank Account</span>
                    <span className="required-star">*</span>
                  </span>
                </label>
                <div className="custom-select-wrapper">
                  <select
                    id="ple-select-primaryBank"
                    name="primaryBank"
                    className={`form-control select-control ${touched.primaryBank && errors.primaryBank ? 'has-error' : ''}`}
                    value={formData.primaryBank}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="" disabled>Select Primary Bank</option>
                    {PRIMARY_BANKS.map(bank => (
                      <option key={bank} value={bank}>{bank}</option>
                    ))}
                  </select>
                </div>
                {touched.primaryBank && errors.primaryBank && (
                  <p className="form-error-msg" role="alert">
                    <AlertCircle size={14} /> <span>{errors.primaryBank}</span>
                  </p>
                )}
              </div>

              {/* Row 3, Col 2: Required Loan Amount (₹) */}
              <div className="form-group" id="ple-field-loanAmount">
                <label htmlFor="ple-input-loanAmount" className="form-label">
                  <span className="form-label-title">
                    <span>Required Loan Amount (₹)</span>
                    <span className="required-star">*</span>
                  </span>
                  <span className="sync-badge">Syncs with Calculator</span>
                </label>
                <div className={`input-icon-wrapper ${touched.loanAmount && errors.loanAmount ? 'has-error' : ''}`}>
                  <IndianRupee size={16} className="field-icon" />
                  <input
                    id="ple-input-loanAmount"
                    name="loanAmount"
                    type="text"
                    inputMode="numeric"
                    className="form-control"
                    value={loanAmount ? Number(loanAmount).toLocaleString('en-IN') : ''}
                    onChange={handleFormAmountChange}
                    onBlur={handleFormAmountBlur}
                    placeholder="e.g. 5,00,000"
                  />
                </div>
                {touched.loanAmount && errors.loanAmount && (
                  <p className="form-error-msg" role="alert">
                    <AlertCircle size={14} /> <span>{errors.loanAmount}</span>
                  </p>
                )}
              </div>

              {/* Row 4, Col 1: Monthly Net Income / Turnover (₹) */}
              <div className="form-group" id="ple-field-monthlyIncome">
                <label htmlFor="ple-input-monthlyIncome" className="form-label">
                  <span className="form-label-title">
                    <span>Monthly Net Income / Turnover (₹)</span>
                    <span className="required-star">*</span>
                  </span>
                </label>
                <div className={`input-icon-wrapper ${touched.monthlyIncome && errors.monthlyIncome ? 'has-error' : ''}`}>
                  <IndianRupee size={16} className="field-icon" />
                  <input
                    id="ple-input-monthlyIncome"
                    name="monthlyIncome"
                    type="text"
                    inputMode="numeric"
                    className="form-control"
                    value={formData.monthlyIncome ? Number(formData.monthlyIncome.replace(/[^0-9]/g, '')).toLocaleString('en-IN') : ''}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^0-9]/g, '');
                      setFormData(prev => ({ ...prev, monthlyIncome: raw }));
                      if (touched.monthlyIncome) {
                        const err = validatePersonalLoanField('monthlyIncome', raw);
                        setErrors(prev => ({ ...prev, monthlyIncome: err }));
                      }
                    }}
                    onBlur={handleBlur}
                    placeholder="e.g. 65,000"
                  />
                </div>
                {touched.monthlyIncome && errors.monthlyIncome && (
                  <p className="form-error-msg" role="alert">
                    <AlertCircle size={14} /> <span>{errors.monthlyIncome}</span>
                  </p>
                )}
              </div>

              {/* Row 4, Col 2: Do You Own A Four-Wheeler (Car)? */}
              <div className="form-group" id="ple-field-ownsCar">
                <label htmlFor="ple-select-ownsCar" className="form-label">
                  <span className="form-label-title">
                    <span>Do You Own A Four-Wheeler (Car)?</span>
                    <span className="required-star">*</span>
                  </span>
                </label>
                <div className="custom-select-wrapper">
                  <select
                    id="ple-select-ownsCar"
                    name="ownsCar"
                    className={`form-control select-control ${touched.ownsCar && errors.ownsCar ? 'has-error' : ''}`}
                    value={formData.ownsCar}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="" disabled>Select Option</option>
                    {CAR_OWNERSHIP_OPTIONS.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                {touched.ownsCar && errors.ownsCar && (
                  <p className="form-error-msg" role="alert">
                    <AlertCircle size={14} /> <span>{errors.ownsCar}</span>
                  </p>
                )}
              </div>

              {/* Row 5, Col 1: Estimated CIBIL / Credit Score */}
              <div className="form-group" id="ple-field-cibilScore">
                <label htmlFor="ple-select-cibilScore" className="form-label">
                  <span className="form-label-title">
                    <span>Estimated CIBIL / Credit Score</span>
                    <span className="required-star">*</span>
                  </span>
                </label>
                <div className="custom-select-wrapper">
                  <select
                    id="ple-select-cibilScore"
                    name="cibilScore"
                    className={`form-control select-control ${touched.cibilScore && errors.cibilScore ? 'has-error' : ''}`}
                    value={formData.cibilScore}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="" disabled>Select Estimated Score</option>
                    {CIBIL_SCORE_OPTIONS.map(score => (
                      <option key={score} value={score}>{score}</option>
                    ))}
                  </select>
                </div>
                {touched.cibilScore && errors.cibilScore && (
                  <p className="form-error-msg" role="alert">
                    <AlertCircle size={14} /> <span>{errors.cibilScore}</span>
                  </p>
                )}
              </div>

              {/* Row 5, Col 2: City of Residence */}
              <div className="form-group" id="ple-field-city">
                <label htmlFor="ple-input-city" className="form-label">
                  <span className="form-label-title">
                    <span>City of Residence</span>
                    <span className="required-star">*</span>
                  </span>
                </label>
                <div className={`input-icon-wrapper ${touched.city && errors.city ? 'has-error' : ''}`}>
                  <MapPin size={16} className="field-icon" />
                  <input
                    id="ple-input-city"
                    name="city"
                    type="text"
                    className="form-control"
                    value={formData.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="e.g. Delhi, Noida, Gurgaon"
                  />
                </div>
                {touched.city && errors.city && (
                  <p className="form-error-msg" role="alert">
                    <AlertCircle size={14} /> <span>{errors.city}</span>
                  </p>
                )}
              </div>

              {/* Row 6, Col 1: Full Name (As Per PAN Card) */}
              <div className="form-group" id="ple-field-fullName">
                <label htmlFor="ple-input-fullName" className="form-label">
                  <span className="form-label-title">
                    <span>Full Name (As Per PAN Card)</span>
                    <span className="required-star">*</span>
                  </span>
                </label>
                <div className={`input-icon-wrapper ${touched.fullName && errors.fullName ? 'has-error' : ''}`}>
                  <User size={16} className="field-icon" />
                  <input
                    id="ple-input-fullName"
                    name="fullName"
                    type="text"
                    className="form-control"
                    value={formData.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="e.g. Rahul Sharma"
                    autoComplete="name"
                  />
                </div>
                {touched.fullName && errors.fullName && (
                  <p className="form-error-msg" role="alert">
                    <AlertCircle size={14} /> <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              {/* Row 6, Col 2: Email Address */}
              <div className="form-group" id="ple-field-email">
                <label htmlFor="ple-input-email" className="form-label">
                  <span className="form-label-title">
                    <span>Email Address</span>
                    <span className="required-star">*</span>
                  </span>
                </label>
                <div className={`input-icon-wrapper ${touched.email && errors.email ? 'has-error' : ''}`}>
                  <Mail size={16} className="field-icon" />
                  <input
                    id="ple-input-email"
                    name="email"
                    type="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="e.g. rahul@example.com"
                    autoComplete="email"
                  />
                </div>
                {touched.email && errors.email && (
                  <p className="form-error-msg" role="alert">
                    <AlertCircle size={14} /> <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* Row 7, Col 1: Mobile Number (10 Digits) */}
              <div className="form-group" id="ple-field-mobileNumber">
                <label htmlFor="ple-input-mobileNumber" className="form-label">
                  <span className="form-label-title">
                    <span>Mobile Number (10 Digits)</span>
                    <span className="required-star">*</span>
                  </span>
                </label>
                <div className={`input-icon-wrapper ${touched.mobileNumber && errors.mobileNumber ? 'has-error' : ''}`}>
                  <Phone size={16} className="field-icon" />
                  <input
                    id="ple-input-mobileNumber"
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

              {/* Row 7, Col 2: Date of Birth */}
              <div className="form-group" id="ple-field-dob">
                <label htmlFor="ple-input-dob" className="form-label">
                  <span className="form-label-title">
                    <span>Date of Birth</span>
                    <span className="required-star">*</span>
                  </span>
                </label>
                <div className={`input-icon-wrapper ${touched.dob && errors.dob ? 'has-error' : ''}`}>
                  <Calendar size={16} className="field-icon" />
                  <input
                    id="ple-input-dob"
                    name="dob"
                    type="date"
                    className="form-control date-input"
                    value={formData.dob}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="dd-mm-yyyy"
                  />
                </div>
                {touched.dob && errors.dob && (
                  <p className="form-error-msg" role="alert">
                    <AlertCircle size={14} /> <span>{errors.dob}</span>
                  </p>
                )}
              </div>

              {/* Row 8, Col 1: Gender */}
              <div className="form-group" id="ple-field-gender">
                <label htmlFor="ple-select-gender" className="form-label">
                  <span className="form-label-title">
                    <span>Gender</span>
                    <span className="required-star">*</span>
                  </span>
                </label>
                <div className="custom-select-wrapper">
                  <select
                    id="ple-select-gender"
                    name="gender"
                    className={`form-control select-control ${touched.gender && errors.gender ? 'has-error' : ''}`}
                    value={formData.gender}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="" disabled>Select Gender</option>
                    {GENDER_OPTIONS.map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
                {touched.gender && errors.gender && (
                  <p className="form-error-msg" role="alert">
                    <AlertCircle size={14} /> <span>{errors.gender}</span>
                  </p>
                )}
              </div>

              {/* Row 8, Col 2: Preferred Loan Tenure (Synchronized with Calculator) */}
              <div className="form-group" id="ple-field-loanTenure">
                <label htmlFor="ple-select-loanTenure" className="form-label">
                  <span className="form-label-title">
                    <span>Preferred Loan Tenure</span>
                    <span className="required-star">*</span>
                  </span>
                  <span className="sync-badge">Syncs with Calculator</span>
                </label>
                <div className="custom-select-wrapper">
                  <select
                    id="ple-select-loanTenure"
                    name="loanTenure"
                    className="form-control select-control"
                    value={tenureMonths}
                    onChange={handleFormTenureChange}
                  >
                    {TENURE_MONTHS_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Prominent Action Button Row */}
            <div className="loan-application-submit-wrap">
              <button
                type="submit"
                className="btn-submit-loan-app"
                disabled={isSubmitting}
                id="btn-ple-submit-application"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="spinner-icon" />
                    <span>VALIDATING LOAN APPLICATION...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>SUBMIT LOAN APPLICATION</span>
                  </>
                )}
              </button>

              <button
                type="button"
                className="btn btn-outline-secondary reset-btn"
                onClick={handleReset}
                id="btn-ple-reset-form"
              >
                <RotateCcw size={15} />
                <span>Reset Form</span>
              </button>
            </div>

            {/* Disclaimer under button matching Image 1 */}
            <div className="application-authorization-note">
              <Info size={16} className="auth-info-icon" />
              <span>
                By clicking submit, you authorize our certified loan advisors to contact you regarding your loan application.
              </span>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
