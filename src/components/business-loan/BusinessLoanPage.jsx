import React, { useState, useEffect } from 'react';
import AnnouncementBar from '../AnnouncementBar';
import BusinessLoanNav from './BusinessLoanNav';
import BusinessLoanHero from './BusinessLoanHero';
import BusinessLoanCalculator from './BusinessLoanCalculator';
import BusinessLoanEnquiryForm from './BusinessLoanEnquiryForm';
import BusinessLoanWhyUs from './BusinessLoanWhyUs';
import BusinessLoanHowItWorks from './BusinessLoanHowItWorks';
import BusinessLoanFAQ from './BusinessLoanFAQ';
import Footer from '../Footer';
import LegalModal from '../LegalModal';
import { ArrowUp, MessageCircle, AlertTriangle, ArrowLeft } from 'lucide-react';
import '../../styles/business-loan.css';

export default function BusinessLoanPage({ onNavigateHome }) {
  const [legalModalState, setLegalModalState] = useState({ isOpen: false, type: 'privacy' });
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Prefill state from calculator to enquiry form
  const [calculatorPrefill, setCalculatorPrefill] = useState({
    loanAmount: 500000,
    tenureYears: 3,
    loanPurpose: 'Working Capital'
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
    const el = document.getElementById('business-loan-calculator');
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const scrollToEnquiry = () => {
    const el = document.getElementById('business-loan-enquiry-form');
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const handleProceedToEnquiry = (calcData) => {
    setCalculatorPrefill({
      loanAmount: calcData.loanAmount,
      tenureYears: calcData.tenureYears,
      loanPurpose: calcData.loanPurpose || 'Working Capital'
    });
    setPrefillTimestamp(Date.now());
    scrollToEnquiry();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="business-loan-page-wrapper">
      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Dedicated Header */}
      <BusinessLoanNav
        onNavigateHome={onNavigateHome}
        onEnquireClick={scrollToEnquiry}
      />

      {/* Main Page Content */}
      <main id="business-loan-main">
        {/* Section A: Hero */}
        <BusinessLoanHero
          onBackToServices={() => onNavigateHome('services')}
          onCalculateClick={scrollToCalculator}
          onEnquireClick={scrollToEnquiry}
        />

        {/* Section B: Calculator & Business Funding Planner */}
        <BusinessLoanCalculator
          onProceedToEnquiry={handleProceedToEnquiry}
        />

        {/* Section C: Enquiry Form */}
        <BusinessLoanEnquiryForm
          initialValues={calculatorPrefill}
          updatedFromCalculatorTimestamp={prefillTimestamp}
        />

        {/* Section D: Why Choose Us */}
        <BusinessLoanWhyUs />

        {/* Section E: How It Works */}
        <BusinessLoanHowItWorks />

        {/* Section F: FAQs */}
        <BusinessLoanFAQ />

        {/* Section G: Financial Disclaimer */}
        <section className="section pl-disclaimer-section bl-disclaimer-section" aria-label="Financial Disclaimer">
          <div className="container container-narrow">
            <div className="pl-mandatory-disclaimer-card bl-disclaimer-card">
              <div className="disclaimer-header">
                <AlertTriangle size={20} className="disclaimer-icon" />
                <h4 className="disclaimer-title">Regulatory & Commercial Financing Disclaimer</h4>
              </div>
              <p className="disclaimer-body">
                This Business Loan EMI Calculator provides illustrative estimates based on the information entered. Actual interest rates, loan amounts, repayment periods, eligibility, processing fees, and other charges depend on the lender's policies and the applicant's business profile. The results do not constitute a loan offer or guarantee approval.
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
          if (serviceTitle === 'Business Loan') {
            scrollToEnquiry();
          } else {
            onNavigateHome('services');
          }
        }}
      />

      {/* Floating Action Controls */}
      <a
        href="https://wa.me/918792953082?text=Hello%20Shrikha%20Finserv,%20I%20would%20like%20to%20enquire%20about%20a%20Business%20Loan."
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Chat with Shrikha Finserv on WhatsApp regarding Business Loans"
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
