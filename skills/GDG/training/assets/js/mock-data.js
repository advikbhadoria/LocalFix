/**
 * SkillConnect Comprehensive Mock Data
 * Realistic, domain-accurate data for worker learning and peer mentorship
 */

export const INITIAL_MOCK_DATA = {
  // Current logged in worker profile
  currentUser: {
    id: "wrk_9042",
    name: "Alex Rivera",
    role: "Service Professional",
    email: "alex.rivera@proservices.com",
    phone: "+1 (555) 382-9104",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    location: "Austin, Texas",
    rating: 4.88,
    reviewsCount: 142,
    dutyStatus: "online", // online, busy, offline
    currentLearningLevel: "Level 2 • Intermediate Technician",
    verifiedSkills: ["Basic Plumbing Repair", "Customer Communication & Etiquette"],
    inProgressSkills: ["Commercial Electrical Maintenance", "HVAC Diagnostics"],
    stats: {
      skillsLearning: 2,
      skillsCompleted: 3,
      trainingHours: 28.5,
      practicalHours: 14.0,
      mentorSessionsAttended: 6,
      upcomingSessions: 2,
      verifiedBadgesCount: 3
    }
  },

  // 8+ Realistic Mentor Profiles across varied trades
  mentors: [
    {
      id: "mnt_101",
      name: "Marcus Vance",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
      primarySkill: "Electrical Services",
      verifiedSkills: ["Commercial 3-Phase Wiring", "Circuit Breakers & Faults", "Solar Inverter Systems"],
      experienceYears: 14,
      rating: 4.95,
      reviewsCount: 84,
      languages: ["English", "Spanish"],
      trainingFormats: ["online", "in-person", "supervised-field"],
      hourlyRate: 35, // Free or $35/hr
      isFree: false,
      location: "North Austin / Metro",
      bio: "Master Electrician with 14 years of commercial and residential experience. Passionate about teaching safety-first troubleshooting and modern breaker diagnostics.",
      methodology: "Hands-on fault replication, step-by-step schematics reading, and real-time safety auditing.",
      totalSessionsConducted: 136,
      availability: {
        days: ["Monday", "Wednesday", "Saturday"],
        slots: ["09:00 AM", "11:30 AM", "02:00 PM", "04:30 PM"]
      },
      reviews: [
        { id: "rev_1", learner: "David Chen", rating: 5, date: "2 days ago", comment: "Marcus helped me diagnose a 3-phase balancing problem that had me stuck for weeks. Incredible mentor!" },
        { id: "rev_2", learner: "Sarah Jenkins", rating: 5, date: "1 week ago", comment: "Clear safety guidelines and very patient during the practical multimeter tests." }
      ]
    },
    {
      id: "mnt_102",
      name: "Elena Rostova",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80",
      primarySkill: "Plumbing & Piping",
      verifiedSkills: ["PEX & Copper Soldering", "Hydro-Jetting Drain Clearing", "Water Heater Installation"],
      experienceYears: 11,
      rating: 4.92,
      reviewsCount: 62,
      languages: ["English", "Russian"],
      trainingFormats: ["online", "in-person"],
      hourlyRate: 0,
      isFree: true,
      location: "South Austin / Oak Hill",
      bio: "Licensed Journeyman Plumber. Specialized in clean solder techniques, leak detection acoustic sensors, and tankless water heater maintenance.",
      methodology: "Practical simulation boards, pressure testing protocols, and client communication during emergency repairs.",
      totalSessionsConducted: 98,
      availability: {
        days: ["Tuesday", "Thursday", "Friday"],
        slots: ["10:00 AM", "01:00 PM", "03:30 PM"]
      },
      reviews: [
        { id: "rev_3", learner: "Alex Rivera", rating: 5, date: "3 weeks ago", comment: "Elena taught me proper PEX crimping and copper brazing under tight sink spaces. Top tier teacher." }
      ]
    },
    {
      id: "mnt_103",
      name: "Darnell Washington",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
      primarySkill: "HVAC & Climate Control",
      verifiedSkills: ["Refrigerant Recovery (EPA 608)", "Compressor Diagnostics", "Thermostat Smart Integration"],
      experienceYears: 16,
      rating: 4.98,
      reviewsCount: 112,
      languages: ["English"],
      trainingFormats: ["online", "in-person", "supervised-field"],
      hourlyRate: 40,
      isFree: false,
      location: "Central Austin / Downtown",
      bio: "Certified HVAC Specialist & Technical Instructor. 16 years troubleshooting rooftop units, split heat pumps, and modern IoT climate controls.",
      methodology: "Systematic pressure/temperature differential analysis and EPA compliance checklists.",
      totalSessionsConducted: 210,
      availability: {
        days: ["Monday", "Tuesday", "Thursday", "Saturday"],
        slots: ["08:30 AM", "11:00 AM", "02:30 PM"]
      },
      reviews: [
        { id: "rev_4", learner: "Carlos M.", rating: 5, date: "5 days ago", comment: "Darnell explains superheat and subcooling better than any textbook. Truly a master craftsman." }
      ]
    },
    {
      id: "mnt_104",
      name: "Priya Patel",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80",
      primarySkill: "Appliance Repair",
      verifiedSkills: ["Inverter Refrigerator Circuits", "Front-Load Washer Mechanics", "Microwave Magnetron Safety"],
      experienceYears: 9,
      rating: 4.89,
      reviewsCount: 47,
      languages: ["English", "Hindi", "Gujarati"],
      trainingFormats: ["online", "in-person"],
      hourlyRate: 25,
      isFree: false,
      location: "Round Rock / North Metro",
      bio: "Factory-authorized appliance technician. I help young technicians decode error codes, test PCB sensor arrays, and handle delicate appliance repairs without scratching client cabinetry.",
      methodology: "Live error-code matrix walkthroughs and component resistance testing.",
      totalSessionsConducted: 74,
      availability: {
        days: ["Wednesday", "Friday", "Sunday"],
        slots: ["10:00 AM", "01:30 PM", "04:00 PM"]
      },
      reviews: [
        { id: "rev_5", learner: "James K.", rating: 5, date: "1 week ago", comment: "Clear, structured, and gave me high quality fault code reference sheets." }
      ]
    },
    {
      id: "mnt_105",
      name: "Mateo Silva",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80",
      primarySkill: "Carpentry & Joinery",
      verifiedSkills: ["Cabinetry Custom Fitting", "Door & Lock Mortising", "Structural Framing Safety"],
      experienceYears: 13,
      rating: 4.91,
      reviewsCount: 53,
      languages: ["English", "Portuguese", "Spanish"],
      trainingFormats: ["in-person", "supervised-field"],
      hourlyRate: 0,
      isFree: true,
      location: "East Austin",
      bio: "Master Finish Carpenter with 13 years crafting custom woodwork. Dedicated to teaching precision measurements, chisel sharpening, and flawless miters.",
      methodology: "Workshop bench practice, laser alignment, and zero-gap joint verification.",
      totalSessionsConducted: 89,
      availability: {
        days: ["Tuesday", "Thursday", "Saturday"],
        slots: ["09:00 AM", "01:00 PM", "03:30 PM"]
      },
      reviews: []
    },
    {
      id: "mnt_106",
      name: "Hannah Lindqvist",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80",
      primarySkill: "Customer Service & Ethics",
      verifiedSkills: ["De-escalation Techniques", "Upselling Service Maintenance", "Professional Work Area Hygiene"],
      experienceYears: 8,
      rating: 4.97,
      reviewsCount: 95,
      languages: ["English", "Swedish"],
      trainingFormats: ["online"],
      hourlyRate: 20,
      isFree: false,
      location: "Remote / Online",
      bio: "Former Lead Service Manager. I coach field technicians on how to increase customer 5-star ratings, communicate estimates with confidence, and resolve difficult client situations smoothly.",
      methodology: "Interactive roleplay scenarios, vocal tone coaching, and written quote structuring.",
      totalSessionsConducted: 180,
      availability: {
        days: ["Monday", "Wednesday", "Friday"],
        slots: ["11:00 AM", "02:00 PM", "05:00 PM"]
      },
      reviews: []
    },
    {
      id: "mnt_107",
      name: "Samuel Osei",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80",
      primarySkill: "Workplace Safety & Hazard Control",
      verifiedSkills: ["OSHA-10 Compliance", "PPE Inspection & Arc Flash", "Hazardous Chemical Handling"],
      experienceYears: 15,
      rating: 4.96,
      reviewsCount: 78,
      languages: ["English"],
      trainingFormats: ["online", "in-person"],
      hourlyRate: 0,
      isFree: true,
      location: "West Austin / Lakeway",
      bio: "Senior Safety Auditor and certified trainer. My goal is to ensure every service worker returns home safely every single day by mastering situational hazard checks.",
      methodology: "Hazard identification drills, Lockout/Tagout physical simulation, and PPE durability testing.",
      totalSessionsConducted: 145,
      availability: {
        days: ["Monday", "Thursday", "Friday"],
        slots: ["09:00 AM", "12:00 PM", "03:00 PM"]
      },
      reviews: []
    },
    {
      id: "mnt_108",
      name: "Lucia Morales",
      avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=200&auto=format&fit=crop&q=80",
      primarySkill: "Professional Cleaning & Restoration",
      verifiedSkills: ["Industrial Carpet Extraction", "Mold Remediation Protocols", "Hardwood Floor Polishing"],
      experienceYears: 10,
      rating: 4.93,
      reviewsCount: 65,
      languages: ["English", "Spanish"],
      trainingFormats: ["in-person", "supervised-field"],
      hourlyRate: 30,
      isFree: false,
      location: "South Austin",
      bio: "Certified Restoration Technician. Learn commercial-grade chemical dilution, rotary scrubber handling, and post-construction deep cleaning standards.",
      methodology: "Chemical safety ratios, stain extraction chemistry, and speed-efficiency floor workflows.",
      totalSessionsConducted: 102,
      availability: {
        days: ["Tuesday", "Wednesday", "Saturday"],
        slots: ["08:00 AM", "11:30 AM", "02:00 PM"]
      },
      reviews: []
    }
  ],

  // 6+ High Value Courses with Video Lessons, Practical Checklists, and Quizzes
  courses: [
    {
      id: "crs_1",
      title: "Basic Electrical Maintenance & Safety",
      category: "Electrical Services",
      difficulty: "beginner",
      duration: "3 hrs 45 mins",
      totalLessons: 6,
      completedLessons: 4,
      progressPercent: 66,
      mentorName: "Marcus Vance",
      mentorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      thumbnail: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&auto=format&fit=crop&q=80",
      description: "Master foundational electrical safety, multimeter usage, outlet wiring, and basic circuit breaker troubleshooting under master electrician guidance.",
      lessons: [
        { id: "les_1_1", title: "1. Core Electrical Safety & Lockout/Tagout", duration: "12:40", completed: true, videoUrl: "sample_elec_1", summary: "Learn mandatory PPE, voltage testers, and how to verify zero power before touching any terminal." },
        { id: "les_1_2", title: "2. Understanding Voltage, Current & Resistance", duration: "18:15", completed: true, videoUrl: "sample_elec_2", summary: "Master Ohm's Law and how to use digital multimeters safely for continuity and voltage drops." },
        { id: "les_1_3", title: "3. Single Phase vs 3-Phase Circuits", duration: "24:00", completed: true, videoUrl: "sample_elec_3", summary: "Identify phase wires, neutral busbars, ground rods, and sub-panel architectures." },
        { id: "les_1_4", title: "4. Receptacle & Switch Replacement Techniques", duration: "20:30", completed: true, videoUrl: "sample_elec_4", summary: "Standard duplex outlets, GFCI installation, tamper-resistant requirements, and torque specs." },
        { id: "les_1_5", title: "5. Circuit Breaker Diagnostics & Tripping Faults", duration: "26:10", completed: false, videoUrl: "sample_elec_5", summary: "Differentiating between overcurrent trips, short circuits, and ground faults." },
        { id: "les_1_6", title: "6. Practical Field Checklist & Final Review", duration: "15:00", completed: false, videoUrl: "sample_elec_6", summary: "Step-by-step pre-job safety assessment and customer handover procedures." }
      ],
      practicalChecklist: [
        { id: "chk_1", task: "Verify zero voltage using a calibrated non-contact voltage detector and digital multimeter.", safetyWarning: "Critical: Always test the detector on a known live source first (Live-Dead-Live rule).", requiredTools: ["Digital Multimeter (CAT III)", "Non-Contact Voltage Detector"], learnerCompleted: true, mentorVerified: true },
        { id: "chk_2", task: "Correctly strip, hook, and torque 14/2 AWG copper wire around terminal screws in clockwise orientation.", safetyWarning: "Ensure no stray wire strands exposed outside terminal clamp.", requiredTools: ["Wire Strippers", "Torque Screwdriver"], learnerCompleted: true, mentorVerified: true },
        { id: "chk_3", task: "Install and test a GFCI receptacle ensuring Line and Load wires are not reversed.", safetyWarning: "Reversed line/load disables ground fault protection on downstream outlets.", requiredTools: ["GFCI Outlet Tester", "Insulated Screwdrivers"], learnerCompleted: true, mentorVerified: false },
        { id: "chk_4", task: "Perform resistance continuity test across grounding conductors back to main ground bar.", safetyWarning: "Never test continuity on energized circuits.", requiredTools: ["Multimeter with continuity buzzer"], learnerCompleted: false, mentorVerified: false }
      ],
      quiz: {
        question: "Before touching any electrical wire inside a customer's breaker panel, what is the mandatory safety protocol?",
        options: [
          "Touch the wire with the back of your hand to feel for heat",
          "Turn off the switch and assume it is safe to proceed",
          "Perform the Live-Dead-Live test using a calibrated voltage detector",
          "Spray insulated cleaner on the busbar"
        ],
        correctIndex: 2,
        explanation: "The Live-Dead-Live method verifies that your testing instrument is functional on a known live source, tests the target circuit to prove it is dead, and then re-tests on a live source to verify the meter did not fail during the test."
      }
    },
    {
      id: "crs_2",
      title: "Plumbing Fundamentals & Pipe Joining",
      category: "Plumbing & Piping",
      difficulty: "beginner",
      duration: "4 hrs 10 mins",
      totalLessons: 5,
      completedLessons: 2,
      progressPercent: 40,
      mentorName: "Elena Rostova",
      mentorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
      thumbnail: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=500&auto=format&fit=crop&q=80",
      description: "Learn copper soldering, PEX crimp fittings, PVC solvent cementing, drain clearing, and leak troubleshooting.",
      lessons: [
        { id: "les_2_1", title: "1. Pipe Materials: Copper, PEX, PVC & CPVC", duration: "15:20", completed: true, videoUrl: "sample_plumb_1", summary: "Understanding PSI ratings, thermal expansion, and code compliance." },
        { id: "les_2_2", title: "2. Clean Copper Soldering (Sweating Pipes)", duration: "25:45", completed: true, videoUrl: "sample_plumb_2", summary: "Reaming, fluxing, lead-free solder feeding, and heat distribution." },
        { id: "les_2_3", title: "3. PEX-A vs PEX-B Expansion and Crimp Systems", duration: "20:10", completed: false, videoUrl: "sample_plumb_3", summary: "Using manual and battery expansion tools without damaging o-rings." },
        { id: "les_2_4", title: "4. Drain Clearing & Trap Maintenance", duration: "22:00", completed: false, videoUrl: "sample_plumb_4", summary: "Snaking P-traps, drum traps, and clearing main waste lines." },
        { id: "les_2_5", title: "5. Water Pressure Regulators & Leak Testing", duration: "18:30", completed: false, videoUrl: "sample_plumb_5", summary: "Setting PRVs to 50-60 PSI and hydrostatic leak testing." }
      ],
      practicalChecklist: [
        { id: "chk_5", task: "Ream and deburr 1/2-inch copper pipe, apply lead-free flux evenly, and execute a leak-free soldered joint.", safetyWarning: "Always use a heat-resistant flame barrier pad behind wooden studs.", requiredTools: ["Propane Torch", "Flame Shield", "Deburring Tool"], learnerCompleted: true, mentorVerified: false },
        { id: "chk_6", task: "Assemble a PEX manifold connection with go/no-go gauge verification.", safetyWarning: "Ensure crimp ring is positioned 1/8 to 1/4 inch from end of tube.", requiredTools: ["PEX Crimp Tool", "Go/No-Go Gauge"], learnerCompleted: false, mentorVerified: false }
      ],
      quiz: {
        question: "Why must copper pipe be thoroughly deburred after cutting before soldering?",
        options: [
          "Deburring makes the pipe shiny for visual inspection",
          "Burrs cause turbulent water flow which erodes pipe walls over time and reduces flow capacity",
          "Solder cannot melt unless the burr is removed",
          "It prevents the pipe from freezing in winter"
        ],
        correctIndex: 1,
        explanation: "Internal burrs left by pipe cutters create hydraulic turbulence, which causes cavitation erosion, localized pitting, and eventual pinhole leaks in domestic copper piping."
      }
    },
    {
      id: "crs_3",
      title: "Commercial HVAC Diagnostics & Heat Pumps",
      category: "HVAC & Climate Control",
      difficulty: "intermediate",
      duration: "5 hrs 20 mins",
      totalLessons: 7,
      completedLessons: 1,
      progressPercent: 15,
      mentorName: "Darnell Washington",
      mentorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
      thumbnail: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=80",
      description: "Refrigerant pressure analysis, TXV valve metering, blower motor capacitor checks, and reversing valve diagnostics.",
      lessons: [
        { id: "les_3_1", title: "1. Thermodynamics of the Vapor Compression Cycle", duration: "28:10", completed: true, videoUrl: "sample_hvac_1", summary: "Subcooling vs Superheat calculations on R-410A systems." },
        { id: "les_3_2", title: "2. Reading Digital Manifold Gauges & Saturation Charts", duration: "24:00", completed: false, videoUrl: "sample_hvac_2", summary: "Accurate temperature-pressure chart correlation." },
        { id: "les_3_3", title: "3. Dual Run Capacitors & Fan Motors", duration: "19:40", completed: false, videoUrl: "sample_hvac_3", summary: "Discharging capacitors safely and testing microfarad (uF) tolerance." },
        { id: "les_3_4", title: "4. Electronic Expansion Valve (EEV) Troubleshooting", duration: "32:15", completed: false, videoUrl: "sample_hvac_4", summary: "Stepper motor testing and temperature sensor ohm calibration." }
      ],
      practicalChecklist: [
        { id: "chk_7", task: "Safely discharge a 45/5 uF dual run capacitor using a 20k ohm 5-watt resistor before testing.", safetyWarning: "Direct shorting with a screwdriver can rupture dielectric terminals.", requiredTools: ["Discharge Resistor Probe", "Multimeter with Capacitance"], learnerCompleted: true, mentorVerified: false }
      ],
      quiz: {
        question: "When measuring a system with a Thermostatic Expansion Valve (TXV), which metric is the primary indicator of proper refrigerant charge?",
        options: [
          "Total Superheat",
          "Subcooling at the liquid line service port",
          "Blower motor RPM",
          "Return air humidity only"
        ],
        correctIndex: 1,
        explanation: "Systems equipped with TXVs maintain a constant evaporator superheat; therefore, subcooling at the liquid line is the primary method to ensure the condenser has adequate liquid seal and accurate refrigerant charge."
      }
    },
    {
      id: "crs_4",
      title: "Major Home Appliance Repair & Sensor PCB Analysis",
      category: "Appliance Repair",
      difficulty: "intermediate",
      duration: "3 hrs 30 mins",
      totalLessons: 4,
      completedLessons: 0,
      progressPercent: 0,
      mentorName: "Priya Patel",
      mentorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80",
      thumbnail: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&auto=format&fit=crop&q=80",
      description: "Diagnose inverter compressors, washing machine drain pumps, dishwasher heating elements, and electronic control boards.",
      lessons: [
        { id: "les_4_1", title: "1. Diagnosing BLDC 3-Phase Inverter Compressor Motors", duration: "22:00", completed: false, videoUrl: "sample_app_1", summary: "Checking resistance balance between U, V, and W terminals." },
        { id: "les_4_2", title: "2. Front-Load Washer Suspension & Hall Effect Sensors", duration: "19:30", completed: false, videoUrl: "sample_app_2", summary: "Testing rotor position sensors and eliminating heavy vibration." }
      ],
      practicalChecklist: [
        { id: "chk_8", task: "Measure resistance across inverter compressor motor pins U-V, V-W, and U-W to verify resistance matches within 0.1 ohm.", safetyWarning: "Disconnect power cord and wait 5 minutes for main filter capacitors to bleed down.", requiredTools: ["Digital Multimeter", "Insulated Gloves"], learnerCompleted: false, mentorVerified: false }
      ],
      quiz: {
        question: "If a BLDC inverter compressor measures 6.2 ohms across U-V, 6.2 ohms across V-W, and 14.8 ohms across U-W, what is the diagnosis?",
        options: [
          "The compressor motor is completely healthy",
          "The compressor motor has an internal winding fault / short in phase U-W",
          "The power cord is backwards",
          "The thermostat needs calibration"
        ],
        correctIndex: 1,
        explanation: "BLDC 3-phase compressor stator windings must have identical resistance across all three phase pairs (U-V, V-W, U-W). Unequal resistance indicates a winding failure requiring compressor replacement."
      }
    },
    {
      id: "crs_5",
      title: "Mastering Customer Communication & Service Ethics",
      category: "Customer Service",
      difficulty: "beginner",
      duration: "2 hrs 15 mins",
      totalLessons: 4,
      completedLessons: 4,
      progressPercent: 100,
      mentorName: "Hannah Lindqvist",
      mentorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
      thumbnail: "https://images.unsplash.com/photo-1556742049-0a67e5572293?w=500&auto=format&fit=crop&q=80",
      description: "Boost your customer reviews, set transparent price expectations, resolve customer disputes calmly, and maintain clean work hygiene.",
      lessons: [
        { id: "les_5_1", title: "1. The First 60 Seconds: Professional Greeting & Shoe Covers", duration: "14:10", completed: true, videoUrl: "sample_cs_1", summary: "Building immediate trust upon arrival at the customer's home." },
        { id: "les_5_2", title: "2. Explaining Technical Diagnostics in Plain English", duration: "18:30", completed: true, videoUrl: "sample_cs_2", summary: "How to avoid confusing jargon and explain the 'why' behind repair recommendations." },
        { id: "les_5_3", title: "3. De-escalating Frustrated or Stressed Homeowners", duration: "21:00", completed: true, videoUrl: "sample_cs_3", summary: "Active listening techniques that turn upset customers into 5-star brand advocates." },
        { id: "les_5_4", title: "4. Handover Walkthrough & Post-Service Review Requests", duration: "16:45", completed: true, videoUrl: "sample_cs_4", summary: "Conducting the final inspection together and politely asking for an honest rating." }
      ],
      practicalChecklist: [
        { id: "chk_9", task: "Execute the 5-point arrival greeting: Name badge visible, shoe protectors on, mat placed under tools, greeting with homeowner name, and verbal confirmation of job scope.", safetyWarning: "Always respect customer property boundaries.", requiredTools: ["Shoe Covers", "Clean Drop Cloth"], learnerCompleted: true, mentorVerified: true }
      ],
      quiz: {
        question: "When discovering an unexpected $200 part failure during a repair, when should you inform the customer?",
        options: [
          "Replace the part immediately and put it on the final invoice without mentioning it",
          "Pause work immediately, show the customer the damaged component, explain why it failed, and obtain written/digital authorization before installing",
          "Hide the old part and tell them it was free",
          "Leave the job site without telling anyone"
        ],
        correctIndex: 1,
        explanation: "Surprise charges destroy client trust. Showing the damaged part in person and securing clear consent before incurring costs is the standard of top-rated service professionals."
      }
    },
    {
      id: "crs_6",
      title: "Workplace Hazard Control & OSHA Safe Practices",
      category: "Workplace Safety",
      difficulty: "beginner",
      duration: "2 hrs 50 mins",
      totalLessons: 4,
      completedLessons: 4,
      progressPercent: 100,
      mentorName: "Samuel Osei",
      mentorAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80",
      thumbnail: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&auto=format&fit=crop&q=80",
      description: "Essential occupational safety, ladder 4-to-1 ratio, respiratory protection, chemical SDS sheets, and electrical emergency protocols.",
      lessons: [
        { id: "les_6_1", title: "1. 4-to-1 Ladder Setup & Three Points of Contact", duration: "15:00", completed: true, videoUrl: "sample_safe_1", summary: "Preventing common falls from extension and step ladders." },
        { id: "les_6_2", title: "2. Personal Protective Equipment (PPE) Standards", duration: "19:20", completed: true, videoUrl: "sample_safe_2", summary: "Eye protection ratings (ANSI Z87.1), cut-resistant gloves, and dielectric footwear." }
      ],
      practicalChecklist: [
        { id: "chk_10", task: "Perform a pre-shift inspection of safety glasses, gloves, and ladder rungs; set extension ladder at proper 75-degree angle (4:1 rule).", safetyWarning: "Never stand on the top cap or top step of a stepladder.", requiredTools: ["ANSI Z87.1 Glasses", "Level 4 Cut Gloves"], learnerCompleted: true, mentorVerified: true }
      ],
      quiz: {
        question: "According to OSHA guidelines, for every 4 feet of ladder working height, how far away from the wall should the ladder base be placed?",
        options: [
          "4 feet",
          "1 foot",
          "6 inches",
          "2.5 feet"
        ],
        correctIndex: 1,
        explanation: "The 4-to-1 rule requires that the base of the ladder be set 1 foot away from the supporting structure for every 4 feet of vertical rise to prevent slipping or tipping."
      }
    }
  ],

  // Upcoming and Past Scheduled Mentorship Sessions
  trainingSessions: [
    {
      id: "ses_301",
      mentorId: "mnt_101",
      mentorName: "Marcus Vance",
      mentorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      skill: "Commercial 3-Phase Circuit Balancing",
      category: "Electrical Services",
      dateTime: "Tomorrow at 10:00 AM",
      isoDate: "2026-10-04T10:00:00",
      duration: "60 mins",
      format: "online", // online, in-person, supervised-field
      status: "upcoming", // upcoming, completed, cancelled, pending
      fee: "$35.00",
      meetingUrl: "https://meet.skillconnect.pro/room-elec-9042",
      location: "Virtual Classroom (HD Video + Screen Share)",
      requiredTools: ["Digital Multimeter", "Current Clamp", "Calculator"],
      notes: "We will review your logged sub-panel test readings and simulate unbalanced neutral current."
    },
    {
      id: "ses_302",
      mentorId: "mnt_103",
      mentorName: "Darnell Washington",
      mentorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
      skill: "Heat Pump Reversing Valve Diagnostics",
      category: "HVAC & Climate Control",
      dateTime: "Thursday, Oct 8 at 02:30 PM",
      isoDate: "2026-10-08T14:30:00",
      duration: "90 mins",
      format: "in-person",
      status: "upcoming",
      fee: "$40.00",
      meetingUrl: "",
      location: "Austin Pro Training Workshop (Bay 4, 1800 Industrial Blvd)",
      requiredTools: ["Refrigerant Gauges", "Clamp Temperature Thermocouples", "Safety Glasses"],
      notes: "Hands-on bench diagnosis of stuck pilot valves vs defective 24V solenoids."
    },
    {
      id: "ses_303",
      mentorId: "mnt_102",
      mentorName: "Elena Rostova",
      mentorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
      skill: "PEX Crimp & Copper Solder Lab",
      category: "Plumbing & Piping",
      dateTime: "Sep 24, 2026 at 11:00 AM",
      isoDate: "2026-09-24T11:00:00",
      duration: "60 mins",
      format: "in-person",
      status: "completed",
      fee: "Free (Community Mentorship)",
      location: "Pro Training Bay 2",
      attendanceConfirmed: true,
      learnerFeedback: { rating: 5, comment: "Elena is brilliant. Her heat distribution tip eliminated my copper solder drips immediately." },
      mentorFeedback: { status: "demonstrated", comment: "Alex demonstrated excellent torch control, clean reaming, and zero solder leaks on pressure test." }
    },
    {
      id: "ses_304",
      mentorId: "mnt_106",
      mentorName: "Hannah Lindqvist",
      mentorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
      skill: "Customer De-escalation & Review Coaching",
      category: "Customer Service",
      dateTime: "Sep 18, 2026 at 03:00 PM",
      isoDate: "2026-09-18T15:00:00",
      duration: "45 mins",
      format: "online",
      status: "completed",
      fee: "$20.00",
      attendanceConfirmed: true,
      learnerFeedback: { rating: 5, comment: "Gave me practical scripts for managing delayed part deliveries with customers." },
      mentorFeedback: { status: "demonstrated", comment: "Alex showed natural empathy and structured verbal communication." }
    }
  ],

  // Verified Skill Badges & Certificates Earned by Current Worker
  verifiedBadges: [
    {
      id: "bdg_01",
      skillName: "Basic Plumbing Repair & Soldering",
      category: "Plumbing & Piping",
      level: "Level 1 Verified",
      issuedDate: "September 25, 2026",
      assessorName: "Elena Rostova (Journeyman Plumber #PL-8821)",
      credentialId: "SKC-PLM-2026-8841",
      status: "verified",
      icon: "droplet",
      unlockedJobsCount: 8,
      averageJobRate: "$38 - $45/hr"
    },
    {
      id: "bdg_02",
      skillName: "Customer Communication & Service Ethics",
      category: "Customer Service",
      level: "Mastery Verified",
      issuedDate: "September 19, 2026",
      assessorName: "Hannah Lindqvist (Service Operations Lead)",
      credentialId: "SKC-CSE-2026-3190",
      status: "verified",
      icon: "message-square",
      unlockedJobsCount: 14,
      averageJobRate: "$32 - $40/hr"
    },
    {
      id: "bdg_03",
      skillName: "OSHA-10 Workplace Safety & PPE Compliance",
      category: "Workplace Safety",
      level: "Certified",
      issuedDate: "August 12, 2026",
      assessorName: "Samuel Osei (Senior Safety Auditor #SF-104)",
      credentialId: "SKC-SFT-2026-1029",
      status: "verified",
      icon: "shield-check",
      unlockedJobsCount: 22,
      averageJobRate: "$35 - $50/hr"
    }
  ],

  // Sample Assessments Submitted by Mentors (Assessor View / Audit Trail)
  assessments: [
    {
      id: "asm_501",
      learnerId: "wrk_9042",
      learnerName: "Alex Rivera",
      skill: "Commercial 3-Phase Circuit Balancing",
      category: "Electrical Services",
      mentorId: "mnt_101",
      mentorName: "Marcus Vance",
      date: "Pending Practical Session",
      status: "in-progress", // in-progress, competency-demonstrated, practice-required, reassess
      criteria: [
        { name: "Tool & Multimeter Identification (CAT III/IV)", score: 5, max: 5 },
        { name: "Safety & Zero-Voltage Verification Protocol", score: 5, max: 5 },
        { name: "Phase Balance Calculation & Neutral Current", score: 4, max: 5 },
        { name: "Practical Conductor Stripping & Torque", score: 4, max: 5 },
        { name: "Fault Identification in Live Sub-panel", score: 0, max: 5 }, // pending
        { name: "Professional Conduct & Clean Cleanup", score: 5, max: 5 }
      ],
      strengths: "Exceptional adherence to PPE and the Live-Dead-Live rule. Clean wire labeling.",
      improvements: "Needs hands-on practice with digital current clamp calibration under heavy inductive loads.",
      verdict: "Assessment In Progress (Practical scheduled for tomorrow)"
    },
    {
      id: "asm_502",
      learnerId: "wrk_9042",
      learnerName: "Alex Rivera",
      skill: "Basic Plumbing Repair & Soldering",
      category: "Plumbing & Piping",
      mentorId: "mnt_102",
      mentorName: "Elena Rostova",
      date: "September 25, 2026",
      status: "competency-demonstrated",
      criteria: [
        { name: "Tool & Flame Barrier Safety", score: 5, max: 5 },
        { name: "Pipe Deburring & Flux Application", score: 5, max: 5 },
        { name: "Soldering Torch Heat Control", score: 5, max: 5 },
        { name: "Hydrostatic Pressure Test (60 PSI)", score: 5, max: 5 },
        { name: "PEX Crimp Measurement Compliance", score: 4, max: 5 },
        { name: "Customer Property Protection", score: 5, max: 5 }
      ],
      strengths: "Flawless copper capillary draw with zero drips. Excellent workspace hygiene.",
      improvements: "Remember to double-check PEX go/no-go gauge on all 4 quadrants of the ring.",
      verdict: "Competency Demonstrated • Verified Badge Issued"
    }
  ],

  // High-Paying Jobs Unlocked by Verified Skills
  unlockedJobs: [
    {
      id: "job_req_701",
      title: "Commercial 3-Phase Panel Load Balancing",
      client: "Austin Tech Center Suites",
      location: "The Domain, Austin",
      requiredVerifiedSkill: "Commercial 3-Phase Wiring",
      payout: "$165.00 / 2 hrs ($82.50/hr)",
      status: "Eligible Upon Skill Verification",
      isUnlocked: false,
      urgency: "High Demand"
    },
    {
      id: "job_req_702",
      title: "Tankless Water Heater Copper Soldering & Valve Fitting",
      client: "Residential Estate Owner",
      location: "Westlake Hills, Austin",
      requiredVerifiedSkill: "Basic Plumbing Repair & Soldering",
      payout: "$140.00 / 1.5 hrs ($93.33/hr)",
      status: "Instant Apply Available",
      isUnlocked: true,
      urgency: "New Request"
    },
    {
      id: "job_req_703",
      title: "Commercial HVAC Quarterly Safety Audit",
      client: "Apex Health Facility",
      location: "South Lamar, Austin",
      requiredVerifiedSkill: "OSHA-10 Workplace Safety & PPE Compliance",
      payout: "$220.00 / 3 hrs ($73.33/hr)",
      status: "Instant Apply Available",
      isUnlocked: true,
      urgency: "Urgent"
    }
  ],

  // Notification Center Feed (10+ Items)
  notifications: [
    {
      id: "notif_1",
      title: "Upcoming Mentorship Session Tomorrow",
      message: "Your 1-on-1 practical session with Master Electrician Marcus Vance is tomorrow at 10:00 AM.",
      type: "session",
      read: false,
      time: "10 mins ago",
      icon: "calendar"
    },
    {
      id: "notif_2",
      title: "Skill Badge Verified! 🎉",
      message: "Elena Rostova approved your Practical Plumbing Soldering assessment. Badge added to your profile!",
      type: "badge",
      read: false,
      time: "2 hours ago",
      icon: "award"
    },
    {
      id: "notif_3",
      title: "New Job Unlocked ($93/hr)",
      message: "Your Plumbing verification unlocked 'Tankless Water Heater Soldering' job request in Westlake Hills.",
      type: "job",
      read: false,
      time: "1 day ago",
      icon: "briefcase"
    },
    {
      id: "notif_4",
      title: "Course Progress Milestone Reached",
      message: "You completed 66% of 'Basic Electrical Maintenance & Safety'. Only 2 lessons left!",
      type: "course",
      read: true,
      time: "2 days ago",
      icon: "book-open"
    },
    {
      id: "notif_5",
      title: "New Video Lesson Added",
      message: "Master Instructor Darnell Washington uploaded a new lesson on Heat Pump Reversing Valves.",
      type: "course",
      read: true,
      time: "3 days ago",
      icon: "play-circle"
    }
  ],

  // Mentor Registration Simulation State for current worker
  mentorRegistrationState: {
    status: "not_submitted", // not_submitted, under_review, assessment_required, verified
    trackingId: "MNT-REG-2026-9042",
    step: 1,
    data: {
      fullName: "Alex Rivera",
      phone: "+1 (555) 382-9104",
      primaryCategory: "Electrical Services",
      selectedSkills: ["Basic Electrical Maintenance", "Receptacle & Switch Replacement"],
      experienceYears: 4,
      bio: "Detail-oriented technician specializing in residential circuit safety, GFCI upgrades, and client communication.",
      teachingFormats: ["online", "in-person"],
      preferredLanguages: ["English", "Spanish"],
      hourlyFee: "25",
      submittedDocs: ["State_Apprentice_Card.pdf", "OSHA10_Cert.pdf"],
      verificationProgress: {
        profileReview: "completed",
        documentAudit: "completed",
        practicalAssessment: "pending",
        finalApproval: "pending"
      }
    }
  }
};
