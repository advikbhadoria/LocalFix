import React from 'react';
import { AlertTriangle, ShieldAlert, PhoneCall, ShieldCheck, HeartPulse, Locate } from 'lucide-react';

export default function SafetyCenter() {
  const triggerSOS = () => {
    alert("Alert Sent: SOS has been dispatched with your live location.");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-red-50 border border-red-200 rounded-3xl p-6 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <ShieldAlert className="w-8 h-8 text-red-600" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-2">Emergency SOS</h2>
        <p className="text-sm text-red-800 font-medium mb-6">
          Press this button only in case of a severe emergency. It will immediately alert local authorities and LocalFix safety team with your live location.
        </p>
        <button 
          onClick={triggerSOS}
          className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-black text-lg px-12 py-4 rounded-2xl shadow-lg shadow-red-600/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 mx-auto"
        >
          <AlertTriangle className="w-6 h-6" /> SLIDE TO SOS
        </button>
      </div>

      <h3 className="font-bold text-slate-900 text-lg px-2">Safety Features</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <PhoneCall className="w-6 h-6 text-blue-600 mb-3" />
          <h4 className="font-bold text-slate-900 mb-1">24/7 Helpline</h4>
          <p className="text-xs text-slate-500 mb-3">Speak to our safety team immediately.</p>
          <button className="text-sm font-bold text-blue-600 hover:underline">Call Now</button>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <Locate className="w-6 h-6 text-emerald-600 mb-3" />
          <h4 className="font-bold text-slate-900 mb-1">Live Tracking</h4>
          <p className="text-xs text-slate-500 mb-3">Share your live service location with family.</p>
          <button className="text-sm font-bold text-emerald-600 hover:underline">Share Link</button>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <ShieldCheck className="w-6 h-6 text-indigo-600 mb-3" />
          <h4 className="font-bold text-slate-900 mb-1">Worker Verification</h4>
          <p className="text-xs text-slate-500 mb-3">Verify the worker's ID and background check status.</p>
          <button className="text-sm font-bold text-indigo-600 hover:underline">View Policy</button>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <HeartPulse className="w-6 h-6 text-pink-600 mb-3" />
          <h4 className="font-bold text-slate-900 mb-1">Medical Emergency</h4>
          <p className="text-xs text-slate-500 mb-3">Quick access to nearby hospitals and clinics.</p>
          <button className="text-sm font-bold text-pink-600 hover:underline">Find Nearest</button>
        </div>
      </div>
    </div>
  );
}
