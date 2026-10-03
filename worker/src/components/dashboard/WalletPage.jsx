import { useState } from 'react';
import { Wallet, ArrowDownToLine, Building2, ArrowUpRight, X } from 'lucide-react';

const TX_STYLES = {
  earn:     { dot: 'bg-green-500', text: 'text-green-600', prefix: '+' },
  tip:      { dot: 'bg-blue-500',  text: 'text-blue-600',  prefix: '+' },
  withdraw: { dot: 'bg-red-400',   text: 'text-red-500',   prefix: ''  },
  refund:   { dot: 'bg-purple-400',text: 'text-purple-500',prefix: '+' },
};

function TransactionRow({ tx }) {
  const style = TX_STYLES[tx.type] || TX_STYLES.earn;
  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
      <div className="flex items-center gap-3">
        <span className={`w-2 h-2 rounded-full ${style.dot} shrink-0`} />
        <div>
          <p className="text-slate-700 text-sm font-medium">{tx.label}</p>
          <p className="text-slate-400 text-xs">{tx.time}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`text-sm font-bold ${style.text}`}>
          {style.prefix}₹{Math.abs(tx.amount).toLocaleString('en-IN')}
        </p>
        <p className="text-slate-400 text-[10px] capitalize">{tx.type}</p>
      </div>
    </div>
  );
}

// ─── Cashout modal ────────────────────────────────────────────────────────────
export function CashoutModal({ wallet, onCashout, onClose }) {
  const [method, setMethod]   = useState('UPI');
  const [amount, setAmount]   = useState(wallet);
  const [upi,    setUpi]      = useState('aman@paytm');
  const [success, setSuccess] = useState(false);

  const confirm = () => {
    if (amount > wallet || amount <= 0) return;
    setSuccess(true);
    setTimeout(() => { onCashout(amount, method); }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-blue-950/60 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl animate-fadeUp">
        {success ? (
          <div className="p-8 text-center animate-fadeIn">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="font-black text-slate-800 text-2xl mb-1">Cashout Successful!</h3>
            <p className="text-green-600 font-semibold text-lg">₹{amount.toLocaleString('en-IN')} transferred</p>
            <p className="text-slate-500 text-sm mt-1">via {method}</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between p-5 border-b border-blue-100">
              <h3 className="font-bold text-slate-800">Cash Out</h3>
              <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              {/* Balance */}
              <div className="bg-blue-50 rounded-xl p-3 text-center">
                <p className="text-slate-500 text-xs">Available Balance</p>
                <p className="text-2xl font-black text-blue-800">₹{wallet.toLocaleString('en-IN')}</p>
              </div>

              {/* Method */}
              <div className="flex gap-2">
                {['UPI', 'Bank Account'].map(m => (
                  <button
                    key={m}
                    onClick={() => setMethod(m)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border-2 transition-colors ${
                      method === m ? 'border-blue-700 bg-blue-700 text-white' : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    {m === 'UPI' ? '📱 UPI' : '🏦 Bank'}
                  </button>
                ))}
              </div>

              {/* UPI ID / Account */}
              {method === 'UPI' ? (
                <div>
                  <label className="text-xs text-slate-500 font-medium block mb-1">UPI ID</label>
                  <input
                    value={upi}
                    onChange={e => setUpi(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
              ) : (
                <div className="bg-slate-50 rounded-xl p-3 text-sm text-slate-700">
                  <p className="font-semibold">HDFC Bank •••• 4201</p>
                  <p className="text-slate-400 text-xs">Aman Kumar — Savings Account</p>
                </div>
              )}

              {/* Amount */}
              <div>
                <label className="text-xs text-slate-500 font-medium block mb-1">Amount (₹)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={e => setAmount(Number(e.target.value))}
                  max={wallet}
                  min={1}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>

              <button
                onClick={confirm}
                disabled={amount <= 0 || amount > wallet}
                className="w-full bg-blue-700 text-white font-bold py-3.5 rounded-xl hover:bg-blue-800 transition-colors disabled:opacity-50 shadow-lg shadow-blue-700/30"
              >
                Confirm Cashout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Wallet page ───────────────────────────────────────────────────────────────
export default function WalletPage({ wallet, transactions, onCashout }) {
  const [showModal, setShowModal] = useState(false);

  const todayEarned  = transactions.filter(t => t.type === 'earn' && t.time !== 'Yesterday').reduce((s, t) => s + t.amount, 0);
  const weekEarned   = 6840;
  const monthEarned  = 24500;

  const handleCashout = (amount, method) => {
    onCashout(amount, method);
    setShowModal(false);
  };

  return (
    <>
      <div className="space-y-4">
        {/* Balance card */}
        <div className="card-blue p-6 text-center rounded-2xl relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-blue-600/30 rounded-full" />
          <div className="absolute -left-8 -bottom-8 w-24 h-24 bg-blue-800/30 rounded-full" />
          <p className="text-blue-200 text-sm mb-1 relative">Total Wallet Balance</p>
          <p className="text-white text-4xl font-black relative">₹{wallet.toLocaleString('en-IN')}</p>
          <div className="flex gap-3 mt-4 justify-center relative">
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-white text-blue-800 font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-blue-50 transition-colors shadow"
            >
              <ArrowDownToLine size={14} /> Withdraw UPI
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-blue-600 text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-blue-500 transition-colors border border-blue-500"
            >
              <Building2 size={14} /> Bank Transfer
            </button>
          </div>
        </div>

        {/* Earnings summary */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Today',      value: todayEarned },
            { label: 'This Week',  value: weekEarned  },
            { label: 'This Month', value: monthEarned },
          ].map(s => (
            <div key={s.label} className="card p-3 text-center">
              <p className="text-slate-800 font-bold text-base">₹{s.value.toLocaleString('en-IN')}</p>
              <p className="text-slate-400 text-[10px] mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Transactions */}
        <div className="card p-4">
          <h3 className="font-bold text-slate-800 mb-3">Transaction History</h3>
          {transactions.map(tx => <TransactionRow key={tx.id} tx={tx} />)}
        </div>
      </div>

      {showModal && (
        <CashoutModal wallet={wallet} onCashout={handleCashout} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
