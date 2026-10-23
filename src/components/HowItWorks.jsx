import React from 'react';
import { Send, PhoneCall, FileText, CheckCircle, Workflow } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Tell Us Your Needs',
      description: 'Select the financial service you are interested in and share your preliminary details via our enquiry form, email, or a quick phone call.',
      icon: Send
    },
    {
      number: '02',
      title: 'Discuss Available Options',
      description: 'Our advisory team connects with you to understand your specific financial goals, timelines, and profile context.',
      icon: PhoneCall
    },
    {
      number: '03',
      title: 'Understand the Requirements',
      description: 'We review the applicable lender or insurer criteria—such as documentation, eligibility norms, tenure, fees, and provider terms.',
      icon: FileText
    },
    {
      number: '04',
      title: 'Proceed If Suitable',
      description: 'You make an informed decision on whether to proceed with formal submission to the respective institution under terms that suit your situation.',
      icon: CheckCircle
    }
  ];

  return (
    <section id="how-it-works" className="section how-it-works-section" aria-label="How It Works Process">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Workflow size={14} />
            <span>Clear Process</span>
          </div>
          <h2 className="section-title">
            How It Works: <span className="highlight-text">From Enquiry to Clarity</span>
          </h2>
          <p className="section-desc">
            A transparent four-step process built to ensure you understand every aspect before making financial decisions.
          </p>
        </div>

        <div className="timeline-container">
          <div className="timeline-line" aria-hidden="true" />
          <div className="timeline-grid">
            {steps.map((step, index) => {
              const IconComp = step.icon;
              return (
                <div
                  key={index}
                  className="timeline-card card-stagger-item"
                  style={{ '--card-index': index }}
                >
                  <div className="timeline-badge-circle">
                    <span className="step-num">{step.number}</span>
                  </div>
                  <div className="timeline-content">
                    <div className="step-icon-wrap">
                      <IconComp size={20} className="step-icon" />
                    </div>
                    <h3 className="step-title">{step.title}</h3>
                    <p className="step-desc">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="process-assurance-banner">
          <p>
            <strong>Fair & Clear:</strong> Shrikha Finserv does not charge arbitrary advance loan-sanction fees. We guide you transparently through authentic provider channels.
          </p>
        </div>
      </div>
    </section>
  );
}
