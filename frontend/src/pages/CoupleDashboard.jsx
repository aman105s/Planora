import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { parseJwt } from '../utils/auth';
const API = import.meta.env.VITE_API_URL;


function DashboardNav({ handleLogout }) {
  const navigate = useNavigate();
  return (
    <nav className="flex justify-between items-center py-4 px-8 bg-white border-b border-wedding-gold/20 sticky top-0 z-50">
      <div className="font-serif text-2xl tracking-widest text-wedding-gray cursor-pointer" onClick={() => navigate('/portal/couple')}>
        PLANORA
      </div>
      <div className="flex gap-6 items-center text-sm font-medium text-wedding-gray">
        <button onClick={() => navigate('/portal/couple')} className="hover:text-wedding-gold transition">Back to Portal</button>
        <button onClick={handleLogout} className="border border-wedding-gold bg-wedding-gold text-white px-4 py-2 rounded-sm hover:bg-yellow-600 transition">Sign Out</button>
      </div>
    </nav>
  );
}

function DashboardUI() {
  const [activeTab, setActiveTab] = useState('bookings');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passMessage, setPassMessage] = useState('');
  const [passError, setPassError] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
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
  
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPassMessage('');
    setPassError(false);
    setIsUpdating(true);

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) throw new Error('Authorization required.');

      const response = await fetch(`${API}/api/auth/change-password`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ oldPassword, newPassword })
      });

      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || 'Failed to update password.');

      setPassMessage('Password changed successfully.');
      setOldPassword('');
      setNewPassword('');
    } catch(err) {
      setPassError(true);
      setPassMessage(err.message);
    } finally {
      setIsUpdating(false);
    }
  };
  
  // Fetch Bookings
  const [activeBookings, setActiveBookings] = useState([]);
  const [pendingBookings, setPendingBookings] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [newMsgContent, setNewMsgContent] = useState('');

  // Profile Form States
  const [profileData, setProfileData] = useState({ partnerName: '', weddingDate: '', guestCount: '', style: '', budget: '', priority: '' });
  const [profileMsg, setProfileMsg] = useState('');

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch(`${API}/api/bookings/client`, { headers: { 'Authorization': `Bearer ${token}` }});
      const data = await res.json();
      if(data.success && data.bookings) {
        setActiveBookings(data.bookings.filter(b => b.status === 'active'));
        setPendingBookings(data.bookings.filter(b => b.status === 'pending'));
      }
    } catch(e){}
  };

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch(`${API}/api/couples/profile/me`, { headers: { 'Authorization': `Bearer ${token}` }});
      const data = await res.json();
      if(data.success && data.profile) {
        setProfileData({
          partnerName: data.profile.partnerName || '',
          weddingDate: data.profile.weddingDate || '',
          guestCount: data.profile.guestCount || '',
          style: data.profile.style || '',
          budget: data.profile.budget || '',
          priority: data.profile.priority || ''
        });
      }
    } catch(e){}
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    setProfileMsg('');
    try {
        const token = localStorage.getItem('accessToken');
        const res = await fetch(`${API}/api/couples/profile`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(profileData)
        });
        if(res.ok) setProfileMsg('Profile saved successfully!');
    } catch(e) {
        setProfileMsg('Failed to save profile.');
    }
    setTimeout(() => setProfileMsg(''), 3000);
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

  useEffect(() => {
    if(['bookings', 'requests'].includes(activeTab)) fetchBookings();
    if(activeTab === 'messages') fetchConversations();
    if(activeTab === 'profile') fetchProfile();
  }, [activeTab]);

  useEffect(() => {
    if(activeChatId) fetchChat(activeChatId);
  }, [activeChatId]);

  return (
    <section className="py-20 px-6 bg-wedding-blush/10 min-h-[80vh]">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <h2 className="font-serif text-4xl text-gray-800 mb-2">Your Control Center</h2>
          <p className="text-gray-500 uppercase tracking-widest text-sm">Welcome back, Ananya & Rohan - 45 Days Until the Celebration</p>
        </header>

        <div className="grid md:grid-cols-[1fr_2fr] gap-8">
          
          <div className="space-y-6">
            <div className="bg-white border border-gray-100 shadow-sm p-6 overflow-hidden rounded-md">
              <h3 className="font-medium text-gray-800 border-b pb-2 mb-4">Budget Tracker</h3>
              <div className="flex justify-between text-sm mb-2"><span className="text-gray-500">Total Budget</span><span className="font-semibold">₹50,00,000</span></div>
              <div className="flex justify-between text-sm mb-4"><span className="text-gray-500">Spent (Venues, Decor)</span><span className="font-semibold text-rose-500">₹21,45,000</span></div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-wedding-gold h-2 rounded-full" style={{width: '42%'}}></div>
              </div>
            </div>

            <div className="bg-white border border-gray-100 shadow-sm p-6 overflow-hidden rounded-md">
              <h3 className="font-medium text-gray-800 border-b pb-2 mb-4">My Checklist</h3>
              <ul className="text-sm space-y-3 text-gray-600">
                <li className="flex items-start gap-3 cursor-pointer group">
                  <div className="mt-0.5"><input type="checkbox" className="accent-wedding-gold w-4 h-4 cursor-pointer" defaultChecked readOnly /></div>
                  <span className="text-gray-400 line-through">Create Planora Account</span>
                </li>
                <li className="flex items-start gap-3 cursor-pointer group">
                  <div className="mt-0.5"><input type="checkbox" className="accent-wedding-gold w-4 h-4 cursor-pointer" defaultChecked readOnly /></div>
                  <span className="text-gray-400 line-through">Set initial budget criteria</span>
                </li>
                <li className="flex items-start gap-3 cursor-pointer group">
                  <div className="mt-0.5"><input type="checkbox" className="accent-wedding-gold w-4 h-4 cursor-pointer" readOnly /></div>
                  <span className="text-gray-700">Message top 3 venue choices</span>
                </li>
                <li className="flex items-start gap-3 cursor-pointer group">
                  <div className="mt-0.5"><input type="checkbox" className="accent-wedding-gold w-4 h-4 cursor-pointer" readOnly /></div>
                  <span className="text-gray-700">Confirm primary photographer</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white border border-gray-100 shadow-sm flex flex-col overflow-hidden rounded-md h-[500px]">
            <div className="p-6 border-b border-gray-100 flex gap-6 text-sm font-medium text-gray-500 bg-gray-50">
              <button 
                onClick={() => setActiveTab('bookings')} 
                className={`${activeTab === 'bookings' ? 'text-wedding-gold border-b-2 border-wedding-gold pb-1' : 'hover:text-gray-800 transition pb-1'}`}>
                Active Bookings ({activeBookings.length})
              </button>
              <button 
                onClick={() => setActiveTab('requests')} 
                className={`${activeTab === 'requests' ? 'text-wedding-gold border-b-2 border-wedding-gold pb-1' : 'hover:text-gray-800 transition pb-1'}`}>
                Pending Requests ({pendingBookings.length})
              </button>
              <button 
                onClick={() => setActiveTab('messages')} 
                className={`${activeTab === 'messages' ? 'text-wedding-gold border-b-2 border-wedding-gold pb-1' : 'hover:text-gray-800 transition pb-1'}`}>
                Messages
              </button>
              <button 
                onClick={() => setActiveTab('profile')} 
                className={`${activeTab === 'profile' ? 'text-wedding-gold border-b-2 border-wedding-gold pb-1' : 'hover:text-gray-800 transition pb-1'}`}>
                Profile Settings
              </button>
            </div>
            
            <div className="p-6 flex-1 overflow-y-auto">
              
              {activeTab === 'bookings' && (
                <div className="animate-fade-in divide-y divide-gray-50">
                    {activeBookings.length === 0 ? <p className="text-gray-400 italic">No active bookings yet.</p> : activeBookings.map(b => (
                      <div key={b._id} className="flex items-center justify-between py-5">
                          <div>
                          <h4 className="font-serif text-lg text-gray-800">{b.vendorBusinessName}</h4>
                          <span className="text-xs text-gray-400 uppercase tracking-wider">{b.vendorCategory} - {new Date(b.createdAt).toLocaleDateString()}</span>
                          </div>
                          <span className="px-3 py-1 bg-green-50 text-green-700 border border-green-200 text-xs rounded-sm font-medium uppercase tracking-wider">Confirmed</span>
                      </div>
                    ))}
                </div>
              )}
              
              {activeTab === 'requests' && (
                <div className="animate-fade-in divide-y divide-gray-50">
                    {pendingBookings.length === 0 ? <p className="text-gray-400 italic">No pending requests.</p> : pendingBookings.map(b => (
                      <div key={b._id} className="flex items-center justify-between py-5">
                          <div>
                          <h4 className="font-serif text-lg text-gray-800">{b.vendorBusinessName}</h4>
                          <span className="text-xs text-gray-400 uppercase tracking-wider">{b.vendorCategory} - Request Sent</span>
                          </div>
                          <span className="px-3 py-1 bg-yellow-50 text-yellow-700 border border-yellow-200 text-xs rounded-sm font-medium uppercase tracking-wider">Pending Response</span>
                      </div>
                    ))}
                </div>
              )}

              {activeTab === 'saved' && (
                <div className="animate-fade-in">
                    <h3 className="font-serif text-2xl text-gray-800 mb-6">Your Shortlist</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border border-gray-200 rounded-sm overflow-hidden flex flex-col group cursor-pointer hover:border-wedding-gold transition">
                            <div className="h-32 bg-gray-200 relative overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=400&auto=format&fit=crop" alt="Vendor" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                            </div>
                            <div className="p-4 bg-white flex flex-col justify-between flex-1">
                                <div>
                                    <h4 className="font-serif text-lg text-gray-900 leading-tight">Manish Malhotra Bridal</h4>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Bridal Couture</p>
                                </div>
                                <button className="mt-4 border border-wedding-gold text-wedding-gold w-full py-2 text-sm uppercase tracking-wider hover:bg-wedding-gold hover:text-white transition">Request Quote</button>
                            </div>
                        </div>
                        <div className="border border-gray-200 rounded-sm overflow-hidden flex flex-col group cursor-pointer hover:border-wedding-gold transition">
                            <div className="h-32 bg-gray-200 relative overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=400&auto=format&fit=crop" alt="Vendor" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                            </div>
                            <div className="p-4 bg-white flex flex-col justify-between flex-1">
                                <div>
                                    <h4 className="font-serif text-lg text-gray-900 leading-tight">Devika Narain</h4>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Decor</p>
                                </div>
                                <button className="mt-4 border border-gray-300 text-gray-700 w-full py-2 text-sm uppercase tracking-wider hover:bg-gray-100 transition">Message</button>
                            </div>
                        </div>
                    </div>
                </div>
              )}

              {activeTab === 'messages' && (
                <div className="animate-fade-in h-full flex overflow-hidden">
                    {/* Conversations List */}
                    <div className="w-1/3 border-r border-gray-100 pr-2 mr-4 overflow-y-auto hidden sm:block">
                        {conversations.length === 0 ? <p className="text-gray-400 text-xs italic p-2">No messages.</p> : conversations.map(c => (
                          <div key={c._id} onClick={()=>setActiveChatId(c._id)} className={`p-3 rounded-sm cursor-pointer mb-2 text-sm ${activeChatId===c._id ? 'bg-wedding-blush/20 border-l-2 border-wedding-gold' : 'hover:bg-gray-50'}`}>
                              <div className="font-medium text-gray-800 truncate">{c.displayName}</div>
                              <div className="text-xs text-gray-400 truncate mt-1">Vendor Partner</div>
                          </div>
                        ))}
                    </div>
                    {/* Chat Area */}
                    <div className="flex-1 flex flex-col h-full pl-2">
                      {activeChatId ? (
                        <>
                          <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 pb-2">
                              {messages.map(m => {
                                const isMe = m.senderId !== activeChatId; // if sender is not the other user, it's me
                                return (
                                  <div key={m._id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                                      <div className={`px-4 py-2 text-sm max-w-[85%] ${isMe ? 'bg-wedding-cream text-gray-900 border border-wedding-gold/30 rounded-tl-xl rounded-b-xl rounded-tr-sm' : 'bg-gray-100 text-gray-800 border border-gray-200 rounded-tr-xl rounded-b-xl rounded-tl-sm'}`}>
                                          {m.content}
                                      </div>
                                  </div>
                                );
                              })}
                          </div>
                          <div className="mt-auto pt-2 flex gap-2">
                              <input type="text" value={newMsgContent} onChange={e=>setNewMsgContent(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleSendMsg()} placeholder="Type a message..." className="flex-1 border border-gray-300 rounded-sm px-4 py-2 text-sm focus:outline-none focus:border-wedding-gold" />
                              <button onClick={handleSendMsg} className="bg-wedding-gold text-white px-6 py-2 rounded-sm text-sm font-medium hover:bg-yellow-600 transition">Send</button>
                          </div>
                        </>
                      ) : (
                        <div className="flex-1 flex items-center justify-center text-gray-400 text-sm italic">
                            Select a conversation
                        </div>
                      )}
                    </div>
                </div>
              )}

              {activeTab === 'profile' && (
                <div className="animate-fade-in flex flex-col h-full overflow-y-auto">
                    <h3 className="font-serif text-2xl text-gray-800 mb-6 border-b pb-4">Personal Details</h3>
                    <form onSubmit={saveProfile}>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="col-span-2 mb-2">
                        <label className="text-xs text-gray-500 uppercase tracking-widest font-semibold block mb-1">Account Username (Login ID)</label>
                        <input type="text" readOnly value={username} className="w-full border border-gray-200 p-2 text-sm bg-gray-50 text-gray-500 cursor-not-allowed" />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 uppercase tracking-widest font-semibold block mb-1">Partner's Name</label>
                        <input type="text" value={profileData.partnerName} onChange={e=>setProfileData({...profileData, partnerName: e.target.value})} className="w-full border border-gray-200 p-2 text-sm focus:outline-none focus:border-wedding-gold transition" />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 uppercase tracking-widest font-semibold block mb-1">Wedding Date / Season</label>
                        <input type="text" value={profileData.weddingDate} onChange={e=>setProfileData({...profileData, weddingDate: e.target.value})} className="w-full border border-gray-200 p-2 text-sm focus:outline-none focus:border-wedding-gold transition" />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 uppercase tracking-widest font-semibold block mb-1">Budget (INR)</label>
                        <input type="number" value={profileData.budget} onChange={e=>setProfileData({...profileData, budget: e.target.value})} className="w-full border border-gray-200 p-2 text-sm focus:outline-none focus:border-wedding-gold transition" />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 uppercase tracking-widest font-semibold block mb-1">Guest Count</label>
                        <select value={profileData.guestCount} onChange={e=>setProfileData({...profileData, guestCount: e.target.value})} className="w-full border border-gray-200 p-2 text-sm focus:outline-none focus:border-wedding-gold transition bg-white">
                            <option value="">Select guest count</option>
                            <option value="Intimate (Under 100)">Intimate (Under 100)</option>
                            <option value="Classic (100 - 300)">Classic (100 - 300)</option>
                            <option value="Grand (300 - 600)">Grand (300 - 600)</option>
                            <option value="Royal (600+)">Royal (600+)</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 uppercase tracking-widest font-semibold block mb-1">Style Preference</label>
                        <select value={profileData.style} onChange={e=>setProfileData({...profileData, style: e.target.value})} className="w-full border border-gray-200 p-2 text-sm focus:outline-none focus:border-wedding-gold transition bg-white">
                            <option value="">Select a style</option>
                            <option value="Palatial Heritage">Palatial Heritage</option>
                            <option value="Modern Minimalist">Modern Minimalist</option>
                            <option value="Bohemian Beach">Bohemian Beach</option>
                            <option value="Classic Glamour">Classic Glamour</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 uppercase tracking-widest font-semibold block mb-1">Top Priority</label>
                        <select value={profileData.priority} onChange={e=>setProfileData({...profileData, priority: e.target.value})} className="w-full border border-gray-200 p-2 text-sm focus:outline-none focus:border-wedding-gold transition bg-white">
                            <option value="">Select top priority</option>
                            <option value="The Venue">The Venue</option>
                            <option value="Design & Decor">Design & Decor</option>
                            <option value="Food & Drink">Food & Drink</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mb-8">
                        <button type="submit" className="bg-gray-900 text-white px-6 py-2 rounded-sm text-sm font-medium hover:bg-gray-800 transition tracking-wide uppercase">Save Profile</button>
                        {profileMsg && <span className="text-sm font-medium text-green-600 animate-fade-in">{profileMsg}</span>}
                    </div>
                    </form>

                    <h3 className="font-serif text-2xl text-gray-800 mb-4 border-b pb-4">Security</h3>
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                      {passMessage && (
                        <div className={`p-3 text-sm rounded-sm border ${passError ? 'bg-red-50 text-red-600 border-red-200' : 'bg-green-50 text-green-700 border-green-200'}`}>
                          {passMessage}
                        </div>
                      )}
                      <div>
                        <label className="text-xs text-gray-500 uppercase tracking-widest font-semibold block mb-1">Current Password</label>
                        <input type="password" required value={oldPassword} onChange={e => setOldPassword(e.target.value)} className="w-full border border-gray-200 p-2 text-sm focus:outline-none focus:border-wedding-gold transition" />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 uppercase tracking-widest font-semibold block mb-1">New Password</label>
                        <input type="password" required value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full border border-gray-200 p-2 text-sm focus:outline-none focus:border-wedding-gold transition" />
                      </div>
                      <button type="submit" disabled={isUpdating} className="bg-wedding-gold text-white px-6 py-2 mt-4 rounded-sm text-sm font-medium hover:bg-yellow-600 transition tracking-wide uppercase">
                        {isUpdating ? 'Updating...' : 'Change Password'}
                      </button>
                    </form>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default function CoupleDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/');
  };

  return (
    <div className="font-sans text-gray-800 selection:bg-wedding-blush selection:text-gray-900 bg-white min-h-screen flex flex-col">
      <DashboardNav handleLogout={handleLogout} />
      <main className="flex-1"><DashboardUI /></main>
      <Footer />
    </div>
  );
}
