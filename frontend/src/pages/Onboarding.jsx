import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const handleNext = () => setStep(prev => Math.min(prev + 1, totalSteps));
  const handleBack = () => setStep(prev => Math.max(prev - 1, 1));

  // Form states
  const [partnerName, setPartnerName] = useState('');
  const [weddingDate, setWeddingDate] = useState('');
  const [guestCount, setGuestCount] = useState('Classic (100 - 300)');
  const [style, setStyle] = useState('');
  const [budget, setBudget] = useState('');
  const [priority, setPriority] = useState('');
  const [vendorRequirements, setVendorRequirements] = useState([]);

  const finishOnboarding = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (token) {
        await fetch('/api/couples/profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ partnerName, weddingDate, guestCount, style, budget: Number(budget), priority, vendorRequirements })
        });
      }
    } catch(e) {}
    navigate('/dashboard/couple');
  };

  // Calculates the width of the progress bar
  const progressPercentage = (step / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-wedding-blush/20 font-sans flex items-center justify-center p-6 selection:bg-wedding-gold selection:text-white">
      
      <div className="bg-white max-w-2xl w-full shadow-2xl rounded-sm overflow-hidden relative border border-wedding-gold/10">
        
        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-100 absolute top-0 left-0">
          <div 
            className="h-full bg-wedding-gold transition-all duration-700 ease-out" 
            style={{ width: `${progressPercentage}%` }} 
          />
        </div>

        <div className="p-10 md:p-14">
          
          {/* Step 1: Welcome */}
          {step === 1 && (
            <div className="text-center animate-fade-in-up">
              <h2 className="font-serif text-4xl text-gray-800 mb-6">Welcome to Planora</h2>
              <p className="text-gray-500 mb-10 leading-relaxed text-lg">
                Your journey to a flawless, luxurious wedding begins here. Let us capture a few details to curate an experience uniquely yours.
              </p>
              <div className="flex flex-col gap-4 max-w-sm mx-auto">
                <button onClick={handleNext} className="bg-wedding-gold text-white py-4 uppercase tracking-widest text-sm font-medium hover:bg-yellow-600 transition shadow-md">
                  Get Started
                </button>
                <button onClick={finishOnboarding} className="text-gray-400 text-sm hover:text-wedding-gold transition">
                  Skip for now
                </button>
              </div>
            </div>
          )}

          {/* Form wrapper for layout consistency across inputs */}
          <div className={`${step === 1 ? 'hidden' : 'block'} animate-fade-in-up`}>
            <p className="text-wedding-gold text-xs font-bold uppercase tracking-widest mb-2">Step {step} of {totalSteps}</p>
            
            {/* Step 2: The Basics */}
            {step === 2 && (
              <div>
                <h3 className="font-serif text-3xl text-gray-800 mb-8">The Fundamentals</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm text-gray-500 mb-2">Partner's Name</label>
                    <input type="text" value={partnerName} onChange={(e)=>setPartnerName(e.target.value)} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-wedding-gold bg-transparent transition" placeholder="e.g. Rohan" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-2">Anticipated Wedding Date (or Season)</label>
                    <input type="text" value={weddingDate} onChange={(e)=>setWeddingDate(e.target.value)} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-wedding-gold bg-transparent transition" placeholder="Nov 2026 / Winter" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-2">Estimated Guest Count</label>
                    <select value={guestCount} onChange={(e)=>setGuestCount(e.target.value)} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-wedding-gold bg-transparent transition text-gray-700">
                      <option>Intimate (Under 100)</option>
                      <option>Classic (100 - 300)</option>
                      <option>Grand (300 - 600)</option>
                      <option>Royal (600+)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Style Preferences */}
            {step === 3 && (
              <div>
                <h3 className="font-serif text-3xl text-gray-800 mb-8">Your Vision</h3>
                <p className="text-gray-500 mb-6 text-sm">Select the aesthetic that resonates with your dream celebration.</p>
                <div className="grid grid-cols-2 gap-4">
                  {['Palatial Heritage', 'Modern Minimalist', 'Bohemian Beach', 'Classic Glamour'].map(s => (
                    <label key={s} className="cursor-pointer">
                      <input type="radio" name="style" value={s} checked={style === s} onChange={(e)=>setStyle(e.target.value)} className="peer sr-only" />
                      <div className="border-2 border-gray-100 p-6 text-center rounded-md peer-checked:border-wedding-gold peer-checked:bg-wedding-gold/5 peer-checked:shadow-md peer-checked:text-wedding-gold transition-all duration-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:-translate-y-1 hover:shadow-sm">
                        <span className="font-medium">{s}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Budget Setup */}
            {step === 4 && (
              <div>
                <h3 className="font-serif text-3xl text-gray-800 mb-8">Financial Blueprints</h3>
                <p className="text-gray-500 mb-6 text-sm">Establish your overall budget frame to receive tailored vendor recommendations.</p>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm text-gray-500 mb-2">Total Wedding Budget (INR)</label>
                    <div className="relative">
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                      <input type="number" value={budget} onChange={(e)=>setBudget(e.target.value)} className="w-full border-b border-gray-300 py-2 pl-6 focus:outline-none focus:border-wedding-gold bg-transparent transition" placeholder="5000000" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-4">Highest Priority Area</label>
                    <div className="grid sm:grid-cols-3 gap-3">
                      {['The Venue', 'Design & Decor', 'Food & Drink'].map(p => (
                        <label key={p} className="cursor-pointer">
                          <input type="radio" name="priority" value={p} checked={priority === p} onChange={(e)=>setPriority(e.target.value)} className="peer sr-only" />
                          <div className="text-sm border-2 border-gray-100 py-3 px-3 text-center rounded-md peer-checked:border-wedding-gold peer-checked:bg-wedding-gold peer-checked:text-white transition-all duration-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:-translate-y-0.5 hover:shadow-sm">
                            <span className="font-medium">{p}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Vendor Requirements */}
             {step === 5 && (
              <div>
                <h3 className="font-serif text-3xl text-gray-800 mb-8">Curating Your Team</h3>
                <p className="text-gray-500 mb-6 text-sm">Which elite professionals are you currently seeking?</p>
                <div className="space-y-3">
                  {['Wedding Planner', 'Destination Venue', 'Cinematographer', 'Makeup Artist', 'Caterer'].map(vendor => (
                    <label key={vendor} className={`flex items-center gap-4 cursor-pointer p-4 border-2 rounded-md transition-all duration-200 ${vendorRequirements.includes(vendor) ? 'border-wedding-gold bg-wedding-gold/5 shadow-md -translate-y-1' : 'border-gray-100 hover:border-gray-300 hover:bg-gray-50 hover:-translate-y-0.5 hover:shadow-sm'}`}>
                      <input type="checkbox" checked={vendorRequirements.includes(vendor)} onChange={(e)=>{
                        if(e.target.checked) setVendorRequirements([...vendorRequirements, vendor]);
                        else setVendorRequirements(vendorRequirements.filter(v => v !== vendor));
                      }} className="w-5 h-5 accent-wedding-gold cursor-pointer" />
                      <span className={`font-medium transition-colors ${vendorRequirements.includes(vendor) ? 'text-wedding-gold' : 'text-gray-700'}`}>{vendor}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Pagination Controls */}
            {step > 1 && (
              <div className="mt-12 flex flex-col md:flex-row justify-between items-center pt-6 border-t border-gray-100 gap-4">
                <div className="flex w-full md:w-auto items-center justify-between gap-6 order-2 md:order-1">
                  <button onClick={handleBack} className="text-gray-400 text-sm hover:text-gray-800 transition">
                    ← Back
                  </button>
                  <button onClick={handleNext} className="text-gray-400 text-sm hover:text-wedding-gold underline transition">
                    Skip
                  </button>
                </div>
                
                <div className="w-full md:w-auto order-1 md:order-2">
                  {step < totalSteps ? (
                    <button onClick={handleNext} className="w-full md:w-auto bg-gray-900 text-white px-8 py-3 text-sm tracking-wider uppercase hover:bg-wedding-gold transition">
                      Next Step
                    </button>
                  ) : (
                    <button onClick={finishOnboarding} className="w-full md:w-auto bg-wedding-gold text-white px-8 py-3 text-sm tracking-wider uppercase hover:bg-yellow-600 transition shadow-lg">
                      Finish Setup
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
