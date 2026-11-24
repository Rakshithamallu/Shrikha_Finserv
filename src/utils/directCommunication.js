/**
 * Shrikha Finserv Direct Communication Utility
 * Enables seamless direct routing to native WhatsApp, Phone Calls, and Email.
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
 * Returns mailto URL for direct email dispatch to Shrikha Finserv
 */
export const getDirectEmailUrl = (subject, bodyText) => {
  const encodedSubject = encodeURIComponent(subject || 'Enquiry - Shrikha Finserv');
  const encodedBody = encodeURIComponent(bodyText || '');
  return `mailto:${TARGET_EMAIL}?subject=${encodedSubject}&body=${encodedBody}`;
};

/**
 * Triggers direct email dispatch in the user's default email client
 */
export const triggerDirectEmail = (subject, bodyText) => {
  const emailUrl = getDirectEmailUrl(subject, bodyText);
  if (typeof window !== 'undefined') {
    window.location.href = emailUrl;
  }
  return emailUrl;
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
 * - If user selected 'Email' -> immediately opens Mail client
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
        window.location.href = emailUrl;
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
