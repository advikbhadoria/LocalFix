import React, { useState } from 'react';
import { 
  X, 
  CheckSquare, 
  Square, 
  Upload, 
  Image as ImageIcon, 
  FileText, 
  ShieldAlert, 
  Send, 
  CheckCircle2, 
  MessageSquare,
  Sparkles,
  AlertCircle,
  Eye
} from 'lucide-react';

export default function PracticalChecklistModal({
  checklist,
  onClose,
  onSubmitChecklistForReview
}) {
  if (!checklist) return null;

  const [tasks, setTasks] = useState(checklist.tasks || []);
  const [activeTaskNoteIndex, setActiveTaskNoteIndex] = useState(null);
  const [taskNotes, setTaskNotes] = useState(
    tasks.reduce((acc, t, idx) => ({ ...acc, [idx]: t.learnerNotes || '' }), {})
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  const handleToggleTask = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const handleSimulateEvidenceUpload = (index) => {
    const updated = [...tasks];
    updated[index].evidenceUploaded = true;
    updated[index].evidenceName = `field_evidence_task_${index + 1}.jpg`;
    setTasks(updated);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFeedbackSent(true);
      if (onSubmitChecklistForReview) {
        onSubmitChecklistForReview(checklist.id, tasks);
      }
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200">
              <CheckSquare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900">
                Practical Skill Checklist
              </h2>
              <p className="text-xs text-slate-500">
                {checklist.title} • Mentor: {checklist.mentorName}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress & Safety Bar */}
        <div className="px-6 py-3 bg-blue-50/50 border-b border-blue-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <span className="font-bold text-slate-800">Tasks Completed: {completedCount}/{tasks.length}</span>
            <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-blue-600 font-extrabold">{progressPercent}%</span>
          </div>

          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-600" /> {checklist.riskLevel || 'Standard Safety'}
          </span>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-5 text-xs bg-white">
          
          {/* Safety Notice Banner */}
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900">Practical Evidence Requirement:</span>
              <p className="text-slate-600 text-[11px] mt-0.5">
                For high-risk competencies, checklist self-completion alone does not grant independent certification. You must upload verified photo evidence and complete the supervised hands-on assessment.
              </p>
            </div>
          </div>

          {/* Checklist Tasks List */}
          <div className="space-y-3">
            {tasks.map((task, idx) => (
              <div 
                key={task.id || idx}
                className={`p-4 rounded-2xl border transition-all ${
                  task.completed 
                    ? 'bg-blue-50/50 border-blue-300' 
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div 
                    onClick={() => handleToggleTask(idx)}
                    className="flex items-start gap-3 cursor-pointer flex-1"
                  >
                    <div className="mt-0.5 flex-shrink-0">
                      {task.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-blue-600" />
                      ) : (
                        <Square className="w-5 h-5 text-slate-400 hover:text-slate-600" />
                      )}
                    </div>
                    <div>
                      <h4 className={`text-xs font-bold leading-snug ${task.completed ? 'text-slate-900 line-through opacity-70' : 'text-slate-800'}`}>
                        {task.label}
                      </h4>
                      {task.learnerNotes && (
                        <p className="text-[11px] text-blue-700 mt-1 italic">
                          "{task.learnerNotes}"
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Evidence Upload Pill */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {task.evidenceUploaded ? (
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-blue-100 text-blue-700 border border-blue-200 flex items-center gap-1">
                        <ImageIcon className="w-3 h-3 text-blue-600" /> {task.evidenceName || 'Photo.jpg'}
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleSimulateEvidenceUpload(idx)}
                        className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
                      >
                        <Upload className="w-3 h-3 text-blue-600" /> Upload Photo
                      </button>
                    )}
                  </div>
                </div>

                {/* Inline Notes Field */}
                <div className="mt-3 pt-2.5 border-t border-slate-200 flex items-center gap-2">
                  <input
                    type="text"
                    value={taskNotes[idx] || ''}
                    onChange={(e) => setTaskNotes({ ...taskNotes, [idx]: e.target.value })}
                    placeholder="Add field reading or measurement notes..."
                    className="flex-1 bg-white px-3 py-1.5 rounded-xl text-[11px] text-slate-800 placeholder:text-slate-400 border border-slate-200 focus:border-blue-500 outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const updated = [...tasks];
                      updated[idx].learnerNotes = taskNotes[idx];
                      setTasks(updated);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[11px] font-bold text-slate-700 border border-slate-200 cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Mentor Feedback Box */}
          {checklist.mentorFeedback && (
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-1.5">
              <div className="flex items-center gap-2 text-blue-700 font-bold text-xs">
                <MessageSquare className="w-4 h-4 text-blue-600" />
                <span>Mentor Review Feedback from {checklist.mentorName}:</span>
              </div>
              <p className="text-slate-700 text-xs italic leading-relaxed">
                "{checklist.mentorFeedback}"
              </p>
            </div>
          )}

          {feedbackSent && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-1">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
              <div className="text-xs font-bold text-emerald-900">Checklist Submitted to Mentor!</div>
              <p className="text-[11px] text-emerald-700">
                Mentor {checklist.mentorName} will review your evidence and sign off in the assessment rubric.
              </p>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Close
          </button>

          <button
            type="button"
            disabled={isSubmitting || feedbackSent}
            onClick={handleSubmit}
            className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
              !feedbackSent && !isSubmitting
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <span>Submitting...</span>
            ) : feedbackSent ? (
              <span>Submitted for Review ✓</span>
            ) : (
              <>
                <span>Request Mentor Review</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
