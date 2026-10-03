import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  DollarSign, 
  AlertTriangle, 
  X, 
  Check, 
  Navigation, 
  Info,
  Flame, 
  User, 
  ArrowRight
} from 'lucide-react';
import InteractiveMap from './InteractiveMap';

export default function IncomingJobModal({
  jobRequest,
  onAccept,
  onReject,
  onTimeout
}) {
  const TOTAL_SECONDS = 30;
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_SECONDS);

  useEffect(() => {
    if (!jobRequest) return;
    setSecondsLeft(TOTAL_SECONDS);

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeout(jobRequest);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [jobRequest]);

  if (!jobRequest) return null;

  // Percentage for circular countdown
  const progressPercent = (secondsLeft / TOTAL_SECONDS) * 100;
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  // Dynamic urgency color
  const timerColor = secondsLeft > 15 
    ? 'text-blue-600 stroke-blue-600' 
    : secondsLeft > 7 
      ? 'text-amber-500 stroke-amber-500' 
      : 'text-rose-600 stroke-rose-600 animate-pulse';

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white text-slate-900 rounded-3xl border-2 border-blue-500 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 max-h-[95vh] flex flex-col">
        
        {/* Top Glowing Header with Dispatch Banner & Circular Countdown */}
        <div className="relative bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-white animate-radar">
              <Zap className="w-6 h-6 fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-widest text-blue-100 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-300" />
                  Instant Job Dispatch
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-white/20 text-white border border-white/30">
                  Priority Route
                </span>
              </div>
              <h2 className="text-lg font-black text-white tracking-tight mt-0.5 font-display">
                {jobRequest.title}
              </h2>
            </div>
          </div>

          {/* Circular Countdown Ring */}
          <div className="relative flex items-center justify-center flex-shrink-0 bg-white/10 rounded-full p-1 backdrop-blur-xs">
            <svg className="w-16 h-16 transform -rotate-90">
              <circle
                cx="32"
                cy="32"
                r={radius}
                className="stroke-white/20"
                strokeWidth="4"
                fill="transparent"
              />
              <circle
                cx="32"
                cy="32"
                r={radius}
                className="transition-all duration-1000 ease-linear stroke-white"
                strokeWidth="4"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-base font-black font-mono leading-none text-white">
                {secondsLeft}s
              </span>
              <span className="text-[9px] font-semibold text-blue-100 uppercase">Left</span>
            </div>
          </div>
        </div>

        {/* Scrollable Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1 custom-scrollbar bg-white">
          
          {/* Customer & Location Overview */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <img
                src={jobRequest.customerAvatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80"}
                alt={jobRequest.customerName}
                className="w-12 h-12 rounded-2xl object-cover ring-2 ring-blue-500/20"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900">{jobRequest.customerName}</h3>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" /> Verified Customer
                  </span>
                </div>
                <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                  <span className="truncate max-w-[260px] sm:max-w-none">{jobRequest.location}</span>
                </p>
              </div>
            </div>

            {/* Travel Metrics Pill */}
            <div className="flex items-center gap-2 self-start sm:self-center">
              <div className="bg-white px-3 py-2 rounded-xl border border-slate-200 text-center shadow-xs">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Distance</span>
                <span className="text-xs font-black text-blue-700">{jobRequest.distance}</span>
              </div>
              <div className="bg-white px-3 py-2 rounded-xl border border-slate-200 text-center shadow-xs">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">ETA</span>
                <span className="text-xs font-black text-emerald-600">~{jobRequest.travelEta}</span>
              </div>
              <div className="bg-white px-3 py-2 rounded-xl border border-slate-200 text-center shadow-xs">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Est. Time</span>
                <span className="text-xs font-black text-slate-800">{jobRequest.duration}</span>
              </div>
            </div>
          </div>

          {/* Interactive Map Route Preview */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-blue-600" />
                Live Dispatch Route Map
              </span>
              <span className="text-[11px] text-slate-500 font-medium">Sector 4 Hub ➔ Destination</span>
            </div>
            <InteractiveMap
              destLat={jobRequest.lat || 18.5620}
              destLng={jobRequest.lng || 73.7990}
              destTitle={jobRequest.location}
              height="200px"
              showRoute={true}
            />
          </div>

          {/* Job Scope & Diagnostic Details */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <Info className="w-4 h-4 text-blue-600" />
              Scope of Work & Problem Description
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {jobRequest.description}
            </p>
          </div>

          {/* Compensation & Payment Card */}
          <div className="bg-blue-50/80 rounded-2xl p-4 sm:p-5 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold text-blue-800 uppercase tracking-wider block">
                Guaranteed Worker Payout
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-black text-blue-700 font-mono">
                  ₹{jobRequest.totalPayout || (jobRequest.basePayout + (jobRequest.incentive || 0))}
                </span>
                <span className="text-xs text-blue-800 font-semibold">
                  (Base ₹{jobRequest.basePayout || jobRequest.payout} + Rapid Incentive ₹{jobRequest.incentive || 0})
                </span>
              </div>
              <span className="text-[11px] text-slate-500 mt-0.5 block">
                Instant credit to wallet upon customer PIN completion.
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white text-blue-700 border border-blue-200 shadow-xs">
                100% Guaranteed Escrow
              </span>
            </div>
          </div>
        </div>

        {/* Modal Actions Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => onReject(jobRequest)}
            className="px-6 py-3.5 rounded-2xl text-xs font-bold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <X className="w-4 h-4" />
            Pass / Reject
          </button>

          <button
            type="button"
            onClick={() => onAccept(jobRequest)}
            className="flex-1 py-4 px-6 rounded-2xl text-sm font-black bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2 transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
          >
            <Check className="w-5 h-5 stroke-[3]" />
            Accept Job & Start Navigation (₹{jobRequest.totalPayout || (jobRequest.basePayout + (jobRequest.incentive || 0))})
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
