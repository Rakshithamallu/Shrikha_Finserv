import React, { useState, useEffect } from 'react';
import AnnouncementBar from '../AnnouncementBar';
import HomeLoanNav from './HomeLoanNav';
import HomeLoanHero from './HomeLoanHero';
import HomeLoanCalculator from './HomeLoanCalculator';
import HomeLoanEnquiryForm from './HomeLoanEnquiryForm';
import HomeLoanWhyUs from './HomeLoanWhyUs';
import HomeLoanHowItWorks from './HomeLoanHowItWorks';
import HomeLoanFAQ from './HomeLoanFAQ';
import Footer from '../Footer';
import LegalModal from '../LegalModal';
import { ArrowUp, MessageCircle, AlertTriangle, ArrowLeft } from 'lucide-react';
import '../../styles/home-loan.css';

export default function HomeLoanPage({ onNavigateHome }) {
  const [legalModalState, setLegalModalState] = useState({ isOpen: false, type: 'privacy' });
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Prefill state from calculator to enquiry form
  const [calculatorPrefill, setCalculatorPrefill] = useState({
    loanAmount: 2500000,
    tenureYears: 20
  });
  const [prefillTimestamp, setPrefillTimestamp] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 350);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToCalculator = () => {
    const el = document.getElementById('home-loan-calculator');
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const scrollToEnquiry = () => {
    const el = document.getElementById('home-loan-enquiry-form');
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const handleProceedToEnquiry = (calcData) => {
    setCalculatorPrefill({
      loanAmount: calcData.loanAmount,
      tenureYears: calcData.tenureYears
    });
    setPrefillTimestamp(Date.now());
    scrollToEnquiry();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="home-loan-page-wrapper">
      {/* Section A: Top Announcement Bar */}
      <AnnouncementBar />

      {/* Section B: Dedicated Sticky Header */}
      <HomeLoanNav
        onNavigateHome={onNavigateHome}
        onEnquireClick={scrollToEnquiry}
      />

      {/* Main Content */}
      <main id="home-loan-main">
        {/* Section C: Hero Section */}
        <HomeLoanHero
          onBackToServices={() => onNavigateHome('services')}
          onCalculateClick={scrollToCalculator}
          onEnquireClick={scrollToEnquiry}
        />

        {/* Section D: Advanced Home Loan EMI Calculator & Property Planner */}
        <HomeLoanCalculator
          onProceedToEnquiry={handleProceedToEnquiry}
        />

        {/* Section E: Dedicated Home Loan Enquiry Form */}
        <HomeLoanEnquiryForm
          initialValues={calculatorPrefill}
          updatedFromCalculatorTimestamp={prefillTimestamp}
        />

        {/* Section F: Why Choose Shrikha Finserv */}
        <HomeLoanWhyUs />

        {/* Section G: How It Works */}
        <HomeLoanHowItWorks />

        {/* Section H: Frequently Asked Questions */}
        <HomeLoanFAQ />

        {/* Section I: Mandatory Financial Disclaimer */}
        <section className="section pl-disclaimer-section hl-disclaimer-section" aria-label="Financial Disclaimer">
          <div className="container container-narrow">
            <div className="pl-mandatory-disclaimer-card hl-disclaimer-card">
              <div className="disclaimer-header">
                <AlertTriangle size={20} className="disclaimer-icon" />
                <h4 className="disclaimer-title">Regulatory & Financial Disclaimer</h4>
              </div>
              <p className="disclaimer-body">
                This Home Loan EMI Calculator provides illustrative estimates based on the information entered by the user. Actual loan eligibility, interest rates, tenure, processing fees, down payment requirements, and repayment obligations depend on the lender's policies and the applicant's profile. The results do not constitute a loan offer, guarantee approval, or replace formal lender assessment.
              </p>
              <div className="disclaimer-footer-row">
                <span>Shrikha Finserv • MIG 12, Block No. 9, WeCreate Space, Saraswathipuram, Mysore – 570009</span>
                <button
                  type="button"
                  className="btn-back-services-link"
                  onClick={() => onNavigateHome('services')}
                >
                  <ArrowLeft size={14} />
                  <span>Return to All Services</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer
        onOpenLegal={(type) => setLegalModalState({ isOpen: true, type })}
        onSelectService={(serviceTitle) => {
          if (serviceTitle === 'Home Loan') {
            scrollToEnquiry();
          } else if (serviceTitle === 'Personal Loan') {
            onNavigateHome('services');
          } else {
            onNavigateHome('services');
          }
        }}
      />

      {/* Floating Action Controls */}
      <a
        href="https://wa.me/918792953082?text=Hello%20Shrikha%20Finserv,%20I%20would%20like%20to%20enquire%20about%20a%20Home%20Loan."
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Chat with Shrikha Finserv on WhatsApp"
        title="Chat on WhatsApp (8792953082)"
      >
        <MessageCircle size={20} />
        <span>WhatsApp</span>
      </a>

      <button
        type="button"
        className={`back-to-top ${showBackToTop ? 'show' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll back to top"
      >
        <ArrowUp size={20} />
      </button>

      {/* Legal & Privacy Modal */}
      <LegalModal
        isOpen={legalModalState.isOpen}
        type={legalModalState.type}
        onClose={() => setLegalModalState(prev => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
