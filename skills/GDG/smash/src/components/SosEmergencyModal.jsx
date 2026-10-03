import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  PhoneCall, 
  MapPin, 
  CheckCircle2, 
  X, 
  Radio, 
  Volume2,
  Users,
  ShieldCheck,
  Flame,
  ArrowRight
} from 'lucide-react';
import InteractiveMap from './InteractiveMap';

export default function SosEmergencyModal({
  emergencyContacts = [],
  onClose,
  onResolve
}) {
  const [countdown, setCountdown] = useState(5);
  const [isActivated, setIsActivated] = useState(false);
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    if (isActivated || resolved) return;

    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setIsActivated(true);
    }
  }, [countdown, isActivated, resolved]);

  const handleManualActivate = () => {
    setIsActivated(true);
  };

  const handleResolveEmergency = () => {
    setResolved(true);
    setTimeout(() => {
      onResolve();
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-rose-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-xl bg-slate-900 text-white rounded-3xl border-2 border-rose-500 shadow-2xl shadow-rose-600/40 p-6 sm:p-8 space-y-6 overflow-hidden animate-in zoom-in-95">
        
        {/* Glow effect */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-rose-600/30 rounded-full blur-3xl pointer-events-none"></div>

        {/* --- STAGE 1: 5-SECOND PRE-ACTIVATION COUNTDOWN --- */}
        {!isActivated && !resolved && (
          <div className="text-center space-y-5 py-4">
            <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-rose-600/40 animate-ping"></div>
              <div className="relative w-24 h-24 rounded-full bg-rose-600 text-white flex items-center justify-center text-4xl font-black shadow-xl ring-4 ring-rose-500/50">
                {countdown}
              </div>
            </div>

            <div>
              <span className="text-xs font-black uppercase tracking-widest text-rose-400 block">
                SOS Emergency Protocol Triggered
              </span>
              <h3 className="text-2xl font-black text-white tracking-tight mt-1">
                Broadcasting Emergency in {countdown}s...
              </h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto mt-2 leading-relaxed">
                Your live GPS coordinates and distress beacon will be sent immediately to the <strong>PocketHelp 24x7 Safety Rapid Response Desk</strong> and your designated emergency contacts.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-4 max-w-md mx-auto">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3.5 rounded-2xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
              >
                ✕ Cancel Accidental Press
              </button>

              <button
                type="button"
                onClick={handleManualActivate}
                className="flex-1 py-3.5 rounded-2xl text-xs font-black bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/40 transition-all cursor-pointer"
              >
                🚨 Broadcast Now
              </button>
            </div>
          </div>
        )}

        {/* --- STAGE 2: LIVE EMERGENCY ACTIVATED STATE --- */}
        {isActivated && !resolved && (
          <div className="space-y-5">
            {/* Header Alert Banner */}
            <div className="bg-rose-950/80 p-4 rounded-2xl border border-rose-500/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-600 flex items-center justify-center text-white animate-sos">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-black uppercase text-rose-400 tracking-wider">
                    Emergency Broadcast Active
                  </div>
                  <div className="text-sm font-bold text-white">
                    Live GPS Location Transmitted (Sector 4 Hub)
                  </div>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-rose-600 text-white animate-pulse">
                LIVE SOS
              </span>
            </div>

            {/* Simulated Map with GPS Beacon */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-300 font-semibold">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  Distress Coordinates: 18.5590° N, 73.7868° E
                </span>
                <span className="text-emerald-400 font-mono">Accuracy: ~3 meters</span>
              </div>
              <InteractiveMap
                workerLat={18.5590}
                workerLng={73.7868}
                destLat={18.5590}
                destLng={73.7868}
                destTitle="Worker In Danger: Jaya Kumari"
                height="170px"
                showRoute={false}
              />
            </div>

            {/* Quick Dispatch Action Hotlines */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href="tel:112"
                className="p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-slate-600 text-left transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-rose-600 text-white">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">National Emergency Police</div>
                    <div className="text-[11px] text-slate-400 font-mono">Dial 112 (Toll-Free)</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="tel:18004197625"
                className="p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-slate-600 text-left transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-blue-600 text-white">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">PocketHelp Rapid Safety Command</div>
                    <div className="text-[11px] text-slate-400 font-mono">1800-419-7625 (Priority)</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Family Notification Status */}
            <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700 space-y-1.5 text-xs">
              <span className="font-bold text-slate-300 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-blue-400" />
                Emergency Contacts SMS Broadcast:
              </span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                ✓ Automated distress SMS with live Google Maps tracking link dispatched to <strong>Dr. Rajiv Kumari (+91 98220 11990)</strong>.
              </p>
            </div>

            {/* Resolve & Clear Alarm Action */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleResolveEmergency}
                className="w-full py-3.5 rounded-2xl text-xs font-black bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                I Am Safe Now — Resolve Emergency Alarm
              </button>
            </div>
          </div>
        )}

        {/* --- STAGE 3: RESOLVED STATE --- */}
        {resolved && (
          <div className="text-center py-8 space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-white">Emergency Resolved Successfully</h3>
            <p className="text-xs text-slate-300">
              Safety command desk notified that you are safe. Standby log saved to safety history.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
