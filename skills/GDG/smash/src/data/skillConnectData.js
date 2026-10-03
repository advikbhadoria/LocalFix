export const INITIAL_SKILLCONNECT_PROFILE = {
  workerId: "WKR-9082",
  name: "Jaya Kumari",
  avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80",
  currentRole: "learner", // 'learner' | 'mentor'
  learningLevel: "Level 3 • Advanced Electrician & Smart Utility",
  levelProgress: 72,
  skillsInProgressCount: 3,
  completedSkillsCount: 6,
  totalTrainingHours: 48.5,
  weeklyTrainingHours: 6.2,
  mentorStatus: "verified", // 'not_registered' | 'draft' | 'submitted' | 'under_review' | 'practical_assessment' | 'verified'
  mentorRating: 4.94,
  mentorReviewsCount: 38,
  activeMenteesCount: 4,
  teachingCredits: 3400,
  verifiedCompetencies: [
    {
      id: "SK-ELEC-01",
      name: "3-Phase Distribution & MCB Load Balancing",
      category: "Electrical",
      verifiedDate: "Jan 14, 2026",
      assessor: "Master Eng. Rajesh Sharma (Lead Trainer)",
      badgeIcon: "Zap",
      level: "Advanced Specialist",
      score: 96,
      certificateId: "CERT-ELEC-2026-9082"
    },
    {
      id: "SK-ELEC-02",
      name: "Smart Inverter & Solar Hybrid UPS Integration",
      category: "Electrical",
      verifiedDate: "Feb 02, 2026",
      assessor: "Vikram Gaikwad (Solar Grid Expert)",
      badgeIcon: "Sun",
      level: "Certified Pro",
      score: 92,
      certificateId: "CERT-SLR-2026-9082"
    },
    {
      id: "SK-SAFE-01",
      name: "High-Voltage Arc Flash & PPE Workplace Safety",
      category: "Safety & Tools",
      verifiedDate: "Nov 20, 2025",
      assessor: "National Skill Development Council (NSDC)",
      badgeIcon: "ShieldCheck",
      level: "Mandatory Safety Grade A",
      score: 100,
      certificateId: "CERT-SAFE-2025-9082"
    },
    {
      id: "SK-COMM-01",
      name: "Premium Customer Communication & De-escalation",
      category: "Soft Skills",
      verifiedDate: "Dec 10, 2025",
      assessor: "PocketHelp Academy",
      badgeIcon: "MessageSquare",
      level: "Gold Standard",
      score: 95,
      certificateId: "CERT-COMM-2025-9082"
    }
  ]
};

export const MOCK_MENTORS = [
  {
    id: "MNT-101",
    name: "Rajesh Sharma",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80",
    title: "Chief Master Electrician & Industrial Safety Assessor",
    category: "Electrical",
    experience: "14+ Years",
    verified: true,
    rating: 4.98,
    reviewsCount: 142,
    languages: ["Hindi", "English", "Marathi"],
    formats: ["In-Person (Pune Hub)", "Online 1-on-1"],
    location: "Kothrud & Swargate Training Hub, Pune",
    lat: 18.5074,
    lng: 73.8077,
    sessionPrice: "Free (Sponsored by PocketHelp Academy)",
    hourlyRate: 0,
    isSponsored: true,
    bio: "Over 14 years of industrial wiring, 3-phase diagnostics, and solar inverter installations. Certified NSDC Assessor passionate about mentoring grassroot technicians into high-earning certified pros.",
    skillsTaught: [
      "3-Phase Industrial Distribution Board Diagnostics",
      "MCB Tripping & Short Circuit Root-Cause Analysis",
      "High-Voltage Safety & Arc Flash Isolation",
      "Concealed Pipe Wiring & Earthing Resistance"
    ],
    nextAvailableSlot: "Tomorrow, 10:30 AM",
    availableDays: ["Mon", "Wed", "Fri", "Sat"],
    availableSlots: [
      "Tomorrow • 10:30 AM - 11:30 AM",
      "Tomorrow • 03:00 PM - 04:00 PM",
      "Friday • 11:00 AM - 12:30 PM",
      "Saturday • 09:30 AM - 11:00 AM"
    ],
    reviews: [
      {
        id: "rev-1",
        learnerName: "Sanjay Mane",
        rating: 5,
        date: "3 days ago",
        course: "3-Phase Distribution Board",
        comment: "Rajesh sir explained the neutral leak test with live clamp meter demonstration. Completely cleared my fear of high voltage switchboards!"
      },
      {
        id: "rev-2",
        learnerName: "Jaya Kumari",
        rating: 5,
        date: "2 weeks ago",
        course: "Industrial Safety",
        comment: "Super practical and safety focused. Helped me qualify for Platinum Pro category."
      }
    ]
  },
  {
    id: "MNT-102",
    name: "Sunita Deshmukh",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&auto=format&fit=crop&q=80",
    title: "HVAC & Inverter AC Specialist / Lead Master Trainer",
    category: "Appliance",
    experience: "11+ Years",
    verified: true,
    rating: 4.95,
    reviewsCount: 98,
    languages: ["Marathi", "Hindi", "English"],
    formats: ["Online Video", "In-Person Workshop"],
    location: "Baner Service Center & Lab, Pune",
    lat: 18.5590,
    lng: 73.7868,
    sessionPrice: "Free (Skill Boost Grant)",
    hourlyRate: 0,
    isSponsored: true,
    bio: "Daikin & Voltas certified refrigeration technician. Specialize in BLDC inverter compressor circuit board (PCB) troubleshooting, R32/R410A gas vacuum testing, and smart sensors.",
    skillsTaught: [
      "Inverter Split AC PCB Sensor Diagnostics",
      "R32 / R410A Vacuum Testing & Flaring Technique",
      "Condenser Fan Motor & Capacitor Testing",
      "Deep Chemical Foam Jet Cleaning"
    ],
    nextAvailableSlot: "Thu, 2:00 PM",
    availableDays: ["Tue", "Thu", "Sat"],
    availableSlots: [
      "Thursday • 02:00 PM - 03:30 PM",
      "Saturday • 10:00 AM - 11:30 AM",
      "Sunday • 04:00 PM - 05:30 PM"
    ],
    reviews: [
      {
        id: "rev-3",
        learnerName: "Pravin Kulkarni",
        rating: 5,
        date: "1 week ago",
        course: "Inverter AC PCB",
        comment: "The flaring brass nut torque guide saved me from refrigerant leak mistakes on customer sites. Excellent mentor!"
      }
    ]
  },
  {
    id: "MNT-103",
    name: "Vikram Gaikwad",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
    title: "Master Plumber & Hydro-Pressure Piping Consultant",
    category: "Plumbing",
    experience: "12+ Years",
    verified: true,
    rating: 4.92,
    reviewsCount: 116,
    languages: ["Marathi", "Hindi"],
    formats: ["In-Person Site Visit", "Online 1-on-1"],
    location: "Hadapsar & Magarpatta Workshop, Pune",
    lat: 18.5089,
    lng: 73.9259,
    sessionPrice: "Free",
    hourlyRate: 0,
    isSponsored: true,
    bio: "Expert in CPVC/UPVC concealed pipe routing, pressure booster pumps, wall-hung concealed cisterns, and ultrasonic acoustic leak detection.",
    skillsTaught: [
      "CPVC / PPR Heat Fusion Pipe Welding",
      "Concealed Flush Valve & Wall Cistern Installation",
      "Digital Water Pressure Booster Pump Setup",
      "Drainage Slope & Grease Trap Clearing"
    ],
    nextAvailableSlot: "Friday, 4:00 PM",
    availableDays: ["Wed", "Fri", "Sun"],
    availableSlots: [
      "Friday • 04:00 PM - 05:00 PM",
      "Sunday • 11:00 AM - 12:30 PM"
    ],
    reviews: [
      {
        id: "rev-4",
        learnerName: "Ajay Shinde",
        rating: 5,
        date: "5 days ago",
        course: "Concealed Wall Cistern",
        comment: "Learned how to repair Grohe concealed tank valves without breaking customer bathroom tiles. Gold standard practical mentorship!"
      }
    ]
  },
  {
    id: "MNT-104",
    name: "Anita Patil",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80",
    title: "Commercial Sanitization & Deep Cleaning Supervisor",
    category: "Cleaning",
    experience: "9+ Years",
    verified: true,
    rating: 4.97,
    reviewsCount: 84,
    languages: ["Hindi", "Marathi", "English"],
    formats: ["Online Video", "In-Person Demo"],
    location: "Viman Nagar Training Hub, Pune",
    lat: 18.5679,
    lng: 73.9143,
    sessionPrice: "Free",
    hourlyRate: 0,
    isSponsored: true,
    bio: "Specialist in hospital-grade surface hygiene, single-disc floor scrubbers, marble crystallization polishing, and upholstery steam extraction.",
    skillsTaught: [
      "Industrial Single-Disc Floor Scrubber Operation",
      "Upholstery Steam Extraction & Stain Chemical Neutralization",
      "Kitchen Exhaust Degreasing & Food Safe Protocols",
      "Post-Construction Deep Cleaning Checklist"
    ],
    nextAvailableSlot: "Tomorrow, 11:00 AM",
    availableDays: ["Mon", "Tue", "Thu", "Fri"],
    availableSlots: [
      "Tomorrow • 11:00 AM - 12:00 PM",
      "Thursday • 03:00 PM - 04:30 PM"
    ],
    reviews: []
  },
  {
    id: "MNT-105",
    name: "Mohammed Rizwan",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80",
    title: "Heavy Appliance & Washing Machine Master Tech",
    category: "Appliance",
    experience: "13+ Years",
    verified: true,
    rating: 4.96,
    reviewsCount: 130,
    languages: ["Hindi", "Urdu", "English"],
    formats: ["Online 1-on-1", "In-Person Lab"],
    location: "Camp & Shivaji Nagar Service Lab, Pune",
    lat: 18.5196,
    lng: 73.8553,
    sessionPrice: "Free",
    hourlyRate: 0,
    isSponsored: true,
    bio: "Front-load direct drive motor diagnostics, suspension spider bearing replacement, water inlet solenoid valves, and microwave magnetron testing.",
    skillsTaught: [
      "Front-Load Inverter Motor Direct Drive Diagnosis",
      "Washing Machine Spider Arm & Drum Bearing Replacement",
      "Microwave Magnetron & High-Voltage Diode Safe Testing",
      "Dishwasher Circulation Pump & Heating Coil Repair"
    ],
    nextAvailableSlot: "Wednesday, 2:30 PM",
    availableDays: ["Mon", "Wed", "Fri", "Sat"],
    availableSlots: [
      "Wednesday • 02:30 PM - 04:00 PM",
      "Saturday • 01:00 PM - 02:30 PM"
    ],
    reviews: []
  },
  {
    id: "MNT-106",
    name: "Deepa Menon",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80",
    title: "Customer Psychology & On-Demand Service Excellence Coach",
    category: "Soft Skills",
    experience: "8+ Years",
    verified: true,
    rating: 4.99,
    reviewsCount: 175,
    languages: ["English", "Hindi", "Tamil", "Malayalam"],
    formats: ["Online Video Group", "Online 1-on-1"],
    location: "Virtual Academy Suite",
    lat: 18.5204,
    lng: 73.8567,
    sessionPrice: "Free",
    hourlyRate: 0,
    isSponsored: true,
    bio: "Former hospitality trainer turned gig-worker advocate. I teach practical communication, handling upset customers, explaining complex repair estimates politely, and earning 5-star tips consistently.",
    skillsTaught: [
      "5-Step Professional Greeting & Scope Explanation",
      "De-escalating Customer Complaints Gracefully",
      "Transparent Billing & Parts Estimate Presentation",
      "Safety Briefing & Final Customer Walkthrough"
    ],
    nextAvailableSlot: "Today, 6:00 PM",
    availableDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    availableSlots: [
      "Today • 06:00 PM - 07:00 PM",
      "Tomorrow • 05:30 PM - 06:30 PM"
    ],
    reviews: []
  },
  {
    id: "MNT-107",
    name: "Suresh Rao",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80",
    title: "Airless Spray Painting & Waterproofing Specialist",
    category: "Painting",
    experience: "15+ Years",
    verified: true,
    rating: 4.91,
    reviewsCount: 76,
    languages: ["Hindi", "Marathi", "Kannada"],
    formats: ["In-Person Site Visit"],
    location: "Wakad & Pimpri Training Site, Pune",
    lat: 18.5987,
    lng: 73.7689,
    sessionPrice: "Free",
    hourlyRate: 0,
    isSponsored: true,
    bio: "Master of exterior elastomeric coatings, PU waterproofing injection grouting, texture roller finishes, and Wagner airless spray machine maintenance.",
    skillsTaught: [
      "Airless Paint Spray Gun Pressure Calibration & Tip Selection",
      "Terrace Waterproofing PU Polymer Coating",
      "Wall Moisture Testing with Digital Moisture Meter",
      "Surface Crack V-Groove Epoxy Filling"
    ],
    nextAvailableSlot: "Saturday, 3:00 PM",
    availableDays: ["Sat", "Sun"],
    availableSlots: [
      "Saturday • 03:00 PM - 05:00 PM",
      "Sunday • 02:00 PM - 04:00 PM"
    ],
    reviews: []
  },
  {
    id: "MNT-108",
    name: "Karthik Iyer",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80",
    title: "Smart Home Automation & IoT Switch Gear Specialist",
    category: "Electrical",
    experience: "7+ Years",
    verified: true,
    rating: 4.93,
    reviewsCount: 64,
    languages: ["English", "Hindi", "Tamil"],
    formats: ["Online Video", "In-Person Demo"],
    location: "Kalyani Nagar Tech Lab, Pune",
    lat: 18.5463,
    lng: 73.9033,
    sessionPrice: "Free",
    hourlyRate: 0,
    isSponsored: true,
    bio: "Sonoff, Tuya, and Zigbee smart relay switchboard conversions, smart curtain motors, and home energy monitor installs.",
    skillsTaught: [
      "Zigbee / Wi-Fi Smart Relay Module Behind Existing Switchboards",
      "Neutral Wire Retrofitting for Old Gang Boxes",
      "Smart Geyser & AC High-Amperage Automation Contactors",
      "App Pairing, Gateway Mesh & Troubleshooting Signal Drops"
    ],
    nextAvailableSlot: "Friday, 11:30 AM",
    availableDays: ["Tue", "Fri", "Sat"],
    availableSlots: [
      "Friday • 11:30 AM - 01:00 PM",
      "Saturday • 04:00 PM - 05:30 PM"
    ],
    reviews: []
  }
];

export const MOCK_COURSES = [
  {
    id: "CRS-101",
    title: "Advanced 3-Phase Industrial Wiring & MCB Diagnostics",
    category: "Electrical",
    difficulty: "Advanced",
    duration: "4.5 Hours • 6 Modules",
    thumbnail: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&auto=format&fit=crop&q=80",
    mentorId: "MNT-101",
    mentorName: "Rajesh Sharma",
    mentorAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80",
    rating: 4.96,
    learnersCount: 240,
    isEnrolled: true,
    progressPercentage: 80,
    completedModulesCount: 4,
    totalModulesCount: 5,
    estimatedRemainingTime: "45 mins left",
    description: "Learn systematic diagnosis of 3-phase distribution boards, thermal hotspot identification, phase load balancing, and solving neutral drop issues safely.",
    prerequisites: "Basic Single-Phase Electrical Certificate or 2+ years field experience",
    safetyWarning: "HIGH VOLTAGE HAZARD (415V): Always use 1000V insulated tools and Class 0 dielectric gloves when opening live busbar compartments.",
    modules: [
      { id: "mod-1", title: "Module 1: 3-Phase Theory & Phase-to-Phase Voltage Balancing", duration: "35 mins", completed: true },
      { id: "mod-2", title: "Module 2: Busbar Isolation & 1000V Insulated Safety Tools", duration: "40 mins", completed: true },
      { id: "mod-3", title: "Module 3: Clamp Meter Phase Current Balancing & Neutral Drift", duration: "50 mins", completed: true },
      { id: "mod-4", title: "Module 4: Residual Current Device (RCD/ELCB) Tripping Diagnostics", duration: "55 mins", completed: true },
      { id: "mod-5", title: "Module 5: Supervised Practical Live DB Replacement & Handover", duration: "60 mins", completed: false }
    ],
    practicalChecklistId: "CHK-ELEC-01",
    quizId: "QZ-ELEC-01",
    assessmentId: "ASM-101"
  },
  {
    id: "CRS-102",
    title: "Inverter Split AC PCB Circuit & Gas Leak Mastery",
    category: "Appliance",
    difficulty: "Intermediate",
    duration: "5.0 Hours • 5 Modules",
    thumbnail: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=80",
    mentorId: "MNT-102",
    mentorName: "Sunita Deshmukh",
    mentorAvatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=120&auto=format&fit=crop&q=80",
    rating: 4.95,
    learnersCount: 310,
    isEnrolled: true,
    progressPercentage: 60,
    completedModulesCount: 3,
    totalModulesCount: 5,
    estimatedRemainingTime: "1.5 hours left",
    description: "Master error code deciphering on BLDC inverter ACs, outdoor unit microcontroller testing, vacuum nitrogen holding tests, and flare nut torque precision.",
    prerequisites: "Basic refrigeration cycle understanding",
    safetyWarning: "PRESSURIZED GAS HAZARD: R32 gas is mildly flammable. Ensure zero open flame within 3 meters during recovery and brazing.",
    modules: [
      { id: "mod-1", title: "Module 1: Inverter DC Motor vs Standard AC Compressor Anatomy", duration: "45 mins", completed: true },
      { id: "mod-2", title: "Module 2: PCB Error Code Decoding with Digital Multimeter", duration: "55 mins", completed: true },
      { id: "mod-3", title: "Module 3: Nitrogen Pressure Holding & Soap Bubble Leak Test", duration: "60 mins", completed: true },
      { id: "mod-4", title: "Module 4: Two-Stage Vacuum Pump Micron Level Testing", duration: "50 mins", completed: false },
      { id: "mod-5", title: "Module 5: Supervised Inverter Compressor Diagnostic Simulation", duration: "70 mins", completed: false }
    ],
    practicalChecklistId: "CHK-APP-01",
    quizId: "QZ-APP-01",
    assessmentId: "ASM-102"
  },
  {
    id: "CRS-103",
    title: "Concealed Wall Cistern & CPVC Fusion Plumbing",
    category: "Plumbing",
    difficulty: "Intermediate",
    duration: "3.5 Hours • 4 Modules",
    thumbnail: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&auto=format&fit=crop&q=80",
    mentorId: "MNT-103",
    mentorName: "Vikram Gaikwad",
    mentorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
    rating: 4.92,
    learnersCount: 180,
    isEnrolled: true,
    progressPercentage: 40,
    completedModulesCount: 2,
    totalModulesCount: 5,
    estimatedRemainingTime: "2.0 hours left",
    description: "Learn to repair concealed push-button toilet tanks without breaking tiles, adjust float water levels, and execute leak-proof PPR pipe thermal welds.",
    prerequisites: "General plumbing tool handling",
    safetyWarning: "WATER DAMAGE RISK: Always locate and isolate the floor water riser valve before dismantling internal flush valve assemblies.",
    modules: [
      { id: "mod-1", title: "Module 1: Anatomy of Concealed Wall Tank Flush Plates & Actuators", duration: "30 mins", completed: true },
      { id: "mod-2", title: "Module 2: Inlet Diaphragm Seal Replacement & Descaling", duration: "45 mins", completed: true },
      { id: "mod-3", title: "Module 3: CPVC Solvent Cement vs PPR Heat Fusion Welding", duration: "50 mins", completed: false },
      { id: "mod-4", title: "Module 4: Hydraulic Pressure Testing & Drop Gauge Verification", duration: "40 mins", completed: false }
    ],
    practicalChecklistId: "CHK-PLUMB-01",
    quizId: "QZ-PLUMB-01",
    assessmentId: "ASM-103"
  },
  {
    id: "CRS-104",
    title: "Front-Load Washing Machine Direct Drive Diagnostics",
    category: "Appliance",
    difficulty: "Advanced",
    duration: "4.0 Hours • 4 Modules",
    thumbnail: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=500&auto=format&fit=crop&q=80",
    mentorId: "MNT-105",
    mentorName: "Mohammed Rizwan",
    mentorAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80",
    rating: 4.94,
    learnersCount: 145,
    isEnrolled: false,
    progressPercentage: 0,
    completedModulesCount: 0,
    totalModulesCount: 4,
    estimatedRemainingTime: "4.0 hours",
    description: "Diagnose heavy drum vibration, hall sensor failure, drain pump blockage, and spider arm axle corrosion on premium front-load washers.",
    prerequisites: "Basic electrical multimeter usage",
    safetyWarning: "HEAVY ROTATING DRUM HAZARD: Disconnect 230V mains and discharge capacitors before inspecting motor stator coils.",
    modules: [
      { id: "mod-1", title: "Module 1: Inverter Direct Drive Rotor & Stator Windings Check", duration: "45 mins", completed: false },
      { id: "mod-2", title: "Module 2: Hall Sensor Resistance & RPM Feedback Calibration", duration: "50 mins", completed: false },
      { id: "mod-3", title: "Module 3: Shock Absorber & Suspension Spring Replacement", duration: "55 mins", completed: false },
      { id: "mod-4", title: "Module 4: Pressure Switch (Water Level Sensor) Frequency Check", duration: "50 mins", completed: false }
    ],
    practicalChecklistId: "CHK-APP-02",
    quizId: "QZ-APP-02",
    assessmentId: "ASM-104"
  },
  {
    id: "CRS-105",
    title: "Smart Home IoT Relay Automation & Switchboard Retrofit",
    category: "Electrical",
    difficulty: "Intermediate",
    duration: "3.0 Hours • 3 Modules",
    thumbnail: "https://images.unsplash.com/photo-1558002038-1055907df827?w=500&auto=format&fit=crop&q=80",
    mentorId: "MNT-108",
    mentorName: "Karthik Iyer",
    mentorAvatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80",
    rating: 4.91,
    learnersCount: 195,
    isEnrolled: false,
    progressPercentage: 0,
    completedModulesCount: 0,
    totalModulesCount: 3,
    estimatedRemainingTime: "3.0 hours",
    description: "Install compact Wi-Fi/Zigbee smart relay modules behind existing designer switchboards without requiring civil changes or rewiring walls.",
    prerequisites: "Single-phase switchboard wiring experience",
    safetyWarning: "Always switch off the individual room sub-MCB before opening decorative faceplates.",
    modules: [
      { id: "mod-1", title: "Module 1: Smart Relay Module Anatomy & Live/Neutral Routing", duration: "45 mins", completed: false },
      { id: "mod-2", title: "Module 2: Retrofitting No-Neutral Capacitor Bypass Solutions", duration: "45 mins", completed: false },
      { id: "mod-3", title: "Module 3: 16A High-Power Geyser Contactor Automation", duration: "50 mins", completed: false }
    ],
    practicalChecklistId: "CHK-ELEC-02",
    quizId: "QZ-ELEC-02",
    assessmentId: "ASM-105"
  },
  {
    id: "CRS-106",
    title: "Mastering Customer Psychology, Estimates & 5-Star Tips",
    category: "Soft Skills",
    difficulty: "Beginner",
    duration: "2.0 Hours • 3 Modules",
    thumbnail: "https://images.unsplash.com/photo-1556742049-0a67e5572263?w=500&auto=format&fit=crop&q=80",
    mentorId: "MNT-106",
    mentorName: "Deepa Menon",
    mentorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
    rating: 4.99,
    learnersCount: 420,
    isEnrolled: false,
    progressPercentage: 100,
    completedModulesCount: 3,
    totalModulesCount: 3,
    estimatedRemainingTime: "Completed",
    description: "Turn technical excellence into customer delight. Learn professional doorstep greeting, transparent repair explanations, and earning repeat clients.",
    prerequisites: "None",
    safetyWarning: "Professional conduct and respectful doorstep communication is mandatory for all PocketHelp verified pros.",
    modules: [
      { id: "mod-1", title: "Module 1: The First 60 Seconds: Doorstep Impression & Shoe Covers", duration: "30 mins", completed: true },
      { id: "mod-2", title: "Module 2: Explaining Broken Parts & Pricing Before Touching Screws", duration: "40 mins", completed: true },
      { id: "mod-3", title: "Module 3: Post-Job Cleanup Demonstration & Requesting Honest Ratings", duration: "30 mins", completed: true }
    ],
    practicalChecklistId: "CHK-COMM-01",
    quizId: "QZ-COMM-01",
    assessmentId: "ASM-106"
  }
];

export const MOCK_TRAINING_SESSIONS = [
  {
    id: "TRN-BK-5521",
    mentorId: "MNT-101",
    mentorName: "Rajesh Sharma",
    mentorAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80",
    courseId: "CRS-101",
    topic: "3-Phase Distribution Board & Phase Balancing Live Workshop",
    date: "Tomorrow, Oct 4, 2026",
    rawDate: "2026-10-04",
    time: "10:30 AM - 11:30 AM",
    duration: "60 mins",
    format: "In-Person",
    location: "PocketHelp Skill Lab • Sector 4 Training Hub, Swargate, Pune",
    lat: 18.5074,
    lng: 73.8077,
    status: "upcoming", // 'upcoming' | 'pending' | 'in_progress' | 'completed' | 'cancelled'
    countdownHours: 21,
    meetingLink: null,
    isOnline: false,
    notes: "Please bring your 1000V insulated plier set. Safety helmets and test rigs provided at hub.",
    bookingRef: "TRN-BK-5521",
    price: "Free (Grant Sponsored)"
  },
  {
    id: "TRN-BK-5522",
    mentorId: "MNT-102",
    mentorName: "Sunita Deshmukh",
    mentorAvatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=120&auto=format&fit=crop&q=80",
    courseId: "CRS-102",
    topic: "Inverter AC Microcontroller PCB Diagnostic Codes",
    date: "Thu, Oct 6, 2026",
    rawDate: "2026-10-06",
    time: "02:00 PM - 03:30 PM",
    duration: "90 mins",
    format: "Online Video Room",
    location: "Live Virtual Lab (HD Stream)",
    status: "upcoming",
    countdownHours: 72,
    meetingLink: "https://meet.pockethelp.in/room/mentor-deshmukh-5522",
    isOnline: true,
    notes: "Keep your digital multimeter ready for live guided resistance measurements.",
    bookingRef: "TRN-BK-5522",
    price: "Free"
  },
  {
    id: "TRN-BK-5519",
    mentorId: "MNT-103",
    mentorName: "Vikram Gaikwad",
    mentorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
    courseId: "CRS-103",
    topic: "Concealed Wall Cistern Push Plate Maintenance",
    date: "Sep 28, 2026",
    rawDate: "2026-09-28",
    time: "04:00 PM - 05:00 PM",
    duration: "60 mins",
    format: "In-Person",
    location: "Hadapsar Practical Bay 2, Pune",
    lat: 18.5089,
    lng: 73.9259,
    status: "completed",
    meetingLink: null,
    isOnline: false,
    notes: "Successfully completed hands-on tear down of Geberit flush assembly.",
    bookingRef: "TRN-BK-5519",
    price: "Free",
    feedbackGiven: "Vikram sir demonstrated the trick of loosening the dual-flush lever without scratching the chrome plate. Super helpful!"
  },
  {
    id: "TRN-BK-5515",
    mentorId: "MNT-106",
    mentorName: "Deepa Menon",
    mentorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
    courseId: "CRS-106",
    topic: "Handling Difficult Customers & Upfront Diagnostic Pricing",
    date: "Sep 15, 2026",
    rawDate: "2026-09-15",
    time: "06:00 PM - 07:00 PM",
    duration: "60 mins",
    format: "Online Video Room",
    location: "Virtual Classroom",
    status: "completed",
    meetingLink: "https://meet.pockethelp.in/room/deepa-menon-5515",
    isOnline: true,
    notes: "Roleplayed 3 real-world customer price dispute scenarios.",
    bookingRef: "TRN-BK-5515",
    price: "Free"
  }
];

export const MOCK_PRACTICAL_CHECKLISTS = [
  {
    id: "CHK-ELEC-01",
    courseId: "CRS-101",
    title: "Practical Verification: 3-Phase DB Load & Safety Audit",
    skillCategory: "Electrical",
    mentorName: "Rajesh Sharma",
    status: "submitted_for_review", // 'in_progress' | 'submitted_for_review' | 'verified_passed' | 'revision_requested'
    riskLevel: "High Risk (415V)",
    supervisionRequired: true,
    tasks: [
      {
        id: "t1",
        label: "Visual Inspection of busbars for thermal oxidation or discolored lugs",
        completed: true,
        learnerNotes: "Inspected R-Y-B busbars with FLIR thermal cam simulation. No hot spots > 42°C.",
        evidenceUploaded: true,
        evidenceName: "busbar_thermal_scan.jpg",
        mentorStatus: "approved"
      },
      {
        id: "t2",
        label: "Measure Phase-to-Phase (415V) and Phase-to-Neutral (230V) with true RMS meter",
        completed: true,
        learnerNotes: "Recorded R-Y: 414V, Y-B: 416V, B-R: 412V. Phase-to-Neutral: 231V steady.",
        evidenceUploaded: true,
        evidenceName: "multimeter_voltage_readings.png",
        mentorStatus: "approved"
      },
      {
        id: "t3",
        label: "Conduct Clamp Meter Load Balancing across R, Y, and B conductors",
        completed: true,
        learnerNotes: "Shifted Geyser circuit to Phase B. Reduced current imbalance from 18A to 2.4A delta.",
        evidenceUploaded: true,
        evidenceName: "clamp_current_chart.pdf",
        mentorStatus: "approved"
      },
      {
        id: "t4",
        label: "Verify 30mA RCD trip time using calibrated Earth Leakage Tester",
        completed: true,
        learnerNotes: "Trip time tested at 24.2 milliseconds. Passed IS 12640 standard.",
        evidenceUploaded: true,
        evidenceName: "rcd_tester_result.png",
        mentorStatus: "approved"
      },
      {
        id: "t5",
        label: "Supervised live mock assessment with designated Senior Assessor",
        completed: false,
        learnerNotes: "Scheduled for tomorrow with Rajesh Sharma at Swargate Hub.",
        evidenceUploaded: false,
        evidenceName: null,
        mentorStatus: "pending_demo"
      }
    ],
    mentorFeedback: "Jaya, your voltage balance notes and clamp load calculations are immaculate! Complete the hands-on DB replacement module tomorrow to get your final NSDC assessment sign-off."
  },
  {
    id: "CHK-APP-01",
    courseId: "CRS-102",
    title: "Practical Verification: Inverter AC PCB & Flare Connection",
    skillCategory: "Appliance",
    mentorName: "Sunita Deshmukh",
    status: "in_progress",
    riskLevel: "Medium (Refrigerant & Pressure)",
    supervisionRequired: true,
    tasks: [
      {
        id: "t1",
        label: "Inspect flared copper tube end for burrs, mirror finish & proper collar angle",
        completed: true,
        learnerNotes: "Used eccentric flaring tool with ratchet torque. 45-degree angle verified with gauge.",
        evidenceUploaded: true,
        evidenceName: "copper_flare_macro.jpg",
        mentorStatus: "approved"
      },
      {
        id: "t2",
        label: "Tighten flare nuts to OEM torque specs (16-18 N.m for 1/4\", 38-42 N.m for 1/2\")",
        completed: true,
        learnerNotes: "Torque wrench used on high pressure liquid line.",
        evidenceUploaded: false,
        mentorStatus: "pending"
      },
      {
        id: "t3",
        label: "Run 2-stage vacuum pump below 500 microns and hold for 20 mins",
        completed: false,
        learnerNotes: "",
        evidenceUploaded: false,
        mentorStatus: "pending"
      },
      {
        id: "t4",
        label: "Measure DC voltage between IPM pins and compressor U-V-W terminals",
        completed: false,
        learnerNotes: "",
        evidenceUploaded: false,
        mentorStatus: "pending"
      }
    ],
    mentorFeedback: "Good start on the flaring technique. Remember to apply POE refrigeration oil to the flare face before tightening."
  }
];

export const MOCK_QUIZZES = [
  {
    id: "QZ-ELEC-01",
    courseId: "CRS-101",
    title: "Knowledge Check: 3-Phase Distribution & Industrial Safety",
    timeLimitMinutes: 10,
    passingScorePercentage: 80,
    questions: [
      {
        id: "q1",
        question: "When measuring a 3-phase, 4-wire standard Indian supply, what is the expected nominal voltage between two active phase lines (e.g. Line 1 to Line 2)?",
        options: [
          "230 Volts AC",
          "415 Volts AC",
          "110 Volts AC",
          "600 Volts DC"
        ],
        correctIndex: 1,
        explanation: "In a standard Indian 3-phase low-voltage distribution system, the phase-to-neutral voltage is 230V, and the line-to-line (phase-to-phase) voltage is √3 × 230V ≈ 415V AC."
      },
      {
        id: "q2",
        question: "Why is a significant neutral current observed in a 3-phase building system even when all phases are active?",
        options: [
          "Because the neutral wire is oversized",
          "Due to severe phase load imbalance and non-linear harmonic loads (LEDs, SMPS)",
          "Because the earth pit resistance is zero ohms",
          "It is standard normal behavior and never causes overheating"
        ],
        correctIndex: 1,
        explanation: "Unbalanced phase loads and triplen harmonics generated by non-linear electronic appliances cause excess return current in the neutral conductor, requiring load balancing."
      },
      {
        id: "q3",
        question: "What is the maximum permissible trip time for a 30mA personal safety RCD/ELCB when tested at rated residual operating current according to Indian standards?",
        options: [
          "300 milliseconds",
          "10 seconds",
          "1.5 seconds",
          "50 milliseconds (or within 40ms for high-speed devices)"
        ],
        correctIndex: 0,
        explanation: "Standard general-purpose 30mA RCDs must trip within 300ms at 1x IΔn to protect human life against lethal ventricular fibrillation."
      },
      {
        id: "q4",
        question: "Before performing any physical work inside an industrial 3-phase distribution enclosure, which mandatory procedure must be completed?",
        options: [
          "Wear standard cotton gardening gloves and start unscrewing",
          "Perform Lock-Out / Tag-Out (LOTO), verify zero voltage with an approved two-pole tester, and check PPE rating",
          "Turn off only the light switch in the room",
          "Pour water near the earth pit to improve grounding first"
        ],
        correctIndex: 1,
        explanation: "Mandatory safety protocol requires LOTO isolation, zero voltage testing with a verified tester (proving dead), and wearing rated dielectric PPE before touching busbars."
      }
    ]
  }
];

export const MOCK_ASSESSMENTS = [
  {
    id: "ASM-101",
    learnerId: "WKR-9082",
    learnerName: "Jaya Kumari",
    mentorId: "MNT-101",
    mentorName: "Rajesh Sharma",
    skillId: "SK-ELEC-01",
    skillName: "3-Phase Distribution & MCB Load Balancing",
    category: "Electrical",
    status: "ready_for_final_review", // 'requested' | 'scheduled' | 'ready_for_final_review' | 'passed' | 'needs_practice'
    scheduledDate: "Tomorrow, 11:30 AM",
    completedPrerequisites: [
      "Completed 4/5 Course Modules (CRS-101)",
      "Scored 100% on Safety & Standards Quiz",
      "Submitted 4 Verified Practical Checklist Items"
    ],
    rubricCriteria: [
      {
        id: "crit-1",
        title: "Understanding of Tools & Safety Equipment",
        description: "Selection of 1000V insulated screwdrivers, true-RMS clamp meter, safety shield, and insulated footwear.",
        status: "meets_requirements", // 'not_assessed' | 'needs_practice' | 'meets_requirements'
        mentorNotes: "Demonstrated proper pre-check of meter probes and calibration date."
      },
      {
        id: "crit-2",
        title: "Isolation & Safe Work Procedure (LOTO)",
        description: "Proper disconnection sequence, padlocking breaker, and proving dead with multimeter before touch.",
        status: "meets_requirements",
        mentorNotes: "Flawless adherence to lockout protocols."
      },
      {
        id: "crit-3",
        title: "Load Calculation & Phase Balancing Execution",
        description: "Measuring per-phase amperage under simulated peak load and redistributing single-phase circuits evenly.",
        status: "meets_requirements",
        mentorNotes: "Balanced the 3 phases from 32A/12A/8A to a harmonious 18A/17A/17A distribution."
      },
      {
        id: "crit-4",
        title: "Torque & Termination Quality",
        description: "Correct ferrule crimping, no exposed copper whiskers, and tightening to specified Newton-meter torque.",
        status: "meets_requirements",
        mentorNotes: "Neat cable comb dressing and proper ferrule color coding."
      },
      {
        id: "crit-5",
        title: "Troubleshooting & Fault Simulation",
        description: "Diagnosing an injected neutral open-circuit fault within 10 minutes.",
        status: "meets_requirements",
        mentorNotes: "Identified floating neutral condition in under 4 minutes using phase-to-ground test."
      },
      {
        id: "crit-6",
        title: "Customer Handover & Safety Advice",
        description: "Polite explanation to property owner, labeling distribution panel schedule, and presenting test report.",
        status: "meets_requirements",
        mentorNotes: "Clear, reassuring communication with customer-ready test card."
      }
    ],
    overallFeedback: "Exceptional mastery of high-voltage domestic and light-commercial 3-phase power distribution. Recommended for instant PocketHelp Platinum Verified Competency Credential.",
    finalResult: "passed", // 'passed' | 'needs_practice' | 'additional_training'
    assessmentDate: "Oct 03, 2026",
    issuedCertificateId: "CERT-ELEC-2026-9082"
  },
  {
    id: "ASM-102",
    learnerId: "WKR-9082",
    learnerName: "Jaya Kumari",
    mentorId: "MNT-102",
    mentorName: "Sunita Deshmukh",
    skillId: "SK-APP-01",
    skillName: "Inverter Split AC PCB Circuit & Gas Leak Mastery",
    category: "Appliance",
    status: "scheduled",
    scheduledDate: "Oct 06, 2026 at 03:00 PM",
    completedPrerequisites: [
      "Completed 3/5 Course Modules (CRS-102)",
      "Passed Inverter Theory Check",
      "Submitted 2 Flare Connection Photos"
    ],
    rubricCriteria: [
      {
        id: "crit-1",
        title: "Refrigerant Handling & Recovery Safety",
        description: "Zero atmospheric venting, recovery cylinder pressure check, safety glasses.",
        status: "not_assessed",
        mentorNotes: ""
      },
      {
        id: "crit-2",
        title: "Inverter PCB Diagnostic Flow",
        description: "Testing IPM bridge, thermistor resistance charts, and communication signal DC voltage.",
        status: "not_assessed",
        mentorNotes: ""
      },
      {
        id: "crit-3",
        title: "Nitrogen Pressure Holding & Vacuum Testing",
        description: "Maintaining 350 PSI dry nitrogen test for 15 minutes followed by < 500 micron deep vacuum.",
        status: "not_assessed",
        mentorNotes: ""
      }
    ],
    overallFeedback: "Scheduled practical assessment session at Baner Lab.",
    finalResult: null,
    assessmentDate: null
  }
];

export const MOCK_ACHIEVEMENTS = [
  {
    id: "ACH-01",
    title: "3-Phase Distribution Master",
    badgeIcon: "Zap",
    category: "Electrical",
    type: "verified_competency",
    date: "Jan 14, 2026",
    issuer: "PocketHelp Academy & NSDC Assessor",
    score: 96,
    mentor: "Rajesh Sharma",
    verified: true,
    certificateId: "CERT-ELEC-2026-9082",
    description: "Verified ability to diagnose, balance, and install 3-phase industrial switchboards up to 63A."
  },
  {
    id: "ACH-02",
    title: "Solar & Hybrid Inverter Specialist",
    badgeIcon: "Sun",
    category: "Electrical",
    type: "verified_competency",
    date: "Feb 02, 2026",
    issuer: "PocketHelp Energy Division",
    score: 92,
    mentor: "Vikram Gaikwad",
    verified: true,
    certificateId: "CERT-SLR-2026-9082",
    description: "Certified for smart micro-inverter synchronization and lithium-ion backup storage wiring."
  },
  {
    id: "ACH-03",
    title: "High-Voltage Safety & Arc Flash Certified",
    badgeIcon: "ShieldCheck",
    category: "Safety & Tools",
    type: "safety_certification",
    date: "Nov 20, 2025",
    issuer: "National Safety Council of India",
    score: 100,
    mentor: "NSDC Safety Board",
    verified: true,
    certificateId: "CERT-SAFE-2025-9082",
    description: "Mastery of OSHA & IS electrical safety protocols, PPE Class 0-2, and emergency isolation."
  },
  {
    id: "ACH-04",
    title: "5-Star Customer Communicator",
    badgeIcon: "Award",
    category: "Soft Skills",
    type: "course_completion",
    date: "Dec 10, 2025",
    issuer: "PocketHelp Service Excellence Hub",
    score: 95,
    mentor: "Deepa Menon",
    verified: true,
    certificateId: "CERT-COMM-2025-9082",
    description: "Demonstrated top-tier professionalism, transparent quote estimation, and dispute resolution."
  },
  {
    id: "ACH-05",
    title: "Peer Mentor Pioneer (Level 1)",
    badgeIcon: "GraduationCap",
    category: "Mentorship",
    type: "mentor_milestone",
    date: "Feb 18, 2026",
    issuer: "SkillConnect Community",
    score: 98,
    mentor: "Self / Assessed by Peer Board",
    verified: true,
    certificateId: "CERT-MNT-2026-9082",
    description: "Conducted over 15 hours of practical training for junior electricians in Sector 4."
  }
];

export const MOCK_JOB_ELIGIBILITY_MATRIX = [
  {
    id: "ELIG-01",
    jobTitle: "Industrial 3-Phase Main Distribution Board Short Circuit Repair",
    category: "Electrical",
    payout: "₹850 - ₹1,400 per dispatch",
    requiredSkill: "3-Phase Distribution & MCB Load Balancing",
    isEligible: true,
    eligibilityReason: "Unlocked by your Verified Competency Credential (CERT-ELEC-2026-9082)",
    demandTier: "High Demand • Platinum Rate",
    availableJobsToday: 4
  },
  {
    id: "ELIG-02",
    jobTitle: "Smart Solar Inverter Net-Metering & Hybrid Battery Backup Setup",
    category: "Electrical",
    payout: "₹1,200 - ₹2,200 per dispatch",
    requiredSkill: "Solar & Hybrid Inverter Integration",
    isEligible: true,
    eligibilityReason: "Unlocked by Solar Hybrid Competency Certificate",
    demandTier: "Super Premium Rate",
    availableJobsToday: 2
  },
  {
    id: "ELIG-03",
    jobTitle: "Inverter Multi-Split AC PCB Error Diagnostic & Gas Charge",
    category: "Appliance",
    payout: "₹750 - ₹1,100 per dispatch",
    requiredSkill: "Inverter Split AC PCB Circuit & Gas Leak Mastery",
    isEligible: false,
    eligibilityReason: "Locked: Requires completion of Module 4 & Final Assessment with Sunita Deshmukh",
    missingSkill: "Inverter AC PCB Diagnostic Verification",
    recommendedCourseId: "CRS-102",
    recommendedMentorId: "MNT-102",
    estimatedTimeToUnlock: "2.5 Hours",
    demandTier: "Very High Demand in Summer",
    availableJobsToday: 7
  },
  {
    id: "ELIG-04",
    jobTitle: "Concealed Wall-Hung Geberit Cistern Overhaul & Leak Sealing",
    category: "Plumbing",
    payout: "₹800 - ₹1,350 per dispatch",
    requiredSkill: "Concealed Wall Cistern & CPVC Fusion Plumbing",
    isEligible: false,
    eligibilityReason: "Locked: Practical Checklist pending supervised assessment",
    missingSkill: "Wall Cistern Hydraulic Pressure Test Sign-off",
    recommendedCourseId: "CRS-103",
    recommendedMentorId: "MNT-103",
    estimatedTimeToUnlock: "3.0 Hours",
    demandTier: "High Paying Luxury Sector",
    availableJobsToday: 5
  },
  {
    id: "ELIG-05",
    jobTitle: "Front-Load Inverter Washing Machine Drum Bearing & Spider Arm Overhaul",
    category: "Appliance",
    payout: "₹950 - ₹1,600 per dispatch",
    requiredSkill: "Direct Drive Drum Bearing Replacement",
    isEligible: false,
    eligibilityReason: "Locked: Not yet enrolled in Direct Drive course",
    missingSkill: "Direct Drive Stator Testing & Bearing Puller Technique",
    recommendedCourseId: "CRS-104",
    recommendedMentorId: "MNT-105",
    estimatedTimeToUnlock: "4.0 Hours",
    demandTier: "High Ticket Value",
    availableJobsToday: 3
  }
];

export const MOCK_APPRENTICESHIP_OPPORTUNITIES = [
  {
    id: "APPR-01",
    title: "Supervised Co-Working: 5-Ton Commercial VRV / VRF Air Conditioning Commissioning",
    mentorName: "Sunita Deshmukh",
    mentorAvatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=120&auto=format&fit=crop&q=80",
    mentorTitle: "Lead HVAC Master Trainer",
    location: "IT Tech Park, Balewadi, Pune",
    stipend: "₹650 Training Allowance / Day + Travel",
    duration: "1 Full Day (8 Hours)",
    date: "Saturday, Oct 11, 2026",
    learnerRole: "Co-Pilot Technician (Vacuum & Flaring Shadowing)",
    prerequisites: "Inverter AC Course (Module 1-3 completed)",
    customerConsentGranted: true,
    safetyOfficerAssigned: "Yes (On-site PocketHelp Safety Marshal)",
    spotsAvailable: 2,
    spotsTotal: 3,
    description: "Hands-on commercial building job where you work directly alongside Master Mentor Sunita to commission a 5-ton multi-zone VRV air conditioning system. Great way to bridge theory into live commercial earning."
  },
  {
    id: "APPR-02",
    title: "Supervised Co-Working: Complete 3-Phase Factory Substation Busbar Retrofit",
    mentorName: "Rajesh Sharma",
    mentorAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80",
    mentorTitle: "Chief Master Electrician",
    location: "Bhosari Industrial Estate, Pune",
    stipend: "₹800 Training Allowance / Day",
    duration: "2 Days (Weekend Workshop)",
    date: "Oct 18 - 19, 2026",
    learnerRole: "Junior Shadow Wireman",
    prerequisites: "3-Phase Distribution Competency (Passed)",
    customerConsentGranted: true,
    safetyOfficerAssigned: "Yes (LOTO Certified Supervisor)",
    spotsAvailable: 1,
    spotsTotal: 2,
    description: "Industrial grade transformer to main LT panel busbar installation and heavy crimping (up to 300 sq mm copper). Premium hands-on experience."
  }
];

export const MOCK_MENTOR_REGISTRATION_DATA = {
  applicationRef: "MNT-APP-9821",
  submissionDate: "Sep 20, 2026",
  status: "verified", // 'draft' | 'submitted' | 'under_review' | 'practical_assessment' | 'verified' | 'rejected'
  stepStatuses: {
    identityVerification: "verified",
    documentReview: "verified",
    practicalSkillTest: "verified",
    mentorEligibility: "approved"
  },
  selectedCategories: ["Electrical Services", "Safety & Compliance"],
  selectedSkills: [
    { name: "3-Phase Distribution Board Installation", experience: "8 Years", proficiency: "Master", assessed: true },
    { name: "Smart Inverter & UPS Setup", experience: "5 Years", proficiency: "Expert", assessed: true },
    { name: "High-Voltage PPE Safety Protocols", experience: "8 Years", proficiency: "Master", assessed: true }
  ],
  teachingPreferences: {
    formats: ["Online 1-on-1", "In-Person Hub (Pune)", "Small Group Lab"],
    maxLearnersPerSession: 4,
    preferredLearnerLevel: "Beginner to Intermediate",
    availableDays: ["Monday", "Wednesday", "Friday", "Saturday"],
    availableTimeSlots: ["Morning (10:00 AM - 12:30 PM)", "Evening (04:00 PM - 06:30 PM)"],
    freeSessions: true,
    hourlyRateINR: 0 // Free or subsidized
  },
  uploadedEvidence: [
    { name: "Maharashtra_Electrical_Supervisor_License.pdf", size: "2.4 MB", type: "Official State License", verified: true },
    { name: "NSDC_Master_Trainer_Cert.pdf", size: "1.8 MB", type: "National Training Certificate", verified: true },
    { name: "Live_Panel_Wiring_Demo_Video.mp4", size: "45.1 MB", type: "Practical Demonstration Video", verified: true }
  ]
};

export const MOCK_MENTOR_LEARNERS_ROSTER = [
  {
    id: "LRN-401",
    name: "Akash Shinde",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80",
    skillLearning: "3-Phase Distribution & MCB Load Balancing",
    currentStage: "Guided Practice (Stage 3)",
    progressPercent: 70,
    trainingHours: 8.5,
    lastActivity: "Submitted clamp meter load balancing checklist",
    nextSession: "Tomorrow, 10:30 AM",
    assessmentPending: false,
    phone: "+91 98210 44211",
    notes: "Very attentive, needs minor guidance on neutral harmonic calculation."
  },
  {
    id: "LRN-402",
    name: "Pooja Hegde",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
    skillLearning: "Smart Inverter & Solar Hybrid UPS",
    currentStage: "Supervised Assessment (Stage 4)",
    progressPercent: 90,
    trainingHours: 12.0,
    lastActivity: "Requested Final Assessment Rubric Evaluation",
    nextSession: "Friday, 11:00 AM",
    assessmentPending: true,
    phone: "+91 98234 11990",
    notes: "Ready for verified competency sign-off. High aptitude in solar MPPT configuration."
  },
  {
    id: "LRN-403",
    name: "Mohan Lal",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    skillLearning: "High-Voltage Workplace Safety & LOTO",
    currentStage: "Foundation Learning (Stage 2)",
    progressPercent: 45,
    trainingHours: 4.0,
    lastActivity: "Completed Quiz with 90%",
    nextSession: "Saturday, 09:30 AM",
    assessmentPending: false,
    phone: "+91 98220 88312",
    notes: "Encourage hands-on practice with earth resistance Megger tester."
  }
];

export const MOCK_ACTIVITY_TIMELINE = [
  {
    id: "ACT-01",
    type: "assessment_passed",
    title: "Verified Competency Earned: 3-Phase Distribution",
    subtitle: "Assessed & signed off by Master Trainer Rajesh Sharma with 96% score",
    time: "Today, 11:45 AM",
    icon: "ShieldCheck",
    color: "text-emerald-400 bg-emerald-500/20"
  },
  {
    id: "ACT-02",
    type: "checklist_submitted",
    title: "Submitted Practical DB Load Balancing Checklist",
    subtitle: "4 tasks completed with FLIR thermal photo and clamp meter evidence",
    time: "Yesterday, 04:30 PM",
    icon: "CheckCircle2",
    color: "text-blue-400 bg-blue-500/20"
  },
  {
    id: "ACT-03",
    type: "session_booked",
    title: "Booked Training Session with Sunita Deshmukh",
    subtitle: "Inverter AC PCB Microcontroller Diagnostic Codes • Thu, Oct 6",
    time: "2 days ago",
    icon: "Calendar",
    color: "text-amber-400 bg-amber-500/20"
  },
  {
    id: "ACT-04",
    type: "quiz_passed",
    title: "100% Score on High-Voltage LOTO Safety Quiz",
    subtitle: "Answered 4/4 scenario questions correctly in under 6 minutes",
    time: "3 days ago",
    icon: "Award",
    color: "text-teal-400 bg-teal-500/20"
  },
  {
    id: "ACT-05",
    type: "course_started",
    title: "Enrolled in Inverter Split AC PCB Circuit & Gas Leak Mastery",
    subtitle: "5 modules • Led by Master Trainer Sunita Deshmukh",
    time: "5 days ago",
    icon: "BookOpen",
    color: "text-indigo-400 bg-indigo-500/20"
  }
];

export const SKILLCONNECT_NOTIFICATIONS = [
  {
    id: "sk-notif-1",
    category: "mentorship",
    title: "🎓 Assessment Ready: 3-Phase Distribution Board",
    message: "Master Assessor Rajesh Sharma marked your rubric criteria as 'Meets Requirements' with 96% score. Your official certificate is ready!",
    time: "10 mins ago",
    unread: true,
    page: "my_achievements"
  },
  {
    id: "sk-notif-2",
    category: "training",
    title: "📅 Upcoming Session Reminder: Tomorrow at 10:30 AM",
    message: "Hands-on 3-Phase DB replacement at Swargate Hub with Rajesh Sharma. Please arrive 10 mins early.",
    time: "1 hour ago",
    unread: true,
    page: "my_training"
  },
  {
    id: "sk-notif-3",
    category: "job_unlocked",
    title: "💼 High-Payout Job Category Unlocked! (₹850 - ₹1,400)",
    message: "Industrial 3-Phase short circuit jobs are now active on your dispatch queue due to your newly verified competency.",
    time: "2 hours ago",
    unread: true,
    page: "job_eligibility"
  },
  {
    id: "sk-notif-4",
    category: "mentor_feedback",
    title: "💬 Feedback from Sunita Deshmukh on AC Checklist",
    message: "'Great flare finish Jaya! Remember to put POE oil on the seat before tightening.'",
    time: "1 day ago",
    unread: false,
    page: "learning_library"
  }
];
