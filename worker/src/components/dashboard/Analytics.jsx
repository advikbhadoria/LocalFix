import { ANALYTICS } from '../../data/mockData';
import { WORKER } from '../../data/mockData';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

const compareData = [
  { month: 'Prev Month', amount: ANALYTICS.prevMonth.earnings },
  { month: 'This Month', amount: ANALYTICS.thisMonth.earnings },
];

const jobBreakdown = ANALYTICS.jobBreakdown;

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-blue-900 text-white text-xs rounded-lg px-3 py-2">
        <p className="font-bold">{label}</p>
        <p className="text-green-300">₹{payload[0].value.toLocaleString('en-IN')}</p>
      </div>
    );
  }
  return null;
};

function StatCard({ label, value, sub, color }) {
  return (
    <div className={`card p-4 text-center border-t-4 ${color}`}>
      <p className="text-2xl font-black text-slate-800">{value}</p>
      <p className="text-slate-500 text-xs mt-1">{label}</p>
      {sub && <p className="text-blue-500 text-[10px] mt-0.5">{sub}</p>}
    </div>
  );
}

export default function Analytics() {
  const { thisMonth, prevMonth } = ANALYTICS;
  const growth = (((thisMonth.earnings - prevMonth.earnings) / prevMonth.earnings) * 100).toFixed(1);

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-slate-800 text-lg">My Performance</h3>

      {/* KPI grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <StatCard label="Jobs Completed" value={thisMonth.jobs} sub="This Month" color="border-blue-500" />
        <StatCard label="Total Earnings"  value={`₹${thisMonth.earnings.toLocaleString('en-IN')}`} sub="This Month" color="border-green-500" />
        <StatCard label="Avg Rating"      value={`${thisMonth.rating}⭐`} sub="Last 30 days" color="border-yellow-400" />
        <StatCard label="Avg Job Time"    value={`${thisMonth.avgTime} min`} sub="Per job" color="border-indigo-400" />
        <StatCard label="Acceptance Rate" value={`${thisMonth.acceptance}%`} sub="Jobs accepted" color="border-teal-400" />
        <StatCard label="Avg Job Value"   value={`₹${Math.round(thisMonth.earnings / thisMonth.jobs)}`} sub="Per job" color="border-purple-400" />
      </div>

      {/* Monthly comparison */}
      <div className="card p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-bold text-slate-700 text-sm">Monthly Comparison</h4>
          <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
            Number(growth) >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
          }`}>
            {Number(growth) >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {growth}%
          </div>
        </div>
        <ResponsiveContainer width="100%" height={140}>
          <BarChart data={compareData} barCategoryGap="40%">
            <CartesianGrid strokeDasharray="3 3" stroke="#e0eeff" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#dbeafe' }} />
            <Bar dataKey="amount" fill="#1d4ed8" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Job breakdown */}
      <div className="card p-4">
        <h4 className="font-bold text-slate-700 text-sm mb-3">Job Breakdown</h4>
        <div className="space-y-3">
          {jobBreakdown.map((item, i) => (
            <div key={i}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600 font-medium">{item.label}</span>
                <span className="text-slate-500">{item.value}</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${(item.value / (thisMonth.jobs + 7)) * 100}%`, background: item.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
