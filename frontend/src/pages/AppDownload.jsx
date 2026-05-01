import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleGlobalLogoClick } from '../utils/auth';
import Footer from '../components/Footer';

export default function AppDownload() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-wedding-cream min-h-screen flex flex-col font-sans selection:bg-wedding-blush text-gray-800">
      <nav className="flex justify-between items-center py-4 px-8 bg-white border-b border-wedding-gold/20 flex-none">
        <div className="font-serif text-2xl tracking-widest text-wedding-gray cursor-pointer" onClick={() => handleGlobalLogoClick(navigate)}>
          PLANORA Mobile
        </div>
        <button onClick={() => navigate(-1)} className="text-sm font-medium text-gray-500 hover:text-wedding-gold transition">Go Back</button>
      </nav>
      <main className="flex-grow flex flex-col items-center justify-center p-8 text-center">
        <h1 className="font-serif text-5xl text-wedding-gold mb-6">Download Planora App</h1>
        <p className="text-gray-600 max-w-xl text-lg mb-8">Carry the world's most exclusive luxury vendor network right in your pocket. Coming soon to the App Store and Google Play.</p>
        <button onClick={() => handleGlobalLogoClick(navigate)} className="bg-wedding-gold text-white px-8 py-3 uppercase tracking-wider text-sm hover:bg-yellow-600 transition shadow-sm">Return Home</button>
      </main>
      <Footer />
    </div>
  );
}
