import React, { useState } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  Maximize2, 
  CheckCircle2, 
  AlertTriangle, 
  Wrench, 
  ShieldAlert, 
  BookOpen, 
  FileText, 
  Award, 
  ChevronRight,
  Sparkles,
  Download
} from 'lucide-react';

export default function VideoLessonModal({
  course,
  onClose,
  onMarkModuleComplete,
  onOpenQuiz,
  onOpenChecklist
}) {
  if (!course) return null;

  const [activeTab, setActiveTab] = useState('demo'); // 'intro' | 'tools' | 'safety' | 'demo' | 'mistakes' | 'notes'
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(45); // percentage
  const [playbackSpeed, setPlaybackSpeed] = useState('1x');
  const [selectedModuleIndex, setSelectedModuleIndex] = useState(0);

  const activeModule = course.modules?.[selectedModuleIndex] || course.modules?.[0];

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMarkComplete = () => {
    if (onMarkModuleComplete) {
      onMarkModuleComplete(course.id, activeModule?.id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-5xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        
        {/* Top Header */}
        <div className="px-6 py-3.5 border-b border-slate-200 flex items-center justify-between bg-slate-50/90">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-blue-100 text-blue-700 border border-blue-200">
              {course.category}
            </span>
            <h2 className="text-sm sm:text-base font-black text-slate-900 truncate max-w-md">
              {course.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 flex-1 overflow-hidden">
          
          {/* Left 2 Cols: Simulated Video Player & Tabs */}
          <div className="lg:col-span-2 flex flex-col overflow-y-auto custom-scrollbar border-b lg:border-b-0 lg:border-r border-slate-200">
            
            {/* Interactive Video Player Canvas */}
            <div className="relative bg-slate-900 aspect-video flex items-center justify-center overflow-hidden group">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover opacity-75 filter brightness-95 transition-transform duration-700 group-hover:scale-105"
              />

              {/* Center Play/Pause Overlay */}
              <button
                type="button"
                onClick={handleTogglePlay}
                className="absolute z-10 w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-2xl hover:bg-blue-700 hover:scale-110 transition-all cursor-pointer backdrop-blur-xs ring-4 ring-white/30"
              >
                {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 translate-x-0.5 fill-white" />}
              </button>

              {/* Live Demonstration Watermark & Badge */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-black bg-rose-600 text-white flex items-center gap-1.5 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                  HD LESSON VIDEO
                </span>
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-slate-900/80 text-white border border-slate-700 backdrop-blur-xs">
                  {playbackSpeed}
                </span>
              </div>

              {/* Bottom Video Controls Bar */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-4 z-10 space-y-2">
                {/* Progress Scrubber */}
                <div 
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const pos = ((e.clientX - rect.left) / rect.width) * 100;
                    setVideoProgress(Math.min(100, Math.max(0, pos)));
                  }}
                  className="w-full h-1.5 bg-slate-700/80 rounded-full overflow-hidden cursor-pointer group/bar"
                >
                  <div 
                    className="h-full bg-blue-500 relative rounded-full"
                    style={{ width: `${videoProgress}%` }}
                  >
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md scale-0 group-hover/bar:scale-100 transition-transform"></span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-200">
                  <div className="flex items-center gap-3">
                    <button type="button" onClick={handleTogglePlay} className="hover:text-white cursor-pointer">
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <span className="text-[11px] font-mono text-slate-300">
                      04:32 / {activeModule?.duration || '12:00'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={playbackSpeed}
                      onChange={(e) => setPlaybackSpeed(e.target.value)}
                      className="bg-slate-800 text-white text-[11px] rounded px-1.5 py-0.5 border border-slate-700 outline-hidden"
                    >
                      <option value="1x">1.0x</option>
                      <option value="1.25x">1.25x</option>
                      <option value="1.5x">1.5x</option>
                    </select>
                    <Volume2 className="w-4 h-4 text-slate-300 hover:text-white cursor-pointer" />
                    <Maximize2 className="w-4 h-4 text-slate-300 hover:text-white cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs (7-Step Learning Framework) */}
            <div className="p-4 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1">
                {[
                  { id: 'demo', label: '1. Demonstration', icon: Play },
                  { id: 'tools', label: '2. Tools & Specs', icon: Wrench },
                  { id: 'safety', label: '3. Safety Rules', icon: ShieldAlert },
                  { id: 'mistakes', label: '4. Common Mistakes', icon: AlertTriangle },
                  { id: 'notes', label: '5. Key Notes', icon: FileText }
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-white text-slate-600 border border-slate-200 hover:text-blue-600 hover:bg-slate-100'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tab Contents */}
            <div className="p-5 flex-1 space-y-4 text-xs bg-white">
              {activeTab === 'demo' && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-900">
                    {activeModule?.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    In this lesson, Master Trainer <strong>{course.mentorName}</strong> demonstrates the exact industrial methodology for isolating busbar compartments, measuring harmonic phase current with True-RMS clamp meters, and re-routing single-phase loads to prevent neutral line burnout.
                  </p>

                  <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-start gap-3">
                    <Sparkles className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-blue-900 text-xs">Learning Objective:</span>
                      <p className="text-slate-700 text-[11px] mt-0.5">
                        By the end of this module, you should be able to identify phase imbalance greater than 15% and redistribute circuits across R, Y, and B phases safely.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'tools' && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <Wrench className="w-4 h-4 text-blue-600" /> Required Field Equipment:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      { name: "1000V Insulated Screwdriver Set (VDE Certified)", desc: "Slotted & Pozidriv PZ2" },
                      { name: "True-RMS AC/DC Clamp Meter (CAT III 600V)", desc: "With Inrush Current Capture" },
                      { name: "Digital Earth Resistance Megger Tester", desc: "For Ground Loop Verification" },
                      { name: "Non-Contact Voltage (NCV) Induction Pen", desc: "For Quick Zero-Energy Proof" }
                    ].map((t, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                        <div className="font-bold text-slate-900">{t.name}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{t.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'safety' && (
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
                    <div className="flex items-center gap-2 text-rose-700 font-bold text-xs">
                      <ShieldAlert className="w-4 h-4 text-rose-600" />
                      <span>MANDATORY SAFETY PROTOCOL (LOTO):</span>
                    </div>
                    <p className="text-rose-900 text-xs">
                      {course.safetyWarning || "Always disconnect incoming utility power and discharge filter capacitors before touching high voltage terminals."}
                    </p>
                  </div>
                  <ul className="space-y-2 text-slate-700 list-disc list-inside text-xs">
                    <li>Wear Class 0 dielectric rubber gloves under mechanical leather protectors.</li>
                    <li>Always check calibration date of your multimeter test leads.</li>
                    <li>Keep a dry powder ABC fire extinguisher within 5 meters of test bench.</li>
                  </ul>
                </div>
              )}

              {activeTab === 'mistakes' && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600" /> Critical Field Mistakes to Avoid:
                  </h3>
                  <div className="space-y-2">
                    {[
                      { title: "Mistake 1: Leaving multi-strand wire copper whiskers un-ferruled", fix: "Always use ratchet crimper with nylon insulated cord-end ferrules." },
                      { title: "Mistake 2: Mixing R-Y-B phases without neutral current check", fix: "Clamp the neutral wire before and after shifting breakers to confirm current dropped." },
                      { title: "Mistake 3: Overtightening aluminum busbar bolts", fix: "Use calibrated torque wrench (max 9.5 N.m) to avoid thread stripping." }
                    ].map((m, i) => (
                      <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                        <div className="font-bold text-amber-700">{m.title}</div>
                        <div className="text-slate-600 text-[11px]"><strong>Correct Method:</strong> {m.fix}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'notes' && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-blue-600" /> Downloadable Quick Reference:
                  </h3>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900">3-Phase_Busbar_Torque_&_Amperage_Chart.pdf</div>
                      <div className="text-[11px] text-slate-500">PDF Guide • 1.2 MB • PocketHelp Standards</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => alert('Downloaded 3-Phase Busbar Reference Chart!')}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1.5 hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" /> Download
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Right Col: Course Modules Playlist & Quick Actions */}
          <div className="p-5 flex flex-col justify-between bg-slate-50 overflow-y-auto custom-scrollbar space-y-5">
            
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Course Modules ({course.completedModulesCount || 0}/{course.totalModulesCount || course.modules?.length || 5})
                </span>
                <span className="text-blue-700 font-black text-xs">
                  {course.progressPercentage || 0}% Complete
                </span>
              </div>

              {/* Playlist Items */}
              <div className="space-y-2">
                {course.modules?.map((mod, idx) => (
                  <button
                    key={mod.id}
                    type="button"
                    onClick={() => setSelectedModuleIndex(idx)}
                    className={`w-full text-left p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-2.5 ${
                      selectedModuleIndex === idx
                        ? 'bg-blue-50 border-blue-500 text-blue-900 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="mt-0.5">
                      {mod.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <span className={`w-4 h-4 rounded-full border text-[10px] font-bold flex items-center justify-center ${
                          selectedModuleIndex === idx ? 'border-blue-600 text-blue-600' : 'border-slate-400 text-slate-400'
                        }`}>
                          {idx + 1}
                        </span>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold line-clamp-1">{mod.title}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{mod.duration}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Practical Checklist & Quiz Action Buttons */}
            <div className="space-y-2.5 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={handleMarkComplete}
                className="w-full py-2.5 rounded-xl text-xs font-black bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Mark Module as Complete</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onOpenQuiz) onOpenQuiz(course);
                }}
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Award className="w-4 h-4 text-amber-500" />
                <span>Take Knowledge Quiz</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onOpenChecklist) onOpenChecklist(course);
                }}
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-white hover:bg-slate-100 text-blue-700 border border-blue-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-blue-600" />
                <span>Open Practical Checklist</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
