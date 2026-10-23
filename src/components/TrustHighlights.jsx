import React from 'react';
import { Layers, Users, Building, Compass } from 'lucide-react';

export default function TrustHighlights() {
  const highlights = [
    {
      icon: Layers,
      title: 'Multiple Financial Services',
      description: 'A diverse portfolio spanning personal loans, business financing, insurance, and structured advisory.'
    },
    {
      icon: Users,
      title: 'Solutions for Individuals',
      description: 'Personalized guidance for home buyers, students, vehicle purchasers, and family protection needs.'
    },
    {
      icon: Building,
      title: 'Support for Businesses',
      description: 'Financing pathways to support working capital, asset acquisition, and commercial growth for enterprises.'
    },
    {
      icon: Compass,
      title: 'Focus on Karnataka',
      description: 'Active outreach serving individuals and enterprises across urban, semi-urban, and rural Karnataka.'
    }
  ];

  return (
    <section className="trust-highlights-section" aria-label="Key Service Highlights">
      <div className="container">
        <div className="highlights-grid">
          {highlights.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="highlight-card card-stagger-item"
                style={{ '--card-index': index }}
              >
                <div className="highlight-icon-box">
                  <IconComponent size={24} className="highlight-icon" />
                </div>
                <div className="highlight-info">
                  <h3 className="highlight-title">{item.title}</h3>
                  <p className="highlight-desc">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
