/**
 * Shrikha Finserv Direct Communication Utility
 * Enables seamless direct routing to native WhatsApp, Phone Calls, and Gmail/Email.
 */

export const TARGET_PHONE_RAW = '8792953082';
export const TARGET_PHONE_INTL = '918792953082';
export const TARGET_PHONE_DISPLAY = '+91 8792953082';
export const TARGET_EMAIL = 'shrikhafinserv@gmail.com';

/**
 * Detects if the current user agent is a mobile device
 */
export const isMobileDevice = () => {
  if (typeof navigator === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

/**
 * Returns native mobile WhatsApp scheme on phones (bypassing web landing page)
 * or universal HTTPS endpoint on desktop.
 */
export const getDirectWhatsAppUrl = (messageText) => {
  const encodedText = encodeURIComponent(messageText);
  if (isMobileDevice()) {
    // Native mobile app scheme - opens WhatsApp app immediately without "Continue to WhatsApp Web" landing page
    return `whatsapp://send?phone=${TARGET_PHONE_INTL}&text=${encodedText}`;
  }
  return `https://api.whatsapp.com/send?phone=${TARGET_PHONE_INTL}&text=${encodedText}`;
};

/**
 * Triggers direct WhatsApp launch without extra intermediary pages.
 * On mobile: navigates via window.location.href to invoke the native app intent.
 * On desktop: opens new window/tab.
 */
export const triggerDirectWhatsApp = (messageText) => {
  const isMobile = isMobileDevice();
  const url = getDirectWhatsAppUrl(messageText);
  if (typeof window !== 'undefined') {
    try {
      if (isMobile) {
        window.location.href = url;
      } else {
        window.open(url, '_blank');
      }
    } catch (e) {
      console.error('Direct WhatsApp trigger error:', e);
    }
  }
  return url;
};

/**
 * Returns direct email URL:
 * - On PC/Desktop: Direct Gmail Web compose URL in browser (never triggers Microsoft Outlook sign-in popup!)
 * - On Mobile: Native mailto: link (opens phone's native Gmail or Mail app)
 */
export const getDirectEmailUrl = (subject, bodyText) => {
  const isMobile = isMobileDevice();
  const encodedSubject = encodeURIComponent(subject || 'Enquiry - Shrikha Finserv');
  const encodedBody = encodeURIComponent(bodyText || '');
  if (isMobile) {
    return `mailto:${TARGET_EMAIL}?subject=${encodedSubject}&body=${encodedBody}`;
  }
  // Desktop/PC: Direct Gmail compose in browser
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${TARGET_EMAIL}&su=${encodedSubject}&body=${encodedBody}`;
};

/**
 * Returns direct Gmail Web compose URL
 */
export const getGmailWebUrl = (subject, bodyText) => {
  const encodedSubject = encodeURIComponent(subject || 'Enquiry - Shrikha Finserv');
  const encodedBody = encodeURIComponent(bodyText || '');
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${TARGET_EMAIL}&su=${encodedSubject}&body=${encodedBody}`;
};

/**
 * Returns fallback native mailto URL
 */
export const getMailtoUrl = (subject, bodyText) => {
  const encodedSubject = encodeURIComponent(subject || 'Enquiry - Shrikha Finserv');
  const encodedBody = encodeURIComponent(bodyText || '');
  return `mailto:${TARGET_EMAIL}?subject=${encodedSubject}&body=${encodedBody}`;
};

/**
 * Triggers direct email dispatch:
 * - On Desktop: opens normal Gmail in a new tab (prevents Outlook prompt)
 * - On Mobile: opens native mail app directly
 */
export const triggerDirectEmail = (subject, bodyText) => {
  const isMobile = isMobileDevice();
  const url = getDirectEmailUrl(subject, bodyText);
  if (typeof window !== 'undefined') {
    try {
      if (isMobile) {
        window.location.href = url;
      } else {
        window.open(url, '_blank');
      }
    } catch (e) {
      console.error('Direct email trigger error:', e);
    }
  }
  return url;
};

/**
 * Returns phone dialer link
 */
export const getDirectPhoneUrl = () => {
  return `tel:${TARGET_PHONE_RAW}`;
};

/**
 * Triggers direct phone call dialer
 */
export const triggerDirectPhone = () => {
  const phoneUrl = getDirectPhoneUrl();
  if (typeof window !== 'undefined') {
    window.location.href = phoneUrl;
  }
  return phoneUrl;
};

/**
 * Triggers the exact preferred channel chosen by the user:
 * - If user selected 'WhatsApp' -> immediately opens WhatsApp
 * - If user selected 'Email' -> immediately opens normal Gmail / Email client
 * - If user selected 'Phone Call' -> immediately opens Phone dialer
 */
export const triggerSelectedContactChannel = (preferredMethod, messageText, subject) => {
  const norm = (preferredMethod || '').toLowerCase();
  const emailUrl = getDirectEmailUrl(subject, messageText);
  const phoneUrl = getDirectPhoneUrl();
  const whatsappUrl = getDirectWhatsAppUrl(messageText);

  if (typeof window !== 'undefined') {
    try {
      if (norm.includes('whatsapp')) {
        triggerDirectWhatsApp(messageText);
      } else if (norm.includes('mail') || norm.includes('email')) {
        triggerDirectEmail(subject, messageText);
      } else {
        // Default: Phone Call
        window.location.href = phoneUrl;
      }
    } catch (e) {
      console.error('Direct channel trigger error:', e);
    }
  }

  return { whatsappUrl, emailUrl, phoneUrl };
};
