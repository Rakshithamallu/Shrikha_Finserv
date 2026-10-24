import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, ArrowLeft, Send } from 'lucide-react';
import { getAssetPath } from '../../utils/assetHelper';

export default function BusinessLoanNav({ onNavigateHome, onEnquireClick }) {
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
            id="nav-bl-enquire-desktop"
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

      {/* Mobile Drawer Overlay */}
      <div
        className={`mobile-drawer-overlay ${mobileMenuOpen ? 'is-open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Drawer Menu */}
      <div
        className={`mobile-drawer ${mobileMenuOpen ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="mobile-drawer-header">
          <img
            src={getAssetPath('assets/logo-transparent.png')}
            alt="Shrikha Finserv"
            className="mobile-drawer-logo"
            width="48"
            height="46"
          />
          <button
            type="button"
            className="drawer-close-btn"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <div className="mobile-drawer-body">
          <button
            type="button"
            className="mobile-back-services-btn"
            onClick={() => {
              setMobileMenuOpen(false);
              onNavigateHome('services');
            }}
          >
            <ArrowLeft size={16} />
            <span>Return to All Services</span>
          </button>

          <ul className="mobile-nav-list">
            {navLinks.map((link) => (
              <li key={link.sectionId} className="mobile-nav-item">
                <button
                  type="button"
                  className="mobile-nav-link"
                  onClick={() => handleNavLinkClick(link.sectionId)}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="mobile-drawer-actions">
            <a href="tel:8792953082" className="mobile-phone-link">
              <Phone size={18} />
              <span>Call: 8792953082</span>
            </a>

            <button
              type="button"
              className="btn btn-gold btn-block"
              onClick={() => {
                setMobileMenuOpen(false);
                onEnquireClick();
              }}
            >
              <span>Enquire About Business Loan</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
