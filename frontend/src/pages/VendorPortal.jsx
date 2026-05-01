import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import photographerImg from '../assets/vendor_photographer.png';

function Nav() {
  const navigate = useNavigate();
  return (
    <nav className="flex justify-between items-center py-4 px-10 bg-[#FAF6F4] sticky top-0 z-50">
      <div className="font-serif text-3xl tracking-wide cursor-pointer flex items-center" onClick={() => navigate('/portal/vendor')}>
        <span className="italic font-light italic text-[#B58A73]">V<span className="text-xl">edan</span></span>
        <span className="text-xs uppercase ml-2 tracking-widest text-[#DB927D]">vendor partner</span>
      </div>
      <div className="flex gap-8 items-center text-sm font-semibold text-gray-700">
        <a href="#features" className="hover:text-[#DB927D] transition">Features</a>
        <a href="#categories" className="hover:text-[#DB927D] transition">Categories</a>
        <a href="#" className="hover:text-[#DB927D] transition">Home</a>
        <a href="#pricing" className="hover:text-[#DB927D] transition">Pricing ▾</a>
        <button onClick={() => navigate('/dashboard/vendor')} className="bg-[#D2826C] text-white px-6 py-2 rounded shadow-sm hover:bg-[#b06752] transition">Vendor Dashboard</button>
      </div>
    </nav>
  );
}

function Hero() {
  const navigate = useNavigate();
  return (
    <section className="relative w-full h-[600px] bg-cover bg-center flex flex-col items-center justify-center text-center" style={{backgroundImage: "url('/vendor-hero-bg.jpg')"}}>
      <div className="relative z-10 w-full max-w-6xl px-6 md:pl-20 text-left flex justify-start items-center h-full">
        <div className="max-w-xl">
           <h1 className="sr-only">Grow Your Wedding Business with Us</h1>
           <p className="sr-only">Get discovered by thousands of couples actively planning their weddings.</p>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const feats = [
    { icon: '🚀', title: 'Boost Your Visibility', desc: 'Reach more clients' },
    { icon: '📅', title: 'Manage Bookings Easily', desc: 'Handle all inquiries' },
    { icon: '⭐', title: 'Get Reviews & Ratings', desc: 'Build your reputation' },
    { icon: '📈', title: 'Track Your Performance', desc: 'Monitor your growth' },
  ];
  return (
    <section id="features" className="px-6 -mt-16 relative z-20 pb-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6">
        {feats.map(f => (
          <div key={f.title} className="p-6 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm border border-[#f5ece9] flex flex-col items-start hover:shadow-md transition">
            <div className="text-2xl mb-2">{f.icon}</div>
            <h3 className="font-bold text-gray-800 mb-1">{f.title}</h3>
            <p className="text-gray-500 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Categories() {
  const [showAll, setShowAll] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const navigate = useNavigate();

  const handleShowAll = () => {
    setIsExiting(true);
    setTimeout(() => {
      setShowAll(true);
      setIsExiting(false);
    }, 350);
  };

  const primaryCats = [
    { name: 'Photographer', img: photographerImg },
    { name: 'Videographer', img: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=600' },
    { name: 'Makeup Artist', img: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=600' },
    { name: 'Wedding Planner', img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=600' },
  ];

  const allCats = [
    'Exclusive Palace Venues', 'Fine Art Photography', 'Bridal Makeup', 
    'Luxury Catering Services', 'Mandap & Decorators', 'Live Bands & DJs', 
    'Bridal Designer Wear', 'Celebrity Mehndi Artists', 'Wedding Choreographers', 
    'Invites & Gifting', 'Premium Event Planners', 'Jewelers & Trousseau', 
    'Vintage Car Rentals', 'Honeymoon Specialists', 'Pandit & Ceremonies'
  ];
  
  return (
    <section id="categories" className="py-12 px-6 bg-[#FCF8F6]">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-3xl font-bold text-gray-800 mb-8 border-t border-[#f0e3de] pt-8">Our Categories</h2>
        
        <style>
          {`
            @keyframes slideLeftOut {
              0% { opacity: 1; transform: translateX(0); }
              100% { opacity: 0; transform: translateX(-30px); }
            }
            @keyframes bounceIn {
              0% { opacity: 0; transform: scale(0.95) translateY(15px); }
              60% { opacity: 1; transform: scale(1.02) translateY(-3px); }
              80% { transform: scale(0.98) translateY(2px); }
              100% { opacity: 1; transform: scale(1) translateY(0); }
            }
            .animate-slide-out {
              animation: slideLeftOut 0.35s ease-in forwards;
            }
            .animate-bounce-in {
              animation: bounceIn 0.6s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
            }
          `}
        </style>

        {!showAll ? (
          <div className={"flex flex-col md:flex-row items-center gap-6 " + (isExiting ? "animate-slide-out" : "")}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 shadow-sm p-4 bg-white rounded-xl border border-gray-50 flex-1 w-full">
              {primaryCats.map(c => (
                <div
                  key={c.name}
                  onClick={() => navigate(`/find-vendors?category=${encodeURIComponent(c.name)}&from=vendor`)}
                  className="flex flex-col items-center bg-white rounded overflow-hidden group border border-gray-100 pb-2 cursor-pointer hover:shadow-md transition duration-300">
                  <img src={c.img} alt={c.name} className="w-full h-28 object-cover object-center group-hover:scale-105 transition duration-500"/>
                  <h4 className="mt-2 text-xs font-semibold text-gray-700 group-hover:text-[#DB927D] transition">{c.name}</h4>
                </div>
              ))}
            </div>
            {/* The Arrow Button - Not a box */}
            <div onClick={handleShowAll} className="flex flex-col items-center cursor-pointer group px-2">
               <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-md text-[#DB927D] group-hover:scale-110 transition duration-300 border border-pink-50">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
               </div>
               <h4 className="mt-3 text-xs font-semibold text-[#DB927D] opacity-0 group-hover:opacity-100 transition duration-300">View All</h4>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 relative animate-bounce-in">
            <button onClick={() => setShowAll(false)} className="absolute top-4 right-4 text-gray-400 hover:text-[#DB927D] text-sm font-medium transition">✕ Close List</button>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
              {allCats.map(c => (
                <div
                  key={c}
                  onClick={() => navigate(`/find-vendors?category=${encodeURIComponent(c)}&from=vendor`)}
                  className="py-4 px-2 shadow-sm border border-transparent hover:border-[#DB927D] cursor-pointer transition flex items-center justify-center rounded-lg bg-[#FAF6F4] hover:bg-white text-center group">
                  <h4 className="font-medium text-gray-700 text-xs leading-relaxed group-hover:text-[#DB927D] transition">{c}</h4>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { num: 1, text: "Register" },
    { num: 2, text: "Create Profile" },
    { num: 3, text: "Upload Portfolio" },
    { num: 4, text: "Get Leads" },
    { num: 5, text: "Get Booked" }
  ];
  return (
    <section className="py-8 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-3xl font-bold text-gray-800 mb-10 border-t border-[#f0e3de] pt-8">How It Works</h2>
        <div className="bg-[#FAF6F4] py-8 px-4 rounded-xl border border-[#efe9e6] flex flex-col justify-center items-center shadow-inner">
           <div className="flex flex-col md:flex-row justify-between items-center relative w-full max-w-5xl">
             <div className="absolute top-1/2 left-4 right-4 h-[2px] bg-[#E1C1B3] hidden md:block -z-10"></div>
             {steps.map((s, i) => (
               <div key={i} className="flex flex-row items-center mb-4 md:mb-0 bg-[#FAF6F4] px-4 py-1">
                 <div className="w-8 h-8 rounded-full bg-[#E1C1B3] text-white flex items-center justify-center font-bold text-sm shadow-sm z-10">
                   {s.num}
                 </div>
                 <p className="ml-3 text-sm font-semibold text-gray-800">{s.text}</p>
                 {i < steps.length - 1 && <span className="md:hidden mx-2 text-[#E1C1B3]">↓</span>}
                 {i < steps.length - 1 && <span className="hidden md:block ml-8 text-gray-400 font-light text-xl">→</span>}
               </div>
             ))}
           </div>
        </div>
      </div>
    </section>
  );
}

function PricingPlan() {
  const navigate = useNavigate();
  return (
    <section id="pricing" className="py-12 px-6 bg-[#FCF8F6]">
      <div className="max-w-6xl mx-auto">
         <h2 className="font-serif text-3xl font-bold text-gray-800 mb-10 text-center flex items-center justify-center">
            <span className="text-[#C19280] mr-2">❦</span> Pricing Plans <span className="text-[#C19280] ml-2">❦</span>
         </h2>
         <div className="flex flex-col md:flex-row gap-6 max-w-5xl mx-auto relative items-center justify-center">
           
           {/* Left Floating Menu Details (Stylistic) */}
           <div className="hidden md:block w-48 bg-white border border-[#EBE3DF] rounded-xl shadow self-stretch">
               <div className="flex justify-between items-center text-xs p-4 border-b border-gray-100 font-bold bg-[#FAF6F4] rounded-t-xl text-gray-800">
                  <span>Basic</span> <span className="text-[#C19280]">Free</span>
               </div>
               <div className="flex flex-col text-xs text-gray-600 font-medium">
                  <div className="p-3 border-b flex justify-between"><span>Profile Setup</span> <span className="text-gray-400">›</span></div>
                  <div className="p-3 border-b flex justify-between"><span>My Profile Gallery</span> <span className="text-gray-400">›</span></div>
                  <div className="p-3 border-b flex justify-between"><span>Booking Requests</span> <span className="text-gray-400">›</span></div>
                  <div className="p-3 border-b flex justify-between"><span>Messages</span> <span className="text-gray-400">›</span></div>
               </div>
           </div>

           {/* Cards Wrapper */}
           <div className="flex flex-col md:flex-row gap-6 flex-1">
             
             {/* Basic Card */}
             <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex-1 flex flex-col overflow-hidden">
                <div className="bg-[#FEF5ED] text-[#A67E6B] font-bold text-center py-4 border-b border-[#F7E7DF]">
                   Basic
                </div>
                <div className="p-6 text-center flex flex-col items-center flex-1">
                   <h3 className="text-3xl font-serif text-gray-800 mb-6">Free</h3>
                   <ul className="text-xs text-gray-600 space-y-3 text-left w-full pl-4 mb-8">
                     <li className="flex items-center"><span className="text-pink-300 mr-2">✓</span> Personalized profile</li>
                     <li className="flex items-center"><span className="text-pink-300 mr-2">✓</span> 15 photos portfolio cap</li>
                     <li className="flex items-center"><span className="text-pink-300 mr-2">✓</span> Searchable in categories</li>
                   </ul>
                </div>
             </div>

             {/* PRO Card */}
             <div className="bg-white rounded-xl shadow-md border border-gray-100 flex-1 flex flex-col overflow-hidden transform md:-translate-y-2 relative">
                <div className="bg-[#D2826C] text-white font-bold text-center py-4 flex flex-col justify-center items-center">
                   Pro <span className="text-[10px] font-normal uppercase tracking-widest text-[#f5c6ba]">Most Popular</span>
                </div>
                <div className="p-6 text-center flex flex-col items-center bg-[#FCF8F6] flex-1">
                   <h3 className="text-3xl font-serif text-gray-800 mb-6">$49<span className="text-sm text-gray-500 font-sans">/mo</span></h3>
                   <ul className="text-xs text-gray-600 space-y-3 text-left w-full pl-4 mb-8">
                     <li className="flex items-center"><span className="text-[#D2826C] mr-2">✓</span> Direct Inquiries</li>
                     <li className="flex items-center"><span className="text-[#D2826C] mr-2">✓</span> Dashboard Manager</li>
                     <li className="flex items-center"><span className="text-[#D2826C] mr-2">✓</span> Build Reviews</li>
                   </ul>
                   <button onClick={() => navigate('/pricing-checkout')} className="mt-auto px-6 py-2 bg-[#D2826C] text-white text-xs font-bold uppercase rounded hover:bg-[#b06752] transition">Select Plan</button>
                </div>
             </div>

             {/* Premium Card */}
             <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex-1 flex flex-col overflow-hidden">
                <div className="bg-[#E7CBA0] text-gray-800 font-bold text-center py-4 flex flex-col justify-center items-center relative overflow-hidden">
                   Premium
                   <div className="absolute opacity-20 text-white right-0 top-0 text-3xl">✧</div>
                </div>
                <div className="p-6 text-center flex flex-col items-center flex-1">
                   <h3 className="text-3xl font-serif text-gray-800 mb-6">$99<span className="text-sm text-gray-500 font-sans">/mo</span></h3>
                   <ul className="text-xs text-gray-600 space-y-3 text-left w-full pl-4 mb-8">
                     <li className="flex items-center"><span className="text-[#D2826C] mr-2">✓</span> Direct Inquiries</li>
                     <li className="flex items-center"><span className="text-[#D2826C] mr-2">✓</span> Priority Placement</li>
                     <li className="flex items-center"><span className="text-[#D2826C] mr-2">✓</span> Unlimited Photos</li>
                   </ul>
                   <button onClick={() => navigate('/pricing-checkout')} className="mt-auto px-6 py-2 border border-[#E7CBA0] text-gray-700 text-xs font-bold uppercase rounded hover:bg-[#FAF6F4] transition">Select Plan</button>
                </div>
             </div>

           </div>
         </div>
      </div>
    </section>
  );
}

function ProfileOverview() {
  return (
    <section className="py-12 px-6 bg-[#FCF8F6]">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm border border-[#EBE3DF] p-6 relative overflow-hidden">
        <h3 className="font-serif text-lg font-bold text-gray-800 mb-4 flex items-center"><span className="text-[#E1C1B3] mr-2">⌂</span> Profile Overview <span className="ml-auto text-gray-400 text-sm">› ›</span></h3>
        <div className="flex flex-col md:flex-row gap-4 h-48">
          <div className="md:w-1/4 h-full bg-cover bg-center rounded custom-shadow" style={{backgroundImage: "url('https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=400')"}}></div>
          <div className="md:w-1/4 h-full bg-cover bg-center rounded custom-shadow" style={{backgroundImage: "url('https://images.unsplash.com/photo-1509927083803-4bd519298ac4?auto=format&fit=crop&q=80&w=400')"}}></div>
          <div className="md:w-1/2 h-full bg-gray-100 rounded bg-cover bg-center relative" style={{backgroundImage: "url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=600')"}}>
             <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="bg-white/80 backdrop-blur border border-white px-8 py-4 rounded shadow-lg text-center">
                    <span className="font-bold text-gray-800 text-sm block">Luxury Setup Showreel</span>
                    <span className="text-xs text-[#DB927D]">Play Video</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function VendorPortal() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="font-sans text-gray-800 bg-white">
      <Nav />
      <Hero />
      <Features />
      <Categories />
      <HowItWorks />
      <PricingPlan />
      <ProfileOverview />
      <Footer />
    </div>
  );
}
