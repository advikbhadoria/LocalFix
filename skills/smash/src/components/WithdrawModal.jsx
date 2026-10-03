import React, { useState } from 'react';
import { 
  DollarSign, 
  CreditCard, 
  CheckCircle2, 
  ArrowRight, 
  X, 
  ShieldCheck, 
  AlertCircle, 
  Zap,
  Building2,
  QrCode
} from 'lucide-react';

export default function WithdrawModal({
  availableBalance = 12450,
  onWithdrawSubmit,
  onClose
}) {
  const [method, setMethod] = useState('upi'); // 'upi' | 'bank'
  const [amount, setAmount] = useState('');
  const [upiId, setUpiId] = useState('jaya.kumari@okhdfcbank');
  const [bankAccount, setBankAccount] = useState('5010048891204');
  const [ifsc, setIfsc] = useState('HDFC0001204');
  const [accountHolder, setAccountHolder] = useState('Jaya Kumari');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const quickAmounts = [1000, 2500, 5000, availableBalance];

  const handleQuickSelect = (amt) => {
    setAmount(amt.toString());
    setError('');
  };

  const handleWithdraw = (e) => {
    e.preventDefault();
    const numAmt = parseFloat(amount);

    if (isNaN(numAmt) || numAmt <= 0) {
      setError('Please enter a valid withdrawal amount.');
      return;
    }
    if (numAmt < 100) {
      setError('Minimum withdrawal threshold is ₹100.');
      return;
    }
    if (numAmt > availableBalance) {
      setError(`Amount exceeds your available balance of ₹${availableBalance.toLocaleString()}.`);
      return;
    }

    setError('');
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      onWithdrawSubmit({
        amount: numAmt,
        method: method === 'upi' ? `Instant UPI (${upiId})` : `Bank Transfer (${bankAccount.slice(-4)})`,
        timestamp: 'Just now'
      });
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white text-slate-900 rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
            <DollarSign className="w-6 h-6 stroke-[3]" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight font-display">Withdraw to Bank / UPI</h3>
            <p className="text-xs text-slate-500">Instant 24x7 payout settlement with 0% processing fee</p>
          </div>
        </div>

        {/* Available Balance Box */}
        <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-200 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-blue-800 uppercase tracking-wider block">Available for Cashout</span>
            <span className="text-2xl font-black text-blue-700 font-mono">₹{availableBalance.toLocaleString()}</span>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            Instant Transfer
          </span>
        </div>

        {/* Payout Method Toggle */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            Select Payout Channel
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setMethod('upi')}
              className={`p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
                method === 'upi'
                  ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-500/20 text-slate-900'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className="p-2 rounded-xl bg-blue-100 text-blue-600">
                <QrCode className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Instant UPI</div>
                <div className="text-[10px] text-slate-500">GPay / PhonePe / Paytm</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setMethod('bank')}
              className={`p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
                method === 'bank'
                  ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-500/20 text-slate-900'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className="p-2 rounded-xl bg-blue-100 text-blue-600">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Bank IMPS / NEFT</div>
                <div className="text-[10px] text-slate-500">Direct Account Transfer</div>
              </div>
            </button>
          </div>
        </div>

        {/* Channel Details Inputs */}
        {method === 'upi' ? (
          <div className="space-y-1 text-xs">
            <label className="block font-bold text-slate-700">Verified UPI ID</label>
            <input
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              className="w-full p-3 bg-slate-50 rounded-xl text-slate-900 font-mono text-sm border border-slate-200 focus:border-blue-500 focus:bg-white outline-hidden"
            />
          </div>
        ) : (
          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Account Holder Name</label>
              <input
                type="text"
                value={accountHolder}
                onChange={(e) => setAccountHolder(e.target.value)}
                className="w-full p-2.5 bg-slate-50 rounded-xl text-slate-900 font-medium border border-slate-200 outline-hidden focus:border-blue-500 focus:bg-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Account Number</label>
                <input
                  type="text"
                  value={bankAccount}
                  onChange={(e) => setBankAccount(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 rounded-xl text-slate-900 font-mono border border-slate-200 outline-hidden focus:border-blue-500 focus:bg-white"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">IFSC Code</label>
                <input
                  type="text"
                  value={ifsc}
                  onChange={(e) => setIfsc(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 rounded-xl text-slate-900 font-mono border border-slate-200 outline-hidden uppercase focus:border-blue-500 focus:bg-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* Amount Input & Quick Preset Pills */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            Enter Amount to Cash Out (₹)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-black text-slate-500">₹</span>
            <input
              type="number"
              placeholder="e.g. 5000"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setError('');
              }}
              className="w-full pl-9 pr-4 py-3 bg-slate-50 rounded-2xl text-slate-900 text-xl font-mono font-black border border-slate-200 focus:border-blue-500 focus:bg-white outline-hidden"
            />
          </div>

          {/* Quick preset buttons */}
          <div className="flex flex-wrap gap-2 pt-1">
            {quickAmounts.map((amt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleQuickSelect(amt)}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
              >
                {amt === availableBalance ? `Max (₹${amt.toLocaleString()})` : `₹${amt.toLocaleString()}`}
              </button>
            ))}
          </div>

          {error && (
            <p className="text-xs text-rose-600 flex items-center gap-1.5 mt-1 font-semibold">
              <AlertCircle className="w-3.5 h-3.5" />
              {error}
            </p>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            type="button"
            disabled={isProcessing}
            onClick={handleWithdraw}
            className="w-full py-4 rounded-2xl text-sm font-black bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Processing Instant IMPS / UPI Transfer...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Confirm Withdrawal (₹{amount || '0'})
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </button>
        </div>

        {/* Security badge */}
        <div className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5 text-center">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          Protected with 256-bit bank encryption & NPCI Unified Payout Switch.
        </div>

      </div>
    </div>
  );
}
