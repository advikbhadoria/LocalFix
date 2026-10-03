import React, { useState, useMemo } from 'react';
import { 
  Briefcase, 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  Phone, 
  MessageSquare, 
  CheckCircle2, 
  Flame, 
  Lock, 
  ChevronRight, 
  ArrowRight,
  ShieldCheck,
  Calendar,
  Layers,
  Star
} from 'lucide-react';

export default function MyJobsPage({
  jobs = [],
  onOpenJobDetail,
  onOpenChat,
  onOpenCall
}) {
  const [subTab, setSubTab] = useState('active'); // 'all' | 'active' | 'completed' | 'cancelled'
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Sub-tab filter
      if (subTab === 'active') {
        if (job.status === 'completed' || job.status === 'cancelled') return false;
      } else if (subTab === 'completed') {
        if (job.status !== 'completed') return false;
      } else if (subTab === 'cancelled') {
        if (job.status !== 'cancelled') return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(q);
        const matchesCustomer = job.customer?.name.toLowerCase().includes(q);
        const matchesAddress = job.customer?.address.toLowerCase().includes(q);
        const matchesId = job.id.toLowerCase().includes(q);
        if (!matchesTitle && !matchesCustomer && !matchesAddress && !matchesId) return false;
      }

      // Category filter
      if (categoryFilter !== 'all' && job.category.toLowerCase() !== categoryFilter.toLowerCase()) {
        return false;
      }

      return true;
    });
  }, [jobs, subTab, searchQuery, categoryFilter]);

  const activeCount = jobs.filter(j => j.status !== 'completed' && j.status !== 'cancelled').length;
  const completedCount = jobs.filter(j => j.status === 'completed').length;
  const cancelledCount = jobs.filter(j => j.status === 'cancelled').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header & Sub-Tab Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display">
            My Service Jobs
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage your active assignments, turn-by-turn navigation, customer communications & completion PINs.
          </p>
        </div>

        {/* Sub-tab segment switcher */}
        <div className="flex items-center bg-slate-100 p-1.5 rounded-2xl border border-slate-200 self-start md:self-auto overflow-x-auto">
          <button
            type="button"
            onClick={() => setSubTab('active')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              subTab === 'active'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Active & In-Progress</span>
            {activeCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-white text-blue-700 text-[11px] font-black flex items-center justify-center shadow-xs">
                {activeCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setSubTab('completed')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              subTab === 'completed'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Completed History ({completedCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setSubTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              subTab === 'all'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Jobs ({jobs.length})
          </button>
        </div>
      </div>

      {/* Filters & Search Row */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by job ID, customer name, street..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 border border-slate-200 outline-hidden focus:border-blue-500 focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 border border-slate-200 outline-hidden focus:border-blue-500"
          >
            <option value="all">All Categories</option>
            <option value="electrical">Electrical</option>
            <option value="appliance">Appliance</option>
            <option value="plumbing">Plumbing</option>
          </select>
        </div>
      </div>

      {/* Jobs List Grid */}
      <div className="space-y-4">
        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3 shadow-xs">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Briefcase className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-900">No Jobs Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No service tickets match your active filter criteria.
            </p>
          </div>
        ) : (
          filteredJobs.map((job) => {
            const isCompleted = job.status === 'completed';
            const isCancelled = job.status === 'cancelled';
            const isActive = !isCompleted && !isCancelled;

            return (
              <div
                key={job.id}
                className={`bg-white rounded-3xl p-5 sm:p-6 border transition-all space-y-4 relative overflow-hidden ${
                  isActive 
                    ? 'border-blue-300 hover:border-blue-500 shadow-sm hover:shadow-md' 
                    : 'border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                {/* Top Badge Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                      #{job.id}
                    </span>
                    <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                      {job.category}
                    </span>
                    {job.urgency === 'Emergency' && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                        <Flame className="w-3.5 h-3.5 text-rose-500" /> Rapid Dispatch
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {isActive && (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                        {job.status === 'in_progress' ? 'In Progress' : job.status === 'travelling' ? 'Travelling' : 'Accepted'}
                      </span>
                    )}
                    {isCompleted && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Completed
                      </span>
                    )}
                    {isCancelled && (
                      <span className="text-xs font-bold text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                        Cancelled
                      </span>
                    )}
                  </div>
                </div>

                {/* Middle Info Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                  
                  {/* Job Details & Customer Info */}
                  <div className="lg:col-span-2 space-y-3">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900">{job.title}</h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{job.scope || job.description}</p>
                    </div>

                    <div className="flex items-center gap-3.5 pt-1">
                      <img
                        src={job.customer.avatar}
                        alt={job.customer.name}
                        className="w-11 h-11 rounded-xl object-cover ring-2 ring-slate-200"
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-900">{job.customer.name}</div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-blue-600" />
                          <span>{job.customer.address}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Payout & Completion PIN */}
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex flex-col justify-between space-y-3">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Net Compensation</span>
                      <div className="text-2xl font-black text-blue-700 font-mono mt-0.5">
                        ₹{job.totalPayout}
                      </div>
                      <span className="text-[11px] text-slate-500">Scheduled: {job.scheduledTime}</span>
                    </div>

                    {isActive && (
                      <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                        <span className="text-xs text-blue-700 font-bold flex items-center gap-1">
                          <Lock className="w-3.5 h-3.5 text-blue-600" />
                          Customer PIN:
                        </span>
                        <span className="font-mono font-black text-slate-900 text-sm bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-xs">
                          {job.pin}
                        </span>
                      </div>
                    )}

                    {isCompleted && job.rating && (
                      <div className="pt-2 border-t border-slate-200 flex items-center gap-1 text-xs text-amber-600 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                        <span>Customer Rated {job.rating}.0 ★</span>
                      </div>
                    )}
                  </div>

                </div>

                {/* Bottom Action Buttons */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {isActive && (
                      <>
                        <button
                          type="button"
                          onClick={() => onOpenChat(job.customer.name, job.title)}
                          className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                          <span>Chat</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => onOpenCall(job.customer.name, job.customer.phone, job.title)}
                          className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <Phone className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Call</span>
                        </button>
                      </>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenJobDetail(job)}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{isActive ? 'Manage Job & Verification' : 'View Full Receipt'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
