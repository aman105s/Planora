import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import OnboardingModal from '../components/dashboard/OnboardingModal';

const API = import.meta.env.VITE_API_URL;

const getPriceRange = (price) => {
  if (!price) return '₹₹';
  if (price < 30000) return '₹';
  if (price < 100000) return '₹₹';
  return '₹₹₹';
};

const mapApiVendor = (v, i) => ({
  id: v.id,
  name: v.name,
  category: v.category,
  rating: v.rating || 5.0,
  reviews: v.reviewCount || Math.floor(Math.random() * 120) + 20,
  priceRange: getPriceRange(v.price),
  city: v.location || 'India',
  bookings: Math.floor(Math.random() * 40) + 10,
  trending: i < 3,
  image: v.img || 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&auto=format&fit=crop',
});

const VENDORS = [
  { id:1, name:'Ravi Kapoor Photography', category:'Photographer', rating:4.9, reviews:128, priceRange:'₹₹₹', city:'Mumbai', bookings:34, trending:true, image:'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=400&auto=format&fit=crop' },
  { id:2, name:'Devika Narain Events', category:'Event Planner', rating:4.8, reviews:96, priceRange:'₹₹₹', city:'Delhi', bookings:28, trending:false, image:'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&auto=format&fit=crop' },
  { id:3, name:'Spice Garden Catering', category:'Caterer', rating:4.7, reviews:214, priceRange:'₹₹', city:'Mumbai', bookings:52, trending:true, image:'https://images.unsplash.com/photo-1555244162-803834f70033?w=400&auto=format&fit=crop' },
  { id:4, name:'Pehla Nasha Decor', category:'Decoration', rating:4.6, reviews:73, priceRange:'₹₹', city:'Jaipur', bookings:19, trending:false, image:'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&auto=format&fit=crop' },
  { id:5, name:'Manish Malhotra Bridal', category:'Bridal Wear', rating:4.9, reviews:187, priceRange:'₹₹₹', city:'Delhi', bookings:41, trending:true, image:'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&auto=format&fit=crop' },
  { id:6, name:'Noor Photography', category:'Photographer', rating:4.5, reviews:62, priceRange:'₹₹', city:'Hyderabad', bookings:15, trending:false, image:'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&auto=format&fit=crop' },
  { id:7, name:'Royal Tent House', category:'Venue', rating:4.8, reviews:109, priceRange:'₹₹₹', city:'Udaipur', bookings:23, trending:false, image:'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&auto=format&fit=crop' },
  { id:8, name:'Mehndi Masters', category:'Mehendi Artist', rating:4.7, reviews:145, priceRange:'₹', city:'Mumbai', bookings:67, trending:true, image:'https://images.unsplash.com/photo-1611558709798-e009c8fd7706?w=400&auto=format&fit=crop' },
  { id:9, name:'Bliss Makeup Studio', category:'Makeup Artist', rating:4.8, reviews:201, priceRange:'₹₹', city:'Delhi', bookings:38, trending:false, image:'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&auto=format&fit=crop' },
  { id:10, name:'Melodies by Arjun', category:'DJ & Music', rating:4.6, reviews:88, priceRange:'₹₹', city:'Bangalore', bookings:31, trending:true, image:'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400&auto=format&fit=crop' },
];

const QUICK_ACTIONS = [
  { icon:'🔍', title:'Find Vendors', subtitle:'Browse top wedding pros', bg:'#FFF7ED', border:'#FED7AA', path:'/find-vendors' },
  { icon:'💰', title:'Budget Planner', subtitle:'Track your spending', bg:'#F0FDF4', border:'#BBF7D0', path:'/dashboard/couple' },
  { icon:'✅', title:'Wedding Checklist', subtitle:'Stay on track', bg:'#FAF5FF', border:'#E9D5FF', path:'/dashboard/couple' },
  { icon:'📋', title:'Manage Bookings', subtitle:'View all bookings', bg:'#FFF1F2', border:'#FECDD3', path:'/dashboard/couple' },
];

function Nav({ navigate }) {
  const [open, setOpen] = useState(false);
  return (
    <nav style={{background:'#fff', borderBottom:'1px solid #FCF5F3'}} className="sticky top-0 z-50 px-6 py-4 flex justify-between items-center shadow-sm">
      <div className="font-serif text-2xl tracking-wide cursor-pointer flex items-center gap-2" onClick={() => navigate('/portal/couple')}>
        <span style={{color:'#DB927D'}}>P</span>LANORA
      </div>
      <div className="hidden md:flex gap-6 items-center text-sm font-semibold text-gray-700">
        <a href="#categories" style={{color:'#DB927D'}}>Categories</a>
        <a href="#how-it-works" className="hover:text-[#DB927D] transition">How It Works</a>
        <span onClick={() => navigate('/find-vendors')} className="cursor-pointer hover:text-[#DB927D] transition">Find Vendors</span>
        <button onClick={() => navigate('/dashboard/couple')} style={{background:'#DB927D', color:'#fff', borderRadius:'999px'}} className="px-5 py-2 font-semibold hover:opacity-90 transition shadow-sm text-sm">My Dashboard</button>
      </div>
      <button className="md:hidden text-gray-600 text-2xl" onClick={() => setOpen(o => !o)}>☰</button>
      {open && (
        <div className="absolute top-full left-0 w-full bg-white border-t shadow-lg z-50 flex flex-col gap-4 p-6 text-sm font-semibold text-gray-700 md:hidden">
          <span onClick={() => { navigate('/find-vendors'); setOpen(false); }} className="cursor-pointer hover:text-[#DB927D]">Find Vendors</span>
          <span onClick={() => { navigate('/dashboard/couple'); setOpen(false); }} className="cursor-pointer hover:text-[#DB927D]">My Dashboard</span>
        </div>
      )}
    </nav>
  );
}

function Hero({ location, setLocation, navigate }) {
  const locations = ["All India","RISHIKESH","HARIDWAR","Mumbai","Delhi NCR","Udaipur","Jaipur","Goa","Bangalore","Hyderabad","Chennai","Kolkata","Kerala"];
  return (
    <section className="relative w-full h-[560px] flex flex-col items-start justify-end pb-16 px-8 md:px-20"
      style={{backgroundImage:"url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1400&auto=format&fit=crop')", backgroundSize:'cover', backgroundPosition:'center'}}>
      <div className="absolute inset-0" style={{background:'linear-gradient(to top, rgba(20,10,5,0.7) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)'}} />
      <div className="relative z-10 max-w-2xl">
        <p className="text-amber-300 text-xs font-semibold tracking-widest uppercase mb-2">Your Wedding, Planned Perfectly</p>
        <h1 className="font-serif text-4xl md:text-6xl text-white leading-tight mb-4">Find the Best <br/>Wedding Vendors</h1>
        <p className="text-gray-200 text-sm mb-6">Trusted photographers, caterers, venues & more — all in one place.</p>
        <div className="flex flex-wrap gap-3 items-center">
          <button onClick={() => navigate(`/find-vendors?location=${encodeURIComponent(location)}`)}
            style={{background:'#DB927D', borderRadius:'999px'}} className="text-white px-7 py-3 font-semibold shadow-lg hover:opacity-90 transition text-sm">
            Find Vendors
          </button>
          <select value={location} onChange={e => setLocation(e.target.value)}
            className="bg-white/90 backdrop-blur-sm border-0 text-gray-800 px-5 py-3 font-medium cursor-pointer outline-none text-sm shadow-lg"
            style={{borderRadius:'999px'}}>
            {locations.map(loc => <option key={loc} value={loc}>📍 {loc === 'All India' ? 'Select Location' : loc}</option>)}
          </select>
        </div>
      </div>
    </section>
  );
}

function QuickActions({ navigate }) {
  return (
    <section className="px-6 -mt-10 relative z-20 pb-4">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {QUICK_ACTIONS.map(a => (
          <div key={a.title} onClick={() => navigate(a.path)} style={{background:a.bg, borderColor:a.border, borderWidth:'1.5px', borderStyle:'solid', borderRadius:'16px', cursor:'pointer', transition:'all 0.2s ease'}}
            className="p-5 flex flex-col items-start hover:shadow-lg hover:-translate-y-1 transition-all group">
            <div className="text-2xl mb-2">{a.icon}</div>
            <div className="font-bold text-gray-800 text-sm">{a.title}</div>
            <div className="text-xs text-gray-500 mt-0.5">{a.subtitle}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SectionHeader({ title, subtitle, onViewAll }) {
  return (
    <div className="flex items-end justify-between mb-6">
      <div>
        <h2 className="font-serif text-2xl text-gray-800">{title}</h2>
        {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
      </div>
      {onViewAll && <button onClick={onViewAll} style={{background:'none', border:'none', color:'#DB927D', fontWeight:600, fontSize:'0.85rem', cursor:'pointer', boxShadow:'none', transform:'none'}} className="hover:underline">View All →</button>}
    </div>
  );
}

function VendorCarousel({ vendors, navigate }) {
  const ref = useRef(null);
  const scroll = dir => ref.current?.scrollBy({ left: dir * 280, behavior: 'smooth' });
  return (
    <div className="relative">
      <button onClick={() => scroll(-1)} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white shadow-md border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#DB927D] hover:text-white transition" style={{borderRadius:'50%', fontSize:'1.1rem'}}>‹</button>
      <div ref={ref} className="flex gap-4 overflow-x-auto pb-3 px-2" style={{scrollbarWidth:'none', msOverflowStyle:'none'}}>
        {vendors.map(v => {
          const priceColor = {'₹':'#059669','₹₹':'#D97706','₹₹₹':'#E11D48'}[v.priceRange];
          return (
            <div key={v.id} onClick={() => navigate(`/vendor/${v.id}`)} style={{flexShrink:0, width:'240px', borderRadius:'16px', overflow:'hidden', background:'#fff', border:'1.5px solid #f3f4f6', cursor:'pointer', transition:'all 0.25s ease'}}
              className="hover:shadow-xl hover:-translate-y-1 hover:border-[#DB927D] group">
              <div className="relative h-36 overflow-hidden bg-gray-100">
                <img src={v.image} alt={v.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                {v.trending && <span className="absolute top-2 left-2 px-2 py-0.5 text-white text-xs font-bold" style={{background:'#E11D48', borderRadius:'999px'}}>🔥 Trending</span>}
                <span className="absolute top-2 right-2 px-2 py-0.5 bg-white text-xs font-bold" style={{color:priceColor, borderRadius:'999px'}}>{v.priceRange}</span>
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-gray-800 text-sm truncate">{v.name}</h4>
                <span className="text-xs px-2 py-0.5 mt-1 inline-block" style={{background:'#FFF7ED', color:'#92400E', borderRadius:'999px'}}>{v.category}</span>
                <div className="flex items-center gap-1 mt-2">
                  <span style={{color:'#F59E0B'}}>★</span>
                  <span className="text-sm font-semibold text-gray-800">{v.rating}</span>
                  <span className="text-xs text-gray-400">({v.reviews})</span>
                </div>
                {v.trending && <p className="text-xs text-gray-400 mt-0.5">Booked {v.bookings}+ times this week</p>}
                <button onClick={e => { e.stopPropagation(); navigate(`/vendor/${v.id}`); }}
                  className="w-full mt-3 py-1.5 text-xs font-semibold border transition"
                  style={{borderColor:'#DB927D', color:'#DB927D', borderRadius:'10px', background:'transparent'}}>
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <button onClick={() => scroll(1)} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white shadow-md border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#DB927D] hover:text-white transition" style={{borderRadius:'50%', fontSize:'1.1rem'}}>›</button>
    </div>
  );
}

function TopVendorsGrid({ vendors, city, navigate }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {vendors.slice(0, 6).map(v => (
        <div key={v.id} onClick={() => navigate(`/vendor/${v.id}`)}
          className="flex gap-3 p-4 bg-white border border-gray-100 hover:shadow-md hover:border-[#DB927D] transition cursor-pointer group"
          style={{borderRadius:'14px'}}>
          <img src={v.image} alt={v.name} className="w-14 h-14 object-cover flex-shrink-0 group-hover:scale-105 transition" style={{borderRadius:'10px'}} />
          <div className="min-w-0">
            <h4 className="font-semibold text-gray-800 text-sm truncate">{v.name}</h4>
            <span className="text-xs px-2 py-0.5" style={{background:'#FFF7ED', color:'#92400E', borderRadius:'999px'}}>{v.category}</span>
            <div className="flex items-center gap-1 mt-1">
              <span style={{color:'#F59E0B'}} className="text-xs">★</span>
              <span className="text-xs font-semibold text-gray-700">{v.rating}</span>
              <span className="text-xs text-gray-400">· {v.priceRange}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function TrendingSection({ vendors, navigate }) {
  const trending = vendors.filter(v => v.trending).slice(0, 4);
  if (!trending.length) return null;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {trending.map(v => (
        <div key={v.id} onClick={() => navigate(`/vendor/${v.id}`)}
          className="flex gap-4 p-4 border cursor-pointer group hover:shadow-md transition"
          style={{background:'linear-gradient(135deg, #FFF7ED, #FFF1F2)', border:'1.5px solid #FECDD3', borderRadius:'16px'}}>
          <img src={v.image} alt={v.name} className="w-20 h-20 object-cover flex-shrink-0 group-hover:scale-105 transition" style={{borderRadius:'12px'}} />
          <div className="flex-1 min-w-0">
            <span className="text-xs font-bold px-2 py-0.5 text-white" style={{background:'#E11D48', borderRadius:'999px'}}>🔥 Trending</span>
            <h4 className="font-semibold text-gray-800 text-sm mt-1">{v.name}</h4>
            <p className="text-xs text-gray-500">{v.category} · {v.city}</p>
            <p className="text-xs font-medium mt-0.5" style={{color:'#E11D48'}}>Booked {v.bookings}+ times this week</p>
            <div className="flex items-center gap-1 mt-1">
              <span style={{color:'#F59E0B'}} className="text-xs">★</span>
              <span className="text-xs font-semibold text-gray-700">{v.rating}</span>
              <span className="text-xs text-gray-400">({v.reviews} reviews) · {v.priceRange}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Categories({ location, navigate }) {
  const [showAll, setShowAll] = useState(false);
  const primaryCats = [
    { name:'Venues', img:'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=600' },
    { name:'Photographers', img:'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=600' },
    { name:'Makeup Artists', img:'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=600' },
    { name:'Caterers', img:'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=600' },
  ];
  const allCats = ['Decorators','Wedding Planners','Invitations','Bridal Wear','Groom Wear','Jewelry','Mehndi Artists','Choreographers','DJs','Live Music','Pandits','Honeymoon Packages'];
  return (
    <section id="categories" className="py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title="Popular Categories" subtitle="Find vendors by what you need most" onViewAll={() => setShowAll(true)} />
        {!showAll ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {primaryCats.map(c => (
              <div key={c.name} onClick={() => navigate(`/find-vendors?location=${encodeURIComponent(location)}&category=${encodeURIComponent(c.name)}`)}
                className="cursor-pointer group overflow-hidden bg-white shadow-sm hover:shadow-md transition border border-pink-50"
                style={{borderRadius:'14px'}}>
                <img src={c.img} alt={c.name} className="w-full h-32 object-cover group-hover:scale-105 transition duration-500" />
                <div className="py-3 text-center font-semibold text-gray-800 text-sm">{c.name}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-6 border border-gray-100 shadow-sm relative" style={{borderRadius:'16px'}}>
            <button onClick={() => setShowAll(false)} className="absolute top-4 right-4 text-gray-400 hover:text-[#DB927D] text-sm font-medium transition">✕ Close</button>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-2">
              {allCats.map(c => (
                <div key={c} onClick={() => navigate(`/find-vendors?category=${encodeURIComponent(c)}`)}
                  className="py-3 px-2 shadow-sm border border-pink-50 cursor-pointer hover:border-[#DB927D] transition flex items-center justify-center text-center bg-white"
                  style={{borderRadius:'10px'}}>
                  <span className="text-gray-700 text-sm font-medium">{c}</span>
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
    { num:1, icon:'👤', text:'Sign Up', desc:'Create your free account' },
    { num:2, icon:'🔍', text:'Explore', desc:'Browse top vendors' },
    { num:3, icon:'📊', text:'Compare', desc:'Shortlist your favorites' },
    { num:4, icon:'📅', text:'Book', desc:'Confirm your vendors' },
    { num:5, icon:'🎊', text:'Celebrate', desc:'Enjoy your perfect day' },
  ];
  return (
    <section id="how-it-works" className="py-16 px-6" style={{background:'linear-gradient(to bottom, #FDF9F6, #FCF5F3)'}}>
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="font-serif text-3xl text-gray-800 mb-2">How It Works</h2>
        <p className="text-gray-400 text-sm mb-10">Your journey to a perfect wedding, simplified</p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {steps.map((s, i) => (
            <div key={s.num} className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-3 shadow-sm" style={{background:'#fff', border:'2px solid #FECDD3'}}>
                {s.icon}
              </div>
              <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{color:'#DB927D'}}>Step {s.num}</div>
              <div className="font-semibold text-gray-800 text-sm">{s.text}</div>
              <div className="text-xs text-gray-400 mt-0.5">{s.desc}</div>
              {i < steps.length - 1 && <div className="hidden md:block absolute" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const reviews = [
    { img:'https://images.unsplash.com/photo-1605943960098-96144e55e5b3?auto=format&fit=crop&q=80&w=400', text:'This platform made my wedding planning so easy! Found exactly what I needed without the stress.', name:'Sarah & John' },
    { img:'https://images.unsplash.com/photo-1549417246-8e5be02b21c4?auto=format&fit=crop&q=80&w=400', text:'Found the best photographer within my budget. Incredible. Highly recommend Planora!', name:'Emily R.' },
    { img:'https://images.unsplash.com/photo-1550935560-eb63e00cf7ab?auto=format&fit=crop&q=80&w=400', text:'Everything from venue booking to makeup was handled flawlessly on one platform. Thank you!', name:'Anika & Rohit' },
  ];
  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title="Happy Couples" subtitle="Real stories from real weddings" />
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map(r => (
            <div key={r.name} className="bg-white p-4 border border-pink-50 shadow-sm hover:shadow-md transition" style={{borderRadius:'16px'}}>
              <img src={r.img} alt={r.name} className="w-full h-44 object-cover mb-4" style={{borderRadius:'10px'}} />
              <p className="italic text-gray-600 text-sm px-1 mb-3">"{r.text}"</p>
              <div className="text-right text-xs font-bold" style={{color:'#DB927D'}}>— {r.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function CouplePortal() {
  const navigate = useNavigate();
  const [location, setLocation] = useState('Mumbai');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [prefs, setPrefs] = useState(null);
  const [vendors, setVendors] = useState(VENDORS);
  const [loadingVendors, setLoadingVendors] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const saved = localStorage.getItem('planora_prefs');
    const onboarded = localStorage.getItem('planora_onboarded');
    if (saved) setPrefs(JSON.parse(saved));
    if (!onboarded) setShowOnboarding(true);
    else if (saved) {
      const p = JSON.parse(saved);
      if (p.city) setLocation(p.city);
    }

    // Fetch real vendors from backend
    const fetchVendors = async () => {
      try {
        const res = await fetch(`${API}/api/vendors`);
        const data = await res.json();
        if (data.success && data.data && data.data.length > 0) {
          const mapped = data.data.map(mapApiVendor);
          // Merge real vendors first, then fill with mock if fewer than 6
          const merged = mapped.length >= 6 ? mapped : [...mapped, ...VENDORS.slice(0, 10 - mapped.length)];
          setVendors(merged);
        }
      } catch(_) {}
      finally { setLoadingVendors(false); }
    };
    fetchVendors();
  }, []);

  const handleOnboardingComplete = p => {
    setPrefs(p);
    setShowOnboarding(false);
    if (p.city) setLocation(p.city);
  };

  const city = prefs?.city || location;
  const nearbyVendors = vendors.filter(v => v.city === city).length >= 2
    ? vendors.filter(v => v.city === city)
    : vendors;

  return (
    <div className="font-sans text-gray-800 min-h-screen" style={{background:'#FDFBF9'}}>
      {showOnboarding && <OnboardingModal onComplete={handleOnboardingComplete} />}

      <Nav navigate={navigate} />
      <Hero location={location} setLocation={setLocation} navigate={navigate} />

      {/* Quick Actions */}
      <QuickActions navigate={navigate} />

      {/* Recommended For You */}
      <section className="py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="Recommended For You"
            subtitle={`Top vendors loved by couples planning in ${city}`}
            onViewAll={() => navigate('/find-vendors')}
          />
          {loadingVendors
            ? <div className="flex gap-4 overflow-hidden">{[1,2,3,4].map(i => <div key={i} className="flex-shrink-0 w-60 h-64 bg-gray-100 rounded-2xl animate-pulse" />)}</div>
            : <VendorCarousel vendors={vendors} navigate={navigate} />}
        </div>
      </section>

      {/* Top Vendors Near You */}
      <section className="py-6 px-6 pb-12" style={{background:'#FDF9F6'}}>
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title={`📍 Top Vendors in ${city}`}
            subtitle="Highest rated pros near your wedding location"
            onViewAll={() => navigate(`/find-vendors?location=${encodeURIComponent(city)}`)}
          />
          <TopVendorsGrid vendors={nearbyVendors} city={city} navigate={navigate} />
        </div>
      </section>

      {/* Trending This Week */}
      <section className="py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="🔥 Trending This Week"
            subtitle="Most booked vendors right now"
            onViewAll={() => navigate('/find-vendors')}
          />
          <TrendingSection vendors={vendors} navigate={navigate} />
        </div>
      </section>

      <Categories location={location} navigate={navigate} />
      <HowItWorks />
      <Testimonials />
      <Footer />
    </div>
  );
}
