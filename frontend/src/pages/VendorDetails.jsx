import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getVendorById } from '../data/vendorData';
import Footer from '../components/Footer';
const API = import.meta.env.VITE_API_URL;

function InquiryModal({ vendor, onClose }) {
  const [form, setForm] = useState({ name:'', weddingDate:'', budget:'', message:'' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      await fetch(`${API}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ vendorId: vendor.id, ...form })
      });
    } catch(_) {}
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 800);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{background:'rgba(0,0,0,0.6)', backdropFilter:'blur(6px)'}}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden" style={{animation:'fadeInUp 0.3s ease forwards'}}>
        <div className="p-6 border-b border-gray-100 flex justify-between items-center" style={{background:'linear-gradient(135deg,#FFF7ED,#FFF1F2)'}}>
          <div>
            <h3 className="font-serif text-xl text-gray-800">Send Inquiry</h3>
            <p className="text-xs text-gray-500 mt-0.5">{vendor.name}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl w-8 h-8 flex items-center justify-center !rounded-full">✕</button>
        </div>
        {submitted ? (
          <div className="p-10 text-center">
            <div className="text-5xl mb-4">💌</div>
            <h4 className="font-serif text-xl text-gray-800 mb-2">Request Sent!</h4>
            <p className="text-sm text-gray-500 mb-6">Your inquiry has been sent to <strong>{vendor.name}</strong>. They will contact you soon.</p>
            <button onClick={onClose} className="bg-[#DB927D] text-white px-8 py-2.5 !rounded-xl text-sm font-semibold hover:opacity-90">Done</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Your Name *</label>
              <input required value={form.name} onChange={e=>set('name',e.target.value)} placeholder="Full name" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#DB927D] transition" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Wedding Date *</label>
              <input required type="date" value={form.weddingDate} onChange={e=>set('weddingDate',e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#DB927D] transition" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Budget Range</label>
              <select value={form.budget} onChange={e=>set('budget',e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#DB927D] bg-white transition">
                <option value="">Select budget</option>
                <option>Under ₹50,000</option>
                <option>₹50,000 – ₹1,00,000</option>
                <option>₹1,00,000 – ₹3,00,000</option>
                <option>₹3,00,000+</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Message</label>
              <textarea value={form.message} onChange={e=>set('message',e.target.value)} rows={3} placeholder="Tell the vendor about your wedding..." className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#DB927D] transition resize-none" />
            </div>
            <button type="submit" disabled={loading} className="w-full py-3 text-sm font-semibold text-white !rounded-xl transition" style={{background:'#DB927D'}}>
              {loading ? 'Sending...' : 'Send Inquiry'}
            </button>
            <p className="text-xs text-center text-gray-400">No phone/email shared. Vendor will reach you via Planora messages.</p>
          </form>
        )}
      </div>
    </div>
  );
}

function BookNowModal({ vendor, onClose }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [date, setDate] = useState('');

  const handleBook = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      const amount = vendor.startingPrice || 50000;
      const commission = amount * 0.15; // 15% marketplace commission
      await fetch(`${API}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ vendorId: vendor.id, weddingDateLocation: date, message: 'Direct Booking', amount, commission })
      });
    } catch(_) {}
    setTimeout(() => { setLoading(false); setSuccess(true); }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{background:'rgba(0,0,0,0.6)', backdropFilter:'blur(6px)'}}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden" style={{animation:'fadeInUp 0.3s ease forwards'}}>
        <div className="p-6 border-b border-gray-100 flex justify-between items-center" style={{background:'#F0FDF4'}}>
          <h3 className="font-serif text-xl text-gray-800">Secure Booking</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 w-8 h-8 flex items-center justify-center">✕</button>
        </div>
        {success ? (
          <div className="p-8 text-center">
            <div className="text-5xl mb-4 text-green-500">✓</div>
            <h4 className="font-serif text-xl text-gray-800 mb-2">Booking Confirmed!</h4>
            <p className="text-sm text-gray-500 mb-6">Payment simulated successfully. The vendor will reach out shortly.</p>
            <button onClick={onClose} className="bg-green-600 text-white w-full py-2.5 rounded-xl font-semibold">Done</button>
          </div>
        ) : (
          <form onSubmit={handleBook} className="p-6 space-y-4">
            <p className="text-sm text-gray-600 mb-4">You are about to book <strong>{vendor.name}</strong> for a base package of <strong>₹{vendor.startingPrice?.toLocaleString() || '50,000'}</strong>.</p>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">Event Date</label>
              <input required type="date" value={date} onChange={e=>setDate(e.target.value)} className="w-full border rounded-xl px-4 py-2.5 text-sm" />
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border">
              <div className="flex justify-between text-sm mb-1"><span className="text-gray-500">Base Amount</span><span>₹{vendor.startingPrice?.toLocaleString() || '50,000'}</span></div>
              <div className="flex justify-between text-sm mb-1"><span className="text-gray-500">Taxes</span><span>₹0</span></div>
              <div className="border-t my-2 pt-2 flex justify-between font-bold text-gray-800"><span>Total Payable Now</span><span>₹{vendor.startingPrice?.toLocaleString() || '50,000'}</span></div>
            </div>
            <button type="submit" disabled={loading} className="w-full py-3 text-sm font-semibold text-white rounded-xl bg-green-600 hover:bg-green-700 transition">
              {loading ? 'Processing Payment...' : 'Pay & Confirm Booking'}
            </button>
            <p className="text-xs text-center text-gray-400 mt-2">🔒 Payments are secured by Planora.</p>
          </form>
        )}
      </div>
    </div>
  );
}

function Stars({ rating }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{color: i <= Math.round(rating) ? '#F59E0B' : '#D1D5DB', fontSize:'1rem'}}>★</span>
      ))}
    </span>
  );
}

export default function VendorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vendor, setVendor] = useState(null);
  const [lightbox, setLightbox] = useState(null);
  const [showInquiry, setShowInquiry] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('about');
  const [inquirySent, setInquirySent] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const load = async () => {
      try {
        const res = await fetch(`${API}/api/vendors/${id}`);
        const data = await res.json();
        if (data.success && data.vendor) { setVendor(data.vendor); return; }
      } catch(_) {}
      const mock = getVendorById(id);
      if (mock) setVendor(mock);
    };
    load();
    const sent = localStorage.getItem(`inquiry_${id}`);
    if (sent) setInquirySent(true);
    const wlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    if (wlist.includes(id)) setWishlisted(true);
  }, [id]);

  const toggleWishlist = () => {
    setWishlisted(!wishlisted);
    const wlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    if (wishlisted) {
      localStorage.setItem('wishlist', JSON.stringify(wlist.filter(w => w !== id)));
    } else {
      localStorage.setItem('wishlist', JSON.stringify([...wlist, id]));
    }
  };

  const handleInquiryComplete = () => {
    localStorage.setItem(`inquiry_${id}`, 'true');
    setInquirySent(true);
  };

  if (!vendor) return (
    <div className="min-h-screen flex items-center justify-center" style={{background:'#FDFBF9'}}>
      <div className="text-center">
        <div className="text-5xl mb-4">🔍</div>
        <h2 className="font-serif text-2xl text-gray-800 mb-2">Vendor Not Found</h2>
        <p className="text-gray-400 text-sm mb-6">This vendor may no longer be available.</p>
        <button onClick={() => navigate('/find-vendors')} className="bg-[#DB927D] text-white px-6 py-2.5 !rounded-xl text-sm font-semibold">Browse Vendors</button>
      </div>
    </div>
  );

  const fmt = (n) => n >= 100000 ? `₹${(n/100000).toFixed(n%100000===0?0:1)}L` : `₹${n.toLocaleString('en-IN')}`;

  return (
    <div className="min-h-screen font-sans" style={{background:'#FDFBF9'}}>
      {showInquiry && <InquiryModal vendor={vendor} onClose={() => { setShowInquiry(false); handleInquiryComplete(); }} />}
      {showBooking && <BookNowModal vendor={vendor} onClose={() => setShowBooking(false)} />}
      {lightbox !== null && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center" style={{background:'rgba(0,0,0,0.9)'}} onClick={() => setLightbox(null)}>
          <img src={vendor.images[lightbox]} alt="Gallery" className="max-w-4xl max-h-[85vh] object-contain rounded-xl" />
          <button className="absolute top-6 right-6 text-white text-3xl !rounded-full w-10 h-10 flex items-center justify-center bg-white/10">✕</button>
          {lightbox > 0 && <button onClick={e=>{e.stopPropagation();setLightbox(l=>l-1)}} className="absolute left-6 text-white text-4xl !rounded-full w-12 h-12 flex items-center justify-center bg-white/10">‹</button>}
          {lightbox < vendor.images.length-1 && <button onClick={e=>{e.stopPropagation();setLightbox(l=>l+1)}} className="absolute right-6 text-white text-4xl !rounded-full w-12 h-12 flex items-center justify-center bg-white/10">›</button>}
        </div>
      )}

      {/* Top Nav */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm px-6 py-3 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-[#DB927D] text-sm font-medium flex items-center gap-1 !rounded-lg !transform-none !shadow-none">← Back</button>
        <div className="flex-1 min-w-0">
          <span className="font-semibold text-gray-800 text-sm truncate">{vendor.name}</span>
          <span className="text-gray-400 text-xs mx-2">·</span>
          <span className="text-gray-400 text-xs">{vendor.category}</span>
        </div>
        <button onClick={() => navigate('/portal/couple')} className="font-serif text-xl tracking-widest text-gray-800 !rounded-none !transform-none !shadow-none hidden md:block">PLANORA</button>
      </nav>

      {/* Hero Banner */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img src={vendor.coverImage} alt={vendor.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{background:'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)'}} />
        <div className="absolute bottom-0 left-0 p-6 md:p-10">
          <div className="flex flex-wrap gap-2 mb-2">
            {vendor.isVerified && <span className="px-3 py-1 text-xs font-bold text-white rounded-full" style={{background:'#059669'}}>✓ Verified Vendor</span>}
            {vendor.trending && <span className="px-3 py-1 text-xs font-bold text-white rounded-full" style={{background:'#E11D48'}}>🔥 Popular Choice</span>}
          </div>
          <h1 className="font-serif text-3xl md:text-5xl text-white mb-1">{vendor.name}</h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-200">
            <span>{vendor.category}</span>
            <span>·</span>
            <span>📍 {vendor.city}</span>
            <span>·</span>
            <div className="flex items-center gap-1">
              <Stars rating={vendor.rating} />
              <span className="font-semibold text-white">{vendor.rating}</span>
              <span>({vendor.reviewCount} reviews)</span>
            </div>
          </div>
          <p className="text-amber-300 text-sm font-semibold mt-2">Booked {vendor.bookingsThisMonth}+ times this month</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col lg:flex-row gap-8">
        {/* LEFT */}
        <div className="flex-1 min-w-0">
          {/* Tabs */}
          <div className="flex gap-1 mb-6 border-b border-gray-200">
            {['about','gallery','reviews','pricing'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-semibold capitalize !rounded-none !transform-none !shadow-none border-b-2 transition-all ${activeTab===tab ? 'border-[#DB927D] text-[#DB927D]' : 'border-transparent text-gray-500 hover:text-gray-800'}`}>
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'about' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h3 className="font-serif text-xl text-gray-800 mb-3">About</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{vendor.description}</p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h3 className="font-serif text-xl text-gray-800 mb-4">Services Offered</h3>
                <div className="flex flex-wrap gap-2">
                  {vendor.services.map(s => (
                    <span key={s} className="px-3 py-1.5 text-sm font-medium rounded-full" style={{background:'#FFF7ED', color:'#92400E', border:'1px solid #FED7AA'}}>{s}</span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {vendor.images.slice(0,4).map((img, i) => (
                  <div key={i} onClick={() => setActiveTab('gallery')} className="relative overflow-hidden rounded-xl cursor-pointer group h-36 bg-gray-100">
                    <img src={img} alt={`Work ${i+1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'gallery' && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {vendor.images.map((img, i) => (
                <div key={i} onClick={() => setLightbox(i)} className="relative overflow-hidden rounded-xl cursor-pointer group aspect-square bg-gray-100">
                  <img src={img} alt={`Photo ${i+1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                    <span className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-all">🔍</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-6">
                <div className="text-center">
                  <div className="font-serif text-5xl text-gray-800">{vendor.rating}</div>
                  <Stars rating={vendor.rating} />
                  <div className="text-xs text-gray-400 mt-1">{vendor.reviewCount} reviews</div>
                </div>
                <div className="flex-1">
                  {[5,4,3,2,1].map(star => {
                    const pct = star >= 4 ? (star===5?70:20) : (star===3?7:3);
                    return (
                      <div key={star} className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-gray-400 w-2">{star}</span>
                        <span style={{color:'#F59E0B'}} className="text-xs">★</span>
                        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{width:`${pct}%`, background:'#F59E0B'}} />
                        </div>
                        <span className="text-xs text-gray-400 w-8">{pct}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              {vendor.reviews.map((r, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-semibold text-gray-800 text-sm">{r.name}</div>
                      <div className="text-xs text-gray-400">{r.date}</div>
                    </div>
                    <Stars rating={r.rating} />
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">"{r.comment}"</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'pricing' && (
            <div className="space-y-4">
              {vendor.packages.map((pkg, i) => (
                <div key={i} className={`bg-white rounded-2xl p-6 border-2 shadow-sm transition-all hover:shadow-md ${i===1 ? 'border-[#DB927D]' : 'border-gray-100'}`}>
                  {i===1 && <span className="inline-block text-xs font-bold text-white px-3 py-1 rounded-full mb-3" style={{background:'#DB927D'}}>⭐ Most Popular</span>}
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-serif text-xl text-gray-800">{pkg.name}</h4>
                    <div className="text-right">
                      <div className="font-bold text-gray-800">{fmt(pkg.price)}</div>
                      {vendor.category === 'Caterer' && <div className="text-xs text-gray-400">per plate</div>}
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mb-4">{pkg.desc}</p>
                  <button onClick={() => setShowInquiry(true)}
                    className="w-full py-2.5 text-sm font-semibold border-2 !rounded-xl transition-all"
                    style={{borderColor:'#DB927D', color:'#DB927D', background:'transparent'}}>
                    Inquire About {pkg.name}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT STICKY SIDEBAR */}
        <div className="lg:w-80 flex-shrink-0">
          <div className="sticky top-20 space-y-4">
            {/* Price Card */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Starting From</span>
                {vendor.trending && <span className="text-xs font-bold px-2 py-0.5 text-white rounded-full" style={{background:'#E11D48'}}>🔥 High Demand</span>}
              </div>
              <div className="font-serif text-3xl text-gray-800 mb-1">{fmt(vendor.startingPrice)}</div>
              <div className="flex items-center gap-2 mb-4">
                <Stars rating={vendor.rating} />
                <span className="text-sm font-semibold text-gray-700">{vendor.rating}</span>
                <span className="text-sm text-gray-400">({vendor.reviewCount})</span>
              </div>
              <div className="space-y-2 text-sm text-gray-600 mb-5">
                <div className="flex items-center gap-2"><span>📍</span><span>{vendor.city}</span></div>
                <div className="flex items-center gap-2"><span>✓</span><span className="text-green-600 font-medium">Verified Vendor</span></div>
                <div className="flex items-center gap-2"><span>📅</span><span>Usually responds in 2 hrs</span></div>
                <div className="flex items-center gap-2"><span>🏆</span><span>{vendor.bookingsThisMonth}+ bookings this month</span></div>
              </div>
              <p className="text-xs text-red-500 font-medium mb-4">🔒 Contact details available after booking or request</p>

              <div className="space-y-2">
                {inquirySent ? (
                  <div className="w-full py-3 text-center text-sm font-semibold text-green-700 bg-green-50 border border-green-200 rounded-xl">
                    ✓ Inquiry Sent — Vendor will contact you soon
                  </div>
                ) : (
                  <button onClick={() => setShowInquiry(true)}
                    className="w-full py-3 text-sm font-semibold text-white !rounded-xl transition-all"
                    style={{background:'linear-gradient(135deg,#DB927D,#c27c68)'}}>
                    💌 Request Quote
                  </button>
                )}
                <button onClick={() => setShowBooking(true)}
                  className="w-full py-3 text-sm font-semibold text-white !rounded-xl bg-green-600 hover:bg-green-700 transition-all">
                  💳 Book Now
                </button>
                <button onClick={() => navigate('/dashboard/couple?tab=messages')}
                  className="w-full py-2.5 text-sm font-semibold !rounded-xl border-2 transition-all"
                  style={{borderColor:'#DB927D', color:'#DB927D', background:'transparent'}}>
                  💬 Chat with Vendor
                </button>
                <button onClick={toggleWishlist}
                  className={`w-full py-2.5 text-sm font-semibold !rounded-xl border transition-all ${wishlisted ? 'bg-pink-50 border-pink-300 text-pink-600' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
                  {wishlisted ? '❤️ Saved to Wishlist' : '🤍 Add to Wishlist'}
                </button>
              </div>
            </div>

            {/* Urgency Card */}
            <div className="rounded-2xl p-4 border text-sm" style={{background:'#FFF7ED', borderColor:'#FED7AA'}}>
              <p className="font-semibold text-amber-800 mb-1">⚡ Limited Availability</p>
              <p className="text-amber-700 text-xs">This vendor has limited slots remaining for the next 3 months. Send an inquiry to check your date.</p>
            </div>

            {/* Trust Signals */}
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Why Trust This Vendor</p>
              <div className="space-y-2 text-xs text-gray-600">
                <div className="flex items-center gap-2">✅ <span>Identity & business verified</span></div>
                <div className="flex items-center gap-2">🔒 <span>Secure inquiry — no spam</span></div>
                <div className="flex items-center gap-2">⭐ <span>Top rated in {vendor.city}</span></div>
                <div className="flex items-center gap-2">💬 <span>Responds via Planora messages</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
