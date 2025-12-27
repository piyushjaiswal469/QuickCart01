import React, { useEffect } from "react";
import { FiEye, FiDatabase, FiShield, FiShare2, FiInfo, FiMail, FiClock } from "react-icons/fi";
import "../css/Privacy.css";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    { id: "scope", title: "Scope & Applicability" },
    { id: "collection", title: "Data Collection" },
    { id: "usage", title: "How We Use Data" },
    { id: "sharing", title: "Data Sharing" },
    { id: "security", title: "Security Measures" },
    { id: "contact", title: "Contact DPO" },
  ];

  return (
    <div className="terms-wrapper">
      <div className="terms-layout">
        {/* Sticky Sidebar Navigation */}
        <aside className="terms-sidebar">
          <div className="sidebar-inner">
            <h3 className="sidebar-label">Privacy Center</h3>
            <ul>
              {sections.map((sec) => (
                <li key={sec.id}>
                  <a href={`#${sec.id}`}>{sec.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <main className="terms-main">
          <header className="terms-header">
            <div className="security-icon-badge">
              <FiEye size={40} />
            </div>
            <h1 className="terms-title">Privacy Policy</h1>
            <div className="meta-info">
              <span className="meta-item"><FiClock /> Updated: January 2025</span>
              <span className="meta-item"><FiShield /> Data Protection: Active</span>
            </div>
          </header>

          <section className="intro-card security-accent">
            <p>
              Your privacy is paramount to <strong>QuickCart</strong>. This policy explains how we collect, 
              use, and protect your personal information when you use our services.
            </p>
          </section>

          {/* Scope Section */}
          <section id="scope" className="terms-section">
            <h2 className="section-heading">1. Applicability and Scope</h2>
            <p className="terms-text">
              This policy applies to all QuickCart services, including our website and mobile applications.
              It covers information collected directly from you or through automated electronic communications.
            </p>
            <div className="summary-badge">
              <FiInfo /> TL;DR: This policy only applies to QuickCart, not 3rd party links.
            </div>
          </section>

          {/* Collection Section */}
          <section id="collection" className="terms-section">
            <h2 className="section-heading">2. Information We Collect</h2>
            <div className="officer-grid">
              <div className="officer-card">
                <h4><FiDatabase /> Personal Data</h4>
                <p>Name, Email, Mobile, Address, and Date of Birth provided during registration.</p>
              </div>
              <div className="officer-card">
                <h4><FiShield /> Device Data</h4>
                <p>IP address, Browser type, Operating System, and real-time Location data.</p>
              </div>
            </div>
          </section>

          {/* Usage Section */}
          <section id="usage" className="terms-section">
            <h2 className="section-heading">3. How We Use Your Information</h2>
            <p className="terms-text">We process your data to provide a seamless shopping experience:</p>
            <ul className="custom-list">
              <li>To process and deliver your orders via partners.</li>
              <li>To detect and prevent fraudulent transactions.</li>
              <li>To send personalized offers and updates via WhatsApp/SMS.</li>
              <li>To comply with legal and regulatory obligations.</li>
            </ul>
          </section>

          {/* Sharing Section */}
          <section id="sharing" className="terms-section">
             <div className="summary-badge success">
               <FiShare2 /> We never sell your data to 3rd party advertisers.
             </div>
            <h2 className="section-heading">4. Data Sharing</h2>
            <p className="terms-text">
              Information is only shared with trusted partners (Delivery, Payments, Vendors) 
              necessary to fulfill your requests or when required by law enforcement.
            </p>
          </section>

          {/* Security Section */}
          <section id="security" className="terms-section">
            <h2 className="section-heading">5. Security Measures</h2>
            <p className="terms-text">
              We follow industry-standard encryption and physical security protocols to ensure your 
              personal data remains confidential and protected from unauthorized access.
            </p>
          </section>

          {/* Contact Section */}
          <section id="contact" className="terms-section">
            <h2 className="section-heading">6. Data Protection Officer (DPO)</h2>
            <p className="terms-text">
              For any queries regarding your data rights, please contact our DPO:
            </p>
            <div className="officer-details-box">
              <p className="terms-text">
                <strong>Email:</strong> <a href="mailto:privacy@quickcart.com" className="accent-link">privacy@quickcart.com</a>
                <br />
                <strong>Response Time:</strong> Within 48 Hours
              </p>
            </div>
          </section>

          {/* CTA Section */}
          <div className="security-cta-box">
             <h3>Have questions about your data?</h3>
             <p>Our privacy team is here to help you understand your rights.</p>
             <button className="security-primary-btn" onClick={() => window.location.href='mailto:privacy@quickcart.com'}>
               <FiMail style={{marginRight: '8px'}} /> Contact Privacy Team
             </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PrivacyPolicy;