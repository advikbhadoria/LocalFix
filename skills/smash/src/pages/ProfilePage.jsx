import React, { useState } from 'react';
import { 
  UserCheck, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Award, 
  Wrench, 
  Check, 
  Star, 
  Clock, 
  Sliders, 
  Edit2,
  Save
} from 'lucide-react';

export default function ProfilePage({
  workerProfile,
  onUpdateProfile
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(workerProfile.name);
  const [phone, setPhone] = useState(workerProfile.phone);
  const [email, setEmail] = useState(workerProfile.email);
  const [serviceRadius, setServiceRadius] = useState(10);
  const [savedToast, setSavedToast] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    onUpdateProfile({
      ...workerProfile,
      name,
      phone,
      email,
      serviceRadius
    });
    setIsEditing(false);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display">
            Worker Profile & Verified Credentials
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage your public technician card, government licenses, and dispatch radius.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
        >
          {isEditing ? <Check className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
          <span>{isEditing ? 'Editing Mode' : 'Edit Profile'}</span>
        </button>
      </div>

      {savedToast && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" /> Profile credentials updated successfully!
        </div>
      )}

      {/* Main Profile Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        
        {/* Banner */}
        <div className="h-32 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 relative">
          <div className="absolute -bottom-10 left-6 sm:left-8">
            <div className="w-22 h-22 rounded-2xl bg-white p-1.5 shadow-md">
              <img
                src={workerProfile.avatar}
                alt={workerProfile.name}
                className="w-full h-full rounded-xl object-cover ring-2 ring-blue-500/30"
              />
            </div>
          </div>

          <div className="absolute right-4 sm:right-8 top-4 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white border border-white/30 flex items-center gap-1 backdrop-blur-xs">
              <Award className="w-3.5 h-3.5 text-amber-300" /> {workerProfile.tier}
            </span>
          </div>
        </div>

        {/* Profile Content */}
        <div className="pt-14 pb-8 px-6 sm:px-8 space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-2xl font-bold text-slate-900 font-display">{workerProfile.name}</h2>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Govt. Licensed Pro
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {workerProfile.category} • License #{workerProfile.licenseNumber}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-base font-black text-amber-500 flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                  {workerProfile.rating}
                </div>
                <div className="text-[10px] text-slate-400">{workerProfile.totalReviews} Reviews</div>
              </div>
            </div>
          </div>

          {/* Form / Details Grid */}
          <form onSubmit={handleSave} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Full Name</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 bg-white rounded-xl text-slate-900 border border-slate-200 outline-hidden font-bold focus:border-blue-500"
                  />
                ) : (
                  <p className="text-sm font-bold text-slate-900">{workerProfile.name}</p>
                )}
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Contact Phone</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2 bg-white rounded-xl text-slate-900 border border-slate-200 outline-hidden font-mono focus:border-blue-500"
                  />
                ) : (
                  <p className="text-sm font-bold text-slate-900 font-mono">{workerProfile.phone}</p>
                )}
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Official Email</span>
                {isEditing ? (
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 bg-white rounded-xl text-slate-900 border border-slate-200 outline-hidden font-mono focus:border-blue-500"
                  />
                ) : (
                  <p className="text-sm font-bold text-slate-900 font-mono">{workerProfile.email}</p>
                )}
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Primary Service Hub</span>
                <p className="text-xs font-semibold text-slate-700">{workerProfile.serviceArea}</p>
              </div>

            </div>

            {/* Service Radius Slider */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">Active Dispatch Radius:</span>
                <span className="font-mono font-black text-blue-700">{serviceRadius} km from Sector 4</span>
              </div>
              <input
                type="range"
                min="2"
                max="25"
                value={serviceRadius}
                onChange={(e) => setServiceRadius(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>2 km (Local neighborhood)</span>
                <span>25 km (Entire Pune Metropolitan)</span>
              </div>
            </div>

            {/* Skills & Certifications */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Verified Skill Sets & Certifications
              </span>
              <div className="flex flex-wrap gap-2">
                {workerProfile.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {isEditing && (
              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl text-xs font-black bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all cursor-pointer"
              >
                Save Profile Updates
              </button>
            )}
          </form>

        </div>

      </div>

    </div>
  );
}
