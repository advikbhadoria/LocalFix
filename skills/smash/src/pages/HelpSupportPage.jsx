import React, { useState } from 'react';
import { 
  HelpCircle, 
  PhoneCall, 
  MessageSquare, 
  FileText, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  AlertCircle,
  Zap,
  DollarSign
} from 'lucide-react';

export default function HelpSupportPage() {
  const [openFaq, setOpenFaq] = useState(0);

  const FAQS = [
    {
      q: "How does the customer 4-digit completion PIN work?",
      a: "When a customer books a service, our system generates a unique 4-digit security PIN. Once you finish the repair and test it in front of the customer, ask them for the PIN. Entering it into your app instantly verifies the completion and releases escrow funds into your wallet balance."
    },
    {
      q: "When can I withdraw my earnings to my bank account?",
      a: "Earnings are credited instantly upon PIN verification. You can withdraw anytime 24x7 via UPI or IMPS Bank Transfer with 0% processing fee. Funds usually reflect in your bank account in 15 to 30 seconds."
    },
    {
      q: "What should I do if a customer refuses to share the PIN?",
      a: "Do not leave the premises without resolution. Contact our 24x7 Dispatch Safety Command Desk via the 'Call Support' button. Our supervisor will verify the completed job with the customer directly and manual-release the escrow payment."
    },
    {
      q: "How do I maintain my Platinum Pro Tier status?",
      a: "Maintain an acceptance rate above 90%, customer star rating above 4.85, and zero unexcused cancellations. Platinum Pro technicians enjoy lower 8% commission (instead of standard 15%) and priority algorithm dispatch."
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-4xl mx-auto">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display">
          Worker Partner Help & 24/7 Support
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Dedicated supervisor support desk, ground safety escalation, and operational FAQs.
        </p>
      </div>

      {/* Support Hotlines Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200">
            <PhoneCall className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 font-display">24/7 Priority Partner Helpline</h3>
            <p className="text-xs text-slate-500 mt-1">Direct line to senior Pune sector dispatch supervisors</p>
          </div>
          <a
            href="tel:18004197625"
            className="w-full py-3 rounded-xl text-xs font-black bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call 1800-419-7625 (Toll-Free)</span>
          </a>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 font-display">Live In-App Support Chat</h3>
            <p className="text-xs text-slate-500 mt-1">Chat with operations team for billing, dispute, or rate cards</p>
          </div>
          <button
            type="button"
            onClick={() => alert('Support live chat initialized with Pune Regional Hub.')}
            className="w-full py-3 rounded-xl text-xs font-black bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            <span>Open Help Desk Ticket</span>
          </button>
        </div>

      </div>

      {/* FAQs Accordion */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-4 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 font-display">Frequently Asked Questions</h3>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 cursor-pointer hover:border-blue-300 transition-all"
                onClick={() => setOpenFaq(isOpen ? null : idx)}
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">{faq.q}</h4>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-blue-600" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </div>

                {isOpen && (
                  <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-200 animate-in fade-in">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
