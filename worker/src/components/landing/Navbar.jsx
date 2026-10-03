import { useState, useEffect } from 'react';
import { Menu, X, Bell, LogIn, Zap } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home',         href: '#home'      },
  { label: 'How It Works', href: '#how'       },
  { label: 'Features',     href: '#features'  },
  { label: 'Safety',       href: '#safety'    },
  { label: 'Earnings',     href: '#earnings'  },
  { label: 'Dashboard',    href: null,        action: 'dashboard' },
];

export default function Navbar({ onDashboard }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled,  setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const handleLink = (item, e) => {
    if (item.action === 'dashboard') { e.preventDefault(); onDashboard(); }
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur shadow-md border-b border-blue-100' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center">
              <Zap size={16} className="text-white" />
            </div>
            <span className="font-display font-800 text-xl text-blue-900">localfix</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(item => (
              <a
                key={item.label}
                href={item.href || '#'}
                onClick={(e) => handleLink(item, e)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  item.action === 'dashboard'
                    ? 'text-blue-700 font-semibold hover:bg-blue-50'
                    : 'text-slate-600 hover:text-blue-700 hover:bg-blue-50'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button className="text-sm font-medium text-blue-700 px-4 py-2 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors">
              Login
            </button>
            <button
              onClick={onDashboard}
              className="text-sm font-semibold text-white px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 transition-colors shadow-sm"
            >
              Get Started
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-blue-50 transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-b border-blue-100 shadow-lg animate-slideDown">
          <div className="px-4 py-3 space-y-1">
            {NAV_LINKS.map(item => (
              <a
                key={item.label}
                href={item.href || '#'}
                onClick={(e) => handleLink(item, e)}
                className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:text-blue-700 hover:bg-blue-50 transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="flex gap-2 pt-2 border-t border-blue-50">
              <button className="flex-1 py-2 text-sm font-medium text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
                Login
              </button>
              <button
                onClick={() => { onDashboard(); setMenuOpen(false); }}
                className="flex-1 py-2 text-sm font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
