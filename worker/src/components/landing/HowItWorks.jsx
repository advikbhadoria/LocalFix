const STEPS = [
  { num: '01', icon: '🔐', title: 'Login Securely',       body: 'OTP-based secure login — no passwords to remember, just your number.'       },
  { num: '02', icon: '🔍', title: 'Find Jobs',            body: 'Browse real-time job alerts nearby and see estimated pay before accepting.'  },
  { num: '03', icon: '✅', title: 'Accept & Communicate', body: 'Accept a job and chat with the customer — your number stays private.'        },
  { num: '04', icon: '🤝', title: 'Customer Confirms',   body: 'Complete the service — the customer confirms completion to release payment instantly.' },
  { num: '05', icon: '💸', title: 'Get Paid Instantly',   body: 'Earnings and customer tips hit your wallet immediately. Cash out via UPI anytime.' },
];

export default function HowItWorks() {
  return (
    <section id="how" className="py-20 bg-white" >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">The Journey</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-slate-500 mt-3 max-w-xl mx-auto">
            From finding a job to getting paid — in five simple steps.
          </p>
        </div>

        {/* Desktop: horizontal flow */}
        <div className="hidden lg:flex items-start gap-0 relative">
          {/* Connecting line */}
          <div className="absolute top-8 left-14 right-14 h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 z-0"></div>

          {STEPS.map((step, i) => (
            <div key={i} className="flex-1 flex flex-col items-center text-center relative z-10">
              {/* Numbered circle */}
              <div className="w-16 h-16 bg-blue-700 rounded-full flex flex-col items-center justify-center text-white shadow-lg shadow-blue-700/30 mb-4">
                <span className="text-2xl leading-none">{step.icon}</span>
              </div>
              <span className="text-blue-400 text-xs font-mono font-bold mb-1">{step.num}</span>
              <h3 className="font-semibold text-slate-800 text-sm mb-2">{step.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed px-2">{step.body}</p>
            </div>
          ))}
        </div>

        {/* Mobile: vertical list */}
        <div className="lg:hidden space-y-4">
          {STEPS.map((step, i) => (
            <div key={i} className="flex gap-4 card p-4">
              <div className="w-12 h-12 bg-blue-700 rounded-xl flex items-center justify-center text-xl shrink-0">
                {step.icon}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-blue-400 text-xs font-mono font-bold">{step.num}</span>
                  <h3 className="font-semibold text-slate-800 text-sm">{step.title}</h3>
                </div>
                <p className="text-slate-500 text-sm">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
