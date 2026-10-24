import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X, Phone, ArrowLeft, Send } from 'lucide-react';
import { getAssetPath } from '../../utils/assetHelper';

export default function CarLoanNav({ onNavigateHome, onEnquireClick }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Home', sectionId: 'hero' },
    { label: 'About Us', sectionId: 'about' },
    { label: 'Services', sectionId: 'services' },
    { label: 'Why Choose Us', sectionId: 'why-us' },
    { label: 'How It Works', sectionId: 'how-it-works' },
    { label: 'FAQs', sectionId: 'faqs' },
    { label: 'Contact', sectionId: 'contact' }
  ];

  const handleNavLinkClick = (sectionId) => {
    setMobileMenuOpen(false);
    onNavigateHome(sectionId);
  };

  return (
    <header className={`navbar-header ${isScrolled ? 'is-sticky' : ''}`}>
      <div className="container navbar-container">
        {/* Brand Logo & Back to Services Chip */}
        <div className="pl-nav-brand-group">
          <a
            href="/"
            className="navbar-brand"
            onClick={(e) => {
              e.preventDefault();
              onNavigateHome('hero');
            }}
            aria-label="Shrikha Finserv Home"
          >
            <img
              src={getAssetPath('assets/logo-transparent.png')}
              alt="Shrikha Finserv Logo"
              className="navbar-logo-img"
              width="56"
              height="54"
            />
            <span className="navbar-brand-text">
              SHRIKHA <span className="brand-text-gold">FINSERV</span>
            </span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="navbar-nav desktop-nav" aria-label="Main Navigation">
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.sectionId} className="nav-item">
                <button
                  type="button"
                  className={`nav-link ${link.sectionId === 'services' ? 'is-active' : ''}`}
                  onClick={() => handleNavLinkClick(link.sectionId)}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Actions */}
        <div className="navbar-actions desktop-actions">
          <a
            href="tel:8792953082"
            className="nav-phone-btn"
            aria-label="Call 8792953082"
            title="Call Shrikha Finserv"
          >
            <Phone size={16} />
            <span>8792953082</span>
          </a>

          <button
            type="button"
            className="btn btn-gold btn-sm nav-enquire-btn"
            onClick={onEnquireClick}
            id="nav-cl-enquire-desktop"
          >
            <span>Enquire Now</span>
            <Send size={14} />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          className="mobile-toggle-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Drawer Portal */}
      {typeof document !== 'undefined' && createPortal(
        <>
          <div
            className={`mobile-drawer-overlay ${mobileMenuOpen ? 'is-open' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          <div
            className={`mobile-drawer ${mobileMenuOpen ? 'is-open' : ''}`}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
          >
            <div className="mobile-drawer-header">
              <img
                src={getAssetPath('assets/logo-transparent.png')}
                alt="Shrikha Finserv Logo"
                className="mobile-logo-img"
                width="50"
                height="48"
              />
              <button
                type="button"
                className="mobile-close-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="mobile-drawer-nav">
              <ul className="mobile-nav-list">
                <li className="mobile-nav-item">
                  <button
                    type="button"
                    className="mobile-nav-link text-gold"
                    onClick={() => handleNavLinkClick('services')}
                  >
                    <ArrowLeft size={16} />
                    <span>Back to All Services</span>
                  </button>
                </li>
                {navLinks.map((link) => (
                  <li key={link.sectionId} className="mobile-nav-item">
                    <button
                      type="button"
                      className={`mobile-nav-link ${link.sectionId === 'services' ? 'is-active' : ''}`}
                      onClick={() => handleNavLinkClick(link.sectionId)}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mobile-drawer-footer">
              <a
                href="tel:8792953082"
                className="btn btn-secondary mobile-call-btn"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Phone size={18} />
                <span>Call 8792953082</span>
              </a>

              <button
                type="button"
                className="btn btn-gold mobile-enquire-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onEnquireClick();
                }}
              >
                <span>Enquire Now</span>
                <Send size={18} />
              </button>
            </div>
          </div>
        </>,
        document.body
      )}
    </header>
  );
}
