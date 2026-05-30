"use client";

import React from 'react';
import { useProfileStore } from '@/store/profileStore';
import { Building2 } from 'lucide-react';

export default function CompanyInformation() {
  const { profile, draftProfile, updateDraft } = useProfileStore();
  
  if (!profile) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateDraft({ [e.target.name]: e.target.value });
  };

  const getValue = (key: keyof typeof profile) => {
    return draftProfile[key] !== undefined ? draftProfile[key] : profile[key] || '';
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
        <Building2 size={18} className="text-slate-400" />
        <h3 className="font-bold text-slate-800">Company Information</h3>
      </div>
      
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Company Name</label>
          <textarea 
            name="companyName"
            value={getValue('companyName') as string} 
            onChange={handleChange}
            rows={2}
            className="w-full text-sm p-2.5 border border-slate-200 rounded-lg focus:ring-1 focus:ring-primary outline-none transition-all resize-none" 
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Corporate Address</label>
          <textarea 
            name="companyAddress"
            value={getValue('companyAddress') as string} 
            onChange={handleChange}
            rows={2}
            className="w-full text-sm p-2.5 border border-slate-200 rounded-lg focus:ring-1 focus:ring-primary outline-none transition-all resize-none" 
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Business Email</label>
          <input 
            type="email" 
            name="companyEmail"
            value={getValue('companyEmail') as string} 
            onChange={handleChange}
            className="w-full text-sm p-2.5 border border-slate-200 rounded-lg focus:ring-1 focus:ring-primary outline-none transition-all" 
          />
        </div>
        
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Business Phone</label>
          <input 
            type="tel" 
            name="companyPhone"
            value={getValue('companyPhone') as string} 
            onChange={handleChange}
            className="w-full text-sm p-2.5 border border-slate-200 rounded-lg focus:ring-1 focus:ring-primary outline-none transition-all" 
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Website</label>
          <input 
            type="url" 
            name="companyWebsite"
            value={getValue('companyWebsite') as string} 
            onChange={handleChange}
            className="w-full text-sm p-2.5 border border-slate-200 rounded-lg focus:ring-1 focus:ring-primary outline-none transition-all" 
          />
        </div>
      </div>
      
      <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50">
        <p className="text-xs text-slate-500 font-medium">
          Note: Updating this information will automatically sync with the Document Builder template defaults.
        </p>
      </div>
    </div>
  );
}
