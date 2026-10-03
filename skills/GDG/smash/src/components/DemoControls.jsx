import React, { useState } from 'react';
import { 
  Sparkles, 
  RotateCcw, 
  ChevronUp, 
  ChevronDown,
  GraduationCap,
  Award,
  CheckCircle2,
  BookOpen,
  Calendar,
  Briefcase,
  Users
} from 'lucide-react';

export default function DemoControls({
  onResetDemoData,
  onSimulateBookSession,
  onSimulateCompleteLesson,
  onSimulateSubmitChecklist,
  onSimulatePassAssessment,
  onSimulateUnlockJob,
  onToggleRole,
  currentRole = 'learner'
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-blue-200 shadow-2xl shadow-blue-500/15 overflow-hidden transition-all duration-300 w-80 sm:w-96">
        
        {/* Toggle Bar */}
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-4 py-2.5 flex items-center justify-between gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold hover:from-blue-700 hover:to-indigo-700 transition-all cursor-pointer shadow-sm"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping"></span>
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>SkillConnect Demo Action Hub</span>
          </div>
          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>

        {/* Action Buttons Grid */}
        {isExpanded && (
          <div className="p-3.5 space-y-3 bg-white text-slate-800 animate-in slide-in-from-bottom-2">
            
            <div className="text-[11px] font-bold text-slate-500 flex items-center justify-between">
              <span>Quick Interactive Triggers</span>
              <span className="text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                Mode: {currentRole === 'learner' ? '🎓 Learner' : '👨‍🏫 Mentor'}
              </span>
            </div>

            {/* SkillConnect Simulation Actions */}
            <div className="space-y-1.5 text-xs">
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={onSimulateBookSession}
                  className="p-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 text-left font-bold flex items-center gap-2 transition-all cursor-pointer text-[11px]"
                >
                  <Calendar className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>Book Mentor Call</span>
                </button>

                <button
                  type="button"
                  onClick={onSimulateCompleteLesson}
                  className="p-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 text-left font-bold flex items-center gap-2 transition-all cursor-pointer text-[11px]"
                >
                  <BookOpen className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>Complete Module</span>
                </button>

                <button
                  type="button"
                  onClick={onSimulateSubmitChecklist}
                  className="p-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 text-left font-bold flex items-center gap-2 transition-all cursor-pointer text-[11px]"
                >
                  <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>Submit Checklist</span>
                </button>

                <button
                  type="button"
                  onClick={onSimulatePassAssessment}
                  className="p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-left font-bold flex items-center gap-2 transition-all cursor-pointer text-[11px]"
                >
                  <Award className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Issue Certificate</span>
                </button>

                <button
                  type="button"
                  onClick={onSimulateUnlockJob}
                  className="p-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 text-left font-bold flex items-center gap-2 transition-all cursor-pointer text-[11px] col-span-2"
                >
                  <Briefcase className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                  <span>Unlock Level 4 High Payout Jobs (+80%)</span>
                </button>
              </div>
            </div>

            {/* Reset All Data Button */}
            <div className="pt-2 border-t border-slate-200">
              <button
                type="button"
                onClick={onResetDemoData}
                className="w-full p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-center font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                <span>Reset SkillConnect Data</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
