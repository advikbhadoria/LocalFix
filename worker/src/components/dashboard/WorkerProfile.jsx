import { useState } from 'react';
import { Star, ChevronRight } from 'lucide-react';
import { WORKER, BADGES } from '../../data/mockData';

export default function WorkerProfile({ setDashTab }) {
  const [badgeTip, setBadgeTip] = useState(null);

  return (
    <div className="card p-5">
      <div className="flex items-start justify-between gap-3">
        {/* Avatar + info */}
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 bg-blue-700 rounded-2xl flex items-center justify-center text-white text-xl font-bold shrink-0">
            {WORKER.avatar}
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-base">{WORKER.name}</h3>
            <p className="text-slate-500 text-sm">{WORKER.service}</p>
            <div className="flex items-center gap-1 mt-1">
              <Star size={13} className="text-yellow-500 fill-yellow-400" />
              <span className="text-sm font-semibold text-slate-700">{WORKER.rating}</span>
              <span className="text-slate-400 text-xs">· {WORKER.jobsCompleted} jobs</span>
            </div>
          </div>
        </div>
        <button
          onClick={() => setDashTab('profile')}
          className="text-blue-600 text-xs font-semibold flex items-center gap-1 hover:text-blue-800 transition-colors shrink-0"
        >
          View Profile <ChevronRight size={14} />
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="bg-blue-50 rounded-xl p-3 text-center">
          <p className="text-blue-800 font-bold text-lg">{WORKER.acceptanceRate}%</p>
          <p className="text-blue-500 text-xs">Acceptance Rate</p>
        </div>
        <div className="bg-green-50 rounded-xl p-3 text-center">
          <p className="text-green-800 font-bold text-lg">{WORKER.completionRate}%</p>
          <p className="text-green-500 text-xs">Completion Rate</p>
        </div>
      </div>

      {/* Badges */}
      <div className="mt-4">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Achievements</p>
        <div className="flex gap-2 flex-wrap">
          {BADGES.map(b => (
            <div key={b.id} className="relative">
              <button
                onClick={() => setBadgeTip(badgeTip === b.id ? null : b.id)}
                className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 rounded-full px-2.5 py-1 text-xs font-medium text-blue-800 hover:bg-blue-100 transition-colors"
              >
                <span>{b.icon}</span>
                <span>{b.label}</span>
              </button>
              {badgeTip === b.id && (
                <div className="absolute bottom-8 left-0 bg-slate-800 text-white text-xs rounded-lg px-3 py-2 z-10 whitespace-nowrap shadow-xl animate-fadeIn">
                  {b.desc}
                  <div className="absolute top-full left-3 border-4 border-transparent border-t-slate-800" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
