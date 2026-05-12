import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import VendorCard from './VendorCard';

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
  { icon:'🔍', title:'Find Vendors', subtitle:'Browse top wedding pros', gradient:'from-amber-50 to-orange-50', border:'border-amber-200', iconBg:'bg-amber-100', path:'/find-vendors' },
  { icon:'💰', title:'Budget Planner', subtitle:'Track your spending', gradient:'from-emerald-50 to-teal-50', border:'border-emerald-200', iconBg:'bg-emerald-100', path:'/dashboard/couple', tab:'budget' },
  { icon:'✅', title:'Wedding Checklist', subtitle:'Stay on track', gradient:'from-purple-50 to-violet-50', border:'border-purple-200', iconBg:'bg-purple-100', path:'/dashboard/couple', tab:'checklist' },
  { icon:'📋', title:'Manage Bookings', subtitle:'View all bookings', gradient:'from-rose-50 to-pink-50', border:'border-rose-200', iconBg:'bg-rose-100', path:'/dashboard/couple', tab:'bookings' },
];

function SectionHeader({ title, subtitle, actionLabel, onAction }) {
  return (
    <div className="flex items-end justify-between mb-6">
      <div>
        <h3 className="font-serif text-2xl text-gray-800">{title}</h3>
        {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
      </div>
      {actionLabel && (
        <button onClick={onAction} className="text-sm text-wedding-gold font-semibold hover:underline !rounded-none !transform-none !shadow-none">
          {actionLabel} →
        </button>
      )}
    </div>
  );
}

function QuickActions() {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
      {QUICK_ACTIONS.map((a) => (
        <button
          key={a.title}
          onClick={() => navigate(a.path)}
          className={`quick-action-card p-5 rounded-2xl border-2 ${a.border} bg-gradient-to-br ${a.gradient} text-left hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer !rounded-2xl`}
        >
          <div className={`w-10 h-10 ${a.iconBg} rounded-xl flex items-center justify-center text-xl mb-3`}>{a.icon}</div>
          <div className="font-semibold text-gray-800 text-sm leading-tight">{a.title}</div>
          <div className="text-xs text-gray-500 mt-1">{a.subtitle}</div>
        </button>
      ))}
    </div>
  );
}

function VendorCarousel({ vendors, title, subtitle }) {
  const ref = useRef(null);
  const navigate = useNavigate();
  const scroll = (dir) => ref.current?.scrollBy({ left: dir * 280, behavior: 'smooth' });

  return (
    <div className="mb-12">
      <SectionHeader title={title} subtitle={subtitle} actionLabel="View All" onAction={() => navigate('/find-vendors')} />
      <div className="relative">
        <button onClick={() => scroll(-1)} className="carousel-nav-btn left-0 !rounded-full">‹</button>
        <div ref={ref} className="flex gap-4 overflow-x-auto pb-4 scroll-smooth hide-scrollbar px-2">
          {vendors.map(v => <VendorCard key={v.id} vendor={v} />)}
        </div>
        <button onClick={() => scroll(1)} className="carousel-nav-btn right-0 !rounded-full">›</button>
      </div>
    </div>
  );
}

function TopVendorsGrid({ vendors, city }) {
  const navigate = useNavigate();
  return (
    <div className="mb-12">
      <SectionHeader
        title={`📍 Top Vendors in ${city}`}
        subtitle="Highest rated pros near your wedding location"
        actionLabel="View All"
        onAction={() => navigate('/find-vendors')}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {vendors.slice(0, 6).map(v => (
          <div key={v.id}
            onClick={() => navigate('/find-vendors')}
            className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-amber-200 transition-all cursor-pointer group">
            <img src={v.image} alt={v.name} className="w-16 h-16 rounded-xl object-cover flex-shrink-0 group-hover:scale-105 transition-transform" />
            <div className="min-w-0">
              <h4 className="font-semibold text-gray-800 text-sm truncate">{v.name}</h4>
              <span className="text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">{v.category}</span>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-yellow-400 text-xs">★</span>
                <span className="text-xs font-semibold text-gray-700">{v.rating}</span>
                <span className="text-xs text-gray-400">· {v.priceRange}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TrendingVendors({ vendors }) {
  const navigate = useNavigate();
  const trending = vendors.filter(v => v.trending);
  return (
    <div className="mb-12">
      <SectionHeader title="🔥 Trending This Week" subtitle="Most booked vendors right now" actionLabel="View All" onAction={() => navigate('/find-vendors')} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {trending.map(v => (
          <div key={v.id}
            onClick={() => navigate('/find-vendors')}
            className="flex gap-4 p-4 bg-gradient-to-r from-rose-50 to-orange-50 border border-rose-200 rounded-2xl hover:shadow-md transition-all cursor-pointer group">
            <img src={v.image} alt={v.name} className="w-20 h-20 rounded-xl object-cover flex-shrink-0 group-hover:scale-105 transition-transform" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs bg-rose-500 text-white px-2 py-0.5 rounded-full font-bold">🔥 Trending</span>
              </div>
              <h4 className="font-semibold text-gray-800 text-sm">{v.name}</h4>
              <p className="text-xs text-gray-500">{v.category} · {v.city}</p>
              <p className="text-xs text-rose-500 font-medium mt-1">Booked {v.bookings}+ times this week</p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-yellow-400 text-xs">★</span>
                <span className="text-xs font-semibold">{v.rating}</span>
                <span className="text-xs text-gray-400">({v.reviews} reviews) · {v.priceRange}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DashboardHome({ username, prefs, activeBookings, pendingBookings }) {
  const city = prefs?.city || 'Mumbai';
  const cityVendors = VENDORS.filter(v => v.city === city).length >= 3
    ? VENDORS.filter(v => v.city === city)
    : VENDORS;

  const daysText = (() => {
    const profileDate = null;
    return profileDate ? `${profileDate} days until your celebration` : 'Your big day is coming ✨';
  })();

  return (
    <div className="dashboard-home py-8 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Hero Greeting */}
        <div className="relative overflow-hidden rounded-3xl mb-10 p-8 md:p-10"
          style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #2d1b3d 40%, #4a2040 100%)' }}>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&auto=format&fit=crop)', backgroundSize:'cover', backgroundPosition:'center' }} />
          <div className="relative z-10">
            <p className="text-amber-300 text-sm font-medium tracking-widest uppercase mb-2">Welcome back</p>
            <h1 className="font-serif text-3xl md:text-5xl text-white mb-3">Hello, {username || 'Beautiful Couple'} 💍</h1>
            <p className="text-gray-300 text-sm md:text-base">{daysText}</p>
            <div className="flex flex-wrap gap-4 mt-6">
              {pendingBookings > 0 && (
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2 text-white text-sm">
                  <span className="font-bold text-amber-300">{pendingBookings}</span> pending {pendingBookings === 1 ? 'request' : 'requests'}
                </div>
              )}
              {activeBookings > 0 && (
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2 text-white text-sm">
                  <span className="font-bold text-green-300">{activeBookings}</span> confirmed {activeBookings === 1 ? 'booking' : 'bookings'}
                </div>
              )}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2 text-white text-sm">
                📍 Planning in <span className="font-bold text-amber-300">{city}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <SectionHeader title="Quick Actions" subtitle="Everything you need, one tap away" />
        <QuickActions />

        {/* Recommended for You */}
        <VendorCarousel
          vendors={VENDORS}
          title="Recommended For You"
          subtitle={`Popular wedding vendors loved by couples in ${city}`}
        />

        {/* Top Vendors Near You */}
        <TopVendorsGrid vendors={cityVendors} city={city} />

        {/* Trending */}
        <TrendingVendors vendors={VENDORS} />
      </div>
    </div>
  );
}
