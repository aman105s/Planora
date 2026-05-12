

export default function VendorCard({ vendor }) {
  const navigate = useNavigate();

  const priceColor = {
    '₹': 'text-emerald-600', '₹₹': 'text-amber-600', '₹₹₹': 'text-rose-600'
  }[vendor.priceRange] || 'text-gray-600';

  return (
    <div className="vendor-card group flex-shrink-0 w-64 bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:border-amber-200 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
      onClick={() => navigate('/find-vendors')}>

      {/* Image */}
      <div className="relative h-40 overflow-hidden bg-gray-100">
        <img src={vendor.image} alt={vendor.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        {/* Badges */}
        <div className="absolute top-2 left-2 flex gap-1 flex-wrap">
          {vendor.trending && (
            <span className="px-2 py-0.5 bg-rose-500 text-white text-xs font-bold rounded-full shadow">🔥 Trending</span>
          )}
        </div>
        {/* Price */}
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-0.5 bg-white text-xs font-bold rounded-full shadow ${priceColor}`}>{vendor.priceRange}</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h4 className="font-serif text-sm font-semibold text-gray-800 leading-tight line-clamp-2">{vendor.name}</h4>
        </div>
        <span className="inline-block text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full mb-2">{vendor.category}</span>

        <div className="flex items-center gap-1 mb-1">
          <span className="text-yellow-400 text-sm">★</span>
          <span className="text-sm font-semibold text-gray-800">{vendor.rating}</span>
          <span className="text-xs text-gray-400">({vendor.reviews} reviews)</span>
        </div>

        {vendor.trending && (
          <p className="text-xs text-gray-400 mb-3">Booked {vendor.bookings}+ times this week</p>
        )}

        <button
          onClick={e => { e.stopPropagation(); navigate('/find-vendors'); }}
          className="w-full py-2 text-xs font-semibold text-amber-700 border border-amber-300 bg-amber-50 hover:bg-wedding-gold hover:text-white hover:border-wedding-gold transition-all !rounded-xl">
          View Details
        </button>
      </div>
    </div>
  );
}
