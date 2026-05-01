import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import './RoleSelection.css';

export default function RoleSelection() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on mount
  }, []);

  const selectRole = (role) => {
    navigate(`/login?role=${role}`);
  };

  return (
    <div className="role-selection-page">
      <div className="role-selection-container fade-in-up">
        <h2 className="role-title">Welcome to Planora</h2>
        <p className="role-subtitle">Please select your curation portal to continue.</p>

        <div className="role-cards">
          <div className="role-card" onClick={() => selectRole('couple')}>
            <h3 className="role-card-title">Couples & Clients</h3>
            <p className="role-card-desc">Access your bespoke event gallery, vendor communications, and financial blueprints.</p>
            <button className="btn-primary auth-btn-small">Enter Portal</button>
          </div>

          <div className="role-card" onClick={() => selectRole('vendor')}>
            <h3 className="role-card-title">Vendor Partners</h3>
            <p className="role-card-desc">Manage contracts, view timeline logistics, and collaborate on design implementation.</p>
            <button className="btn-secondary auth-btn-small">Vendor Login</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
