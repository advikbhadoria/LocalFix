import React, { useState } from 'react';
import { 
  X, 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Share2, 
  MessageSquare, 
  Users, 
  Sparkles, 
  Send, 
  Hand, 
  PenTool, 
  Maximize2, 
  ShieldCheck
} from 'lucide-react';

export default function OnlineClassroomModal({
  session,
  onClose
}) {
  if (!session) return null;

  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [isWhiteboardActive, setIsWhiteboardActive] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: session.mentorName, text: "Welcome everyone! Please open your digital multimeter and set the range to True RMS AC voltage.", time: "10:30 AM" },
    { sender: "Pravin Kulkarni", text: "Ready sir, probe calibrated.", time: "10:31 AM" },
    { sender: "Jaya Kumari", text: "Ready on Phase B terminal.", time: "10:32 AM" }
  ]);
  const [inputMsg, setInputMsg] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    setChatMessages([
      ...chatMessages,
      { sender: "Jaya Kumari", text: inputMsg, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
    setInputMsg("");

    // Simulate mentor reply
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { sender: session.mentorName, text: "Great point Jaya! Notice how the neutral current drops as we balance Phase A and Phase C.", time: "Just now" }
      ]);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-6xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[90vh]">
        
        {/* Classroom Header */}
        <div className="px-6 py-3.5 border-b border-slate-200 flex items-center justify-between bg-slate-50/90">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-black text-slate-900">{session.topic}</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 border border-blue-200">
                  LIVE HD ROOM
                </span>
              </div>
              <p className="text-xs text-slate-500">Mentor: {session.mentorName} • ID: {session.bookingRef || session.id}</p>
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

        {/* Video Stage & Chat Split */}
        <div className="grid grid-cols-1 lg:grid-cols-4 flex-1 overflow-hidden">
          
          {/* Main Stage (Mentor Camera / Whiteboard) */}
          <div className="lg:col-span-3 bg-slate-900 flex flex-col justify-between p-4 overflow-hidden relative">
            
            {/* Stage Canvas */}
            <div className="relative w-full flex-1 rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 flex items-center justify-center">
              {isWhiteboardActive ? (
                /* Interactive Digital Whiteboard Simulator */
                <div className="w-full h-full bg-white p-6 flex flex-col justify-between text-left text-xs font-mono">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2 text-blue-700 font-bold">
                    <span className="flex items-center gap-2">
                      <PenTool className="w-4 h-4 text-blue-600" /> Live Interactive Schematic Whiteboard
                    </span>
                    <span className="text-[10px] text-slate-500">Collaborative Mode: Active</span>
                  </div>

                  <div className="my-auto space-y-4 text-slate-800">
                    <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900">
                      <strong>Phase Imbalance Calculation Formula:</strong>
                      <p className="text-[11px] text-slate-700 mt-1">
                        Max Deviation from Average = Max(|I_R - I_avg|, |I_Y - I_avg|, |I_B - I_avg|)
                        <br />
                        % Imbalance = (Max Deviation / I_avg) × 100%  [Target: &lt; 10%]
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 font-bold">
                        Phase R: 28.4 A
                      </div>
                      <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 font-bold">
                        Phase Y: 12.1 A
                      </div>
                      <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 font-bold">
                        Phase B: 31.0 A
                      </div>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-500 flex justify-between">
                    <span>Trainer cursor active</span>
                    <span>Click tools above to annotate</span>
                  </div>
                </div>
              ) : (
                /* Mentor HD Camera Video Stream */
                <div className="relative w-full h-full flex items-center justify-center bg-slate-900">
                  <img
                    src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&auto=format&fit=crop&q=80"
                    alt="Classroom"
                    className="w-full h-full object-cover filter brightness-90"
                  />
                  <div className="absolute top-4 left-4 p-2 rounded-xl bg-slate-900/80 border border-slate-700 backdrop-blur-md flex items-center gap-2.5">
                    <img
                      src={session.mentorAvatar}
                      alt={session.mentorName}
                      className="w-8 h-8 rounded-lg object-cover ring-1 ring-blue-400"
                    />
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1">
                        {session.mentorName}
                        <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                      </div>
                      <span className="text-[10px] text-emerald-400 font-mono">Presenting (1080p 60fps)</span>
                    </div>
                  </div>

                  {/* Picture-in-picture learner webcam */}
                  <div className="absolute bottom-4 right-4 w-36 sm:w-44 aspect-video rounded-2xl overflow-hidden border-2 border-blue-500 shadow-2xl bg-slate-950">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80"
                      alt="Jaya Kumari"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-1.5 left-2 px-1.5 py-0.5 rounded bg-slate-900/80 text-[10px] text-white font-bold">
                      You (Jaya)
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Stream Controls Bar */}
            <div className="pt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsMicOn(!isMicOn)}
                  className={`p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                    isMicOn ? 'bg-slate-800 text-white border-slate-700' : 'bg-rose-600 text-white border-rose-500'
                  }`}
                  title={isMicOn ? 'Mute Mic' : 'Unmute Mic'}
                >
                  {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                </button>

                <button
                  type="button"
                  onClick={() => setIsVideoOn(!isVideoOn)}
                  className={`p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                    isVideoOn ? 'bg-slate-800 text-white border-slate-700' : 'bg-rose-600 text-white border-rose-500'
                  }`}
                  title={isVideoOn ? 'Turn Off Camera' : 'Turn On Camera'}
                >
                  {isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                </button>

                <button
                  type="button"
                  onClick={() => setIsHandRaised(!isHandRaised)}
                  className={`p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                    isHandRaised ? 'bg-amber-600 text-white border-amber-500' : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}
                  title="Raise Hand to Ask Question"
                >
                  <Hand className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsWhiteboardActive(!isWhiteboardActive)}
                  className={`px-4 py-2.5 rounded-2xl border text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                    isWhiteboardActive ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-800 text-blue-300 border-blue-500/40 hover:bg-slate-750'
                  }`}
                >
                  <PenTool className="w-4 h-4" />
                  <span>{isWhiteboardActive ? 'Show Camera' : 'Open Whiteboard'}</span>
                </button>
              </div>

              <div>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-2xl text-xs font-black bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-600/30 transition-all cursor-pointer"
                >
                  Leave Room
                </button>
              </div>
            </div>

          </div>

          {/* Right Col: Live Chat & Attendee Roster */}
          <div className="bg-slate-50 border-l border-slate-200 flex flex-col justify-between h-full">
            
            {/* Header Tabs */}
            <div className="p-3 border-b border-slate-200 flex items-center justify-between text-xs font-bold">
              <span className="text-slate-900 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-blue-600" /> Live Peer Chat
              </span>
              <span className="px-2 py-0.5 rounded-md bg-slate-200 text-slate-700 text-[10px]">
                3 Participants
              </span>
            </div>

            {/* Chat Stream */}
            <div className="p-4 overflow-y-auto custom-scrollbar flex-1 space-y-3 text-xs">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`space-y-0.5 ${msg.sender === 'Jaya Kumari' ? 'text-right' : 'text-left'}`}>
                  <div className="text-[10px] text-slate-500 font-bold flex items-center gap-1.5 justify-start">
                    <span className={msg.sender === session.mentorName ? 'text-blue-700 font-black' : 'text-slate-700'}>
                      {msg.sender}
                    </span>
                    <span className="text-slate-400 text-[9px]">{msg.time}</span>
                  </div>
                  <div className={`p-2.5 rounded-2xl inline-block max-w-[85%] text-left text-xs ${
                    msg.sender === 'Jaya Kumari' 
                      ? 'bg-blue-600 text-white rounded-tr-xs shadow-xs' 
                      : 'bg-white text-slate-800 border border-slate-200 shadow-xs rounded-tl-xs'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-200 flex items-center gap-2 bg-white">
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder="Type question or reading..."
                className="flex-1 bg-slate-50 px-3 py-2 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 border border-slate-200 focus:border-blue-500 focus:bg-white outline-hidden"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>

        </div>

      </div>
    </div>
  );
}
