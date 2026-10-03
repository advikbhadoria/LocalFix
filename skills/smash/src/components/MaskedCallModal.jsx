import React, { useState, useEffect } from 'react';
import { 
  PhoneCall, 
  PhoneOff, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  ShieldCheck, 
  Lock, 
  X, 
  User,
  Radio
} from 'lucide-react';

export default function MaskedCallModal({
  customerName = "Customer",
  customerPhone = "+91 98234 XXXXX",
  jobTitle = "Service Consultation",
  onClose
}) {
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(true);
  const [callState, setCallState] = useState('connecting'); // 'connecting', 'connected', 'ended'

  useEffect(() => {
    const connectTimer = setTimeout(() => {
      setCallState('connected');
    }, 1800);

    return () => clearTimeout(connectTimer);
  }, []);

  useEffect(() => {
    if (callState !== 'connected') return;

    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [callState]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    setCallState('ended');
    setTimeout(() => {
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="relative w-full max-w-sm bg-white text-slate-900 rounded-3xl border border-slate-200 p-6 sm:p-8 text-center space-y-6 shadow-2xl animate-in zoom-in-95">
        
        {/* Close button */}
        <button
          type="button"
          onClick={handleEndCall}
          className="absolute right-4 top-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Masked Security Tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
          <Lock className="w-3.5 h-3.5 text-blue-600" />
          PocketHelp Masked Proxy Dial
        </div>

        {/* Animated Avatar Icon */}
        <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-blue-100 animate-ping"></div>
          <div className="relative w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-blue-500/30 ring-4 ring-blue-100">
            {customerName.charAt(0)}
          </div>
        </div>

        {/* Customer & Call Info */}
        <div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight font-display">{customerName}</h3>
          <p className="text-xs text-slate-500 mt-0.5">{jobTitle}</p>
          <div className="text-xs font-mono text-blue-700 mt-1 font-bold">{customerPhone}</div>

          {/* Status Indicator */}
          <div className="mt-3">
            {callState === 'connecting' && (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 animate-pulse">
                <Radio className="w-3.5 h-3.5 animate-spin" /> Routing through secure virtual switch...
              </span>
            )}
            {callState === 'connected' && (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 font-mono">
                ● Connected • {formatTime(callDuration)}
              </span>
            )}
            {callState === 'ended' && (
              <span className="text-xs font-semibold text-rose-600">
                Call Ended
              </span>
            )}
          </div>
        </div>

        {/* Controls Grid */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={() => setIsMuted(!isMuted)}
            className={`p-3 rounded-2xl border text-xs font-bold transition-all flex flex-col items-center gap-1 cursor-pointer ${
              isMuted 
                ? 'bg-rose-50 border-rose-300 text-rose-700' 
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            {isMuted ? <MicOff className="w-5 h-5 text-rose-600" /> : <Mic className="w-5 h-5" />}
            <span>{isMuted ? 'Muted' : 'Mute'}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsSpeaker(!isSpeaker)}
            className={`p-3 rounded-2xl border text-xs font-bold transition-all flex flex-col items-center gap-1 cursor-pointer ${
              isSpeaker 
                ? 'bg-blue-50 border-blue-300 text-blue-700' 
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            {isSpeaker ? <Volume2 className="w-5 h-5 text-blue-600" /> : <VolumeX className="w-5 h-5" />}
            <span>{isSpeaker ? 'Speaker On' : 'Speaker Off'}</span>
          </button>
        </div>

        {/* End Call Button */}
        <button
          type="button"
          onClick={handleEndCall}
          className="w-full py-4 rounded-2xl text-sm font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <PhoneOff className="w-5 h-5" />
          End Call
        </button>

        {/* Privacy Note */}
        <p className="text-[11px] text-slate-400 leading-tight">
          🔒 Real phone numbers are shielded for worker and customer safety. Recorded for quality assurance.
        </p>

      </div>
    </div>
  );
}
