import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { parseJwt } from '../utils/auth';
const API = import.meta.env.VITE_API_URL;

function VendorDashboardNav({ handleLogout }) {
  const navigate = useNavigate();
  return (
    <nav className="flex justify-between items-center py-4 px-8 bg-white border-b border-wedding-gold/20 sticky top-0 z-50 shadow-sm">
      <div className="font-serif text-2xl tracking-widest text-wedding-gray cursor-pointer" onClick={() => navigate('/portal/vendor')}>
        PLANORA <span className="text-xs uppercase ml-2 text-wedding-gold font-sans tracking-normal">Partners</span>
      </div>
      <div className="flex gap-6 items-center text-sm font-medium text-wedding-gray">
        <button onClick={() => navigate('/portal/vendor')} className="hover:text-wedding-gold transition">Back to Portal</button>
        <button onClick={handleLogout} className="border border-wedding-gold bg-wedding-gold text-white px-4 py-2 rounded-sm hover:bg-yellow-600 transition">Sign Out</button>
      </div>
    </nav>
  );
}

function VendorDashboardUI() {
  const [activeTab, setActiveTab] = useState('Overview Analytics');
  
  const [bookings, setBookings] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [newMsgContent, setNewMsgContent] = useState('');

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch(`${API}/api/bookings/vendor`, { headers: { 'Authorization': `Bearer ${token}` }});
      const data = await res.json();
      if(data.success && data.bookings) {
        setBookings(data.bookings);
      }
    } catch(e){}
  };

  const fetchConversations = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch(`${API}/api/messages/conversations`, { headers: { 'Authorization': `Bearer ${token}` }});
      const data = await res.json();
      if(data.success && data.conversations) {
        setConversations(data.conversations);
        if(data.conversations.length > 0 && !activeChatId) setActiveChatId(data.conversations[0]._id);
      }
    } catch(e){}
  };

  const fetchChat = async (userId) => {
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch(`${API}/api/messages/${userId}`, { headers: { 'Authorization': `Bearer ${token}` }});
      const data = await res.json();
      if(data.success && data.messages) setMessages(data.messages);
    } catch(e){}
  };

  const handleSendMsg = async () => {
    if(!newMsgContent || !activeChatId) return;
    try {
      const token = localStorage.getItem('accessToken');
      await fetch(`${API}/api/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ receiverId: activeChatId, content: newMsgContent })
      });
      setNewMsgContent('');
      fetchChat(activeChatId);
    } catch(e){}
  };

  const handleAccept = async (id) => {
    try {
      const token = localStorage.getItem('accessToken');
      await fetch(`${API}/api/bookings/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status: 'active' })
      });
      fetchBookings();
    } catch(e){}
  };

  useEffect(() => {
    if(activeTab === 'Booking Requests') fetchBookings();
    if(activeTab === 'Messages') fetchConversations();
  }, [activeTab]);

  useEffect(() => {
    if(activeChatId) fetchChat(activeChatId);
  }, [activeChatId]);

  const [profileForm, setProfileForm] = useState({
    businessName: 'Oberoi Udaivilas Mock Vendor',
    category: 'Palace & Resort Venues',
    location: 'Udaipur',
    price: '₹45L+'
  });
  const [isSaved, setIsSaved] = useState(false);

  const handleProfileSave = (e) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const [uploadedImages, setUploadedImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const decoded = parseJwt(token);
      if (decoded && decoded.username) {
        setUsername(decoded.username);
      }
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'Portfolio Upload') {
      const fetchImages = async () => {
        try {
          const token = localStorage.getItem('accessToken');
          const res = await fetch(`${API}/api/image/get`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const data = await res.json();
          if (data.success) {
             setUploadedImages(data.data.reverse());
          }
        } catch (err) {
          console.error(err);
        }
      };
      fetchImages();
    }
  }, [activeTab]);

  const [profileMsg, setProfileMsg] = useState('');

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch(`${API}/api/vendors/profile/me`, { headers: { 'Authorization': `Bearer ${token}` }});
      const data = await res.json();
      if(data.success && data.profile) {
        setProfileForm({
          businessName: data.profile.businessName || '',
          category: data.profile.category || '',
          location: data.profile.location || (data.profile.coverageAreas && data.profile.coverageAreas[0]) || '',
          startingPrice: data.profile.startingPrice || ''
        });
      }
    } catch(e){}
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    setProfileMsg('');
    try {
        const token = localStorage.getItem('accessToken');
        const res = await fetch(`${API}/api/vendors/profile`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({...profileForm, coverageAreas: [profileForm.location]})
        });
        if(res.ok) setProfileMsg('Profile saved successfully!');
    } catch(e) {
        setProfileMsg('Failed to save profile.');
    }
    setTimeout(() => setProfileMsg(''), 3000);
  };

  useEffect(() => {
    if(activeTab === 'Profile Settings') fetchProfile();
  }, [activeTab]);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch(`${API}/api/image/upload`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        setUploadedImages(prev => [data.image, ...prev]);
      } else {
        alert(data.message || 'Error uploading image');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };



  const tabs = [
    'Overview Analytics',
    `Booking Requests (${bookings.filter(b => b.status === 'Pending').length})`,
    'Messages',
    'Portfolio Upload',
    'Profile Settings'
  ];

  return (
    <section className="py-20 px-6 bg-wedding-blush/10 min-h-[80vh]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row overflow-hidden rounded-md bg-white shadow-xl border border-gray-100 min-h-[600px]">
        
        {/* Sidebar */}
        <div className="w-full md:w-72 bg-gray-50 border-r border-gray-100 p-6 space-y-6">
          <div>
            <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-6">Command Center</h3>
            <ul className="space-y-4 text-sm text-gray-700">
              {tabs.map((tab, idx) => {
                // Determine base tab name without numbers for matching purposes
                const tabKey = tab.split(' (')[0];
                return (
                  <li 
                    key={idx} 
                    onClick={() => setActiveTab(tabKey)}
                    className={`cursor-pointer transition-colors px-4 py-2 rounded-sm ${activeTab === tabKey ? 'bg-wedding-gold text-white font-medium shadow-md' : 'hover:text-wedding-gold hover:bg-gray-100'}`}
                  >
                    {tab}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Main Area */}
        <div className="flex-1 p-8 md:p-12 overflow-y-auto bg-white">
          
          {activeTab === 'Overview Analytics' && (
            <div className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="p-6 border border-gray-100 rounded-sm bg-gray-50/50">
                  <div className="text-gray-500 text-sm mb-1">Total Earnings</div>
                  <div className="text-3xl font-serif text-gray-800">₹85,00,000</div>
                </div>
                <div className="p-6 border border-gray-100 rounded-sm bg-gray-50/50">
                  <div className="text-gray-500 text-sm mb-1">Upcoming Bookings</div>
                  <div className="text-3xl font-serif text-gray-800">8</div>
                </div>
                <div className="p-6 border border-gray-100 rounded-sm bg-gray-50/50">
                  <div className="text-gray-500 text-sm mb-1">Profile Views (30d)</div>
                  <div className="text-3xl font-serif text-gray-800">1,204</div>
                </div>
              </div>
              <h3 className="font-serif text-2xl text-gray-800 mb-4">Performance Highlights</h3>
              <div className="h-48 border-2 border-dashed border-gray-200 rounded-md flex items-center justify-center text-gray-400">
                  [Interactive Analytics Chart Placeholder]
              </div>
            </div>
          )}

          {activeTab === 'Booking Requests' && (
            <div className="animate-fade-in">
              <h3 className="font-serif text-2xl text-gray-800 mb-6">Booking Flow Management</h3>
              {bookings.length === 0 ? (
                <p className="text-gray-500 italic">No historical booking data available.</p>
              ) : (
                <div className="border border-gray-200 rounded-md divide-y divide-gray-100 text-left">
                  {bookings.map(booking => (
                      <div key={booking._id} className={`flex flex-col md:flex-row justify-between items-center p-6 ${booking.status === 'active' ? 'bg-green-50/30' : 'bg-white'}`}>
                      <div className="mb-4 md:mb-0 w-full md:w-auto">
                          <div className="font-medium text-gray-800 flex items-center gap-3">
                              {booking.coupleNames || booking.clientId.username}
                              {booking.status === 'active' && <span className="bg-green-100 text-green-700 text-[10px] uppercase font-bold px-2 py-0.5 rounded-sm">Confirmed</span>}
                          </div>
                          <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                              <span>📅 {booking.weddingDateLocation}</span>
                          </div>
                          <div className="text-xs text-gray-400 mt-1">Message: {booking.message}</div>
                      </div>
                      <div className="flex gap-3 w-full md:w-auto justify-start md:justify-end">
                          {booking.status === 'pending' ? (
                              <button onClick={() => handleAccept(booking._id)} className="bg-wedding-gold text-white px-6 py-2 text-sm rounded-sm hover:bg-yellow-600 transition shadow-sm font-medium">Accept</button>
                          ) : (
                              <button disabled className="bg-gray-100 text-gray-400 px-6 py-2 text-sm rounded-sm cursor-not-allowed font-medium border border-gray-200">Accepted</button>
                          )}
                          <button onClick={()=>{setActiveTab('Messages'); setActiveChatId(booking.clientId._id);}} className="border border-gray-300 text-gray-600 px-6 py-2 text-sm rounded-sm hover:bg-gray-50 transition font-medium">Message</button>
                      </div>
                      </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'Portfolio Upload' && (
            <div className="animate-fade-in text-left">
              <h3 className="font-serif text-2xl text-gray-800 mb-6">Manage Your Portfolio</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-10 text-center bg-gray-50 flex flex-col items-center justify-center mb-8 relative hover:bg-gray-100 transition">
                  <div className="text-4xl mb-4">☁️</div>
                  <h4 className="font-serif text-xl mb-2 text-gray-700">Drag & Drop Imagery</h4>
                  <p className="text-sm text-gray-500 mb-6">Upload high-resolution editorial photos of your venues or services. Max 10MB per file.</p>
                  
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileUpload} 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={isUploading}
                  />

                  <button className={`bg-wedding-gold text-white px-8 py-3 uppercase tracking-wider text-sm shadow-sm rounded-sm pointer-events-none ${isUploading ? 'opacity-50' : ''}`}>
                    {isUploading ? 'Uploading to Server...' : 'Click to Upload'}
                  </button>
              </div>

              <h4 className="font-serif text-xl text-gray-800 mb-4">Live Cloudinary Gallery ({uploadedImages.length})</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {uploadedImages.map((img) => (
                  <div key={img._id || Math.random()} className="relative group rounded-sm overflow-hidden border border-gray-200">
                    <img src={img.url || img} alt="Gallery item" className="w-full h-32 object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       {/* Placeholder for future backend delete route */}
                       <button className="text-white text-xs border border-white px-3 py-1 hover:bg-white hover:text-black transition uppercase cursor-not-allowed opacity-50">Locked</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Profile Settings' && (
                <div className="animate-fade-in flex flex-col h-[500px] overflow-y-auto">
                    <h3 className="font-serif text-2xl text-gray-800 mb-6 border-b pb-4">Business Details</h3>
                    <form onSubmit={saveProfile}>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="col-span-2 mb-2">
                        <label className="text-xs text-gray-500 uppercase tracking-widest font-semibold block mb-1">Account Username (Login ID)</label>
                        <input type="text" readOnly value={username} className="w-full border border-gray-200 p-2 text-sm bg-gray-50 text-gray-500 cursor-not-allowed" />
                      </div>
                      <div className="col-span-2">
                        <label className="text-xs text-gray-500 uppercase tracking-widest font-semibold block mb-1">Registered Business Name</label>
                        <input type="text" value={profileForm.businessName} onChange={(e) => setProfileForm({...profileForm, businessName: e.target.value})} className="w-full border border-gray-200 p-2 text-sm focus:outline-none focus:border-wedding-gold transition" />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 uppercase tracking-widest font-semibold block mb-1">Primary Category</label>
                        <select value={profileForm.category} onChange={(e) => setProfileForm({...profileForm, category: e.target.value})} className="w-full border border-gray-200 p-2 text-sm focus:outline-none focus:border-wedding-gold transition bg-white">
                            <option value="">Select Category</option>
                            <option value="Palace Venues">Palace Venues</option>
                            <option value="Destination Planners">Destination Planners</option>
                            <option value="Cinematography">Cinematography</option>
                            <option value="Bespoke Decor">Bespoke Decor</option>
                            <option value="Makeup Artist">Makeup Artist</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 uppercase tracking-widest font-semibold block mb-1">Base Location</label>
                        <select value={profileForm.location} onChange={(e) => setProfileForm({...profileForm, location: e.target.value})} className="w-full border border-gray-200 p-2 text-sm focus:outline-none focus:border-wedding-gold transition bg-white">
                            <option value="">Select Location</option>
                            <option value="Udaipur">Udaipur</option>
                            <option value="Goa">Goa</option>
                            <option value="Jaipur">Jaipur</option>
                            <option value="Mumbai">Mumbai</option>
                            <option value="International Destination">International Destination</option>
                        </select>
                      </div>
                      <div className="col-span-2">
                        <label className="text-xs text-gray-500 uppercase tracking-widest font-semibold block mb-1">Starting Price Tier</label>
                        <select value={profileForm.startingPrice} onChange={(e) => setProfileForm({...profileForm, startingPrice: e.target.value})} className="w-full border border-gray-200 p-2 text-sm focus:outline-none focus:border-wedding-gold transition bg-white">
                            <option value="">Select Price</option>
                            <option value="Under ₹1L">Under ₹1L</option>
                            <option value="₹1L to ₹5L">₹1L to ₹5L</option>
                            <option value="Premium (₹5L+)">Premium (₹5L+)</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mb-8">
                        <button type="submit" className="bg-gray-900 text-white px-6 py-2 rounded-sm text-sm font-medium hover:bg-gray-800 transition tracking-wide uppercase">Save Business Profile</button>
                        {profileMsg && <span className="text-sm font-medium text-green-600 animate-fade-in">{profileMsg}</span>}
                    </div>
                    </form>
                </div>
          )}

          {activeTab === 'Messages' && (
                <div className="animate-fade-in h-[500px] flex overflow-hidden border border-gray-100">
                    {/* Conversations List */}
                    <div className="w-1/3 border-r border-gray-100 bg-gray-50 overflow-y-auto hidden sm:block">
                        {conversations.length === 0 ? <p className="text-gray-400 text-xs italic p-4">No messages.</p> : conversations.map(c => (
                          <div key={c._id} onClick={()=>setActiveChatId(c._id)} className={`p-4 border-b border-gray-100 cursor-pointer text-sm ${activeChatId===c._id ? 'bg-wedding-blush/20 border-l-2 border-wedding-gold' : 'hover:bg-gray-100'}`}>
                              <div className="font-medium text-gray-800 truncate">{c.displayName}</div>
                              <div className="text-xs text-gray-400 truncate mt-1">Client</div>
                          </div>
                        ))}
                    </div>
                    {/* Chat Area */}
                    <div className="flex-1 flex flex-col h-full bg-white p-4">
                      {activeChatId ? (
                        <>
                          <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 pb-2">
                              {messages.map(m => {
                                const isMe = m.senderId !== activeChatId;
                                return (
                                  <div key={m._id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                                      <div className={`px-4 py-2 text-sm max-w-[85%] ${isMe ? 'bg-wedding-cream text-gray-900 border border-wedding-gold/30 rounded-tl-xl rounded-b-xl rounded-tr-sm' : 'bg-gray-100 text-gray-800 border border-gray-200 rounded-tr-xl rounded-b-xl rounded-tl-sm'}`}>
                                          {m.content}
                                      </div>
                                  </div>
                                );
                              })}
                          </div>
                          <div className="mt-auto pt-2 flex gap-2 border-t border-gray-100 pt-4">
                              <input type="text" value={newMsgContent} onChange={e=>setNewMsgContent(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleSendMsg()} placeholder="Type a message..." className="flex-1 border border-gray-300 rounded-sm px-4 py-2 text-sm focus:outline-none focus:border-wedding-gold" />
                              <button onClick={handleSendMsg} className="bg-wedding-gold text-white px-6 py-2 rounded-sm text-sm font-medium hover:bg-yellow-600 transition">Send</button>
                          </div>
                        </>
                      ) : (
                        <div className="flex-1 flex items-center justify-center text-gray-400 text-sm italic">
                            Select a client conversation
                        </div>
                      )}
                    </div>
                </div>
          )}

        </div>
      </div>
    </section>
  );
}

export default function VendorDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/');
  };

  return (
    <div className="font-sans text-gray-800 selection:bg-wedding-blush selection:text-gray-900 bg-white">
      <VendorDashboardNav handleLogout={handleLogout} />
      <VendorDashboardUI />
      <Footer />
    </div>
  );
}
