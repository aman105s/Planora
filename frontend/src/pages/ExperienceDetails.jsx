import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleGlobalLogoClick } from '../utils/auth';
import Footer from '../components/Footer';

export default function ExperienceDetails() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen flex flex-col font-sans selection:bg-wedding-blush text-gray-800">
      <nav className="flex justify-between items-center py-4 px-8 border-b border-gray-100 flex-none">
        <div className="font-serif text-2xl tracking-widest text-wedding-gray cursor-pointer" onClick={() => handleGlobalLogoClick(navigate)}>
          PLANORA experience
        </div>
        <button onClick={() => navigate(-1)} className="text-sm font-medium text-gray-500 hover:text-wedding-gold transition">Go Back</button>
      </nav>
      <main className="flex-grow flex flex-col items-center justify-center p-8 text-center">
        <h1 className="font-serif text-5xl text-gray-900 mb-6">Experience Deep-Dive</h1>
        <p className="text-gray-600 max-w-xl text-lg mb-8">Learn exactly how we meticulously oversee wedding planning, destination management, and bespoke decor.</p>
        <button onClick={() => handleGlobalLogoClick(navigate)} className="border border-wedding-gold text-wedding-gold px-8 py-3 uppercase tracking-wider text-sm hover:bg-wedding-gold hover:text-white transition shadow-sm">View Work</button>
      </main>
      <Footer />
    </div>
  );
}
