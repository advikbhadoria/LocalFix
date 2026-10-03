import React, { useState } from 'react';
import { 
  CheckCircle2, 
  MapPin, 
  Clock, 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  AlertCircle, 
  X, 
  Lock, 
  Navigation, 
  ArrowRight,
  Zap,
  Info,
  DollarSign,
  Flame,
  Check,
  Share2
} from 'lucide-react';
import InteractiveMap from './InteractiveMap';

export default function JobDetailModal({
  job,
  onClose,
  onUpdateJobStatus,
  onOpenChat,
  onOpenCall
}) {
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [isVerifyingPin, setIsVerifyingPin] = useState(false);

  if (!job) return null;

  const STAGES = [
    { key: 'accepted', label: 'Accepted', desc: 'Job confirmed by technician' },
    { key: 'travelling', label: 'Travelling', desc: 'En route to customer address' },
    { key: 'arrived', label: 'Arrived', desc: 'Reached customer doorstep' },
    { key: 'in_progress', label: 'In Progress', desc: 'Service execution & testing' },
    { key: 'completed', label: 'Completed', desc: 'PIN verified & payment settled' }
  ];

  const currentStageIndex = job.stageIndex !== undefined ? job.stageIndex : (
    job.status === 'accepted' ? 0 :
    job.status === 'travelling' ? 1 :
    job.status === 'arrived' ? 2 :
    job.status === 'in_progress' ? 3 :
    job.status === 'completed' ? 4 : 0
  );

  const handleAdvanceNextStage = () => {
    if (currentStageIndex === 0) {
      onUpdateJobStatus(job.id, 'travelling', 1, 'Travelling (ETA: 8 mins)');
    } else if (currentStageIndex === 1) {
      onUpdateJobStatus(job.id, 'arrived', 2, 'Arrived at Customer Location');
    } else if (currentStageIndex === 2) {
      onUpdateJobStatus(job.id, 'in_progress', 3, 'Work In Progress');
    }
  };

  const handleVerifyCompletionPin = (e) => {
    e.preventDefault();
    if (!pinInput.trim()) {
      setPinError('Please ask customer for the 4-digit completion PIN.');
      return;
    }

    if (pinInput.trim() !== job.pin) {
      setPinError(`Invalid PIN! Hint for demo test: ${job.pin}`);
      return;
    }

    setPinError('');
    setIsVerifyingPin(true);

    setTimeout(() => {
      setIsVerifyingPin(false);
      onUpdateJobStatus(job.id, 'completed', 4, 'Job Completed & Escrow Paid');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-white text-slate-900 rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xl overflow-hidden animate-in zoom-in-95 max-h-[92vh] flex flex-col">
        
        {/* Header with Title & Close */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                #{job.id}
              </span>
              <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                {job.category}
              </span>
              {job.urgency === 'Emergency' && (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                  <Flame className="w-3.5 h-3.5 text-rose-500" /> Rapid Dispatch
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-2 font-display">
              {job.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto space-y-6 pr-1 custom-scrollbar">

          {/* 5-Step Visual Lifecycle Tracker */}
          <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
              Real-Time Job Lifecycle Tracker
            </h3>

            <div className="relative flex items-center justify-between">
              {/* Progress Line */}
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-slate-200 z-0"></div>
              <div 
                className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-600 transition-all duration-500 z-0"
                style={{ width: `${(currentStageIndex / (STAGES.length - 1)) * 100}%` }}
              ></div>

              {STAGES.map((stage, idx) => {
                const isPassed = idx < currentStageIndex;
                const isCurrent = idx === currentStageIndex;
                return (
                  <div key={stage.key} className="relative z-10 flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                      isPassed 
                        ? 'bg-blue-600 text-white shadow-xs' 
                        : isCurrent 
                          ? 'bg-blue-600 text-white shadow-md ring-4 ring-blue-100 animate-pulse' 
                          : 'bg-white border-2 border-slate-300 text-slate-400'
                    }`}>
                      {isPassed ? <Check className="w-4 h-4 stroke-[3]" /> : idx + 1}
                    </div>
                    <span className={`text-[10px] font-bold mt-1.5 hidden sm:block whitespace-nowrap ${
                      isCurrent ? 'text-blue-700 font-extrabold' : isPassed ? 'text-blue-600' : 'text-slate-400'
                    }`}>
                      {stage.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Customer & Direct Action Card */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={job.customer.avatar}
                alt={job.customer.name}
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-blue-500/20"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-slate-900">{job.customer.name}</h4>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Verified Customer
                  </span>
                </div>
                <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                  <span>{job.customer.address}</span>
                </p>
              </div>
            </div>

            {/* Masked Call & In-App Chat Buttons */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenChat(job.customer.name, job.title);
                }}
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-blue-600" />
                Chat Customer
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenCall(job.customer.name, job.customer.phone, job.title);
                }}
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                Masked Call
              </button>
            </div>
          </div>

          {/* Interactive Route Map */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-blue-600" />
                Turn-by-Turn Map & Navigation
              </span>
              <span className="text-[11px] text-slate-500">Distance: {job.distance}</span>
            </div>
            <InteractiveMap
              destLat={job.lat || 18.5620}
              destLng={job.lng || 73.7990}
              destTitle={job.customer.address}
              height="200px"
              showRoute={true}
            />
          </div>

          {/* Scope & Customer Notes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
              <span className="font-bold text-slate-500 uppercase tracking-wider block">Scope of Work</span>
              <p className="text-slate-800 leading-relaxed">{job.scope || job.description}</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
              <span className="font-bold text-slate-500 uppercase tracking-wider block">Customer Entry Notes</span>
              <p className="text-slate-800 leading-relaxed">{job.customer.notes || "No special instructions provided."}</p>
            </div>
          </div>

          {/* --- PIN VERIFICATION SECTION (Active when In Progress) --- */}
          {job.status === 'in_progress' && (
            <div className="bg-blue-50/70 p-5 rounded-2xl border-2 border-blue-400 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
                <Lock className="w-4 h-4 text-blue-600" />
                Customer 4-Digit Security Completion PIN
              </div>
              <p className="text-xs text-slate-700">
                Ask customer for the 4-digit completion PIN generated on their PocketHelp dashboard to verify satisfactory job completion and release ₹{job.totalPayout} to your wallet.
              </p>

              <form onSubmit={handleVerifyCompletionPin} className="flex flex-col sm:flex-row items-center gap-3 pt-1">
                <input
                  type="text"
                  maxLength={4}
                  placeholder="e.g. 7129"
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError('');
                  }}
                  className="w-full sm:w-48 px-4 py-3 bg-white rounded-xl text-center text-xl font-mono font-black text-slate-900 tracking-widest border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-hidden shadow-xs"
                />

                <button
                  type="submit"
                  disabled={isVerifyingPin}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-black bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isVerifyingPin ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Verifying PIN...
                    </span>
                  ) : (
                    <span>Verify PIN & Finish Job</span>
                  )}
                </button>
              </form>

              {pinError && (
                <p className="text-xs text-rose-600 font-semibold flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {pinError}
                </p>
              )}
            </div>
          )}

          {/* Completed State Review Preview */}
          {job.status === 'completed' && job.rating && (
            <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Customer Feedback Received
                </span>
                <span className="text-xs font-black text-amber-600">★ {job.rating}.0 / 5.0</span>
              </div>
              <p className="text-xs text-slate-700 italic">"{job.review}"</p>
            </div>
          )}
        </div>

        {/* Action Bar Footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4 bg-white">
          <div className="text-xs">
            <span className="text-slate-500 block">Total Payout:</span>
            <span className="text-xl font-black text-blue-700 font-mono">₹{job.totalPayout}</span>
          </div>

          {job.status !== 'completed' && job.status !== 'cancelled' && (
            <div>
              {job.status === 'accepted' && (
                <button
                  type="button"
                  onClick={handleAdvanceNextStage}
                  className="px-6 py-3 rounded-2xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Start Travelling</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
              {job.status === 'travelling' && (
                <button
                  type="button"
                  onClick={handleAdvanceNextStage}
                  className="px-6 py-3 rounded-2xl text-xs font-bold bg-blue-700 hover:bg-blue-800 text-white shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Mark Arrived at Doorstep</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
              {job.status === 'arrived' && (
                <button
                  type="button"
                  onClick={handleAdvanceNextStage}
                  className="px-6 py-3 rounded-2xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Begin Service Work</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
