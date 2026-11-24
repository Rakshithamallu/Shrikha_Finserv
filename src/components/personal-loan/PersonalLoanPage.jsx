import React, { useState, useEffect } from 'react';
import AnnouncementBar from '../AnnouncementBar';
import PersonalLoanNav from './PersonalLoanNav';
import PersonalLoanEnquiry from './PersonalLoanEnquiry';
import Footer from '../Footer';
import LegalModal from '../LegalModal';
import { ArrowUp, MessageCircle } from 'lucide-react';
import '../../styles/personal-loan.css';

export default function PersonalLoanPage({ onNavigateHome }) {
  const [legalModalState, setLegalModalState] = useState({ isOpen: false, type: 'privacy' });
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 350);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToEnquiry = () => {
    const el = document.getElementById('personal-loan-enquiry-form');
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="personal-loan-page-wrapper">
      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Dedicated Sticky Header */}
      <PersonalLoanNav
        onNavigateHome={onNavigateHome}
        onEnquireClick={scrollToEnquiry}
      />

      {/* Main Page Content: Personal Loan Dedicated Enquiry & Calculator Experience */}
      <main id="personal-loan-main">
        <PersonalLoanEnquiry onBackToServices={onNavigateHome} />
      </main>

      {/* Footer */}
      <Footer
        onOpenLegal={(type) => setLegalModalState({ isOpen: true, type })}
        onSelectService={(serviceTitle) => {
          if (serviceTitle === 'Personal Loan') {
            scrollToEnquiry();
          } else {
            onNavigateHome('services');
          }
        }}
      />

      {/* Floating Action Controls */}
      <a
        href="https://wa.me/918792953082?text=Hello%20Shrikha%20Finserv,%20I%20would%20like%20to%20enquire%20about%20a%20Personal%20Loan."
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

      {/* Legal Modal */}
      <LegalModal
        isOpen={legalModalState.isOpen}
        type={legalModalState.type}
        onClose={() => setLegalModalState(prev => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
