import React, { useEffect } from "react";
import { FiShield, FiAlertTriangle, FiLock, FiExternalLink, FiAward } from "react-icons/fi";
import "../css/Security.css";

const Security = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    { id: "overview", title: "Overview" },
    { id: "reporting", title: "Reporting Issues" },
    { id: "researchers", title: "Hall of Fame" },
    { id: "contact", title: "Contact Us" },
  ];

  return (
    <div className="terms-wrapper">
      <div className="terms-layout">
        {/* Sticky Sidebar Navigation */}
        <aside className="terms-sidebar">
          <div className="sidebar-inner">
            <h3 className="sidebar-label">Security Hub</h3>
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
              <FiShield size={40} />
            </div>
            <h1 className="terms-title">Security & Disclosure</h1>
            <div className="meta-info">
              <span className="meta-item"><FiLock /> SSL Secured</span>
              <span className="meta-item"><FiShield /> Responsible Disclosure</span>
            </div>
          </header>

          <section className="intro-card security-accent">
            <p>
              We take security seriously at <strong>QuickCart</strong>. Help keep our community safe 
              by disclosing security issues to us responsibly. 
            </p>
          </section>

          {/* Overview Section */}
          <section id="overview" className="terms-section">
            <h2 className="section-heading">1. Commitment to Safety</h2>
            <p className="terms-text">
              If you are a security researcher or expert and believe you’ve identified security-related
              issues with QuickCart's website or apps, we would appreciate you
              disclosing it to us before making it public.
            </p>
          </section>

          {/* Reporting Section */}
          <section id="reporting" className="terms-section">
            {/* Replaced FiBug with FiAlertTriangle */}
            <div className="summary-badge">
              <FiAlertTriangle /> TL;DR: Report bugs via HackerOne for a faster response.
            </div>
            <h2 className="section-heading">2. Reporting an Issue</h2>
            <p className="terms-text">
              Please submit a detailed bug report on our <strong>HackerOne</strong> platform. 
              Include steps to reproduce, impact assessment, and any supporting screenshots.
            </p>
            <div className="officer-grid">
               <div className="officer-card">
                  <h4>Vulnerability Platform</h4>
                  <p>Submit reports via our official HackerOne portal.</p>
                  <a href="#" className="accent-link flex-link">
                    HackerOne Page <FiExternalLink />
                  </a>
               </div>
            </div>
          </section>

          {/* Researchers Section */}
          <section id="researchers" className="terms-section">
            <div className="summary-badge success"><FiAward /> We value our community researchers.</div>
            <h2 className="section-heading">3. Security Hall of Fame</h2>
            <p className="terms-text">
              We trust the security community to make every effort to protect our users' data. 
              Visit our acknowledgments page to see the researchers who have helped us.
            </p>
          </section>

          {/* CTA Section */}
          <div className="security-cta-box">
             <h3>Found a vulnerability?</h3>
             <p>Work with us to protect millions of users.</p>
             <button className="security-primary-btn">Submit a Bug Report</button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Security;