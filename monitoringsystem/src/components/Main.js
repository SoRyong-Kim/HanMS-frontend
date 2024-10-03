import React from 'react';
import './Main.css';

const Main = () => {
  return (
      <main className="main-content">
        <section className="hero-section">
          <h1>모니터링 시스템</h1>
          <p></p>
        </section>

        <section className="services-section">
          <h2>Our Services</h2>
          <div className="service-grid">
            <div className="service-card">
              <h3>Pediatrics</h3>
              <p>We offer comprehensive care for children.</p>
            </div>
            <div className="service-card">
              <h3>Vaccinations</h3>
              <p>Protect your child with timely vaccinations.</p>
            </div>
            <div className="service-card">
              <h3>General Care</h3>
              <p>We provide health care for your entire family.</p>
            </div>
          </div>
        </section>
      </main>
  );
};

export default Main;
