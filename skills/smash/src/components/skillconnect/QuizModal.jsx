import React, { useState } from 'react';
import { 
  X, 
  Award, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ArrowRight, 
  RotateCcw, 
  Sparkles, 
  ShieldCheck
} from 'lucide-react';

export default function QuizModal({
  quiz,
  onClose,
  onQuizCompleted
}) {
  if (!quiz) return null;

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const questions = quiz.questions || [];
  const currentQuestion = questions[currentQuestionIndex] || questions[0];

  const handleSelectOption = (questionId, optionIndex) => {
    if (isSubmitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: optionIndex
    });
  };

  const handleCalculateScore = () => {
    let correctCount = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });
    const percentage = Math.round((correctCount / questions.length) * 100);
    return {
      correctCount,
      total: questions.length,
      percentage,
      passed: percentage >= (quiz.passingScorePercentage || 75)
    };
  };

  const handleSubmitQuiz = () => {
    setIsSubmitted(true);
    const result = handleCalculateScore();
    if (onQuizCompleted) {
      onQuizCompleted(quiz.id, result);
    }
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentQuestionIndex(0);
  };

  const scoreResult = isSubmitted ? handleCalculateScore() : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900">
                {quiz.title}
              </h2>
              <p className="text-xs text-slate-500">
                Passing Requirement: {quiz.passingScorePercentage || 80}% Correct Answers
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

        {/* Question Stepper / Progress Bar */}
        <div className="px-6 py-2.5 bg-blue-50/40 border-b border-blue-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            {questions.map((q, idx) => (
              <button
                key={q.id}
                type="button"
                onClick={() => setCurrentQuestionIndex(idx)}
                className={`w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  currentQuestionIndex === idx
                    ? 'bg-blue-600 text-white shadow-xs'
                    : selectedAnswers[q.id] !== undefined
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          <span className="text-slate-500 text-[11px] font-semibold">
            Answered {Object.keys(selectedAnswers).length} of {questions.length}
          </span>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6 text-xs bg-white">
          
          {/* If Result Screen */}
          {isSubmitted && scoreResult && (
            <div className="text-center py-4 space-y-4 animate-in zoom-in-95 duration-300">
              <div className={`w-16 h-16 rounded-3xl mx-auto flex items-center justify-center ring-8 ${
                scoreResult.passed 
                  ? 'bg-emerald-100 text-emerald-600 ring-emerald-50' 
                  : 'bg-rose-100 text-rose-600 ring-rose-50'
              }`}>
                {scoreResult.passed ? <CheckCircle2 className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
              </div>

              <div>
                <h3 className="text-xl font-black text-slate-900">
                  {scoreResult.passed ? '🎉 Knowledge Check Passed!' : 'Need More Practice'}
                </h3>
                <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">
                  {scoreResult.passed 
                    ? `You scored ${scoreResult.percentage}% (${scoreResult.correctCount}/${scoreResult.total}). This milestone is saved to your learning progress.`
                    : `You scored ${scoreResult.percentage}% (${scoreResult.correctCount}/${scoreResult.total}). Review the explanations below and retry when ready.`}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 max-w-sm mx-auto flex justify-around text-center">
                <div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase">Your Score</div>
                  <div className={`text-lg font-black ${scoreResult.passed ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {scoreResult.percentage}%
                  </div>
                </div>
                <div className="w-px bg-slate-200"></div>
                <div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase">Pass Requirement</div>
                  <div className="text-lg font-black text-slate-900">{quiz.passingScorePercentage || 80}%</div>
                </div>
              </div>
            </div>
          )}

          {/* Question Card */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-blue-100 text-blue-700 border border-blue-200">
                Q{currentQuestionIndex + 1}
              </span>
              <h3 className="text-sm font-bold text-slate-900 leading-snug flex-1">
                {currentQuestion.question}
              </h3>
            </div>

            {/* Options List */}
            <div className="space-y-2.5 pt-2">
              {currentQuestion.options.map((opt, optIdx) => {
                const isSelected = selectedAnswers[currentQuestion.id] === optIdx;
                const isCorrect = currentQuestion.correctIndex === optIdx;

                let optionStyles = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100';

                if (isSubmitted) {
                  if (isCorrect) {
                    optionStyles = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                  } else if (isSelected && !isCorrect) {
                    optionStyles = 'bg-rose-50 border-rose-400 text-rose-900';
                  }
                } else if (isSelected) {
                  optionStyles = 'bg-blue-50 border-blue-500 text-blue-900 font-bold shadow-xs';
                }

                return (
                  <button
                    key={optIdx}
                    type="button"
                    disabled={isSubmitted}
                    onClick={() => handleSelectOption(currentQuestion.id, optIdx)}
                    className={`w-full text-left p-3.5 rounded-2xl border text-xs transition-all flex items-center justify-between cursor-pointer ${optionStyles}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>{opt}</span>
                    </div>

                    {isSubmitted && isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    )}
                    {isSubmitted && isSelected && !isCorrect && (
                      <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation box after submission */}
            {isSubmitted && (
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-1.5 animate-in fade-in">
                <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5 text-blue-600" /> Technical Explanation:
                </span>
                <p className="text-slate-700 text-[11px] leading-relaxed">
                  {currentQuestion.explanation}
                </p>
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          {isSubmitted ? (
            <button
              type="button"
              onClick={handleRetry}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" /> Retry Quiz
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
              disabled={currentQuestionIndex === 0}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                currentQuestionIndex === 0 ? 'text-slate-400' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              Previous
            </button>
          )}

          <div className="flex items-center gap-2">
            {!isSubmitted ? (
              currentQuestionIndex < questions.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                  className="px-5 py-2.5 rounded-xl text-xs font-black bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  Next <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  disabled={Object.keys(selectedAnswers).length < questions.length}
                  onClick={handleSubmitQuiz}
                  className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                    Object.keys(selectedAnswers).length === questions.length
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <span>Submit Answers</span>
                  <Sparkles className="w-4 h-4" />
                </button>
              )
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl text-xs font-black bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all cursor-pointer"
              >
                Done
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
