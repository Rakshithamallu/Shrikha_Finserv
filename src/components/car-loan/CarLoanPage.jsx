import React, { useState, useEffect } from 'react';
import AnnouncementBar from '../AnnouncementBar';
import CarLoanNav from './CarLoanNav';
import CarLoanHero from './CarLoanHero';
import CarLoanCalculator from './CarLoanCalculator';
import CarLoanEnquiryForm from './CarLoanEnquiryForm';
import CarLoanWhyUs from './CarLoanWhyUs';
import CarLoanHowItWorks from './CarLoanHowItWorks';
import CarLoanFAQ from './CarLoanFAQ';
import Footer from '../Footer';
import LegalModal from '../LegalModal';
import { ArrowUp, MessageCircle, AlertTriangle, ArrowLeft } from 'lucide-react';
import '../../styles/car-loan.css';

export default function CarLoanPage({ onNavigateHome }) {
  const [legalModalState, setLegalModalState] = useState({ isOpen: false, type: 'privacy' });
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Prefill state from calculator to enquiry form
  const [calculatorPrefill, setCalculatorPrefill] = useState({
    carType: 'New Car',
    loanAmount: 1000000,
    tenureYears: 5
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
    const el = document.getElementById('car-loan-calculator');
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const scrollToEnquiry = () => {
    const el = document.getElementById('car-loan-enquiry-form');
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const handleProceedToEnquiry = (calcData) => {
    setCalculatorPrefill({
      carType: calcData.carType,
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
    <div className="car-loan-page-wrapper">
      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Dedicated Header */}
      <CarLoanNav
        onNavigateHome={onNavigateHome}
        onEnquireClick={scrollToEnquiry}
      />

      {/* Main Page Content */}
      <main id="car-loan-main">
        {/* Section A: Hero */}
        <CarLoanHero
          onBackToServices={() => onNavigateHome('services')}
          onCalculateClick={scrollToCalculator}
          onEnquireClick={scrollToEnquiry}
        />

        {/* Section B: Calculator & Purchase Planner */}
        <CarLoanCalculator
          onProceedToEnquiry={handleProceedToEnquiry}
        />

        {/* Section C: Enquiry Form */}
        <CarLoanEnquiryForm
          initialValues={calculatorPrefill}
          updatedFromCalculatorTimestamp={prefillTimestamp}
        />

        {/* Section D: Why Choose Us */}
        <CarLoanWhyUs />

        {/* Section E: How It Works */}
        <CarLoanHowItWorks />

        {/* Section F: FAQs */}
        <CarLoanFAQ />

        {/* Section G: Financial Disclaimer */}
        <section className="section pl-disclaimer-section cl-disclaimer-section" aria-label="Financial Disclaimer">
          <div className="container container-narrow">
            <div className="pl-mandatory-disclaimer-card cl-disclaimer-card">
              <div className="disclaimer-header">
                <AlertTriangle size={20} className="disclaimer-icon" />
                <h4 className="disclaimer-title">Regulatory & Vehicle Financing Disclaimer</h4>
              </div>
              <p className="disclaimer-body">
                This Car Loan EMI Calculator provides illustrative estimates based on the values entered by the user. Actual interest rates, eligibility, loan amounts, repayment periods, processing fees, and other charges depend on the lender, vehicle type, applicant profile, and applicable terms. The calculator does not guarantee loan approval or constitute a loan offer.
              </p>
              <div className="disclaimer-footer-row">
                <span>Shrikha Finserv • 2nd floor, Wekreate Space - Midway Hub, Kuvempunagara North, Saraswathipuram, Mysuru – 570009</span>
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
          if (serviceTitle === 'Vehicle Loan' || serviceTitle === 'Car Loan') {
            scrollToEnquiry();
          } else {
            onNavigateHome('services');
          }
        }}
      />

      {/* Floating Action Controls */}
      <a
        href="https://wa.me/918792953082?text=Hello%20Shrikha%20Finserv,%20I%20would%20like%20to%20enquire%20about%20a%20Car%20Loan."
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
