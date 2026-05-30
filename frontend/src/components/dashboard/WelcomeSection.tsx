"use client";

import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useDocumentCreation } from "@/hooks/useDocumentCreation";

export default function WelcomeSection() {
  const { user } = useAuthStore();
  const { createDocument, isCreating } = useDocumentCreation();
  const firstName = user?.fullName?.split(" ")[0] || "there";

  return (
    <div className="relative overflow-hidden bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      
      {/* Subtle Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.03] to-secondary/[0.03] pointer-events-none" />

      <div className="relative z-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
          Welcome back, {firstName} <span className="inline-block animate-bounce origin-bottom ml-1">👋</span>
        </h1>
        <p className="text-slate-500 mt-2 text-lg font-medium">
          HR document creation simplified. Let's build something professional today.
        </p>
      </div>

      <div className="relative z-10 shrink-0">
        <button 
          onClick={(e) => {
            e.preventDefault();
            if (!isCreating) createDocument('offer');
          }}
          disabled={isCreating}
          className={`group flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-8 py-3.5 rounded-xl font-bold shadow-md shadow-primary/20 hover:shadow-lg hover:-translate-y-0.5 transition-all w-full md:w-auto ${isCreating ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          <Plus className={`w-5 h-5 transition-transform ${!isCreating && 'group-hover:rotate-90'}`} />
          {isCreating ? 'Creating...' : 'Create New Letter'}
        </button>
      </div>
    </div>
  );
}
