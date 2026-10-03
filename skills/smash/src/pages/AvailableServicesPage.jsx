import React, { useState, useMemo } from 'react';
import { 
  Store, 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  DollarSign, 
  Flame, 
  Plus, 
  Zap, 
  Tv, 
  Wrench, 
  ArrowRight,
  SlidersHorizontal,
  CheckCircle2,
  Navigation,
  Info
} from 'lucide-react';
import InteractiveMap from '../components/InteractiveMap';

export default function AvailableServicesPage({
  services = [],
  onPickService
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [urgencyFilter, setUrgencyFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'highest_pay' | 'nearest'
  const [previewService, setPreviewService] = useState(null);

  const filteredServices = useMemo(() => {
    let list = services.filter((srv) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = srv.title.toLowerCase().includes(q);
        const matchesDesc = srv.description.toLowerCase().includes(q);
        const matchesLocation = srv.location.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesLocation) return false;
      }

      // Category
      if (categoryFilter !== 'all' && srv.category.toLowerCase() !== categoryFilter.toLowerCase()) {
        return false;
      }

      // Urgency
      if (urgencyFilter !== 'all' && srv.urgency.toLowerCase() !== urgencyFilter.toLowerCase()) {
        return false;
      }

      return true;
    });

    // Sorting
    if (sortBy === 'highest_pay') {
      list.sort((a, b) => b.totalPayout - a.totalPayout);
    } else if (sortBy === 'nearest') {
      list.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
    }

    return list;
  }, [services, searchQuery, categoryFilter, urgencyFilter, sortBy]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display">
              Currently Required Services
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-100 text-blue-700 border border-blue-200">
              Live Feed ({services.length})
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Voluntary open marketplace jobs available in Pune Sector 4 and surrounding sectors. Pick freely without dispatch penalty.
          </p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Search bar */}
          <div className="relative w-full md:max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by job keyword, appliance type, area..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 border border-slate-200 outline-hidden focus:border-blue-500 focus:bg-white"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 rounded-xl text-xs font-bold text-slate-700 border border-slate-200 outline-hidden focus:border-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="electrical">Electrical</option>
              <option value="appliance">Appliance</option>
            </select>

            <select
              value={urgencyFilter}
              onChange={(e) => setUrgencyFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 rounded-xl text-xs font-bold text-slate-700 border border-slate-200 outline-hidden focus:border-blue-500"
            >
              <option value="all">All Urgencies</option>
              <option value="emergency">Emergency Only</option>
              <option value="high priority">High Priority</option>
              <option value="standard">Standard</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-slate-50 rounded-xl text-xs font-bold text-blue-700 border border-slate-200 outline-hidden focus:border-blue-500"
            >
              <option value="newest">Sort: Newest First</option>
              <option value="highest_pay">Sort: Highest Payout (₹)</option>
              <option value="nearest">Sort: Nearest Distance</option>
            </select>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredServices.length === 0 ? (
          <div className="col-span-2 bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3 shadow-xs">
            <p className="text-sm text-slate-500">No available marketplace services match your filters.</p>
          </div>
        ) : (
          filteredServices.map((srv) => (
            <div
              key={srv.id}
              className="bg-white hover:bg-slate-50/70 rounded-3xl p-6 border border-slate-200 hover:border-blue-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
            >
              <div>
                {/* Header Badge Row */}
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                      #{srv.id}
                    </span>
                    <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                      {srv.category}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">{srv.postedTime}</span>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                    srv.urgency === 'Emergency'
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : srv.urgency === 'High Priority'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}>
                    {srv.urgency}
                  </span>
                </div>

                {/* Job Title & Scope */}
                <div className="mt-3">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {srv.description}
                  </p>
                </div>

                {/* Customer and Distance Metric */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1.5 truncate max-w-[200px]">
                    <MapPin className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                    <span className="truncate">{srv.location}</span>
                  </div>
                  <div className="flex items-center gap-2 font-semibold text-slate-700">
                    <span>{srv.distance}</span>
                    <span>•</span>
                    <span className="text-emerald-600">~{srv.travelEta}</span>
                  </div>
                </div>
              </div>

              {/* Payout & Pickup Action Bar */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Total Payout</span>
                  <div className="text-xl font-black text-blue-700 font-mono">
                    ₹{srv.totalPayout}
                    {srv.incentive > 0 && (
                      <span className="text-xs text-amber-600 font-normal ml-1">(+₹{srv.incentive} bonus)</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPreviewService(srv)}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer border border-slate-200"
                  >
                    View Map
                  </button>
                  <button
                    type="button"
                    onClick={() => onPickService(srv)}
                    className="px-4 py-2 rounded-xl text-xs font-black bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                    <span>Pick This Job</span>
                  </button>
                </div>
              </div>

            </div>
          ))
        )}
      </div>

      {/* Map Preview Modal */}
      {previewService && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">{previewService.title}</h3>
                <p className="text-xs text-slate-500">{previewService.location} ({previewService.distance})</p>
              </div>
              <button
                type="button"
                onClick={() => setPreviewService(null)}
                className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <InteractiveMap
              destLat={previewService.lat}
              destLng={previewService.lng}
              destTitle={previewService.location}
              height="240px"
              showRoute={true}
            />

            <div className="flex items-center justify-between pt-2">
              <span className="text-lg font-black text-blue-700 font-mono">₹{previewService.totalPayout} Total</span>
              <button
                type="button"
                onClick={() => {
                  const s = previewService;
                  setPreviewService(null);
                  onPickService(s);
                }}
                className="px-6 py-2.5 rounded-xl text-xs font-black bg-blue-600 hover:bg-blue-700 text-white shadow-md"
              >
                Confirm Pickup & Add to My Jobs
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
