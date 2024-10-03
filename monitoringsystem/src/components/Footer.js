import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2024 Hamsoa Clinic. All rights reserved.</p>
          <ul className="footer-links">
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
          </ul>
        </div>
      </footer>
  );
};

export default Footer;
