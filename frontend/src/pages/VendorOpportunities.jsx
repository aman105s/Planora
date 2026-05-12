import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const API = import.meta.env.VITE_API_URL;

export default function VendorOpportunities() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchInsights = async () => {
      try {
        const res = await fetch(`${API}/api/leads/opportunities/${encodeURIComponent(category)}`);
        const json = await res.json();
        if (json.success) {
          setData(json.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchInsights();
  }, [category]);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#FDFBF9]">
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-[#f0e3de] px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="font-serif text-2xl tracking-wide cursor-pointer flex items-center gap-1" onClick={() => navigate('/portal/vendor')}>
          <span style={{color:'#D2826C'}}>V</span>EDAN <span className="text-xs font-sans text-[#D2826C] ml-1 tracking-widest uppercase hidden sm:inline">Vendor Partner</span>
        </div>
        <button onClick={() => navigate('/portal/vendor')} className="text-sm font-semibold text-gray-600 hover:text-[#D2826C]">
          ← Back to Portal
        </button>
      </nav>

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-16">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#D2826C] mb-4 bg-[#FFF7ED] px-3 py-1 rounded-full">Market Insights</span>
          <h1 className="font-serif text-4xl md:text-5xl text-gray-800 mb-4 capitalize">{category} Opportunities</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">Discover the active demand and pricing trends for your category on Planora.</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40 text-gray-400">Loading insights...</div>
        ) : data ? (
          <>
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#f5ece9] text-center hover:shadow-md transition">
                <div className="text-4xl mb-3">💌</div>
                <div className="text-4xl font-serif text-gray-800 mb-1">{data.activeLeads}</div>
                <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">Active Leads</div>
                <p className="text-xs text-gray-400 mt-2">Couples actively seeking quotes</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#f5ece9] text-center hover:shadow-md transition">
                <div className="text-4xl mb-3">🔥</div>
                <div className={`text-3xl font-serif mb-1 ${data.demandLevel === 'High' ? 'text-green-600' : 'text-[#D2826C]'}`}>{data.demandLevel}</div>
                <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">Market Demand</div>
                <p className="text-xs text-gray-400 mt-2">Current search volume trend</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#f5ece9] text-center hover:shadow-md transition">
                <div className="text-4xl mb-3">💰</div>
                <div className="text-2xl font-serif text-gray-800 mb-1">{data.averagePrice}</div>
                <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">Avg. Pricing</div>
                <p className="text-xs text-gray-400 mt-2">What couples typically spend</p>
              </div>
            </div>

            <div className="bg-white p-10 rounded-3xl shadow-sm border border-[#f5ece9]">
              <h2 className="font-serif text-3xl text-gray-800 mb-8 text-center">Recommended Actions</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div onClick={() => navigate('/dashboard/vendor?tab=profile')} className="cursor-pointer group flex flex-col items-center text-center p-6 border-2 border-transparent hover:border-[#D2826C] rounded-2xl transition bg-[#FDFBF9]">
                  <div className="w-12 h-12 bg-[#FFF7ED] text-[#D2826C] rounded-full flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition">📸</div>
                  <h4 className="font-bold text-gray-800 mb-2">Improve Profile</h4>
                  <p className="text-xs text-gray-500">Upload fresh portfolio images to capture attention.</p>
                </div>
                <div onClick={() => navigate('/pricing-checkout?plan=premium')} className="cursor-pointer group flex flex-col items-center text-center p-6 border-2 border-[#D2826C] bg-[#FFF7ED] rounded-2xl transition shadow-md hover:-translate-y-1">
                  <div className="absolute top-0 right-0 -mt-3 -mr-3 bg-red-500 text-white text-[10px] font-bold uppercase px-2 py-1 rounded-full shadow">Hot</div>
                  <div className="w-12 h-12 bg-[#D2826C] text-white rounded-full flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition">⭐</div>
                  <h4 className="font-bold text-gray-800 mb-2">Upgrade Listing</h4>
                  <p className="text-xs text-gray-500">Get featured at the top of search results to double your leads.</p>
                </div>
                <div onClick={() => navigate('/dashboard/vendor?tab=leads')} className="cursor-pointer group flex flex-col items-center text-center p-6 border-2 border-transparent hover:border-[#D2826C] rounded-2xl transition bg-[#FDFBF9]">
                  <div className="w-12 h-12 bg-[#FFF7ED] text-[#D2826C] rounded-full flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition">📨</div>
                  <h4 className="font-bold text-gray-800 mb-2">View Active Leads</h4>
                  <p className="text-xs text-gray-500">Head to your dashboard to unlock and respond to couples.</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-500">Failed to load insights.</div>
        )}
      </main>
      <Footer />
    </div>
  );
}
