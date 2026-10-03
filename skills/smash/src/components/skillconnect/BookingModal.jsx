import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  User, 
  MapPin, 
  Video, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  Info,
  CalendarCheck,
  Zap,
  Users
} from 'lucide-react';

export default function BookingModal({
  mentor,
  initialCourse = null,
  allCourses = [],
  onClose,
  onBookingConfirmed
}) {
  const [step, setStep] = useState(1);
  const [selectedCourse, setSelectedCourse] = useState(
    initialCourse || (allCourses.find(c => c.mentorId === mentor.id) || allCourses[0])
  );
  const [sessionType, setSessionType] = useState('one_on_one'); // 'one_on_one' | 'small_group'
  const [sessionFormat, setSessionFormat] = useState(
    mentor.formats.some(f => f.toLowerCase().includes('in-person')) ? 'in_person' : 'online'
  );
  const [selectedDate, setSelectedDate] = useState('2026-10-04'); // Tomorrow
  const [selectedSlot, setSelectedSlot] = useState(mentor.availableSlots[0] || '10:30 AM - 11:30 AM');
  const [learnerGoal, setLearnerGoal] = useState('Want hands-on guidance with 3-phase load balancing & practical busbar checklist verification.');
  const [agreePolicies, setAgreePolicies] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const datesList = [
    { dateStr: '2026-10-04', dayName: 'Tomorrow', dateDisplay: 'Sun, Oct 4', slotsCount: 2 },
    { dateStr: '2026-10-05', dayName: 'Monday', dateDisplay: 'Mon, Oct 5', slotsCount: 3 },
    { dateStr: '2026-10-06', dayName: 'Tuesday', dateDisplay: 'Tue, Oct 6', slotsCount: 2 },
    { dateStr: '2026-10-08', dayName: 'Thursday', dateDisplay: 'Thu, Oct 8', slotsCount: 4 }
  ];

  const handleConfirm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const newBooking = {
        id: `TRN-BK-${Math.floor(5000 + Math.random() * 4000)}`,
        mentorId: mentor.id,
        mentorName: mentor.name,
        mentorAvatar: mentor.avatar,
        courseId: selectedCourse?.id || 'CRS-101',
        topic: selectedCourse?.title || `${mentor.skillsTaught[0]} Hands-on Session`,
        date: selectedDate === '2026-10-04' ? 'Tomorrow, Oct 4, 2026' : selectedDate,
        rawDate: selectedDate,
        time: selectedSlot.includes('•') ? selectedSlot.split('•')[1].trim() : selectedSlot,
        duration: '60 mins',
        format: sessionFormat === 'in_person' ? 'In-Person' : 'Online Video Room',
        location: sessionFormat === 'in_person' ? mentor.location : 'Live Virtual Classroom',
        status: 'upcoming',
        countdownHours: 22,
        isOnline: sessionFormat === 'online',
        meetingLink: sessionFormat === 'online' ? `https://meet.pockethelp.in/room/mentor-${mentor.id.toLowerCase()}` : null,
        bookingRef: `TRN-BK-${Math.floor(5000 + Math.random() * 4000)}`,
        price: mentor.sessionPrice || 'Free (Grant Sponsored)',
        learnerGoal: learnerGoal
      };

      setConfirmedBooking(newBooking);
      setIsSubmitting(false);
      setStep(4); // Confirmation step
      if (onBookingConfirmed) {
        onBookingConfirmed(newBooking);
      }
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900 tracking-tight">
                {step === 4 ? 'Session Confirmed!' : 'Book 1-on-1 Mentorship Session'}
              </h2>
              <p className="text-xs text-slate-500">
                {step === 4 ? 'Added to your training schedule' : `With ${mentor.name} • ${mentor.category}`}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-step progress indicator */}
        {step < 4 && (
          <div className="px-6 pt-3 pb-2 bg-slate-50/50 border-b border-slate-200">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 mb-2">
              <span className={step >= 1 ? 'text-blue-600' : ''}>1. Skill & Format</span>
              <span className={step >= 2 ? 'text-blue-600' : ''}>2. Date & Time</span>
              <span className={step >= 3 ? 'text-blue-600' : ''}>3. Review & Confirm</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 transition-all duration-300 rounded-full"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">

          {/* STEP 1: Skill & Format */}
          {step === 1 && (
            <div className="space-y-5">
              {/* Mentor Summary Card */}
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-center gap-4">
                <img
                  src={mentor.avatar}
                  alt={mentor.name}
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-blue-500/20"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900">{mentor.name}</h3>
                    {mentor.verified && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" /> Verified Mentor
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">{mentor.title}</p>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                    <span className="text-amber-500 font-bold">★ {mentor.rating}</span>
                    <span>•</span>
                    <span>{mentor.experience} Exp</span>
                    <span>•</span>
                    <span className="text-blue-700 font-semibold">{mentor.sessionPrice}</span>
                  </div>
                </div>
              </div>

              {/* Select Skill or Course */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">
                  Select Topic / Skill to Learn:
                </label>
                <div className="space-y-2">
                  {mentor.skillsTaught.map((skillName, idx) => (
                    <label
                      key={idx}
                      className={`flex items-center gap-3 p-3.5 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                        selectedCourse?.title === skillName || idx === 0
                          ? 'bg-blue-50 border-blue-500 text-blue-900 shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                      onClick={() => setSelectedCourse({ id: `CRS-${idx + 101}`, title: skillName })}
                    >
                      <input
                        type="radio"
                        name="topic"
                        checked={selectedCourse?.title === skillName || (!selectedCourse && idx === 0)}
                        onChange={() => setSelectedCourse({ id: `CRS-${idx + 101}`, title: skillName })}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="flex-1">{skillName}</span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] bg-slate-100 text-slate-600 border border-slate-200">
                        60 mins
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Session Type & Format */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">Training Format:</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSessionFormat('in_person')}
                      className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                        sessionFormat === 'in_person'
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <MapPin className="w-4 h-4" />
                      <span>In-Person Hub</span>
                      <span className="text-[10px] opacity-80">Pune Practical Lab</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSessionFormat('online')}
                      className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                        sessionFormat === 'online'
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <Video className="w-4 h-4" />
                      <span>Online Video</span>
                      <span className="text-[10px] opacity-80">Live 1-on-1 HD</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">Group Size:</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSessionType('one_on_one')}
                      className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                        sessionType === 'one_on_one'
                          ? 'bg-blue-700 text-white border-blue-700 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <User className="w-4 h-4" />
                      <span>1-on-1 Private</span>
                      <span className="text-[10px] opacity-80">Personalized</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSessionType('small_group')}
                      className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                        sessionType === 'small_group'
                          ? 'bg-blue-700 text-white border-blue-700 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <Users className="w-4 h-4" />
                      <span>Small Group</span>
                      <span className="text-[10px] opacity-80">Max 3 Peers</span>
                    </button>
                  </div>
                </div>
              </div>

              {sessionFormat === 'in_person' && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900">Hub Location:</span> {mentor.location}
                    <p className="text-[11px] text-slate-500 mt-0.5">Test rigs, calibrated instruments and safety gear provided on site.</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: Date & Time Picker */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">
                  1. Choose Date:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {datesList.map((d) => (
                    <button
                      key={d.dateStr}
                      type="button"
                      onClick={() => setSelectedDate(d.dateStr)}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        selectedDate === d.dateStr
                          ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="text-[10px] font-bold uppercase opacity-80">{d.dayName}</div>
                      <div className="text-xs font-black mt-0.5">{d.dateDisplay}</div>
                      <div className="text-[10px] opacity-75 mt-1">{d.slotsCount} slots available</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider flex items-center justify-between">
                  <span>2. Select Time Slot:</span>
                  <span className="text-[11px] text-blue-600 font-semibold">IST (UTC +5:30)</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {mentor.availableSlots.map((slot, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-3.5 rounded-xl border text-left flex items-center justify-between text-xs font-bold transition-all cursor-pointer ${
                        selectedSlot === slot
                          ? 'bg-blue-50 border-blue-500 text-blue-900 shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Clock className={`w-4 h-4 ${selectedSlot === slot ? 'text-blue-600' : 'text-slate-400'}`} />
                        <span>{slot}</span>
                      </div>
                      {selectedSlot === slot && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  What specific skill or practical doubt do you want to focus on? (Optional)
                </label>
                <textarea
                  rows={2}
                  value={learnerGoal}
                  onChange={(e) => setLearnerGoal(e.target.value)}
                  placeholder="e.g. Practicing clamp meter neutral balancing, understanding capacitor codes..."
                  className="w-full p-3 bg-slate-50 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 border border-slate-200 focus:border-blue-500 focus:bg-white outline-hidden"
                />
              </div>
            </div>
          )}

          {/* STEP 3: Review & Policies */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-3">
                <div className="flex items-center justify-between border-b border-blue-200/70 pb-3">
                  <div>
                    <span className="text-[10px] text-blue-600 font-bold uppercase">Training Topic</span>
                    <h3 className="text-sm font-bold text-slate-900 mt-0.5">{selectedCourse?.title}</h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    {mentor.sessionPrice}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 text-[10px]">Mentor:</span>
                    <p className="font-bold text-slate-900">{mentor.name}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px]">Date & Time:</span>
                    <p className="font-bold text-slate-900">Tomorrow • 10:30 AM</p>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px]">Format:</span>
                    <p className="font-bold text-slate-900">{sessionFormat === 'in_person' ? 'In-Person Lab' : 'Online Video'}</p>
                  </div>
                </div>

                {sessionFormat === 'in_person' && (
                  <div className="pt-2 border-t border-blue-200/70 text-xs text-slate-700 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    <span>{mentor.location}</span>
                  </div>
                )}
              </div>

              {/* Learning Goals Note */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <span className="text-[10px] text-slate-500 uppercase font-bold">Learner Objective:</span>
                <p className="text-slate-700 mt-1 italic">"{learnerGoal}"</p>
              </div>

              {/* Policies & Safety Agreement */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                <div className="flex items-start gap-2 text-xs text-slate-600">
                  <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-[11px] text-slate-600">
                    <strong>Rescheduling Policy:</strong> Free rescheduling or cancellation up to 2 hours before session start time.
                  </p>
                </div>

                <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer pt-2 border-t border-slate-200">
                  <input
                    type="checkbox"
                    checked={agreePolicies}
                    onChange={(e) => setAgreePolicies(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                  />
                  <span>I agree to attend punctually and follow practical workshop safety guidelines.</span>
                </label>
              </div>
            </div>
          )}

          {/* STEP 4: Success Confirmation */}
          {step === 4 && confirmedBooking && (
            <div className="text-center py-4 space-y-4 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="px-3 py-1 rounded-full text-xs font-black bg-blue-100 text-blue-700 border border-blue-200">
                  REF: {confirmedBooking.bookingRef}
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-2">
                  Training Session Confirmed!
                </h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto mt-1">
                  We've notified <strong>{mentor.name}</strong>. A calendar invite and reminder SMS have been scheduled.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left max-w-md mx-auto space-y-2 text-xs">
                <div className="flex justify-between text-slate-700">
                  <span className="text-slate-500">Date & Time:</span>
                  <span className="font-bold text-slate-900">{confirmedBooking.date} • {confirmedBooking.time}</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span className="text-slate-500">Format:</span>
                  <span className="font-bold text-blue-600">{confirmedBooking.format}</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span className="text-slate-500">Location:</span>
                  <span className="font-semibold text-slate-800 truncate max-w-[200px]">{confirmedBooking.location}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all cursor-pointer"
                >
                  View in My Training
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        {step < 4 && (
          <div className="px-6 py-4 border-t border-slate-200 bg-slate-50/80 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Cancel
              </button>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-5 py-2.5 rounded-xl text-xs font-black bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                disabled={!agreePolicies || isSubmitting}
                onClick={handleConfirm}
                className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
                  agreePolicies && !isSubmitting
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/25'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    <span>Confirming Booking...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm Booking</span>
                    <Sparkles className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
