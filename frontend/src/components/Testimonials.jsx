import React, { useEffect, useRef, useState } from 'react';
import './Testimonials.css';

export default function Testimonials() {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      quote: "Planora didn't just plan our wedding; they authored a masterpiece. Every detail felt like an extension of our own quiet love story.",
      author: "GEMINI & ChatGPT",
      location: "AJMER, OPEN AI"
    },
    {
      quote: "An ethereal experience from start to finish. The team’s ability to weave modern design with timeless romance is unparalleled.",
      author: "BABU & BABY",
      location: "MP, ODISHA"
    },
    {
      quote: "We asked for elegance, and they gave us poetry. It was the most breathtaking, weightless day of our lives.",
      author: "AMAN & NORA",
      location: "KANPUR, ITAWAH"
    }
  ];

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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section id="testimonials" className="testimonials-section section-container" ref={sectionRef}>
      <div className="testimonials-content reveal-on-scroll">
        <h3 className="section-subtitle">Kind Words</h3>
        <div className="carousel-container">
          {testimonials.map((test, index) => (
            <div 
              key={index} 
              className={`testimonial-slide ${index === activeIndex ? 'active' : ''}`}
            >
              <div className="quote-mark">“</div>
              <p className="testimonial-quote">{test.quote}</p>
              <div className="testimonial-author">
                <span className="author-name">{test.author}</span>
                <span className="author-location">{test.location}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="carousel-indicators">
          {testimonials.map((_, index) => (
            <button 
              key={index}
              className={`indicator ${index === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
