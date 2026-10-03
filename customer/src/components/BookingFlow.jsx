import React, { useState } from 'react';
import { Wrench, Zap, Hammer, Utensils, Sparkles, ShieldCheck, ArrowLeft, ChevronRight, Phone, CheckCircle2, Star, Clock, MapPin, Search, Shield, Lock, RefreshCw, AlertTriangle, FastForward, Navigation, Camera, Users, Paintbrush, Scissors, Truck, MessageSquare, IndianRupee } from 'lucide-react';

const CATEGORIES = [
  { id: 'plumber', label: 'Plumber', icon: Wrench, price: 149, color: 'text-blue-500', bg: 'bg-blue-50' },
  { id: 'electrician', label: 'Electrician', icon: Zap, price: 129, color: 'text-amber-500', bg: 'bg-amber-50' },
  { id: 'carpenter', label: 'Carpenter', icon: Hammer, price: 199, color: 'text-orange-500', bg: 'bg-orange-50' },
  { id: 'cook', label: 'Cook / Tiffin', icon: Utensils, price: 249, color: 'text-green-500', bg: 'bg-green-50' },
  { id: 'maid', label: 'House Help / Maid', icon: Sparkles, price: 199, color: 'text-teal-500', bg: 'bg-teal-50' },
  { id: 'appliance', label: 'Appliance Repair', icon: Wrench, price: 299, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { id: 'labour', label: 'Labour / Help', icon: Users, price: 399, color: 'text-rose-500', bg: 'bg-rose-50' },
  { id: 'painter', label: 'Painter', icon: Paintbrush, price: 299, color: 'text-purple-500', bg: 'bg-purple-50' },
  { id: 'salon', label: 'Salon at Home', icon: Scissors, price: 349, color: 'text-pink-500', bg: 'bg-pink-50' },
  { id: 'others', label: 'Others', icon: Sparkles, price: 99, color: 'text-gray-500', bg: 'bg-gray-50' }
];

const SUB_TYPES = {
  plumber: [
    { id: 'p1', label: 'Tap & Shower Repair', price: 149, time: '~30m' },
    { id: 'p2', label: 'Blocked Drain & Pipe Leakage', price: 249, time: '~45m' },
    { id: 'p3', label: 'Flush Tank / Cistern Fitting', price: 299, time: '~45m' },
    { id: 'p4', label: 'Full Pipeline Overhaul', price: 599, time: '~90m' },
    { id: 'p5', label: 'Water Heater Installation', price: 349, time: '~1h' }
  ],
  electrician: [
    { id: 'e1', label: 'Switch & Socket Repair', price: 129, time: '~30m' },
    { id: 'e2', label: 'Ceiling Fan / Appliance Fitting', price: 199, time: '~40m' },
    { id: 'e3', label: 'MCB & Fuse Tripping Fix', price: 249, time: '~45m' },
    { id: 'e4', label: 'Complete Room Wiring', price: 699, time: '~2h' },
    { id: 'e5', label: 'Inverter Installation', price: 399, time: '~1h' }
  ],
  carpenter: [
    { id: 'c1', label: 'Furniture Assembly', price: 199, time: '~1h' },
    { id: 'c2', label: 'Door & Lock Repair', price: 249, time: '~45m' },
    { id: 'c3', label: 'Bed / Wardrobe Repair', price: 349, time: '~1.5h' },
    { id: 'c4', label: 'Custom Shelving & Cabinets', price: 599, time: '~2h' },
    { id: 'c5', label: 'Window Frame Fixing', price: 299, time: '~1h' }
  ],
  cook: [
    { id: 'ck1', label: 'One-Time Meal Prep', price: 249, time: '~1.5h' },
    { id: 'ck2', label: 'Full Day Cooking', price: 699, time: '~4h' },
    { id: 'ck3', label: 'Party / Event Catering', price: 999, time: '~5h' },
    { id: 'ck4', label: 'Weekly Tiffin Planning', price: 1499, time: '~Recurring' },
    { id: 'ck5', label: 'Dietary / Healthy Cooking', price: 349, time: '~2h' }
  ],
  maid: [
    { id: 'm1', label: 'Deep Cleaning (Per Room)', price: 499, time: '~3h' },
    { id: 'm2', label: 'Regular Sweeping & Mopping', price: 199, time: '~1h' },
    { id: 'm3', label: 'Bathroom Cleaning', price: 299, time: '~1h' },
    { id: 'm4', label: 'Utensil Washing (One-time)', price: 149, time: '~45m' },
    { id: 'm5', label: 'Full House Dusting', price: 399, time: '~2h' }
  ],
  appliance: [
    { id: 'a1', label: 'AC Service & Repair', price: 399, time: '~1h' },
    { id: 'a2', label: 'Washing Machine Repair', price: 299, time: '~45m' },
    { id: 'a3', label: 'Refrigerator Repair', price: 349, time: '~1h' },
    { id: 'a4', label: 'Microwave Fix', price: 249, time: '~45m' },
    { id: 'a5', label: 'Geyser Service', price: 299, time: '~1h' }
  ],
  labour: [
    { id: 'l1', label: 'Shifters and Movers', price: 499, time: '~3h' },
    { id: 'l2', label: 'Farm Help', price: 399, time: '~4h' },
    { id: 'l3', label: 'Nanny / Babysitter', price: 299, time: '~3h' },
    { id: 'l4', label: 'Construction Labourer', price: 599, time: '~8h' },
    { id: 'l5', label: 'Event Setup Helpers', price: 449, time: '~4h' }
  ],
  painter: [
    { id: 'pt1', label: 'Single Wall Accent', price: 499, time: '~2h' },
    { id: 'pt2', label: 'Full Room Painting', price: 1499, time: '~6h' },
    { id: 'pt3', label: 'Door & Window Polish', price: 399, time: '~2h' },
    { id: 'pt4', label: 'Exterior Patch Fix', price: 599, time: '~3h' },
    { id: 'pt5', label: 'Texture Painting', price: 899, time: '~4h' }
  ],
  salon: [
    { id: 's1', label: 'Men\'s Haircut & Grooming', price: 249, time: '~45m' },
    { id: 's2', label: 'Women\'s Hair Spa', price: 499, time: '~1.5h' },
    { id: 's3', label: 'Manicure & Pedicure', price: 399, time: '~1h' },
    { id: 's4', label: 'Facial & Cleanup', price: 349, time: '~1h' },
    { id: 's5', label: 'Bridal Makeup', price: 1999, time: '~3h' }
  ],
  others: [
    { id: 'o1', label: 'Custom Requirement', price: 99, time: '~TBD' },
    { id: 'o2', label: 'General Help / Assistance', price: 199, time: '~TBD' }
  ]
};

const WORKERS = [
  { id: 'w1', name: 'Ramesh Kumar', rating: 4.8, jobs: 142, distance: '1.2 km', eta: '20 mins', phone: '+91 99887 76655' },
  { id: 'w2', name: 'Suresh Verma', rating: 4.9, jobs: 315, distance: '2.5 km', eta: '35 mins', phone: '+91 98765 43210' }
];

export default function BookingFlow({ customerProfile, addRequest, setActiveTab, step, setStep }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubType, setSelectedSubType] = useState(null);
  const [problemDesc, setProblemDesc] = useState('');
  const [urgency, setUrgency] = useState('standard');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [generatedPin, setGeneratedPin] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [workerCount, setWorkerCount] = useState(1);
  const [activeChatWorker, setActiveChatWorker] = useState(null);
  const [activeOfferWorker, setActiveOfferWorker] = useState(null);
  const [offerPrice, setOfferPrice] = useState('');
  const [chatMessage, setChatMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [showGlobalOffer, setShowGlobalOffer] = useState(false);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setStep(2);
  };

  const handleSubTypeSelect = (subType) => {
    setSelectedSubType(subType);
    setStep(3);
  };

  const TIME_SLOTS = [
    { value: '09:00-10:00', label: '09:00 AM - 10:00 AM' },
    { value: '10:00-11:00', label: '10:00 AM - 11:00 AM' },
    { value: '11:00-12:00', label: '11:00 AM - 12:00 PM' },
    { value: '12:00-13:00', label: '12:00 PM - 01:00 PM' },
    { value: '13:00-14:00', label: '01:00 PM - 02:00 PM' },
    { value: '14:00-15:00', label: '02:00 PM - 03:00 PM' },
    { value: '15:00-16:00', label: '03:00 PM - 04:00 PM' },
    { value: '16:00-17:00', label: '04:00 PM - 05:00 PM' },
    { value: '17:00-18:00', label: '05:00 PM - 06:00 PM' }
  ];

  const formatTimeWindow = () => {
    if (!selectedDate || !selectedTimeSlot) return 'Not Selected';
    const d = new Date(selectedDate);
    const dateStr = d.toLocaleDateString('en-IN', { dateStyle: 'medium' });
    const slotLabel = TIME_SLOTS.find(s => s.value === selectedTimeSlot)?.label || '';
    return `${dateStr}, ${slotLabel}`;
  };

  const calculateTotal = () => {
    let total = 49 + (selectedSubType.price * workerCount);
    if (urgency === 'instant') total += (30 * workerCount);
    return total;
  };

  const bookWorker = (worker) => {
    const pin = customerProfile.securityPin;
    setSelectedWorker(worker);
    setGeneratedPin(pin);
    
    addRequest({
      status: 'active',
      type: selectedCategory.label,
      subType: selectedSubType.label,
      worker: { name: worker.name, phone: worker.phone },
      workerCount: workerCount,
      pin: pin,
      eta: urgency === 'standard' ? formatTimeWindow() : worker.eta,
      price: calculateTotal(),
      date: new Date().toISOString()
    });
    
    setStep(5);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Breadcrumbs */}
      {step > 1 && step < 5 && (
        <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex items-center text-sm font-medium text-slate-500 overflow-x-auto whitespace-nowrap">
          <span className="cursor-pointer hover:text-blue-600" onClick={() => setStep(1)}>Categories</span>
          <ChevronRight className="w-4 h-4 mx-2 text-slate-400 shrink-0" />
          <span className={step === 2 ? 'text-slate-900 font-bold' : 'cursor-pointer hover:text-blue-600'} onClick={() => step > 2 && setStep(2)}>
            {selectedCategory.label}
          </span>
          {step > 2 && (
            <>
              <ChevronRight className="w-4 h-4 mx-2 text-slate-400 shrink-0" />
              <span className={step === 3 ? 'text-slate-900 font-bold' : 'cursor-pointer hover:text-blue-600'} onClick={() => step > 3 && setStep(3)}>
                Problem Details
              </span>
            </>
          )}
          {step > 3 && (
            <>
              <ChevronRight className="w-4 h-4 mx-2 text-slate-400 shrink-0" />
              <span className="text-slate-900 font-bold">Select Worker</span>
            </>
          )}
        </div>
      )}

      <div className="p-6">
        {step === 1 && (
          <div className="flex flex-col gap-8">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-64 h-64 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-64 h-64 bg-indigo-300 rounded-full blur-3xl"></div>
              </div>
              <div className="relative z-10 flex flex-col items-start gap-4">
                <div className="animate-pulse inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold border border-white/20 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-green-400"></span> 18 Verified Pros Online in Sector 4, Pune
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">Instant Home Utility Help, <br/>Dispatched in 20 Minutes.</h1>
                  <p className="text-blue-100 font-medium text-sm md:text-base max-w-xl">Hyperlocal verified tradespeople at fair transparent rates. No corporate markups, no waiting.</p>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">Choose a Service Category</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {CATEGORIES.map((cat, idx) => {
                  const Icon = cat.icon;
                  return (
                    <div 
                      key={cat.id} 
                      onClick={() => handleCategorySelect(cat)}
                      className="group relative border border-slate-200/80 bg-white rounded-2xl p-5 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer overflow-hidden"
                    >
                      {idx < 2 && (
                        <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-bl-lg">
                          ⚡ 20 Min Dispatch
                        </div>
                      )}
                      <div className="flex justify-between items-start mb-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${cat.bg} ${cat.color} group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-inner`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                      <h3 className="font-bold text-slate-900 mb-1.5 text-lg">{cat.label}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-semibold text-slate-600 flex items-center bg-slate-100 px-1.5 py-0.5 rounded">★ 4.9 (420+)</span>
                      </div>
                      <div className="inline-block bg-blue-50 text-blue-700 text-xs font-bold px-2 py-1 rounded-md border border-blue-100">
                        From ₹{cat.price}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

          </div>
        )}

        {step === 2 && (
          <div>
            <button onClick={() => setStep(1)} className="flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-1" /> Back to Categories
            </button>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Select {selectedCategory.label} Service</h2>
            <div className="space-y-3">
              {SUB_TYPES[selectedCategory.id]?.map(sub => (
                <div 
                  key={sub.id} 
                  onClick={() => handleSubTypeSelect(sub)}
                  className="flex justify-between items-center p-4 border border-slate-200 rounded-xl cursor-pointer hover:border-blue-500 hover:shadow-sm transition-all bg-white"
                >
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">{sub.label}</h3>
                    <div className="flex items-center text-xs text-slate-500 font-medium">
                      <Clock className="w-3 h-3 mr-1" /> {sub.time}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-blue-600">₹{sub.price}</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wide">Base Price</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <button onClick={() => setStep(2)} className="flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-1" /> Back to Sub-Types
            </button>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Service Details</h2>
            
            <div className="mb-6">
              <label className="block text-sm font-bold text-slate-700 mb-2">Number of workers required</label>
              <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-xl p-2 w-fit">
                <button onClick={() => setWorkerCount(Math.max(1, workerCount - 1))} className="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer">-</button>
                <span className="font-bold text-slate-800 text-lg w-4 text-center">{workerCount}</span>
                <button onClick={() => setWorkerCount(workerCount + 1)} className="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer">+</button>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold text-slate-700 mb-2">Describe the issue (optional)</label>
              <textarea 
                className="w-full border border-slate-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                rows={3}
                placeholder="Describe specific issues, parts needed, or special instructions..."
                value={problemDesc}
                onChange={e => setProblemDesc(e.target.value)}
              />
              <div className="mt-3 flex items-center justify-between border border-dashed border-slate-300 rounded-xl p-4 bg-slate-50 hover:bg-slate-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 shadow-sm">
                    <Camera className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-700">Add Photo/Video</div>
                    <div className="text-xs text-slate-500">Helps workers understand the problem</div>
                  </div>
                </div>
                <label className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 cursor-pointer shadow-sm hover:shadow transition-all">
                  Upload
                  <input type="file" className="hidden" accept="image/*,video/*" />
                </label>
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-bold text-slate-700 mb-2">Urgency & Dispatch</label>
              <div className="space-y-3">
                <label className={`flex items-start p-3 border rounded-xl cursor-pointer transition-colors ${urgency === 'standard' ? 'border-blue-600 bg-blue-50/50' : 'border-slate-200 hover:bg-slate-50'}`}>
                  <input type="radio" name="urgency" checked={urgency === 'standard'} onChange={() => setUrgency('standard')} className="mt-1 mr-3 text-blue-600" />
                  <div className="w-full">
                    <div className="font-bold text-slate-900">Standard Scheduled</div>
                    <div className="text-xs text-slate-500 mt-0.5">Arrives today at selected slot</div>
                    {urgency === 'standard' && (
                      <div className="mt-3 flex flex-col gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Select Date</label>
                          <input 
                            type="date" 
                            className="w-full border border-slate-300 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            min={new Date().toISOString().slice(0, 10)}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Select 1-Hour Time Window</label>
                          <select 
                            className="w-full border border-slate-300 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                            value={selectedTimeSlot}
                            onChange={(e) => setSelectedTimeSlot(e.target.value)}
                          >
                            <option value="" disabled>Choose a time slot (e.g. 2 PM - 3 PM)</option>
                            {TIME_SLOTS.map(slot => (
                              <option key={slot.value} value={slot.value}>{slot.label}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}
                  </div>
                </label>
                <label className={`flex items-start p-3 border rounded-xl cursor-pointer transition-colors ${urgency === 'instant' ? 'border-blue-600 bg-blue-50/50' : 'border-slate-200 hover:bg-slate-50'}`}>
                  <input type="radio" name="urgency" checked={urgency === 'instant'} onChange={() => setUrgency('instant')} className="mt-1 mr-3 text-blue-600" />
                  <div>
                    <div className="font-bold text-slate-900 flex items-center gap-2">
                      Instant / Emergency 
                      <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-bold uppercase">+₹30 Surge</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">Worker dispatched immediately, arrives in 25–35 mins</div>
                  </div>
                </label>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6">
              <h4 className="font-bold text-slate-900 mb-3 text-sm border-b border-slate-200 pb-2">Bill Details</h4>
              <div className="flex justify-between text-sm text-slate-600 mb-2">
                <span>Inspection / Base Fee</span>
                <span>₹49</span>
              </div>
              <div className="flex justify-between text-sm text-slate-600 mb-2">
                <span>Service Cost ({selectedSubType.label})</span>
                <span>₹{selectedSubType.price}</span>
              </div>
              {urgency === 'instant' && (
                <div className="flex justify-between text-sm text-red-600 mb-2">
                  <span>Emergency Surge</span>
                  <span>+₹30</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-slate-900 text-lg border-t border-slate-200 pt-2 mt-2">
                <span>Total Payable</span>
                <span>₹{calculateTotal()}</span>
              </div>
              <div className="mt-4">
                {!showGlobalOffer ? (
                  <button 
                    onClick={() => setShowGlobalOffer(true)}
                    className="w-full text-slate-600 bg-slate-100 hover:bg-slate-200 text-sm font-bold py-2 rounded-lg transition-colors border border-slate-200 flex items-center justify-center gap-2"
                  >
                    <IndianRupee className="w-4 h-4" /> Offer Custom Price
                  </button>
                ) : (
                  <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-2 animate-fade-in">
                    <div className="relative flex-1">
                      <IndianRupee className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input 
                        type="number" 
                        value={offerPrice} 
                        onChange={e => setOfferPrice(e.target.value)} 
                        className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all" 
                        placeholder="Enter your price" 
                      />
                    </div>
                    <button 
                      onClick={() => { alert('Custom offer broadcasted to nearby workers!'); setShowGlobalOffer(false); setOfferPrice(''); }} 
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-sm whitespace-nowrap"
                    >
                      Broadcast Offer
                    </button>
                  </div>
                )}
              </div>
            </div>

            <button 
              onClick={() => {
                setIsScanning(true);
                setStep(4);
                setTimeout(() => setIsScanning(false), 1500);
              }}
              disabled={urgency === 'standard' && (!selectedDate || !selectedTimeSlot)}
              className={`w-full text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 ${
                (urgency === 'standard' && (!selectedDate || !selectedTimeSlot)) 
                  ? 'bg-slate-300 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              Find Nearby Available Workers <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {step === 4 && (
          <div>
            <button onClick={() => setStep(3)} className="flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-1" /> Back to Details
            </button>
            
            {isScanning ? (
              <div className="py-16 flex flex-col items-center justify-center text-center">
                <div className="relative w-24 h-24 mb-6">
                  <div className="absolute inset-0 bg-blue-200 rounded-full animate-ping opacity-75"></div>
                  <div className="absolute inset-2 bg-blue-400 rounded-full animate-ping opacity-50 animation-delay-150"></div>
                  <div className="absolute inset-4 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/50">
                    <Navigation className="w-8 h-8 text-white animate-pulse" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Scanning 2 km radius in Pune Sector 4</h3>
                <p className="text-sm font-medium text-slate-500 max-w-xs animate-pulse">Contacting available verified technicians for {selectedSubType.label}...</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 mb-1">Available {selectedCategory.label}s</h2>
                    <p className="text-sm text-slate-500 font-medium">Select a worker to confirm your booking.</p>
                  </div>
                  <div className="bg-green-50 text-green-700 border border-green-200 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 animate-pulse">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Live
                  </div>
                </div>

                <div className="space-y-4">
                  {WORKERS.map(worker => (
                    <div key={worker.id} className="group border border-slate-200 rounded-2xl p-5 bg-white hover:shadow-lg hover:border-blue-300 transition-all duration-300">
                      <div className="flex flex-col md:flex-row gap-5 justify-between items-start md:items-center">
                      <div className="flex gap-4 items-start md:items-center w-full md:w-auto">
                        <div className="relative">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex-shrink-0 flex items-center justify-center text-blue-600 font-black text-2xl shadow-inner border border-blue-200/50">
                            {worker.name.charAt(0)}
                          </div>
                          <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1 rounded-full border-2 border-white shadow-sm" title="ID Verified">
                            <ShieldCheck className="w-3 h-3" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-slate-900 text-lg">{worker.name}</h3>
                            <span className="bg-blue-50 text-blue-600 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider border border-blue-100">Top Rated 2026</span>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-medium mb-2">
                            <span className="flex items-center bg-slate-100 px-2 py-0.5 rounded text-slate-700"><Star className="w-3 h-3 text-amber-500 mr-1 fill-amber-500" /> {worker.rating} ({worker.jobs} jobs)</span>
                            <span className="flex items-center text-slate-500"><Shield className="w-3 h-3 mr-1" /> Police Cleared</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md inline-flex border border-emerald-100">
                            <MapPin className="w-3 h-3 animate-bounce" /> {worker.distance} away • Arrives in ~{worker.eta}
                          </div>
                        </div>
                      </div>
                      <div className="w-full md:w-auto flex flex-col md:items-end gap-3 border-t md:border-t-0 border-slate-100 pt-4 md:pt-0 mt-2 md:mt-0">
                        <div className="text-sm font-bold text-slate-800 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 inline-block text-center w-full md:w-auto">
                          Standard Rate: ₹{calculateTotal()} Base
                        </div>
                        <div className="flex flex-wrap gap-2 w-full md:w-auto justify-end">
                          <button onClick={() => { setActiveChatWorker(activeChatWorker === worker.id ? null : worker.id); setActiveOfferWorker(null); }} className="flex-1 md:flex-none text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 hover:text-blue-600 text-sm font-bold py-2.5 px-3 rounded-xl transition-colors text-center shadow-sm flex items-center justify-center gap-1">
                            <MessageSquare className="w-4 h-4" /> Chat
                          </button>
                          <button onClick={() => { setActiveOfferWorker(activeOfferWorker === worker.id ? null : worker.id); setActiveChatWorker(null); }} className="flex-1 md:flex-none text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 hover:text-green-600 text-sm font-bold py-2.5 px-3 rounded-xl transition-colors text-center shadow-sm flex items-center justify-center gap-1">
                            <IndianRupee className="w-4 h-4" /> Offer Price
                          </button>
                          <button 
                            onClick={() => bookWorker(worker)}
                            className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-xl transition-all hover:shadow-lg hover:shadow-blue-600/30 text-sm text-center flex items-center justify-center gap-2 group-hover:scale-[1.02]"
                          >
                            <Zap className="w-4 h-4 fill-current" /> Quick Book
                          </button>
                        </div>
                      </div>
                      
                      {activeChatWorker === worker.id && (
                        <div className="mt-5 pt-4 border-t border-slate-100 w-full animate-fade-in">
                          <div className="bg-slate-50 p-4 rounded-xl mb-3 h-32 overflow-y-auto flex flex-col">
                            {chatLog.length === 0 ? (
                              <div className="text-xs text-slate-400 text-center my-auto">Start a conversation with {worker.name}</div>
                            ) : (
                              chatLog.map((msg, i) => (
                                <div key={i} className="text-sm bg-blue-100 text-blue-900 p-2.5 rounded-xl rounded-br-sm self-end mb-2 max-w-[80%] shadow-sm">
                                  {msg}
                                </div>
                              ))
                            )}
                          </div>
                          <div className="flex gap-2">
                            <input 
                              type="text" 
                              value={chatMessage} 
                              onChange={e => setChatMessage(e.target.value)} 
                              onKeyDown={e => { if (e.key === 'Enter' && chatMessage) { setChatLog([...chatLog, chatMessage]); setChatMessage(''); } }}
                              className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" 
                              placeholder="Type a message..." 
                            />
                            <button 
                              onClick={() => { if(chatMessage) { setChatLog([...chatLog, chatMessage]); setChatMessage(''); } }} 
                              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-sm"
                            >
                              Send
                            </button>
                          </div>
                        </div>
                      )}

                      {activeOfferWorker === worker.id && (
                        <div className="mt-5 pt-4 border-t border-slate-100 w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-3 animate-fade-in">
                          <div className="relative flex-1">
                            <IndianRupee className="w-4 h-4 text-slate-400 absolute left-4 top-3" />
                            <input 
                              type="number" 
                              value={offerPrice} 
                              onChange={e => setOfferPrice(e.target.value)} 
                              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all" 
                              placeholder="Enter your price" 
                            />
                          </div>
                          <button 
                            onClick={() => { alert('Offer sent to ' + worker.name + '!'); setActiveOfferWorker(null); setOfferPrice(''); }} 
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-sm whitespace-nowrap"
                          >
                            Submit Offer
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {step === 5 && (
          <div className="text-center py-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-green-50">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Booking Confirmed!</h2>
            <div className="inline-block bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-full text-sm mb-6 animate-pulse">
              Worker Dispatched • On the Way
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-blue-950 p-6 max-w-sm mx-auto mb-6 relative overflow-hidden rounded-2xl shadow-xl border border-blue-500/30">
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <Lock className="w-32 h-32 text-blue-400" />
              </div>
              <div className="relative z-10">
                <p className="text-xs font-bold text-blue-300 uppercase tracking-[0.2em] mb-4 flex items-center justify-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> Security PIN
                </p>
                <div className="flex justify-center gap-3 mb-6">
                  {generatedPin?.split('').map((digit, i) => (
                    <div key={i} className="w-12 h-14 bg-slate-800/80 backdrop-blur border border-blue-500/40 rounded-xl flex items-center justify-center text-3xl font-mono font-bold text-white shadow-inner">
                      {digit}
                    </div>
                  ))}
                </div>
                <div className="bg-red-500/10 text-red-200 text-[11px] p-3 rounded-lg border border-red-500/20 text-left flex gap-2.5 font-medium leading-relaxed">
                  <AlertTriangle className="w-5 h-5 shrink-0 text-red-400 mt-0.5" />
                  <p>Never share this PIN until the work is completely done and inspected by you.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 max-w-sm mx-auto">
              <a 
                href={`tel:${selectedWorker.phone}`}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" /> Call {selectedWorker.name} ({selectedWorker.phone || '9988776655'})
              </a>
              <button 
                onClick={() => setActiveTab('requests')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors"
              >
                View in My Requests
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
