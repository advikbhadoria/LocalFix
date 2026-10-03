import { Home, Briefcase, Map, Wallet, User } from 'lucide-react';

const TABS = [
  { id: 'home',    icon: Home,     label: 'Home'   },
  { id: 'jobs',    icon: Briefcase,label: 'Jobs'   },
  { id: 'map',     icon: Map,      label: 'Map'    },
  { id: 'wallet',  icon: Wallet,   label: 'Wallet' },
  { id: 'profile', icon: User,     label: 'Profile'},
];

export default function BottomNav({ activeTab, setTab }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-blue-100 shadow-lg z-40 md:hidden">
      <div className="flex items-stretch">
        {TABS.map(({ id, icon: Icon, label }) => {
          const active = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex-1 flex flex-col items-center justify-center py-2.5 gap-0.5 transition-colors ${
                active ? 'bnav-active' : 'bnav-inactive'
              }`}
            >
              <Icon size={20} strokeWidth={active ? 2.5 : 1.8} />
              <span className={`text-[10px] font-medium ${active ? 'font-semibold' : ''}`}>{label}</span>
              {active && <span className="w-4 h-0.5 bg-blue-700 rounded-full mt-0.5" />}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
