import React, { useState, useRef } from 'react';
import {
  Wallet,
  Home,
  Briefcase,
  Car,
  Coins,
  Building2,
  GraduationCap,
  HeartPulse,
  ShieldAlert,
  Umbrella,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  HelpCircle,
  Sparkles,
  Info,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { SERVICES, INVESTMENT_OVERVIEW } from '../data/services';

const ICON_MAP = {
  Wallet,
  Home,
  Briefcase,
  Car,
  Coins,
  Building2,
  GraduationCap,
  HeartPulse,
  ShieldAlert,
  Umbrella,
  TrendingUp
};

export default function Services({ onSelectService }) {
  const [activeCategory, setActiveCategory] = useState('All Services');
  const gridRef = useRef(null);

  const categories = ['All Services', 'Loans', 'Insurance', 'Investments'];

  const filteredServices = SERVICES.filter((service) => {
    if (activeCategory === 'All Services') return true;
    return service.category === activeCategory;
  });

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    if (gridRef.current) {
      gridRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  const handleScrollCards = (direction) => {
    if (gridRef.current) {
      const card = gridRef.current.querySelector('.service-card');
      const step = card ? card.offsetWidth + 18 : 300;
      gridRef.current.scrollBy({
        left: direction === 'left' ? -step : step,
        behavior: 'smooth'
      });
    }
  };

  const handleEnquire = (serviceItem) => {
    const isObj = typeof serviceItem === 'object' && serviceItem !== null;
    const serviceTitle = isObj ? serviceItem.title : serviceItem;
    const serviceId = isObj ? serviceItem.id : (
      serviceTitle === 'Personal Loan' ? 'personal-loan' : (serviceTitle === 'Home Loan' ? 'home-loan' : '')
    );

    if (serviceId === 'vehicle-loan' || serviceTitle === 'Vehicle Loan' || serviceTitle === 'Car Loan') {
      if (onSelectService) {
        onSelectService('Vehicle Loan', true, 'car-loan');
      }
      return;
    }

    if (serviceId === 'home-loan' || serviceTitle === 'Home Loan') {
      if (onSelectService) {
        onSelectService('Home Loan', true, 'home-loan');
      }
      return;
    }

    if (serviceId === 'business-loan' || serviceTitle === 'Business Loan') {
      if (onSelectService) {
        onSelectService('Business Loan', true, 'business-loan');
      }
      return;
    }

    if (serviceId === 'personal-loan' || serviceTitle === 'Personal Loan') {
      if (onSelectService) {
        onSelectService('Personal Loan', true, 'personal-loan');
      }
      return;
    }

    if (onSelectService) {
      onSelectService(serviceTitle, false);
    } else {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="services" className="section services-section" aria-label="Financial Services">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <Sparkles size={14} />
            <span>Comprehensive Solutions</span>
          </div>
          <h2 className="section-title">
            Financial Services Tailored to <span className="highlight-text">Your Life & Business</span>
          </h2>
          <p className="section-desc">
            Explore our curated suite of loan, insurance, and advisory options designed for individuals and enterprises across Karnataka.
          </p>
        </div>

        {/* Section G: Interactive Service Explorer Filter Tabs */}
        <div className="service-filter-wrapper" role="tablist" aria-label="Filter financial services">
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              className={`filter-tab-btn ${activeCategory === cat ? 'is-active' : ''}`}
              onClick={() => handleCategoryChange(cat)}
            >
              {cat}
              {cat === 'All Services' && <span className="tab-count">{SERVICES.length}</span>}
              {cat === 'Loans' && <span className="tab-count">{SERVICES.filter(s => s.category === 'Loans').length}</span>}
              {cat === 'Insurance' && <span className="tab-count">{SERVICES.filter(s => s.category === 'Insurance').length}</span>}
              {cat === 'Investments' && <span className="tab-count">Info</span>}
            </button>
          ))}
        </div>

        {/* Mobile Swipe Navigation Hint */}
        {activeCategory !== 'Investments' && (
          <div className="mobile-cards-scroll-hint" aria-hidden="true">
            <button
              type="button"
              className="mobile-scroll-arrow left"
              onClick={() => handleScrollCards('left')}
              aria-label="Previous card"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="mobile-scroll-text">
              Swipe right to left to view cards ({filteredServices.length})
            </span>
            <button
              type="button"
              className="mobile-scroll-arrow right"
              onClick={() => handleScrollCards('right')}
              aria-label="Next card"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* Services Grid (or Investment Card) */}
        {activeCategory === 'Investments' ? (
          <div className="investments-container">
            <div className="investment-card card-stagger-item" style={{ '--card-index': 0 }}>
              <div className="investment-header">
                <div className="investment-icon-box">
                  <TrendingUp size={32} />
                </div>
                <div>
                  <span className="badge badge-gold">Advisory & Guidance</span>
                  <h3 className="investment-title">{INVESTMENT_OVERVIEW.title}</h3>
                </div>
              </div>

              <p className="investment-desc">{INVESTMENT_OVERVIEW.shortDesc}</p>

              <div className="investment-features">
                <h4 className="features-title">What We Help You Evaluate:</h4>
                <ul className="features-list">
                  {INVESTMENT_OVERVIEW.features.map((feature, idx) => (
                    <li key={idx} className="feature-item">
                      <CheckCircle size={18} className="feature-icon" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="investment-disclaimer-box">
                <Info size={18} className="info-icon" />
                <p>{INVESTMENT_OVERVIEW.note}</p>
              </div>

              <div className="investment-actions">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleEnquire('Investment Services')}
                >
                  <span>Enquire About Investment Guidance</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="services-grid" ref={gridRef}>
            {filteredServices.map((service, index) => {
              const IconComp = ICON_MAP[service.iconName] || Wallet;
              return (
                <article
                  key={`${activeCategory}-${service.id}`}
                  className="service-card card-stagger-item"
                  id={`card-${service.id}`}
                  style={{ '--card-index': index }}
                >
                  <div className="service-card-top">
                    <div className="service-icon-box">
                      <IconComp size={24} className="service-icon" />
                    </div>
                    <span className="service-tag-badge">{service.tag}</span>
                  </div>

                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-desc">{service.shortDesc}</p>

                  <ul className="service-highlights-list">
                    {service.features.map((item, fIdx) => (
                      <li key={fIdx} className="service-highlight-item">
                        <CheckCircle size={15} className="check-bullet" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="service-card-footer">
                    <button
                      type="button"
                      className="service-enquire-btn"
                      onClick={() => handleEnquire(service)}
                      aria-label={`Enquire about ${service.title}`}
                    >
                      <span>{service.id === 'personal-loan' || service.title === 'Personal Loan' ? 'Enquiry Now →' : 'Enquire Now'}</span>
                      {service.id !== 'personal-loan' && service.title !== 'Personal Loan' && (
                        <ArrowRight size={16} className="btn-arrow" />
                      )}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Informative Note Strip */}
        <div className="services-footer-note">
          <HelpCircle size={18} className="note-icon" />
          <p>
            <strong>Note on Eligibility:</strong> Loan terms, interest rates, sanctions, insurance benefits, and exclusions are determined solely by the respective bank, NBFC, or insurer in accordance with applicable rules and applicant profile.
          </p>
        </div>
      </div>
    </section>
  );
}
