import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Portfolio.css';
import heroBg from '../assets/user_portfolio_promise.jpg';
import planningImg from '../assets/user_portfolio_2.jpg';
import destImg from '../assets/user_portfolio_3.jpg';
import decorImg from '../assets/user_portfolio_4.jpg';

export default function Portfolio() {
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
      { threshold: 0.1 }
    );

    const elements = sectionRef.current.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  const galleryItems = [
    { id: 1, img: destImg, caption: "The Amalfi Coast", size: 'large' },
    { id: 2, img: planningImg, caption: "Quiet Luxury in London", size: 'medium' },
    { id: 3, img: decorImg, caption: "Bespoke Details", size: 'small' },
    { id: 4, img: heroBg, caption: "A Timeless Promise", size: 'wide' },
  ];

  return (
    <section id="portfolio" className="portfolio-section" ref={sectionRef}>
      <div className="portfolio-header reveal-on-scroll">
        <h3 className="section-subtitle">The Gallery</h3>
        <h2 className="section-title">Emotional Storytelling</h2>
      </div>

      <div className="masonry-grid">
        {galleryItems.map((item, index) => (
          <div 
            key={item.id} 
            className={`masonry-item item-${item.size} reveal-on-scroll`}
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <img src={item.img} alt={item.caption} loading="lazy" />
            <div className="masonry-overlay">
              <span className="masonry-caption">{item.caption}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="portfolio-footer reveal-on-scroll">
         <button onClick={() => navigate('/gallery')} className="btn-primary" style={{ marginTop: '3rem' }}>View Full Gallery</button>
      </div>
    </section>
  );
}
