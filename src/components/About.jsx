import React from 'react';
import { ArrowRight, CheckCircle2, Calendar, MapPin, Building2, Shield } from 'lucide-react';
import { getAssetPath } from '../utils/assetHelper';

export default function About({ onDiscoverClick }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const keyPoints = [
    'Established in 2026 in Mysore, Karnataka with a clear mission of financial inclusion.',
    'Broad suite covering personal, SME, home, property, gold, vehicle, and education loans.',
    'Comprehensive insurance and investment guidance for families and business owners.',
    'Dedicated support for applicants across formal, informal, urban, semi-urban, and rural sectors.'
  ];

  return (
    <section id="about" className="section section-alt about-section" aria-label="About Shrikha Finserv">
      <div className="container">
        <div className="about-grid">
          {/* Left Column: Visual Asset */}
          <div className="about-visual-column">
            <div className="about-image-wrapper">
              <img
                src={getAssetPath('assets/images/about-guidance.jpg')}
                alt="Shrikha Finserv team providing clear financial guidance in Mysore office"
                className="about-image"
                width="600"
                height="450"
                loading="lazy"
              />
              <div className="about-badge-card">
                <div className="about-badge-icon">
                  <Calendar size={22} />
                </div>
                <div>
                  <div className="about-badge-title">Established 2026</div>
                  <div className="about-badge-subtitle">Mysore, Karnataka</div>
                </div>
              </div>
            </div>

            {/* Address callout chip */}
            <div className="about-location-chip">
              <MapPin size={18} className="chip-icon" />
              <span>Wekreate Space - Midway Hub, Kuvempunagara North, Saraswathipuram, Mysuru</span>
            </div>
          </div>

          {/* Right Column: Company Story & Purpose */}
          <div className="about-content-column">
            <div className="section-tag section-tag-gold">
              <Building2 size={14} />
              <span>About Shrikha Finserv</span>
            </div>

            <h2 className="section-title">
              Financial Guidance That <span className="highlight-text">Understands Your Needs.</span>
            </h2>

            <p className="about-lead-text">
              Shrikha Finserv was established in 2026 with an enduring commitment to delivering accessible financial solutions to those who need them most.
            </p>

            <p className="about-body-text">
              Whether you are an individual pursuing higher education or purchasing a family home, or an enterprise seeking working capital and commercial equipment, we help you navigate the landscape of loans, insurance, and investment options.
            </p>

            <p className="about-body-text">
              Our service specifically bridges the gap across urban, semi-urban, and rural Karnataka, actively supporting clients from both the formal corporate sector and the vital informal entrepreneurial economy.
            </p>

            <ul className="about-points-list">
              {keyPoints.map((point, index) => (
                <li key={index} className="about-point-item">
                  <CheckCircle2 size={18} className="point-icon" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="about-action-group">
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={onDiscoverClick || (() => scrollTo('services'))}
              >
                <span>Discover Our Services</span>
                <ArrowRight size={18} />
              </button>

              <div className="compliance-inline-notice">
                <Shield size={16} />
                <span>Transparent terms & provider-aligned advisory</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
