import React from 'react';
import { MapPin, Navigation, ExternalLink, Clock, Phone, Bus } from 'lucide-react';

export default function Location() {
  const directionsUrl = "https://www.google.com/maps/search/?api=1&query=MIG+12+Block+No+9+WeCreate+Space+Vishwamanava+Double+Road+Saraswathipuram+Mysore+570009";

  return (
    <section id="location" className="section section-alt location-section" aria-label="Office Location and Directions">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <MapPin size={14} />
            <span>Visit Us</span>
          </div>
          <h2 className="section-title">
            Our Mysore <span className="highlight-text">Advisory Office</span>
          </h2>
          <p className="section-desc">
            Conveniently situated on Vishwamanava Double Road in Saraswathipuram, Mysore, easily accessible from all key parts of the city.
          </p>
        </div>

        <div className="location-grid">
          {/* Left Column: Office Landmark Details */}
          <div className="location-details-box">
            <h3 className="location-title">Shrikha Finserv</h3>
            <p className="location-address-text">
              MIG 12, Block No. 9, WeCreate Space,<br />
              Vishwamanava Double Road,<br />
              Saraswathipuram, Mysore – 570009,<br />
              Karnataka, India.
            </p>

            <div className="landmark-chips-list">
              <div className="landmark-chip">
                <Navigation size={15} />
                <span>Landmark: WeCreate Space</span>
              </div>
              <div className="landmark-chip">
                <Bus size={15} />
                <span>Double Road Transit Corridor</span>
              </div>
            </div>

            <div className="location-highlights">
              <div className="loc-item">
                <Clock size={18} className="loc-icon" />
                <div>
                  <strong>Advisory Hours:</strong>
                  <p>9:00 AM to 7:00 PM (Monday – Saturday)</p>
                </div>
              </div>
              <div className="loc-item">
                <Phone size={18} className="loc-icon" />
                <div>
                  <strong>Desk Phone:</strong>
                  <p><a href="tel:8792953082">8792953082</a></p>
                </div>
              </div>
            </div>

            <div className="location-actions">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <Navigation size={16} />
                <span>Open in Google Maps</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          {/* Right Column: Responsive Map Container */}
          <div className="location-map-wrapper">
            <div className="map-frame">
              <iframe
                title="Shrikha Finserv Saraswathipuram Mysore Location Map"
                src="https://maps.google.com/maps?q=Vishwamanava%20Double%20Road,%20Saraswathipuram,%20Mysore%20570009&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="map-overlay-badge">
                <MapPin size={14} />
                <span>Saraswathipuram, Mysore</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
