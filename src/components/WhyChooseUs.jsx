import React from 'react';
import { Layers, Users, MapPin, Compass, MessageSquareText, ShieldCheck } from 'lucide-react';

export default function WhyChooseUs() {
  const pillars = [
    {
      icon: Layers,
      title: 'Diverse Financial Portfolio',
      description: 'Access guidance across personal, home, business, gold, and vehicle financing, as well as health, motor, and life insurance in one coordinated advisory setup.'
    },
    {
      icon: Users,
      title: 'Tailored for Individuals & Enterprises',
      description: 'Whether you are a salaried professional seeking housing finance or an MSME founder seeking working capital, we customize our assistance to your specific profile.'
    },
    {
      icon: MapPin,
      title: 'Deep Roots Across Karnataka',
      description: 'Headquartered in Mysore, our outreach prioritizes urban, semi-urban, and rural communities across Karnataka, bridging formal and informal economic sectors.'
    },
    {
      icon: Compass,
      title: 'Objective Option Clarification',
      description: 'We demystify documentation, processing terms, and lender expectations so you can make informed decisions before initiating formal applications.'
    },
    {
      icon: MessageSquareText,
      title: 'Accessible & Responsive Communication',
      description: 'Direct telephone access, prompt email responses, and in-person meetings at our Saraswathipuram office ensure you always interact with real professionals.'
    },
    {
      icon: ShieldCheck,
      title: 'Ethical & Compliance-First Approach',
      description: 'We uphold complete transparency. We do not make false promises of guaranteed approvals or artificial rates; we focus on genuine client suitability.'
    }
  ];

  return (
    <section id="why-us" className="section section-alt why-us-section" aria-label="Why Choose Shrikha Finserv">
      <div className="container">
        <div className="section-header">
          <div className="section-tag section-tag-gold">
            <ShieldCheck size={14} />
            <span>Our Principles</span>
          </div>
          <h2 className="section-title">
            Why Partner with <span className="highlight-text">Shrikha Finserv?</span>
          </h2>
          <p className="section-desc">
            A trusted advisory approach designed around transparency, clarity, and regional accessibility.
          </p>
        </div>

        <div className="why-us-grid">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={index}
                className="why-card card-stagger-item"
                style={{ '--card-index': index }}
              >
                <div className="why-icon-wrapper">
                  <Icon size={26} className="why-icon" />
                </div>
                <h3 className="why-title">{pillar.title}</h3>
                <p className="why-desc">{pillar.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
