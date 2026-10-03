import React from 'react';
import { 
  GraduationCap, 
  Users, 
  Calendar, 
  BookOpen, 
  Award, 
  Target, 
  Zap, 
  Sparkles, 
  ShieldCheck, 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  TrendingUp, 
  CheckCircle2, 
  Layers,
  ArrowUpRight
} from 'lucide-react';

export default function Sidebar({
  activePage,
  onSelectPage,
  isCollapsed,
  onToggleCollapse,
  workerProfile,
  isMobileOpen,
  onCloseMobile,
  currentRole = 'learner', // 'learner' | 'mentor'
  onToggleRole
}) {
  // Navigation categories for SkillConnect
  const LEARNING_NAV_ITEMS = [
    { 
      id: 'skillconnect_dashboard', 
      label: 'Learning Dashboard', 
      icon: Sparkles, 
      badge: 'Hub', 
      badgeColor: 'bg-blue-100 text-blue-700 border border-blue-200' 
    },
    { 
      id: 'find_mentor', 
      label: 'Find a Mentor', 
      icon: Users, 
      badge: '8 Online', 
      badgeColor: 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
    },
    { 
      id: 'my_training', 
      label: 'Training Schedule', 
      icon: Calendar, 
      badge: '1 Booked', 
      badgeColor: 'bg-amber-50 text-amber-700 border border-amber-200' 
    },
    { 
      id: 'learning_library', 
      label: 'Learning Library', 
      icon: BookOpen, 
      badge: '12 Modules', 
      badgeColor: 'bg-slate-100 text-slate-700 border border-slate-200' 
    },
    { 
      id: 'learner_progress', 
      label: 'Competency Roadmap', 
      icon: TrendingUp, 
      badge: '74% XP', 
      badgeColor: 'bg-indigo-50 text-indigo-700 border border-indigo-200' 
    }
  ];

  const CERTIFICATION_NAV_ITEMS = [
    { 
      id: 'skill_assessment', 
      label: 'Skill Assessments', 
      icon: CheckCircle2, 
      badge: 'Sign-off', 
      badgeColor: 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
    },
    { 
      id: 'my_achievements', 
      label: 'Certificates & Badges', 
      icon: Award, 
      badge: '4 Certs', 
      badgeColor: 'bg-blue-50 text-blue-700 border border-blue-200' 
    },
    { 
      id: 'job_eligibility', 
      label: 'Job Eligibility Matrix', 
      icon: Zap, 
      badge: 'High Pay', 
      badgeColor: 'bg-purple-50 text-purple-700 border border-purple-200' 
    }
  ];

  const MENTOR_NAV_ITEMS = [
    { 
      id: 'mentor_dashboard', 
      label: 'Mentor Dashboard', 
      icon: GraduationCap, 
      badge: 'Pro', 
      badgeColor: 'bg-indigo-600 text-white' 
    },
    { 
      id: 'become_mentor', 
      label: 'Become a Mentor', 
      icon: ShieldCheck, 
      badge: 'Accredited', 
      badgeColor: 'bg-slate-100 text-slate-700 border border-slate-200' 
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-40 bg-white border-r border-blue-100 flex flex-col justify-between transition-all duration-300 shadow-sm
        ${isMobileOpen ? 'translate-x-0 w-72' : '-translate-x-full lg:translate-x-0'}
        ${isCollapsed ? 'lg:w-20' : 'lg:w-68'}
      `}>
        
        {/* Top Header & Logo */}
        <div className="flex-1 flex flex-col min-h-0">
          
          <div className="h-18 px-4 flex items-center justify-between border-b border-blue-100 bg-white flex-shrink-0">
            <div 
              className="flex items-center gap-3 overflow-hidden cursor-pointer group" 
              onClick={() => {
                onSelectPage('skillconnect_dashboard');
                if (isMobileOpen) onCloseMobile();
              }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-blue-500/25 flex-shrink-0 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-5 h-5" />
              </div>
              {(!isCollapsed || isMobileOpen) && (
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg font-black tracking-tight text-slate-900 font-display">
                      Skill<span className="text-blue-600">Connect</span>
                    </span>
                    <span className="px-1.5 py-0.2 rounded-md text-[10px] font-black bg-blue-50 text-blue-700 border border-blue-200">
                      PRO
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium truncate">
                    Peer Mentorship & Upskilling
                  </p>
                </div>
              )}
            </div>

            {/* Desktop Collapse Button */}
            <button
              type="button"
              onClick={onToggleCollapse}
              className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Role Switcher Pill in Sidebar */}
          {(!isCollapsed || isMobileOpen) && (
            <div className="px-3 pt-3 pb-1 flex-shrink-0">
              <div className="p-1 bg-slate-100 rounded-2xl border border-slate-200 flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => onToggleRole && onToggleRole('learner')}
                  className={`flex-1 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    currentRole === 'learner' 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Learner</span>
                </button>

                <button
                  type="button"
                  onClick={() => onToggleRole && onToggleRole('mentor')}
                  className={`flex-1 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    currentRole === 'mentor' 
                      ? 'bg-blue-700 text-white shadow-sm' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Mentor</span>
                </button>
              </div>
            </div>
          )}

          {/* Navigation Links List */}
          <nav className="p-3 space-y-4 overflow-y-auto flex-1 custom-scrollbar">
            
            {/* Section 1: Learning & Training */}
            <div>
              {(!isCollapsed || isMobileOpen) && (
                <div className="px-3 pb-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  Learning & Mentorship
                </div>
              )}
              <div className="space-y-1">
                {LEARNING_NAV_ITEMS.map((item) => {
                  const IconComp = item.icon;
                  const isActive = activePage === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        onSelectPage(item.id);
                        if (isMobileOpen) onCloseMobile();
                      }}
                      title={isCollapsed ? item.label : ''}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer group ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                          : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50/70'
                      }`}
                    >
                      <IconComp className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-600'}`} />
                      
                      {(!isCollapsed || isMobileOpen) && (
                        <span className="flex-1 text-left truncate">{item.label}</span>
                      )}

                      {item.badge && (!isCollapsed || isMobileOpen) && (
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${isActive ? 'bg-white/20 text-white' : item.badgeColor}`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 2: Assessments & Career Pathways */}
            <div>
              {(!isCollapsed || isMobileOpen) && (
                <div className="px-3 pb-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  Assessments & Pathways
                </div>
              )}
              <div className="space-y-1">
                {CERTIFICATION_NAV_ITEMS.map((item) => {
                  const IconComp = item.icon;
                  const isActive = activePage === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        onSelectPage(item.id);
                        if (isMobileOpen) onCloseMobile();
                      }}
                      title={isCollapsed ? item.label : ''}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer group ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                          : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50/70'
                      }`}
                    >
                      <IconComp className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-600'}`} />
                      
                      {(!isCollapsed || isMobileOpen) && (
                        <span className="flex-1 text-left truncate">{item.label}</span>
                      )}

                      {item.badge && (!isCollapsed || isMobileOpen) && (
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${isActive ? 'bg-white/20 text-white' : item.badgeColor}`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 3: Mentor Space */}
            <div>
              {(!isCollapsed || isMobileOpen) && (
                <div className="px-3 pb-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  Mentor Portal
                </div>
              )}
              <div className="space-y-1">
                {MENTOR_NAV_ITEMS.map((item) => {
                  const IconComp = item.icon;
                  const isActive = activePage === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        onSelectPage(item.id);
                        if (isMobileOpen) onCloseMobile();
                      }}
                      title={isCollapsed ? item.label : ''}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer group ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                          : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50/70'
                      }`}
                    >
                      <IconComp className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-600'}`} />
                      
                      {(!isCollapsed || isMobileOpen) && (
                        <span className="flex-1 text-left truncate">{item.label}</span>
                      )}

                      {item.badge && (!isCollapsed || isMobileOpen) && (
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${isActive ? 'bg-white/20 text-white' : item.badgeColor}`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

          </nav>
        </div>

        {/* Bottom Profile Card */}
        <div className="p-3 border-t border-blue-100 bg-slate-50 flex-shrink-0">
          <div 
            onClick={() => {
              onSelectPage('learner_progress');
              if (isMobileOpen) onCloseMobile();
            }}
            className="flex items-center gap-3 p-2 rounded-2xl hover:bg-white hover:shadow-xs transition-all cursor-pointer border border-transparent hover:border-blue-100"
          >
            <div className="relative flex-shrink-0">
              <img
                src={workerProfile?.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"}
                alt={workerProfile?.name || "User"}
                className="w-10 h-10 rounded-xl object-cover ring-2 ring-blue-500/30"
              />
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white bg-emerald-500"></span>
            </div>

            {(!isCollapsed || isMobileOpen) && (
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1">
                  <h4 className="text-xs font-bold text-slate-900 truncate">{workerProfile?.name || "Rajesh Sharma"}</h4>
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <span className="text-amber-500 font-bold flex items-center gap-0.5">
                    <Star className="w-3 h-3 fill-amber-400" />
                    {workerProfile?.rating || "4.9"}
                  </span>
                  <span>•</span>
                  <span className="truncate text-[10px] text-blue-700 font-semibold">Level 3 Pro</span>
                </div>
              </div>
            )}
          </div>
        </div>

      </aside>
    </>
  );
}
