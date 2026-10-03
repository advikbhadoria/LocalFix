# SkillConnect • Peer-to-Peer Worker Learning & Skill Development Module

**SkillConnect** is an interactive, responsive, and domain-accurate learning and peer mentorship platform integrated directly into a Worker-Side On-Demand Service Management Application (PocketHelp Worker Pro).

---

## 🌟 Core Philosophy
> **"Learn from experienced workers, improve your skills, prove your abilities, and unlock new opportunities."**

---

## 🚀 Key Features

### 1. Seamless Worker Application Integration
* **12 Main Navigation Items**:
  1. Dashboard (`#/worker-dashboard`)
  2. My Jobs (`#/worker-jobs`)
  3. Job Requests (`#/worker-requests` — displays jobs unlocked by verified skills)
  4. Currently Required Services (`#/worker-services`)
  5. Earnings & Wallet (`#/worker-wallet`)
  6. **SkillConnect** (`#/sc-dashboard` — highlighted graduation cap with active badges)
  7. Performance (`#/worker-performance`)
  8. Customer Messages (`#/worker-messages`)
  9. Safety Center (`#/worker-safety`)
  10. Notifications (`#/sc-notifications`)
  11. My Profile (`#/worker-profile`)
  12. Settings (`#/worker-settings`)

### 2. SkillConnect Learning Dashboard (`#/sc-dashboard`)
* **Personalized Hero Welcome Banner**: Gradient blue banner with worker tier, greeting, and direct CTAs.
* **4 Metric Stat Cards**: Skills Learning, Training Hours, Mentor Sessions, and Verified Badges.
* **Continue Your Learning**: Progress tracking with percentage bars and quick lesson resume.
* **Upcoming Mentorship Sessions**: Live cards with online room / in-person workshop indicators.
* **Recommended Mentors Carousel**: Horizontal scrollable carousel with mentor ratings and experience.
* **Recent Activity Timeline**: Real-time event log of completed lessons, sessions, and certifications.

### 3. Find a Mentor (`#/sc-find-mentor`) & Detailed Profiles (`#/sc-mentor-profile`)
* **Multi-Trade Filtering**: Category chips (Electrical, Plumbing, HVAC, Appliances, Carpentry, Customer Service, Safety).
* **Faceted Search**: Min experience, minimum rating, training format (Online, In-Person, Supervised Field), language, and pricing (Free vs Paid).
* **Sorting Engine**: Most Relevant, Highest Rating, Most Experienced, Lowest Fee, Most Sessions.
* **5-Step Booking Wizard**:
  1. Select Topic / Skill
  2. Choose Training Format
  3. Interactive Calendar & Real-time Slot Picker
  4. Preparation Notes & Cancellation Policy
  5. Booking Review & Confirmation

### 4. Become a Mentor & Verification Tracker (`#/sc-mentor-registration`)
* **5-Step Onboarding Wizard**: Personal Info, Professional Experience, Skill Verification Evidence Dropzone, Mentorship Preferences & Rates, Review & Submit.
* **Mentor Verification Status Dashboard**: 4-stage visual stepper (Profile Review -> Document Audit -> Practical Demonstration -> Board Approval) with simulated one-click instant approval.

### 5. My Training Sessions & Simulated Video Room (`#/sc-my-training`)
* **4 Session Tabs**: Upcoming, Completed, Cancelled, All.
* **Lifecycle Timeline Modal**: Track session stages (Requested -> Confirmed -> In Progress -> Assessed).
* **Simulated HD Video Classroom Modal**: Interactive room with camera toggle, mic mute/unmute, screen sharing, and mentor video feed.
* **In-Person Location & Directions Modal**: Training center workshop bay directions and required PPE tool checklist.

### 6. Learning Library (`#/sc-learning-library`) & Course Player (`#/sc-course-player`)
* **Technical Video Player Simulation**: Canvas-based animated oscilloscope waveforms, voltage simulators, play/pause, seek scrubber, playback speeds (0.75x - 2.0x), captions toggle, and bookmarking.
* **Lesson Playlist Sidebar**: Lesson status tick marks and duration.
* **Practical Skill Checklists**: Interactive checkboxes with critical OSHA safety warnings and required tool tags.
* **Interactive Knowledge Quizzes**: Immediate feedback explanations, scoring, and retries.

### 7. Skill Roadmaps & Analytics (`#/sc-my-progress`)
* **5-Stage Visual Pathway**: Beginner -> Foundation -> Practical Training -> Mentor Assessment -> Verified Credential.
* **Chart.js Visualizations**: Weekly training hours bar chart and trade competency radar matrix.

### 8. Mentor Assessment & Verified Credentials (`#/sc-assessments`, `#/sc-my-skills`)
* **Rubric Scoring Engine**: 6 core competency criteria scored 1-5 stars, written strengths/improvements, and verdict selector.
* **Verifiable Skill Badges**: Credential ID, issue date, assessor name, and public visibility toggle.
* **High-Res Printable Certificate Modal**: Official board seal watermark, student name, QR code, and mentor signatures.
* **Unlocked High-Paying Jobs Matching**: Direct demonstration of how verified skills unlock commercial jobs paying up to $93/hr.

### 9. Demo Role Switcher & Floating Developer Dock
* **Role Switcher**: Switch between **Learner Mode** and **Mentor/Assessor Mode** with one click.
* **Floating Demo Dock**: Quick shortcuts for instant skill verification, sample booking, mentor approval, and full state reset.

---

## 🎨 Blue and White UI/UX Design System
* **Primary Blue**: `#2563EB`
* **Deep Navy**: `#173B75`
* **Light Blue**: `#EFF6FF`
* **Surface White**: `#FFFFFF`
* **Background**: `#F5F8FF`
* **Typography**: Plus Jakarta Sans & JetBrains Mono

---

## 🛠 Local Launch Instructions
1. Open the project folder in your terminal:
   ```bash
   cd /Users/jayakumari/Desktop/training
   ```
2. Start the local server:
   ```bash
   python3 -m http.server 3000
   ```
3. Open your browser and navigate to:
   ```
   http://localhost:3000/#/sc-dashboard
   ```
