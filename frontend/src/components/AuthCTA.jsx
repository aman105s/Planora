import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthCTA.css';

export default function AuthCTA() {
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = sectionRef.current.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  const handleAuthClick = (e) => {
    e.preventDefault();
    navigate('/role-selection');
    window.scrollTo(0, 0); // Scroll to top when changing routes
  };

  return (
    <section id="auth-cta" className="auth-cta-section" ref={sectionRef}>
      <div className="auth-cta-container reveal-on-scroll">
        <h3 className="section-subtitle" style={{ color: 'var(--color-champagne)' }}>Begin the Journey</h3>
        <h2 className="section-title" style={{ color: 'var(--color-ivory)' }}>Join Our Exclusive Concept</h2>
        <p className="auth-cta-text">
          Access your personal curation portal, explore bespoke design galleries, and 
          collaborate directly with our design artisans.
        </p>
        
        <div className="auth-actions">
          <button className="btn-primary auth-btn" onClick={handleAuthClick}>Log In / Sign Up</button>
        </div>
      </div>
    </section>
  );
}
