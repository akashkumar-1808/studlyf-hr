"use client";

import React, { useState } from 'react';
import { Shield, KeyRound, MonitorSmartphone, Eye, EyeOff } from 'lucide-react';

export default function SecuritySection() {
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
        <Shield size={18} className="text-slate-400" />
        <h3 className="font-bold text-slate-800">Security Settings</h3>
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <KeyRound size={16} className="text-slate-400" />
          <h4 className="font-semibold text-slate-700 text-sm">Change Password</h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="md:col-span-2 relative">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Current Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full text-sm p-2.5 border border-slate-200 rounded-lg focus:ring-1 focus:ring-primary outline-none transition-all" 
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          
          <div className="relative">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">New Password</label>
            <input 
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full text-sm p-2.5 border border-slate-200 rounded-lg focus:ring-1 focus:ring-primary outline-none transition-all" 
            />
          </div>
          
          <div className="relative">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Confirm Password</label>
            <input 
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full text-sm p-2.5 border border-slate-200 rounded-lg focus:ring-1 focus:ring-primary outline-none transition-all" 
            />
          </div>

          <div className="md:col-span-2 flex justify-end">
            <button className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm">
              Update Password
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100">
          <div className="flex items-center gap-2 mb-4">
            <MonitorSmartphone size={16} className="text-slate-400" />
            <h4 className="font-semibold text-slate-700 text-sm">Session Management</h4>
          </div>
          
          <div className="bg-slate-50 rounded-xl p-4 flex items-center justify-between border border-slate-100">
            <div>
              <p className="text-sm font-semibold text-slate-800">Current Session</p>
              <p className="text-xs text-slate-500 mt-1">Windows 11 • Chrome 124.0</p>
              <p className="text-xs text-emerald-600 font-medium mt-1">Active now</p>
            </div>
            <button className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold rounded-lg transition-colors shadow-sm">
              Logout All Devices
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
