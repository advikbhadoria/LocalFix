import { CheckCircle2 } from 'lucide-react';

export function JobCompletionModal({ job, wallet, onDismiss }) {
  const prevBalance = wallet - job.pay;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-blue-950/60 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl animate-fadeUp overflow-hidden">

        {/* Success header */}
        <div className="bg-green-600 p-6 text-center">
          <CheckCircle2 size={48} className="text-white mx-auto mb-2" />
          <h3 className="text-white font-black text-2xl">Job Confirmed ✓</h3>
          <p className="text-green-200 text-sm mt-1">Customer has confirmed completion</p>
        </div>

        {/* Job details */}
        <div className="px-5 pt-5 pb-2">
          <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-xl">
              {job.icon || '🔧'}
            </div>
            <div>
              <p className="font-semibold text-slate-800 text-sm">{job.type}</p>
              <p className="text-slate-400 text-xs">{job.customer?.name || 'Customer'} · {job.area}</p>
            </div>
          </div>
        </div>

        {/* Wallet update animation */}
        <div className="px-5 pb-5 text-center">
          <p className="text-slate-400 text-xs mb-1">Payment Added to Wallet</p>
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-slate-400 text-base">₹{prevBalance.toLocaleString('en-IN')}</span>
            <span className="text-slate-400 text-lg font-bold">+</span>
            <span className="text-green-600 font-black text-xl animate-walletBump">₹{job.pay}</span>
          </div>
          <p className="text-slate-800 font-black text-3xl">₹{wallet.toLocaleString('en-IN')}</p>
          <p className="text-green-500 text-xs font-semibold mt-1 mb-5">Payment received instantly 🎉</p>

          <button
            onClick={onDismiss}
            className="w-full bg-blue-700 text-white font-bold py-3.5 rounded-xl hover:bg-blue-800 transition-colors shadow-lg shadow-blue-700/30"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
