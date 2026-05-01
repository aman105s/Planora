import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  const navigate = useNavigate();
  const footerRef = useRef(null);

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

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }
    return () => {
      if (footerRef.current) observer.unobserve(footerRef.current);
    };
  }, []);

  return (
    <footer className="footer-section reveal-on-scroll" ref={footerRef}>
      <div className="footer-container">
        
        {/* Top Info Section */}
        <div className="footer-top">
          <div className="footer-brand">
            <h3 className="footer-logo">PLANORA</h3>
            <p className="brand-tagline">Your Personal Luxury Wedding Planner</p>
            <p className="brand-desc">
              Planora is an exclusive wedding planning and management platform where you can discover the finest vendors and bespoke services. Whether you are seeking world-class destination planners, or elite photographers, Planora curates your perfect day with quiet luxury and editorial elegance. With our detailed vendor list and inspiration gallery, crafting timeless moments has never been more seamless.
            </p>
          </div>

          <div className="footer-contact">
            <h4 className="footer-heading">Contact Us</h4>
            <div className="contact-grid">
              <div className="contact-item">
                <span className="contact-label">For Vendor Partners</span>
                <a href="mailto:partners@planora.com" className="contact-link">partners@planora.com</a>
                <span className="contact-phone">+1 (800) 123-4567</span>
              </div>
              <div className="contact-item">
                <span className="contact-label">For Couples</span>
                <a href="mailto:inquire@planora.com" className="contact-link">inquire@planora.com</a>
                <span className="contact-phone">+1 (800) 765-4321</span>
              </div>
            </div>

            <div className="address-item">
              <h4 className="footer-heading">Headquarters</h4>
              <p>12th Floor, The Opus Tower<br/>Marine Drive, Mumbai<br/>Maharashtra, India, 400020</p>
            </div>
          </div>

          <div className="footer-social-app">
            <div className="social-block">
              <h4 className="footer-heading">Follow Us</h4>
              <div className="social-links-grid">
                <a href="#">Instagram</a>
                <a href="#">Pinterest</a>
                <a href="#">Facebook</a>
                <a href="#">Vogue India</a>
                <a href="#">YouTube</a>
              </div>
            </div>
            <div className="app-block">
              <h4 className="footer-heading">Get The Planora App</h4>
              <div className="app-buttons">
                <button onClick={() => navigate('/mobile-app')} className="btn-secondary app-btn">Download on the App Store</button>
                <button onClick={() => navigate('/mobile-app')} className="btn-secondary app-btn">Get it on Google Play</button>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-divider"></div>

        {/* Links Section */}
        <div className="footer-links-matrix">
          <div className="footer-col">
            <h4 className="footer-heading">Start Planning</h4>
            <a href="#">Search By Vendor</a>
            <a href="#">Search By City</a>
            <a href="#">Download Our App</a>
            <a href="#">Top Rated Vendors</a>
            <a href="#">Destination Weddings</a>
          </div>
          
          <div className="footer-col">
            <h4 className="footer-heading">Wedding Ideas</h4>
            <a href="#">Inspiration Gallery</a>
            <a href="#">Real Weddings</a>
            <a href="#">Submit Wedding</a>
          </div>
          
          <div className="footer-col">
            <h4 className="footer-heading">Photo Gallery</h4>
            <a href="#">Wedding Decor</a>
            <a href="#">Wedding Photography</a>
            <a href="#">Venues & Estates</a>
            <a href="#">Invitations & Favors</a>
            <a href="#">Mehndi Designs</a>
          </div>
          
          <div className="footer-col">
            <h4 className="footer-heading">Planora Menu</h4>
            <a href="#">About Planora</a>
            <a href="#">Careers</a>
            <a href="#">Contact Us</a>
            <a href="#">Site Map</a>
            <a href="#">Terms & Conditions</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Cancellation Policy</a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="bottom-copyright">
            &copy; {new Date().getFullYear()} Planora. Crafted with intent.
          </div>
          <div className="bottom-links">
            <a href="#">Terms & Conditions</a>
            <span className="divider">|</span>
            <a href="#">Privacy Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
