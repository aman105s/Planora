import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';
import heroBg from '../assets/hero_bg.png';

export default function Hero() {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="hero-section">
      <div 
        className="hero-background" 
        style={{ 
          backgroundImage: `url(${heroBg})`,
          transform: `translateY(${scrollY * 0.4}px)` // Parallax effect
        }}
      />
      <div className="hero-overlay" />
      
      <header className="hero-header fade-in-up">
        <div className="logo">PLANORA</div>
        <nav className="nav-links">
          <a href="#experience">The Experience</a>
          <a href="#portfolio">Our Portfolio</a>
          <a href="#process">Process</a>
          <a href="#testimonials">Testimonials</a>
        </nav>
        <button 
          className="btn-primary" 
          onClick={() => navigate('/role-selection')} 
          style={{ padding: '0.6rem 1.5rem', color: '#fff', borderColor: '#fff' }}
        >
          Log In / Sign Up
        </button>
      </header>

      <div className="hero-content">
        <h2 className="hero-subtitle fade-in-up delay-100">Bespoke Wedding Management</h2>
        <h1 className="hero-title fade-in-up delay-300">Crafting Timeless Moments.</h1>
        <p className="hero-text fade-in-up delay-500">
          We do not just plan weddings. We curate the first day of your forever, 
          merging editorial elegance with quiet luxury.
        </p>
      </div>
    </section>
  );
}
