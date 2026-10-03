import React, { useState } from 'react';
import { 
  BarChart3, 
  Star, 
  CheckCircle2, 
  TrendingUp, 
  Award, 
  ShieldCheck, 
  Clock, 
  ThumbsUp, 
  Zap, 
  MessageSquare,
  Filter,
  Check
} from 'lucide-react';

export default function PerformancePage({
  workerProfile,
  completedJobs = []
}) {
  const [selectedRatingFilter, setSelectedRatingFilter] = useState('all');

  const reviewsList = completedJobs.filter(j => j.rating);

  const filteredReviews = reviewsList.filter(r => {
    if (selectedRatingFilter === 'all') return true;
    return r.rating === parseInt(selectedRatingFilter);
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display">
          Performance & Customer Ratings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Real-time quality KPIs, tier eligibility perks, and verified customer testimonials.
        </p>
      </div>

      {/* Tier Status Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 p-6 rounded-3xl text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-white flex-shrink-0">
            <Award className="w-8 h-8 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white">{workerProfile.tier} Level</h2>
              <span className="text-xs font-black bg-amber-400 text-slate-900 px-2.5 py-0.5 rounded-full shadow-xs">
                Top 1% in Pune
              </span>
            </div>
            <p className="text-xs text-blue-100 mt-1 max-w-lg leading-relaxed">
              You receive first-priority algorithm dispatching in Sector 4 and reduced 8% commission on all completed assignments.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-center self-start md:self-auto">
          <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/20">
            <span className="text-[10px] font-bold text-blue-100 uppercase">Commission Fee</span>
            <div className="text-lg font-black text-white font-mono">8% (Lowest)</div>
          </div>
          <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/20">
            <span className="text-[10px] font-bold text-blue-100 uppercase">Repeat Customer Rate</span>
            <div className="text-lg font-black text-white font-mono">64%</div>
          </div>
        </div>
      </div>

      {/* 4 Core Performance KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-3xl border border-slate-200 space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase">
            <span>Acceptance Rate</span>
            <Zap className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono">{workerProfile.acceptanceRate}%</div>
          <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Exceeds 90% Platinum benchmark
          </p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase">
            <span>Completion Rate</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono">{workerProfile.completionRate}%</div>
          <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <Check className="w-3 h-3" /> Zero unexcused cancellations
          </p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase">
            <span>On-Time Arrival</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono">{workerProfile.onTimeArrival}%</div>
          <p className="text-[11px] text-slate-500">Average ETA variance: ±3 mins</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase">
            <span>Overall Rating</span>
            <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
          </div>
          <div className="text-3xl font-black text-amber-500 font-mono flex items-baseline gap-1">
            <span>{workerProfile.rating}</span>
            <span className="text-xs text-slate-400 font-normal">/ 5.0</span>
          </div>
          <p className="text-[11px] text-slate-500">{workerProfile.totalReviews} total reviews</p>
        </div>

      </div>

      {/* Reviews & Testimonials Section */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-display">Verified Customer Testimonials</h3>
            <p className="text-xs text-slate-500">Public feedback left by clients after PIN completion</p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedRatingFilter}
              onChange={(e) => setSelectedRatingFilter(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 rounded-xl text-xs font-bold text-slate-700 border border-slate-200 outline-hidden focus:border-blue-500"
            >
              <option value="all">All Star Ratings</option>
              <option value="5">5 Stars Only</option>
              <option value="4">4 Stars Only</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={rev.customer.avatar}
                      alt={rev.customer.name}
                      className="w-9 h-9 rounded-xl object-cover ring-1 ring-slate-200"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{rev.customer.name}</h4>
                      <span className="text-[10px] text-slate-400">{rev.completedDate || rev.scheduledTime}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-slate-700 mt-3 italic leading-relaxed">
                  "{rev.review}"
                </p>
              </div>

              {rev.reviewTags && rev.reviewTags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-200">
                  {rev.reviewTags.map((tag) => (
                    <span key={tag} className="text-[10px] font-semibold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md border border-blue-200">
                      ✓ {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
