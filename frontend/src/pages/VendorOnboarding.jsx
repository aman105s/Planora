import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function VendorOnboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const handleNext = () => setStep(prev => Math.min(prev + 1, totalSteps));
  const handleBack = () => setStep(prev => Math.max(prev - 1, 1));
  
  const [businessName, setBusinessName] = useState('');
  const [experienceYears, setExperienceYears] = useState('');
  const [contactMode, setContactMode] = useState('Direct Call');
  const [category, setCategory] = useState('');
  const [startingPrice, setStartingPrice] = useState('');
  const [coverageAreas, setCoverageAreas] = useState([]);

  const finishOnboarding = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (token) {
        await fetch('/api/vendors/profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ businessName, experienceYears: Number(experienceYears), contactMode, category, startingPrice, coverageAreas })
        });
      }
    } catch(e) {}
    navigate('/dashboard/vendor');
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
              <h2 className="font-serif text-4xl text-gray-800 mb-6">Welcome, Partner</h2>
              <p className="text-gray-500 mb-10 leading-relaxed text-lg">
                Join our elite network of luxury wedding partners. Let's set up your storefront so couples can easily discover your exceptional services.
              </p>
              <div className="flex flex-col gap-4 max-w-sm mx-auto">
                <button onClick={handleNext} className="bg-wedding-gold text-white py-4 uppercase tracking-widest text-sm font-medium hover:bg-yellow-600 transition shadow-md">
                  Set Up Profile
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
            
            {/* Step 2: Vendor Details */}
            {step === 2 && (
              <div>
                <h3 className="font-serif text-3xl text-gray-800 mb-8">Business Fundamentals</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm text-gray-500 mb-2">Registered Business Name</label>
                    <input type="text" value={businessName} onChange={e=>setBusinessName(e.target.value)} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-wedding-gold bg-transparent transition" placeholder="e.g. Marigold Photography" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-2">Years of Experience</label>
                    <input type="number" value={experienceYears} onChange={e=>setExperienceYears(e.target.value)} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-wedding-gold bg-transparent transition" placeholder="5" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-2">Primary Contact Mode</label>
                    <select value={contactMode} onChange={e=>setContactMode(e.target.value)} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-wedding-gold bg-transparent transition text-gray-700">
                      <option>Direct Call</option>
                      <option>Email</option>
                      <option>WhatsApp Business</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Primary Category */}
            {step === 3 && (
              <div>
                <h3 className="font-serif text-3xl text-gray-800 mb-8">Specialized Category</h3>
                <p className="text-gray-500 mb-6 text-sm">Select the primary service your luxury brand offers.</p>
                <div className="grid grid-cols-2 gap-4">
                  {['Palace Venues', 'Destination Planners', 'Cinematography', 'Bespoke Decor'].map(cat => (
                    <label key={cat} className="cursor-pointer">
                      <input type="radio" name="category" value={cat} checked={category === cat} onChange={e=>setCategory(e.target.value)} className="peer sr-only" />
                      <div className="border border-gray-200 p-4 text-center rounded-sm peer-checked:border-wedding-gold peer-checked:bg-wedding-blush/10 transition text-gray-700 hover:border-gray-300">
                        {cat}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Pricing Target */}
            {step === 4 && (
              <div>
                <h3 className="font-serif text-3xl text-gray-800 mb-8">Pricing Structures</h3>
                <p className="text-gray-500 mb-6 text-sm">Help us connect you with couples matching your typical client budget.</p>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm text-gray-500 mb-4">Starting Price Point (INR)</label>
                    <div className="grid sm:grid-cols-3 gap-3">
                      {['Under ₹1L', '₹1L to ₹5L', 'Premium (₹5L+)'].map(tier => (
                        <label key={tier} className="cursor-pointer">
                          <input type="radio" name="tier" value={tier} checked={startingPrice === tier} onChange={e=>setStartingPrice(e.target.value)} className="peer sr-only" />
                          <div className="text-sm border border-gray-200 py-2 px-3 text-center rounded-sm peer-checked:border-wedding-gold peer-checked:text-wedding-gold transition text-gray-600">
                            {tier}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Coverage Area */}
             {step === 5 && (
              <div>
                <h3 className="font-serif text-3xl text-gray-800 mb-8">Service Coverage</h3>
                <p className="text-gray-500 mb-6 text-sm">Which premier destinations do you cover?</p>
                <div className="space-y-3">
                  {['Udaipur', 'Goa', 'Jaipur', 'Mumbai', 'International Destination'].map(location => (
                    <label key={location} className="flex items-center gap-4 cursor-pointer group p-3 hover:bg-gray-50 border border-transparent hover:border-gray-100 transition rounded-sm">
                      <input type="checkbox" checked={coverageAreas.includes(location)} onChange={(e)=>{
                        if(e.target.checked) setCoverageAreas([...coverageAreas, location]);
                        else setCoverageAreas(coverageAreas.filter(a => a !== location));
                      }} className="w-5 h-5 accent-wedding-gold" />
                      <span className="text-gray-700">{location}</span>
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
                  <button onClick={finishOnboarding} className="text-gray-400 text-sm hover:text-wedding-gold underline transition">
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
                      Go to Dashboard
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
