import React, { useState } from 'react';
import { 
  MessageSquare, 
  Search, 
  Phone, 
  Send, 
  Paperclip, 
  Image, 
  Check, 
  CheckCheck, 
  Lock, 
  User, 
  Zap, 
  Clock,
  Sparkles
} from 'lucide-react';

export default function MessagesPage({
  chats = [],
  onSendMessage,
  onOpenCall
}) {
  const [selectedChatId, setSelectedChatId] = useState(chats[0]?.id || 'chat-1');
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const activeChat = chats.find(c => c.id === selectedChatId) || chats[0];

  const QUICK_REPLIES = [
    "I am on my way (ETA 8 mins) 🚗",
    "Arrived at society security gate 🏢",
    "Taking the elevator up now 🚪",
    "Please share the 4-digit PIN when ready 🔒",
    "Inspecting main breaker box right now ⚡"
  ];

  const handleSend = (textToSend) => {
    const message = textToSend || inputText;
    if (!message.trim() || !activeChat) return;

    onSendMessage(activeChat.id, message.trim());
    setInputText('');
  };

  const filteredChats = chats.filter(c => 
    c.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display">
          Customer Communications
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          End-to-end encrypted messaging with customers assigned to your active service dispatches.
        </p>
      </div>

      {/* Split Chat Box */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-3 min-h-[580px]">
        
        {/* Left Col: Conversations List */}
        <div className="border-r border-slate-200 p-4 space-y-3 flex flex-col justify-between bg-slate-50/50">
          <div className="space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search active chats..."
                className="w-full pl-9 pr-3 py-2 bg-white rounded-xl text-xs text-slate-900 placeholder:text-slate-400 border border-slate-200 outline-hidden focus:border-blue-500"
              />
            </div>

            <div className="space-y-1.5 overflow-y-auto max-h-[460px] custom-scrollbar">
              {filteredChats.map((c) => {
                const isSelected = c.id === selectedChatId;
                const lastMsg = c.messages[c.messages.length - 1];
                return (
                  <div
                    key={c.id}
                    onClick={() => setSelectedChatId(c.id)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                      isSelected
                        ? 'bg-blue-50 border-blue-400 text-slate-900 shadow-xs'
                        : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="relative flex-shrink-0">
                      <img
                        src={c.customerAvatar}
                        alt={c.customerName}
                        className="w-11 h-11 rounded-xl object-cover ring-1 ring-slate-200"
                      />
                      {c.onlineStatus === 'online' && (
                        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white"></span>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-900 truncate">{c.customerName}</h4>
                        <span className="text-[10px] text-slate-400">{c.lastMessageTime}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">
                        {lastMsg ? lastMsg.text : c.jobTitle}
                      </p>
                    </div>

                    {c.unreadCount > 0 && (
                      <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-black flex items-center justify-center flex-shrink-0">
                        {c.unreadCount}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-2 bg-white rounded-xl border border-slate-200 text-[11px] text-slate-500 flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
            <span>Chat history retained for 30 days.</span>
          </div>
        </div>

        {/* Right 2 Cols: Active Chat Window */}
        {activeChat ? (
          <div className="md:col-span-2 flex flex-col justify-between bg-white">
            
            {/* Chat Top Header */}
            <div className="p-4 px-6 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={activeChat.customerAvatar}
                  alt={activeChat.customerName}
                  className="w-10 h-10 rounded-xl object-cover ring-2 ring-blue-500/20"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900">{activeChat.customerName}</h3>
                    <span className="text-[10px] text-emerald-600 font-semibold">● Online</span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-mono">Job: {activeChat.jobTitle}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onOpenCall(activeChat.customerName, '+91 98234 XXXXX', activeChat.jobTitle)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>Masked Call</span>
              </button>
            </div>

            {/* Messages Thread */}
            <div className="p-6 overflow-y-auto space-y-4 max-h-[380px] custom-scrollbar bg-slate-50/30">
              {activeChat.messages.map((m) => {
                const isMe = m.sender === 'worker';
                return (
                  <div
                    key={m.id}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed shadow-xs ${
                      isMe 
                        ? 'bg-blue-600 text-white rounded-br-xs' 
                        : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs'
                    }`}>
                      {m.text}
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                      {m.time}
                      {isMe && <CheckCheck className="w-3 h-3 text-blue-600" />}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Quick Reply Chips & Message Input */}
            <div className="p-4 bg-white border-t border-slate-200 space-y-3">
              {/* Quick response chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
                {QUICK_REPLIES.map((qr, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSend(qr)}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 whitespace-nowrap transition-colors cursor-pointer"
                  >
                    {qr}
                  </button>
                ))}
              </div>

              {/* Input row */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type a message to customer..."
                  className="flex-1 px-4 py-3 bg-slate-50 rounded-2xl text-xs text-slate-900 placeholder:text-slate-400 border border-slate-200 focus:border-blue-500 focus:bg-white outline-hidden"
                />

                <button
                  type="submit"
                  className="p-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

          </div>
        ) : (
          <div className="md:col-span-2 flex items-center justify-center p-12 text-slate-400 text-xs">
            Select a conversation from the left pane to view message history.
          </div>
        )}

      </div>

    </div>
  );
}
