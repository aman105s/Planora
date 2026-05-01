import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Footer from '../components/Footer';
import { handleGlobalLogoClick } from '../utils/auth';

export default function FindVendors() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const selectedLocation = searchParams.get('location') || 'All India';
  const selectedCategory = searchParams.get('category'); // Optional
  const fromPortal = searchParams.get('from'); // 'vendor' or 'couple'

  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [msgBoxFor, setMsgBoxFor] = useState(null);
  const [msgContent, setMsgContent] = useState('');
  const [bookingFor, setBookingFor] = useState(null);
  const [coupleNames, setCoupleNames] = useState('');
  const [weddingDateLocation, setWeddingDateLocation] = useState('');
  const [actionMessage, setActionMessage] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchVendors = async () => {
      setLoading(true);
      try {
        let query = [];
        if(selectedLocation && selectedLocation !== 'All India') query.push(`location=${encodeURIComponent(selectedLocation)}`);
        if(selectedCategory) query.push(`category=${encodeURIComponent(selectedCategory)}`);
        const url = '/api/vendors?' + query.join('&');
        
        const res = await fetch(url);
        const data = await res.json();
        if(data.success) {
          setVendors(data.data);
        }
      } catch(e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchVendors();
  }, [selectedLocation, selectedCategory]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('accessToken');
      if(!token) return navigate('/login');
      await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ receiverId: msgBoxFor.id, content: msgContent })
      });
      setActionMessage('Message sent successfully!');
      setTimeout(() => { setMsgBoxFor(null); setActionMessage(''); setMsgContent(''); }, 2000);
    } catch(e) {}
  };

  const handleRequestBooking = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('accessToken');
      if(!token) return navigate('/login');
      await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ vendorId: bookingFor.id, coupleNames, weddingDateLocation, message: 'Requested from directory' })
      });
      setActionMessage('Booking request sent successfully!');
      setTimeout(() => { setBookingFor(null); setActionMessage(''); setCoupleNames(''); setWeddingDateLocation(''); }, 2000);
    } catch(e) {}
  };

  return (
    <div className="bg-wedding-gray min-h-screen flex flex-col font-sans selection:bg-wedding-blush text-gray-800">
      <nav className="flex justify-between items-center py-4 px-8 bg-white border-b border-wedding-gold/20 flex-none sticky top-0 z-50 shadow-sm">
        <div className="font-serif text-2xl tracking-widest text-wedding-gray cursor-pointer" onClick={() => handleGlobalLogoClick(navigate)}>
          PLANORA Directory
        </div>
        <div className="flex gap-4">
            <button onClick={() => navigate(fromPortal === 'vendor' ? '/portal/vendor' : '/portal/couple')} className="text-sm font-medium text-gray-500 hover:text-wedding-gold transition">Back to Profile</button>
        </div>
      </nav>
      
      <main className="flex-grow p-8 md:p-12 max-w-7xl mx-auto w-full relative">
        <div className="mb-10 text-center md:text-left flex flex-col md:flex-row justify-between items-end border-b border-gray-300 pb-6">
            <div>
                <h1 className="font-serif text-4xl text-white mb-2">Vendors for Your Wedding</h1>
                <p className="text-gray-300">
                    Showing results for: <span className="font-medium text-wedding-gold">{selectedLocation}</span>
                    {selectedCategory && <span> {'>'} {selectedCategory}</span>}
                </p>
            </div>
            <div className="text-gray-400 text-sm mt-4 md:mt-0">{vendors.length} Luxury Partners Found</div>
        </div>

        {loading ? (
            <div className="text-center text-gray-300 p-16">Loading luxury vendors...</div>
        ) : vendors.length === 0 ? (
            <div className="bg-white/5 border border-gray-700 rounded-md p-16 text-center text-gray-300 flex flex-col items-center">
                <p className="text-xl font-serif mb-2 text-wedding-gold">No vendors matched your exact criteria.</p>
                <p className="text-sm">We are rapidly expanding our exclusive network. Please try adjusting your destination or category.</p>
                <button onClick={() => navigate('/find-vendors?location=All%20India')} className="mt-6 border border-wedding-gold text-wedding-gold px-6 py-2 uppercase tracking-wider text-sm hover:bg-wedding-gold hover:text-white transition">View All India</button>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {vendors.map(vendor => (
                    <div key={vendor.id} className="bg-white rounded-sm overflow-hidden shadow-lg transition group border-b-4 border-transparent hover:border-wedding-gold flex flex-col">
                        <div className="h-48 overflow-hidden relative">
                            <img src={vendor.img} alt={vendor.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                            <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-sm">★ {vendor.rating}</div>
                        </div>
                        <div className="p-5 flex-grow">
                            <div className="text-xs font-bold uppercase tracking-wider text-wedding-gold mb-1">{vendor.category}</div>
                            <h3 className="font-serif text-xl text-gray-900 mb-2">{vendor.name}</h3>
                            <div className="flex justify-between items-center text-sm text-gray-500">
                                <span className="flex items-center gap-1">📍 {vendor.location}</span>
                                <span>{vendor.price? `₹${vendor.price}` : 'Request Price'}</span>
                            </div>
                        </div>
                        <div className="flex border-t border-gray-100">
                            <button onClick={() => setMsgBoxFor(vendor)} className="flex-1 py-3 text-xs uppercase tracking-wider text-gray-600 hover:text-wedding-gold hover:bg-gray-50 transition border-r border-gray-100 font-medium">Message</button>
                            <button onClick={() => setBookingFor(vendor)} className="flex-1 py-3 text-xs uppercase tracking-wider text-wedding-gold hover:bg-wedding-gold hover:text-white transition font-medium">Request</button>
                        </div>
                    </div>
                ))}
            </div>
        )}

        {/* Modals */}
        {(msgBoxFor || bookingFor) && (
            <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4">
                <div className="bg-white rounded-sm max-w-md w-full p-6 animate-fade-in-up">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-serif text-2xl text-gray-800">
                            {msgBoxFor ? `Message ${msgBoxFor.name}` : `Request Booking from ${bookingFor.name}`}
                        </h3>
                        <button onClick={() => {setMsgBoxFor(null); setBookingFor(null); setActionMessage('');}} className="text-gray-400 hover:text-gray-800 text-2xl">&times;</button>
                    </div>

                    {actionMessage ? (
                        <div className="text-center p-6 text-green-600 bg-green-50 rounded-sm">{actionMessage}</div>
                    ) : msgBoxFor ? (
                        <form onSubmit={handleSendMessage} className="space-y-4">
                            <textarea required value={msgContent} onChange={e=>setMsgContent(e.target.value)} placeholder="Type your message about availability, pricing, etc..." className="w-full border border-gray-300 p-3 rounded-sm h-32 focus:border-wedding-gold focus:outline-none"></textarea>
                            <button type="submit" className="w-full bg-wedding-gold text-white py-3 uppercase tracking-wider text-sm hover:bg-yellow-600 transition">Send Message</button>
                        </form>
                    ) : (
                        <form onSubmit={handleRequestBooking} className="space-y-4">
                            <div>
                                <label className="block text-xs uppercase text-gray-500 mb-1">Couple Names</label>
                                <input required type="text" value={coupleNames} onChange={e=>setCoupleNames(e.target.value)} placeholder="e.g. Ananya & Rohan" className="w-full border border-gray-300 p-3 rounded-sm focus:border-wedding-gold focus:outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs uppercase text-gray-500 mb-1">Wedding Date & Location</label>
                                <input required type="text" value={weddingDateLocation} onChange={e=>setWeddingDateLocation(e.target.value)} placeholder="e.g. October 12th, Udaipur" className="w-full border border-gray-300 p-3 rounded-sm focus:border-wedding-gold focus:outline-none" />
                            </div>
                            <button type="submit" className="w-full bg-gray-900 text-white py-3 uppercase tracking-wider text-sm hover:bg-gray-800 transition">Submit Request</button>
                        </form>
                    )}
                </div>
            </div>
        )}

      </main>
      
      <div className="bg-white"><Footer /></div>
    </div>
  );
}
