import { useEffect, useState, useRef } from 'react';
import { MapPin, Clock, DollarSign, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const INITIAL_SECONDS = 25;

function JobCard({ job, onAccept, onReject, onOpen }) {
  return (
    <div
      className={`card p-4 border-2 transition-all hover:-translate-y-0.5 hover:shadow-md cursor-pointer ${
        job.urgent ? 'border-orange-300 bg-orange-50/40' : 'border-blue-100'
      }`}
      onClick={() => onOpen(job)}
    >
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ${
          job.urgent ? 'bg-orange-100' : 'bg-blue-100'
        }`}>
          {job.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="font-semibold text-slate-800 text-sm leading-tight">{job.type}</h4>
              <p className="text-slate-500 text-xs mt-0.5">{job.area}</p>
            </div>
            {job.urgent && (
              <span className="shrink-0 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">URGENT</span>
            )}
          </div>
          <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
            <span className="flex items-center gap-1"><MapPin size={11} />{job.dist} km</span>
            <span className="flex items-center gap-1"><Clock size={11} />{job.time} min</span>
            <span className="flex items-center gap-1 text-green-600 font-semibold">
              ₹{job.pay}
            </span>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-3">
        <button
          onClick={e => { e.stopPropagation(); onAccept(job); }}
          className="flex-1 bg-blue-700 text-white text-xs font-semibold py-2 rounded-lg hover:bg-blue-800 transition-colors"
        >
          Accept
        </button>
        <button
          onClick={e => { e.stopPropagation(); onReject(job.id); }}
          className="flex-1 bg-slate-100 text-slate-600 text-xs font-semibold py-2 rounded-lg hover:bg-slate-200 transition-colors"
        >
          Reject
        </button>
      </div>
    </div>
  );
}

// ─── Countdown popup ──────────────────────────────────────────────────────────
export function JobPopup({ job, onAccept, onReject, onExpire }) {
  const [secs, setSecs] = useState(INITIAL_SECONDS);
  const ref = useRef(null);

  useEffect(() => {
    ref.current = setInterval(() => {
      setSecs(s => {
        if (s <= 1) { clearInterval(ref.current); onExpire(job.id); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(ref.current);
  }, [job.id, onExpire]);

  const pct = (secs / INITIAL_SECONDS) * 100;
  const urgent = secs <= 10;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-blue-950/60 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden animate-fadeUp">
        {/* Top bar */}
        <div className={`h-1.5 transition-all duration-300 ${urgent ? 'bg-red-500' : 'bg-blue-600'}`}
          style={{ width: `${pct}%` }} />

        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">🔔 New Job Available</span>
            <span className={`font-mono font-black text-2xl animate-countTick ${urgent ? 'text-red-500' : 'text-blue-700'}`}>
              {String(Math.floor(secs / 60)).padStart(2, '0')}:{String(secs % 60).padStart(2, '0')}
            </span>
          </div>

          <div className="flex items-start gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">{job.icon}</div>
            <div>
              <h3 className="font-bold text-slate-800 text-lg">{job.type}</h3>
              <div className="flex gap-3 text-sm mt-1">
                <span className="text-slate-500 flex items-center gap-1"><MapPin size={12} />{job.dist} km</span>
                <span className="text-green-600 font-bold">₹{job.pay}</span>
                <span className="text-slate-500 flex items-center gap-1"><Clock size={12} />{job.time} min</span>
              </div>
            </div>
          </div>

          {/* Customer info */}
          <div className="bg-blue-50 rounded-xl p-3 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-700 font-semibold text-sm">{job.customer.name}</p>
                <p className="text-slate-400 text-xs">{job.customer.prevJobs} previous jobs</p>
              </div>
              <div className="text-right">
                <p className="text-yellow-600 font-semibold text-sm">⭐ {job.customer.rating}</p>
                <p className="text-xs text-slate-400">{job.area}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-500">
              <span>🔒</span>
              <span>Personal numbers remain hidden</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onAccept(job)}
              className="flex-1 bg-blue-700 text-white font-bold py-3 rounded-xl hover:bg-blue-800 transition-colors shadow-lg shadow-blue-700/30"
            >
              ✓ Accept Job
            </button>
            <button
              onClick={() => onReject(job.id)}
              className="px-4 bg-slate-100 text-slate-600 font-semibold py-3 rounded-xl hover:bg-slate-200 transition-colors"
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Jobs section panel ────────────────────────────────────────────────────────
export default function JobsSection({ jobs, onAccept, onReject, onOpen }) {
  if (jobs.length === 0) {
    return (
      <div className="card p-8 text-center">
        <div className="text-4xl mb-3">🔍</div>
        <p className="text-slate-700 font-semibold">No jobs available right now</p>
        <p className="text-slate-400 text-sm mt-1">New jobs will appear here in real time</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-700 text-sm">Available Jobs ({jobs.length})</h3>
        <span className="flex items-center gap-1 text-green-600 text-xs font-medium">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          Live
        </span>
      </div>
      {jobs.map(j => (
        <JobCard key={j.id} job={j} onAccept={onAccept} onReject={onReject} onOpen={onOpen} />
      ))}
    </div>
  );
}
