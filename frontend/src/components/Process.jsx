import React, { useEffect, useRef } from 'react';
import './Process.css';

export default function Process() {
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
      { threshold: 0.3 }
    );

    const elements = sectionRef.current.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  const steps = [
    {
      num: 'I',
      title: 'Consultation',
      desc: 'An intimate conversation to understand your vision, aesthetic, and non-negotiables.'
    },
    {
      num: 'II',
      title: 'Concept',
      desc: 'Our design team curates a bespoke blueprint, marrying editorial elegance with your story.'
    },
    {
      num: 'III',
      title: 'Celebration',
      desc: 'Flawless execution of every detail, allowing you to be fully present on your best day.'
    }
  ];

  return (
    <section id="process" className="process-section section-container" ref={sectionRef}>
      <div className="process-header reveal-on-scroll">
        <h3 className="section-subtitle">How We Work</h3>
        <h2 className="section-title">The Planora Process</h2>
      </div>

      <div className="timeline-container reveal-on-scroll">
        <div className="timeline-line"></div>
        <div className="timeline-steps">
          {steps.map((step, index) => (
            <div className="timeline-step" key={index} style={{ transitionDelay: `${index * 200 + 200}ms` }}>
              <div className="step-number">{step.num}</div>
              <h4 className="step-title">{step.title}</h4>
              <p className="step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
