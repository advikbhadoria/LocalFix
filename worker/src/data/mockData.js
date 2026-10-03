const storedUser = JSON.parse(localStorage.getItem('LocalFix_user') || 'null');
export const WORKER = {
  name: storedUser ? storedUser.name : 'Aman Kumar',
  phone: storedUser && storedUser.mobile ? '+91 ' + storedUser.mobile : '+91 98765 43210',
  email: storedUser && storedUser.email ? storedUser.email : 'aman.kumar@example.com',
  service: 'AC & Appliance Technician',
  rating: 4.8,
  jobsCompleted: 127,
  acceptanceRate: 96,
  completionRate: 98,
  wallet: 4850,
  avatar: storedUser ? storedUser.name.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase() : 'AK',
};

// ─── Badges ───────────────────────────────────────────────────────────────────
export const BADGES = [
  { id: 'b1', icon: '🏅', label: '100 Jobs', desc: 'Completed 100+ jobs on the platform.' },
  { id: 'b2', icon: '⚡', label: 'Fast Responder', desc: 'Accepts jobs within 15 seconds on average.' },
  { id: 'b3', icon: '🛡️', label: 'Safety Verified', desc: 'Identity & background check completed.' },
  { id: 'b4', icon: '⭐', label: 'Top Rated', desc: 'Maintained 4.8+ rating for 3 months.' },
];

// ─── Available Jobs ────────────────────────────────────────────────────────────
export const INITIAL_JOBS = [
  { id: 'j1', type: 'AC Repair',              icon: '❄️',  dist: 2.4, pay: 650, time: 45,
    customer: { name: 'Rahul S.',  rating: 4.7, prevJobs: 6  }, area: 'Koramangala',  urgent: true  },
  { id: 'j2', type: 'Washing Machine Repair', icon: '🌊',  dist: 3.1, pay: 800, time: 60,
    customer: { name: 'Priya M.', rating: 4.9, prevJobs: 12 }, area: 'HSR Layout',    urgent: false },
  { id: 'j3', type: 'Plumbing Repair',        icon: '🔧',  dist: 1.8, pay: 450, time: 30,
    customer: { name: 'Deepak R.',rating: 4.5, prevJobs: 3  }, area: 'Indiranagar',   urgent: false },
  { id: 'j4', type: 'Electrical Repair',      icon: '⚡',  dist: 2.7, pay: 550, time: 40,
    customer: { name: 'Sneha T.', rating: 4.8, prevJobs: 9  }, area: 'Whitefield',    urgent: false },
];

// ─── Missed Jobs ───────────────────────────────────────────────────────────────
export const INITIAL_MISSED = [
  { id: 'm1', type: 'Plumbing Repair',   icon: '🔧', dist: 3.2, pay: 500, time: 35, area: 'BTM Layout'   },
  { id: 'm2', type: 'Fan Installation',  icon: '💨', dist: 2.1, pay: 350, time: 25, area: 'JP Nagar'     },
  { id: 'm3', type: 'AC Servicing',      icon: '❄️', dist: 4.0, pay: 700, time: 50, area: 'Marathahalli' },
];

// ─── Earnings ─────────────────────────────────────────────────────────────────
export const EARNINGS_TODAY = {
  total: 1850,
  jobs: 4,
  tips: 200,
  breakdown: [
    { label: 'AC Repair',        amount: 650 },
    { label: 'Electrical Repair', amount: 500 },
    { label: 'Appliance Repair', amount: 700 },
  ],
};

export const EARNINGS_WEEK = [
  { day: 'Mon', amount: 1200 },
  { day: 'Tue', amount: 1850 },
  { day: 'Wed', amount: 2100 },
  { day: 'Thu', amount: 950  },
  { day: 'Fri', amount: 1650 },
  { day: 'Sat', amount: 2400 },
  { day: 'Sun', amount: 690  },
];

export const EARNINGS_MONTH = [
  { day: 'W1', amount: 8200  },
  { day: 'W2', amount: 10500 },
  { day: 'W3', amount: 6800  },
  { day: 'W4', amount: 9000  },
];

// ─── Transactions ──────────────────────────────────────────────────────────────
export const INITIAL_TRANSACTIONS = [
  { id: 't1', label: 'AC Repair',         amount: +650, type: 'earn', time: '2:15 PM'  },
  { id: 't2', label: 'Electrical Repair', amount: +500, type: 'earn', time: '11:30 AM' },
  { id: 't3', label: 'Customer Tip',      amount: +100, type: 'tip',  time: '10:45 AM' },
  { id: 't4', label: 'Appliance Repair',  amount: +700, type: 'earn', time: '9:00 AM'  },
  { id: 't5', label: 'UPI Withdrawal',    amount: -2000,type: 'withdraw', time: 'Yesterday' },
  { id: 't6', label: 'Customer Tip',      amount: +200, type: 'tip',  time: 'Yesterday' },
];

// ─── Notifications ─────────────────────────────────────────────────────────────
export const INITIAL_NOTIFICATIONS = [
  { id: 'n1', category: 'jobs',     icon: '🔔', title: 'New Job Nearby',    body: 'AC Repair — ₹650, 2.3 km away',           read: false, time: 'Just now'  },
  { id: 'n2', category: 'earnings', icon: '💰', title: 'Payment Received',  body: '₹550 added to your wallet',               read: false, time: '5 min ago' },
  { id: 'n3', category: 'ratings',  icon: '⭐', title: 'New Rating',        body: 'You received 5 stars from Rahul S.',       read: true,  time: '1 hr ago'  },
  { id: 'n4', category: 'earnings', icon: '🎁', title: 'Tip Received',      body: 'You received a ₹100 tip',                  read: true,  time: '2 hr ago'  },
  { id: 'n5', category: 'safety',   icon: '🛡️', title: 'Safety Check',      body: 'Your safety profile is up to date.',       read: true,  time: 'Yesterday' },
];

// ─── Chat messages ────────────────────────────────────────────────────────────
export const INITIAL_CHAT = [
  { id: 'c1', sender: 'customer', text: "Hi, I'm at the location. Please come soon.", time: '2:10 PM' },
  { id: 'c2', sender: 'worker',   text: "On my way! Will be there in about 10 minutes.",time: '2:11 PM' },
  { id: 'c3', sender: 'customer', text: 'Great, the gate is open. Ask for Flat 3B.',   time: '2:12 PM' },
];

// ─── Analytics ────────────────────────────────────────────────────────────────
export const ANALYTICS = {
  thisMonth:  { jobs: 47, earnings: 28450, rating: 4.8, avgTime: 52, acceptance: 91 },
  prevMonth:  { jobs: 38, earnings: 21200, rating: 4.7, avgTime: 58, acceptance: 87 },
  jobBreakdown: [
    { label: 'Completed', value: 47, color: '#16a34a' },
    { label: 'Missed',    value: 5,  color: '#f59e0b' },
    { label: 'Cancelled', value: 2,  color: '#ef4444' },
  ],
};

// ─── Map pins ─────────────────────────────────────────────────────────────────
export const MAP_PINS = [
  { id: 'p1', x: 22, y: 30, type: 'available', label: 'AC Repair',   pay: 650, dist: 2.4, area: 'Koramangala' },
  { id: 'p2', x: 60, y: 45, type: 'expiring',  label: 'Electrician', pay: 550, dist: 1.2, area: 'Indiranagar' },
  { id: 'p3', x: 75, y: 20, type: 'available', label: 'Plumbing',    pay: 450, dist: 3.8, area: 'Whitefield'  },
  { id: 'p4', x: 40, y: 70, type: 'worker',    label: 'You',         pay: 0,   dist: 0,   area: ''            },
];
