import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  X, 
  ShieldCheck, 
  Star, 
  MapPin, 
  Globe, 
  Calendar, 
  Clock, 
  LayoutGrid, 
  List, 
  SlidersHorizontal,
  ChevronDown,
  Sparkles,
  Award,
  ArrowRight
} from 'lucide-react';

export default function FindMentorPage({
  mentors,
  onOpenBooking,
  onOpenMentorDetail
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedFormat, setSelectedFormat] = useState('all'); // 'all' | 'in_person' | 'online'
  const [minRating, setMinRating] = useState('all');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState('rating'); // 'rating' | 'experience' | 'reviews'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  // Filter mentors logic
  const filteredMentors = mentors.filter((mentor) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = mentor.name.toLowerCase().includes(q);
      const matchTitle = mentor.title.toLowerCase().includes(q);
      const matchCategory = mentor.category.toLowerCase().includes(q);
      const matchSkills = mentor.skillsTaught.some(s => s.toLowerCase().includes(q));
      const matchLocation = mentor.location.toLowerCase().includes(q);
      if (!matchName && !matchTitle && !matchCategory && !matchSkills && !matchLocation) {
        return false;
      }
    }

    if (selectedCategory !== 'all' && mentor.category.toLowerCase() !== selectedCategory.toLowerCase()) {
      return false;
    }

    if (selectedLanguage !== 'all' && !mentor.languages.some(l => l.toLowerCase() === selectedLanguage.toLowerCase())) {
      return false;
    }

    if (selectedFormat === 'in_person' && !mentor.formats.some(f => f.toLowerCase().includes('in-person'))) {
      return false;
    }
    if (selectedFormat === 'online' && !mentor.formats.some(f => f.toLowerCase().includes('online'))) {
      return false;
    }

    if (minRating !== 'all' && mentor.rating < parseFloat(minRating)) {
      return false;
    }

    if (verifiedOnly && !mentor.verified) {
      return false;
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'experience') return parseInt(b.experience) - parseInt(a.experience);
    if (sortBy === 'reviews') return b.reviewsCount - a.reviewsCount;
    return 0;
  });

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedLanguage('all');
    setSelectedFormat('all');
    setMinRating('all');
    setVerifiedOnly(false);
    setSortBy('rating');
  };

  const activeFiltersCount = 
    (selectedCategory !== 'all' ? 1 : 0) +
    (selectedLanguage !== 'all' ? 1 : 0) +
    (selectedFormat !== 'all' ? 1 : 0) +
    (minRating !== 'all' ? 1 : 0) +
    (verifiedOnly ? 1 : 0);

  return (
    <div className="space-y-6 animate-in fade-in">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display flex items-center gap-2">
            <span>Find a Master Mentor</span>
            <span className="text-blue-600 text-lg">⚡</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Book 1-on-1 practical training and get your skills assessed by certified trade masters.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <div className="bg-white p-1 rounded-2xl border border-slate-200 flex items-center gap-1 shadow-xs">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-xl text-xs transition-colors cursor-pointer ${
                viewMode === 'grid' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-xl text-xs transition-colors cursor-pointer ${
                viewMode === 'list' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-4 rounded-3xl bg-white border border-blue-100 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-3">
          
          {/* Main Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search mentors by skill, service, or location (e.g. 3-Phase, Inverter AC, Kothrud)..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 rounded-2xl text-xs text-slate-800 placeholder:text-slate-400 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-hidden transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Toggle Button */}
          <button
            type="button"
            onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
            className={`w-full md:w-auto px-4 py-2.5 rounded-2xl text-xs font-bold border transition-all flex items-center justify-center gap-2 cursor-pointer ${
              isFilterPanelOpen || activeFiltersCount > 0
                ? 'bg-blue-50 text-blue-700 border-blue-300'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-black flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Quick Sort Dropdown */}
          <div className="w-full md:w-auto flex items-center gap-2">
            <span className="text-xs text-slate-500 whitespace-nowrap hidden sm:inline">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full md:w-auto bg-slate-50 text-slate-800 text-xs font-bold rounded-2xl px-3 py-2.5 border border-slate-200 outline-hidden"
            >
              <option value="rating">Top Rated (★)</option>
              <option value="experience">Most Experienced</option>
              <option value="reviews">Most Reviews</option>
            </select>
          </div>

        </div>

        {/* Collapsible Filter Panel */}
        {isFilterPanelOpen && (
          <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs animate-in fade-in slide-in-from-top-2">
            
            {/* Category Filter */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1.5">
                Service Category:
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-slate-50 text-slate-800 rounded-xl px-3 py-2 border border-slate-200 outline-hidden"
              >
                <option value="all">All Categories</option>
                <option value="electrical">Electrical Services</option>
                <option value="appliance">Appliance Repair & HVAC</option>
                <option value="plumbing">Plumbing Services</option>
                <option value="cleaning">Cleaning & Hygiene</option>
                <option value="painting">Painting & Waterproofing</option>
                <option value="soft skills">Soft Skills & Communication</option>
              </select>
            </div>

            {/* Language Filter */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1.5">
                Teaching Language:
              </label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full bg-slate-50 text-slate-800 rounded-xl px-3 py-2 border border-slate-200 outline-hidden"
              >
                <option value="all">Any Language</option>
                <option value="hindi">Hindi</option>
                <option value="marathi">Marathi</option>
                <option value="english">English</option>
                <option value="tamil">Tamil</option>
                <option value="urdu">Urdu</option>
              </select>
            </div>

            {/* Format Filter */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1.5">
                Training Format:
              </label>
              <select
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value)}
                className="w-full bg-slate-50 text-slate-800 rounded-xl px-3 py-2 border border-slate-200 outline-hidden"
              >
                <option value="all">All Formats</option>
                <option value="in_person">In-Person (Pune Hubs)</option>
                <option value="online">Online Video Room</option>
              </select>
            </div>

            {/* Rating & Verified */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1.5">
                Rating & Verification:
              </label>
              <div className="space-y-2">
                <select
                  value={minRating}
                  onChange={(e) => setMinRating(e.target.value)}
                  className="w-full bg-slate-50 text-slate-800 rounded-xl px-3 py-2 border border-slate-200 outline-hidden"
                >
                  <option value="all">Any Rating</option>
                  <option value="4.8">4.8★ & Above</option>
                  <option value="4.9">4.9★ & Above (Top Tier)</option>
                </select>

                <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={verifiedOnly}
                    onChange={(e) => setVerifiedOnly(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded bg-slate-100 border-slate-300"
                  />
                  <span>Verified Mentors Only</span>
                </label>
              </div>
            </div>

            {/* Clear Filters CTA */}
            <div className="sm:col-span-2 lg:col-span-4 pt-2 flex items-center justify-between border-t border-slate-100">
              <span className="text-[11px] text-slate-500">
                Found <strong>{filteredMentors.length}</strong> matching mentors
              </span>
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs font-bold text-rose-600 hover:underline cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>

          </div>
        )}

      </div>

      {/* Mentor Cards Grid / List */}
      {filteredMentors.length > 0 ? (
        <div className={
          viewMode === 'grid'
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            : "space-y-4"
        }>
          {filteredMentors.map((mentor) => (
            <div
              key={mentor.id}
              className={`p-5 rounded-3xl bg-white border border-blue-100 hover:border-blue-300 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between ${
                viewMode === 'list' ? 'sm:flex-row sm:items-center sm:gap-6' : 'space-y-4'
              }`}
            >
              {/* Profile Header */}
              <div className="flex items-start gap-4 flex-1">
                <div className="relative flex-shrink-0">
                  <img
                    src={mentor.avatar}
                    alt={mentor.name}
                    className="w-16 h-16 rounded-2xl object-cover ring-2 ring-blue-500/20 shadow-xs"
                  />
                  {mentor.verified && (
                    <div className="absolute -bottom-1 -right-1 p-0.5 bg-blue-600 text-white rounded-full ring-2 ring-white" title="Verified Mentor">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-bold text-slate-900 truncate">{mentor.name}</h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                      {mentor.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-1">{mentor.title}</p>
                  
                  <div className="flex items-center gap-3 text-xs mt-1">
                    <span className="text-amber-500 font-bold flex items-center gap-0.5">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      {mentor.rating} ({mentor.reviewsCount})
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-600 font-medium">{mentor.experience} Exp</span>
                  </div>
                </div>
              </div>

              {/* Skills Taught */}
              <div className={`space-y-1.5 ${viewMode === 'list' ? 'sm:max-w-xs' : ''}`}>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Teaches & Assesses:</span>
                <div className="flex flex-wrap gap-1">
                  {mentor.skillsTaught.slice(0, 2).map((sk, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-700 truncate max-w-[200px]">
                      {sk}
                    </span>
                  ))}
                  {mentor.skillsTaught.length > 2 && (
                    <span className="px-1.5 py-0.5 rounded-md text-[10px] text-slate-500 bg-slate-100">
                      +{mentor.skillsTaught.length - 2} more
                    </span>
                  )}
                </div>
              </div>

              {/* Location & Formats */}
              <div className="space-y-1 text-xs text-slate-500">
                <div className="flex items-center gap-1.5 truncate">
                  <MapPin className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                  <span className="truncate">{mentor.location}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <Globe className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                  <span>{mentor.languages.join(', ')}</span>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className={`pt-3 border-t border-slate-100 flex items-center justify-between ${
                viewMode === 'list' ? 'sm:border-t-0 sm:pt-0 sm:flex-col sm:items-end sm:gap-2' : ''
              }`}>
                <div>
                  <span className="text-[10px] text-slate-400">Session:</span>
                  <div className="text-xs font-black text-emerald-700">{mentor.sessionPrice}</div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onOpenMentorDetail && onOpenMentorDetail(mentor)}
                    className="px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    View Profile
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenBooking && onOpenBooking(mentor)}
                    className="px-4 py-2 rounded-xl text-xs font-black bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Book Session</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 rounded-3xl bg-white border border-slate-200 text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">No mentors found matching your filters</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search terms, clearing specific filters, or searching for other service categories.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
}
