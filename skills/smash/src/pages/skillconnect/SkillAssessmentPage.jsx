import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  User, 
  Send, 
  Sparkles, 
  FileText, 
  CheckSquare, 
  ChevronRight,
  Eye,
  Wrench,
  ThumbsUp,
  AlertTriangle
} from 'lucide-react';

export default function SkillAssessmentPage({
  assessments,
  workerProfile,
  onOpenCertificate,
  onSubmitAssessmentSignoff
}) {
  const [selectedAssessmentId, setSelectedAssessmentId] = useState(assessments[0]?.id || 'ASM-101');
  const activeAssessment = assessments.find(a => a.id === selectedAssessmentId) || assessments[0];

  const [criteria, setCriteria] = useState(activeAssessment?.rubricCriteria || []);
  const [mentorOverallFeedback, setMentorOverallFeedback] = useState(activeAssessment?.overallFeedback || '');
  const [finalDecision, setFinalDecision] = useState(activeAssessment?.finalResult || 'passed');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessSubmitted, setIsSuccessSubmitted] = useState(false);

  const handleUpdateCriterionStatus = (critId, newStatus) => {
    setCriteria(criteria.map(c => c.id === critId ? { ...c, status: newStatus } : c));
  };

  const handleUpdateCriterionNotes = (critId, notes) => {
    setCriteria(criteria.map(c => c.id === critId ? { ...c, mentorNotes: notes } : c));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccessSubmitted(true);
      if (onSubmitAssessmentSignoff) {
        onSubmitAssessmentSignoff(activeAssessment.id, {
          criteria,
          mentorOverallFeedback,
          finalDecision,
          issuedCertificateId: activeAssessment.issuedCertificateId || 'CERT-ELEC-2026-9082'
        });
      }
    }, 900);
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display flex items-center gap-2">
            <span>Practical Mentor Assessment Rubrics</span>
            <span className="text-blue-600 text-lg">🛡️</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Structured field rubrics for evaluating hands-on trade skills, safety compliance, and issuing verified credentials.
          </p>
        </div>

        {/* Assessment Switcher Pills */}
        <div className="flex items-center gap-2">
          {assessments.map((asm) => (
            <button
              key={asm.id}
              type="button"
              onClick={() => {
                setSelectedAssessmentId(asm.id);
                setCriteria(asm.rubricCriteria || []);
                setMentorOverallFeedback(asm.overallFeedback || '');
                setFinalDecision(asm.finalResult || 'passed');
                setIsSuccessSubmitted(false);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedAssessmentId === asm.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {asm.skillName.split('&')[0].trim()}
            </button>
          ))}
        </div>
      </div>

      {/* Main Assessment Evaluation Rubric Canvas */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-blue-100 shadow-sm space-y-6">
        
        {/* Assessment Overview Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50 via-white to-teal-50 border border-blue-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-blue-100 text-blue-700 border border-blue-200">
                {activeAssessment.category} Standard
              </span>
              <span className="text-xs text-slate-500 font-mono font-bold">
                REF: {activeAssessment.id}
              </span>
            </div>
            <h2 className="text-lg font-black text-slate-900">{activeAssessment.skillName}</h2>
            <div className="flex items-center gap-4 text-xs text-slate-600">
              <span>Learner: <strong>{activeAssessment.learnerName} ({activeAssessment.learnerId})</strong></span>
              <span>•</span>
              <span>Assessor: <strong>{activeAssessment.mentorName}</strong></span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {activeAssessment.finalResult === 'passed' && (
              <button
                type="button"
                onClick={() => onOpenCertificate && onOpenCertificate({
                  title: activeAssessment.skillName,
                  certificateId: activeAssessment.issuedCertificateId,
                  assessor: activeAssessment.mentorName,
                  score: 96,
                  date: activeAssessment.assessmentDate || 'Oct 03, 2026'
                })}
                className="px-4 py-2.5 rounded-xl text-xs font-black bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 transition-all flex items-center gap-1.5 cursor-pointer font-bold"
              >
                <Award className="w-4 h-4" />
                <span>View Official Certificate</span>
              </button>
            )}
          </div>
        </div>

        {/* Prerequisites Checklist Card */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <CheckSquare className="w-3.5 h-3.5 text-teal-600" /> Prerequisite Learning Verification:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
            {activeAssessment.completedPrerequisites?.map((prereq, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center gap-2 text-slate-700 text-[11px] shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{prereq}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Structured Assessment Rubric Criteria Table / Cards */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              Evaluation Criteria Rubric ({criteria.length} Areas)
            </h3>
            <span className="text-xs text-slate-500">Status & Field Observations</span>
          </div>

          <div className="space-y-3">
            {criteria.map((crit, idx) => (
              <div 
                key={crit.id || idx}
                className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span>{crit.title}</span>
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-snug pl-7">
                      {crit.description}
                    </p>
                  </div>

                  {/* Rubric Status Switcher */}
                  <div className="flex items-center gap-1.5 self-end sm:self-auto pl-7 sm:pl-0">
                    {[
                      { id: 'not_assessed', label: 'Not Assessed', color: 'bg-slate-200 text-slate-600' },
                      { id: 'needs_practice', label: 'Needs Practice', color: 'bg-amber-100 text-amber-800 border-amber-300' },
                      { id: 'meets_requirements', label: 'Meets Requirements ✓', color: 'bg-emerald-600 text-white shadow-xs' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleUpdateCriterionStatus(crit.id, opt.id)}
                        className={`px-3 py-1 rounded-xl text-[11px] font-bold border transition-all cursor-pointer ${
                          crit.status === opt.id
                            ? opt.color
                            : 'bg-white text-slate-500 border-slate-200 hover:text-slate-800'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Assessor Observation Field Notes */}
                <div className="pl-7 pt-1">
                  <input
                    type="text"
                    value={crit.mentorNotes || ''}
                    onChange={(e) => handleUpdateCriterionNotes(crit.id, e.target.value)}
                    placeholder="Assessor observation (e.g. demonstrated clean ferrule crimping and correct torque)..."
                    className="w-full px-3 py-1.5 bg-white rounded-xl text-[11px] text-slate-800 placeholder:text-slate-400 border border-slate-200 focus:border-blue-500 outline-hidden"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Overall Feedback & Final Sign-off Section */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 text-xs">
          <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
            Assessor Final Decision & Recommendations:
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'passed', label: 'Pass & Grant Competency Credential', icon: ThumbsUp, color: 'border-emerald-400 bg-emerald-50 text-emerald-800' },
              { id: 'needs_practice', label: 'Needs More Practice Sessions', icon: AlertTriangle, color: 'border-amber-400 bg-amber-50 text-amber-800' },
              { id: 'additional_training', label: 'Recommend Additional Coursework', icon: Clock, color: 'border-blue-400 bg-blue-50 text-blue-800' }
            ].map((dec) => {
              const Icon = dec.icon;
              return (
                <button
                  key={dec.id}
                  type="button"
                  onClick={() => setFinalDecision(dec.id)}
                  className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 font-bold transition-all cursor-pointer ${
                    finalDecision === dec.id
                      ? `${dec.color} ring-2 ring-emerald-500/20 shadow-xs`
                      : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="text-[11px]">{dec.label}</span>
                </button>
              );
            })}
          </div>

          <div>
            <label className="block text-slate-600 font-bold mb-1">Assessor Overall Qualitative Feedback:</label>
            <textarea
              rows={3}
              value={mentorOverallFeedback}
              onChange={(e) => setMentorOverallFeedback(e.target.value)}
              placeholder="Provide constructive feedback on technical strengths, safety discipline, and next career milestones..."
              className="w-full p-3 bg-white rounded-xl text-slate-800 border border-slate-200 focus:border-blue-500 outline-hidden leading-relaxed"
            />
          </div>

          {isSuccessSubmitted && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-center space-y-1 animate-in zoom-in-95">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
              <div className="text-xs font-bold text-slate-900">Assessment Rubric Signed & Verified!</div>
              <p className="text-[11px] text-slate-600">
                Official digital competency credential <strong>{activeAssessment.issuedCertificateId}</strong> has been generated and linked to worker dispatch profile.
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Assessor: <strong>{activeAssessment.mentorName} (Certified NSDC Assessor)</strong>
          </span>

          <button
            type="button"
            disabled={isSubmitting || isSuccessSubmitted}
            onClick={handleSubmit}
            className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
              !isSuccessSubmitted && !isSubmitting
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20'
                : 'bg-slate-200 text-slate-500 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <span>Recording Sign-off...</span>
            ) : isSuccessSubmitted ? (
              <span>Rubric Verified ✓</span>
            ) : (
              <>
                <span>Sign & Issue Competency Credential</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
}
