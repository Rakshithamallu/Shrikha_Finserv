import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, ArrowRight } from 'lucide-react';

export default function Navbar({ activeSection, onEnquireClick }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
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
    { label: 'Home', href: '#hero', id: 'hero' },
    { label: 'About Us', href: '#about', id: 'about' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Why Choose Us', href: '#why-us', id: 'why-us' },
    { label: 'How It Works', href: '#how-it-works', id: 'how-it-works' },
    { label: 'FAQs', href: '#faqs', id: 'faqs' },
    { label: 'Contact', href: '#contact', id: 'contact' }
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleEnquireAction = () => {
    setMobileMenuOpen(false);
    if (onEnquireClick) {
      onEnquireClick();
    } else {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className={`navbar-header ${isScrolled ? 'is-sticky' : ''}`}>
      <div className="container navbar-container">
        {/* Brand Logo */}
        <a
          href="#hero"
          className="navbar-brand"
          onClick={(e) => handleLinkClick(e, '#hero')}
          aria-label="Shrikha Finserv Home"
        >
          <img
            src="assets/logo-transparent.png"
            alt="Shrikha Finserv Logo"
            className="navbar-logo-img"
            width="56"
            height="54"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="navbar-nav desktop-nav" aria-label="Main Navigation">
          <ul className="nav-list">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.id} className="nav-item">
                  <a
                    href={link.href}
                    className={`nav-link ${isActive ? 'is-active' : ''}`}
                    onClick={(e) => handleLinkClick(e, link.href)}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Action Buttons (Desktop) */}
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
            onClick={handleEnquireAction}
            id="nav-enquire-desktop"
          >
            <span>Enquire Now</span>
            <ArrowRight size={14} />
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

      {/* Mobile Navigation Drawer */}
      <div
        className={`mobile-drawer-overlay ${mobileMenuOpen ? 'is-open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      <div className={`mobile-drawer ${mobileMenuOpen ? 'is-open' : ''}`} role="dialog" aria-modal="true" aria-label="Mobile Navigation">
        <div className="mobile-drawer-header">
          <img
            src="assets/logo-transparent.png"
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
            {navLinks.map((link) => (
              <li key={link.id} className="mobile-nav-item">
                <a
                  href={link.href}
                  className={`mobile-nav-link ${activeSection === link.id ? 'is-active' : ''}`}
                  onClick={(e) => handleLinkClick(e, link.href)}
                >
                  {link.label}
                </a>
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
            onClick={handleEnquireAction}
          >
            <span>Enquire Now</span>
            <ArrowRight size={18} />
          </button>

          <p className="mobile-address-preview">
            MIG 12, Block No. 9, WeCreate Space,<br />
            Saraswathipuram, Mysore – 570009
          </p>
        </div>
      </div>
    </header>
  );
}
