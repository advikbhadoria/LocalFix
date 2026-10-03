import React, { useState } from 'react';
import { 
  Award, 
  ShieldCheck, 
  Download, 
  Share2, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink, 
  Zap, 
  Sun, 
  GraduationCap, 
  MessageSquare,
  Eye
} from 'lucide-react';

export default function MyAchievementsPage({
  achievements,
  onOpenCertificate
}) {
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'verified_competency' | 'safety_certification' | 'course_completion' | 'mentor_milestone'

  const filteredAchievements = achievements.filter((ach) => {
    if (activeFilter === 'all') return true;
    return ach.type === activeFilter;
  });

  const getBadgeIcon = (iconName) => {
    switch (iconName) {
      case 'Zap': return Zap;
      case 'Sun': return Sun;
      case 'ShieldCheck': return ShieldCheck;
      case 'GraduationCap': return GraduationCap;
      case 'MessageSquare': return MessageSquare;
      default: return Award;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display flex items-center gap-2">
            <span>Verified Skills & Competency Credentials</span>
            <span className="text-amber-500 text-lg">🏆</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Your earned skill certifications, verified practical assessments, and safety compliance credentials.
          </p>
        </div>

        <div className="p-2.5 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-700 font-bold flex items-center gap-2 self-start sm:self-auto shadow-xs">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <span>4 Verified Competency Credentials</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1">
        {[
          { id: 'all', label: 'All Achievements' },
          { id: 'verified_competency', label: 'Verified Competencies' },
          { id: 'safety_certification', label: 'Safety Certifications' },
          { id: 'course_completion', label: 'Course Badges' },
          { id: 'mentor_milestone', label: 'Mentorship Milestones' }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveFilter(tab.id)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeFilter === tab.id
                ? 'bg-blue-600 text-white shadow-md font-black shadow-blue-500/20'
                : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Badges & Certificates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAchievements.map((ach) => {
          const Icon = getBadgeIcon(ach.badgeIcon);
          return (
            <div
              key={ach.id}
              className="p-6 rounded-3xl bg-white border border-blue-100 hover:border-blue-300 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between space-y-5 group relative overflow-hidden"
            >
              {/* Blue accent corner glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full blur-xl pointer-events-none group-hover:bg-blue-100 transition-colors"></div>

              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200 group-hover:scale-110 transition-transform shadow-xs">
                    <Icon className="w-7 h-7" />
                  </div>

                  {ach.verified && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> VERIFIED
                    </span>
                  )}
                </div>

                <div className="mt-4 space-y-1">
                  <span className="text-[10px] font-black text-blue-700 uppercase tracking-wider">
                    {ach.category}
                  </span>
                  <h3 className="text-base font-bold text-slate-900">{ach.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {ach.description}
                  </p>
                </div>
              </div>

              {/* Assessor, Date & Score */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
                <div className="flex justify-between text-slate-500 text-[11px]">
                  <span>Issued By:</span>
                  <span className="text-slate-800 font-bold">{ach.issuer}</span>
                </div>
                <div className="flex justify-between text-slate-500 text-[11px]">
                  <span>Assessed Date:</span>
                  <span className="text-slate-800 font-bold">{ach.date}</span>
                </div>
                {ach.score && (
                  <div className="flex justify-between text-slate-500 text-[11px]">
                    <span>Rubric Score:</span>
                    <span className="text-emerald-700 font-mono font-bold">{ach.score}%</span>
                  </div>
                )}
                {ach.certificateId && (
                  <div className="flex justify-between text-slate-500 text-[10px] font-mono border-t border-slate-200 pt-1.5">
                    <span>Cert ID:</span>
                    <span className="text-blue-600 font-bold">{ach.certificateId}</span>
                  </div>
                )}
              </div>

              {/* View Certificate Action */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => onOpenCertificate && onOpenCertificate(ach)}
                  className="w-full py-2.5 rounded-xl text-xs font-black bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Official Certificate</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
