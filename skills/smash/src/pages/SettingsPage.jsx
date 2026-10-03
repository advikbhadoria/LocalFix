import React, { useState } from 'react';
import { 
  Settings, 
  Bell, 
  Moon, 
  Sun, 
  Globe, 
  ShieldCheck, 
  Lock, 
  Volume2, 
  Zap, 
  Smartphone,
  Check
} from 'lucide-react';

export default function SettingsPage({
  theme = 'light',
  onToggleTheme
}) {
  const [autoAccept, setAutoAccept] = useState(false);
  const [highValueAlerts, setHighValueAlerts] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [language, setLanguage] = useState('en');
  const [toastMessage, setToastMessage] = useState('');

  const handleSaveSettings = () => {
    setToastMessage('Worker preferences successfully updated!');
    setTimeout(() => setToastMessage(''), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-4xl mx-auto">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display">
          Application Preferences & Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Configure real-time dispatch alerts, audio notifications, theme mode, and security.
        </p>
      </div>

      {toastMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" /> {toastMessage}
        </div>
      )}

      {/* Settings Grid */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-6 shadow-xs">
        
        {/* Section 1: Dispatch & Audio */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
            <Zap className="w-4 h-4 text-blue-600" />
            Dispatch & Alert Configuration
          </h3>

          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-slate-900">Auto-Accept Priority Dispatches</div>
                <p className="text-xs text-slate-500">Automatically accept jobs with ₹500+ payouts within 1.5 km</p>
              </div>
              <input
                type="checkbox"
                checked={autoAccept}
                onChange={(e) => setAutoAccept(e.target.checked)}
                className="w-5 h-5 accent-blue-600 rounded-lg cursor-pointer"
              />
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-slate-900">High-Pitch Audio Dispatch Siren</div>
                <p className="text-xs text-slate-500">Play distinctive chime when emergency jobs are dispatched</p>
              </div>
              <input
                type="checkbox"
                checked={soundEffects}
                onChange={(e) => setSoundEffects(e.target.checked)}
                className="w-5 h-5 accent-blue-600 rounded-lg cursor-pointer"
              />
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-slate-900">Instant SMS Payout Confirmation</div>
                <p className="text-xs text-slate-500">Receive text notification upon customer PIN verification</p>
              </div>
              <input
                type="checkbox"
                checked={smsAlerts}
                onChange={(e) => setSmsAlerts(e.target.checked)}
                className="w-5 h-5 accent-blue-600 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Appearance & Language */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-600" />
            Language & Interface Display
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <label className="block text-xs font-bold text-slate-900">Application Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full p-2.5 bg-white rounded-xl text-xs font-bold text-slate-800 border border-slate-200 outline-hidden focus:border-blue-500"
              >
                <option value="en">English (India)</option>
                <option value="hi">हिंदी (Hindi)</option>
                <option value="mr">मराठी (Marathi)</option>
              </select>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <label className="block text-xs font-bold text-slate-900">Color Theme</label>
              <button
                type="button"
                onClick={onToggleTheme}
                className="w-full p-2.5 rounded-xl bg-white hover:bg-slate-100 text-xs font-bold text-slate-800 border border-slate-200 flex items-center justify-between cursor-pointer"
              >
                <span>Current: Blue & White Modern Theme</span>
                <Sun className="w-4 h-4 text-amber-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleSaveSettings}
            className="w-full py-3.5 rounded-2xl text-xs font-black bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all cursor-pointer"
          >
            Save All Preferences
          </button>
        </div>

      </div>

    </div>
  );
}
