import React from 'react';
import { Phone, MapPin, Clock } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <div className="announcement-bar" role="region" aria-label="Quick contact and announcement">
      <div className="container announcement-container">
        <div className="announcement-text">
          <span className="announcement-badge">Mysore • Estd 2026</span>
          <span className="announcement-message">
            Your financial goals deserve the right guidance.
          </span>
        </div>

        <div className="announcement-links">
          <div className="announcement-item hours-item">
            <Clock size={13} aria-hidden="true" />
            <span>9:00 AM – 7:00 PM</span>
          </div>
          <span className="announcement-divider" aria-hidden="true">|</span>
          <a
            href="tel:8792953082"
            className="announcement-link phone-link"
            aria-label="Call Shrikha Finserv at 8792953082"
          >
            <Phone size={13} aria-hidden="true" />
            <span>8792953082</span>
          </a>
        </div>
      </div>
    </div>
  );
}
