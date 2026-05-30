"use client";

import React from 'react';

export default function SettingsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">System Settings</h1>
        <p className="text-slate-500 mt-1">Manage application settings and preferences.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 flex flex-col items-center justify-center min-h-[400px]">
        <h2 className="text-xl font-bold text-slate-800 mb-2">Settings Coming Soon</h2>
        <p className="text-slate-500 text-center max-w-md">
          System-wide settings and integrations are currently under development. Please check your Profile for account and branding preferences.
        </p>
      </div>
    </div>
  );
}
