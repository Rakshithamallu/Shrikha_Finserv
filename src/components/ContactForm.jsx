import React, { useState, useEffect } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ExternalLink,
  Send,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Loader2,
  ShieldCheck,
  Eye,
  X,
  Check,
  MessageCircle
} from 'lucide-react';
import {
  triggerDirectWhatsApp,
  getDirectWhatsAppUrl,
  getDirectEmailUrl,
  getDirectPhoneUrl,
  triggerSelectedContactChannel,
  TARGET_PHONE_DISPLAY,
  TARGET_EMAIL
} from '../utils/directCommunication';

export const SERVICE_OPTIONS = [
  'Personal Loan',
  'Home Loan',
  'Business Loan',
  'Vehicle Loan',
  'Gold Loan',
  'Property Loan',
  'Education Loan',
  'Health Insurance',
  'Motor Insurance',
  'Life Insurance',
  'Investment Services',
  'Other Enquiry'
];

export const VALID_CONTACT_METHODS = ['Phone', 'WhatsApp', 'Email'];

/**
 * Standard field-by-field validation rules
 */
export const validateField = (name, value, allValues = {}) => {
  switch (name) {
    case 'fullName': {
      const trimmed = (value || '').trim();
      if (!trimmed) {
        return 'Full Name is required.';
      }
      if (trimmed.length < 2) {
        return 'Full Name must contain at least 2 characters.';
      }
      if (trimmed.length > 60) {
        return 'Full Name cannot exceed 60 characters.';
      }
      const nameCharRegex = /^[a-zA-Z\u00C0-\u024F\s.'-]+$/;
      if (!nameCharRegex.test(trimmed)) {
        return 'Full Name should only contain letters, spaces, dots, or hyphens.';
      }
      const hasMinLetters = /[a-zA-Z\u00C0-\u024F].*[a-zA-Z\u00C0-\u024F]/;
      if (!hasMinLetters.test(trimmed)) {
        return 'Full Name must contain at least two letters.';
      }
      return null;
    }

    case 'phoneNumber': {
      const raw = (value || '').trim();
      if (!raw) {
        return 'Phone number is required.';
      }
      if (!/^[+\d\s\-()]+$/.test(raw)) {
        return 'Phone number should only contain numbers, spaces, or hyphens.';
      }
      const digitsOnly = raw.replace(/\D/g, '');
      let standardTenDigit = digitsOnly;
      if (digitsOnly.length === 12 && digitsOnly.startsWith('91')) {
        standardTenDigit = digitsOnly.slice(2);
      } else if (digitsOnly.length === 11 && digitsOnly.startsWith('0')) {
        standardTenDigit = digitsOnly.slice(1);
      }

      if (standardTenDigit.length !== 10) {
        return 'Please enter a valid 10-digit Indian mobile number.';
      }
      if (!/^[6-9]/.test(standardTenDigit)) {
        return 'Indian mobile number must start with 6, 7, 8, or 9.';
      }
      const dummyNumbers = ['1234567890', '9876543210', '0123456789'];
      const isRepeatedDigits = /^(\d)\1{9}$/.test(standardTenDigit);
      if (isRepeatedDigits || dummyNumbers.includes(standardTenDigit)) {
        return 'Please enter a genuine, reachable mobile number.';
      }
      return null;
    }

    case 'email': {
      const trimmed = (value || '').trim();
      if (!trimmed) {
        return null; // Email is optional
      }
      if (/\s/.test(trimmed)) {
        return 'Email address cannot contain spaces.';
      }
      if (trimmed.length > 100) {
        return 'Email address cannot exceed 100 characters.';
      }
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
      if (!emailRegex.test(trimmed)) {
        return 'Please enter a valid email address (e.g., name@example.com).';
      }
      return null;
    }

    case 'interestedService': {
      if (!value || !SERVICE_OPTIONS.includes(value)) {
        return 'Please select a valid financial service from the list.';
      }
      return null;
    }

    case 'preferredContactMethod': {
      if (value && !VALID_CONTACT_METHODS.includes(value)) {
        return 'Please select a valid contact method.';
      }
      return null;
    }

    case 'message': {
      const trimmed = (value || '').trim();
      if (!trimmed) {
        return null; // Message is optional
      }
      if (trimmed.length < 5) {
        return 'If provided, message must be at least 5 characters.';
      }
      if (trimmed.length > 500) {
        return 'Message cannot exceed 500 characters.';
      }
      if (/[<>]/.test(trimmed)) {
        return 'HTML or script tags are not allowed in the message.';
      }
      return null;
    }

    case 'consent': {
      if (!value) {
        return 'You must authorize Shrikha Finserv to contact you regarding your enquiry.';
      }
      return null;
    }

    default:
      return null;
  }
};

export const validateAllFields = (formData) => {
  const errs = {};
  ['fullName', 'phoneNumber', 'email', 'interestedService', 'preferredContactMethod', 'message', 'consent'].forEach((key) => {
    const errorMsg = validateField(key, formData[key], formData);
    if (errorMsg) {
      errs[key] = errorMsg;
    }
  });
  return errs;
};

export default function ContactForm({ preselectedService }) {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    interestedService: 'Personal Loan',
    preferredContactMethod: 'Phone',
    message: '',
    consent: false
  });

  const [touched, setTouched] = useState({
    fullName: false,
    phoneNumber: false,
    email: false,
    interestedService: false,
    preferredContactMethod: false,
    message: false,
    consent: false
  });

  const [errors, setErrors] = useState({});
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // When a service card is clicked, update form dropdown
  useEffect(() => {
    if (preselectedService && SERVICE_OPTIONS.includes(preselectedService)) {
      setFormData(prev => ({ ...prev, interestedService: preselectedService }));
    }
  }, [preselectedService]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const nextVal = type === 'checkbox' ? checked : value;

    setFormData(prev => {
      const updated = { ...prev, [name]: nextVal };

      // Re-validate in real-time if field was already touched or submission attempted
      if (touched[name] || hasAttemptedSubmit) {
        const fieldError = validateField(name, nextVal, updated);
        setErrors(prevErr => ({
          ...prevErr,
          [name]: fieldError
        }));
      }

      return updated;
    });
  };

  const handleBlur = (e) => {
    const { name, value, type, checked } = e.target;
    const currentVal = type === 'checkbox' ? checked : value;

    setTouched(prev => ({ ...prev, [name]: true }));
    const fieldError = validateField(name, currentVal, formData);
    setErrors(prev => ({
      ...prev,
      [name]: fieldError
    }));
  };

  const hasFieldError = (name) => {
    return (touched[name] || hasAttemptedSubmit) && Boolean(errors[name]);
  };

  const isFieldValid = (name) => {
    if (!(touched[name] || hasAttemptedSubmit) || errors[name]) return false;
    if (name === 'fullName') return formData.fullName.trim().length >= 2;
    if (name === 'phoneNumber') return formData.phoneNumber.trim().length > 0;
    if (name === 'email') return formData.email.trim().length > 0;
    if (name === 'consent') return formData.consent === true;
    return false;
  };

  const getFieldStatusClass = (name) => {
    if (hasFieldError(name)) return 'has-error';
    if (isFieldValid(name)) return 'is-valid';
    return '';
  };

  const executeSubmission = async (currentData) => {
    setIsSubmitting(true);
    setSubmissionResult(null);

    const submissionData = currentData || formData;

    // Format all client details for WhatsApp
    const messageLines = [
      `*New Service Enquiry - Shrikha Finserv*`,
      `----------------------------------------`,
      `*Full Name:* ${submissionData.fullName}`,
      `*Mobile Number:* ${submissionData.phoneNumber}`,
      `*Email:* ${submissionData.email || 'Not provided'}`,
      `*Interested Service:* ${submissionData.interestedService}`,
      `*Preferred Contact:* ${submissionData.preferredContactMethod}`,
      `*Requirements / Message:*`,
      `${submissionData.message || 'No additional notes provided.'}`.trim(),
      `----------------------------------------`,
      `_Sent via shrikhafinserv.com_`
    ];

    const messageText = messageLines.join('\n');
    const emailSubject = `New Service Enquiry - ${submissionData.fullName} (${submissionData.interestedService})`;

    // Automatically trigger the exact preferred contact method chosen by the client:
    // - If WhatsApp -> directly opens WhatsApp
    // - If Email -> directly opens Email client
    // - If Phone Call -> directly opens Phone Call dialer
    const { whatsappUrl, emailUrl, phoneUrl } = triggerSelectedContactChannel(
      submissionData.preferredContactMethod,
      messageText,
      emailSubject
    );

    try {
      // Background API logging (fire-and-forget, do not await)
      fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...submissionData, whatsappTarget: '918792953082' })
      }).catch(() => {});
    } catch (e) {
      // offline-safe
    }

    // Set success state and show Success Popup Modal
    setSubmissionResult({
      status: 'success',
      whatsappUrl,
      emailUrl,
      phoneUrl,
      preferredContactMethod: submissionData.preferredContactMethod,
      data: { ...submissionData },
      message: 'Your enquiry has been received successfully.'
    });
    setShowSuccessModal(true);
    setIsSubmitting(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);

    // Mark all fields as touched
    setTouched({
      fullName: true,
      phoneNumber: true,
      email: true,
      interestedService: true,
      preferredContactMethod: true,
      message: true,
      consent: true
    });

    const validationErrors = validateAllFields(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      executeSubmission(formData);
    } else {
      // Focus and smoothly scroll to the first invalid field
      const firstErrorKey = ['fullName', 'phoneNumber', 'email', 'interestedService', 'message', 'consent'].find(
        (key) => validationErrors[key]
      );
      if (firstErrorKey) {
        const el = document.getElementById(firstErrorKey);
        if (el) {
          el.focus();
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }
  };

  return (
    <section id="contact" className="section contact-section" aria-label="Contact and Enquiry">
      <div className="container">
        <div className="section-header">
          <div className="section-tag section-tag-gold">
            <Mail size={14} />
            <span>Get in Touch</span>
          </div>
          <h2 className="section-title">
            Connect with <span className="highlight-text">Shrikha Finserv</span>
          </h2>
          <p className="section-desc">
            Reach out by phone, visit our Mysore office, or submit an enquiry to discuss your financial requirements with our specialists.
          </p>
        </div>

        <div className="contact-layout-grid">
          {/* Left Column: Official Company Details */}
          <div className="contact-info-column">
            <div className="contact-info-card">
              <h3 className="info-card-heading">Office Information</h3>
              <p className="info-card-intro">
                We are based in Mysore and serve clients throughout urban, semi-urban, and rural Karnataka.
              </p>

              <div className="info-items-list">
                {/* Address */}
                <div className="info-item">
                  <div className="info-icon-wrapper">
                    <MapPin size={22} className="info-item-icon" />
                  </div>
                  <div className="info-item-content">
                    <span className="info-label">Registered Office</span>
                    <address className="info-address">
                      <strong>Shrikha Finserv</strong><br />
                      2nd floor, Wekreate Space - Midway Hub,<br />
                      block 9, Vishwamanava Double Road,<br />
                      Kuvempunagara North,<br />
                      Saraswathipuram, Mysuru,<br />
                      Karnataka 570009, India
                    </address>
                    <a
                      href="https://www.google.com/maps/place/Wekreate+Space+-+Midway+Hub/@12.2986022,76.6237103,17z/data=!3m1!4b1!4m6!3m5!1s0x3baf7b7c70359f81:0xc6996fd65ce1fcba!8m2!3d12.298597!4d76.6262852!16s%2Fg%2F11s4rq848q?hl=en-IN&entry=ttu&g_ep=EgoyMDI2MTEwMS4wIKXMDSoASAFQAw%3D%3D"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="directions-link"
                    >
                      <span>Get Driving Directions</span>
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="info-item">
                  <div className="info-icon-wrapper">
                    <Phone size={22} className="info-item-icon" />
                  </div>
                  <div className="info-item-content">
                    <span className="info-label">Direct Telephone</span>
                    <a href="tel:8792953082" className="info-contact-link phone-large">
                      8792953082
                    </a>
                    <span className="info-subtext">Quick enquiry & telephonic consultation</span>
                  </div>
                </div>

                {/* Email */}
                <div className="info-item">
                  <div className="info-icon-wrapper">
                    <Mail size={22} className="info-item-icon" />
                  </div>
                  <div className="info-item-content">
                    <span className="info-label">Official Email</span>
                    <a href="mailto:shrikhafinserv@gmail.com" className="info-contact-link">
                      shrikhafinserv@gmail.com
                    </a>
                    <span className="info-subtext">Send proposals and service queries</span>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="info-item">
                  <div className="info-icon-wrapper">
                    <Clock size={22} className="info-item-icon" />
                  </div>
                  <div className="info-item-content">
                    <span className="info-label">Working Hours</span>
                    <strong className="hours-text">9:00 AM to 7:00 PM</strong>
                    <span className="info-subtext">Monday through Saturday (IST)</span>
                  </div>
                </div>
              </div>

              {/* Compliance & Privacy Note */}
              <div className="info-security-badge">
                <ShieldCheck size={18} />
                <span>We strictly respect your privacy. No spam or unsolicited third-party sharing.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Enquiry Form */}
          <div className="contact-form-column">
            <div className="card contact-form-card" id="contact-form-card">
              <div className="form-card-header">
                <h3 className="form-title">Send a Financial Service Enquiry</h3>
                <p className="form-subtitle">
                  Fill out your preliminary requirements. We will contact you to explain eligibility and options.
                </p>
              </div>

              {/* Submission Result Feedback */}
              {submissionResult && (
                <div className="submission-alert-banner alert-success" role="status">
                  <div className="alert-header">
                    <CheckCircle2 size={22} className="alert-icon" />
                    <strong>Enquiry Submitted Successfully!</strong>
                  </div>
                  <p className="alert-text">
                    Thank you, <strong>{formData.fullName}</strong>. Your enquiry for <strong>{formData.interestedService}</strong> has been received and forwarded to our WhatsApp desk (<strong>+91 8792953082</strong>).
                  </p>
                  <p className="alert-action-prompt">
                    Our team will connect with you shortly. You can also chat directly on WhatsApp or call our desk:
                  </p>
                  <div className="alert-cta-buttons">
                    <a
                      href={submissionResult.whatsappUrl}
                      className="btn btn-whatsapp btn-sm"
                    >
                      <MessageCircle size={16} />
                      <span>WhatsApp (+91 8792953082)</span>
                    </a>
                    <a href={submissionResult.phoneUrl || 'tel:8792953082'} className="btn btn-primary btn-sm">
                      <Phone size={14} />
                      <span>Call 8792953082</span>
                    </a>
                    <a href={submissionResult.emailUrl || 'mailto:shrikhafinserv@gmail.com'} className="btn btn-secondary btn-sm">
                      <Mail size={14} />
                      <span>Email Desk</span>
                    </a>
                  </div>
                </div>
              )}

              <form onSubmit={handleFormSubmit} noValidate>
                {/* Full Name */}
                <div className="form-group">
                  <label htmlFor="fullName" className="form-label">
                    <span>Full Name <span className="required-mark">*</span></span>
                    {isFieldValid('fullName') && (
                      <span className="valid-label-badge" title="Valid name entry">
                        <Check size={13} /> Valid
                      </span>
                    )}
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="e.g., Ramesh Kumar"
                    className={`form-input ${getFieldStatusClass('fullName')}`}
                    disabled={isSubmitting}
                    maxLength={60}
                    aria-required="true"
                    aria-invalid={Boolean(hasFieldError('fullName'))}
                    aria-describedby={hasFieldError('fullName') ? 'fullName-error' : undefined}
                  />
                  {hasFieldError('fullName') && (
                    <div className="form-error" id="fullName-error" role="alert">
                      <AlertCircle size={14} />
                      <span>{errors.fullName}</span>
                    </div>
                  )}
                </div>

                {/* Phone & Email Row */}
                <div className="form-row-2">
                  <div className="form-group">
                    <label htmlFor="phoneNumber" className="form-label">
                      <span>Phone Number <span className="required-mark">*</span></span>
                      {isFieldValid('phoneNumber') && (
                        <span className="valid-label-badge" title="Valid Indian mobile number">
                          <Check size={13} /> Valid
                        </span>
                      )}
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder="10-digit mobile (e.g. 9876543210)"
                      className={`form-input ${getFieldStatusClass('phoneNumber')}`}
                      disabled={isSubmitting}
                      maxLength={15}
                      aria-required="true"
                      aria-invalid={Boolean(hasFieldError('phoneNumber'))}
                      aria-describedby={hasFieldError('phoneNumber') ? 'phoneNumber-error' : undefined}
                    />
                    {hasFieldError('phoneNumber') && (
                      <div className="form-error" id="phoneNumber-error" role="alert">
                        <AlertCircle size={14} />
                        <span>{errors.phoneNumber}</span>
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      <span>Email Address <span className="optional-mark">(Optional)</span></span>
                      {isFieldValid('email') && (
                        <span className="valid-label-badge" title="Valid email address">
                          <Check size={13} /> Valid
                        </span>
                      )}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder="e.g., ramesh@example.com"
                      className={`form-input ${getFieldStatusClass('email')}`}
                      disabled={isSubmitting}
                      maxLength={100}
                      aria-invalid={Boolean(hasFieldError('email'))}
                      aria-describedby={hasFieldError('email') ? 'email-error' : undefined}
                    />
                    {hasFieldError('email') && (
                      <div className="form-error" id="email-error" role="alert">
                        <AlertCircle size={14} />
                        <span>{errors.email}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Service Dropdown & Preferred Contact */}
                <div className="form-row-2">
                  <div className="form-group">
                    <label htmlFor="interestedService" className="form-label">
                      <span>Interested Service <span className="required-mark">*</span></span>
                    </label>
                    <select
                      id="interestedService"
                      name="interestedService"
                      value={formData.interestedService}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`form-select ${getFieldStatusClass('interestedService')}`}
                      disabled={isSubmitting}
                      aria-required="true"
                      aria-invalid={Boolean(hasFieldError('interestedService'))}
                      aria-describedby={hasFieldError('interestedService') ? 'interestedService-error' : undefined}
                    >
                      {SERVICE_OPTIONS.map((srv) => (
                        <option key={srv} value={srv}>
                          {srv}
                        </option>
                      ))}
                    </select>
                    {hasFieldError('interestedService') && (
                      <div className="form-error" id="interestedService-error" role="alert">
                        <AlertCircle size={14} />
                        <span>{errors.interestedService}</span>
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="preferredContactMethod" className="form-label">
                      <span>Preferred Contact <span className="optional-mark">(Optional)</span></span>
                    </label>
                    <select
                      id="preferredContactMethod"
                      name="preferredContactMethod"
                      value={formData.preferredContactMethod}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className="form-select"
                      disabled={isSubmitting}
                    >
                      {VALID_CONTACT_METHODS.map((method) => (
                        <option key={method} value={method}>
                          {method === 'Phone' ? 'Phone Call' : method}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    <span>Message / Specific Requirements <span className="optional-mark">(Optional)</span></span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="3"
                    value={formData.message}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="Briefly describe what you are looking for (loan purpose, preferred tenure, etc.)"
                    className={`form-textarea ${getFieldStatusClass('message')}`}
                    disabled={isSubmitting}
                    maxLength={500}
                    aria-invalid={Boolean(hasFieldError('message'))}
                    aria-describedby="message-counter"
                  />
                  <div className="form-character-counter" id="message-counter">
                    <span className="form-help">Max 500 characters. Never submit passwords, OTPs, or bank card details.</span>
                    <span className={`counter-text ${formData.message.length > 450 ? 'near-limit' : ''}`}>
                      {formData.message.length}/500
                    </span>
                  </div>
                  {hasFieldError('message') && (
                    <div className="form-error" id="message-error" role="alert">
                      <AlertCircle size={14} />
                      <span>{errors.message}</span>
                    </div>
                  )}
                </div>

                {/* Consent Checkbox */}
                <div className="form-group">
                  <label className="form-checkbox-label">
                    <input
                      type="checkbox"
                      id="consent"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      aria-required="true"
                      aria-invalid={Boolean(hasFieldError('consent'))}
                      aria-describedby={hasFieldError('consent') ? 'consent-error' : undefined}
                    />
                    <span>
                      I authorize Shrikha Finserv and its representatives to contact me via phone, SMS, WhatsApp, or email regarding this enquiry. I understand that approvals are subject to provider terms.
                      <span className="required-mark"> *</span>
                    </span>
                  </label>
                  {hasFieldError('consent') && (
                    <div className="form-error" id="consent-error" role="alert">
                      <AlertCircle size={14} />
                      <span>{errors.consent}</span>
                    </div>
                  )}
                </div>

                {/* Submit Actions */}
                <div className="form-submit-row">
                  <button
                    type="submit"
                    className="btn btn-gold btn-lg submit-btn"
                    disabled={isSubmitting}
                    id="submit-enquiry-btn"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="spinner-icon" />
                        <span>Submitting Enquiry...</span>
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        <span>Submit Enquiry</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Success Popup Modal (Shows on Submit without auto-redirecting) */}
      {showSuccessModal && submissionResult && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="success-modal-title">
          <div className="modal-dialog success-modal-dialog">
            <div className="modal-header success-modal-header">
              <div className="success-badge-header">
                <CheckCircle2 size={26} className="success-check-icon" />
                <h3 id="success-modal-title">Enquiry Submitted Successfully!</h3>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => {
                  setShowSuccessModal(false);
                  setSubmissionResult(null);
                }}
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <p className="modal-lead">
                Thank you, <strong>{submissionResult.data?.fullName}</strong>. Your enquiry for <strong>{submissionResult.data?.interestedService}</strong> has been received by Shrikha Finserv.
              </p>

              <div className="preview-details-table">
                <div className="preview-row">
                  <span className="preview-label">Full Name:</span>
                  <span className="preview-val"><strong>{submissionResult.data?.fullName}</strong></span>
                </div>
                <div className="preview-row">
                  <span className="preview-label">Mobile Number:</span>
                  <span className="preview-val">{submissionResult.data?.phoneNumber}</span>
                </div>
                {submissionResult.data?.email && (
                  <div className="preview-row">
                    <span className="preview-label">Email:</span>
                    <span className="preview-val">{submissionResult.data?.email}</span>
                  </div>
                )}
                <div className="preview-row">
                  <span className="preview-label">Interested Service:</span>
                  <span className="preview-val badge badge-gold">{submissionResult.data?.interestedService}</span>
                </div>
                <div className="preview-row">
                  <span className="preview-label">Preferred Contact:</span>
                  <span className="preview-val">{submissionResult.data?.preferredContactMethod}</span>
                </div>
                {submissionResult.data?.message && (
                  <div className="preview-row">
                    <span className="preview-label">Requirements / Message:</span>
                    <span className="preview-val">{submissionResult.data?.message}</span>
                  </div>
                )}
              </div>

              {/* Direct Instant Channels: WhatsApp, Call, Email */}
              <div className="whatsapp-modal-cta-box direct-connect-modal-box">
                <p className="whatsapp-cta-text">
                  Direct channels for your enquiry (opened directly without extra pages):
                </p>
                <div className="modal-direct-actions-grid">
                  <a
                    href={submissionResult.whatsappUrl}
                    className="btn btn-whatsapp btn-md btn-modal-action"
                  >
                    <MessageCircle size={18} />
                    <span>WhatsApp Desk (+91 8792953082)</span>
                  </a>
                  <a
                    href={submissionResult.phoneUrl || 'tel:8792953082'}
                    className="btn btn-primary btn-md btn-modal-action"
                  >
                    <Phone size={16} />
                    <span>Call Desk (8792953082)</span>
                  </a>
                  <a
                    href={submissionResult.emailUrl || 'mailto:shrikhafinserv@gmail.com'}
                    className="btn btn-secondary btn-md btn-modal-action"
                  >
                    <Mail size={16} />
                    <span>Email Desk (shrikhafinserv@gmail.com)</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => {
                  setShowSuccessModal(false);
                  setSubmissionResult(null);
                  setFormData({
                    fullName: '',
                    phoneNumber: '',
                    email: '',
                    interestedService: 'Personal Loan',
                    preferredContactMethod: 'Phone',
                    message: '',
                    consent: false
                  });
                  setTouched({
                    fullName: false,
                    phoneNumber: false,
                    email: false,
                    interestedService: false,
                    preferredContactMethod: false,
                    message: false,
                    consent: false
                  });
                  setHasAttemptedSubmit(false);
                }}
              >
                Done
              </button>
              <a href="tel:8792953082" className="btn btn-secondary btn-sm">
                <Phone size={14} />
                <span>Call 8792953082</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
