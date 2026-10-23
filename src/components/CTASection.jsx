import React from 'react';
import { ArrowRight, Phone, Sparkles } from 'lucide-react';

export default function CTASection({ onEnquireClick }) {
  const scrollToContact = () => {
    if (onEnquireClick) {
      onEnquireClick();
    } else {
      const el = document.getElementById('contact');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="cta-banner-section" aria-label="Take the Next Step">
      <div className="cta-bg-glow" aria-hidden="true" />
      <div className="container">
        <div className="cta-banner-card">
          <div className="cta-content-wrapper">
            <div className="cta-badge">
              <Sparkles size={14} />
              <span>Personalized Financial Advisory</span>
            </div>

            <h2 className="cta-headline">
              Let's Find the Right Financial <span className="gold-highlight">Path for You.</span>
            </h2>

            <p className="cta-description">
              Tell us what you are looking for, and connect with our team to discuss your requirements. We are ready to assist you across Mysore and Karnataka.
            </p>

            <div className="cta-buttons-wrapper">
              <button
                type="button"
                className="btn btn-gold btn-lg cta-btn-enquire"
                onClick={scrollToContact}
                id="cta-send-enquiry"
              >
                <span>Send an Enquiry</span>
                <ArrowRight size={18} />
              </button>

              <a
                href="tel:8792953082"
                className="btn btn-outline-white btn-lg cta-btn-call"
                aria-label="Call Shrikha Finserv at 8792953082"
              >
                <Phone size={18} />
                <span>Call 8792953082</span>
              </a>
            </div>

            <div className="cta-subnote">
              <span>Office hours: Monday to Saturday, 9:00 AM – 7:00 PM IST</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
