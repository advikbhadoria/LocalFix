import React, { useState } from 'react';
import { User, Phone, Mail, MapPin, ShieldCheck, Edit3, Plus, Star, ArrowLeft } from 'lucide-react';

export default function ProfileView({ profile, setProfile, setActiveTab, requestsList }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(profile);

  const completedRequests = requestsList.filter(r => r.status === 'completed');
  const avgRating = completedRequests.reduce((acc, curr) => acc + (curr.review ? curr.review.stars : 5), 0) / (completedRequests.length || 1);

  const handleSave = () => {
    setProfile({ ...editForm, isRegistered: true });
    setIsEditing(false);
  };

  if (!profile.isRegistered || isEditing) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 max-w-xl mx-auto mt-4">
        <div className="flex items-center mb-6">
          {profile.isRegistered && (
            <button onClick={() => setIsEditing(false)} className="mr-3 text-slate-500 hover:text-slate-900 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <h2 className="text-2xl font-bold text-slate-900">{profile.isRegistered ? 'Edit Profile' : 'Register / Switch Customer'}</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input 
              type="text" 
              className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-600"
              value={editForm.name} 
              onChange={e => setEditForm({...editForm, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Mobile Number</label>
            <input 
              type="text" 
              className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-600"
              value={editForm.phone} 
              onChange={e => setEditForm({...editForm, phone: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
            <input 
              type="email" 
              className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-600"
              value={editForm.email} 
              onChange={e => setEditForm({...editForm, email: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Detailed Delivery Address</label>
            <textarea 
              className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-600"
              rows={3}
              value={editForm.address} 
              onChange={e => setEditForm({...editForm, address: e.target.value})}
            />
          </div>
          <button 
            onClick={handleSave}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors mt-4"
          >
            Save & Start Booking
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-6 items-center md:items-start">
        <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center border-4 border-blue-100 shrink-0 relative">
          <User className="w-10 h-10 text-blue-600" />
          <div className="absolute -bottom-2 bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-green-200 flex items-center shadow-sm uppercase">
            <ShieldCheck className="w-3 h-3 mr-1" /> Verified
          </div>
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold text-slate-900">{profile.name}</h2>
          <p className="text-sm text-slate-500 font-medium mb-4">Member Since {profile.memberSince}</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-sm text-slate-700">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Phone className="w-4 h-4 text-slate-400" /> {profile.phone}
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Mail className="w-4 h-4 text-slate-400" /> {profile.email}
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2 col-span-1 sm:col-span-2 mt-2">
              <div className="bg-slate-100 px-3 py-1.5 rounded-lg flex items-center gap-2 border border-slate-200 w-full md:w-auto justify-center md:justify-start">
                <ShieldCheck className="w-4 h-4 text-slate-500" />
                <span className="text-slate-600 font-medium">Your Security PIN:</span>
                <span className="font-black text-slate-900 tracking-widest">{profile.securityPin}</span>
              </div>
            </div>
          </div>
        </div>

        <button 
          onClick={() => setIsEditing(true)}
          className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors border border-transparent hover:border-blue-100"
        >
          <Edit3 className="w-4 h-4" /> Edit Details
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 text-center">
          <div className="text-3xl font-bold text-blue-600 mb-1">{completedRequests.length}</div>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Services Booked</div>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 text-center flex flex-col items-center">
          <div className="flex items-center justify-center text-3xl font-bold text-amber-500 mb-1">
            {avgRating.toFixed(1)} <Star className="w-6 h-6 ml-1 fill-current" />
          </div>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Customer Rating</div>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 text-center">
          <div className="text-3xl font-bold text-green-600 mb-1">₹0</div>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Outstanding Dues</div>
        </div>
      </div>

      {/* Addresses */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-slate-900">Saved Addresses</h3>
          <button className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
            <Plus className="w-4 h-4" /> Add New
          </button>
        </div>
        
        <div className="border border-blue-200 bg-blue-50/30 rounded-xl p-4 flex items-start gap-3">
          <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-slate-900">Home</span>
              <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-bold uppercase tracking-wide">Primary</span>
            </div>
            <p className="text-sm text-slate-600">{profile.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
