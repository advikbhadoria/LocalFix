import React, { useState, useMemo } from 'react';
import {
  Wrench,
  Hammer,
  Zap,
  Utensils,
  Sparkles,
  ShieldCheck,
  Star,
  Clock,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  ArrowLeft,
  ArrowRight,
  X,
  ChevronRight,
  ChevronDown,
  Search,
  AlertCircle,
  ThumbsUp,
  MessageSquare,
  Calendar,
  Check,
  Plus,
  RefreshCw,
  UserCheck,
  Home,
  Briefcase,
  Receipt,
  FileText,
  Award,
  Flame,
  Info,
  SlidersHorizontal,
  Tv,
  PhoneCall,
  Lock,
  Tag,
  Share2
} from 'lucide-react';

// --- MOCK DATABASE & CONFIGURATION ---

const CATEGORIES = [
  {
    id: 'plumber',
    name: 'Plumber',
    icon: Wrench,
    tagline: 'Taps, pipes, leakage & flush tanks',
    startingPrice: 149,
    badge: 'Popular',
    color: 'blue',
    problems: [
      { id: 'p1', title: 'Tap Leakage & Washer Replacement', price: 149, time: '30 mins', desc: 'Fix dripping taps, spindle change, or new washer installation' },
      { id: 'p2', title: 'Flush Tank / Cistern Mechanism Repair', price: 249, time: '45 mins', desc: 'Fix continuous water flow, float valve, or syphon replacement' },
      { id: 'p3', title: 'Blocked Sink / Drain Cleaning', price: 299, time: '45 mins', desc: 'Rapid clearing of choked kitchen sinks, basins, or floor drains' },
      { id: 'p4', title: 'Full Pipeline Fitting & Overhaul', price: 599, time: '90 mins', desc: 'PPR/CPVC pipe joint repair, concealed leakage troubleshooting' }
    ]
  },
  {
    id: 'electrician',
    name: 'Electrician',
    icon: Zap,
    tagline: 'Wiring, switches, fans & MCB issues',
    startingPrice: 129,
    badge: 'Fast ETA',
    color: 'amber',
    problems: [
      { id: 'e1', title: 'Switchboard & Socket Repair', price: 129, time: '30 mins', desc: 'Repair loose connections, modular socket replacement, or switch spark' },
      { id: 'e2', title: 'Ceiling Fan Installation & Repair', price: 179, time: '40 mins', desc: 'Capacitor replacement, regulator fix, wobble alignment, or fresh mounting' },
      { id: 'e3', title: 'MCB Tripping & Short Circuit Diagnostic', price: 299, time: '50 mins', desc: 'Complete distribution box testing & short circuit isolation' },
      { id: 'e4', title: 'Complete Room Rewiring Inspection', price: 499, time: '90 mins', desc: 'Thermal inspection of wiring conduits and load balance check' }
    ]
  },
  {
    id: 'carpenter',
    name: 'Carpenter',
    icon: Hammer,
    tagline: 'Locks, hinges, door alignment & furniture',
    startingPrice: 199,
    badge: null,
    color: 'emerald',
    problems: [
      { id: 'c1', title: 'Door Lock & Handle Replacement', price: 199, time: '30 mins', desc: 'Mortise lock, cylindrical knob, or deadbolt installation & alignment' },
      { id: 'c2', title: 'Cabinet Hinges & Channel Alignment', price: 249, time: '45 mins', desc: 'Hydraulic soft-close hinge fitting & drawer telescopic slider fix' },
      { id: 'c3', title: 'Furniture Assembly & Structural Repair', price: 399, time: '60 mins', desc: 'Bed, wardrobe, bookshelf assembly or reinforcement of wobbling chairs' },
      { id: 'c4', title: 'Custom Wood Trimming & Door Shaving', price: 499, time: '75 mins', desc: 'Floor rubbing door shave, weather strip fitting, and wooden framing' }
    ]
  },
  {
    id: 'cook',
    name: 'Cook / Tiffin',
    icon: Utensils,
    tagline: 'Daily meals, domestic cooking & meal prep',
    startingPrice: 249,
    badge: 'Chef Choice',
    color: 'rose',
    problems: [
      { id: 'k1', title: 'One-Time Meal Prep (North/South Indian)', price: 249, time: '60 mins', desc: 'Fresh 3-course meal prepared at your kitchen (Roti, Sabzi, Dal, Rice)' },
      { id: 'k2', title: 'Party / Small Gathering Bulk Cooking', price: 699, time: '120 mins', desc: 'Special menu for up to 8–10 guests with appetizers & mains' },
      { id: 'k3', title: 'Weekly Healthy Meal Prep Assistant', price: 499, time: '90 mins', desc: 'Batch prep of gravies, chopped veggies, marinations & boiled lentils' },
      { id: 'k4', title: 'Diet / Custom Fitness Menu Preparation', price: 349, time: '60 mins', desc: 'High-protein, low-carb, or keto meal prep according to diet chart' }
    ]
  },
  {
    id: 'maid',
    name: 'House Help / Maid',
    icon: Sparkles,
    tagline: 'Floor cleaning, dusting & utensils',
    startingPrice: 199,
    badge: 'Popular',
    color: 'purple',
    problems: [
      { id: 'm1', title: 'Deep Kitchen Dusting & Utensils Scrub', price: 199, time: '60 mins', desc: 'Grease removal on counters, dish sink deep cleaning & utensil sparkle' },
      { id: 'm2', title: 'Full 2BHK Floor Mopping & Dusting', price: 299, time: '90 mins', desc: 'Sweeping, chemical mopping, window sill wiping & sofa vacuuming' },
      { id: 'm3', title: 'Bathroom Deep Anti-Bacterial Scrubbing', price: 249, time: '60 mins', desc: 'Tile de-scaling, WC bowl sanitation, tap descaling & mirror polishing' },
      { id: 'm4', title: 'Complete Home Festival Deep Cleaning', price: 599, time: '150 mins', desc: 'Full-house intensive cleaning including fans, corners, and behind furniture' }
    ]
  },
  {
    id: 'appliance',
    name: 'Appliance Repair',
    icon: Tv,
    tagline: 'AC, refrigerator, washing machine & microwave',
    startingPrice: 299,
    badge: 'Certified',
    color: 'indigo',
    problems: [
      { id: 'a1', title: 'AC Filter Deep Clean & Gas Diagnostic', price: 399, time: '45 mins', desc: 'Jet pump foam wash of indoor coil, condenser wash & gas pressure test' },
      { id: 'a2', title: 'Washing Machine Spin / Drain Repair', price: 299, time: '60 mins', desc: 'Drain pump unclogging, belt tensioning, suspension & motor testing' },
      { id: 'a3', title: 'Refrigerator Cooling & Thermostat Fix', price: 349, time: '45 mins', desc: 'Defrost timer inspection, relay replacement, and coil de-icing' },
      { id: 'a4', title: 'Microwave / OTG Heating Coil Repair', price: 299, time: '45 mins', desc: 'Magnetron diagnosis, fuse swap, diode check, and turntable motor fix' }
    ]
  }
];

const MOCK_WORKERS = {
  plumber: [
    {
      id: 'w-p1',
      name: 'Ramesh Kumar',
      avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80',
      rating: 4.8,
      jobsCount: 142,
      experience: '7+ Years Exp.',
      distance: '1.2 km away',
      eta: '18 mins',
      badges: ['Sanitary Fitting', 'Rapid Drain Repair'],
      languages: ['Hindi', 'English', 'Marathi'],
      idVerified: true,
      policeVerified: true,
      phone: '+91 98210 44921',
      reviews: [
        { author: 'Vikram Mehta', rating: 5, date: '2 days ago', comment: 'Ramesh arrived within 15 minutes. Solved a tough cistern leakage that two other plumbers failed to fix.' },
        { author: 'Pooja Iyer', rating: 5, date: '1 week ago', comment: 'Very professional and tidy. Brought his own spare washers and left the bathroom spotless.' },
        { author: 'Gaurav Patil', rating: 4, date: '3 weeks ago', comment: 'Courteous and charged exactly what was shown in the PocketHelp app.' }
      ]
    },
    {
      id: 'w-p2',
      name: 'Santosh Shinde',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      rating: 4.9,
      jobsCount: 210,
      experience: '9+ Years Exp.',
      distance: '2.1 km away',
      eta: '25 mins',
      badges: ['Master Plumber', 'Concealed Leaks'],
      languages: ['Hindi', 'Marathi'],
      idVerified: true,
      policeVerified: true,
      phone: '+91 98223 91022',
      reviews: [
        { author: 'Deepak Joshi', rating: 5, date: 'Yesterday', comment: 'Top-tier master plumber. He diagnosed a concealed wall dampness issue quickly.' },
        { author: 'Sunita Rao', rating: 5, date: '2 weeks ago', comment: 'Punctual, polite, and very reasonable. Highly recommend Santosh.' }
      ]
    }
  ],
  electrician: [
    {
      id: 'w-e1',
      name: 'Amit Verma',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      rating: 4.9,
      jobsCount: 189,
      experience: '8+ Years Exp.',
      distance: '0.8 km away',
      eta: '12 mins',
      badges: ['Certified Wireman', 'MCB Specialist'],
      languages: ['Hindi', 'English'],
      idVerified: true,
      policeVerified: true,
      phone: '+91 98234 11029',
      reviews: [
        { author: 'Rohit Kulkarni', rating: 5, date: '3 days ago', comment: 'Amit replaced my main MCB board quickly after a heavy short circuit. Extremely safe & knowledgeable.' },
        { author: 'Kavita Menon', rating: 5, date: '1 week ago', comment: 'Fixed 3 sparking switches in under 20 minutes. Polite and neat!' }
      ]
    },
    {
      id: 'w-e2',
      name: 'Pravin Jadhav',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      rating: 4.7,
      jobsCount: 96,
      experience: '5+ Years Exp.',
      distance: '1.9 km away',
      eta: '22 mins',
      badges: ['Fan Expert', 'Inverter Wiring'],
      languages: ['Hindi', 'Marathi'],
      idVerified: true,
      policeVerified: true,
      phone: '+91 97300 81290',
      reviews: [
        { author: 'Meera Deshmukh', rating: 5, date: '4 days ago', comment: 'Balanced a heavy ceiling fan that was vibrating terribly. Now it is silent.' }
      ]
    }
  ],
  carpenter: [
    {
      id: 'w-c1',
      name: 'Jagdish Suthar',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
      rating: 4.9,
      jobsCount: 165,
      experience: '10+ Years Exp.',
      distance: '1.5 km away',
      eta: '20 mins',
      badges: ['Godrej Lock Expert', 'Modular Cabinets'],
      languages: ['Hindi', 'Gujarati', 'English'],
      idVerified: true,
      policeVerified: true,
      phone: '+91 98112 55901',
      reviews: [
        { author: 'Arjun Sen', rating: 5, date: '5 days ago', comment: 'Installed a new biometric main door lock flawlessly. True craftsman.' }
      ]
    }
  ],
  cook: [
    {
      id: 'w-k1',
      name: 'Sunita Devi',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      rating: 4.9,
      jobsCount: 230,
      experience: '6+ Years Exp.',
      distance: '1.1 km away',
      eta: '15 mins',
      badges: ['Homestyle Thali', 'Hygiene Certified'],
      languages: ['Hindi', 'Bhojpuri', 'English'],
      idVerified: true,
      policeVerified: true,
      phone: '+91 98901 77123',
      reviews: [
        { author: 'Advik Sharma', rating: 5, date: 'Last month', comment: 'Incredible homestyle food! Made soft chapatis, dal tadka, and bhindi fry just like home.' }
      ]
    }
  ],
  maid: [
    {
      id: 'w-m1',
      name: 'Anita Kamble',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      rating: 4.8,
      jobsCount: 310,
      experience: '5+ Years Exp.',
      distance: '0.9 km away',
      eta: '10 mins',
      badges: ['Deep Sanitation', 'Eco-Friendly Cleaning'],
      languages: ['Hindi', 'Marathi'],
      idVerified: true,
      policeVerified: true,
      phone: '+91 99221 44556',
      reviews: [
        { author: 'Neha Gupta', rating: 5, date: '6 days ago', comment: 'Anita did an extraordinary job on our kitchen tiles and chimney area!' }
      ]
    }
  ],
  appliance: [
    {
      id: 'w-a1',
      name: 'Suresh Patil',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
      rating: 4.8,
      jobsCount: 175,
      experience: '8+ Years Exp.',
      distance: '1.7 km away',
      eta: '22 mins',
      badges: ['HVAC Certified', 'Inverter AC Pro'],
      languages: ['Hindi', 'English', 'Marathi'],
      idVerified: true,
      policeVerified: true,
      phone: '+91 98810 33499',
      reviews: [
        { author: 'Rajesh Nambiar', rating: 5, date: '1 week ago', comment: 'Saved me from buying a new compressor. Suresh found the faulty capacitor in 10 mins.' }
      ]
    }
  ]
};

// Initial state data
const INITIAL_REQUESTS = [
  {
    id: 'REQ-8821',
    category: 'Electrician',
    problem: 'Switchboard & Socket Repair',
    problemDesc: 'Switchboard sparking and loose connection in Master Bedroom',
    worker: {
      name: 'Amit Verma',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      rating: 4.9,
      phone: '+91 98234 11029',
      category: 'Electrician'
    },
    pin: '3912',
    status: 'on_the_way', // 'on_the_way', 'arrived', 'in_progress', 'completed', 'cancelled'
    statusText: 'Worker Dispatched • On the Way (ETA: 12 mins)',
    urgency: 'standard',
    scheduledTime: 'Today, 12:15 PM',
    address: 'Flat 304, Tower B, Silver Crest Heights, Ward 12, Pune',
    visitationFee: 49,
    serviceCost: 129,
    urgencyFee: 0,
    total: 178,
    bookedAt: 'Today, 11:45 AM',
    rating: null,
    reviewText: null,
    reviewTags: []
  },
  {
    id: 'REQ-7402',
    category: 'Plumber',
    problem: 'Tap Leakage & Washer Replacement',
    problemDesc: 'Kitchen sink faucet dripping continuously',
    worker: {
      name: 'Ramesh Kumar',
      avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80',
      rating: 4.8,
      phone: '+91 98210 44921',
      category: 'Plumber'
    },
    pin: '5821',
    status: 'completed',
    statusText: 'Completed',
    urgency: 'standard',
    scheduledTime: '28 Sep 2024, 03:15 PM',
    address: 'Flat 304, Tower B, Silver Crest Heights, Ward 12, Pune',
    visitationFee: 49,
    serviceCost: 149,
    urgencyFee: 0,
    total: 198,
    bookedAt: '28 Sep 2024, 02:30 PM',
    rating: 5,
    reviewText: 'Ramesh arrived within 20 minutes and fixed both bathroom taps very cleanly. Highly recommended!',
    reviewTags: ['Punctual', 'Clean Work', 'Fair Price']
  },
  {
    id: 'REQ-7190',
    category: 'Appliance Repair',
    problem: 'AC Filter Deep Clean & Gas Diagnostic',
    problemDesc: 'Split AC not cooling adequately in living room',
    worker: {
      name: 'Suresh Patil',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
      rating: 4.8,
      phone: '+91 98810 33499',
      category: 'Appliance Repair'
    },
    pin: '8490',
    status: 'completed',
    statusText: 'Completed',
    urgency: 'emergency',
    scheduledTime: '24 Sep 2024, 05:00 PM',
    address: 'Flat 304, Tower B, Silver Crest Heights, Ward 12, Pune',
    visitationFee: 49,
    serviceCost: 399,
    urgencyFee: 50,
    total: 498,
    bookedAt: '24 Sep 2024, 04:10 PM',
    rating: null,
    reviewText: null,
    reviewTags: []
  }
];

export default function CustomerDashboard() {
  // Navigation tabs: 'book' | 'requests' | 'profile'
  const [activeTab, setActiveTab] = useState('book');

  // Booking Flow Steps: 'categories' | 'problems' | 'workers' | 'confirmed'
  const [bookingStep, setBookingStep] = useState('categories');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [customProblemText, setCustomProblemText] = useState('');
  const [urgencyType, setUrgencyType] = useState('standard'); // 'standard' or 'emergency'
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [latestConfirmedTicket, setLatestConfirmedTicket] = useState(null);
  const [categorySearchQuery, setCategorySearchQuery] = useState('');

  // Requests state
  const [requestsList, setRequestsList] = useState(INITIAL_REQUESTS);
  const [requestsSubTab, setRequestsSubTab] = useState('active'); // 'active' | 'completed'

  // Modals state
  const [reviewModalWorker, setReviewModalWorker] = useState(null); // For Step D review modal in booking
  const [rateModalTicket, setRateModalTicket] = useState(null); // For Section 3 Rating Modal
  const [ratingStars, setRatingStars] = useState(5);
  const [ratingHover, setRatingHover] = useState(5);
  const [selectedTags, setSelectedTags] = useState(['Punctual', 'Clean Work']);
  const [reviewComment, setReviewComment] = useState('');

  // Profile modals
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isAddressesModalOpen, setIsAddressesModalOpen] = useState(false);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [callModalData, setCallModalData] = useState(null);
  const [invoiceModalTicket, setInvoiceModalTicket] = useState(null);

  // User details state
  const [userProfile, setUserProfile] = useState({
    name: 'Advik Sharma',
    phone: '+91 98765 43210',
    email: 'advik.sharma@example.com',
    primaryAddress: 'Flat 304, Tower B, Silver Crest Heights, Ward 12, Pune',
    joinedOn: 'Member since August 2024',
    rating: '4.9',
    outstandingBalance: 0
  });

  const [savedAddresses, setSavedAddresses] = useState([
    { id: 'addr-1', label: 'Home (Default)', tag: 'Home', address: 'Flat 304, Tower B, Silver Crest Heights, Ward 12, Pune - 411045', isDefault: true },
    { id: 'addr-2', label: 'Office / Tech Park', tag: 'Work', address: 'Floor 4, Cyber City Phase 2, Kharadi, Pune - 411014', isDefault: false },
    { id: 'addr-3', label: "Parents' Apartment", tag: 'Family', address: 'B-12, Green Acres Society, Aundh, Pune - 411007', isDefault: false }
  ]);

  const [selectedLocation, setSelectedLocation] = useState('Pune • Sector 4');
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);

  // Active requests count
  const activeRequestsCount = useMemo(() => {
    return requestsList.filter(r => r.status !== 'completed' && r.status !== 'cancelled').length;
  }, [requestsList]);

  // Pricing calculation
  const visitationFee = 49;
  const problemCost = selectedProblem ? selectedProblem.price : 0;
  const urgencyFee = urgencyType === 'emergency' ? 50 : 0;
  const totalPayable = visitationFee + problemCost + urgencyFee;

  // Filtered categories
  const filteredCategories = useMemo(() => {
    if (!categorySearchQuery.trim()) return CATEGORIES;
    const q = categorySearchQuery.toLowerCase();
    return CATEGORIES.filter(c => 
      c.name.toLowerCase().includes(q) || 
      c.tagline.toLowerCase().includes(q) ||
      c.problems.some(p => p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q))
    );
  }, [categorySearchQuery]);

  // Helpers for category actions
  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);
    setSelectedProblem(cat.problems[0]); // default to first problem
    setCustomProblemText('');
    setUrgencyType('standard');
    setBookingStep('problems');
  };

  const handleSelectProblem = (prob) => {
    setSelectedProblem(prob);
  };

  const handleProceedToWorkers = () => {
    if (!selectedProblem) return;
    setBookingStep('workers');
  };

  const handleConfirmBooking = (worker) => {
    const randomPin = Math.floor(1000 + Math.random() * 9000).toString();
    const newId = `REQ-${Math.floor(1000 + Math.random() * 9000)}`;
    
    const newTicket = {
      id: newId,
      category: selectedCategory ? selectedCategory.name : 'Home Service',
      problem: selectedProblem ? selectedProblem.title : 'General Repair',
      problemDesc: customProblemText.trim() || (selectedProblem ? selectedProblem.desc : 'Standard on-demand service request'),
      worker: {
        name: worker.name,
        avatar: worker.avatar,
        rating: worker.rating,
        phone: worker.phone,
        category: selectedCategory ? selectedCategory.name : 'Professional'
      },
      pin: randomPin,
      status: 'on_the_way',
      statusText: 'Worker Dispatched • On the Way (ETA: 18 mins)',
      urgency: urgencyType,
      scheduledTime: urgencyType === 'emergency' ? 'Immediate (Within 30 mins)' : 'Today, Scheduled',
      address: userProfile.primaryAddress,
      visitationFee: visitationFee,
      serviceCost: problemCost,
      urgencyFee: urgencyFee,
      total: totalPayable,
      bookedAt: 'Just now',
      rating: null,
      reviewText: null,
      reviewTags: []
    };

    setSelectedWorker(worker);
    setLatestConfirmedTicket(newTicket);
    setRequestsList(prev => [newTicket, ...prev]);
    setBookingStep('confirmed');
    setReviewModalWorker(null);
  };

  const handleOpenCallModal = (workerName, workerPhone) => {
    setCallModalData({ name: workerName, phone: workerPhone });
    setIsCallModalOpen(true);
  };

  const handleCancelRequest = (requestId) => {
    if (window.confirm('Are you sure you want to cancel this service request? No cancellation fee will be charged.')) {
      setRequestsList(prev => prev.map(req => {
        if (req.id === requestId) {
          return { ...req, status: 'cancelled', statusText: 'Cancelled by Customer' };
        }
        return req;
      }));
    }
  };

  // Quick helper to simulate completing an active job for demo purposes
  const handleMarkJobCompleted = (requestId) => {
    setRequestsList(prev => prev.map(req => {
      if (req.id === requestId) {
        return {
          ...req,
          status: 'completed',
          statusText: 'Completed',
          scheduledTime: 'Today, Completed'
        };
      }
      return req;
    }));
    setRequestsSubTab('completed');
  };

  // Rate & Review submission
  const handleOpenRateModal = (ticket) => {
    setRateModalTicket(ticket);
    setRatingStars(5);
    setRatingHover(5);
    setSelectedTags(['Punctual', 'Clean Work']);
    setReviewComment('');
  };

  const handleToggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!rateModalTicket) return;

    setRequestsList(prev => prev.map(req => {
      if (req.id === rateModalTicket.id) {
        return {
          ...req,
          rating: ratingStars,
          reviewText: reviewComment.trim() || 'Worker was professional and completed the task efficiently.',
          reviewTags: selectedTags
        };
      }
      return req;
    }));

    setRateModalTicket(null);
  };

  // Reset booking state to start fresh
  const handleResetBooking = () => {
    setSelectedCategory(null);
    setSelectedProblem(null);
    setCustomProblemText('');
    setUrgencyType('standard');
    setSelectedWorker(null);
    setLatestConfirmedTicket(null);
    setBookingStep('categories');
    setActiveTab('book');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased selection:bg-blue-100 selection:text-blue-900">
      
      {/* ========================================================================= */}
      {/* TOP NAVBAR */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            
            {/* Logo & Tagline */}
            <div className="flex items-center gap-4 cursor-pointer" onClick={() => setActiveTab('book')}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-blue-500 flex items-center justify-center text-white shadow-md shadow-blue-500/25 ring-2 ring-blue-100">
                <Zap className="w-5 h-5 fill-white text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black tracking-tight text-slate-900 font-display">
                    Pocket<span className="text-blue-600">Help</span>
                  </span>
                  <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                    Live Pune
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium hidden md:block">
                  Hyperlocal On-Demand Home Services
                </p>
              </div>
            </div>

            {/* Location Selector Pill */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors shadow-2xs"
              >
                <MapPin className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                <span className="truncate max-w-[130px] sm:max-w-none">{selectedLocation}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isLocationDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Location Dropdown Modal */}
              {isLocationDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Select Operational Hub
                  </div>
                  {[
                    'Pune • Sector 4 (Active)',
                    'Pune • Aundh & Baner',
                    'Pune • Kharadi IT Park',
                    'Pune • Viman Nagar',
                    'Pune • Kothrud Central'
                  ].map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => {
                        setSelectedLocation(loc.replace(' (Active)', ''));
                        setIsLocationDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium flex items-center justify-between transition-colors ${
                        selectedLocation.includes(loc.split(' • ')[1]?.split(' ')[0])
                          ? 'bg-blue-50 text-blue-700 font-semibold'
                          : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {loc}
                      </span>
                      {selectedLocation.includes(loc.split(' • ')[1]?.split(' ')[0]) && (
                        <Check className="w-3.5 h-3.5 text-blue-600" />
                      )}
                    </button>
                  ))}
                  <div className="mt-2 pt-2 border-t border-slate-100 px-2">
                    <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-medium">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      18 Dispatch Pros active in this sector
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Tabs (Desktop) & User Pill */}
            <div className="flex items-center gap-2 sm:gap-4">
              <nav className="hidden sm:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => setActiveTab('book')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'book'
                      ? 'bg-white text-blue-600 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Book a Service
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('requests')}
                  className={`relative px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeTab === 'requests'
                      ? 'bg-white text-blue-600 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>My Requests</span>
                  {activeRequestsCount > 0 && (
                    <span className="inline-flex items-center justify-center px-1.5 py-0.2 text-[10px] font-extrabold bg-blue-600 text-white rounded-full">
                      {activeRequestsCount}
                    </span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('profile')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'profile'
                      ? 'bg-white text-blue-600 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Profile
                </button>
              </nav>

              {/* User Pill */}
              <button
                type="button"
                onClick={() => setActiveTab('profile')}
                className="flex items-center gap-2.5 pl-1.5 pr-3 py-1 rounded-full bg-white hover:bg-slate-50 border border-slate-200 transition-colors shadow-2xs group"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                  AS
                </div>
                <div className="text-left hidden xs:block">
                  <div className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors flex items-center gap-1">
                    Advik
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Row */}
          <div className="sm:hidden flex items-center justify-between pb-3 pt-1 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setActiveTab('book')}
              className={`flex-1 text-center py-1.5 rounded-lg text-xs font-bold ${
                activeTab === 'book' ? 'bg-blue-50 text-blue-600' : 'text-slate-600'
              }`}
            >
              Book Service
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('requests')}
              className={`flex-1 text-center py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1 ${
                activeTab === 'requests' ? 'bg-blue-50 text-blue-600' : 'text-slate-600'
              }`}
            >
              Requests
              {activeRequestsCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center font-bold">
                  {activeRequestsCount}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('profile')}
              className={`flex-1 text-center py-1.5 rounded-lg text-xs font-bold ${
                activeTab === 'profile' ? 'bg-blue-50 text-blue-600' : 'text-slate-600'
              }`}
            >
              Profile
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* MAIN CONTENT AREA */}
      {/* ========================================================================= */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* ======================================================================= */}
        {/* SECTION 1: PROFILE TAB */}
        {/* ======================================================================= */}
        {activeTab === 'profile' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
            {/* Page Header */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Customer Profile
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Manage your account credentials, verified contact info, and saved delivery locations.
              </p>
            </div>

            {/* Main Profile Card */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="h-32 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 relative">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div className="absolute -bottom-10 left-6 sm:left-8">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white p-1.5 shadow-lg">
                    <div className="w-full h-full rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-2xl sm:text-3xl font-black shadow-inner">
                      AS
                    </div>
                  </div>
                </div>
                <div className="absolute right-4 sm:right-8 top-4 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-blue-800 shadow-xs backdrop-blur-xs">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    PocketHelp Plus Member
                  </span>
                </div>
              </div>

              {/* Profile Details */}
              <div className="pt-14 pb-8 px-6 sm:px-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h2 className="text-2xl font-bold text-slate-900">{userProfile.name}</h2>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Verified Customer
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {userProfile.joinedOn}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => setIsEditProfileOpen(true)}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 transition-colors flex items-center gap-1.5 shadow-2xs"
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      Edit Profile Information
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAddressesModalOpen(true)}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 transition-colors flex items-center gap-1.5 shadow-2xs"
                    >
                      <Home className="w-3.5 h-3.5 text-slate-500" />
                      Manage Saved Addresses
                    </button>
                  </div>
                </div>

                {/* Quick Contact & Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Phone Number</span>
                      <p className="text-sm font-semibold text-slate-800 mt-0.5">{userProfile.phone}</p>
                      <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-1 mt-0.5">
                        <Check className="w-3 h-3" /> OTP Verified
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Email Address</span>
                      <p className="text-sm font-semibold text-slate-800 mt-0.5 truncate max-w-[200px]">{userProfile.email}</p>
                      <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-1 mt-0.5">
                        <Check className="w-3 h-3" /> Primary Login
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3 sm:col-span-2 lg:col-span-1">
                    <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Primary Service Address</span>
                      <p className="text-xs font-medium text-slate-700 mt-0.5 line-clamp-2 leading-relaxed">
                        {userProfile.primaryAddress}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Stats Bar */}
                <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-sm grid grid-cols-3 gap-3 divide-x divide-slate-700/60 text-center">
                  <div>
                    <div className="text-xl sm:text-2xl font-black text-white">6</div>
                    <div className="text-[11px] font-medium text-slate-300 mt-0.5">Services Booked</div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-black text-amber-400 flex items-center justify-center gap-1">
                      <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                      4.9
                    </div>
                    <div className="text-[11px] font-medium text-slate-300 mt-0.5">Customer Rating</div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-black text-emerald-400">₹0</div>
                    <div className="text-[11px] font-medium text-slate-300 mt-0.5">Outstanding Balance</div>
                  </div>
                </div>

                {/* Service Guarantee Banner */}
                <div className="mt-6 p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div className="flex-1 text-xs">
                    <div className="font-bold text-blue-900">PocketHelp 30-Day Workmanship Warranty Active</div>
                    <p className="text-blue-700 mt-0.5">
                      All utility jobs completed via PocketHelp are covered with free re-visit insurance up to ₹10,000.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================================= */}
        {/* SECTION 2: BOOK A SERVICE (MULTI-STEP DISCOVERY & BOOKING FLOW) */}
        {/* ======================================================================= */}
        {activeTab === 'book' && (
          <div className="max-w-6xl mx-auto space-y-6">

            {/* STEP A: CATEGORY SELECTION GRID */}
            {bookingStep === 'categories' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                {/* Hero Banner */}
                <div className="relative rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 p-6 sm:p-10 text-white shadow-lg shadow-blue-500/10 overflow-hidden">
                  <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(#fff_2px,transparent_2px)] [background-size:24px_24px] pointer-events-none"></div>
                  <div className="relative z-10 max-w-2xl space-y-3">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/15 text-white backdrop-blur-xs border border-white/20">
                      <Flame className="w-3.5 h-3.5 text-amber-300" />
                      Instant Dispatch • Pune Sector 4
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
                      Expert Home Help, <br className="hidden sm:block" />
                      <span className="text-blue-200">Arrives at Your Doorstep in 30 Mins.</span>
                    </h1>
                    <p className="text-sm sm:text-base text-blue-100 font-medium">
                      Select a service category below to browse upfront rate cards and book police-verified nearby technicians.
                    </p>
                  </div>

                  {/* Search Bar inside Hero */}
                  <div className="mt-6 relative max-w-xl">
                    <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={categorySearchQuery}
                      onChange={(e) => setCategorySearchQuery(e.target.value)}
                      placeholder="Search for 'Plumber', 'Tap Leakage', 'Fan repair', 'Cook'..."
                      className="w-full pl-12 pr-10 py-3.5 bg-white rounded-2xl text-slate-900 text-sm font-medium shadow-md border-0 focus:ring-3 focus:ring-blue-300 outline-hidden placeholder:text-slate-400"
                    />
                    {categorySearchQuery && (
                      <button
                        type="button"
                        onClick={() => setCategorySearchQuery('')}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Section Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                      Available Service Categories
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                      Transparent standard pricing • Zero hidden inspection charges
                    </p>
                  </div>
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200">
                    6 Verified Verticals
                  </span>
                </div>

                {/* 6 Core Categories Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {filteredCategories.map((cat) => {
                    const IconComponent = cat.icon;
                    return (
                      <div
                        key={cat.id}
                        onClick={() => handleSelectCategory(cat)}
                        className="group relative bg-white hover:bg-slate-50/80 rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-200 cursor-pointer flex flex-col justify-between"
                      >
                        {cat.badge && (
                          <span className="absolute top-5 right-5 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                            {cat.badge}
                          </span>
                        )}

                        <div>
                          <div className="w-14 h-14 rounded-2xl bg-blue-50 group-hover:bg-blue-600 text-blue-600 group-hover:text-white flex items-center justify-center transition-all duration-200 shadow-xs">
                            <IconComponent className="w-7 h-7" />
                          </div>

                          <h3 className="text-lg font-bold text-slate-900 mt-4 group-hover:text-blue-600 transition-colors flex items-center gap-1.5">
                            {cat.name}
                          </h3>
                          <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                            {cat.tagline}
                          </p>
                        </div>

                        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                          <div>
                            <span className="text-[11px] text-slate-400 block font-medium">Starts from</span>
                            <span className="text-base font-black text-slate-900">₹{cat.startingPrice}</span>
                          </div>

                          <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-blue-600 group-hover:text-white text-slate-500 flex items-center justify-center transition-all">
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Trust Badges Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                  <div className="bg-white rounded-2xl p-4 border border-slate-200 flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">100% Background Verified</div>
                      <div className="text-[11px] text-slate-500">Aadhaar & Police check completed</div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-4 border border-slate-200 flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">30-45 Mins Fast Arrival</div>
                      <div className="text-[11px] text-slate-500">Live GPS tracking & security PIN</div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-4 border border-slate-200 flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
                      <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">4.8+ Rated Service Pros</div>
                      <div className="text-[11px] text-slate-500">Over 10,000+ happy homes served</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP B: SUB-SERVICE & PROBLEM SELECTION */}
            {bookingStep === 'problems' && selectedCategory && (
              <div className="space-y-6 animate-in fade-in duration-300">
                {/* Back button & Stepper Breadcrumb */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
                  <button
                    type="button"
                    onClick={() => setBookingStep('categories')}
                    className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3.5 py-2 rounded-xl transition-colors w-fit"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Categories
                  </button>

                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <span className="text-blue-600 font-bold">Step 2 of 4:</span>
                    <span>Problem & Urgency Configuration</span>
                  </div>
                </div>

                {/* Selected Category Banner */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
                      {React.createElement(selectedCategory.icon, { className: 'w-7 h-7' })}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-bold text-slate-900">{selectedCategory.name} Dispatch</h2>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                          Fixed Rate Card
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {selectedCategory.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="text-left sm:text-right bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
                    <span className="text-[11px] text-slate-400 font-medium block">Visitation & Diagnosis</span>
                    <span className="text-sm font-bold text-slate-800">₹49 Standard Fee</span>
                  </div>
                </div>

                {/* Main Problems Selection Grid */}
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <span>Select Specific Problem / Service Needed</span>
                    <span className="text-xs text-slate-500 font-normal">(Click one to update cost)</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {selectedCategory.problems.map((prob) => {
                      const isSelected = selectedProblem?.id === prob.id;
                      return (
                        <div
                          key={prob.id}
                          onClick={() => handleSelectProblem(prob)}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'bg-blue-50/70 border-blue-600 ring-2 ring-blue-600/20 shadow-sm'
                              : 'bg-white hover:bg-slate-50 border-slate-200'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-start gap-3">
                              <div className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors ${
                                isSelected ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300 bg-white'
                              }`}>
                                {isSelected && <Check className="w-3.5 h-3.5" />}
                              </div>
                              <div>
                                <h4 className={`text-sm font-bold ${isSelected ? 'text-blue-950' : 'text-slate-900'}`}>
                                  {prob.title}
                                </h4>
                                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                                  {prob.desc}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                            <span className="text-slate-500 flex items-center gap-1 font-medium">
                              <Clock className="w-3.5 h-3.5 text-slate-400" />
                              Approx. {prob.time}
                            </span>
                            <span className="font-extrabold text-slate-900 text-sm">
                              ₹{prob.price}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Custom Notes & Issue Description */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-blue-600" />
                    Describe Issue Details or Specific Parts Needed (Optional)
                  </h3>
                  <textarea
                    rows={3}
                    value={customProblemText}
                    onChange={(e) => setCustomProblemText(e.target.value)}
                    placeholder="e.g., The tap in the master bathroom is leaking from the neck valve. Also need a new 1.5m braided inlet pipe..."
                    className="w-full p-3.5 bg-slate-50 rounded-2xl text-xs sm:text-sm text-slate-900 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-hidden transition-all"
                  />
                </div>

                {/* Urgency Toggle Option */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    Select Dispatch Speed & Urgency
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div
                      onClick={() => setUrgencyType('standard')}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                        urgencyType === 'standard'
                          ? 'bg-blue-50/70 border-blue-600 ring-2 ring-blue-600/20'
                          : 'bg-white hover:bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 ${
                        urgencyType === 'standard' ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300 bg-white'
                      }`}>
                        {urgencyType === 'standard' && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-900">Standard Dispatch</span>
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                            Included
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                          Technician arrives within standard appointment window today (~60-90 mins).
                        </p>
                      </div>
                    </div>

                    <div
                      onClick={() => setUrgencyType('emergency')}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                        urgencyType === 'emergency'
                          ? 'bg-blue-50/70 border-blue-600 ring-2 ring-blue-600/20'
                          : 'bg-white hover:bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 ${
                        urgencyType === 'emergency' ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300 bg-white'
                      }`}>
                        {urgencyType === 'emergency' && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-900 flex items-center gap-1">
                            <Flame className="w-3.5 h-3.5 text-amber-500" />
                            Emergency / Rapid Instant
                          </span>
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-600 text-white">
                            +₹50
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                          Priority dispatch: technician diverted to arrive in 30–45 mins.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dynamic Cost Summary Box & Action Bar */}
                <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-3">
                      <span className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Receipt className="w-4 h-4" />
                        Transparent Cost Breakdown
                      </span>

                      <div className="space-y-1.5 text-xs text-slate-300">
                        <div className="flex items-center justify-between gap-8">
                          <span>Inspection & Visitation Fee:</span>
                          <span className="font-semibold text-white">₹{visitationFee}</span>
                        </div>
                        <div className="flex items-center justify-between gap-8">
                          <span>Service ({selectedProblem?.title || 'Selected Service'}):</span>
                          <span className="font-semibold text-white">₹{problemCost}</span>
                        </div>
                        {urgencyType === 'emergency' && (
                          <div className="flex items-center justify-between gap-8 text-amber-300">
                            <span>Emergency Rapid Dispatch Surcharge:</span>
                            <span className="font-semibold">+₹50</span>
                          </div>
                        )}
                        <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-8 text-sm sm:text-base font-bold text-white">
                          <span>Total Payable Amount:</span>
                          <span className="text-xl sm:text-2xl font-black text-blue-400">₹{totalPayable}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <button
                        type="button"
                        onClick={handleProceedToWorkers}
                        className="w-full sm:w-auto px-8 py-4 rounded-2xl text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 group"
                      >
                        Find Nearby Available Workers
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP C: AVAILABLE NEARBY WORKERS LIST */}
            {bookingStep === 'workers' && selectedCategory && (
              <div className="space-y-6 animate-in fade-in duration-300">
                {/* Back button & Breadcrumb */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
                  <button
                    type="button"
                    onClick={() => setBookingStep('problems')}
                    className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3.5 py-2 rounded-xl transition-colors w-fit"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Problem Selection
                  </button>

                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <span className="text-blue-600 font-bold">Step 3 of 4:</span>
                    <span>Select Verified Professional</span>
                  </div>
                </div>

                {/* Header */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                      Verified {selectedCategory.name}s Near Sector 4
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Problem: <span className="font-semibold text-slate-800">{selectedProblem?.title}</span> • Estimated Total: <span className="font-bold text-blue-600">₹{totalPayable}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 w-fit">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    Ready for Instant Dispatch
                  </div>
                </div>

                {/* Realistic Worker Cards List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(MOCK_WORKERS[selectedCategory.id] || MOCK_WORKERS['plumber']).map((worker) => (
                    <div
                      key={worker.id}
                      className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div>
                        {/* Worker Top Info */}
                        <div className="flex items-start gap-4">
                          <img
                            src={worker.avatar}
                            alt={worker.name}
                            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-slate-100 shadow-xs flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <h3 className="text-base font-bold text-slate-900 truncate">
                                {worker.name}
                              </h3>
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-50 text-blue-700 border border-blue-200">
                                <ShieldCheck className="w-3 h-3 text-blue-600" />
                                PocketHelp Verified
                              </span>
                            </div>

                            <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-600">
                              <div className="flex items-center gap-1 font-bold text-slate-900">
                                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                {worker.rating}
                                <span className="text-slate-400 font-normal">({worker.jobsCount} jobs)</span>
                              </div>
                              <span className="text-slate-300">•</span>
                              <div className="text-slate-600 font-medium">{worker.experience}</div>
                            </div>

                            <div className="mt-2 flex items-center gap-2 text-xs font-semibold text-emerald-600">
                              <MapPin className="w-3.5 h-3.5" />
                              <span>{worker.distance}</span>
                              <span className="text-slate-300">•</span>
                              <span className="text-blue-600">Arrives in ~{worker.eta}</span>
                            </div>
                          </div>
                        </div>

                        {/* Skill Badges & Languages */}
                        <div className="mt-4 pt-4 border-t border-slate-100 space-y-2.5">
                          <div className="flex flex-wrap gap-1.5">
                            {worker.badges.map((b) => (
                              <span key={b} className="text-[11px] font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">
                                {b}
                              </span>
                            ))}
                          </div>

                          <div className="text-[11px] text-slate-500">
                            <span className="font-medium text-slate-600">Languages: </span>
                            {worker.languages.join(', ')}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => setReviewModalWorker(worker)}
                          className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200/80 text-slate-700 transition-colors flex items-center justify-center gap-1.5"
                        >
                          <Star className="w-3.5 h-3.5 text-amber-500" />
                          View Reviews ({worker.reviews.length})
                        </button>
                        <button
                          type="button"
                          onClick={() => handleConfirmBooking(worker)}
                          className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-1.5"
                        >
                          Book This Worker
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP E: INSTANT BOOKING CONFIRMATION CARD */}
            {bookingStep === 'confirmed' && latestConfirmedTicket && (
              <div className="max-w-3xl mx-auto space-y-6 animate-in zoom-in-95 duration-300">
                {/* Success Banner */}
                <div className="bg-emerald-600 text-white rounded-3xl p-6 sm:p-8 text-center shadow-lg shadow-emerald-600/20 space-y-2">
                  <div className="w-16 h-16 rounded-full bg-white/20 text-white flex items-center justify-center mx-auto mb-3 backdrop-blur-xs">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                    Service Dispatched Successfully!
                  </h2>
                  <p className="text-xs sm:text-sm text-emerald-100 max-w-md mx-auto">
                    Your request <span className="font-mono font-bold text-white">#{latestConfirmedTicket.id}</span> has been confirmed. Technician is on the way.
                  </p>
                </div>

                {/* PIN Security Card (Crucial for safety) */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-blue-500 shadow-md text-center space-y-3 relative overflow-hidden">
                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                    <Lock className="w-3.5 h-3.5 text-blue-600" />
                    4-Digit Security Completion PIN
                  </div>

                  <div>
                    <div className="text-4xl sm:text-5xl font-mono font-black text-slate-900 tracking-widest my-2">
                      {latestConfirmedTicket.pin}
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-amber-700 bg-amber-50 py-2 px-4 rounded-xl border border-amber-200/80 inline-block max-w-lg">
                      ⚠️ Share this secret PIN with {latestConfirmedTicket.worker.name} ONLY AFTER the job is fully completed to your satisfaction.
                    </p>
                  </div>
                </div>

                {/* Worker Card & Dispatch Status */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                    <div className="flex items-center gap-4">
                      <img
                        src={latestConfirmedTicket.worker.avatar}
                        alt={latestConfirmedTicket.worker.name}
                        className="w-16 h-16 rounded-2xl object-cover ring-2 ring-blue-100"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold text-slate-900">{latestConfirmedTicket.worker.name}</h3>
                          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                            Assigned
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {latestConfirmedTicket.worker.category} • ★ {latestConfirmedTicket.worker.rating} Rating
                        </p>
                        <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                          Worker Dispatched • On the Way (~18 mins)
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleOpenCallModal(latestConfirmedTicket.worker.name, latestConfirmedTicket.worker.phone)}
                      className="px-5 py-3 rounded-2xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
                    >
                      <PhoneCall className="w-4 h-4" />
                      Call {latestConfirmedTicket.worker.name.split(' ')[0]}
                    </button>
                  </div>

                  {/* Booking Details Summary */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="bg-slate-50 p-4 rounded-2xl space-y-1">
                      <span className="text-[11px] font-bold text-slate-400 uppercase">Service Booked</span>
                      <p className="text-sm font-bold text-slate-900">{latestConfirmedTicket.problem}</p>
                      <p className="text-slate-500">{latestConfirmedTicket.category}</p>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-2xl space-y-1">
                      <span className="text-[11px] font-bold text-slate-400 uppercase">Billing Summary</span>
                      <p className="text-sm font-bold text-blue-600">₹{latestConfirmedTicket.total} Total</p>
                      <p className="text-slate-500">Pay after completion via Cash/UPI</p>
                    </div>
                  </div>

                  {/* Actions to Switch Tabs */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('requests');
                        setRequestsSubTab('active');
                      }}
                      className="w-full sm:flex-1 py-3.5 px-4 rounded-2xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-colors flex items-center justify-center gap-2"
                    >
                      <Receipt className="w-4 h-4" />
                      Track in My Requests
                    </button>

                    <button
                      type="button"
                      onClick={handleResetBooking}
                      className="w-full sm:flex-1 py-3.5 px-4 rounded-2xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Book Another Service
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ======================================================================= */}
        {/* SECTION 3: MY REQUESTS TAB */}
        {/* ======================================================================= */}
        {activeTab === 'requests' && (
          <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300">
            {/* Header & Sub-tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  My Service Requests
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Track ongoing live dispatches, verify security completion PINs, and review past service history.
                </p>
              </div>

              {/* Sub-tab Pill Switcher */}
              <div className="flex items-center bg-slate-200/80 p-1 rounded-2xl border border-slate-300/60 w-fit">
                <button
                  type="button"
                  onClick={() => setRequestsSubTab('active')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    requestsSubTab === 'active'
                      ? 'bg-white text-blue-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>Active Requests</span>
                  {activeRequestsCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] flex items-center justify-center font-bold">
                      {activeRequestsCount}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setRequestsSubTab('completed')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    requestsSubTab === 'completed'
                      ? 'bg-white text-blue-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>Completed History</span>
                  <span className="text-slate-400 font-semibold">
                    ({requestsList.filter(r => r.status === 'completed').length})
                  </span>
                </button>
              </div>
            </div>

            {/* --- SUB-VIEW 1: ACTIVE / PENDING REQUESTS --- */}
            {requestsSubTab === 'active' && (
              <div className="space-y-4">
                {requestsList.filter(r => r.status !== 'completed' && r.status !== 'cancelled').length === 0 ? (
                  <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs space-y-4">
                    <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                      <Clock className="w-8 h-8" />
                    </div>
                    <div className="max-w-md mx-auto">
                      <h3 className="text-lg font-bold text-slate-900">No Active Bookings Right Now</h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Need quick plumbing, electrical work, maid help, or appliance service? Book in under 60 seconds.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        handleResetBooking();
                        setActiveTab('book');
                      }}
                      className="px-6 py-3 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-colors inline-flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Book a Service Now
                    </button>
                  </div>
                ) : (
                  requestsList
                    .filter(r => r.status !== 'completed' && r.status !== 'cancelled')
                    .map((req) => (
                      <div
                        key={req.id}
                        className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-7 space-y-6 relative overflow-hidden"
                      >
                        {/* Top bar */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-lg">
                              #{req.id}
                            </span>
                            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                              {req.category}
                            </span>
                            {req.urgency === 'emergency' && (
                              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 flex items-center gap-1">
                                <Flame className="w-3 h-3 text-amber-500" /> Rapid Dispatch
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 w-fit">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                            {req.statusText}
                          </div>
                        </div>

                        {/* Middle Content */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          
                          {/* Left 2 Cols: Issue & Assigned Worker */}
                          <div className="lg:col-span-2 space-y-4">
                            <div>
                              <h3 className="text-lg font-bold text-slate-900">{req.problem}</h3>
                              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{req.problemDesc}</p>
                            </div>

                            {/* Worker assigned box */}
                            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 flex items-center justify-between gap-4">
                              <div className="flex items-center gap-3">
                                <img
                                  src={req.worker.avatar}
                                  alt={req.worker.name}
                                  className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-200"
                                />
                                <div>
                                  <div className="flex items-center gap-1.5">
                                    <h4 className="text-sm font-bold text-slate-900">{req.worker.name}</h4>
                                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                                  </div>
                                  <p className="text-xs text-slate-500 mt-0.5">
                                    Assigned {req.category} • ★ {req.worker.rating}
                                  </p>
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => handleOpenCallModal(req.worker.name, req.worker.phone)}
                                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white hover:bg-blue-50 text-blue-600 border border-slate-200 transition-colors flex items-center gap-1.5 shadow-2xs"
                              >
                                <Phone className="w-3.5 h-3.5" />
                                Call Worker
                              </button>
                            </div>
                          </div>

                          {/* Right Col: Security PIN & Bill */}
                          <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-2xl p-5 border border-blue-200/80 flex flex-col justify-between space-y-4">
                            <div>
                              <span className="text-[11px] font-bold text-blue-800 uppercase tracking-wider block">
                                Completion Security PIN
                              </span>
                              <div className="text-3xl font-mono font-black text-blue-900 tracking-widest mt-1">
                                {req.pin}
                              </div>
                              <p className="text-[11px] text-blue-700/90 mt-1 font-medium leading-tight">
                                Give to {req.worker.name} only once job is completed.
                              </p>
                            </div>

                            <div className="pt-3 border-t border-blue-200/60 flex items-center justify-between">
                              <span className="text-xs text-slate-600 font-medium">Payable on spot:</span>
                              <span className="text-base font-black text-slate-900">₹{req.total}</span>
                            </div>
                          </div>
                        </div>

                        {/* Bottom Actions Bar */}
                        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                          <div className="text-xs text-slate-500 flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            <span className="truncate max-w-xs">{req.address}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            {/* Demo Helper to quickly simulate job completion */}
                            <button
                              type="button"
                              onClick={() => handleMarkJobCompleted(req.id)}
                              title="Simulate job completion to test Rating & Reviewing"
                              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors"
                            >
                              ✓ Simulate Job Finished
                            </button>

                            <button
                              type="button"
                              onClick={() => handleCancelRequest(req.id)}
                              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors"
                            >
                              Cancel Request
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                )}
              </div>
            )}

            {/* --- SUB-VIEW 2: COMPLETED REQUESTS HISTORY --- */}
            {requestsSubTab === 'completed' && (
              <div className="space-y-4">
                {requestsList.filter(r => r.status === 'completed').length === 0 ? (
                  <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs">
                    <p className="text-sm text-slate-500">No completed service records found.</p>
                  </div>
                ) : (
                  requestsList
                    .filter(r => r.status === 'completed')
                    .map((req) => (
                      <div
                        key={req.id}
                        className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 sm:p-7 space-y-5"
                      >
                        {/* Top Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-lg">
                              #{req.id}
                            </span>
                            <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
                              {req.category}
                            </span>
                            <span className="text-xs font-semibold text-slate-500">
                              {req.scheduledTime}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-sm font-black text-slate-900">
                              Paid ₹{req.total}
                            </span>
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              Job Completed
                            </span>
                          </div>
                        </div>

                        {/* Middle Info */}
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                          <div className="space-y-1">
                            <h3 className="text-base font-bold text-slate-900">{req.problem}</h3>
                            <p className="text-xs text-slate-500">{req.problemDesc}</p>
                            <div className="flex items-center gap-2 pt-2 text-xs text-slate-600">
                              <span>Service Pro: <strong className="text-slate-900">{req.worker.name}</strong></span>
                              <span className="text-slate-300">•</span>
                              <button
                                type="button"
                                onClick={() => setInvoiceModalTicket(req)}
                                className="text-blue-600 hover:underline font-semibold flex items-center gap-1"
                              >
                                <FileText className="w-3.5 h-3.5" /> View Receipt
                              </button>
                            </div>
                          </div>

                          {/* Rate & Review section for this completed ticket */}
                          <div className="md:min-w-[280px]">
                            {req.rating ? (
                              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-[11px] font-bold text-slate-400 uppercase">Your Rating</span>
                                  <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                      <Star
                                        key={s}
                                        className={`w-3.5 h-3.5 ${
                                          s <= req.rating
                                            ? 'fill-amber-400 text-amber-400'
                                            : 'text-slate-300'
                                        }`}
                                      />
                                    ))}
                                    <span className="text-xs font-bold text-slate-900 ml-1">{req.rating}.0</span>
                                  </div>
                                </div>

                                {req.reviewTags && req.reviewTags.length > 0 && (
                                  <div className="flex flex-wrap gap-1">
                                    {req.reviewTags.map((t) => (
                                      <span key={t} className="text-[10px] font-medium bg-white text-slate-700 px-2 py-0.5 rounded-md border border-slate-200">
                                        {t}
                                      </span>
                                    ))}
                                  </div>
                                )}

                                <p className="text-xs text-slate-600 italic">
                                  "{req.reviewText}"
                                </p>
                              </div>
                            ) : (
                              <div className="bg-blue-50/60 rounded-2xl p-4 border border-blue-200/80 text-center space-y-2.5">
                                <div className="text-xs font-bold text-blue-900">
                                  How was {req.worker.name.split(' ')[0]}'s service?
                                </div>
                                <p className="text-[11px] text-blue-700">
                                  Help the PocketHelp community by rating this job.
                                </p>
                                <button
                                  type="button"
                                  onClick={() => handleOpenRateModal(req)}
                                  className="w-full py-2 px-3 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors flex items-center justify-center gap-1.5"
                                >
                                  <Star className="w-3.5 h-3.5 fill-white" />
                                  Rate & Review Service
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                )}
              </div>
            )}
          </div>
        )}

      </main>

      {/* ========================================================================= */}
      {/* MODAL 1: STEP D - WORKER REVIEWS & VERIFICATION MODAL */}
      {/* ========================================================================= */}
      {reviewModalWorker && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 relative animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setReviewModalWorker(null)}
              className="absolute right-5 top-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Worker Header */}
            <div className="flex items-center gap-4">
              <img
                src={reviewModalWorker.avatar}
                alt={reviewModalWorker.name}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-blue-100 shadow-xs"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-slate-900">{reviewModalWorker.name}</h3>
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex items-center gap-2 mt-1 text-xs text-slate-600">
                  <span className="font-bold text-slate-900 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {reviewModalWorker.rating} / 5.0
                  </span>
                  <span>•</span>
                  <span>{reviewModalWorker.jobsCount} Completed Orders</span>
                </div>
              </div>
            </div>

            {/* Official Verification Badges Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <div>
                  <div className="font-bold text-emerald-950">Govt. Aadhaar Verified</div>
                  <div className="text-[10px] text-emerald-700">Biometric identity verified</div>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <div>
                  <div className="font-bold text-emerald-950">Police Cleared</div>
                  <div className="text-[10px] text-emerald-700">Clean legal background</div>
                </div>
              </div>
            </div>

            {/* Languages & Experience */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Experience:</span>
                <span className="font-bold text-slate-800">{reviewModalWorker.experience}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Languages Spoken:</span>
                <span className="font-bold text-slate-800">{reviewModalWorker.languages.join(', ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Service Radius:</span>
                <span className="font-bold text-slate-800">Pune Sector 1 to 8 (~10km)</span>
              </div>
            </div>

            {/* Customer Reviews Snippets */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Customer Testimonials ({reviewModalWorker.reviews.length})
              </h4>

              <div className="space-y-3">
                {reviewModalWorker.reviews.map((rev, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{rev.author}</span>
                      <div className="flex items-center gap-1">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-600 italic leading-relaxed">
                      "{rev.comment}"
                    </p>
                    <span className="text-[10px] text-slate-400 block">{rev.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Booking Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => handleConfirmBooking(reviewModalWorker)}
                className="w-full py-3.5 px-6 rounded-2xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
              >
                Confirm Booking with {reviewModalWorker.name} (₹{totalPayable})
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: INTERACTIVE RATE & REVIEW MODAL */}
      {/* ========================================================================= */}
      {rateModalTicket && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 relative animate-in zoom-in-95">
            <button
              type="button"
              onClick={() => setRateModalTicket(null)}
              className="absolute right-5 top-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-2">
                <Star className="w-6 h-6 fill-amber-500 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Rate & Review Service</h3>
              <p className="text-xs text-slate-500">
                Ticket <span className="font-mono font-semibold">#{rateModalTicket.id}</span> • {rateModalTicket.worker.name} ({rateModalTicket.category})
              </p>
            </div>

            {/* 5-Star Interactive Rating Picker */}
            <div className="text-center py-2">
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRatingStars(star)}
                    onMouseEnter={() => setRatingHover(star)}
                    onMouseLeave={() => setRatingHover(ratingStars)}
                    className="p-1 hover:scale-110 transition-transform focus:outline-hidden"
                  >
                    <Star
                      className={`w-8 h-8 transition-colors ${
                        star <= (ratingHover || ratingStars)
                          ? 'fill-amber-400 text-amber-400 drop-shadow-xs'
                          : 'text-slate-200'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <span className="text-xs font-bold text-slate-700 mt-2 block">
                {ratingStars === 5 && '🌟 Exceptional / 5 Stars'}
                {ratingStars === 4 && '👍 Great Job / 4 Stars'}
                {ratingStars === 3 && '👌 Satisfactory / 3 Stars'}
                {ratingStars === 2 && '👎 Needs Improvement / 2 Stars'}
                {ratingStars === 1 && '⚠️ Poor Service / 1 Star'}
              </span>
            </div>

            {/* Quick Feedback Tags */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 block">
                What went especially well? (Tap tags)
              </span>
              <div className="flex flex-wrap gap-2">
                {['Punctual', 'Clean Work', 'Polite', 'Fair Price', 'Expert Skills', 'Great Communication'].map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleToggleTag(tag)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                        isSelected
                          ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {isSelected ? `✓ ${tag}` : `+ ${tag}`}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Written Comments */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 block">
                Write a brief comment (Optional)
              </span>
              <textarea
                rows={3}
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Share your experience to help other neighbors in Pune Sector 4..."
                className="w-full p-3 bg-slate-50 rounded-2xl text-xs text-slate-900 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-hidden"
              />
            </div>

            {/* Submit Button */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setRateModalTicket(null)}
                className="flex-1 py-3 px-4 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmitReview}
                className="flex-1 py-3 px-4 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 transition-all"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: SIMULATED CALL WORKER DIALOG */}
      {/* ========================================================================= */}
      {isCallModalOpen && callModalData && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-slate-900 text-white rounded-3xl max-w-sm w-full p-6 text-center space-y-6 shadow-2xl relative animate-in zoom-in-95">
            <div className="w-20 h-20 rounded-full bg-blue-600/30 text-blue-400 flex items-center justify-center mx-auto border-2 border-blue-500/40 animate-pulse">
              <PhoneCall className="w-9 h-9" />
            </div>

            <div>
              <span className="text-[11px] font-bold text-blue-400 uppercase tracking-widest">
                Masked Direct Dial
              </span>
              <h3 className="text-xl font-bold text-white mt-1">{callModalData.name}</h3>
              <p className="text-xs text-slate-400 mt-1">{callModalData.phone}</p>
              <div className="text-[11px] text-emerald-400 font-medium mt-3 bg-emerald-950/60 py-1.5 px-3 rounded-full border border-emerald-800/60 inline-block">
                ● Connected • PocketHelp Secured Line
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Your personal phone number is masked for safety.
            </p>

            <button
              type="button"
              onClick={() => setIsCallModalOpen(false)}
              className="w-full py-3 rounded-2xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white transition-colors"
            >
              End Call
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: EDIT PROFILE MODAL */}
      {/* ========================================================================= */}
      {isEditProfileOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 relative animate-in zoom-in-95">
            <button
              type="button"
              onClick={() => setIsEditProfileOpen(false)}
              className="absolute right-5 top-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-900">Edit Profile Information</h3>
              <p className="text-xs text-slate-500">Update your verified customer details.</p>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={userProfile.name}
                  onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                  className="w-full p-3 bg-slate-50 rounded-xl text-slate-900 font-medium border border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={userProfile.phone}
                  onChange={(e) => setUserProfile({ ...userProfile, phone: e.target.value })}
                  className="w-full p-3 bg-slate-50 rounded-xl text-slate-900 font-medium border border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={userProfile.email}
                  onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                  className="w-full p-3 bg-slate-50 rounded-xl text-slate-900 font-medium border border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Default Address</label>
                <textarea
                  rows={2}
                  value={userProfile.primaryAddress}
                  onChange={(e) => setUserProfile({ ...userProfile, primaryAddress: e.target.value })}
                  className="w-full p-3 bg-slate-50 rounded-xl text-slate-900 font-medium border border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-hidden"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsEditProfileOpen(false)}
                className="flex-1 py-3 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setIsEditProfileOpen(false)}
                className="flex-1 py-3 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 5: MANAGE SAVED ADDRESSES MODAL */}
      {/* ========================================================================= */}
      {isAddressesModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 relative animate-in zoom-in-95">
            <button
              type="button"
              onClick={() => setIsAddressesModalOpen(false)}
              className="absolute right-5 top-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-900">Manage Saved Addresses</h3>
              <p className="text-xs text-slate-500">Pick or update your preferred service locations.</p>
            </div>

            <div className="space-y-3">
              {savedAddresses.map((addr) => (
                <div
                  key={addr.id}
                  className={`p-4 rounded-2xl border text-xs flex items-start justify-between gap-3 ${
                    addr.isDefault
                      ? 'bg-blue-50/70 border-blue-500'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{addr.label}</span>
                      {addr.isDefault && (
                        <span className="text-[10px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded-md">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600 leading-relaxed">{addr.address}</p>
                  </div>

                  {!addr.isDefault && (
                    <button
                      type="button"
                      onClick={() => {
                        setSavedAddresses(savedAddresses.map(a => ({
                          ...a,
                          isDefault: a.id === addr.id
                        })));
                        setUserProfile(prev => ({ ...prev, primaryAddress: addr.address }));
                      }}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-white hover:bg-slate-100 text-blue-600 border border-slate-200 shadow-2xs whitespace-nowrap"
                    >
                      Set Default
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsAddressesModalOpen(false)}
                className="w-full py-3 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 6: INVOICE / RECEIPT MODAL */}
      {/* ========================================================================= */}
      {invoiceModalTicket && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 relative animate-in zoom-in-95">
            <button
              type="button"
              onClick={() => setInvoiceModalTicket(null)}
              className="absolute right-5 top-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1 pb-4 border-b border-slate-100">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-2">
                <Receipt className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Service Payment Receipt</h3>
              <p className="text-xs text-slate-400 font-mono">Invoice #{invoiceModalTicket.id}-INV</p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Service Category:</span>
                <span className="font-bold text-slate-900">{invoiceModalTicket.category}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Specific Job:</span>
                <span className="font-semibold text-slate-900">{invoiceModalTicket.problem}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Technician:</span>
                <span className="font-semibold text-slate-900">{invoiceModalTicket.worker.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Visitation Fee:</span>
                <span className="font-semibold text-slate-900">₹{invoiceModalTicket.visitationFee}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Labor / Service Cost:</span>
                <span className="font-semibold text-slate-900">₹{invoiceModalTicket.serviceCost}</span>
              </div>
              {invoiceModalTicket.urgencyFee > 0 && (
                <div className="flex justify-between py-1 border-b border-slate-100 text-amber-600">
                  <span>Rapid Dispatch Fee:</span>
                  <span className="font-semibold">+₹{invoiceModalTicket.urgencyFee}</span>
                </div>
              )}
              <div className="flex justify-between py-2 text-sm font-bold text-slate-900 bg-slate-50 px-3 rounded-xl">
                <span>Total Amount Paid:</span>
                <span className="text-blue-600">₹{invoiceModalTicket.total}</span>
              </div>
              <div className="text-[11px] text-emerald-600 font-medium flex items-center justify-center gap-1 pt-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Paid via UPI • Verified PocketHelp Guarantee
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                alert('Receipt downloaded to your device as PDF.');
                setInvoiceModalTicket(null);
              }}
              className="w-full py-3 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-colors"
            >
              Download PDF Receipt
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FOOTER */}
      {/* ========================================================================= */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2 font-medium">
            <Zap className="w-4 h-4 text-blue-600" />
            <span>PocketHelp Dispatch Portal • Pune Region Hub</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-800 cursor-pointer">Help & 24/7 Support</span>
            <span>•</span>
            <span className="hover:text-slate-800 cursor-pointer">Terms & Warranty</span>
            <span>•</span>
            <span className="hover:text-slate-800 cursor-pointer">Safety Guidelines</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
