import { MapPin, MessageSquare, Phone, Clock } from 'lucide-react';

const STATUS_LABELS = {
  en_route: { label: 'En Route',        color: 'bg-blue-100 text-blue-700',   dot: 'bg-blue-500'   },
  on_site:  { label: 'On Site',         color: 'bg-yellow-100 text-yellow-700',dot: 'bg-yellow-500' },
  waiting:  { label: 'Awaiting Confirm',color: 'bg-purple-100 text-purple-700',dot: 'bg-purple-500' },
};

export default function ActiveJob({ job, onOpenChat }) {
  if (!job) return null;

  const status = STATUS_LABELS[job.status] || STATUS_LABELS.en_route;

  return (
    <div className="card border-2 border-blue-400 p-4 shadow-md">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">🟡 Active Job</span>
        <span className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${status.color}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
          {status.label}
        </span>
      </div>

      <div className="flex items-start gap-3 mb-4">
        <div className="w-11 h-11 bg-blue-100 rounded-xl flex items-center justify-center text-xl shrink-0">
          {job.icon || '🔧'}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-slate-800">{job.type}</h3>
          <p className="text-slate-500 text-sm">{job.customer?.name || 'Customer'}</p>
          <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
            <span className="flex items-center gap-1"><MapPin size={11} />{job.dist} km</span>
            <span className="text-green-600 font-semibold">₹{job.pay}</span>
          </div>
        </div>
      </div>

      {/* Communication buttons only — no completion button for the worker */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={onOpenChat}
          className="flex items-center justify-center gap-2 bg-blue-50 border border-blue-200 rounded-xl py-2.5 hover:bg-blue-100 transition-colors"
        >
          <MessageSquare size={15} className="text-blue-600" />
          <span className="text-xs font-semibold text-blue-700">Open Chat</span>
        </button>
        <button className="flex items-center justify-center gap-2 bg-slate-50 border border-slate-200 rounded-xl py-2.5 hover:bg-slate-100 transition-colors">
          <Phone size={15} className="text-slate-600" />
          <span className="text-xs font-semibold text-slate-600">Call Customer</span>
        </button>
      </div>

      {/* Customer confirms — worker waits */}
      <div className="mt-3 flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-xl px-3 py-2">
        <Clock size={13} className="text-blue-400 shrink-0" />
        <p className="text-blue-600 text-xs">
          Job completion is confirmed by the <span className="font-semibold">customer</span> — finish the work and wait for their confirmation.
        </p>
      </div>
    </div>
  );
}
