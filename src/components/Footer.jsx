import React from 'react';
import { Phone, Mail, MapPin, Clock, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { getAssetPath } from '../utils/assetHelper';

export default function Footer({ onOpenLegal, onSelectService }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: 'Home', id: 'hero' },
    { label: 'About Shrikha', id: 'about' },
    { label: 'Services Catalog', id: 'services' },
    { label: 'Why Choose Us', id: 'why-us' },
    { label: 'How It Works', id: 'how-it-works' },
    { label: 'FAQs', id: 'faqs' },
    { label: 'Contact Us', id: 'contact' }
  ];

  const serviceLinks = [
    'Personal Loan',
    'Home Loan',
    'Business Loan',
    'Vehicle Loan',
    'Gold Loan',
    'Property Loan',
    'Education Loan',
    'Health Insurance',
    'Motor Insurance',
    'Life Insurance'
  ];

  return (
    <footer className="site-footer" role="contentinfo" aria-label="Site Footer">
      <div className="container">
        {/* Main Footer Multi-column Grid */}
        <div className="footer-grid">
          {/* Column 1: Brand & Profile */}
          <div className="footer-col brand-col">
            <div className="footer-logo-wrapper">
              <img
                src={getAssetPath('assets/logo-transparent.png')}
                alt="Shrikha Finserv Logo"
                className="footer-logo-img"
                width="64"
                height="62"
              />
            </div>
            <p className="footer-about-text">
              Established in 2026, Shrikha Finserv provides transparent financial solutions across Mysore and Karnataka, helping individuals and enterprises explore loans, insurance, and strategic advisory.
            </p>
            <div className="footer-badge-est">
              <ShieldCheck size={16} />
              <span>Registered in Mysore • Karnataka, India</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Navigation</h4>
            <ul className="footer-links-list">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    className="footer-nav-btn"
                    onClick={() => scrollTo(link.id)}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services Catalog */}
          <div className="footer-col">
            <h4 className="footer-heading">Our Services</h4>
            <ul className="footer-links-list">
              {serviceLinks.map((serviceName) => (
                <li key={serviceName}>
                  <button
                    type="button"
                    className="footer-nav-btn"
                    onClick={() => {
                      if (onSelectService) {
                        onSelectService(serviceName);
                      } else {
                        scrollTo('services');
                      }
                    }}
                  >
                    <span>{serviceName}</span>
                    <ArrowUpRight size={12} className="link-arrow" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Office */}
          <div className="footer-col contact-col">
            <h4 className="footer-heading">Mysore Office</h4>
            <address className="footer-address">
              <div className="footer-contact-item">
                <MapPin size={18} className="f-icon" />
                <span>
                  2nd floor, Wekreate Space - Midway Hub,<br />
                  block 9, Vishwamanava Double Road,<br />
                  Kuvempunagara North,<br />
                  Saraswathipuram, Mysuru,<br />
                  Karnataka 570009, India
                </span>
              </div>

              <div className="footer-contact-item">
                <Phone size={18} className="f-icon" />
                <a href="tel:8792953082" className="f-link">
                  8792953082
                </a>
              </div>

              <div className="footer-contact-item">
                <Mail size={18} className="f-icon" />
                <a href="mailto:shrikhafinserv@gmail.com" className="f-link">
                  shrikhafinserv@gmail.com
                </a>
              </div>

              <div className="footer-contact-item">
                <Clock size={18} className="f-icon" />
                <span>Monday – Saturday: 9:00 AM – 7:00 PM</span>
              </div>
            </address>
          </div>
        </div>

        {/* Regulatory & Financial Compliance Disclaimer */}
        <div className="footer-compliance-disclaimer">
          <h5>Regulatory & Financial Services Disclaimer</h5>
          <p>
            Shrikha Finserv is an independent financial services firm established in 2026. The information presented on this website is for general informational and educational purposes only. Shrikha Finserv does not guarantee loan sanctions, specific interest rates, credit approvals, insurance policy acceptances, or investment yields. All credit decisions, interest calculations, insurance underwriting, and terms and conditions are strictly within the sole discretion of the respective partner banks, NBFCs, or insurance underwriters. We do not charge arbitrary upfront loan approval fees. Prospective clients are advised to read all offer documents and terms thoroughly.
          </p>
        </div>

        {/* Bottom Bar: Copyright & Legal Policies */}
        <div className="footer-bottom-bar">
          <div className="copyright-text">
            © 2026 Shrikha Finserv. All rights reserved.
          </div>

          <div className="legal-links">
            <button
              type="button"
              className="legal-btn"
              onClick={() => onOpenLegal('privacy')}
            >
              Privacy Policy
            </button>
            <span className="legal-sep">•</span>
            <button
              type="button"
              className="legal-btn"
              onClick={() => onOpenLegal('terms')}
            >
              Terms & Conditions
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
