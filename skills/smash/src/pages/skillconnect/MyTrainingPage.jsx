import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Video, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw, 
  XCircle, 
  ChevronLeft, 
  ChevronRight, 
  Plus,
  Sparkles,
  CalendarDays,
  ListFilter
} from 'lucide-react';

export default function MyTrainingPage({
  sessions,
  onOpenBooking,
  onOpenClassroom,
  onRescheduleSession,
  onCancelSession
}) {
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' | 'pending' | 'completed' | 'cancelled'
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'calendar'
  const [selectedMonth, setSelectedMonth] = useState('October 2026');

  const filteredSessions = sessions.filter((s) => {
    if (activeTab === 'upcoming') return s.status === 'upcoming';
    if (activeTab === 'pending') return s.status === 'pending';
    if (activeTab === 'completed') return s.status === 'completed';
    if (activeTab === 'cancelled') return s.status === 'cancelled';
    return true;
  });

  const handleCancelClick = (sessionId) => {
    if (confirm('Are you sure you want to cancel this training session?')) {
      if (onCancelSession) onCancelSession(sessionId);
    }
  };

  const handleRescheduleClick = (session) => {
    if (onRescheduleSession) onRescheduleSession(session);
    else alert(`Reschedule workflow initiated for session ${session.bookingRef}. Mentor calendar opened.`);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display flex items-center gap-2">
            <span>My Training Sessions & Schedule</span>
            <span className="text-blue-600 text-lg">📅</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage your booked 1-on-1 practical labs, online workshops, and assessment slots.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-2">
          <div className="bg-white p-1 rounded-2xl border border-slate-200 flex items-center gap-1 shadow-xs">
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'list' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <ListFilter className="w-3.5 h-3.5" />
              <span>List View</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'calendar' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <CalendarDays className="w-3.5 h-3.5" />
              <span>Calendar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1">
        {[
          { id: 'upcoming', label: 'Upcoming', count: sessions.filter(s => s.status === 'upcoming').length },
          { id: 'pending', label: 'Pending Confirmation', count: sessions.filter(s => s.status === 'pending').length },
          { id: 'completed', label: 'Completed', count: sessions.filter(s => s.status === 'completed').length },
          { id: 'cancelled', label: 'Cancelled', count: sessions.filter(s => s.status === 'cancelled').length }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count > 0 && (
              <span className={`px-2 py-0.2 rounded-full text-[10px] font-black ${
                activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* LIST VIEW */}
      {viewMode === 'list' && (
        <div className="space-y-4">
          {filteredSessions.length > 0 ? (
            filteredSessions.map((session) => (
              <div
                key={session.id}
                className="p-6 rounded-3xl bg-white border border-blue-100 hover:border-blue-300 transition-all shadow-sm space-y-4"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-4">
                    <img
                      src={session.mentorAvatar}
                      alt={session.mentorName}
                      className="w-14 h-14 rounded-2xl object-cover ring-2 ring-blue-500/30 flex-shrink-0 shadow-xs"
                    />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-bold text-slate-900">{session.topic}</h3>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 font-mono">
                          {session.bookingRef || session.id}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Mentor: <strong>{session.mentorName}</strong>
                      </p>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center gap-2">
                    {session.status === 'upcoming' && (
                      <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-600" /> Upcoming ({session.countdownHours || 24}h left)
                      </span>
                    )}
                    {session.status === 'completed' && (
                      <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Completed
                      </span>
                    )}
                  </div>
                </div>

                {/* Session Details Matrix */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="space-y-1">
                    <span className="text-slate-400 text-[10px] uppercase font-bold flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-blue-600" /> Date & Time:
                    </span>
                    <p className="font-bold text-slate-900">{session.date} • {session.time}</p>
                    <span className="text-[11px] text-slate-500">Duration: {session.duration}</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-400 text-[10px] uppercase font-bold flex items-center gap-1">
                      {session.isOnline ? <Video className="w-3.5 h-3.5 text-teal-600" /> : <MapPin className="w-3.5 h-3.5 text-teal-600" />}
                      Training Mode:
                    </span>
                    <p className="font-bold text-teal-700">{session.format}</p>
                    <p className="text-[11px] text-slate-500 truncate max-w-xs">{session.location}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-400 text-[10px] uppercase font-bold">Preparation & Notes:</span>
                    <p className="text-[11px] text-slate-600 leading-snug">
                      {session.notes || "Bring safety footwear and calibrated multimeter to session."}
                    </p>
                  </div>
                </div>

                {/* Bottom Action Row */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between flex-wrap gap-3">
                  <span className="text-xs text-emerald-700 font-bold">
                    Free
                  </span>

                  <div className="flex items-center gap-2">
                    {session.status === 'upcoming' && (
                      <>
                        <button
                          type="button"
                          onClick={() => handleCancelClick(session.id)}
                          className="px-3 py-1.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>

                        <button
                          type="button"
                          onClick={() => handleRescheduleClick(session)}
                          className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
                        >
                          Reschedule
                        </button>

                        {session.isOnline ? (
                          <button
                            type="button"
                            onClick={() => onOpenClassroom && onOpenClassroom(session)}
                            className="px-4 py-2 rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <Video className="w-4 h-4" />
                            <span>Join Video Room</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => alert(`Directions to Swargate Hub: 14/B Practical Lab, Sector 4 Hub, Pune (Map Navigation Started)`)}
                            className="px-4 py-2 rounded-xl text-xs font-black bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <MapPin className="w-4 h-4" />
                            <span>Get Directions</span>
                          </button>
                        )}
                      </>
                    )}

                    {session.status === 'completed' && session.feedbackGiven && (
                      <div className="text-[11px] text-slate-500 italic">
                        Feedback submitted ✓
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 rounded-3xl bg-white border border-slate-200 text-center space-y-3">
              <Calendar className="w-12 h-12 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-900">No sessions found under {activeTab}</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Ready to practice a new competency? Browse master mentors and book your next hands-on session.
              </p>
            </div>
          )}
        </div>
      )}

      {/* CALENDAR VIEW */}
      {viewMode === 'calendar' && (
        <div className="p-6 rounded-3xl bg-white border border-blue-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              {selectedMonth}
            </h3>
            <div className="flex items-center gap-2">
              <button type="button" className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:text-slate-900 cursor-pointer">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button type="button" className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:text-slate-900 cursor-pointer">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2 text-center text-xs">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
              <div key={day} className="font-bold text-slate-500 py-1 uppercase text-[10px]">
                {day}
              </div>
            ))}
            
            {Array.from({ length: 31 }).map((_, i) => {
              const dayNum = i + 1;
              const hasUpcoming = dayNum === 4 || dayNum === 6;
              const hasCompleted = dayNum === 28;

              return (
                <div
                  key={i}
                  className={`min-h-[70px] p-2 rounded-2xl border text-left flex flex-col justify-between transition-colors ${
                    hasUpcoming
                      ? 'bg-blue-50 border-blue-300 text-blue-900'
                      : hasCompleted
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                        : 'bg-slate-50/70 border-slate-100 text-slate-600'
                  }`}
                >
                  <span className="font-bold text-xs">{dayNum}</span>
                  {hasUpcoming && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-blue-600 text-white truncate shadow-xs">
                      {dayNum === 4 ? '10:30A • 3-Phase DB' : '02:00P • AC PCB'}
                    </span>
                  )}
                  {hasCompleted && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-600 text-white truncate shadow-xs">
                      Completed ✓
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
