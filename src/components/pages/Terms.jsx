import React, { useEffect } from "react";
import { FiClock, FiShield, FiAlertCircle, FiTruck, FiRotateCcw } from "react-icons/fi";
import "../css/Terms.css";

const TermsConditions = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    { id: "acceptance", title: "Acceptance" },
    { id: "eligibility", title: "Eligibility" },
    { id: "conduct", title: "User Conduct" },
    { id: "returns", title: "Returns & Refunds" },
    { id: "grievance", title: "Grievances" },
  ];

  return (
    <div className="terms-wrapper">
      <div className="terms-layout">
        {/* Sticky Sidebar Navigation */}
        <aside className="terms-sidebar">
          <div className="sidebar-inner">
            <h3>Contents</h3>
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
            <h1 className="terms-title">Terms of Use</h1>
            <div className="meta-info">
              <span className="meta-item"><FiClock /> Last updated: June 2025</span>
              <span className="meta-item"><FiShield /> QuickCart Commerce Pvt. Ltd.</span>
            </div>
          </header>

          <section className="intro-card">
            <p>
              By using the <strong>QuickCart Platform</strong>, you agree to these legal terms. 
              QuickCart is a technology platform connecting you with third-party sellers. 
              We are registered at Sector 62, Gurugram, Haryana.
            </p>
          </section>

          {/* Acceptance Section */}
          <section id="acceptance" className="terms-section">
            <div className="summary-badge"><FiAlertCircle /> TL;DR: Using the app means you agree to our rules.</div>
            <h2 className="section-heading">1. Acceptance of Terms</h2>
            <p>
              Your access to the Site <a href="https://www.QuickCart.com" className="accent-link">www.QuickCart.com</a> 
              and related applications is governed by this document and our Privacy Policy.
            </p>
          </section>

          {/* Eligibility Section */}
          <section id="eligibility" className="terms-section">
            <h2 className="section-heading">2. Eligibility</h2>
            <p>
              You must be "competent to contract" under the Indian Contract Act, 1872. 
              Minors (under 18) must use the platform under the supervision of a parent or legal guardian.
            </p>
          </section>

          {/* User Conduct Section */}
          <section id="conduct" className="terms-section">
            <h2 className="section-heading">3. Prohibited Conduct</h2>
            <p>You agree not to host, display, or share content that:</p>
            <ul className="custom-list">
              <li>Infringes on patents or trademarks.</li>
              <li>Is harmful, racially offensive, or discriminatory.</li>
              <li>Contains viruses or malicious computer code.</li>
              <li>Threatens the sovereignty of India.</li>
            </ul>
          </section>

          {/* Returns Section */}
          <section id="returns" className="terms-section">
            <div className="summary-badge success"><FiRotateCcw /> TL;DR: Returns only for damaged or expired goods.</div>
            <h2 className="section-heading">4. Returns & Refunds</h2>
            <p>
              Items are non-refundable unless <strong>damaged, defective, or expired</strong> at the time of delivery. 
              Refunds for approved cancellations are processed within <strong>7 working days</strong>.
            </p>
          </section>

          {/* Grievance Section */}
          <section id="grievance" className="terms-section">
            <h2 className="section-heading">5. Grievance Redressal</h2>
            <div className="officer-grid">
              <div className="officer-card">
                <h4>Grievance Officer</h4>
                <p><strong>Dhananjay Shashidharan</strong></p>
                <p>Email: <a href="mailto:grievance@quickcart.com">grievance.officer@QuickCart.com</a></p>
                <p>Mon - Fri (09:00 - 18:00)</p>
              </div>
              <div className="officer-card">
                <h4>Nodal Officer</h4>
                <p><strong>Vikramjit Singh</strong></p>
                <p>Email: <a href="mailto:nodal@quickcart.com">nodal@quickcart.com</a></p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default TermsConditions;