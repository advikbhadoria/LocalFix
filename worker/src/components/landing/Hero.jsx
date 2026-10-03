import { ArrowRight, Play, MapPin, Wallet, ShieldCheck, Star, Bell, CheckCircle2 } from 'lucide-react';

// Mini dashboard preview card
function PreviewCard({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-xl shadow-lg border border-blue-100 p-3 ${className}`}>
      {children}
    </div>
  );
}

function DashboardPreview() {
  return (
    <div className="relative w-full max-w-sm mx-auto select-none">
      {/* Phone frame */}
      <div className="bg-gradient-to-b from-blue-900 to-blue-950 rounded-3xl p-4 shadow-2xl border border-blue-800">
        {/* Status bar */}
        <div className="flex justify-between text-blue-300 text-xs mb-3 px-1">
          <span>9:41 AM</span>
          <div className="flex gap-1 items-center">
            <span className="w-3 h-1.5 bg-blue-300 rounded-sm"></span>
            <span className="w-3 h-1.5 bg-blue-300 rounded-sm"></span>
            <span className="w-3 h-1.5 bg-blue-200 rounded-sm"></span>
          </div>
        </div>

        {/* App header */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-blue-300 text-xs">Good morning,</p>
            <p className="text-white font-bold text-base">Aman Kumar 👋</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-8 h-8 bg-blue-700/50 rounded-full flex items-center justify-center">
                <Bell size={14} className="text-white" />
              </div>
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-red-500 rounded-full text-white text-[8px] flex items-center justify-center font-bold">3</span>
            </div>
            <div className="flex items-center gap-1 bg-green-500/20 border border-green-500/30 rounded-full px-2 py-1">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
              <span className="text-green-300 text-xs font-medium">Online</span>
            </div>
          </div>
        </div>

        {/* Wallet card */}
        <div className="bg-blue-700 rounded-xl p-3 mb-3 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-16 h-16 bg-blue-600/40 rounded-full -translate-x-4 -translate-y-4"></div>
          <p className="text-blue-200 text-xs mb-0.5">Wallet Balance</p>
          <p className="text-white text-2xl font-bold">₹4,850</p>
          <p className="text-green-300 text-xs mt-1">+₹1,850 today</p>
        </div>

        {/* New job alert */}
        <div className="bg-orange-500 rounded-xl p-3 mb-3 animate-pulse">
          <div className="flex items-center justify-between mb-1">
            <span className="text-white text-xs font-bold uppercase tracking-wide">🔔 New Job!</span>
            <span className="text-orange-200 text-xs font-mono">00:18</span>
          </div>
          <p className="text-white font-semibold text-sm">❄️ AC Repair</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-orange-100 text-xs">📍 2.4 km · ₹650</span>
            <div className="flex gap-1">
              <button className="bg-white text-orange-600 text-xs font-bold px-2 py-1 rounded-lg">Accept</button>
              <button className="bg-orange-400/50 text-white text-xs px-2 py-1 rounded-lg">Reject</button>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          {[
            { label: 'Jobs', value: '127', color: 'text-blue-300' },
            { label: 'Rating', value: '4.8⭐', color: 'text-yellow-300' },
            { label: 'Today', value: '4 jobs', color: 'text-green-300' },
          ].map(s => (
            <div key={s.label} className="bg-blue-800/50 rounded-lg p-2 text-center">
              <p className={`text-xs font-bold ${s.color}`}>{s.value}</p>
              <p className="text-blue-400 text-[10px]">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Safety status */}
        <div className="flex items-center justify-between bg-blue-800/40 rounded-xl p-2.5">
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-green-400" />
            <span className="text-green-300 text-xs font-medium">Safety Active</span>
          </div>
          <span className="w-2 h-2 bg-green-400 rounded-full"></span>
        </div>
      </div>

      {/* Floating badges */}
      <div className="absolute -right-6 top-12 bg-white rounded-xl shadow-xl p-2.5 border border-blue-100 hidden sm:block">
        <p className="text-xs font-bold text-green-600">+₹650</p>
        <p className="text-[10px] text-slate-500">Paid instantly</p>
      </div>
      <div className="absolute -left-6 bottom-20 bg-white rounded-xl shadow-xl p-2.5 border border-blue-100 hidden sm:block">
        <p className="text-xs font-bold text-blue-700">🛡️ Protected</p>
        <p className="text-[10px] text-slate-500">Number masked</p>
      </div>
    </div>
  );
}

export default function Hero({ onDashboard }) {
  return (
    <section id="home" className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 flex items-center relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-700/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 -left-20 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl"></div>
        {/* Grid */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 50px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 50px)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div className="text-center lg:text-left animate-fadeUp">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-700/40 border border-blue-500/40 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-blue-200 text-sm font-medium">Built for India's Gig Workers</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              More jobs.{' '}
              <span className="text-blue-300">Safer</span> work.{' '}
              <span className="text-green-400">Faster</span> pay.
            </h1>

            <p className="text-blue-200 text-lg sm:text-xl leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
              One platform for every gig worker — from finding jobs to getting paid safely and instantly.
            </p>

            {/* Stats */}
            <div className="flex gap-6 mb-8 justify-center lg:justify-start">
              {[
                { value: '50K+', label: 'Workers' },
                { value: '₹2Cr+', label: 'Paid Out' },
                { value: '4.9⭐', label: 'Rating' },
              ].map(s => (
                <div key={s.label}>
                  <p className="text-white font-bold text-xl">{s.value}</p>
                  <p className="text-blue-300 text-xs">{s.label}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <button
                onClick={onDashboard}
                className="group flex items-center justify-center gap-2 bg-white text-blue-900 font-bold px-7 py-3.5 rounded-xl hover:bg-blue-50 transition-all shadow-lg shadow-blue-950/30 text-base"
              >
                Get Started
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center justify-center gap-2 border border-blue-500/50 text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-blue-800/50 transition-all text-base"
              >
                <Play size={16} /> See How It Works
              </button>
            </div>
          </div>

          {/* Right: Dashboard Preview */}
          <div className="animate-fadeUp" style={{ animationDelay: '0.2s' }}>
            <DashboardPreview />
          </div>
        </div>
      </div>
    </section>
  );
}
