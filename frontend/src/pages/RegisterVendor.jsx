import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleGlobalLogoClick } from '../utils/auth';
import Footer from '../components/Footer';

export default function RegisterVendor() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-wedding-gray min-h-screen flex flex-col font-sans selection:bg-wedding-gold text-gray-100">
      <nav className="flex justify-between items-center py-4 px-8 border-b border-gray-700 flex-none">
        <div className="font-serif text-2xl tracking-widest text-white cursor-pointer" onClick={() => handleGlobalLogoClick(navigate)}>
          PLANORA Vendor
        </div>
        <button onClick={() => navigate(-1)} className="text-sm font-medium text-gray-400 hover:text-white transition">Go Back</button>
      </nav>
      <main className="flex-grow flex flex-col items-center justify-center p-8 text-center">
        <h1 className="font-serif text-5xl text-wedding-gold mb-6">Vendor Registration</h1>
        <p className="text-gray-300 max-w-xl text-lg mb-8">Join the premium bridal network and elevate your luxury business footprint across India.</p>
        <button onClick={() => navigate('/vendor-onboarding')} className="bg-wedding-gold text-white px-8 py-3 uppercase tracking-wider text-sm hover:bg-yellow-600 transition shadow-sm">Begin Registration</button>
      </main>
      <div className="bg-white"><Footer /></div>
    </div>
  );
}
