import React, { useState } from 'react';
import { Phone, X, Star, ShieldCheck, CheckCircle2, Calendar, IndianRupee, Lock, MessageCircle } from 'lucide-react';

export default function RequestsView({ requests, cancelRequest, updateRequestReview, completeRequest }) {
  const [view, setView] = useState('active'); // 'active' or 'completed'
  const [reviewModal, setReviewModal] = useState(null); // holds request id
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  const REVIEW_TAGS = ['Punctual', 'Clean Work', 'Polite', 'Fair Price'];

  const activeRequests = requests.filter(r => r.status === 'active');
  const completedRequests = requests.filter(r => r.status === 'completed').sort((a,b) => new Date(b.date) - new Date(a.date));

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const submitReview = () => {
    updateRequestReview(reviewModal, { stars: rating, comment: reviewText, tags: selectedTags });
    setReviewModal(null);
    setRating(5);
    setReviewText('');
    setSelectedTags([]);
  };

  const formatDate = (isoString) => {
    const d = new Date(isoString);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="space-y-6 relative">
      {/* Tabs */}
      <div className="flex p-1 bg-slate-200/60 rounded-xl max-w-sm mx-auto mb-6">
        <button 
          onClick={() => setView('active')}
          className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${view === 'active' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Active ({activeRequests.length})
        </button>
        <button 
          onClick={() => setView('completed')}
          className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${view === 'completed' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Completed ({completedRequests.length})
        </button>
      </div>

      {view === 'active' && (
        <div className="space-y-4">
          {activeRequests.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
              <div className="text-slate-400 mb-2">No active requests right now.</div>
            </div>
          ) : (
            activeRequests.map(req => (
              <div key={req.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-blue-600"></div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full mb-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span> {req.eta}
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 leading-tight">
                        {req.type} - {req.subType}
                        {req.workerCount > 1 && (
                          <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full ml-2 align-middle">
                            {req.workerCount} Workers
                          </span>
                        )}
                      </h3>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-slate-900">₹{req.price}</div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 font-bold">
                        {req.worker.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm flex items-center gap-1">
                          {req.worker.name} <ShieldCheck className="w-3 h-3 text-blue-600" />
                        </div>
                        <div className="text-xs text-slate-500">{req.worker.phone}</div>
                      </div>
                    </div>

                    <div className="bg-slate-900 text-emerald-400 px-5 py-3 rounded-xl border-2 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.3)] min-w-[120px] relative overflow-hidden flex flex-col items-center justify-center animate-[pulse_3s_ease-in-out_infinite]">
                      <div className="absolute top-0 right-0 p-1 opacity-10 text-emerald-400"><Lock className="w-8 h-8" /></div>
                      <span className="text-[9px] uppercase font-bold text-emerald-500/70 tracking-[0.2em] mb-1 flex items-center gap-1 z-10"><ShieldCheck className="w-3 h-3" /> SECURE PIN</span>
                      <span className="text-2xl font-mono font-black tracking-[0.25em] z-10 drop-shadow-[0_0_5px_rgba(52,211,153,0.8)]">{req.pin}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={() => completeRequest(req.id)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-5 h-5" /> Mark Job as Completed
                    </button>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button onClick={() => alert('Chat interface opening...')} className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-800 font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm cursor-pointer">
                        <MessageCircle className="w-4 h-4" /> Chat
                      </button>
                      <a href={`tel:${req.worker.phone}`} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm">
                        <Phone className="w-4 h-4" /> {req.worker.phone}
                      </a>
                      <button 
                        onClick={() => cancelRequest(req.id)}
                        className="flex-1 border border-red-200 text-red-600 hover:bg-red-50 font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm cursor-pointer"
                      >
                        <X className="w-4 h-4" /> Cancel Request
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {view === 'completed' && (
        <div className="space-y-4">
          {completedRequests.map(req => (
            <div key={req.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-slate-900">{req.subType}</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                    <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {formatDate(req.date)}</span>
                    <span>•</span>
                    <span>{req.worker.name}</span>
                  </div>
                </div>
                <div className="font-bold text-slate-900 flex items-center">
                  ₹{req.price}
                </div>
              </div>

              {req.review ? (
                <div className="bg-slate-50 p-3 rounded-lg mt-3 border border-slate-100">
                  <div className="flex items-center gap-1 mb-1">
                    {[1,2,3,4,5].map(star => (
                      <Star key={star} className={`w-3.5 h-3.5 ${star <= req.review.stars ? 'text-amber-500 fill-current' : 'text-slate-300'}`} />
                    ))}
                  </div>
                  {req.review.comment && <p className="text-sm text-slate-600 mt-1">"{req.review.comment}"</p>}
                  {req.review.tags && req.review.tags.length > 0 && (
                    <div className="flex gap-1.5 mt-2 flex-wrap">
                      {req.review.tags.map(tag => (
                        <span key={tag} className="text-[10px] bg-white border border-slate-200 text-slate-500 px-1.5 py-0.5 rounded font-medium">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <button 
                  onClick={() => setReviewModal(req.id)}
                  className="mt-3 w-full border border-blue-600 text-blue-600 font-bold text-sm py-2 rounded-lg hover:bg-blue-50 transition-colors flex justify-center items-center gap-1"
                >
                  <Star className="w-4 h-4" /> Rate & Review
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Review Modal */}
      {reviewModal && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-slate-900">Rate Your Service</h3>
              <button onClick={() => setReviewModal(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex justify-center gap-2 mb-6">
              {[1,2,3,4,5].map(star => (
                <button key={star} onClick={() => setRating(star)} className="focus:outline-none hover:scale-110 transition-transform">
                  <Star className={`w-10 h-10 ${star <= rating ? 'text-amber-500 fill-current' : 'text-slate-200'}`} />
                </button>
              ))}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-slate-700 mb-2">What went well?</label>
              <div className="flex flex-wrap gap-2">
                {REVIEW_TAGS.map(tag => (
                  <button 
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                      selectedTags.includes(tag) 
                        ? 'bg-blue-100 border-blue-200 text-blue-700 font-bold' 
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold text-slate-700 mb-2">Any additional feedback?</label>
              <textarea 
                className="w-full border border-slate-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                rows={3}
                placeholder="Share your experience..."
                value={reviewText}
                onChange={e => setReviewText(e.target.value)}
              />
            </div>

            <button 
              onClick={submitReview}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors"
            >
              Submit Review
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
