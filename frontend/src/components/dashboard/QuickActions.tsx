import React from "react";
import Link from "next/link";
import { FilePlus2, Briefcase, FileSignature, LayoutTemplate } from "lucide-react";
import { useDocumentCreation } from "@/hooks/useDocumentCreation";

export default function QuickActions() {
  const { createDocument, isCreating } = useDocumentCreation();

  const handleCreate = (e: React.MouseEvent, type: 'offer' | 'joining') => {
    e.preventDefault();
    if (!isCreating) {
      createDocument(type);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <button 
        onClick={(e) => handleCreate(e, 'offer')}
        disabled={isCreating}
        className={`group bg-white p-6 rounded-2xl border border-blue-100 hover:border-blue-300 shadow-sm hover:shadow-md transition-all flex flex-col relative overflow-hidden text-left ${isCreating ? 'opacity-70 cursor-not-allowed' : ''}`}
      >
        <div className={`w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
          <Briefcase className={`w-6 h-6 text-blue-600`} />
        </div>
        <h3 className="font-bold text-slate-900 tracking-tight text-lg mb-1 group-hover:text-primary transition-colors">
          Create Offer Letter
        </h3>
        <p className="text-slate-500 text-sm font-medium leading-relaxed">
          Generate a professional offer for new hires.
        </p>
      </button>

      <button 
        onClick={(e) => handleCreate(e, 'joining')}
        disabled={isCreating}
        className={`group bg-white p-6 rounded-2xl border border-emerald-100 hover:border-emerald-300 shadow-sm hover:shadow-md transition-all flex flex-col relative overflow-hidden text-left ${isCreating ? 'opacity-70 cursor-not-allowed' : ''}`}
      >
        <div className={`w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
          <FileSignature className={`w-6 h-6 text-emerald-600`} />
        </div>
        <h3 className="font-bold text-slate-900 tracking-tight text-lg mb-1 group-hover:text-primary transition-colors">
          Create Joining Letter
        </h3>
        <p className="text-slate-500 text-sm font-medium leading-relaxed">
          Draft an official joining letter seamlessly.
        </p>
      </button>

      <Link 
        href="/dashboard/templates"
        className={`group bg-white p-6 rounded-2xl border border-purple-100 hover:border-purple-300 shadow-sm hover:shadow-md transition-all flex flex-col relative overflow-hidden`}
      >
        <div className={`w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
          <LayoutTemplate className={`w-6 h-6 text-purple-600`} />
        </div>
        <h3 className="font-bold text-slate-900 tracking-tight text-lg mb-1 group-hover:text-primary transition-colors">
          Browse Templates
        </h3>
        <p className="text-slate-500 text-sm font-medium leading-relaxed">
          Explore our library of HR document templates.
        </p>
      </Link>

      <button 
        onClick={(e) => handleCreate(e, 'offer')}
        disabled={isCreating}
        className={`group bg-white p-6 rounded-2xl border border-amber-100 hover:border-amber-300 shadow-sm hover:shadow-md transition-all flex flex-col relative overflow-hidden text-left ${isCreating ? 'opacity-70 cursor-not-allowed' : ''}`}
      >
        <div className={`w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
          <FilePlus2 className={`w-6 h-6 text-amber-600`} />
        </div>
        <h3 className="font-bold text-slate-900 tracking-tight text-lg mb-1 group-hover:text-primary transition-colors">
          Custom Document
        </h3>
        <p className="text-slate-500 text-sm font-medium leading-relaxed">
          Start from a blank canvas or import your own.
        </p>
      </button>
    </div>
  );
}
