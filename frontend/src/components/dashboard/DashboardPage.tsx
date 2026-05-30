"use client";

import React from "react";
import WelcomeSection from "./WelcomeSection";
import NewDocumentsSection from "./NewDocumentsSection";
import StatsOverview from "./StatsOverview";
import RecentDocuments from "./RecentDocuments";
import DraftsSection from "./DraftsSection";

export default function DashboardPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto">
      
      {/* Top Hero Section */}
      <WelcomeSection />

      {/* New Documents Actions */}
      <NewDocumentsSection />

      {/* Metrics Overview */}
      <StatsOverview />

      {/* Drafts */}
      <DraftsSection />

      {/* Lower Section: Recent Documents & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <RecentDocuments />
        </div>
        <div className="space-y-8">
           {/* Placeholder for Recent Edits or Secondary info */}
           <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
             <h3 className="font-bold text-slate-900 mb-4 tracking-tight text-lg">Recent Edits</h3>
             <div className="text-center py-8 text-sm text-slate-500 font-medium bg-slate-50 rounded-xl border border-dashed border-slate-200">
               No recent edits found.
             </div>
           </div>
        </div>
      </div>
      
    </div>
  );
}
