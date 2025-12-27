import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import "../css/Footer.css";

const Footer = () => {
  return (
    <footer className="quick-footer">
      <div className="footer-container">
        {/* 1. Copyright */}
        <div className="footer-section copyright-area">
          <p>© 2025 <span className="brand-accent">QuickCart</span> Commerce Pvt. Ltd.</p>
        </div>

        {/* 2. Navigation Links */}
        <div className="footer-section links-area">
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/security">Security</Link>
        </div>

        {/* 3. Social Media */}
        <div className="footer-section social-area">
          <a href="https://www.instagram.com/piyushjaiswal706" aria-label="Instagram"><FaInstagram /></a>
          <a href="https://www.linkedin.com/in/piyush-jaiswal-41288728a#" aria-label="Linkedin"><FaLinkedinIn /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;