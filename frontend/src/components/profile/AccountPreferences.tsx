"use client";

import React from 'react';
import { useProfileStore } from '@/store/profileStore';
import { Settings2 } from 'lucide-react';

export default function AccountPreferences() {
  const { profile, draftProfile, updateDraft } = useProfileStore();
  
  if (!profile) return null;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    updateDraft({ [e.target.name]: e.target.value });
  };

  const getValue = (key: keyof typeof profile) => {
    return draftProfile[key] !== undefined ? draftProfile[key] : profile[key] || '';
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
        <Settings2 size={18} className="text-slate-400" />
        <h3 className="font-bold text-slate-800">Account Preferences</h3>
      </div>
      
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Default Document Font</label>
          <select 
            name="defaultFont"
            value={getValue('defaultFont') as string} 
            onChange={handleChange}
            className="w-full text-sm p-2.5 border border-slate-200 rounded-lg focus:ring-1 focus:ring-primary outline-none transition-all bg-white"
          >
            <option value='"Times New Roman", Times, serif'>Times New Roman</option>
            <option value='Arial, Helvetica, sans-serif'>Arial</option>
            <option value='"Calibri", "Helvetica Neue", sans-serif'>Calibri</option>
            <option value='"Georgia", serif'>Georgia</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Default Border Color</label>
          <div className="flex gap-2 flex-wrap">
            {[
              { name: 'Purple', val: '#2D136F' },
              { name: 'Blue', val: '#1E3A8A' },
              { name: 'Corporate Red', val: '#991B1B' },
              { name: 'Green', val: '#065F46' },
              { name: 'Teal', val: '#0F766E' },
              { name: 'Black', val: '#000000' }
            ].map(color => (
              <button 
                key={color.name}
                type="button"
                onClick={() => updateDraft({ defaultBorderColor: color.val })}
                className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${getValue('defaultBorderColor') === color.val ? 'ring-2 ring-offset-2 ring-slate-400 border-white' : 'border-transparent'}`}
                style={{ backgroundColor: color.val }}
                title={color.name}
              />
            ))}
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg overflow-hidden ml-1">
              <input 
                type="color" 
                name="defaultBorderColor"
                value={getValue('defaultBorderColor') as string}
                onChange={handleChange}
                className="w-8 h-8 cursor-pointer border-0 p-0"
                title="Custom Color"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Default Line Spacing</label>
          <select 
            name="defaultLineSpacing"
            value={getValue('defaultLineSpacing') as string} 
            onChange={handleChange}
            className="w-full text-sm p-2.5 border border-slate-200 rounded-lg focus:ring-1 focus:ring-primary outline-none transition-all bg-white"
          >
            <option value="1.0">Single (1.0)</option>
            <option value="1.15">Tight (1.15)</option>
            <option value="1.25">Professional (1.25)</option>
            <option value="1.5">Relaxed (1.5)</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Default Letter Spacing</label>
          <select 
            name="defaultLetterSpacing"
            value={getValue('defaultLetterSpacing') as string} 
            onChange={handleChange}
            className="w-full text-sm p-2.5 border border-slate-200 rounded-lg focus:ring-1 focus:ring-primary outline-none transition-all bg-white"
          >
            <option value="-0.02em">Tight (-0.02em)</option>
            <option value="0px">Normal (0px)</option>
            <option value="0.02em">Wide (0.02em)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
