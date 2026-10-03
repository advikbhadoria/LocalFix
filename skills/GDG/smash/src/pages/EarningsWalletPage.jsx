import React, { useState } from 'react';
import { 
  Wallet, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownLeft, 
  TrendingUp, 
  FileText, 
  Download, 
  CheckCircle2, 
  Clock, 
  Search, 
  Filter, 
  CreditCard,
  QrCode,
  ShieldCheck,
  Building2,
  Calendar,
  Sparkles
} from 'lucide-react';
import { Line } from 'react-chartjs-2';

export default function EarningsWalletPage({
  workerProfile,
  transactions = [],
  onOpenWithdraw
}) {
  const [filterType, setFilterType] = useState('all'); // 'all' | 'job_earning' | 'withdrawal'
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTxns = transactions.filter((t) => {
    if (filterType !== 'all' && t.type !== filterType) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchId = t.id.toLowerCase().includes(q);
      const matchCustomer = t.customer.toLowerCase().includes(q);
      const matchService = t.service.toLowerCase().includes(q);
      if (!matchId && !matchCustomer && !matchService) return false;
    }
    return true;
  });

  const chartData = {
    labels: ['1-5 Oct', '6-10 Oct', '11-15 Oct', '16-20 Oct', '21-25 Oct', '26-30 Oct'],
    datasets: [
      {
        label: 'Net Payout (₹)',
        data: [6400, 8900, 7200, 11500, 9400, 14250],
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.08)',
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointBackgroundColor: '#2563eb',
        pointBorderColor: '#ffffff',
        pointRadius: 5
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0f172a',
        callbacks: {
          label: (ctx) => `Disbursed: ₹${ctx.raw.toLocaleString()}`
        }
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(0, 0, 0, 0.04)' },
        ticks: { color: '#64748b' }
      },
      y: {
        grid: { color: 'rgba(0, 0, 0, 0.04)' },
        ticks: { 
          color: '#64748b',
          callback: (v) => `₹${v}`
        }
      }
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display">
          Earnings & Digital Wallet
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Real-time escrow settlements, automatic UPI instant payouts, and official GST invoices.
        </p>
      </div>

      {/* Large Fintech Wallet Hero Card */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(#fff_2px,transparent_2px)] [background-size:24px_24px] pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          
          <div className="space-y-2 md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-blue-100 uppercase tracking-widest flex items-center gap-1.5">
                <Wallet className="w-4 h-4 text-white" />
                PocketHelp Verified Escrow Balance
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-400 text-slate-900 shadow-xs">
                0% Transfer Fee
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black text-white font-mono">
                ₹{workerProfile.walletBalance.toLocaleString()}
              </span>
              <span className="text-xs text-blue-100 font-semibold">Available for Cashout</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-blue-100 pt-1">
              <div>
                Pending Escrow: <strong className="text-amber-300">₹{workerProfile.pendingEscrow.toLocaleString()}</strong>
              </div>
              <div>•</div>
              <div>
                Monthly Disbursed: <strong className="text-emerald-300">₹{workerProfile.monthlyEarnings.toLocaleString()}</strong>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3">
            <button
              type="button"
              onClick={onOpenWithdraw}
              className="w-full py-4 px-6 rounded-2xl text-sm font-black bg-white hover:bg-slate-50 text-blue-700 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <DollarSign className="w-5 h-5 stroke-[3]" />
              <span>Withdraw Funds</span>
            </button>

            <div className="text-[11px] text-blue-100 text-center flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              Direct IMPS / UPI Settled in ~20 secs
            </div>
          </div>

        </div>
      </div>

      {/* Revenue Growth Trend Chart */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-display">Monthly Earnings Trajectory</h3>
            <p className="text-xs text-slate-500">Net take-home compensation after commission deductions</p>
          </div>
          <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            +24.2% Growth
          </span>
        </div>

        <div className="h-64 w-full">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Transaction History Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-display">Transaction & Payout Ledger</h3>
            <p className="text-xs text-slate-500">Complete itemized record of service payments, tips, and bank payouts</p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 rounded-xl text-xs font-bold text-slate-700 border border-slate-200 outline-hidden focus:border-blue-500"
            >
              <option value="all">All Transactions</option>
              <option value="job_earning">Job Earnings Only</option>
              <option value="withdrawal">Withdrawals Only</option>
            </select>
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 rounded-l-xl">Txn ID / Date</th>
                <th className="py-3 px-4">Description / Customer</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Tip / Bonus</th>
                <th className="py-3 px-4">Net Payout</th>
                <th className="py-3 px-4 rounded-r-xl text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTxns.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-mono font-bold text-slate-900 block">{t.id}</span>
                    <span className="text-[10px] text-slate-400">{t.date}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-slate-900 block">{t.service}</span>
                    <span className="text-[11px] text-slate-500">{t.customer}</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-700">
                    ₹{t.amount}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-amber-600 font-bold">
                    {t.tip > 0 || t.incentive > 0 ? `+₹${t.tip + t.incentive}` : '—'}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-black text-sm">
                    <span className={t.net > 0 ? 'text-emerald-600' : 'text-rose-600'}>
                      {t.net > 0 ? `+₹${t.net}` : `-₹${Math.abs(t.net)}`}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
