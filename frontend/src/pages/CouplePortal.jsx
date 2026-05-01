import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

function Nav() {
  const navigate = useNavigate();
  return (
    <nav className="flex justify-between items-center py-4 px-10 bg-white sticky top-0 z-50">
      <div className="font-serif text-3xl tracking-wide cursor-pointer flex items-center" onClick={() => navigate('/portal/couple')}>
        <span className="italic font-light italic">W<span className="text-xl">edding</span></span>
        <span className="text-xs uppercase ml-2 tracking-widest text-[#DB927D]">Trail vendors</span>
      </div>
      <div className="flex gap-8 items-center text-sm font-semibold text-gray-700">
        <a href="#" className="text-[#DB927D]">Home</a>
        <a href="#features" className="hover:text-[#DB927D] transition">Budget</a>
        <a href="#categories" className="hover:text-[#DB927D] transition">Categories</a>
        <a onClick={() => navigate('/find-vendors')} className="cursor-pointer hover:text-[#DB927D] transition">Show Vendors</a>
        <a href="#pricing" className="hover:text-[#DB927D] transition">Pricing ▾</a>
        <button onClick={() => navigate('/dashboard/couple')} className="bg-[#DB927D] text-white px-6 py-2 rounded shadow-sm hover:bg-[#c27c68] transition">My Dashboard</button>
      </div>
    </nav>
  );
}

function Hero({ location, setLocation }) {
  const navigate = useNavigate();
  const locations = ["All India", "Mumbai", "Delhi NCR", "Udaipur", "Jaipur", "Goa", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Kerala"];
  return (
    <section className="relative w-full h-[600px] bg-cover bg-center flex flex-col items-center justify-center text-center" style={{backgroundImage: "url('/hero-bg.jpg')"}}>
      
      <div className="relative z-10 w-full max-w-2xl px-6 md:pl-24 text-left self-start mt-[280px]">
        <h1 className="sr-only">Plan Your Dream Wedding Without Stress</h1>
        <p className="sr-only">Discover trusted vendors, manage your budget, and organize everything in one place.</p>
        
        <div className="flex gap-4 items-center mt-8">
          <button onClick={() => navigate(`/find-vendors?location=${encodeURIComponent(location)}`)} className="bg-[#DB927D] text-white px-8 py-3 rounded-full shadow-md font-medium hover:bg-[#c27c68] transition">Find Vendors</button>
          
          <div className="relative">
            <select 
              value={location} 
              onChange={(e) => setLocation(e.target.value)}
              className="appearance-none bg-white border border-gray-100 text-[#DB927D] px-8 py-3 pr-12 rounded-full shadow-md font-medium hover:bg-gray-50 transition cursor-pointer outline-none"
            >
              {locations.map(loc => (
                <option key={loc} value={loc}>📍 {loc === "All India" ? "Select Location" : loc}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#DB927D]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const feats = [
    { icon: '🔍', title: 'Find Vendors', desc: 'Search top vendors easily' },
    { icon: '📋', title: 'Budget Planner', desc: 'Track your spending' },
    { icon: '✔️', title: 'Wedding Checklist', desc: 'Stay updated on tasks' },
    { icon: '💬', title: 'Manage Bookings', desc: 'Chat & Book with ease' },
  ];
  return (
    <section id="features" className="px-6 -mt-16 relative z-20 pb-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6">
        {feats.map(f => (
          <div key={f.title} className="p-6 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm border border-[#fff1ec] flex flex-col items-start hover:shadow-md transition">
            <div className="text-2xl mb-2">{f.icon}</div>
            <h3 className="font-bold text-gray-800 mb-1">{f.title}</h3>
            <p className="text-gray-500 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Categories({ location }) {
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
    { name: 'Venues', img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=600' },
    { name: 'Photographers', img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=600' },
    { name: 'Makeup Artists', img: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=600' },
    { name: 'Caterers', img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=600' },
  ];

  const allCats = [
    'Decorators', 'Wedding Planners', 'Invitations', 'Bridal Wear',
    'Groom Wear', 'Jewelry', 'Mehndi Artists', 'Choreographers',
    'DJs', 'Live Music', 'Pandits', 'Honeymoon Packages'
  ];
  
  return (
    <section id="categories" className="py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-3xl font-bold text-gray-800 mb-8 border-t border-[#FCF5F3] pt-8">Popular Categories</h2>
        
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 flex-1 w-full">
              {primaryCats.map(c => (
                <div onClick={() => navigate(`/find-vendors?location=${encodeURIComponent(location)}&category=${encodeURIComponent(c.name)}`)} key={c.name} className="cursor-pointer group flex flex-col items-center bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition pb-4 border border-[#FCF5F3]">
                  <img src={c.img} alt={c.name} className="w-full h-32 object-cover object-center group-hover:scale-105 transition duration-500"/>
                  <h4 className="mt-4 font-semibold text-gray-800">{c.name}</h4>
                </div>
              ))}
            </div>
            {/* The Arrow Button */}
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
              {allCats.map(c => (
                <div onClick={() => navigate(`/find-vendors?location=${encodeURIComponent(location)}&category=${encodeURIComponent(c)}`)} key={c} className="py-4 px-2 shadow-sm border border-[#FCF5F3] cursor-pointer hover:border-[#DB927D] transition flex items-center justify-center rounded-lg bg-white text-center">
                  <h4 className="font-medium text-gray-700 text-sm leading-relaxed">{c}</h4>
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
    { num: 1, text: "Sign Up" },
    { num: 2, text: "Explore Vendors" },
    { num: 3, text: "Compare & Shortlist" },
    { num: 4, text: "Book Services" },
    { num: 5, text: "Manage Everything" }
  ];
  return (
    <section className="py-12 px-6">
      <div className="max-w-6xl mx-auto text-center border-t border-[#FCF5F3] pt-12">
        <h2 className="font-serif text-3xl font-bold text-gray-800 mb-12">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-between items-center relative max-w-4xl mx-auto">
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#DB927D]/40 to-transparent hidden md:block -z-10"></div>
          {steps.map((s, i) => (
            <div key={i} className="flex flex-row md:flex-row items-center mb-4 md:mb-0 bg-white px-2">
              <div className="w-8 h-8 rounded-full bg-[#DB927D] text-white flex items-center justify-center font-bold text-sm z-10 shadow-sm">
                {s.num}
              </div>
              <p className="ml-3 text-sm font-semibold text-gray-700 whitespace-nowrap">{s.text}</p>
              {i < steps.length - 1 && <span className="md:hidden mx-2 text-[#DB927D]">↓</span>}
              {i < steps.length - 1 && <span className="hidden md:block mx-4 text-gray-300">›</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="py-16 px-6 relative" style={{background: 'linear-gradient(to bottom, #FCF5F3, #FDF9F6)'}}>
      <div className="absolute top-0 right-0 w-64 h-64 bg-no-repeat bg-cover opacity-30" style={{backgroundImage: "url('https://images.unsplash.com/photo-1543888362-e64e88383f5d?auto=format&fit=crop&q=80&w=300')", maskImage: "radial-gradient(ellipse, black, transparent)"}}></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="font-serif text-3xl font-bold text-gray-800 mb-10">Happy Couples</h2>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Card 1 */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden p-3 border border-pink-50">
            <img src="https://images.unsplash.com/photo-1605943960098-96144e55e5b3?auto=format&fit=crop&q=80&w=400" className="w-full h-48 object-cover rounded-lg mb-4" alt="Couple"/>
            <p className="italic text-gray-600 text-sm px-2 mb-4">"This platform made my wedding planning so easy! Found exactly what I needed without the stress."</p>
            <div className="text-right text-xs font-bold text-[#DB927D] pr-4">— Sarah & John</div>
          </div>
          
          {/* Card 2 */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden p-3 border border-pink-50">
            <img src="https://images.unsplash.com/photo-1549417246-8e5be02b21c4?auto=format&fit=crop&q=80&w=400" className="w-full h-48 object-cover rounded-lg mb-4" alt="Couple"/>
            <p className="italic text-gray-600 text-sm px-2 mb-4">"Found the best photographer within my budget? Incredible. Highly recommend Planora UI."</p>
            <div className="text-right text-xs font-bold text-[#DB927D] pr-4">— Emily R.</div>
          </div>
          
          {/* Card 3 */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden p-3 border border-pink-50 relative">
            <img src="https://images.unsplash.com/photo-1550935560-eb63e00cf7ab?auto=format&fit=crop&q=80&w=400" className="w-full h-48 object-cover rounded-lg mb-4" alt="Couple"/>
            <p className="italic text-gray-600 text-sm px-2 mb-4">"Everything from venue booking to makeup artist was handled flawlessly on one board. Thank you!"</p>
            <div className="text-right text-xs font-bold text-[#DB927D] pr-4">— Anika & Rohit</div>
            <div className="absolute bottom-2 right-2 w-16 h-16 bg-no-repeat bg-contain opacity-50" style={{backgroundImage: "url('https://cdn-icons-png.flaticon.com/512/814/814502.png')"}}></div>
          </div>
        </div>

        {/* Text based reviews style from image */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-pink-100 flex flex-col md:flex-row gap-6 relative overflow-hidden">
             {/* decorative side image overlay */}
             <div className="hidden md:block w-48 h-full bg-cover absolute left-0 top-0" style={{backgroundImage: "url('https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=400')"}}></div>
             
             <div className="md:ml-52 w-full flex flex-col justify-center space-y-6">
                <div className="flex border-b border-gray-100 pb-4">
                   <div className="text-3xl text-pink-200 mr-4 font-serif">"</div>
                   <div>
                     <p className="italic text-gray-700">"This platform made my wedding planning so easy!"</p>
                     <p className="text-right text-sm font-bold text-[#DB927D] mt-2">— Sarah & John</p>
                   </div>
                </div>
                <div className="flex">
                   <div className="text-3xl text-pink-200 mr-4 font-serif">"</div>
                   <div>
                     <p className="italic text-gray-700">"Found the best photographer within my budget!"</p>
                     <p className="text-right text-sm font-bold text-[#DB927D] mt-2">— Emily R.</p>
                   </div>
                </div>
             </div>

             <div className="absolute bottom-0 right-0 w-32 h-32 bg-no-repeat bg-cover z-0" style={{backgroundImage: "url('https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=200')", filter: "opacity(0.8)"}}></div>
        </div>

      </div>
    </section>
  );
}

export default function CouplePortal() {
  const [location, setLocation] = useState("All India");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="font-sans text-gray-800 bg-[#FDFBF9]">
      <Nav />
      <Hero location={location} setLocation={setLocation} />
      <Features />
      <Categories location={location} />
      <HowItWorks />
      <Testimonials />
      <Footer />
    </div>
  );
}
