const PROBLEMS = [
  {
    icon: '📡',
    title: 'Missed Jobs & Poor Visibility',
    body: "Workers miss high-paying opportunities without real-time alerts or a clear availability system.",
    color: 'border-blue-200 hover:border-blue-400',
    iconBg: 'bg-blue-100',
  },
  {
    icon: '⏳',
    title: 'Delayed & Uncertain Payments',
    body: "Workers need transparent earnings, wallet visibility and faster access to completed-job payments.",
    color: 'border-yellow-200 hover:border-yellow-400',
    iconBg: 'bg-yellow-100',
  },
  {
    icon: '🚨',
    title: 'Safety & Communication Gaps',
    body: "Workers face safety risks at customer locations and are forced to expose personal phone numbers.",
    color: 'border-red-200 hover:border-red-300',
    iconBg: 'bg-red-100',
  },
  {
    icon: '🤝',
    title: 'Lack of Support',
    body: "Workers need better access to safety assistance, communication tools and earnings information.",
    color: 'border-purple-200 hover:border-purple-400',
    iconBg: 'bg-purple-100',
  },
];

export default function Problems() {
  return (
    <section id="problems" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">The Problem</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
            Gig Work Shouldn't Be <span className="text-gradient">This Complicated</span>
          </h2>
          <p className="text-slate-500 mt-3 max-w-xl mx-auto">
            Every day, millions of gig workers face these challenges — WorkOn solves them all.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROBLEMS.map((p, i) => (
            <div
              key={i}
              className={`card p-5 border-2 ${p.color} transition-all duration-200 hover:-translate-y-1 hover:shadow-md`}
            >
              <div className={`w-12 h-12 ${p.iconBg} rounded-xl flex items-center justify-center text-2xl mb-4`}>
                {p.icon}
              </div>
              <h3 className="font-semibold text-slate-800 text-base mb-2">{p.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
