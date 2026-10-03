import React from 'react';
import { 
  X, 
  Download, 
  Share2, 
  ShieldCheck, 
  Award, 
  Sparkles, 
  QrCode, 
  CheckCircle2,
  Printer
} from 'lucide-react';

export default function CertificateModal({
  achievement,
  workerName = "Jaya Kumari",
  onClose,
  onShareToProfile
}) {
  if (!achievement) return null;

  const handleDownload = () => {
    alert(`📥 Downloading high-resolution Certificate: ${achievement.certificateId || 'CERT-SKILLCONNECT'}.pdf (Simulated)`);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        
        {/* Modal Top Bar */}
        <div className="px-6 py-3.5 border-b border-slate-200 flex items-center justify-between bg-slate-50/90">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-amber-600" /> VERIFIED CREDENTIAL
            </span>
            <span className="text-xs text-slate-500 font-mono">
              ID: {achievement.certificateId || 'CERT-ELEC-2026-9082'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Print Certificate"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Scrollable Canvas */}
        <div className="p-4 sm:p-8 overflow-y-auto custom-scrollbar flex-1 bg-slate-100/70 flex items-center justify-center">
          
          {/* Certificate Frame with Gold Foil & Double Border */}
          <div className="relative w-full max-w-2xl bg-white border-4 border-amber-400 rounded-3xl p-6 sm:p-10 shadow-xl text-center space-y-6 overflow-hidden">
            
            {/* Corner Ornamental Accents */}
            <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-amber-500"></div>
            <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-amber-500"></div>
            <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-amber-500"></div>
            <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-amber-500"></div>

            {/* Platform Branding */}
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-xl font-black tracking-tight text-slate-900">
                  Pocket<span className="text-blue-600">Help</span> <span className="text-blue-500 font-normal text-base">SkillConnect</span>
                </span>
              </div>
              <p className="text-[10px] text-amber-700 font-bold uppercase tracking-widest">
                National Peer-to-Peer Worker Competency Verification
              </p>
            </div>

            {/* Certificate Header */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 tracking-wide uppercase">
                Certificate of Competency
              </h1>
              <p className="text-xs text-slate-500 mt-1 italic">
                This is to certify that
              </p>
              <h2 className="text-xl sm:text-2xl font-black text-blue-900 mt-2 border-b-2 border-amber-400 pb-2 inline-block px-6">
                {workerName}
              </h2>
            </div>

            {/* Description & Skill */}
            <div className="space-y-2 max-w-lg mx-auto">
              <p className="text-xs text-slate-600 leading-relaxed">
                has successfully demonstrated practical field mastery, passed rigorous safety & diagnostic rubric assessments, and attained the verified professional standard in:
              </p>
              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 font-bold text-sm sm:text-base">
                {achievement.title || achievement.name}
              </div>
            </div>

            {/* Signatures & Seal Section */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200 items-end">
              
              {/* Assessor Signature */}
              <div className="text-left space-y-1">
                <div className="font-serif italic text-sm text-blue-800 font-bold">
                  {achievement.assessor || achievement.mentor || "Rajesh Sharma"}
                </div>
                <div className="text-[10px] text-slate-500 border-t border-slate-300 pt-1">
                  Master Assessor Signature
                </div>
              </div>

              {/* Gold Holographic Seal */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-500 text-slate-950 flex flex-col items-center justify-center font-black shadow-lg shadow-amber-500/20 ring-4 ring-amber-200">
                  <ShieldCheck className="w-6 h-6 text-slate-900" />
                  <span className="text-[8px] font-black uppercase">VERIFIED</span>
                </div>
                <span className="text-[9px] text-amber-800 mt-1 font-mono font-bold">DEMO VERIFIED</span>
              </div>

              {/* QR Verification & Date */}
              <div className="text-right space-y-1">
                <div className="text-xs font-mono text-slate-900 font-bold">
                  {achievement.verifiedDate || achievement.date || "Oct 03, 2026"}
                </div>
                <div className="text-[10px] text-slate-500 border-t border-slate-300 pt-1">
                  Date of Certification
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Close
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                if (onShareToProfile) onShareToProfile(achievement);
                alert('✓ Credential linked to your public worker dispatch profile! Clients can now see your verified badge.');
              }}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-white hover:bg-slate-100 text-blue-700 border border-blue-200 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Share2 className="w-4 h-4" /> Feature on Profile
            </button>

            <button
              type="button"
              onClick={handleDownload}
              className="px-5 py-2.5 rounded-xl text-xs font-black bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 cursor-pointer font-bold"
            >
              <Download className="w-4 h-4" /> Download Certificate
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
