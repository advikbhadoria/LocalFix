const FEATURES = [
  {
    icon: '💼',
    title: 'Job Discovery',
    color: 'bg-blue-700',
    lightBg: 'bg-blue-50',
    border: 'border-blue-200',
    points: [
      'Real-time job alerts',
      'Accept / reject with one tap',
      'Countdown timer per job',
      'Missed jobs recovery feed',
      'Job history & management',
    ],
  },
  {
    icon: '🛡️',
    title: 'Safety First',
    color: 'bg-green-600',
    lightBg: 'bg-green-50',
    border: 'border-green-200',
    points: [
      'One-tap SOS activation',
      'Simulated live location sharing',
      'Trusted contacts emergency list',
      'Safety support access',
      '24/7 protection status',
    ],
  },
  {
    icon: '🔒',
    title: 'Masked Communication',
    color: 'bg-indigo-600',
    lightBg: 'bg-indigo-50',
    border: 'border-indigo-200',
    points: [
      'In-app chat with customers',
      'Simulated masked voice calls',
      'Personal number stays private',
      'Full conversation history',
      'End-to-end protection',
    ],
  },
  {
    icon: '💰',
    title: 'Earnings & Cashout',
    color: 'bg-amber-500',
    lightBg: 'bg-amber-50',
    border: 'border-amber-200',
    points: [
      'Live wallet balance',
      'Instant cashout simulation',
      'UPI & bank withdrawal',
      'Tip collection from customers',
      'Full transaction history',
    ],
  },
];

export default function Solutions() {
  return (
    <section id="features" className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">The Solution</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
            Meet <span className="text-gradient">WorkOn</span>
          </h2>
          <p className="text-slate-500 mt-3 max-w-xl mx-auto">
            One platform for every gig worker — built to solve every problem they face daily.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className={`card p-6 border ${f.border} hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group`}
            >
              <div className={`w-12 h-12 ${f.color} rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                {f.icon}
              </div>
              <h3 className="font-display font-bold text-lg text-slate-800 mb-4">{f.title}</h3>
              <ul className="space-y-2">
                {f.points.map((pt, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="text-blue-500 mt-0.5 shrink-0">✓</span>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
