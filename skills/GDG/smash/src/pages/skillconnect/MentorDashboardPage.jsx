import React, { useState } from 'react';
import { 
  GraduationCap, 
  Users, 
  Calendar, 
  Clock, 
  Award, 
  Star, 
  CheckCircle2, 
  Sparkles, 
  Plus, 
  MessageSquare, 
  Send, 
  ShieldCheck, 
  ChevronRight,
  TrendingUp,
  FileCheck,
  Zap,
  Target
} from 'lucide-react';
import { MOCK_MENTOR_LEARNERS_ROSTER } from '../../data/skillConnectData';

export default function MentorDashboardPage({
  skillConnectProfile,
  onSelectPage,
  onOpenAssessment
}) {
  const [learners, setLearners] = useState(MOCK_MENTOR_LEARNERS_ROSTER);
  const [activeTab, setActiveTab] = useState('mentees'); // 'mentees' | 'schedule' | 'content_builder' | 'feedback'
  const [feedbackLearner, setFeedbackLearner] = useState(learners[0]);
  const [feedbackText, setFeedbackText] = useState("Akash demonstrated good safety discipline on the live busbar panel today. Recommended next step is to practice neutral harmonic current calculations with True RMS meter.");
  const [feedbackSent, setFeedbackSent] = useState(false);

  // Training content creator state
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newSafetyWarning, setNewSafetyWarning] = useState('');
  const [contentCreatedToast, setContentCreatedToast] = useState(false);

  const handleSendFeedback = (e) => {
    e.preventDefault();
    setFeedbackSent(true);
    setTimeout(() => setFeedbackSent(false), 3000);
  };

  const handleCreateModule = (e) => {
    e.preventDefault();
    if (!newCourseTitle.trim()) return;
    setContentCreatedToast(true);
    setTimeout(() => {
      setContentCreatedToast(false);
      setNewCourseTitle('');
      setNewSafetyWarning('');
    }, 2500);
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      
      {/* Header Banner - Royal Blue & White */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 border border-blue-600 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-white">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-white/15 text-white flex items-center justify-center border border-white/30 flex-shrink-0 backdrop-blur-xs">
            <GraduationCap className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-black text-white">
                Master Mentor Command Desk
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/20 text-white border border-white/30 backdrop-blur-xs">
                Sector 4 Accreditation Hub
              </span>
            </div>
            <p className="text-xs text-blue-100 mt-0.5">
              Welcome, Master Trainer <strong>{skillConnectProfile.name}</strong> • Supervising {learners.length} Active Mentees
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onSelectPage('skillconnect_dashboard')}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-white hover:bg-blue-50 text-blue-900 shadow-md transition-colors cursor-pointer"
          >
            Switch to Learner View
          </button>
        </div>
      </div>

      {/* Mentor Statistics Matrix - Crisp White */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-3xl bg-white border border-blue-100 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <Users className="w-5 h-5 text-blue-600" />
            <span className="text-[10px] font-bold text-blue-600 uppercase">Roster</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">{learners.length}</div>
          <p className="text-xs text-slate-500 font-bold">Active Mentees Supervised</p>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-blue-100 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <Clock className="w-5 h-5 text-teal-600" />
            <span className="text-[10px] font-bold text-teal-600 uppercase">Taught</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">{skillConnectProfile.totalTrainingHours}h</div>
          <p className="text-xs text-slate-500 font-bold">Training Hours Delivered</p>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-blue-100 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <Award className="w-5 h-5 text-amber-600" />
            <span className="text-[10px] font-bold text-amber-600 uppercase">Grants</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">₹{skillConnectProfile.teachingCredits.toLocaleString()}</div>
          <p className="text-xs text-slate-500 font-bold">Teaching Grants Earned</p>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-blue-100 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <Star className="w-5 h-5 text-blue-600 fill-blue-600" />
            <span className="text-[10px] font-bold text-blue-600 uppercase">Reputation</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">{skillConnectProfile.mentorRating} ★</div>
          <p className="text-xs text-slate-500 font-bold">{skillConnectProfile.mentorReviewsCount} Mentee Reviews</p>
        </div>

      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        {[
          { id: 'mentees', label: `Enrolled Mentees (${learners.length})` },
          { id: 'schedule', label: 'Availability & Slots Manager' },
          { id: 'content_builder', label: 'Create Training Content & Checklists' },
          { id: 'feedback', label: 'Send Structured Feedback' }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: Mentees Roster */}
      {activeTab === 'mentees' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {learners.map((learner) => (
              <div
                key={learner.id}
                className="p-5 rounded-3xl bg-white border border-blue-100 hover:border-blue-300 transition-all shadow-sm hover:shadow-md flex flex-col justify-between space-y-4"
              >
                <div className="flex items-start gap-3.5">
                  <img
                    src={learner.avatar}
                    alt={learner.name}
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-blue-500/20 shadow-xs"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-bold text-slate-900 truncate">{learner.name}</h3>
                    <p className="text-[11px] text-blue-700 font-semibold truncate">{learner.skillLearning}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-md text-[10px] bg-slate-100 text-slate-700 font-mono">
                      {learner.currentStage}
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-500">Progression:</span>
                    <span className="text-teal-700 font-bold">{learner.progressPercent}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-600 to-teal-500 rounded-full"
                      style={{ width: `${learner.progressPercent}%` }}
                    />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600 space-y-1">
                  <div className="text-slate-500 font-bold uppercase text-[10px]">Latest Activity:</div>
                  <p className="italic line-clamp-2">"{learner.lastActivity}"</p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setFeedbackLearner(learner);
                      setActiveTab('feedback');
                    }}
                    className="flex-1 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                  >
                    Feedback
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectPage('skill_assessment')}
                    className="flex-1 py-2 rounded-xl text-xs font-black bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all cursor-pointer"
                  >
                    Assess
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: Availability & Slots Manager */}
      {activeTab === 'schedule' && (
        <div className="p-6 rounded-3xl bg-white border border-blue-100 shadow-sm space-y-6 text-xs">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Weekly Training Hours & Slots</h3>
              <p className="text-slate-500 text-[11px]">Set the hours when you are free to accept mentorship lab bookings.</p>
            </div>
            <button
              type="button"
              onClick={() => alert('New training slot added to your public calendar!')}
              className="px-4 py-2 rounded-xl text-xs font-black bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" /> Add Slot
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { day: 'Monday', time: '10:00 AM - 12:30 PM', type: 'In-Person (Swargate Lab)', booked: true },
              { day: 'Wednesday', time: '04:00 PM - 06:30 PM', type: 'Online 1-on-1 HD', booked: true },
              { day: 'Friday', time: '11:00 AM - 01:00 PM', type: 'In-Person (Swargate Lab)', booked: false },
              { day: 'Saturday', time: '09:30 AM - 11:30 AM', type: 'Group Workshop (Max 4)', booked: false }
            ].map((slot, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-bold text-slate-900 text-xs">{slot.day} • {slot.time}</div>
                  <div className="text-[11px] text-slate-500">{slot.type}</div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                  slot.booked ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}>
                  {slot.booked ? 'Booked (Akash)' : 'Open Slot'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Content Builder */}
      {activeTab === 'content_builder' && (
        <form onSubmit={handleCreateModule} className="p-6 rounded-3xl bg-white border border-blue-100 shadow-sm space-y-4 text-xs">
          <div>
            <h3 className="text-base font-bold text-slate-900">Create New Practical Training Module</h3>
            <p className="text-slate-500 text-[11px]">Publish interactive checklists and safety warnings for your learners.</p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-slate-600 font-bold mb-1">Module Title:</label>
              <input
                type="text"
                value={newCourseTitle}
                onChange={(e) => setNewCourseTitle(e.target.value)}
                placeholder="e.g. 3-Phase Busbar Torque & Thermal Cam Diagnostics..."
                className="w-full p-2.5 bg-slate-50 rounded-xl text-slate-900 border border-slate-200 outline-hidden font-bold"
              />
            </div>

            <div>
              <label className="block text-slate-600 font-bold mb-1">Mandatory Safety Warning (LOTO):</label>
              <textarea
                rows={2}
                value={newSafetyWarning}
                onChange={(e) => setNewSafetyWarning(e.target.value)}
                placeholder="e.g. Disconnect main 415V LT isolator and prove dead with two-pole tester..."
                className="w-full p-2.5 bg-slate-50 rounded-xl text-slate-900 border border-slate-200 outline-hidden"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-xs font-black bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all cursor-pointer flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Publish Module to SkillConnect
            </button>

            {contentCreatedToast && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 font-bold text-center">
                ✓ Training module published to demo local state!
              </div>
            )}
          </div>
        </form>
      )}

      {/* TAB 4: Structured Feedback */}
      {activeTab === 'feedback' && (
        <form onSubmit={handleSendFeedback} className="p-6 rounded-3xl bg-white border border-blue-100 shadow-sm space-y-4 text-xs">
          <div>
            <h3 className="text-base font-bold text-slate-900">Share Qualitative Feedback with Mentee</h3>
            <p className="text-slate-500 text-[11px]">Structured feedback helps workers improve before taking final rubric tests.</p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-slate-600 font-bold mb-1">Select Mentee:</label>
              <select
                value={feedbackLearner?.name}
                onChange={(e) => setFeedbackLearner(learners.find(l => l.name === e.target.value) || learners[0])}
                className="w-full p-2.5 bg-slate-50 rounded-xl text-slate-900 border border-slate-200 outline-hidden font-bold"
              >
                {learners.map((l) => (
                  <option key={l.id} value={l.name}>{l.name} • {l.skillLearning}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-600 font-bold mb-1">Observations & Next Milestone:</label>
              <textarea
                rows={4}
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                className="w-full p-3 bg-slate-50 rounded-xl text-slate-900 border border-slate-200 outline-hidden leading-relaxed"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-xs font-black bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all cursor-pointer flex items-center gap-2"
            >
              <Send className="w-4 h-4" /> Send Feedback to Mentee
            </button>

            {feedbackSent && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 font-bold text-center">
                ✓ Feedback delivered to {feedbackLearner?.name}'s timeline!
              </div>
            )}
          </div>
        </form>
      )}

    </div>
  );
}
