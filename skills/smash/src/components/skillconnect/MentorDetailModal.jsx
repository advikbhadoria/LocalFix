import React from 'react';
import { 
  X, 
  ShieldCheck, 
  Star, 
  Calendar, 
  Clock, 
  MapPin, 
  Globe, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  MessageSquare,
  Sparkles,
  Zap,
  ArrowRight
} from 'lucide-react';

export default function MentorDetailModal({
  mentor,
  onClose,
  onOpenBooking
}) {
  if (!mentor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header Hero */}
        <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white border-b border-blue-700">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="relative">
              <img
                src={mentor.avatar}
                alt={mentor.name}
                className="w-20 h-20 rounded-3xl object-cover ring-4 ring-white/30 shadow-xl"
              />
              {mentor.verified && (
                <div className="absolute -bottom-1 -right-1 p-1 bg-emerald-500 text-white rounded-full ring-2 ring-white" title="Verified Master Mentor">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-black text-white">{mentor.name}</h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/20 text-white border border-white/30">
                  {mentor.category} Master
                </span>
                {mentor.isSponsored && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-400 text-slate-900 font-extrabold shadow-xs">
                    Grant Sponsored
                  </span>
                )}
              </div>
              <p className="text-xs text-blue-100 mt-1">{mentor.title}</p>
              
              <div className="flex items-center gap-3 mt-2 text-xs flex-wrap">
                <span className="flex items-center gap-1 text-amber-300 font-bold">
                  <Star className="w-4 h-4 fill-amber-300" />
                  {mentor.rating} ({mentor.reviewsCount} reviews)
                </span>
                <span className="text-blue-200">•</span>
                <span className="text-blue-100 font-medium">{mentor.experience} Industry Experience</span>
                <span className="text-blue-200">•</span>
                <span className="text-emerald-300 font-bold">{mentor.sessionPrice}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6 text-xs bg-white">
          
          {/* Biography */}
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              About the Mentor
            </h3>
            <p className="text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
              {mentor.bio}
            </p>
          </div>

          {/* Languages & Formats Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-1.5">
              <span className="text-[10px] font-bold text-blue-800 uppercase flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-blue-600" /> Languages Spoken:
              </span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {mentor.languages.map((lang, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded-md bg-white border border-blue-200 text-slate-700 text-[11px] font-semibold">
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-1.5">
              <span className="text-[10px] font-bold text-blue-800 uppercase flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-blue-600" /> Training Location / Mode:
              </span>
              <p className="text-slate-800 font-semibold text-[11px]">{mentor.location}</p>
            </div>
          </div>

          {/* Skills & Practical Competencies Taught */}
          <div>
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-blue-600" /> Practical Skills Taught & Assessed:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {mentor.skillsTaught.map((sk, idx) => (
                <div 
                  key={idx}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="text-slate-800 font-medium">{sk}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Availability Preview */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-500" /> Upcoming Available Time Slots:
              </span>
              <span className="text-blue-700 text-[11px] font-bold">Next: {mentor.nextAvailableSlot}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {mentor.availableSlots.map((slot, i) => (
                <div key={i} className="px-3 py-2 rounded-lg bg-white text-slate-800 text-[11px] font-mono flex items-center gap-2 border border-slate-200 shadow-xs">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  <span>{slot}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Learner Reviews */}
          {mentor.reviews && mentor.reviews.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-amber-500" /> Verified Learner Feedback:
              </h3>
              <div className="space-y-2.5">
                {mentor.reviews.map((rev) => (
                  <div key={rev.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-slate-900">{rev.learnerName}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-amber-500 font-bold">★ {rev.rating}.0</span>
                        <span className="text-slate-400">{rev.date}</span>
                      </div>
                    </div>
                    <p className="text-slate-600 text-[11px] italic">"{rev.comment}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-bold">Session Fee:</span>
            <div className="text-sm font-black text-emerald-700">{mentor.sessionPrice}</div>
          </div>

          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenBooking(mentor);
            }}
            className="px-6 py-3 rounded-2xl text-xs font-black bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Book Training Session</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
