import { Zap, ArrowRight } from 'lucide-react';

const LINKS = {
  Product: ['Job Discovery', 'Masked Communication', 'Safety Center', 'Wallet & Cashout', 'Analytics'],
  Company:  ['About localfix', 'Blog', 'Careers', 'Press'],
  Support:  ['Help Center', 'Worker FAQ', 'Report Issue', 'Contact'],
  Legal:    ['Privacy Policy', 'Terms of Service', 'Worker Agreement'],
};

export default function Footer({ onDashboard }) {
  return (
    <footer className="bg-blue-950 text-white">
      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-600 py-16 px-4 text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-black mb-3">
          More jobs. Safer work. Faster pay.
        </h2>
        <p className="text-blue-200 text-lg mb-8">Your next job is closer than you think.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onDashboard}
            className="flex items-center justify-center gap-2 bg-white text-blue-900 font-bold px-7 py-3.5 rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
          >
            Start Working <ArrowRight size={16} />
          </button>
          <button
            onClick={onDashboard}
            className="border border-white/40 text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-white/10 transition-colors"
          >
            Explore WorkOn
          </button>
        </div>
      </div>

      {/* Links grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Zap size={16} />
              </div>
              <span className="font-display font-bold text-xl">localfix</span>
            </div>
            <p className="text-blue-300 text-sm leading-relaxed max-w-xs">
              WorkOn — Built for the people who keep cities moving.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([cat, links]) => (
            <div key={cat}>
              <h4 className="text-blue-300 text-xs font-semibold uppercase tracking-widest mb-3">{cat}</h4>
              <ul className="space-y-2">
                {links.map(l => (
                  <li key={l}>
                    <a href="#" className="text-blue-100 text-sm hover:text-white transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-blue-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-blue-400 text-sm">© 2024 localfix Technologies Pvt. Ltd. All rights reserved.</p>
          <p className="text-blue-500 text-sm">Made with ❤️ for India's gig workers</p>
        </div>
      </div>
    </footer>
  );
}
