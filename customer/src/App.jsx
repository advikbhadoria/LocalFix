import React, { useState } from 'react';
import TopNav from './components/TopNav';
import ProfileView from './components/ProfileView';
import BookingFlow from './components/BookingFlow';
import RequestsView from './components/RequestsView';
import SafetyCenter from './components/SafetyCenter';
import CustomerMarketplace from './components/CustomerMarketplace';
import { Star, Clock, Zap, ArrowRight, ShieldCheck, Phone, FastForward, Lock } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('book'); // 'book', 'requests', 'profile'
  const [history, setHistory] = useState(['book']);
  const [bookingStep, setBookingStep] = useState(1);
  
  const storedUser = JSON.parse(localStorage.getItem('LocalFix_user') || 'null');
  const [customerProfile, setCustomerProfile] = useState({
    isRegistered: true,
    name: storedUser ? storedUser.name : 'Advik Sharma',
    phone: storedUser ? (storedUser.mobile ? '+91 ' + storedUser.mobile : '+91 98765 43210') : '+91 98765 43210',
    email: storedUser ? storedUser.email : 'advik.sharma@example.com',
    address: 'Flat 304, Tower B, Silver Crest Heights, Ward 12, Pune',
    memberSince: 'August 2024',
    securityPin: '3912'
  });

  const [requestsList, setRequestsList] = useState([
    {
      id: 1,
      status: 'active',
      type: 'Electrician',
      subType: 'MCB & Fuse Tripping Fix',
      worker: { name: 'Amit Verma', phone: '+91 91234 56789' },
      pin: '3912',
      eta: 'On the way',
      price: 298,
      date: new Date().toISOString()
    },
    {
      id: 2,
      status: 'completed',
      type: 'Plumber',
      subType: 'Tap & Shower Repair',
      worker: { name: 'Rajesh Kumar' },
      price: 198,
      date: new Date(Date.now() - 86400000 * 2).toISOString(),
      review: { stars: 5, comment: 'Very polite and quick.', tags: ['Punctual', 'Polite'] }
    },
    {
      id: 3,
      status: 'completed',
      type: 'Carpenter',
      subType: 'Furniture Assembly',
      worker: { name: 'Sunil Singh' },
      price: 349,
      date: new Date(Date.now() - 86400000 * 5).toISOString(),
      review: null
    }
  ]);

  const changeTab = (tab) => {
    if (tab !== activeTab) {
      setHistory([...history, tab]);
      setActiveTab(tab);
    }
  };

  const handleBack = () => {
    if (activeTab === 'book' && bookingStep > 1) {
      setBookingStep(bookingStep - 1);
    } else if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      const prevTab = newHistory[newHistory.length - 1];
      setHistory(newHistory);
      setActiveTab(prevTab);
    }
  };

  const canGoBack = history.length > 1 || (activeTab === 'book' && bookingStep > 1);

  const addRequest = (request) => {
    setRequestsList([{ ...request, id: Date.now() }, ...requestsList]);
  };

  const updateRequestReview = (id, review) => {
    setRequestsList(requestsList.map(req => req.id === id ? { ...req, review } : req));
  };

  const cancelRequest = (id) => {
    setRequestsList(requestsList.filter(req => req.id !== id));
  };

  const completeRequest = (id) => {
    setRequestsList(requestsList.map(req => req.id === id ? { ...req, status: 'completed', date: new Date().toISOString() } : req));
  };

  const activeCount = requestsList.filter(r => r.status === 'active').length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans relative overflow-hidden transition-all duration-300 ease-out">
      {/* Animated Ambient Mesh Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/15 via-indigo-500/10 to-violet-600/15 animate-pulse filter blur-3xl opacity-60"></div>
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <TopNav 
          activeTab={activeTab} 
          setActiveTab={changeTab} 
          customerProfile={customerProfile} 
          activeRequestsCount={activeCount}
          onBack={handleBack}
          canGoBack={canGoBack}
        />
        
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8 pb-24 flex flex-col lg:flex-row gap-8">
          
          <div className="flex-1 w-full max-w-4xl">
            {activeTab === 'profile' && (
              <ProfileView 
                profile={customerProfile} 
                setProfile={setCustomerProfile} 
                setActiveTab={changeTab} 
                requestsList={requestsList}
              />
            )}
            {activeTab === 'book' && (
              <BookingFlow 
                customerProfile={customerProfile} 
                addRequest={addRequest} 
                setActiveTab={changeTab}
                step={bookingStep}
                setStep={setBookingStep}
              />
            )}
            {activeTab === 'requests' && (
              <RequestsView 
                requests={requestsList} 
                cancelRequest={cancelRequest} 
                updateRequestReview={updateRequestReview}
                completeRequest={completeRequest}
              />
            )}
            {activeTab === 'shop' && <CustomerMarketplace />}
            {activeTab === 'safety' && <SafetyCenter />}
          </div>

          {/* Right Sidebar Widgets for larger screens */}
          <div className="hidden lg:flex w-80 flex-col gap-6 shrink-0">
            {/* Widget 1: Active Booking Summary */}
            {activeCount > 0 ? (
              <div className="bg-white rounded-2xl shadow-sm border border-blue-200 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-blue-600"></div>
                <div className="p-5">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-600" /> Current Activity
                  </h3>
                  {requestsList.filter(r => r.status === 'active').slice(0, 2).map(req => (
                    <div key={req.id} className="mb-4 last:mb-0 border-b border-slate-100 last:border-0 pb-4 last:pb-0">
                      <div className="text-sm font-bold text-slate-800">{req.type}</div>
                      <div className="text-xs text-slate-500 mb-2">{req.subType}</div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded font-semibold animate-pulse">{req.eta}</span>
                        <span className="font-bold">₹{req.price}</span>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => changeTab('requests')} className="w-full mt-2 text-sm text-blue-600 font-bold hover:underline flex items-center justify-center gap-1">
                    Manage Trackers <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : null}

            {/* Core Features */}
            <div className="flex flex-col gap-4">
              <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 hover:shadow-md transition-shadow">
                <FastForward className="w-8 h-8 text-blue-600 mb-3" />
                <h4 className="font-bold text-slate-900 mb-1">⚡ Instant 20-Min Dispatch</h4>
                <p className="text-xs text-slate-600 font-medium">Peer-to-peer neighborhood broadcast instead of waiting for 4-hour scheduled slots.</p>
              </div>
              <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-5 hover:shadow-md transition-shadow">
                <Lock className="w-8 h-8 text-indigo-600 mb-3" />
                <h4 className="font-bold text-slate-900 mb-1">🔒 4-Digit Security PIN</h4>
                <p className="text-xs text-slate-600 font-medium">You hold the money. The worker is paid only when you release the PIN after inspection.</p>
              </div>
              <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-5 hover:shadow-md transition-shadow">
                <ShieldCheck className="w-8 h-8 text-emerald-600 mb-3" />
                <h4 className="font-bold text-slate-900 mb-1">🤝 0% Exploitative Cut</h4>
                <p className="text-xs text-slate-600 font-medium">95% goes directly to the technician, ensuring fair wages and motivated workers.</p>
              </div>
            </div>

            {/* Widget 2: Trust Banner */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-green-600" /> Why LocalFix?
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center shrink-0 mt-0.5"><Star className="w-3 h-3 fill-current" /></div>
                  <div>
                    <div className="text-sm font-bold text-slate-800">Verified Pros</div>
                    <div className="text-xs text-slate-500">Background checked and skilled.</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5"><Clock className="w-3 h-3 fill-current" /></div>
                  <div>
                    <div className="text-sm font-bold text-slate-800">On-Time Guarantee</div>
                    <div className="text-xs text-slate-500">Or get ₹100 cashback.</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </main>

        {/* Dynamic Floating Help & Satisfaction Guarantee Footer */}
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 pointer-events-none flex justify-center pb-6">
          <div className="bg-slate-900/90 backdrop-blur-md text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-4 md:gap-6 pointer-events-auto border border-white/10 max-w-fit transform transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> <span className="hidden sm:inline">100% Hyperlocal</span> Guarantee
            </div>
            <div className="w-px h-4 bg-white/20"></div>
            <div className="flex items-center gap-2 text-xs font-semibold">
              <Phone className="w-4 h-4 text-blue-400" /> <span className="hidden sm:inline">24/7 Dispute</span> Mediation
            </div>
            <div className="hidden md:block w-px h-4 bg-white/20"></div>
            <div className="hidden md:flex items-center gap-2 text-xs font-semibold whitespace-nowrap">
              <Clock className="w-4 h-4 text-amber-400" /> Zero Cancellation Fee <span className="text-white/60 font-normal ml-1">Before Dispatch</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
