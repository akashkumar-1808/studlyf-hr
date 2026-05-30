import React from "react";
import Link from "next/link";
import { FileText, Plus } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center px-4 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50">
      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 mb-5">
        <FileText className="text-slate-400 w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 tracking-tight">Create your first HR document</h3>
      <p className="text-sm font-medium text-slate-500 max-w-sm mt-2 mb-6 leading-relaxed">
        You haven&apos;t generated any documents yet. Start building professional offer and joining letters in minutes.
      </p>
      <Link 
        href="/dashboard/documents/new"
        className="flex items-center gap-2 bg-slate-900 text-white px-6 py-2.5 rounded-lg font-semibold text-sm shadow-sm hover:bg-slate-800 transition-colors"
      >
        <Plus size={18} />
        Generate First Letter
      </Link>
    </div>
  );
}
