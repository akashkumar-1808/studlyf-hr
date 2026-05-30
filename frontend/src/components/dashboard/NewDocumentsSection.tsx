import React from "react";
import { FilePlus2, Briefcase, FileSignature, GraduationCap } from "lucide-react";
import { useDocumentCreation } from "@/hooks/useDocumentCreation";

export default function NewDocumentsSection() {
  const { createDocument, isCreating } = useDocumentCreation();

  const handleCreate = (e: React.MouseEvent, type: 'offer' | 'joining') => {
    e.preventDefault();
    if (!isCreating) {
      createDocument(type);
    }
  };

  const actions = [
    {
      title: "Create Offer Letter",
      type: "offer" as const,
      icon: Briefcase,
      color: "text-blue-600",
      bg: "bg-blue-100",
      border: "border-blue-100 hover:border-blue-300"
    },
    {
      title: "Create Joining Letter",
      type: "joining" as const,
      icon: FileSignature,
      color: "text-emerald-600",
      bg: "bg-emerald-100",
      border: "border-emerald-100 hover:border-emerald-300"
    },
    {
      title: "Create Internship Letter",
      type: "offer" as const, // Uses offer builder with custom title later
      icon: GraduationCap,
      color: "text-purple-600",
      bg: "bg-purple-100",
      border: "border-purple-100 hover:border-purple-300"
    },
    {
      title: "Create Custom Letter",
      type: "offer" as const,
      icon: FilePlus2,
      color: "text-amber-600",
      bg: "bg-amber-100",
      border: "border-amber-100 hover:border-amber-300"
    }
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-900 tracking-tight text-lg">New Document</h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((action, idx) => (
          <button 
            key={idx}
            onClick={(e) => handleCreate(e, action.type)}
            disabled={isCreating}
            className={`group bg-white p-4 rounded-xl border ${action.border} shadow-sm hover:shadow-md transition-all flex items-center gap-3 text-left ${isCreating ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            <div className={`w-10 h-10 ${action.bg} rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-110`}>
              <action.icon className={`w-5 h-5 ${action.color}`} />
            </div>
            <span className="font-semibold text-slate-800 text-sm group-hover:text-primary transition-colors">
              {action.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
