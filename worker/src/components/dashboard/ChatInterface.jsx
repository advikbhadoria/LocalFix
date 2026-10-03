import { useState, useRef, useEffect } from 'react';
import { Send, Phone, Lock, X } from 'lucide-react';

export default function ChatInterface({ chat, activeJob, onSend, onClose }) {
  const [input, setInput]   = useState('');
  const [calling, setCalling] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    onSend(text);
    setInput('');
  };

  const handleCall = () => {
    setCalling(true);
    setTimeout(() => setCalling(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-blue-950/60 backdrop-blur-sm p-0 sm:p-4 animate-fadeIn">
      <div className="bg-white w-full sm:max-w-sm sm:rounded-2xl flex flex-col shadow-2xl" style={{ height: '100dvh', maxHeight: '600px' }}>
        {/* Header */}
        <div className="bg-blue-700 px-4 py-3 sm:rounded-t-2xl flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0">
            {activeJob?.customer?.name?.[0] || 'C'}
          </div>
          <div className="flex-1">
            <p className="text-white font-semibold text-sm">{activeJob?.customer?.name || 'Customer'}</p>
            <p className="text-blue-200 text-xs flex items-center gap-1">
              <Lock size={10} /> Number protected
            </p>
          </div>
          <button onClick={handleCall} className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
            <Phone size={14} className="text-white" />
          </button>
          <button onClick={onClose} className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
            <X size={14} className="text-white" />
          </button>
        </div>

        {/* Call simulation */}
        {calling && (
          <div className="bg-green-50 border-b border-green-200 px-4 py-2 text-center animate-fadeIn">
            <p className="text-green-700 text-xs font-semibold">📞 Simulated call in progress... (number masked)</p>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-blue-50/30">
          {chat.map(msg => (
            <div key={msg.id} className={`flex ${msg.sender === 'worker' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[78%] rounded-2xl px-3 py-2 text-sm ${
                  msg.sender === 'worker'
                    ? 'bg-blue-700 text-white rounded-br-sm'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-bl-sm shadow-sm'
                }`}
              >
                <p>{msg.text}</p>
                <p className={`text-[10px] mt-0.5 text-right ${msg.sender === 'worker' ? 'text-blue-200' : 'text-slate-400'}`}>{msg.time}</p>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Privacy badge */}
        <div className="bg-blue-50 border-t border-blue-100 px-4 py-1.5 flex items-center justify-center gap-1.5">
          <Lock size={10} className="text-blue-400" />
          <span className="text-blue-500 text-[10px]">Your personal number is protected</span>
        </div>

        {/* Input */}
        <div className="p-3 border-t border-slate-200 flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            className="flex-1 bg-slate-100 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-10 h-10 bg-blue-700 rounded-xl flex items-center justify-center text-white hover:bg-blue-800 transition-colors disabled:opacity-40"
          >
            <Send size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
