import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Experience.css';
import weddingPlanningImg from '../assets/user_exp_1.jpg';
import destinationMgmtImg from '../assets/user_exp_2.jpg';
import bespokeDecorImg from '../assets/user_exp_3.jpg';

export default function Experience() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);

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

  const services = [
    {
      title: 'Wedding Planning',
      description: 'Meticulous end-to-end management, designed for the discerning couple.',
      image: weddingPlanningImg,
    },
    {
      title: 'Destination Management',
      description: 'Curating breathtaking celebrations in the world\'s most awe-inspiring locales.',
      image: destinationMgmtImg,
    },
    {
      title: 'Bespoke Decor',
      description: 'Art-directed environments that evoke emotion and leave a lasting impression.',
      image: bespokeDecorImg,
    }
  ];

  return (
    <section id="experience" className="experience-section section-container" ref={sectionRef}>
      <div className="experience-header reveal-on-scroll">
        <h3 className="section-subtitle">Our Expertise</h3>
        <h2 className="section-title">The Experience</h2>
      </div>

      <div className="experience-grid">
        {services.map((service, index) => (
          <div 
            className={`experience-card reveal-on-scroll`} 
            style={{ transitionDelay: `${index * 200}ms` }}
            key={service.title}
          >
            <div className="card-image-wrapper">
              <img src={service.image} alt={service.title} loading="lazy" />
              <div className="card-overlay">
                <p className="card-description">{service.description}</p>
                <button onClick={() => navigate('/experience')} className="btn-primary card-btn">Explore</button>
              </div>
            </div>
            <h4 className="card-title">{service.title}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}
