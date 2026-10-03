import React from 'react';
import { 
  Zap, 
  ShieldCheck, 
  Lock, 
  Unlock, 
  Award, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  Briefcase, 
  UserCheck, 
  AlertCircle,
  TrendingUp,
  Coins
} from 'lucide-react';
import { 
  MOCK_JOB_ELIGIBILITY_MATRIX, 
  MOCK_APPRENTICESHIP_OPPORTUNITIES 
} from '../../data/skillConnectData';

export default function JobEligibilityPage({
  onSelectPage,
  onOpenVideoLesson
}) {
  return (
    <div className="space-y-8 animate-in fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display flex items-center gap-2">
            <span>Skill-Based Job Eligibility & Apprenticeships</span>
            <span className="text-blue-600 text-lg">💼</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            How your verified competencies unlock high-rate dispatch calls and supervised field co-working jobs.
          </p>
        </div>

        <div className="p-2.5 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-700 font-bold flex items-center gap-2 self-start sm:self-auto shadow-xs">
          <TrendingUp className="w-4 h-4 text-blue-600" />
          <span>Higher Skills = Higher Hourly Payouts</span>
        </div>
      </div>

      {/* 1. SKILL-BASED JOB ELIGIBILITY MATRIX */}
      <div className="space-y-4">
        <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-500" />
          Dispatch Eligibility by Verified Competency
        </h2>

        <div className="space-y-4">
          {MOCK_JOB_ELIGIBILITY_MATRIX.map((item) => (
            <div
              key={item.id}
              className={`p-6 rounded-3xl border transition-all shadow-sm space-y-4 ${
                item.isEligible
                  ? 'bg-white border-emerald-300 hover:border-emerald-500 hover:shadow-md'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-3 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-blue-50 text-blue-700 border border-blue-200">
                      {item.category}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                      {item.demandTier}
                    </span>
                    {item.isEligible ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                        <Unlock className="w-3 h-3 text-emerald-600" /> UNLOCKED & ACTIVE
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-slate-100 text-slate-500 border border-slate-200 flex items-center gap-1">
                        <Lock className="w-3 h-3" /> COMPETENCY REQUIRED
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mt-1">{item.jobTitle}</h3>
                </div>

                <div className="text-left md:text-right">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Estimated Dispatch Rate</span>
                  <div className="text-base font-black text-emerald-700 font-mono">{item.payout}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="space-y-1">
                  <span className="text-slate-400 text-[10px] font-bold uppercase">Required Skill Competency:</span>
                  <p className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span>{item.requiredSkill}</span>
                  </p>
                </div>

                <div className="space-y-1 md:col-span-2">
                  <span className="text-slate-400 text-[10px] font-bold uppercase">Eligibility Status & Advice:</span>
                  <p className={`text-[11px] leading-snug font-medium ${item.isEligible ? 'text-emerald-700' : 'text-slate-600'}`}>
                    {item.eligibilityReason}
                  </p>
                </div>
              </div>

              {/* Action row for locked jobs */}
              {!item.isEligible && item.missingSkill && (
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between flex-wrap gap-3">
                  <span className="text-xs text-teal-700 flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-teal-600" />
                    Estimated time to unlock: <strong>{item.estimatedTimeToUnlock}</strong>
                  </span>

                  <button
                    type="button"
                    onClick={() => onSelectPage('learning_library')}
                    className="px-4 py-2 rounded-xl text-xs font-black bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Start Required Course</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 2. SUPERVISED APPRENTICESHIP CO-WORKING OPPORTUNITIES */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Coins className="w-5 h-5 text-blue-600" />
            Supervised Apprenticeship Gigs (Co-Working with Mentors)
          </h2>
          <p className="text-xs text-slate-500">
            Get paid daily training allowances while shadowing certified masters on complex customer dispatches.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_APPRENTICESHIP_OPPORTUNITIES.map((appr) => (
            <div
              key={appr.id}
              className="p-6 rounded-3xl bg-white border border-blue-100 hover:border-blue-300 transition-all shadow-sm hover:shadow-md flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={appr.mentorAvatar}
                      alt={appr.mentorName}
                      className="w-12 h-12 rounded-2xl object-cover ring-2 ring-blue-500/20 shadow-xs"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{appr.mentorName}</h4>
                      <p className="text-[11px] text-blue-700 font-medium">{appr.mentorTitle}</p>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full text-xs font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {appr.stipend}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">{appr.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{appr.description}</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs">
                  <div className="flex justify-between text-[11px] text-slate-600">
                    <span className="text-slate-400">Date & Duration:</span>
                    <span className="font-bold text-slate-900">{appr.date} ({appr.duration})</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-600">
                    <span className="text-slate-400">Location:</span>
                    <span className="font-bold text-slate-900">{appr.location}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-600">
                    <span className="text-slate-400">Your Co-Pilot Role:</span>
                    <span className="font-bold text-blue-700">{appr.learnerRole}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-600">
                    <span className="text-slate-400">Customer Consent:</span>
                    <span className="text-emerald-700 font-bold">Granted ✓</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-medium">
                  {appr.spotsAvailable} of {appr.spotsTotal} spots open
                </span>

                <button
                  type="button"
                  onClick={() => alert(`✓ Applied for ${appr.title}! Mentor ${appr.mentorName} has been notified.`)}
                  className="px-5 py-2 rounded-xl text-xs font-black bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all cursor-pointer"
                >
                  Apply for Co-Working Gig
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
