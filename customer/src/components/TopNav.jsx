import React from 'react';
import { Zap, ShieldCheck, MapPin, ChevronDown } from 'lucide-react';

export default function TopNav({ activeTab, setActiveTab, customerProfile, activeRequestsCount, onBack, canGoBack }) {
  const getAvatarInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').substring(0, 2) : '?';
  };

  const navItems = [
    { id: 'book', label: 'Book a Service' },
    { id: 'requests', label: `My Requests ${activeRequestsCount > 0 ? `(${activeRequestsCount} Active)` : ''}` },
    { id: 'profile', label: 'Profile' }
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center py-3 gap-4">
          <div className="flex items-center gap-3">
            {canGoBack && (
              <button 
                onClick={onBack} 
                className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
                title="Go Back"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
              </button>
            )}
            <div className="bg-blue-600 text-white p-2 rounded-lg relative">
              <Zap className="w-5 h-5 fill-current" />
              <ShieldCheck className="w-3 h-3 absolute -bottom-1 -right-1 text-white bg-blue-600 rounded-full" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 leading-tight">LocalFix</h1>
              <p className="text-xs text-slate-500 font-medium">Hyperlocal On-Demand Home Services</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between w-full sm:w-auto gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-100 py-1.5 px-3 rounded-full cursor-pointer hover:bg-slate-200 transition-colors">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span className="font-medium whitespace-nowrap">Pune • Sector 4</span>
              <ChevronDown className="w-4 h-4" />
            </div>

            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('profile')}>
              <div className="flex flex-col items-end hidden sm:flex">
                <span className="text-sm font-semibold text-slate-900">{customerProfile?.name?.split(' ')[0] || 'User'}</span>
                <span className="flex items-center text-[10px] font-bold text-green-700 bg-green-100 px-1.5 py-0.5 rounded-sm uppercase tracking-wide">
                  <ShieldCheck className="w-3 h-3 mr-0.5" /> Verified
                </span>
              </div>
              <div className="w-10 h-10 bg-blue-100 text-blue-700 font-bold rounded-full flex items-center justify-center border-2 border-blue-200 shrink-0">
                {getAvatarInitials(customerProfile?.name)}
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-6 mt-1 overflow-x-auto">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`pb-3 text-sm font-semibold transition-colors border-b-2 whitespace-nowrap ${
                activeTab === item.id 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
