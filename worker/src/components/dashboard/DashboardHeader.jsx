import { Bell, Wallet, ChevronDown, Menu, Zap } from 'lucide-react';
import { useState } from 'react';
import { WORKER } from '../../data/mockData';

export default function DashboardHeader({
  isOnline, setIsOnline, wallet, unreadCount, setDashTab, onLanding,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-blue-100 shadow-sm sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
        {/* Logo */}
        <button onClick={onLanding} className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 bg-blue-700 rounded-lg flex items-center justify-center">
            <Zap size={14} className="text-white" />
          </div>
          <span className="font-display font-bold text-base text-blue-900 hidden sm:block">localfix</span>
        </button>

        {/* Online toggle */}
        <button
          onClick={() => setIsOnline(v => !v)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all ${
            isOnline
              ? 'bg-green-50 border-green-300 text-green-700'
              : 'bg-slate-100 border-slate-300 text-slate-600'
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-slate-400'}`} />
          {isOnline ? 'Online' : 'Offline'}
          <ChevronDown size={12} />
        </button>

        <div className="flex-1" />

        {/* Wallet */}
        <button
          onClick={() => setDashTab('wallet')}
          className="hidden sm:flex items-center gap-1.5 bg-blue-50 border border-blue-200 rounded-lg px-3 py-1.5 hover:bg-blue-100 transition-colors"
        >
          <Wallet size={14} className="text-blue-700" />
          <span className="text-blue-800 font-bold text-sm">₹{wallet.toLocaleString('en-IN')}</span>
        </button>

        {/* Notifications */}
        <button
          onClick={() => setDashTab('notifications')}
          className="relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-blue-50 transition-colors"
          aria-label="Notifications"
        >
          <Bell size={19} className="text-slate-600" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>

        {/* Avatar */}
        <button
          onClick={() => setDashTab('profile')}
          className="w-9 h-9 bg-blue-700 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
        >
          {WORKER.avatar}
        </button>
      </div>
    </header>
  );
}
