import React, { useState, useEffect } from 'react';
import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustHighlights from './components/TrustHighlights';
import About from './components/About';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import HowItWorks from './components/HowItWorks';
import CTASection from './components/CTASection';
import FAQ from './components/FAQ';
import ContactForm from './components/ContactForm';
import Location from './components/Location';
import Footer from './components/Footer';
import LegalModal from './components/LegalModal';
import PersonalLoanPage from './components/personal-loan/PersonalLoanPage';
import HomeLoanPage from './components/home-loan/HomeLoanPage';
import CarLoanPage from './components/car-loan/CarLoanPage';
import BusinessLoanPage from './components/business-loan/BusinessLoanPage';
import { useScrollSpy } from './hooks/useScrollSpy';
import { ArrowUp, MessageCircle } from 'lucide-react';

const SECTIONS = ['hero', 'about', 'services', 'why-us', 'how-it-works', 'faqs', 'contact', 'location'];

export default function App() {
  const activeSection = useScrollSpy(SECTIONS, 120);
  const [preselectedService, setPreselectedService] = useState('Personal Loan');
  const [legalModalState, setLegalModalState] = useState({ isOpen: false, type: 'privacy' });
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Path & Hash Routing State
  const [currentPath, setCurrentPath] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname;
    }
    return '/';
  });

  const [currentHash, setCurrentHash] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.hash;
    }
    return '';
  });

  // Check if current route corresponds to the dedicated Business Loan page
  const isBusinessLoanPage = (() => {
    const p = (currentPath || '').toLowerCase();
    const h = (currentHash || '').toLowerCase();
    return (
      p === '/services/business-loan' ||
      p === '/services/business-loan/' ||
      p.endsWith('/services/business-loan') ||
      p.endsWith('/services/business-loan/') ||
      h === '#business-loan' ||
      h === '#/services/business-loan'
    );
  })();

  // Check if current route corresponds to the dedicated Car Loan page
  const isCarLoanPage = (() => {
    const p = (currentPath || '').toLowerCase();
    const h = (currentHash || '').toLowerCase();
    return (
      p === '/services/car-loan' ||
      p === '/services/car-loan/' ||
      p.endsWith('/services/car-loan') ||
      p.endsWith('/services/car-loan/') ||
      h === '#car-loan' ||
      h === '#/services/car-loan'
    );
  })();

  // Check if current route corresponds to the dedicated Home Loan page
  const isHomeLoanPage = (() => {
    const p = (currentPath || '').toLowerCase();
    const h = (currentHash || '').toLowerCase();
    return (
      p === '/services/home-loan' ||
      p === '/services/home-loan/' ||
      p.endsWith('/services/home-loan') ||
      p.endsWith('/services/home-loan/') ||
      h === '#home-loan' ||
      h === '#/services/home-loan'
    );
  })();

  // Check if current route corresponds to the dedicated Personal Loan page
  const isPersonalLoanPage = (() => {
    const p = (currentPath || '').toLowerCase();
    const h = (currentHash || '').toLowerCase();
    return (
      p === '/personal-loan-enquiry' ||
      p === '/personal-loan-enquiry/' ||
      p.endsWith('/personal-loan-enquiry') ||
      p.endsWith('/personal-loan-enquiry/') ||
      p === '/services/personal-loan' ||
      p === '/services/personal-loan/' ||
      p.endsWith('/services/personal-loan') ||
      p.endsWith('/services/personal-loan/') ||
      h === '#personal-loan' ||
      h === '#personal-loan-enquiry' ||
      h === '#/personal-loan-enquiry' ||
      h === '#/services/personal-loan'
    );
  })();

  // Listen for browser Back/Forward (popstate)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
      setCurrentHash(window.location.hash);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Ensure page remains static at the top on refresh unless navigating to a specific anchor hash
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      if (!window.location.hash) {
        window.scrollTo(0, 0);
      }
    }
  }, []);

  // Sync document page title
  useEffect(() => {
    if (isBusinessLoanPage) {
      document.title = 'Business Loan Enquiry & EMI Calculator | Shrikha Finserv';
    } else if (isCarLoanPage) {
      document.title = 'Car Loan Enquiry & EMI Calculator | Shrikha Finserv';
    } else if (isHomeLoanPage) {
      document.title = 'Home Loan Enquiry & EMI Calculator | Shrikha Finserv';
    } else if (isPersonalLoanPage) {
      document.title = 'Personal Loan Enquiry & EMI Calculator | Shrikha Finserv';
    } else {
      document.title = 'Shrikha Finserv | Loans, Insurance & Financial Services in Mysore';
    }
  }, [isBusinessLoanPage, isCarLoanPage, isHomeLoanPage, isPersonalLoanPage]);

  // Back to top scroll watcher
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  /**
   * Internal router navigation function supporting URL updates and anchor offsets
   */
  const navigateTo = (path, anchorId = null) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      setCurrentPath(window.location.pathname);
      setCurrentHash(window.location.hash);

      if (anchorId) {
        setTimeout(() => {
          const el = document.getElementById(anchorId);
          if (el) {
            const headerOffset = 80;
            const elementPosition = el.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }, 60);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  /**
   * Handles enquiry request:
   * - If Home Loan card -> Navigates to /services/home-loan
   * - If Personal Loan card -> Navigates to /services/personal-loan
   * - Other services -> Preselects service and smoothly scrolls to contact form on main page
   */
  const handleEnquireService = (serviceName, navigateToDedicated = false, dedicatedRoute = '') => {
    if (navigateToDedicated) {
      if (dedicatedRoute === 'business-loan' || serviceName === 'Business Loan') {
        navigateTo('/services/business-loan');
        return;
      }
      if (dedicatedRoute === 'car-loan' || serviceName === 'Vehicle Loan' || serviceName === 'Car Loan') {
        navigateTo('/services/car-loan');
        return;
      }
      if (dedicatedRoute === 'home-loan' || serviceName === 'Home Loan') {
        navigateTo('/services/home-loan');
        return;
      }
      if (dedicatedRoute === 'personal-loan' || serviceName === 'Personal Loan') {
        navigateTo('/personal-loan-enquiry');
        return;
      }
    }

    setPreselectedService(serviceName);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const headerOffset = 80;
      const elementPosition = contactSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const openLegalModal = (type) => {
    setLegalModalState({ isOpen: true, type });
  };

  const closeLegalModal = () => {
    setLegalModalState(prev => ({ ...prev, isOpen: false }));
  };

  // If viewing the dedicated Business Loan Enquiry & EMI Calculator page
  if (isBusinessLoanPage) {
    return (
      <BusinessLoanPage
        onNavigateHome={(anchorId) => {
          navigateTo(anchorId ? `/#${anchorId}` : '/', anchorId);
        }}
      />
    );
  }

  // If viewing the dedicated Car Loan Enquiry & EMI Calculator page
  if (isCarLoanPage) {
    return (
      <CarLoanPage
        onNavigateHome={(anchorId) => {
          navigateTo(anchorId ? `/#${anchorId}` : '/', anchorId);
        }}
      />
    );
  }

  // If viewing the dedicated Home Loan Enquiry & EMI Calculator page
  if (isHomeLoanPage) {
    return (
      <HomeLoanPage
        onNavigateHome={(anchorId) => {
          navigateTo(anchorId ? `/#${anchorId}` : '/', anchorId);
        }}
      />
    );
  }

  // If viewing the dedicated Personal Loan Enquiry & EMI Calculator page
  if (isPersonalLoanPage) {
    return (
      <PersonalLoanPage
        onNavigateHome={(anchorId) => {
          navigateTo(anchorId ? `/#${anchorId}` : '/', anchorId);
        }}
      />
    );
  }

  return (
    <div className="app-wrapper">
      {/* Section A: Announcement Bar */}
      <AnnouncementBar />

      {/* Section B: Sticky Responsive Navbar */}
      <Navbar
        activeSection={activeSection}
        onEnquireClick={() => handleEnquireService('Personal Loan')}
      />

      {/* Main Content Sections */}
      <main id="main-content">
        {/* Section C: Hero Section */}
        <Hero
          onExploreClick={() => {
            const el = document.getElementById('services');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onContactClick={() => handleEnquireService('Personal Loan')}
        />

        {/* Section D: Trust & Coverage Highlights */}
        <TrustHighlights />

        {/* Section E: About Shrikha Finserv */}
        <About
          onDiscoverClick={() => {
            const el = document.getElementById('services');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Section F & G: Financial Services & Interactive Explorer */}
        <Services onSelectService={handleEnquireService} />

        {/* Section H: Why Choose Us */}
        <WhyChooseUs />

        {/* Section I: How It Works */}
        <HowItWorks />

        {/* Section J: Distinctive CTA Banner */}
        <CTASection onEnquireClick={() => handleEnquireService('Personal Loan')} />

        {/* Section K: FAQ Accordion */}
        <FAQ />

        {/* Section L: Contact & Enquiry Section */}
        <ContactForm preselectedService={preselectedService} />

        {/* Section M: Location & Map */}
        <Location />
      </main>

      {/* Section N: Footer */}
      <Footer
        onOpenLegal={openLegalModal}
        onSelectService={handleEnquireService}
      />

      {/* Floating Action Controls */}
      {/* 1. Official WhatsApp Click-to-Chat Button */}
      <a
        href="https://wa.me/918792953082?text=Hello%20Shrikha%20Finserv,%20I%20would%20like%20to%20enquire%20about%20your%20financial%20services."
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Chat with Shrikha Finserv on WhatsApp"
        title="Chat on WhatsApp (8792953082)"
      >
        <MessageCircle size={20} />
        <span>WhatsApp</span>
      </a>

      {/* 2. Back to Top Button */}
      <button
        type="button"
        className={`back-to-top ${showBackToTop ? 'show' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll back to top"
      >
        <ArrowUp size={20} />
      </button>

      {/* 3. Legal & Privacy Modal */}
      <LegalModal
        isOpen={legalModalState.isOpen}
        type={legalModalState.type}
        onClose={closeLegalModal}
      />
    </div>
  );
}
