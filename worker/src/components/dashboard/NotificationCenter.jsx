import { useState } from 'react';
import { Bell, CheckCheck } from 'lucide-react';

const CATEGORIES = ['All', 'Jobs', 'Earnings', 'Ratings', 'Safety'];

export default function NotificationCenter({ notifications, onMarkAllRead }) {
  const [cat, setCat] = useState('All');

  const filtered = cat === 'All'
    ? notifications
    : notifications.filter(n => n.category === cat.toLowerCase());

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-800 text-lg">Notifications</h3>
        <button
          onClick={onMarkAllRead}
          className="flex items-center gap-1.5 text-blue-600 text-xs font-semibold hover:text-blue-800 transition-colors"
        >
          <CheckCheck size={14} /> Mark all read
        </button>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORIES.map(c => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              cat === c ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-500 hover:bg-blue-50 hover:text-blue-700'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Notifications */}
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="card p-8 text-center">
            <Bell size={28} className="text-slate-300 mx-auto mb-2" />
            <p className="text-slate-500 text-sm">No notifications in this category</p>
          </div>
        ) : filtered.map(n => (
          <div key={n.id} className={`card p-4 flex items-start gap-3 transition-colors ${!n.read ? 'bg-blue-50/60 border-blue-200' : ''}`}>
            <span className="text-xl shrink-0 mt-0.5">{n.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className="font-semibold text-slate-800 text-sm">{n.title}</p>
                {!n.read && <span className="notif-dot shrink-0 mt-1" />}
              </div>
              <p className="text-slate-500 text-xs mt-0.5">{n.body}</p>
              <p className="text-slate-400 text-[10px] mt-1">{n.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
