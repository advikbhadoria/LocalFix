import Navbar     from './Navbar';
import Hero        from './Hero';
import Problems    from './Problems';
import Solutions   from './Solutions';
import HowItWorks  from './HowItWorks';
import Footer      from './Footer';

// Earnings / Safety teaser sections
function EarningsSection() {
  return (
    <section id="earnings" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Earnings</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Transparent Pay,<br /><span className="text-gradient">Every Single Job</span>
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              See exactly what you earn for each job before you accept. Track your daily,
              weekly and monthly earnings in a live wallet — and cash out instantly via UPI.
            </p>
            <div className="space-y-3">
              {[
                '💳 Live wallet balance — always up to date',
                '⚡ Instant cashout via UPI or bank transfer',
                '🎁 Tip collection from happy customers',
                '📊 Full earnings history and analytics',
              ].map((pt, i) => (
                <div key={i} className="flex items-center gap-2 text-slate-700 text-sm">
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Wallet mock card */}
          <div className="card-blue p-6 rounded-2xl max-w-sm mx-auto w-full">
            <p className="text-blue-200 text-sm mb-1">Wallet Balance</p>
            <p className="text-white text-4xl font-black mb-4">₹4,850</p>

            <div className="space-y-2 mb-5">
              {[
                { label: 'AC Repair',        amount: '+₹650', color: 'text-green-300' },
                { label: 'Electrical Repair',amount: '+₹500', color: 'text-green-300' },
                { label: 'Customer Tip',     amount: '+₹100', color: 'text-blue-300'  },
              ].map((t, i) => (
                <div key={i} className="flex justify-between text-sm border-b border-blue-700/40 pb-2">
                  <span className="text-blue-200">{t.label}</span>
                  <span className={`font-bold ${t.color}`}>{t.amount}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <div className="flex-1 bg-white/10 rounded-xl py-2 text-center text-white text-xs font-semibold">
                📱 UPI Cashout
              </div>
              <div className="flex-1 bg-white/10 rounded-xl py-2 text-center text-white text-xs font-semibold">
                🏦 Bank Transfer
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SafetySection() {
  return (
    <section id="safety" className="py-20 bg-blue-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Mock safety card */}
          <div className="card p-6 max-w-sm mx-auto w-full order-2 lg:order-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-xl">🛡️</div>
              <div>
                <p className="font-bold text-slate-800">Safety Center</p>
                <span className="text-xs bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full">🟢 Active</span>
              </div>
            </div>
            {[
              '🛡️ SOS System — Ready',
              '📍 Location Sharing — Ready',
              '👥 Trusted Contacts — 3',
              '📞 Safety Support — Available',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 py-2 border-b border-slate-100 last:border-0 text-sm text-slate-700">
                {item}
              </div>
            ))}
            <div className="mt-4 text-center">
              <div className="w-20 h-20 bg-red-500 rounded-full flex flex-col items-center justify-center mx-auto shadow-lg shadow-red-500/40 cursor-pointer hover:bg-red-600 transition-colors">
                <span className="text-2xl">🚨</span>
                <span className="text-white text-[10px] font-black">SOS</span>
              </div>
              <p className="text-slate-400 text-xs mt-2">Hold 2s to activate</p>
            </div>
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">Safety</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              Work Safer,<br />Every Single Day
            </h2>
            <p className="text-blue-200 leading-relaxed mb-6">
              WorkOn puts your safety first. With one-tap SOS, simulated live location sharing,
              and protected communication — you're never alone on the job.
            </p>
            <div className="space-y-3">
              {[
                '🚨 One-tap SOS with location broadcast',
                '🔒 Personal number always hidden from customers',
                '📍 Simulated live location to trusted contacts',
                '👥 Emergency contact network built-in',
              ].map((pt, i) => (
                <div key={i} className="flex items-center gap-2 text-blue-100 text-sm">{pt}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function LandingPage({ onDashboard }) {
  return (
    <div className="bg-white">
      <Navbar onDashboard={onDashboard} />
      <Hero onDashboard={onDashboard} />
      <Problems />
      <Solutions />
      <HowItWorks />
      <EarningsSection />
      <SafetySection />
      <Footer onDashboard={onDashboard} />
    </div>
  );
}
