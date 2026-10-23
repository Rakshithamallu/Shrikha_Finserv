import React, { useEffect } from 'react';
import { X, ShieldAlert, FileText, CheckCircle } from 'lucide-react';

export default function LegalModal({ isOpen, type, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const isPrivacy = type === 'privacy';

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="legal-modal-title">
      <div className="modal-dialog">
        <div className="modal-header">
          <div className="modal-title-wrap">
            {isPrivacy ? <FileText size={20} className="modal-icon" /> : <ShieldAlert size={20} className="modal-icon" />}
            <h3 id="legal-modal-title">
              {isPrivacy ? 'Privacy Policy' : 'Terms & Conditions & Disclaimer'}
            </h3>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body legal-modal-body">
          {isPrivacy ? (
            <>
              <p className="legal-updated">Last Updated: October 2026</p>
              <h4>1. Information Collection & Usage</h4>
              <p>
                Shrikha Finserv ("we", "our", or "us"), located in Saraswathipuram, Mysore, respects your privacy. We collect only preliminary contact details (such as your name, telephone number, email address, and service interest) voluntarily provided by you when submitting an enquiry or calling our office.
              </p>
              <h4>2. Purpose of Processing</h4>
              <p>
                Your details are used strictly to communicate with you regarding your financial enquiry, understand eligibility requirements, and provide guidance on loans, insurance, or investment options across Karnataka.
              </p>
              <h4>3. No Third-Party Selling</h4>
              <p>
                We do not sell, rent, or trade your personal information to unauthorized third-party marketing companies. Data is shared with financial institutions (banks, NBFCs, or insurance providers) solely upon your explicit instruction to initiate formal applications.
              </p>
              <h4>4. Data Security</h4>
              <p>
                We implement reasonable organizational safeguards. We never solicit passwords, PINs, OTPs, or debit/credit card CVVs. Please never transmit sensitive authentication tokens through our contact forms.
              </p>
            </>
          ) : (
            <>
              <p className="legal-updated">Last Updated: October 2026</p>
              <h4>1. General Informational Notice</h4>
              <p>
                The information provided on this website is for general informational purposes only and does not constitute a binding offer of credit, insurance underwriting, or financial commitment.
              </p>
              <h4>2. No Guarantee of Approval</h4>
              <p>
                Shrikha Finserv is an independent financial services advisory firm established in 2026. We are not a direct lending bank or insurance carrier. Loan eligibility, final sanctioned amounts, interest rates, processing fees, insurance coverage, and exclusions are determined solely by the respective lender or underwriter.
              </p>
              <h4>3. Investment Risk Notice</h4>
              <p>
                Any references to investment services refer to general guidance. All investments are subject to market risks, and past market performance is not indicative of future returns.
              </p>
              <h4>4. Client Responsibility</h4>
              <p>
                Applicants are strongly advised to carefully read all product terms, sanction letters, and policy documents before executing agreements or transferring funds.
              </p>
            </>
          )}
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-primary btn-sm" onClick={onClose}>
            <CheckCircle size={16} />
            <span>I Understand</span>
          </button>
        </div>
      </div>
    </div>
  );
}
