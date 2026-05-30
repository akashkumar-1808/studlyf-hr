"use client";

import React, { useState } from 'react';
import { useProfileStore } from '@/store/profileStore';
import { User, MapPin } from 'lucide-react';

export default function PersonalInformation() {
  const { profile, draftProfile, updateDraft } = useProfileStore();
  
  if (!profile) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateDraft({ [e.target.name]: e.target.value });
  };

  const getValue = (key: keyof typeof profile) => {
    return draftProfile[key] !== undefined ? draftProfile[key] : profile[key] || '';
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
        <User size={18} className="text-slate-400" />
        <h3 className="font-bold text-slate-800">Personal Information</h3>
      </div>
      
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Full Name</label>
          <input 
            type="text" 
            name="fullName"
            value={getValue('fullName') as string} 
            onChange={handleChange}
            className="w-full text-sm p-2.5 border border-slate-200 rounded-lg focus:ring-1 focus:ring-primary outline-none transition-all" 
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Email Address</label>
          <input 
            type="email" 
            name="email"
            value={getValue('email') as string} 
            readOnly
            className="w-full text-sm p-2.5 border border-slate-200 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed outline-none" 
            title="Email cannot be changed"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Phone Number</label>
          <input 
            type="tel" 
            name="phone"
            value={getValue('phone') as string} 
            onChange={handleChange}
            placeholder="+1 (555) 000-0000"
            className="w-full text-sm p-2.5 border border-slate-200 rounded-lg focus:ring-1 focus:ring-primary outline-none transition-all" 
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Designation / Role</label>
          <input 
            type="text" 
            name="designation"
            value={getValue('designation') as string} 
            onChange={handleChange}
            placeholder="e.g. HR Administrator"
            className="w-full text-sm p-2.5 border border-slate-200 rounded-lg focus:ring-1 focus:ring-primary outline-none transition-all" 
          />
        </div>

        <div className="col-span-1 md:col-span-2 pt-4 mt-2 border-t border-slate-100">
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={16} className="text-slate-400" />
            <h4 className="font-semibold text-slate-700 text-sm">Location Details</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Address</label>
              <input 
                type="text" 
                name="address"
                value={getValue('address') as string} 
                onChange={handleChange}
                className="w-full text-sm p-2.5 border border-slate-200 rounded-lg focus:ring-1 focus:ring-primary outline-none transition-all" 
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">City</label>
              <input 
                type="text" 
                name="city"
                value={getValue('city') as string} 
                onChange={handleChange}
                className="w-full text-sm p-2.5 border border-slate-200 rounded-lg focus:ring-1 focus:ring-primary outline-none transition-all" 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">State</label>
                <input 
                  type="text" 
                  name="state"
                  value={getValue('state') as string} 
                  onChange={handleChange}
                  className="w-full text-sm p-2.5 border border-slate-200 rounded-lg focus:ring-1 focus:ring-primary outline-none transition-all" 
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Country</label>
                <input 
                  type="text" 
                  name="country"
                  value={getValue('country') as string} 
                  onChange={handleChange}
                  className="w-full text-sm p-2.5 border border-slate-200 rounded-lg focus:ring-1 focus:ring-primary outline-none transition-all" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
