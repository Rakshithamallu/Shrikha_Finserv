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
import { useScrollSpy } from './hooks/useScrollSpy';
import { ArrowUp, MessageCircle } from 'lucide-react';

const SECTIONS = ['hero', 'about', 'services', 'why-us', 'how-it-works', 'faqs', 'contact', 'location'];

export default function App() {
  const activeSection = useScrollSpy(SECTIONS, 120);
  const [preselectedService, setPreselectedService] = useState('Personal Loan');
  const [legalModalState, setLegalModalState] = useState({ isOpen: false, type: 'privacy' });
  const [showBackToTop, setShowBackToTop] = useState(false);

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

  const handleEnquireService = (serviceName) => {
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
