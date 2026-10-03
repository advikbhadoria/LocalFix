import { useState } from 'react';
import DashboardHeader     from './DashboardHeader';
import BottomNav           from './BottomNav';
import WorkerProfile       from './WorkerProfile';
import EarningsCard        from './EarningsCard';
import JobsSection, { JobPopup } from './JobsSection';
import ActiveJob           from './ActiveJob';
import MissedJobs          from './MissedJobs';
import JobMap              from './JobMap';
import WalletPage          from './WalletPage';
import SafetyCenter        from './SafetyCenter';
import NotificationCenter  from './NotificationCenter';
import Analytics           from './Analytics';
import ChatInterface       from './ChatInterface';
import { JobCompletionModal } from './JobCompletionModal';
import DemoMode            from './DemoMode';
import MarketplaceSection  from './MarketplaceSection';
import { ShieldCheck, BarChart2, Play, ChevronRight, Home, Briefcase, Map, Wallet, User, Bell, BookOpen, Users, ShoppingBag } from 'lucide-react';
import { WORKER } from '../../data/mockData';

// Desktop sidebar navigation
const SIDENAV = [
  { id: 'home',          icon: Home,     label: 'Home'          },
  { id: 'jobs',          icon: Briefcase,label: 'Jobs'          },
  { id: 'map',           icon: Map,      label: 'Map'           },
  { id: 'wallet',        icon: Wallet,   label: 'Wallet'        },
  { id: 'marketplace',   icon: ShoppingBag,label: 'Shop'        },
  { id: 'analytics',     icon: BarChart2,label: 'Analytics'     },
  { id: 'notifications', icon: Bell,     label: 'Notifications' },
  { id: 'profile',       icon: User,     label: 'Profile'       },
  { id: 'safety',        icon: ShieldCheck,label: 'Safety'      },
  { id: 'skillconnect',  icon: BookOpen,   label: 'SkillConnect'  },
  { id: 'community',     icon: Users,      label: 'Community'     },
];

export default function Dashboard({
  isOnline, setIsOnline, wallet,
  todayEarnings, todayJobs,
  availableJobs, missedJobs, activeJob,
  jobPopup, setJobPopup,
  showChat, setShowChat,
  showCashout, setShowCashout,
  showCompletion, setShowCompletion,
  transactions, notifications, chat,
  unreadCount,
  acceptJob, rejectJob, expireJob, claimMissedJob,
  completeJob, cashOut, sendChatMessage,
  markAllNotificationsRead, showToast, onLanding,
}) {
  const [dashTab, setDashTab] = useState('home');
  const [showSafety, setShowSafety] = useState(false);
  const [showDemo,   setShowDemo]   = useState(false);
  const [workerProducts, setWorkerProducts] = useState([]);

  // Demo mode handler
  const handleDemoAction = (action) => {
    switch (action) {
      case 'show_popup':
        if (availableJobs.length > 0) setJobPopup(availableJobs[0]);
        break;
      case 'accept':
        if (availableJobs.length > 0) acceptJob(availableJobs[0]);
        else if (jobPopup) acceptJob(jobPopup);
        break;
      case 'chat':
        if (activeJob) setShowChat(true);
        break;
      case 'complete':
        if (activeJob) completeJob();
        break;
      case 'wallet':
        setDashTab('wallet');
        break;
      case 'cashout':
        setDashTab('wallet');
        break;
      default: break;
    }
  };

  // ─── Render tab content ───────────────────────────────────────────────────
  const renderContent = () => {
    switch (dashTab) {
      case 'home':
        return (
          <div className="space-y-4 pb-4">
            {/* Welcome strip */}
            <div className="bg-blue-700 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-sm">Good {getGreeting()},</p>
                <p className="text-white font-black text-lg">{WORKER.name} 👋</p>
              </div>
              <button
                onClick={() => setShowDemo(true)}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 border border-white/30 text-white text-xs font-semibold px-3 py-2 rounded-xl transition-colors"
              >
                <Play size={12} /> Demo Tour
              </button>
            </div>

            {/* Active job */}
            {activeJob && (
              <ActiveJob
                job={activeJob}
                onOpenChat={() => setShowChat(true)}
              />
            )}

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Wallet',   value: `₹${wallet.toLocaleString('en-IN')}`, sub: 'Balance',     color: 'text-blue-700', onClick: () => setDashTab('wallet')    },
                { label: 'Today',    value: `${todayJobs || 0} jobs`,                               sub: 'Completed',   color: 'text-green-600',onClick: () => setDashTab('analytics') },
                { label: 'Earnings', value: `₹${(todayEarnings || 0).toLocaleString('en-IN')}`,                               sub: 'Today',       color: 'text-indigo-600',onClick: () => setDashTab('analytics')},
              ].map(s => (
                <button key={s.label} onClick={s.onClick} className="card p-3 text-center hover:shadow-md transition-shadow">
                  <p className={`font-black text-base ${s.color}`}>{s.value}</p>
                  <p className="text-slate-400 text-[10px] mt-0.5">{s.sub}</p>
                </button>
              ))}
            </div>

            {/* Available jobs */}
            <JobsSection
              jobs={availableJobs}
              onAccept={acceptJob}
              onReject={rejectJob}
              onOpen={setJobPopup}
            />

            {/* Missed jobs */}
            <MissedJobs jobs={missedJobs} onClaim={claimMissedJob} />

            {/* Safety card */}
            <div className="card p-4 border border-blue-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <ShieldCheck size={18} className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-700 text-sm">Safety Status</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                      <span className="text-green-600 text-xs font-semibold">All systems active</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowSafety(true)}
                  className="text-blue-600 text-xs font-semibold flex items-center gap-1 hover:text-blue-800 transition-colors"
                >
                  Open <ChevronRight size={13} />
                </button>
              </div>
            </div>
          </div>
        );

      case 'jobs':
        return (
          <div className="space-y-4 pb-4">
            <JobsSection
              jobs={availableJobs}
              onAccept={acceptJob}
              onReject={rejectJob}
              onOpen={setJobPopup}
            />
            <MissedJobs jobs={missedJobs} onClaim={claimMissedJob} />
          </div>
        );

      case 'map':
        return (
          <div className="pb-4">
            <JobMap jobs={availableJobs} onAccept={acceptJob} />
          </div>
        );

      case 'marketplace':
        return (
          <MarketplaceSection 
            products={workerProducts} 
            onAddProduct={(p) => setWorkerProducts([p, ...workerProducts])} 
          />
        );

      case 'wallet':
        return (
          <div className="pb-4">
            <WalletPage
              wallet={wallet}
              transactions={transactions}
              onCashout={cashOut}
            />
          </div>
        );

      case 'analytics':
        return (
          <div className="pb-4">
            <Analytics />
          </div>
        );

      case 'notifications':
        return (
          <div className="pb-4">
            <NotificationCenter
              notifications={notifications}
              onMarkAllRead={markAllNotificationsRead}
            />
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-4 pb-4">
            <WorkerProfile setDashTab={setDashTab} />
            <EarningsCard />
          </div>
        );

      case 'safety':
        return (
          <div className="pb-4">
            <SafetyCenter onClose={null} />
          </div>
        );

      case 'community':
        return (
          <div className="space-y-4 pb-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-slate-900">Worker Community Groups</h2>
                <button onClick={() => alert('Create Group form opening...')} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors cursor-pointer">+ Form a Community Group</button>
              </div>
              <p className="text-slate-600 mb-6">Discuss with other workers and team up for large jobs that require more than one person.</p>
              
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-blue-900 text-lg">Commercial AC Installation at Tech Park</div>
                    <div className="text-sm text-blue-700 mt-1 flex items-center gap-2">
                      <Users size={16} /> 3 workers required. 2 spots left.
                    </div>
                  </div>
                  <button onClick={() => alert('Chat interface opened...')} className="bg-white hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-semibold text-sm transition-colors cursor-pointer border border-blue-200">Chat & Join</button>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-slate-900 text-lg">Shifters and Movers (3 BHK Relocation)</div>
                    <div className="text-sm text-slate-600 mt-1 flex items-center gap-2">
                      <Users size={16} /> 4 workers required. 1 spot left.
                    </div>
                  </div>
                  <button onClick={() => alert('Chat interface opened...')} className="bg-white hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-semibold text-sm transition-colors cursor-pointer border border-slate-300">Chat & Join</button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'skillconnect':
        return (
          <div className="pb-4 h-[calc(100vh-8rem)]">
            <iframe src="/skills/training/index.html" className="w-full h-full border-0 rounded-2xl" title="SkillConnect"></iframe>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f7ff] relative overflow-hidden transition-all duration-300 ease-out">
      {/* Animated Ambient Mesh Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/15 via-indigo-500/10 to-violet-600/15 animate-pulse filter blur-3xl opacity-60"></div>
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
      </div>
      
      <div className="relative z-10">
        <DashboardHeader
          isOnline={isOnline}
          setIsOnline={setIsOnline}
          wallet={wallet}
          unreadCount={unreadCount}
          setDashTab={setDashTab}
          onLanding={onLanding}
        />
      </div>

      <div className="max-w-5xl mx-auto flex relative z-10">
        {/* Desktop sidebar */}
        <aside className={`hidden md:flex flex-col shrink-0 py-4 px-3 sticky top-14 self-start h-[calc(100vh-3.5rem)] ${dashTab === 'skillconnect' ? 'w-16 items-center' : 'w-56'}`}>
          <nav className="space-y-1 w-full">
            {SIDENAV.map(({ id, icon: Icon, label }) => {
              const active = dashTab === id;
              return (
                <button
                  key={id}
                  title={label}
                  onClick={() => setDashTab(id)}
                  className={`flex items-center justify-center md:justify-start gap-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    dashTab === 'skillconnect' ? 'px-0 w-10 h-10 mx-auto' : 'w-full px-3'
                  } ${
                    active
                      ? 'bg-blue-700 text-white shadow-md'
                      : 'text-slate-600 hover:bg-blue-50 hover:text-blue-700'
                  }`}
                >
                  <Icon size={17} strokeWidth={active ? 2.5 : 1.8} />
                  {dashTab !== 'skillconnect' && <span>{label}</span>}
                  {id === 'notifications' && unreadCount > 0 && (
                    <span className="ml-auto w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Demo button */}
          <div className="mt-auto">
            {dashTab !== 'skillconnect' ? (
              <button
                onClick={() => setShowDemo(true)}
                className="w-full flex items-center justify-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 font-semibold text-sm px-3 py-2.5 rounded-xl hover:bg-blue-100 transition-colors"
              >
                <Play size={14} /> Demo Mode
              </button>
            ) : (
              <button
                onClick={() => setShowDemo(true)}
                title="Demo Mode"
                className="w-10 h-10 flex items-center justify-center bg-blue-50 border border-blue-200 text-blue-700 rounded-xl hover:bg-blue-100 transition-colors mx-auto"
              >
                <Play size={14} />
              </button>
            )}
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 pb-20 md:pb-4 min-w-0 animate-fadeIn" key={dashTab}>
          {renderContent()}
        </main>
      </div>

      {/* Mobile bottom nav */}
      <BottomNav activeTab={dashTab} setTab={setDashTab} />

      {/* ── Overlays ── */}

      {/* Job popup with countdown */}
      {jobPopup && (
        <JobPopup
          job={jobPopup}
          onAccept={acceptJob}
          onReject={rejectJob}
          onExpire={expireJob}
        />
      )}

      {/* Chat */}
      {showChat && activeJob && (
        <ChatInterface
          chat={chat}
          activeJob={activeJob}
          onSend={sendChatMessage}
          onClose={() => setShowChat(false)}
        />
      )}

      {/* Job completion */}
      {showCompletion && (
        <JobCompletionModal
          job={showCompletion}
          wallet={wallet}
          onDismiss={() => setShowCompletion(null)}
        />
      )}

      {/* Safety center overlay */}
      {showSafety && <SafetyCenter onClose={() => setShowSafety(false)} />}

      {/* Demo mode */}
      {showDemo && <DemoMode onAction={handleDemoAction} onClose={() => setShowDemo(false)} />}
    </div>
  );
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'morning';
  if (h < 17) return 'afternoon';
  return 'evening';
}
