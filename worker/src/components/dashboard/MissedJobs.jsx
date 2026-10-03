import { MapPin, Clock } from 'lucide-react';

export default function MissedJobs({ jobs, onClaim }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-700 text-sm">Missed Jobs ({jobs.length})</h3>
        <span className="text-slate-400 text-xs">Claim to reschedule</span>
      </div>

      {jobs.length === 0 ? (
        <div className="card p-6 text-center">
          <p className="text-2xl mb-2">✅</p>
          <p className="text-slate-600 font-medium text-sm">No missed jobs — great job!</p>
        </div>
      ) : (
        jobs.map(job => (
          <div key={job.id} className="card p-4 border border-orange-100 bg-orange-50/30">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-lg shrink-0">
                {job.icon || '🔧'}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-slate-800 text-sm">{job.type}</h4>
                <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><MapPin size={10} />{job.area} · {job.dist} km</span>
                  <span className="text-green-600 font-semibold">₹{job.pay}</span>
                </div>
              </div>
              <button
                onClick={() => onClaim(job)}
                className="shrink-0 bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-blue-800 transition-colors"
              >
                Claim
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
