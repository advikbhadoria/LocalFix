import React, { useState } from 'react';
import { 
  Bar, 
  Doughnut, 
  Line 
} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { 
  TrendingUp, 
  Clock, 
  Award, 
  CheckCircle2, 
  Target, 
  Sparkles, 
  ShieldCheck, 
  ChevronRight, 
  ArrowRight,
  BookOpen,
  Calendar
} from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function LearnerProgressPage({
  skillConnectProfile,
  courses,
  assessments,
  onSelectPage,
  onOpenVideoLesson
}) {
  const [analyticsPeriod, setAnalyticsPeriod] = useState('month'); // 'week' | 'month' | 'three_months' | 'all'

  // Weekly Hours Chart Data
  const weeklyHoursData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Practical Training Hours',
        data: [1.5, 0.8, 2.0, 1.2, 2.4, 3.5, 1.8],
        backgroundColor: '#2563eb',
        borderRadius: 8,
        hoverBackgroundColor: '#1d4ed8'
      },
      {
        label: 'Video & Theory Hours',
        data: [0.5, 1.0, 0.8, 0.5, 1.0, 1.2, 0.4],
        backgroundColor: '#0d9488',
        borderRadius: 8,
        hoverBackgroundColor: '#0f766e'
      }
    ]
  };

  const weeklyHoursOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: '#334155', font: { size: 11, weight: 'bold' } }
      },
      tooltip: {
        backgroundColor: '#ffffff',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        titleColor: '#0f172a',
        bodyColor: '#334155',
        boxPadding: 4,
        padding: 10
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#64748b', font: { size: 11 } }
      },
      y: {
        grid: { color: 'rgba(226, 232, 240, 0.8)' },
        ticks: { color: '#64748b', font: { size: 11 } }
      }
    }
  };

  // Skill Mastery Doughnut
  const masteryData = {
    labels: ['Electrical (96%)', 'Appliance (65%)', 'Plumbing (40%)', 'Safety (100%)', 'Communication (95%)'],
    datasets: [
      {
        data: [96, 65, 40, 100, 95],
        backgroundColor: [
          '#2563eb',
          '#0284c7',
          '#f59e0b',
          '#10b981',
          '#6366f1'
        ],
        borderWidth: 2,
        borderColor: '#ffffff'
      }
    ]
  };

  const masteryOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#334155', font: { size: 10 } }
      }
    }
  };

  // 5-Stage Visual Progression Framework
  const skillPathways = [
    {
      skillName: "3-Phase Distribution & MCB Load Balancing",
      currentStageIndex: 4,
      mentor: "Rajesh Sharma",
      hours: "18.5h",
      verified: true,
      stages: [
        { label: "1. Beginner Fundamentals", done: true },
        { label: "2. Foundation Theory & LOTO", done: true },
        { label: "3. Guided Practice & Clamp Meter", done: true },
        { label: "4. Supervised Rubric Assessment", done: true },
        { label: "5. Verified Competency Credential", done: true }
      ]
    },
    {
      skillName: "Inverter Split AC PCB Circuit & Gas Leak Mastery",
      currentStageIndex: 2,
      mentor: "Sunita Deshmukh",
      hours: "12.0h",
      verified: false,
      stages: [
        { label: "1. Beginner Fundamentals", done: true },
        { label: "2. Foundation Theory & Flaring", done: true },
        { label: "3. Guided Practice & Microcontroller", done: true },
        { label: "4. Supervised Rubric Assessment", done: false },
        { label: "5. Verified Competency Credential", done: false }
      ]
    },
    {
      skillName: "Concealed Wall Cistern & CPVC Fusion Plumbing",
      currentStageIndex: 1,
      mentor: "Vikram Gaikwad",
      hours: "6.5h",
      verified: false,
      stages: [
        { label: "1. Beginner Fundamentals", done: true },
        { label: "2. Foundation Theory & Seals", done: true },
        { label: "3. Guided Practice & PPR Welding", done: false },
        { label: "4. Supervised Rubric Assessment", done: false },
        { label: "5. Verified Competency Credential", done: false }
      ]
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display flex items-center gap-2">
            <span>Learner Progress & Skill Progression Tracker</span>
            <span className="text-blue-600 text-lg">📈</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            5-Stage competency progression roadmaps, Chart.js learning metrics, and personalized growth advice.
          </p>
        </div>

        {/* Analytics Period Switcher */}
        <div className="bg-white p-1 rounded-2xl border border-slate-200 flex items-center gap-1 shadow-xs">
          {[
            { id: 'week', label: 'This Week' },
            { id: 'month', label: 'This Month' },
            { id: 'three_months', label: '3 Months' },
            { id: 'all', label: 'All Time' }
          ].map((period) => (
            <button
              key={period.id}
              type="button"
              onClick={() => setAnalyticsPeriod(period.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                analyticsPeriod === period.id ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      {/* 5-STAGE VISUAL PROGRESSION ROADMAPS */}
      <div className="space-y-4">
        <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-600" />
          Active Skill Progression Pathways
        </h2>

        <div className="space-y-4">
          {skillPathways.map((pathway, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-3xl bg-white border border-blue-100 shadow-sm space-y-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900">{pathway.skillName}</h3>
                    {pathway.verified && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" /> Stage 5 Verified Pro
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Assigned Master Mentor: <strong>{pathway.mentor}</strong> • Total Hours: <strong>{pathway.hours}</strong>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectPage('skill_assessment')}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-blue-700 border border-slate-200 transition-colors cursor-pointer self-start sm:self-auto flex items-center gap-1.5"
                >
                  <span>View Assessment Rubric</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 5 Stage Stepper Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                {pathway.stages.map((stage, sIdx) => {
                  const isCurrent = pathway.currentStageIndex === sIdx;
                  return (
                    <div
                      key={sIdx}
                      className={`p-3 rounded-2xl border text-xs flex items-center sm:flex-col sm:text-center sm:justify-center gap-2.5 transition-all ${
                        stage.done
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                          : isCurrent
                            ? 'bg-blue-50 border-blue-400 text-blue-900 ring-2 ring-blue-500/20 shadow-xs'
                            : 'bg-slate-50 border-slate-200 text-slate-400'
                      }`}
                    >
                      <div className="flex-shrink-0">
                        {stage.done ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : isCurrent ? (
                          <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                            {sIdx + 1}
                          </span>
                        ) : (
                          <span className="w-4 h-4 rounded-full border border-slate-300 text-[10px] flex items-center justify-center text-slate-400">
                            {sIdx + 1}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] font-bold leading-tight">{stage.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CHART.JS ANALYTICS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Weekly Learning Trend Bar Chart (2 Cols) */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white border border-blue-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                Training Hours by Day
              </h3>
              <p className="text-xs text-slate-500">Total 12.8 hours logged across theory & hands-on practical labs</p>
            </div>
            <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              +24% vs Last Month
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <Bar data={weeklyHoursData} options={weeklyHoursOptions} />
          </div>
        </div>

        {/* Skill Category Mastery Breakdown (1 Col) */}
        <div className="p-6 rounded-3xl bg-white border border-blue-100 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-teal-600" />
              Competency Mastery Mix
            </h3>
            <p className="text-xs text-slate-500">Calculated from rubric assessments and verified tests</p>
          </div>

          <div className="h-48 w-full flex items-center justify-center">
            <Doughnut data={masteryData} options={masteryOptions} />
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 flex items-center justify-between">
            <span>Overall Index:</span>
            <span className="font-mono text-blue-700 font-bold">Level 3 • 79.2 / 100</span>
          </div>
        </div>

      </div>

      {/* PERSONALIZED RECOMMENDATIONS ENGINE */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-50 via-white to-teal-50 border border-blue-200 space-y-4 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          Recommended Next Growth Actions for Jaya
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-white border border-blue-100 shadow-xs space-y-2 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-teal-700 uppercase">1. Finish Inverter AC Module 4</span>
              <h4 className="font-bold text-slate-900 mt-1">Nitrogen Pressure Holding & Vacuum Testing</h4>
              <p className="text-slate-500 text-[11px] mt-0.5">
                Complete this 50-minute module with Sunita Deshmukh to qualify for your Inverter AC Final Rubric Assessment.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onSelectPage('learning_library')}
              className="mt-3 px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-all flex items-center justify-between cursor-pointer shadow-xs"
            >
              <span>Resume Lesson</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-blue-100 shadow-xs space-y-2 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-amber-700 uppercase">2. Unlock Higher Dispatch Rates</span>
              <h4 className="font-bold text-slate-900 mt-1">Commercial AC VRV Commissioning</h4>
              <p className="text-slate-500 text-[11px] mt-0.5">
                Unlocking this will make you eligible for ₹750 - ₹1,100 high-ticket emergency calls in Balewadi & Baner.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onSelectPage('job_eligibility')}
              className="mt-3 px-3.5 py-2 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white transition-all flex items-center justify-between cursor-pointer shadow-xs"
            >
              <span>View Job Eligibility</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-blue-100 shadow-xs space-y-2 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-purple-700 uppercase">3. Peer Mentorship Milestone</span>
              <h4 className="font-bold text-slate-900 mt-1">Sign off on Mentee Akash Shinde's DB Checklist</h4>
              <p className="text-slate-500 text-[11px] mt-0.5">
                Review your mentee's clamp meter load balancing calculation to earn 200 teaching credits.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onSelectPage('mentor_dashboard')}
              className="mt-3 px-3.5 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white transition-all flex items-center justify-between cursor-pointer shadow-xs"
            >
              <span>Open Mentor Desk</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
