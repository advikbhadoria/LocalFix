import React, { useState } from 'react';
import { 
  GraduationCap, 
  ShieldCheck, 
  CheckCircle2, 
  Upload, 
  FileText, 
  Calendar, 
  Clock, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Award, 
  AlertCircle, 
  Plus, 
  Trash2,
  Check,
  UserCheck,
  FileCheck,
  Send,
  Zap
} from 'lucide-react';

export default function MentorRegistrationPage({
  workerProfile,
  onSelectPage,
  onMentorRegistrationComplete
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [primaryCategory, setPrimaryCategory] = useState('Electrical Services');
  const [secondaryCategory, setSecondaryCategory] = useState('Appliance & Solar Utility');
  const [experienceYears, setExperienceYears] = useState('8+ Years');
  const [selectedLanguages, setSelectedLanguages] = useState(['Hindi', 'Marathi', 'English']);
  
  // Skills to teach
  const [selectedSkills, setSelectedSkills] = useState([
    { name: '3-Phase Industrial Distribution & MCB Load Balancing', proficiency: 'Master', experience: '8 Years' },
    { name: 'Smart Inverter & Solar Hybrid UPS Integration', proficiency: 'Expert', experience: '5 Years' },
    { name: 'High-Voltage Arc Flash & PPE Safety Protocols', proficiency: 'Master', experience: '8 Years' }
  ]);
  const [newSkillName, setNewSkillName] = useState('');

  // Uploaded files
  const [uploadedFiles, setUploadedFiles] = useState([
    { name: "Maharashtra_Electrical_Supervisor_License.pdf", size: "2.4 MB", type: "Official State License" },
    { name: "NSDC_Master_Trainer_Cert.pdf", size: "1.8 MB", type: "National Skill Council Cert" }
  ]);

  // Teaching Preferences
  const [teachingFormats, setTeachingFormats] = useState(['In-Person Hub (Pune)', 'Online 1-on-1']);
  const [maxLearners, setMaxLearners] = useState(3);
  const [availableDays, setAvailableDays] = useState(['Mon', 'Wed', 'Fri', 'Sat']);
  const [availableTimeSlots, setAvailableTimeSlots] = useState(['Morning (10:00 AM - 12:30 PM)', 'Evening (04:00 PM - 06:30 PM)']);
  
  // Verification workflow demo state
  const [verificationState, setVerificationState] = useState('verified');
  const [applicationRef, setApplicationRef] = useState('MNT-APP-9821');

  const handleAddSkill = () => {
    if (!newSkillName.trim()) return;
    setSelectedSkills([
      ...selectedSkills,
      { name: newSkillName.trim(), proficiency: 'Expert', experience: '4+ Years' }
    ]);
    setNewSkillName('');
  };

  const handleRemoveSkill = (index) => {
    setSelectedSkills(selectedSkills.filter((_, i) => i !== index));
  };

  const handleSimulateFileUpload = () => {
    const newDoc = {
      name: `Demonstration_Video_Panel_Wiring_${Date.now().toString().slice(-4)}.mp4`,
      size: "38.5 MB",
      type: "Practical Video Demonstration"
    };
    setUploadedFiles([...uploadedFiles, newDoc]);
  };

  const handleSubmitApplication = () => {
    setVerificationState('submitted');
    setCurrentStep(6);
    if (onMentorRegistrationComplete) {
      onMentorRegistrationComplete({
        applicationRef,
        selectedSkills,
        uploadedFiles,
        teachingFormats
      });
    }
  };

  const handleSimulateInstantApproval = () => {
    setVerificationState('verified');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-100 text-blue-800 border border-blue-200">
              Mentor Accreditation Program
            </span>
            <span className="text-xs text-slate-500 font-mono">PocketHelp SkillConnect</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1 font-display">
            Become a Verified Master Mentor
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Share your trade knowledge with junior technicians and earn teaching grants.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onSelectPage('mentor_dashboard')}
          className="px-4 py-2 rounded-2xl text-xs font-bold bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 transition-all cursor-pointer self-start sm:self-auto flex items-center gap-2"
        >
          <GraduationCap className="w-4 h-4" />
          <span>Mentor Mode Dashboard</span>
        </button>
      </div>

      {/* Stepper Progress Bar */}
      <div className="p-4 rounded-3xl bg-white border border-blue-100 shadow-sm space-y-3">
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 overflow-x-auto pb-1 gap-2">
          {[
            '1. Guidelines',
            '2. Profile',
            '3. Skills to Teach',
            '4. Evidence',
            '5. Schedule',
            '6. Verification Tracker',
            '7. Confirmation'
          ].map((label, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrentStep(i + 1)}
              className={`whitespace-nowrap transition-colors cursor-pointer ${
                currentStep === i + 1 ? 'text-blue-600 font-black' : currentStep > i + 1 ? 'text-teal-600' : 'text-slate-400'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 via-teal-500 to-emerald-500 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 7) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Content Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-blue-100 shadow-sm space-y-6">

        {/* STEP 1: Mentor Eligibility Introduction */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200 flex-shrink-0">
                <GraduationCap className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Empower the Next Generation of Service Workers
                </h2>
                <p className="text-xs text-slate-500">
                  SkillConnect connects experienced masters with motivated apprentices for hands-on, high-safety field learning.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="font-bold text-teal-700 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-teal-600" /> 1. Practical Verification
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  We verify real trade competence through state licenses, demonstration videos, and hands-on rubric assessments.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="font-bold text-blue-700 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-blue-600" /> 2. Flexible Hours
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Set your own training slots around your regular customer jobs. Host 1-on-1 labs at Sector 4 hubs or online.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="font-bold text-amber-700 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-600" /> 3. Teaching Grants
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Earn subsidized mentorship stipends (up to ₹800/session) and build a verified reputation as a master trainer.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-900 space-y-2">
              <span className="font-bold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-blue-600" /> Eligibility Pre-Check:
              </span>
              <p className="text-[11px] text-blue-800 leading-relaxed">
                You already qualify as a Senior Master Technician based on your <strong>{workerProfile.experience}</strong> field experience, <strong>MH-ELEC-77190</strong> license, and <strong>4.96★</strong> customer rating!
              </p>
            </div>
          </div>
        )}

        {/* STEP 2: Personal and Professional Details */}
        {currentStep === 2 && (
          <div className="space-y-5 text-xs">
            <h2 className="text-base font-bold text-slate-900">
              Step 2: Personal & Professional Trade History
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-600 font-bold mb-1">Full Legal Name (Prefilled):</label>
                <input
                  type="text"
                  readOnly
                  value={workerProfile.name}
                  className="w-full p-2.5 bg-slate-100 rounded-xl text-slate-800 border border-slate-200 outline-hidden font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Worker Account ID:</label>
                <input
                  type="text"
                  readOnly
                  value={workerProfile.id}
                  className="w-full p-2.5 bg-slate-100 rounded-xl text-slate-800 border border-slate-200 outline-hidden font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Primary Teaching Category:</label>
                <select
                  value={primaryCategory}
                  onChange={(e) => setPrimaryCategory(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 rounded-xl text-slate-900 border border-slate-200 outline-hidden font-bold"
                >
                  <option>Electrical Services</option>
                  <option>Appliance Repair & HVAC</option>
                  <option>Plumbing</option>
                  <option>Commercial Sanitization</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Years of Field Experience:</label>
                <input
                  type="text"
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 rounded-xl text-slate-900 border border-slate-200 outline-hidden font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-600 font-bold mb-1">Trade Background & Specialization:</label>
              <textarea
                rows={3}
                defaultValue="Specialized in 3-Phase commercial distribution, MCB tripping root-cause analysis, and solar inverter backup installation. 8+ years executing high-voltage contracts in Pune Sector 4."
                className="w-full p-3 bg-slate-50 rounded-xl text-slate-800 border border-slate-200 outline-hidden leading-relaxed"
              />
            </div>
          </div>
        )}

        {/* STEP 3: Skills & Expertise */}
        {currentStep === 3 && (
          <div className="space-y-5 text-xs">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Step 3: Skills You Are Qualified to Teach
              </h2>
              <p className="text-slate-500 text-[11px]">
                Select the specific practical competencies you want to train and assess.
              </p>
            </div>

            {/* List of Skills */}
            <div className="space-y-2.5">
              {selectedSkills.map((sk, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-slate-900">{sk.name}</h4>
                      <p className="text-[11px] text-slate-500">{sk.proficiency} Level • {sk.experience} Experience</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(idx)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Custom Skill Field */}
            <div className="flex items-center gap-2 pt-2">
              <input
                type="text"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                placeholder="Add another skill competency (e.g. Earthing Resistance Megger Testing)..."
                className="flex-1 p-2.5 bg-slate-50 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 border border-slate-200 outline-hidden"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Plus className="w-4 h-4" /> Add Skill
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Upload Supporting Evidence */}
        {currentStep === 4 && (
          <div className="space-y-5 text-xs">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Step 4: Upload Supporting Evidence & Certifications
              </h2>
              <p className="text-slate-500 text-[11px]">
                Upload official state trade licenses, vocational certificates, or video demonstration evidence.
              </p>
            </div>

            {/* Upload Area */}
            <div 
              onClick={handleSimulateFileUpload}
              className="p-8 border-2 border-dashed border-blue-200 hover:border-blue-500 rounded-3xl bg-blue-50/50 text-center space-y-3 cursor-pointer transition-colors group"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <span className="font-bold text-slate-900 text-xs">Click to upload training certificates or video demos</span>
                <p className="text-[11px] text-slate-500 mt-0.5">Supports PDF, MP4, JPG, PNG (Max 50MB)</p>
              </div>
            </div>

            {/* Uploaded Documents List */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Uploaded Documents ({uploadedFiles.length}):</span>
              {uploadedFiles.map((doc, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <FileCheck className="w-4 h-4 text-blue-600" />
                    <div>
                      <div className="font-bold text-slate-900">{doc.name}</div>
                      <div className="text-[10px] text-slate-500">{doc.type} • {doc.size}</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Uploaded
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 5: Teaching Preferences & Weekly Calendar */}
        {currentStep === 5 && (
          <div className="space-y-5 text-xs">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Step 5: Teaching Preferences & Availability Schedule
              </h2>
              <p className="text-slate-500 text-[11px]">
                Define when and where you would like to conduct hands-on training sessions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 block">Preferred Training Formats:</span>
                <div className="space-y-1.5 text-slate-700">
                  {['In-Person Hub (Pune Sector 4)', 'Online 1-on-1 HD Video', 'On-the-Job Co-Working'].map((fmt, i) => (
                    <label key={i} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked={i < 2} className="text-blue-600 rounded" />
                      <span>{fmt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 block">Maximum Learners per Session:</span>
                <select
                  value={maxLearners}
                  onChange={(e) => setMaxLearners(Number(e.target.value))}
                  className="w-full p-2.5 bg-white rounded-xl text-slate-900 border border-slate-200 outline-hidden font-bold"
                >
                  <option value={1}>1 Learner (Strict 1-on-1)</option>
                  <option value={3}>Up to 3 Learners (Small Group Lab)</option>
                  <option value={5}>Up to 5 Learners (Workshop Mode)</option>
                </select>
              </div>
            </div>

            {/* Weekly Availability Days */}
            <div className="space-y-2">
              <span className="font-bold text-slate-900 block">Weekly Available Days:</span>
              <div className="flex flex-wrap gap-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => {
                  const isSelected = availableDays.includes(day);
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => {
                        if (isSelected) setAvailableDays(availableDays.filter(d => d !== day));
                        else setAvailableDays([...availableDays, day]);
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isSelected ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: Mentor Verification Status Tracker */}
        {currentStep === 6 && (
          <div className="space-y-6 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-blue-100 text-blue-700 border border-blue-200">
                  APPLICATION REF: {applicationRef}
                </span>
                <h2 className="text-lg font-black text-slate-900 mt-1">
                  Mentor Accreditation Verification Tracker
                </h2>
              </div>

              <button
                type="button"
                onClick={handleSimulateInstantApproval}
                className="px-3.5 py-1.5 rounded-xl text-[11px] font-black bg-teal-600 hover:bg-teal-700 text-white shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5" /> Simulate NSDC Approval
              </button>
            </div>

            {/* Multi-stage verification stepper */}
            <div className="space-y-3">
              {[
                { title: "1. Worker Identity & KYC Verification", desc: "Aadhaar, Bank KYC, and background check on file", status: "completed" },
                { title: "2. Trade License & Experience Document Review", desc: "Maharashtra Electrical Supervisor License verified", status: "completed" },
                { title: "3. Practical Competency & Safety Rubric Sign-off", desc: "High-voltage 3-phase diagnostics practical assessment passed (96%)", status: "completed" },
                { title: "4. Master Mentor Accreditation Status", desc: verificationState === 'verified' ? "Accreditation Approved! Mentor Mode unlocked." : "Under Final Review with Sector 4 Training Board", status: verificationState === 'verified' ? "completed" : "in_progress" }
              ].map((stage, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3.5">
                  <div className={`mt-0.5 flex-shrink-0 ${stage.status === 'completed' ? 'text-emerald-600' : 'text-amber-500 animate-spin'}`}>
                    {stage.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-900 text-xs">{stage.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{stage.desc}</p>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    stage.status === 'completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {stage.status === 'completed' ? 'Verified ✓' : 'Under Review'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 7: Registration Confirmation */}
        {currentStep === 7 && (
          <div className="text-center py-6 space-y-4 animate-in zoom-in-95 duration-300">
            <div className="w-18 h-18 rounded-3xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-xl ring-8 ring-blue-500/10">
              <GraduationCap className="w-10 h-10" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
                APPLICATION {applicationRef} APPROVED
              </span>
              <h2 className="text-xl font-black text-slate-900 mt-2">
                Congratulations, Master Mentor Jaya!
              </h2>
              <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                Your mentor profile is now active in Sector 4. Junior electricians can now view your availability and book 1-on-1 practical training sessions with you.
              </p>
            </div>

            <div className="pt-3 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => onSelectPage('mentor_dashboard')}
                className="px-6 py-3 rounded-2xl text-xs font-black bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Go to Mentor Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step Navigation Controls */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          ) : (
            <div></div>
          )}

          {currentStep < 5 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep + 1)}
              className="px-5 py-2.5 rounded-xl text-xs font-black bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              Next Step <ArrowRight className="w-4 h-4" />
            </button>
          ) : currentStep === 5 ? (
            <button
              type="button"
              onClick={handleSubmitApplication}
              className="px-6 py-2.5 rounded-xl text-xs font-black bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Submit for Accreditation</span>
              <Send className="w-4 h-4" />
            </button>
          ) : currentStep === 6 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(7)}
              className="px-6 py-2.5 rounded-xl text-xs font-black bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>View Confirmation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : null}
        </div>

      </div>

    </div>
  );
}
