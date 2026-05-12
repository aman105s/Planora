import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import photographerImg from '../assets/vendor_photographer.png';

const API = import.meta.env.VITE_API_URL;

const CATEGORY_LIST = [
  { name:'Photographer', img: photographerImg, icon:'📸' },
  { name:'Videographer', img:'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&auto=format&fit=crop', icon:'🎥' },
  { name:'Makeup Artist', img:'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&auto=format&fit=crop', icon:'💄' },
  { name:'Wedding Planner', img:'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&auto=format&fit=crop', icon:'📋' },
  { name:'Caterer', img:'https://images.unsplash.com/photo-1555244162-803834f70033?w=600&auto=format&fit=crop', icon:'🍽️' },
  { name:'Decorator', img:'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop', icon:'🌸' },
  { name:'DJ & Music', img:'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&auto=format&fit=crop', icon:'🎵' },
  { name:'Venue', img:'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&auto=format&fit=crop', icon:'🏰' },
];

const ALL_CATS = ['Bridal Wear','Groom Wear','Jewelry','Mehndi Artist','Choreographer','Invitation Designer','Pandit','Honeymoon Package','Vintage Car Rental','Photo Booth'];

const TESTIMONIALS = [
  { name:'Ravi Kapoor Photography', city:'Mumbai', type:'Photographer', text:'Planora helped me triple my inquiries in 6 months. The platform handles all lead management so I can focus on my craft.', earnings:'₹8L+', avatar:'📸' },
  { name:'Devika Narain Events', city:'Delhi', type:'Event Planner', text:'My calendar was fully booked within 2 months of joining. Best investment for my business.', earnings:'₹22L+', avatar:'🎪' },
  { name:'Bliss Makeup Studio', city:'Delhi', type:'Makeup Artist', text:'The lead quality is exceptional. Couples are serious and well-qualified. Zero time wasted on cold leads.', earnings:'₹6L+', avatar:'💄' },
];

const HOW_STEPS = [
  { num:1, icon:'📝', title:'Register Free', desc:'Create your vendor account in under 2 minutes. No credit card required.', detail:'Fill your basic profile — business name, category, and location. Your account is live instantly.' },
  { num:2, icon:'🖼️', title:'Build Your Profile', desc:'Upload portfolio, set pricing, write your story.', detail:'Add photos, list your services, set package pricing. The richer your profile, the more leads you get.' },
  { num:3, icon:'📊', title:'Get Discovered', desc:'Couples searching in your city find you first.', detail:'Our algorithm matches you to couples based on location, category, and budget. You appear in search results automatically.' },
  { num:4, icon:'💌', title:'Receive Leads', desc:'Qualified couples send inquiries directly.', detail:'Leads land in your dashboard instantly. Couple details, wedding date, and budget — all pre-qualified.' },
  { num:5, icon:'🎊', title:'Close & Grow', desc:'Convert leads to bookings and grow revenue.', detail:'Use our messaging system to negotiate and close. All communication stays on-platform for your protection.' },
];

function SignupModal({ onClose }) {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{background:'rgba(0,0,0,0.6)',backdropFilter:'blur(6px)'}}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 text-center">
        <div className="text-4xl mb-3">🎉</div>
        <h3 className="font-serif text-2xl text-gray-800 mb-2">Join as a Vendor</h3>
        <p className="text-gray-400 text-sm mb-6">Start getting qualified leads from couples planning their dream wedding.</p>
        <button onClick={() => { onClose(); navigate('/register-vendor'); }}
          className="w-full py-3 mb-3 text-sm font-semibold text-white !rounded-xl" style={{background:'#D2826C'}}>
          Create Vendor Account
        </button>
        <button onClick={() => { onClose(); navigate('/login?role=vendor'); }}
          className="w-full py-3 text-sm font-semibold text-gray-600 border border-gray-200 !rounded-xl hover:bg-gray-50">
          Already have an account? Sign In
        </button>
        <button onClick={onClose} className="mt-4 text-xs text-gray-400 hover:text-gray-600">Cancel</button>
      </div>
    </div>
  );
}

function StepModal({ step, onClose }) {
  if (!step) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{background:'rgba(0,0,0,0.5)',backdropFilter:'blur(4px)'}} onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8" onClick={e=>e.stopPropagation()}>
        <div className="text-5xl mb-4 text-center">{step.icon}</div>
        <h3 className="font-serif text-2xl text-gray-800 text-center mb-2">Step {step.num}: {step.title}</h3>
        <p className="text-gray-500 text-sm text-center mb-4">{step.detail}</p>
        <button onClick={onClose} className="w-full py-2.5 text-sm font-semibold text-white !rounded-xl" style={{background:'#D2826C'}}>Got it</button>
      </div>
    </div>
  );
}

function Nav({ onSignup }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const isLoggedIn = !!localStorage.getItem('accessToken');
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-[#f0e3de] px-6 py-4 flex justify-between items-center shadow-sm">
      <div className="font-serif text-2xl tracking-wide cursor-pointer flex items-center gap-1" onClick={() => navigate('/portal/vendor')}>
        <span style={{color:'#D2826C'}}>V</span>EDAN <span className="text-xs font-sans text-[#D2826C] ml-1 tracking-widest uppercase hidden sm:inline">Vendor Partner</span>
      </div>
      <div className="hidden md:flex gap-6 items-center text-sm font-semibold text-gray-700">
        <a href="#features" className="hover:text-[#D2826C] transition">Features</a>
        <a href="#categories" className="hover:text-[#D2826C] transition">Categories</a>
        <a href="#how-it-works" className="hover:text-[#D2826C] transition">How It Works</a>
        <a href="#pricing" className="hover:text-[#D2826C] transition">Pricing</a>
        {isLoggedIn
          ? <button onClick={() => navigate('/dashboard/vendor')} className="bg-[#D2826C] text-white px-5 py-2 !rounded-xl text-sm font-semibold hover:bg-[#b06752] transition">My Dashboard</button>
          : <button onClick={onSignup} className="bg-[#D2826C] text-white px-5 py-2 !rounded-xl text-sm font-semibold hover:bg-[#b06752] transition">Start Free</button>
        }
      </div>
      <button className="md:hidden text-gray-600 text-xl" onClick={() => setOpen(o=>!o)}>☰</button>
      {open && (
        <div className="absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-lg z-50 flex flex-col gap-4 p-6 text-sm font-semibold text-gray-700 md:hidden">
          <a href="#features" onClick={()=>setOpen(false)}>Features</a>
          <a href="#how-it-works" onClick={()=>setOpen(false)}>How It Works</a>
          <a href="#pricing" onClick={()=>setOpen(false)}>Pricing</a>
          {isLoggedIn ? <span onClick={()=>{navigate('/dashboard/vendor');setOpen(false);}} className="cursor-pointer text-[#D2826C]">My Dashboard</span>
            : <span onClick={()=>{onSignup();setOpen(false);}} className="cursor-pointer text-[#D2826C]">Start Free →</span>}
        </div>
      )}
    </nav>
  );
}

function Hero({ onSignup }) {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('accessToken');

  return (
    <section className="relative w-full min-h-[580px] flex items-center" style={{backgroundImage:"url('https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1400&auto=format&fit=crop')", backgroundSize:'cover', backgroundPosition:'center'}}>
      <div className="absolute inset-0" style={{background:'linear-gradient(135deg, rgba(30,15,5,0.82) 0%, rgba(100,40,20,0.5) 60%, transparent 100%)'}} />
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-16 py-20">
        <div className="max-w-2xl">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-amber-300 mb-4">India's #1 Wedding Vendor Platform</span>
          <h1 className="font-serif text-4xl md:text-6xl text-white leading-tight mb-4">
            Grow Your Wedding Business with <span style={{color:'#F5C6B5'}}>Planora</span>
          </h1>
          <p className="text-gray-300 text-base md:text-lg mb-8 leading-relaxed">
            Get discovered by thousands of couples. Receive qualified leads. Close more bookings — all without cold calls.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => isLoggedIn ? navigate('/dashboard/vendor') : onSignup()}
              style={{background:'#D2826C', borderRadius:'999px'}}
              className="text-white px-8 py-3.5 font-semibold shadow-xl hover:bg-[#b06752] transition text-sm">
              {isLoggedIn ? 'Go to My Dashboard →' : 'Start Free — No Credit Card'}
            </button>
            <a href="#how-it-works" style={{borderRadius:'999px'}} className="text-white border border-white/40 px-7 py-3.5 font-semibold hover:bg-white/10 transition text-sm">
              How It Works ↓
            </a>
          </div>
          <div className="flex gap-6 mt-8 text-sm text-gray-300">
            <span>✓ Free to join</span>
            <span>✓ No cold leads</span>
            <span>✓ 10,000+ couples/month</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function VendorFeatureCard({ icon, title, desc, route }) {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(route)} className="p-6 bg-white rounded-2xl shadow-sm border border-[#f5ece9] flex flex-col hover:shadow-xl hover:scale-[1.04] cursor-pointer transition-all duration-300">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="font-bold text-gray-800 mb-1 text-sm">{title}</h3>
      <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
    </div>
  );
}

function Features() {
  const feats = [
    { icon:'🚀', title:'Instant Visibility', desc:'Your profile goes live immediately and appears in couple searches from day one.', route:'/vendor-onboarding' },
    { icon:'💌', title:'Qualified Leads', desc:'Only serious couples with budgets matching your pricing reach you.', route:'/dashboard/vendor?tab=leads' },
    { icon:'📊', title:'Smart Dashboard', desc:'Track views, inquiries, and conversion rates. Know what works.', route:'/dashboard/vendor?tab=overview' },
    { icon:'🔒', title:'Secure Payments', desc:'All payments flow through Planora. No direct money handling stress.', route:'/dashboard/vendor?tab=payments' },
  ];
  return (
    <section id="features" className="px-6 -mt-14 relative z-20 pb-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-5">
        {feats.map(f => <VendorFeatureCard key={f.title} {...f} />)}
      </div>
    </section>
  );
}

function Categories({ onSignup }) {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({});
  const [showAll, setShowAll] = useState(false);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const fetchCounts = async () => {
      const c = {};
      await Promise.all(CATEGORY_LIST.map(async cat => {
        try {
          const res = await fetch(`${API}/api/vendors?category=${encodeURIComponent(cat.name)}`);
          const data = await res.json();
          c[cat.name] = data.success ? data.data.length : 0;
        } catch { c[cat.name] = 0; }
      }));
      setCounts(c);
    };
    fetchCounts();
  }, []);

  return (
    <section id="categories" className="py-14 px-6" style={{background:'#FCF8F6'}}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-serif text-3xl text-gray-800">High Demand Categories</h2>
            <p className="text-gray-400 text-sm mt-1">Join hundreds of professionals already getting booked daily.</p>
          </div>
          <button onClick={() => setShowAll(s=>!s)} className="text-[#D2826C] text-sm font-semibold hover:underline !rounded-none !shadow-none !transform-none" style={{background:'none',border:'none'}}>
            {showAll ? 'Show Less' : 'View All →'}
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {CATEGORY_LIST.map(cat => (
            <div key={cat.name} className="relative overflow-hidden rounded-2xl cursor-pointer group h-40 bg-gray-100"
              onMouseEnter={() => setHovered(cat.name)} onMouseLeave={() => setHovered(null)}
              onClick={() => navigate(`/vendor/opportunities/${encodeURIComponent(cat.name)}`)}>
              <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 transition-all duration-300" style={{background: hovered===cat.name ? 'rgba(210,130,108,0.8)' : 'rgba(0,0,0,0.3)'}} />
              {hovered === cat.name ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <span className="text-2xl mb-1">{cat.icon}</span>
                  <span className="font-bold text-sm text-center px-2">Explore Opportunities →</span>
                  <span className="text-xs mt-1 bg-white/20 px-2 py-0.5 rounded-full">{counts[cat.name] ?? '...'} vendors</span>
                </div>
              ) : (
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h4 className="text-white font-semibold text-sm">{cat.name}</h4>
                  <span className="text-white/70 text-xs">{counts[cat.name] ?? '...'} vendors</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {showAll && (
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h4 className="font-semibold text-gray-700 text-sm mb-4">More Categories</h4>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {ALL_CATS.map(c => (
                <div key={c} onClick={() => navigate(`/vendor/opportunities/${encodeURIComponent(c)}`)}
                  className="py-3 px-3 border border-[#f0e3de] cursor-pointer hover:border-[#D2826C] hover:bg-[#FFF7ED] transition text-center rounded-xl">
                  <span className="text-xs font-medium text-gray-700">{c}</span>
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
  const [activeStep, setActiveStep] = useState(null);
  return (
    <section id="how-it-works" className="py-16 px-6 bg-white">
      {activeStep && <StepModal step={activeStep} onClose={() => setActiveStep(null)} />}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl text-gray-800 mb-2">How It Works</h2>
          <p className="text-gray-400 text-sm">From signup to your first booking — in days, not months</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {HOW_STEPS.map((s, i) => (
            <div key={s.num} onClick={() => setActiveStep(s)}
              className="relative flex flex-col items-center text-center p-5 rounded-2xl cursor-pointer border-2 border-transparent hover:border-[#D2826C] hover:bg-[#FFF7ED] transition-all duration-300 group">
              <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-3 shadow-sm border-2 border-[#f0e3de] bg-white group-hover:bg-[#D2826C] group-hover:border-[#D2826C] transition-all">
                <span className="group-hover:grayscale-0">{s.icon}</span>
              </div>
              <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{color:'#D2826C'}}>Step {s.num}</div>
              <div className="font-semibold text-gray-800 text-sm mb-1">{s.title}</div>
              <div className="text-xs text-gray-400 leading-relaxed">{s.desc}</div>
              <div className="mt-3 text-xs text-[#D2826C] font-medium opacity-0 group-hover:opacity-100 transition-all">Click to learn more →</div>
              {i < HOW_STEPS.length-1 && <div className="hidden md:block absolute -right-2 top-1/2 text-gray-300 text-xl z-10">›</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const scrollRef = useRef(null);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const id = setInterval(() => { el.scrollLeft += 1; if (el.scrollLeft >= el.scrollWidth - el.clientWidth) el.scrollLeft = 0; }, 30);
    return () => clearInterval(id);
  }, []);
  return (
    <section className="py-14 px-6" style={{background:'linear-gradient(135deg,#FFF7ED,#FCF8F6)'}}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl text-gray-800 mb-2">Vendors Love Planora</h2>
          <p className="text-gray-400 text-sm">Real stories from real wedding professionals</p>
        </div>
        <div ref={scrollRef} className="flex gap-5 overflow-x-auto pb-3" style={{scrollbarWidth:'none'}}>
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
            <div key={i} className="flex-shrink-0 w-80 bg-white rounded-2xl p-6 border border-pink-50 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl" style={{background:'#FFF7ED'}}>{t.avatar}</div>
                <div>
                  <div className="font-semibold text-gray-800 text-sm">{t.name}</div>
                  <div className="text-xs text-gray-400">{t.type} · {t.city}</div>
                </div>
              </div>
              <p className="text-gray-600 text-sm italic leading-relaxed mb-4">"{t.text}"</p>
              <div className="flex items-center justify-between">
                <div className="flex">{[1,2,3,4,5].map(s => <span key={s} style={{color:'#F59E0B'}}>★</span>)}</div>
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">{t.earnings} earned</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingPlan({ onSignup }) {
  const navigate = useNavigate();
  const plans = [
    { name:'Basic', price:'Free', color:'#A67E6B', bg:'#FEF5ED', features:['Personalized profile','15-photo portfolio','Searchable listing','5 leads/month'], cta:'Get Started', action: onSignup },
    { name:'Pro', price:'₹2,499', period:'/mo', color:'#D2826C', bg:'#D2826C', textColor:'white', popular:true, features:['Unlimited leads','Priority listing','Dashboard analytics','Direct messaging','Review management'], cta:'Go Pro', action: () => navigate('/pricing-checkout?plan=pro') },
    { name:'Premium', price:'₹4,999', period:'/mo', color:'#B8860B', bg:'#E7CBA0', features:['Everything in Pro','Top of search results','Verified badge priority','Dedicated account manager','Featured in homepage'], cta:'Go Premium', action: () => navigate('/pricing-checkout?plan=premium') },
  ];
  return (
    <section id="pricing" className="py-16 px-6" style={{background:'#FCF8F6'}}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl text-gray-800 mb-2">Simple, Transparent Pricing</h2>
          <p className="text-gray-400 text-sm">Start free. Upgrade when you're ready to scale.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 items-center">
          {plans.map((p, i) => (
            <div key={p.name} className={`rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col ${i===1 ? 'md:-translate-y-4 shadow-xl' : ''}`}>
              <div className="py-5 text-center" style={{background: i===1 ? p.bg : '#FEF5ED'}}>
                <div className="font-bold text-sm" style={{color: i===1 ? 'white' : p.color}}>{p.name}</div>
                {p.popular && <div className="text-xs text-white/80 uppercase tracking-widest">Most Popular</div>}
              </div>
              <div className="p-6 bg-white flex-1 flex flex-col">
                <div className="text-center mb-6">
                  <span className="font-serif text-4xl text-gray-800">{p.price}</span>
                  {p.period && <span className="text-gray-400 text-sm">{p.period}</span>}
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {p.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-xs text-gray-600">
                      <span style={{color:'#D2826C'}} className="mt-0.5 flex-shrink-0">✓</span>{f}
                    </li>
                  ))}
                </ul>
                <button onClick={p.action}
                  className="w-full py-3 text-sm font-bold !rounded-xl transition-all"
                  style={i===1 ? {background:'#D2826C', color:'white'} : {border:'2px solid #D2826C', color:'#D2826C', background:'transparent'}}>
                  {p.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-gray-400 mt-6">All plans include a 14-day free trial · No lock-in contracts</p>
      </div>
    </section>
  );
}

function FinalCTA({ onSignup }) {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('accessToken');
  return (
    <section className="py-20 px-6 text-center relative overflow-hidden" style={{background:'linear-gradient(135deg,#4a1c0a,#8b3a1e)'}}>
      <div className="absolute inset-0 opacity-10" style={{backgroundImage:"url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1400&auto=format&fit=crop')", backgroundSize:'cover'}} />
      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="text-4xl mb-4">🎊</div>
        <h2 className="font-serif text-4xl text-white mb-4">Ready to Grow Your Business?</h2>
        <p className="text-gray-300 mb-8">Join 2,000+ wedding professionals already growing with Planora. Start free today.</p>
        <button onClick={isLoggedIn ? () => navigate('/dashboard/vendor') : onSignup}
          className="text-white px-10 py-4 font-bold text-sm shadow-2xl transition-all hover:scale-105"
          style={{background:'#D2826C', borderRadius:'999px'}}>
          {isLoggedIn ? 'Go to Dashboard →' : 'Join as Vendor — It\'s Free →'}
        </button>
      </div>
    </section>
  );
}

export default function VendorPortal() {
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="font-sans text-gray-800 bg-white">
      {showSignup && <SignupModal onClose={() => setShowSignup(false)} />}
      <Nav onSignup={() => setShowSignup(true)} />
      <Hero onSignup={() => setShowSignup(true)} />
      <Features />
      <Categories onSignup={() => setShowSignup(true)} />
      <HowItWorks />
      <Testimonials />
      <PricingPlan onSignup={() => setShowSignup(true)} />
      <FinalCTA onSignup={() => setShowSignup(true)} />
      <Footer />
    </div>
  );
}
