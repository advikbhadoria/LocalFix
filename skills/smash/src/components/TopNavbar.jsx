import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  Search, 
  Bell, 
  Sun, 
  Moon, 
  Power, 
  ChevronDown, 
  User, 
  LogOut, 
  Settings, 
  Award, 
  Zap, 
  Clock,
  Sparkles,
  GraduationCap,
  BookOpen,
  Calendar,
  CheckCircle2
} from 'lucide-react';

export default function TopNavbar({
  workerProfile,
  onToggleOnline,
  onToggleTheme,
  theme = 'light',
  onSelectPage,
  notifications = [],
  onOpenMobileSidebar,
  searchQuery,
  onSearchChange,
  currentRole = 'learner',
  onToggleRole
}) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const formattedDate = currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  // Filter or augment notifications for SkillConnect
  const skillNotifications = [
    {
      id: 'sn-1',
      title: 'Mentor Session Confirmed',
      message: 'Master Electrician Vikram Iyer confirmed your 1-on-1 DB Phase Balancing lab for tomorrow at 10:00 AM.',
      time: '15m ago',
      unread: true,
      page: 'my_training'
    },
    {
      id: 'sn-2',
      title: 'Checklist Reviewed & Approved',
      message: 'Your 3-Phase Inverter Safety Checklist was verified with 100% score by Mentor Suresh Nair.',
      time: '2h ago',
      unread: true,
      page: 'skill_assessment'
    },
    {
      id: 'sn-3',
      title: 'New Certificate Available',
      message: 'Advanced Solar PV Inverter Diagnostics certification is ready to download and share.',
      time: '1d ago',
      unread: false,
      page: 'my_achievements'
    }
  ];

  const unreadCount = skillNotifications.filter(n => n.unread).length;

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-blue-100 px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4 shadow-xs">
      
      {/* Left: Mobile Drawer Button & Greetings */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center gap-1.5 font-display">
              <span>Welcome back, {workerProfile?.name ? workerProfile.name.split(' ')[0] : 'Learner'}!</span>
              <span className="text-blue-600 text-sm">🎓</span>
            </h1>
            <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-50 text-blue-700 border border-blue-200">
              <Sparkles className="w-3 h-3 text-blue-600" />
              SkillConnect Academy Hub
            </span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium hidden sm:flex items-center gap-2">
            <span>{formattedDate}</span>
            <span>•</span>
            <span className="font-mono text-slate-700 font-semibold">{formattedTime}</span>
            <span>•</span>
            <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
              Level 3 Senior Pro
            </span>
          </p>
        </div>
      </div>

      {/* Middle: Global Quick Search */}
      <div className="hidden md:block flex-1 max-w-md mx-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search courses, mentors, certifications, assessments..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-hidden transition-all"
          />
        </div>
      </div>

      {/* Right Controls Group */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        
        {/* Role Mode Switcher Pill */}
        <button
          type="button"
          onClick={() => {
            const next = currentRole === 'learner' ? 'mentor' : 'learner';
            if (onToggleRole) onToggleRole(next);
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black transition-all border cursor-pointer ${
            currentRole === 'mentor'
              ? 'bg-blue-700 text-white border-blue-700 shadow-xs shadow-blue-500/20'
              : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
          }`}
          title="Click to toggle Learner / Mentor mode"
        >
          {currentRole === 'mentor' ? (
            <>
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Mentor Mode</span>
            </>
          ) : (
            <>
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              <span>Learner Mode</span>
            </>
          )}
        </button>

        {/* Training XP / Hours Pill */}
        <div 
          onClick={() => onSelectPage('learner_progress')}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 cursor-pointer hover:bg-amber-100 transition-colors"
          title="View Competency Roadmap & XP Progress"
        >
          <Zap className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
          <span>740 XP</span>
          <span className="text-amber-400">•</span>
          <span className="text-[11px] font-mono text-amber-900 font-black">42.5h</span>
        </div>

        {/* Theme Toggle Switch */}
        <button
          type="button"
          onClick={onToggleTheme}
          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200 cursor-pointer"
          title="Toggle Dark / Light Theme"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-slate-700" />}
        </button>

        {/* Notification Bell with Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="relative p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200 cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Dropdown Menu */}
          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-blue-100 p-3 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 px-1">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-blue-600" /> SkillConnect Alerts
                </span>
                <span className="text-[11px] text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                  {unreadCount} New
                </span>
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto custom-scrollbar">
                {skillNotifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => {
                      onSelectPage(n.page);
                      setIsNotifOpen(false);
                    }}
                    className={`p-2.5 rounded-xl border text-xs transition-colors cursor-pointer ${
                      n.unread ? 'bg-blue-50/90 border-blue-200 text-slate-900' : 'bg-slate-50 border-slate-100 text-slate-600'
                    }`}
                  >
                    <div className="font-bold text-slate-900 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${n.unread ? 'bg-blue-600' : 'bg-slate-300'}`}></span>
                        {n.title}
                      </span>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1 pl-3 line-clamp-2">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer group"
          >
            <img
              src={workerProfile?.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"}
              alt={workerProfile?.name || "User"}
              className="w-7 h-7 rounded-full object-cover ring-1 ring-blue-500"
            />
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-900 transition-transform" />
          </button>

          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-blue-100 p-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-3 py-2.5 border-b border-slate-100">
                <div className="text-xs font-bold text-slate-900">{workerProfile?.name || "Rajesh Sharma"}</div>
                <div className="text-[11px] text-blue-600 font-semibold">Senior Certified Electrician (Level 3)</div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">ID: SKILL-PRO-4092</div>
              </div>

              <div className="py-1 text-xs space-y-0.5">
                <button
                  type="button"
                  onClick={() => {
                    onSelectPage('skillconnect_dashboard');
                    setIsProfileMenuOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl flex items-center gap-2 font-bold"
                >
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  Learning Dashboard
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onSelectPage('learner_progress');
                    setIsProfileMenuOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl flex items-center gap-2 font-medium"
                >
                  <User className="w-4 h-4 text-slate-500" />
                  Competency Roadmap
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onSelectPage('my_achievements');
                    setIsProfileMenuOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl flex items-center gap-2 font-medium"
                >
                  <Award className="w-4 h-4 text-emerald-600" />
                  Verified Certifications (4)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onSelectPage('my_training');
                    setIsProfileMenuOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left text-slate-700 hover:text-amber-700 hover:bg-amber-50 rounded-xl flex items-center gap-2 font-medium"
                >
                  <Calendar className="w-4 h-4 text-amber-600" />
                  Training Schedule
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onSelectPage('mentor_dashboard');
                    setIsProfileMenuOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left text-purple-700 hover:bg-purple-50 rounded-xl flex items-center gap-2 font-bold"
                >
                  <GraduationCap className="w-4 h-4 text-purple-600" />
                  Mentor Portal
                </button>
              </div>

              <div className="pt-1 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    alert('Session reset in demo environment.');
                    setIsProfileMenuOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left text-rose-600 hover:bg-rose-50 rounded-xl flex items-center gap-2 text-xs font-semibold"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

    </header>
  );
}
