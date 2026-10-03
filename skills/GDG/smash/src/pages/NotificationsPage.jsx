import React, { useState } from 'react';
import { 
  Bell, 
  CheckCheck, 
  Trash2, 
  Zap, 
  DollarSign, 
  Award, 
  ShieldAlert, 
  Clock, 
  CheckCircle2,
  Filter
} from 'lucide-react';

export default function NotificationsPage({
  notifications = [],
  onMarkAllAsRead,
  onClearNotifications,
  onSelectPage
}) {
  const [filterCategory, setFilterCategory] = useState('all');

  const filtered = notifications.filter(n => {
    if (filterCategory === 'all') return true;
    return n.category === filterCategory;
  });

  const getIcon = (cat) => {
    switch (cat) {
      case 'job': return <Zap className="w-4 h-4 text-blue-600" />;
      case 'payment': return <DollarSign className="w-4 h-4 text-emerald-600" />;
      case 'system': return <Award className="w-4 h-4 text-amber-500" />;
      case 'safety': return <ShieldAlert className="w-4 h-4 text-rose-600" />;
      default: return <Bell className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display">
            Notification Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Real-time feed of job dispatches, escrow payouts, safety broadcasts, and tier achievements.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onMarkAllAsRead}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <CheckCheck className="w-4 h-4 text-blue-600" />
            <span>Mark All Read</span>
          </button>

          <button
            type="button"
            onClick={onClearNotifications}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 border border-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Categories Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
        {['all', 'job', 'payment', 'system', 'safety'].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilterCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer whitespace-nowrap ${
              filterCategory === cat
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat === 'all' ? 'All Alerts' : `${cat}s`}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3 shadow-xs">
            <Bell className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-xs text-slate-500">No alerts in this category.</p>
          </div>
        ) : (
          filtered.map((n) => (
            <div
              key={n.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all flex items-start gap-4 ${
                n.unread
                  ? 'bg-blue-50/50 border-blue-200 shadow-xs'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs flex-shrink-0">
                {getIcon(n.category)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 truncate">{n.title}</h3>
                  <span className="text-[10px] text-slate-400 flex-shrink-0 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {n.time}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{n.message}</p>
              </div>

              {n.unread && (
                <span className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0 mt-1"></span>
              )}
            </div>
          ))
        )}
      </div>

    </div>
  );
}
