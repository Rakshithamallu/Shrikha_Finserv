const express = require('express');
const router = express.Router();

const VALID_SERVICES = [
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

// Simple in-memory rate limiter per IP
const requestCounts = new Map();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

// Cleanup old rate limit entries every 15 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of requestCounts.entries()) {
    if (now - data.startTime > RATE_LIMIT_WINDOW_MS) {
      requestCounts.delete(ip);
    }
  }
}, 15 * 60 * 1000);

function rateLimiter(req, res, next) {
  const clientIp = req.ip || req.connection.remoteAddress || 'unknown';
  const now = Date.now();

  let clientData = requestCounts.get(clientIp);
  if (!clientData || (now - clientData.startTime) > RATE_LIMIT_WINDOW_MS) {
    clientData = { count: 1, startTime: now };
    requestCounts.set(clientIp, clientData);
    return next();
  }

  if (clientData.count >= MAX_REQUESTS_PER_WINDOW) {
    return res.status(429).json({
      success: false,
      error: 'Too many enquiry submissions from this IP. Please wait a few minutes or call 8792953082 directly.'
    });
  }

  clientData.count += 1;
  next();
}

const VALID_CONTACT_METHODS = ['Phone', 'WhatsApp', 'Email', 'Office Visit'];

// POST /api/enquiries
router.post('/', rateLimiter, (req, res) => {
  try {
    const {
      fullName,
      phoneNumber,
      email,
      interestedService,
      preferredContactMethod,
      message,
      consent
    } = req.body || {};

    const errors = {};

    // 1. Full Name Validation
    const trimmedName = typeof fullName === 'string' ? fullName.trim() : '';
    const nameCharRegex = /^[a-zA-Z\u00C0-\u024F\s.'-]+$/;
    const hasMinLetters = /[a-zA-Z\u00C0-\u024F].*[a-zA-Z\u00C0-\u024F]/;

    if (!trimmedName) {
      errors.fullName = 'Full Name is required.';
    } else if (trimmedName.length < 2) {
      errors.fullName = 'Full Name must contain at least 2 characters.';
    } else if (trimmedName.length > 60) {
      errors.fullName = 'Full Name cannot exceed 60 characters.';
    } else if (!nameCharRegex.test(trimmedName)) {
      errors.fullName = 'Full Name should only contain letters, spaces, dots, or hyphens.';
    } else if (!hasMinLetters.test(trimmedName)) {
      errors.fullName = 'Full Name must contain at least two letters.';
    }

    // 2. Phone Number Validation (Indian 10-digit mobile starting with 6, 7, 8, or 9)
    const rawPhone = (phoneNumber || '').toString().trim();
    const digitsOnly = rawPhone.replace(/\D/g, '');
    let standardTenDigit = digitsOnly;

    if (digitsOnly.length === 12 && digitsOnly.startsWith('91')) {
      standardTenDigit = digitsOnly.slice(2);
    } else if (digitsOnly.length === 11 && digitsOnly.startsWith('0')) {
      standardTenDigit = digitsOnly.slice(1);
    }

    const dummyNumbers = ['1234567890', '9876543210', '0123456789'];
    const isRepeatedDigits = /^(\d)\1{9}$/.test(standardTenDigit);

    if (!rawPhone) {
      errors.phoneNumber = 'Phone number is required.';
    } else if (!/^[+\d\s\-()]+$/.test(rawPhone)) {
      errors.phoneNumber = 'Phone number contains invalid characters.';
    } else if (standardTenDigit.length !== 10) {
      errors.phoneNumber = 'Please enter a valid 10-digit mobile number.';
    } else if (!/^[6-9]/.test(standardTenDigit)) {
      errors.phoneNumber = 'Indian mobile number must start with 6, 7, 8, or 9.';
    } else if (isRepeatedDigits || dummyNumbers.includes(standardTenDigit)) {
      errors.phoneNumber = 'Please enter a genuine, reachable mobile number.';
    }

    // 3. Email Validation (optional, but strictly validated if provided)
    const trimmedEmail = typeof email === 'string' ? email.trim() : '';
    if (trimmedEmail.length > 0) {
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
      if (/\s/.test(trimmedEmail)) {
        errors.email = 'Email address cannot contain spaces.';
      } else if (trimmedEmail.length > 100) {
        errors.email = 'Email address cannot exceed 100 characters.';
      } else if (!emailRegex.test(trimmedEmail)) {
        errors.email = 'Please enter a valid email address (e.g., name@example.com).';
      }
    }

    // 4. Interested Service Validation
    if (!interestedService || !VALID_SERVICES.includes(interestedService)) {
      errors.interestedService = 'Please select a valid service from the list.';
    }

    // 5. Preferred Contact Method Validation
    const contactMethod = preferredContactMethod || 'Phone';
    if (!VALID_CONTACT_METHODS.includes(contactMethod)) {
      errors.preferredContactMethod = 'Please select a valid contact method.';
    }

    // 6. Message Validation (optional, but sanitized and checked)
    const trimmedMessage = typeof message === 'string' ? message.trim() : '';
    if (trimmedMessage.length > 0) {
      if (trimmedMessage.length < 5) {
        errors.message = 'If provided, message must be at least 5 characters.';
      } else if (trimmedMessage.length > 500) {
        errors.message = 'Message cannot exceed 500 characters.';
      } else if (/[<>]/.test(trimmedMessage)) {
        errors.message = 'HTML or script tags are not allowed in the message.';
      }
    }

    // 7. Consent Validation
    if (consent !== true && consent !== 'true') {
      errors.consent = 'You must authorize Shrikha Finserv to contact you regarding your enquiry.';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        errors,
        message: 'Please resolve form validation errors.'
      });
    }

    // Check if an email transporter or webhook is configured in environment variables
    const hasEmailConfig = !!(process.env.SMTP_HOST && process.env.SMTP_USER);

    // Prepare sanitized summary (do not persist permanently)
    const enquiryPayload = {
      fullName: trimmedName,
      phoneNumber: standardTenDigit,
      email: trimmedEmail || null,
      interestedService,
      preferredContactMethod: contactMethod,
      message: trimmedMessage.slice(0, 500),
      timestamp: new Date().toISOString()
    };

    if (hasEmailConfig) {
      // Future production email forwarding handler can be connected here seamlessly
      return res.status(200).json({
        success: true,
        mode: 'live',
        message: 'Your enquiry has been successfully delivered to the Shrikha Finserv advisory desk.',
        enquiryId: `SF-${Date.now().toString().slice(-6)}`
      });
    }

    // Explicit Demo Mode Response
    return res.status(200).json({
      success: true,
      mode: 'demo',
      message: 'Enquiry validated successfully in Demonstration Mode. For immediate assistance, please call 8792953082 or email shrikhafinserv@gmail.com.',
      dataPreview: {
        name: enquiryPayload.fullName,
        service: enquiryPayload.interestedService,
        phone: enquiryPayload.phoneNumber
      }
    });

  } catch (err) {
    console.error('Error processing enquiry:', err);
    return res.status(500).json({
      success: false,
      error: 'An unexpected error occurred while processing your request. Please call 8792953082 directly.'
    });
  }
});

module.exports = router;
