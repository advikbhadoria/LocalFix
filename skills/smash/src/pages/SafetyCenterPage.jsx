import React, { useState } from 'react';
import { 
  ShieldAlert, 
  PhoneCall, 
  MapPin, 
  Users, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Plus, 
  ShieldCheck, 
  Lock,
  Flame,
  Clock
} from 'lucide-react';

export default function SafetyCenterPage({
  workerProfile,
  onOpenSos
}) {
  const [contacts, setContacts] = useState(workerProfile.emergencyContacts || []);
  const [newContactName, setNewContactName] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [newContactRelation, setNewContactRelation] = useState('Family');
  const [isAddingContact, setIsAddingContact] = useState(false);

  const [incidentDescription, setIncidentDescription] = useState('');
  const [incidentSubmitted, setIncidentSubmitted] = useState(false);

  const handleAddContact = (e) => {
    e.preventDefault();
    if (!newContactName || !newContactPhone) return;

    setContacts([
      ...contacts,
      {
        id: `ec-${Date.now()}`,
        name: newContactName,
        phone: newContactPhone,
        relation: newContactRelation
      }
    ]);
    setNewContactName('');
    setNewContactPhone('');
    setIsAddingContact(false);
  };

  const handleReportIncident = (e) => {
    e.preventDefault();
    if (!incidentDescription.trim()) return;
    setIncidentSubmitted(true);
    setTimeout(() => {
      setIncidentDescription('');
      setIncidentSubmitted(false);
      alert('Safety incident ticket dispatched to Safety Rapid Response team.');
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display">
          Worker Safety & SOS Command Center
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          24/7 Rapid security response, live GPS location beaconing, and emergency contact broadcast.
        </p>
      </div>

      {/* Emergency Distress Hero Card */}
      <div className="bg-gradient-to-r from-rose-600 via-rose-500 to-red-700 p-6 sm:p-8 rounded-3xl text-white shadow-xl shadow-rose-600/15 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-white/20 text-white border border-white/30 animate-sos backdrop-blur-xs">
            <ShieldAlert className="w-3.5 h-3.5" />
            24x7 Safety Rapid Response Desk Active
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-display">
            Need Immediate Help on Ground?
          </h2>
          <p className="text-xs sm:text-sm text-rose-100 leading-relaxed">
            Pressing the Emergency SOS button initiates a 5-second countdown and broadcasts your live simulated GPS position directly to local police (112) and the PocketHelp Emergency Response team.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenSos}
          className="px-8 py-5 rounded-2xl text-base font-black bg-white hover:bg-slate-50 text-rose-600 shadow-xl shadow-rose-950/20 transition-all flex items-center justify-center gap-3 transform hover:scale-105 active:scale-95 cursor-pointer flex-shrink-0 font-display"
        >
          <ShieldAlert className="w-6 h-6 stroke-[3]" />
          <span>TRIGGER SOS EMERGENCY</span>
        </button>
      </div>

      {/* Emergency Contacts & Direct Hotlines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left: Emergency Contacts Manager */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-display">Designated Emergency Contacts</h3>
              <p className="text-xs text-slate-500">Notified via SMS with live tracking upon SOS</p>
            </div>
            <button
              type="button"
              onClick={() => setIsAddingContact(!isAddingContact)}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Contact</span>
            </button>
          </div>

          {/* Add form */}
          {isAddingContact && (
            <form onSubmit={handleAddContact} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs">
              <h4 className="font-bold text-slate-900">Add Emergency Contact</h4>
              <div>
                <label className="block text-slate-600 mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Sharma"
                  value={newContactName}
                  onChange={(e) => setNewContactName(e.target.value)}
                  className="w-full p-2 bg-white rounded-xl text-slate-900 border border-slate-200 outline-hidden focus:border-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-600 mb-1">Phone Number</label>
                  <input
                    type="text"
                    placeholder="+91 XXXXX XXXXX"
                    value={newContactPhone}
                    onChange={(e) => setNewContactPhone(e.target.value)}
                    className="w-full p-2 bg-white rounded-xl text-slate-900 border border-slate-200 outline-hidden focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 mb-1">Relationship</label>
                  <select
                    value={newContactRelation}
                    onChange={(e) => setNewContactRelation(e.target.value)}
                    className="w-full p-2 bg-white rounded-xl text-slate-900 border border-slate-200 outline-hidden focus:border-blue-500"
                  >
                    <option value="Family">Family</option>
                    <option value="Friend">Friend</option>
                    <option value="Colleague">Colleague</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2 pt-1">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold cursor-pointer hover:bg-blue-700"
                >
                  Save Contact
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingContact(false)}
                  className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 font-bold cursor-pointer hover:bg-slate-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Contacts List */}
          <div className="space-y-2.5">
            {contacts.map((c) => (
              <div
                key={c.id}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-200">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{c.name}</h4>
                    <span className="text-[11px] text-slate-500 font-mono">{c.phone} • {c.relation}</span>
                  </div>
                </div>

                <a
                  href={`tel:${c.phone}`}
                  className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors"
                  title="Direct Dial"
                >
                  <PhoneCall className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Golden Safety Guidelines & Incident Reporting */}
        <div className="space-y-6">
          
          {/* 10 Golden Safety Rules */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 font-display">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              Field Safety Guidelines
            </h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">1.</span>
                <span>Always check main circuit breakers with an insulated tester before touching bare wires.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">2.</span>
                <span>Wear certified anti-static rubber gloves and safety goggles during high-voltage work.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">3.</span>
                <span>If a customer acts suspiciously or creates an unsafe work environment, exit and trigger SOS.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">4.</span>
                <span>Never accept direct offline cash bypassing the PocketHelp safety platform escrow.</span>
              </li>
            </ul>
          </div>

          {/* Incident Report Form */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 font-display">
              <FileText className="w-4 h-4 text-blue-600" />
              Report Ground Incident / Hazmat Hazard
            </h3>
            <form onSubmit={handleReportIncident} className="space-y-2 text-xs">
              <textarea
                rows={2}
                value={incidentDescription}
                onChange={(e) => setIncidentDescription(e.target.value)}
                placeholder="Describe any safety hazard, aggressive pets, or building structural risk..."
                className="w-full p-3 bg-slate-50 rounded-xl text-slate-900 placeholder:text-slate-400 border border-slate-200 outline-hidden focus:border-blue-500 focus:bg-white"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
              >
                Submit Safety Log
              </button>
            </form>
          </div>

        </div>

      </div>

    </div>
  );
}
