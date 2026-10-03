import { useState, useRef } from 'react';
import { ShieldCheck, MapPin, Users, Phone, X, AlertTriangle } from 'lucide-react';

const CONTACTS = ['Priya Kumar (Sister)', 'Ravi Sharma (Friend)', 'Meena K. (Neighbour)'];

export default function SafetyCenter({ onClose }) {
  const [sosActive, setSosActive] = useState(false);
  const [holding,   setHolding]   = useState(false);
  const [progress,  setProgress]  = useState(0);
  const holdRef = useRef(null);
  const frameRef = useRef(null);

  const startHold = () => {
    setHolding(true);
    const start = Date.now();
    const HOLD_MS = 2000;
    const tick = () => {
      const pct = Math.min(((Date.now() - start) / HOLD_MS) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setSosActive(true);
        alert('Alert Sent');
        setHolding(false);
        setProgress(0);
      }
    };
    frameRef.current = requestAnimationFrame(tick);
  };

  const stopHold = () => {
    setHolding(false);
    setProgress(0);
    cancelAnimationFrame(frameRef.current);
  };

  const cancelSOS = () => setSosActive(false);

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto animate-fadeIn">
      {/* Header */}
      <div className="bg-blue-700 px-4 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <ShieldCheck size={20} className="text-white" />
          <span className="text-white font-bold">Safety Center</span>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-blue-200 hover:text-white transition-colors">
            <X size={22} />
          </button>
        )}
      </div>

      <div className="max-w-lg mx-auto p-4 space-y-4">
        {/* Status banner */}
        {sosActive ? (
          <div className="bg-red-600 rounded-2xl p-5 text-center animate-fadeIn border-4 border-red-400 animate-sosPulse">
            <div className="text-4xl mb-2">🚨</div>
            <h3 className="text-white font-black text-xl mb-1">SOS ALERT ACTIVATED</h3>
            <p className="text-red-100 text-sm mb-4">
              Your simulated live location has been shared with your trusted contacts and localfix safety support.
            </p>
            <div className="flex items-center justify-center gap-2 bg-red-500/50 rounded-xl px-4 py-2 mb-4">
              <MapPin size={14} className="text-red-200" />
              <span className="text-red-100 text-sm font-semibold">Location Sharing — ACTIVE</span>
            </div>
            <button
              onClick={cancelSOS}
              className="bg-white text-red-600 font-bold px-8 py-2.5 rounded-xl hover:bg-red-50 transition-colors"
            >
              Cancel Alert
            </button>
          </div>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-center">
            <p className="text-green-700 font-bold text-lg">🟢 You're Protected</p>
            <p className="text-green-500 text-sm">All safety systems are active</p>
          </div>
        )}

        {/* Status items */}
        {[
          { icon: '🛡️', label: 'SOS System',       status: sosActive ? 'ALERT SENT' : 'Ready',     ok: !sosActive },
          { icon: '📍', label: 'Location Sharing', status: sosActive ? 'ACTIVE'     : 'Ready',     ok: !sosActive },
          { icon: '👥', label: 'Trusted Contacts', status: '3 contacts',                            ok: true  },
          { icon: '📞', label: 'Safety Support',   status: 'Available 24/7',                        ok: true  },
        ].map((item, i) => (
          <div key={i} className="card flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <span className="text-xl">{item.icon}</span>
              <p className="font-medium text-slate-700 text-sm">{item.label}</p>
            </div>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
              sosActive && !item.ok
                ? 'bg-red-100 text-red-600'
                : 'bg-green-100 text-green-700'
            }`}>
              {item.status}
            </span>
          </div>
        ))}

        {/* Trusted contacts */}
        <div className="card p-4">
          <h4 className="font-bold text-slate-700 text-sm mb-3 flex items-center gap-2">
            <Users size={15} className="text-blue-600" /> Trusted Contacts
          </h4>
          <div className="space-y-2">
            {CONTACTS.map((c, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 text-xs font-bold">
                    {c[0]}
                  </div>
                  <span className="text-slate-700 text-sm">{c}</span>
                </div>
                <button className="text-blue-600 text-xs font-semibold hover:text-blue-800">
                  Call
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* SOS button */}
        {!sosActive && (
          <div className="text-center py-4">
            <p className="text-slate-500 text-xs mb-4 font-medium">HOLD FOR 2 SECONDS TO ACTIVATE SOS</p>
            <div className="relative inline-block">
              {/* Progress ring */}
              {holding && (
                <svg className="absolute inset-0 w-full h-full" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="50%" cy="50%" r="48%" fill="none" stroke="#fca5a5" strokeWidth="4"
                    strokeDasharray={`${progress * 3.0159} ${314 - progress * 3.0159}`} />
                </svg>
              )}
              <button
                className={`sos-btn relative w-32 h-32 rounded-full flex flex-col items-center justify-center transition-all select-none
                  ${holding ? 'bg-red-600 scale-95' : 'bg-red-500 hover:bg-red-600'}
                  shadow-xl shadow-red-500/40 text-white animate-sosPulse`}
                onMouseDown={startHold}
                onMouseUp={stopHold}
                onMouseLeave={stopHold}
                onTouchStart={e => { e.preventDefault(); startHold(); }}
                onTouchEnd={stopHold}
              >
                <AlertTriangle size={28} className="mb-1" />
                <span className="text-xs font-black tracking-wide">SOS</span>
                {holding && <span className="text-[10px] mt-1 text-red-200">Hold...</span>}
              </button>
            </div>
            <p className="text-slate-400 text-xs mt-3">Prototype only — no real emergency services activated</p>
          </div>
        )}
      </div>
    </div>
  );
}
