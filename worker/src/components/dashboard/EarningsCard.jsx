import { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { EARNINGS_TODAY, EARNINGS_WEEK, EARNINGS_MONTH } from '../../data/mockData';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';

const TABS = ['Today', 'This Week', 'This Month'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-blue-900 text-white text-xs rounded-lg px-3 py-2 shadow-xl">
        <p className="font-bold">{label}</p>
        <p className="text-green-300">₹{payload[0].value.toLocaleString('en-IN')}</p>
      </div>
    );
  }
  return null;
};

export default function EarningsCard() {
  const [tab, setTab] = useState(0);

  const chartData = tab === 2 ? EARNINGS_MONTH : EARNINGS_WEEK;

  return (
    <div className="card p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-800">Earnings</h3>
        <div className="flex bg-blue-50 rounded-lg p-0.5 gap-0.5">
          {TABS.map((t, i) => (
            <button
              key={t}
              onClick={() => setTab(i)}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                tab === i ? 'bg-blue-700 text-white shadow' : 'text-slate-500 hover:text-blue-700'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Today view */}
      {tab === 0 && (
        <div className="animate-fadeIn">
          <div className="card-blue p-4 rounded-xl mb-4">
            <p className="text-blue-200 text-xs mb-1">Today's Earnings</p>
            <p className="text-white text-3xl font-black">₹{EARNINGS_TODAY.total.toLocaleString('en-IN')}</p>
            <div className="flex items-center gap-3 mt-2 text-sm">
              <span className="text-blue-200">{EARNINGS_TODAY.jobs} jobs completed</span>
              <span className="text-green-300 flex items-center gap-1">
                <TrendingUp size={13} /> +₹{EARNINGS_TODAY.tips} tips
              </span>
            </div>
          </div>
          <div className="space-y-2">
            {EARNINGS_TODAY.breakdown.map((b, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                <span className="text-slate-600 text-sm">{b.label}</span>
                <span className="text-green-600 font-semibold text-sm">+₹{b.amount}</span>
              </div>
            ))}
            <div className="flex items-center justify-between py-2">
              <span className="text-slate-500 text-xs">Average per job</span>
              <span className="text-slate-700 font-medium text-sm">
                ₹{Math.round(EARNINGS_TODAY.total / EARNINGS_TODAY.jobs)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Week / Month chart */}
      {tab > 0 && (
        <div className="animate-fadeIn">
          <div className="mb-3">
            <p className="text-slate-500 text-xs">{tab === 1 ? 'This Week' : 'This Month'} Total</p>
            <p className="text-2xl font-black text-slate-800">
              ₹{chartData.reduce((s, d) => s + d.amount, 0).toLocaleString('en-IN')}
            </p>
          </div>
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={chartData} barCategoryGap="30%">
              <CartesianGrid strokeDasharray="3 3" stroke="#e0eeff" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#dbeafe' }} />
              <Bar dataKey="amount" fill="#1d4ed8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
