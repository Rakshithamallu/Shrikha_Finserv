import React from 'react';
import { ArrowRight, PhoneCall, ShieldCheck, Landmark, MapPin, Sparkles } from 'lucide-react';

export default function Hero({ onExploreClick, onContactClick }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero-section" aria-label="Hero Introduction">
      {/* Background Decorative Accents */}
      <div className="hero-bg-shapes" aria-hidden="true">
        <div className="hero-shape hero-shape-1" />
        <div className="hero-shape hero-shape-2" />
        <div className="hero-pattern-dots" />
      </div>

      <div className="container hero-container">
        {/* Left Column: Hero Content */}
        <div className="hero-content">
          <div className="hero-badge-group">
            <span className="hero-pill">
              <Sparkles size={14} className="hero-pill-icon" />
              <span>Established 2026 • Mysore, Karnataka</span>
            </span>
          </div>

          <h1 className="hero-title">
            Financial Solutions for Every Step of Your <span className="highlight-text">Journey.</span>
          </h1>

          <p className="hero-description">
            From personal and business loans to insurance and investment services, Shrikha Finserv helps you explore financial solutions tailored to your unique needs across Karnataka.
          </p>

          <div className="hero-cta-group">
            <button
              type="button"
              className="btn btn-gold btn-lg hero-btn-primary"
              onClick={onExploreClick || (() => scrollTo('services'))}
              id="hero-explore-cta"
            >
              <span>Explore Our Services</span>
              <ArrowRight size={18} />
            </button>

            <button
              type="button"
              className="btn btn-secondary btn-lg hero-btn-secondary"
              onClick={onContactClick || (() => scrollTo('contact'))}
              id="hero-contact-cta"
            >
              <PhoneCall size={18} />
              <span>Talk to Our Team</span>
            </button>
          </div>

          {/* Service Highlights Strip */}
          <div className="hero-feature-tags" aria-label="Core service categories">
            <div className="hero-tag-item">
              <div className="tag-dot" />
              <span>Personal & Business Loans</span>
            </div>
            <div className="hero-tag-item">
              <div className="tag-dot" />
              <span>Insurance Solutions</span>
            </div>
            <div className="hero-tag-item">
              <div className="tag-dot" />
              <span>Support Across Karnataka</span>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Composition */}
        <div className="hero-visual-wrapper">
          <div className="hero-image-frame">
            <img
              src="assets/images/hero-consultation.jpg"
              alt="Professional Shrikha Finserv advisor discussing financial solutions with clients in modern Karnataka office"
              className="hero-main-img"
              width="640"
              height="480"
              loading="eager"
            />
            <div className="hero-img-gradient-overlay" aria-hidden="true" />

            {/* Floating Highlight Card 1: Mysore Presence */}
            <div className="hero-floating-card hero-floating-card-1">
              <div className="floating-card-icon gold-icon">
                <MapPin size={20} />
              </div>
              <div className="floating-card-text">
                <span className="floating-label">Regional Presence</span>
                <strong className="floating-val">Saraswathipuram, Mysore</strong>
              </div>
            </div>

            {/* Floating Highlight Card 2: Guidance Badge */}
            <div className="hero-floating-card hero-floating-card-2">
              <div className="floating-card-icon blue-icon">
                <Landmark size={20} />
              </div>
              <div className="floating-card-text">
                <span className="floating-label">Comprehensive Scope</span>
                <strong className="floating-val">Loans • Insurance • Planning</strong>
              </div>
            </div>

            {/* Floating Corner Ribbon */}
            <div className="hero-ribbon">
              <ShieldCheck size={16} />
              <span>Ethical & Transparent</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
