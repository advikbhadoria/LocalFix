import React, { useState } from 'react';
import { 
  CheckCircle2, 
  DollarSign, 
  Star, 
  Wallet, 
  TrendingUp, 
  ArrowUpRight, 
  Clock, 
  Zap, 
  MapPin, 
  Phone, 
  MessageSquare, 
  ChevronRight, 
  ShieldCheck, 
  Award, 
  Flame, 
  Calendar,
  Layers,
  ArrowRight,
  Plus
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function DashboardPage({
  workerProfile,
  myJobs = [],
  availableServices = [],
  onOpenWithdraw,
  onOpenJobDetail,
  onSelectPage,
  onOpenChat,
  onOpenCall,
  onPickService
}) {
  const [chartRange, setChartRange] = useState('7d'); // '7d' | '30d'

  // Weekly earnings chart data
  const lineChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Daily Earnings (₹)',
        data: chartRange === '7d' ? [3200, 4850, 4100, 6200, 5400, 7800, 6450] : [18000, 22500, 28400, 42850],
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.08)',
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointBackgroundColor: '#2563eb',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7
      }
    ]
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0f172a',
        titleColor: '#ffffff',
        bodyColor: '#93c5fd',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context) => `Earnings: ₹${context.raw.toLocaleString()}`
        }
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(0, 0, 0, 0.04)' },
        ticks: { color: '#64748b', font: { family: 'Plus Jakarta Sans', size: 11 } }
      },
      y: {
        grid: { color: 'rgba(0, 0, 0, 0.04)' },
        ticks: { 
          color: '#64748b', 
          font: { family: 'Plus Jakarta Sans', size: 11 },
          callback: (val) => `₹${val}`
        }
      }
    }
  };

  // Category Doughnut Data
  const doughnutData = {
    labels: ['Electrical Wiring', 'MCB & Distribution', 'Fan & Appliance', 'Emergency Repair'],
    datasets: [
      {
        data: [45, 25, 20, 10],
        backgroundColor: ['#2563eb', '#10b981', '#f59e0b', '#6366f1'],
        borderWidth: 2,
        borderColor: '#ffffff',
        hoverOffset: 6
      }
    ]
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '72%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#475569',
          font: { family: 'Plus Jakarta Sans', size: 11 },
          padding: 14,
          usePointStyle: true
        }
      }
    }
  };

  const activeJob = myJobs.find(j => j.status === 'in_progress' || j.status === 'travelling' || j.status === 'accepted');

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Personalized Welcome Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 p-6 sm:p-8 text-white shadow-lg overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(#fff_2px,transparent_2px)] [background-size:24px_24px] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white border border-white/30 backdrop-blur-xs">
              <Award className="w-3.5 h-3.5 text-amber-300" />
              {workerProfile.tier} • Commission Rate: 8% (Low Fee)
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-display">
              {workerProfile.name}
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
              {workerProfile.category} • Licensed Pro #{workerProfile.licenseNumber}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onOpenWithdraw}
              className="px-5 py-3 rounded-2xl text-xs font-black bg-white hover:bg-slate-50 text-blue-700 shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <DollarSign className="w-4 h-4 stroke-[3]" />
              Withdraw ₹{workerProfile.walletBalance.toLocaleString()}
            </button>
            <button
              type="button"
              onClick={() => onSelectPage('available_services')}
              className="px-5 py-3 rounded-2xl text-xs font-bold bg-blue-800/80 hover:bg-blue-800 text-white border border-blue-400/40 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Layers className="w-4 h-4 text-blue-200" />
              Pick Open Jobs ({availableServices.length})
            </button>
          </div>
        </div>
      </div>

      {/* 4 Prominent Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        
        {/* Card 1: Jobs Completed */}
        <div 
          onClick={() => onSelectPage('my_jobs')}
          className="bg-white hover:bg-slate-50/80 p-5 rounded-3xl border border-slate-200 hover:border-blue-300 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Jobs Completed</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-slate-900 font-mono">{workerProfile.completedJobs}</div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18.4% vs last month</span>
            </div>
            {/* Animated mini bar */}
            <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full" style={{ width: '88%' }}></div>
            </div>
          </div>
        </div>

        {/* Card 2: Total Earnings */}
        <div 
          onClick={() => onSelectPage('earnings')}
          className="bg-white hover:bg-slate-50/80 p-5 rounded-3xl border border-slate-200 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Monthly Revenue</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-slate-900 font-mono">₹{workerProfile.monthlyEarnings.toLocaleString()}</div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+24.2% payout growth</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: '92%' }}></div>
            </div>
          </div>
        </div>

        {/* Card 3: Customer Rating */}
        <div 
          onClick={() => onSelectPage('performance')}
          className="bg-white hover:bg-slate-50/80 p-5 rounded-3xl border border-slate-200 hover:border-amber-300 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Customer Rating</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-slate-900 font-mono flex items-baseline gap-1">
              <span>{workerProfile.rating}</span>
              <span className="text-xs text-slate-500 font-normal">/ 5.0</span>
            </div>
            <div className="text-xs text-slate-500 font-medium mt-1">
              Based on {workerProfile.totalReviews} verified reviews
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-amber-400 h-full rounded-full" style={{ width: '98%' }}></div>
            </div>
          </div>
        </div>

        {/* Card 4: Wallet Balance & Payout */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50/70 p-5 rounded-3xl border border-blue-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">Available Wallet</span>
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-blue-700 font-mono">₹{workerProfile.walletBalance.toLocaleString()}</div>
            <div className="text-[11px] text-slate-600 mt-1">
              Pending Escrow: <strong className="text-slate-900">₹{workerProfile.pendingEscrow.toLocaleString()}</strong>
            </div>
            <button
              type="button"
              onClick={onOpenWithdraw}
              className="mt-3 w-full py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Withdraw Funds</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Main Grid: Active Job Spotlight & Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Interactive Charts & Active Job */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Active Job Spotlight Card (If active job exists) */}
          {activeJob && (
            <div className="bg-white rounded-3xl border-2 border-blue-500 p-6 shadow-md space-y-4 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-700">
                    Active Assigned Service Ticket
                  </span>
                  <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                    #{activeJob.id}
                  </span>
                </div>

                <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-200 self-start sm:self-center">
                  Stage: {activeJob.status === 'in_progress' ? '3/4 Work In Progress' : activeJob.status === 'travelling' ? '2/4 Travelling' : '1/4 Accepted'}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <img
                    src={activeJob.customer.avatar}
                    alt={activeJob.customer.name}
                    className="w-13 h-13 rounded-2xl object-cover ring-2 ring-blue-500/20"
                  />
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{activeJob.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Customer: <strong className="text-slate-800">{activeJob.customer.name}</strong> • {activeJob.customer.address}
                    </p>
                    <div className="text-xs text-blue-700 font-bold font-mono mt-1">
                      Payout: ₹{activeJob.totalPayout} (Includes rapid incentive)
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onOpenChat(activeJob.customer.name, activeJob.title)}
                    className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
                    title="Chat Customer"
                  >
                    <MessageSquare className="w-4 h-4 text-blue-600" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenCall(activeJob.customer.name, activeJob.customer.phone, activeJob.title)}
                    className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
                    title="Masked Call"
                  >
                    <Phone className="w-4 h-4 text-emerald-600" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenJobDetail(activeJob)}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Manage Job</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Weekly Revenue Trends Chart */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-display">Earnings Analytics & Payout Trends</h3>
                <p className="text-xs text-slate-500">Weekly breakdown of gross service revenue</p>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => setChartRange('7d')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    chartRange === '7d' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Last 7 Days
                </button>
                <button
                  type="button"
                  onClick={() => setChartRange('30d')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    chartRange === '30d' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Monthly
                </button>
              </div>
            </div>

            <div className="h-64 w-full">
              <Line data={lineChartData} options={lineChartOptions} />
            </div>
          </div>

        </div>

        {/* Right 1 Col: Category Distribution & Available Services Preview */}
        <div className="space-y-6">
          
          {/* Category Distribution */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-display">Service Category Share</h3>
            <div className="h-56 w-full">
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
          </div>

          {/* Quick Pickup Marketplace Preview */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-display">Open Marketplace</h3>
                <p className="text-xs text-slate-500">Voluntary pickup requests nearby</p>
              </div>
              <button
                type="button"
                onClick={() => onSelectPage('available_services')}
                className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View All ({availableServices.length})</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {availableServices.slice(0, 2).map((srv) => (
                <div
                  key={srv.id}
                  className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold text-amber-800 bg-amber-100 border border-amber-200 px-2 py-0.5 rounded-md">
                        {srv.urgency}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 mt-1 line-clamp-1">{srv.title}</h4>
                      <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-blue-600" />
                        {srv.distance} • ~{srv.travelEta}
                      </p>
                    </div>
                    <span className="text-sm font-black text-blue-700 font-mono">
                      ₹{srv.totalPayout}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onPickService(srv)}
                    className="w-full py-2 rounded-xl text-xs font-black bg-blue-600 hover:bg-blue-700 text-white transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Pick This Job (₹{srv.totalPayout})</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
