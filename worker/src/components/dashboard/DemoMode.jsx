import { CheckCircle, X, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const DEMO_STEPS = [
  { id: 1, title: 'Incoming Job',    desc: 'New AC Repair job arrives with a 25-second countdown',   action: 'show_popup' },
  { id: 2, title: 'Accept Job',      desc: 'Accept and get assigned — see the active job dashboard', action: 'accept'     },
  { id: 3, title: 'Customer Chat',   desc: 'Chat with customer through masked communication',         action: 'chat'       },
  { id: 4, title: 'Customer Confirms', desc: 'Customer confirms the job — payment is released instantly', action: 'complete'   },
  { id: 5, title: '₹650 Added',      desc: 'Watch wallet update in real time',                       action: 'wallet'     },
  { id: 6, title: 'Cash Out',        desc: 'Withdraw via UPI — cashout confirmed!',                  action: 'cashout'    },
];

export default function DemoMode({ onAction, onClose }) {
  const [step, setStep] = useState(0);
  const [done, setDone]  = useState(false);

  const handleStep = () => {
    const current = DEMO_STEPS[step];
    onAction(current.action);
    if (step < DEMO_STEPS.length - 1) {
      setStep(s => s + 1);
    } else {
      setDone(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-blue-950/70 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl animate-fadeUp">
        <div className="bg-blue-700 px-5 py-4 rounded-t-2xl flex items-center justify-between">
          <div>
            <p className="text-blue-200 text-xs font-semibold">DEMO MODE</p>
            <h3 className="text-white font-bold">WorkOn Product Tour</h3>
          </div>
          <button onClick={onClose} className="text-blue-300 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {done ? (
          <div className="p-8 text-center animate-fadeIn">
            <CheckCircle size={48} className="text-green-500 mx-auto mb-3" />
            <h3 className="font-black text-slate-800 text-xl">Tour Complete!</h3>
            <p className="text-slate-500 text-sm mt-2">You've experienced the full WorkOn journey.</p>
            <button onClick={onClose} className="mt-6 w-full bg-blue-700 text-white font-bold py-3 rounded-xl hover:bg-blue-800 transition-colors">
              Explore Dashboard
            </button>
          </div>
        ) : (
          <div className="p-5">
            {/* Progress */}
            <div className="flex gap-1 mb-5">
              {DEMO_STEPS.map((_, i) => (
                <div key={i} className={`flex-1 h-1 rounded-full transition-colors ${i <= step ? 'bg-blue-700' : 'bg-slate-200'}`} />
              ))}
            </div>

            {/* Steps list */}
            <div className="space-y-2 mb-5">
              {DEMO_STEPS.map((s, i) => (
                <div key={s.id} className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                  i === step ? 'bg-blue-50 border border-blue-200' : i < step ? 'opacity-50' : 'opacity-30'
                }`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    i < step ? 'bg-green-500 text-white' : i === step ? 'bg-blue-700 text-white' : 'bg-slate-200 text-slate-500'
                  }`}>
                    {i < step ? '✓' : s.id}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold ${i === step ? 'text-blue-800' : 'text-slate-600'}`}>{s.title}</p>
                    {i === step && <p className="text-blue-500 text-xs mt-0.5">{s.desc}</p>}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleStep}
              className="w-full flex items-center justify-center gap-2 bg-blue-700 text-white font-bold py-3.5 rounded-xl hover:bg-blue-800 transition-colors shadow-lg shadow-blue-700/30"
            >
              {step < DEMO_STEPS.length - 1 ? (
                <><span>{DEMO_STEPS[step].title}</span><ArrowRight size={16} /></>
              ) : (
                'Finish Tour'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
