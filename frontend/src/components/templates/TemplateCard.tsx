"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, Eye, Check } from "lucide-react";
import { TemplateDisplay } from "@/lib/sampleTemplates";

interface TemplateCardProps {
  template: TemplateDisplay;
  onPreview: (template: TemplateDisplay) => void;
  onUse: (template: TemplateDisplay) => void;
}

export default function TemplateCard({ template, onPreview, onUse }: TemplateCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200 transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-[1/1.414] bg-slate-100 overflow-hidden">
        {/* Placeholder for missing images to ensure it looks premium */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          <div className="w-full h-full bg-white shadow-sm border border-slate-200 rounded flex items-center justify-center relative overflow-hidden">
             {template.isPremium && (
               <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-tr from-transparent via-transparent to-amber-100 opacity-50"></div>
             )}
             <div className="w-1/2 h-px bg-slate-200 absolute top-12 left-1/4"></div>
             <div className="w-1/3 h-px bg-slate-200 absolute top-16 left-1/4"></div>
             <div className="w-2/3 h-px bg-slate-200 absolute top-20 left-1/4"></div>
             
             <span className="text-slate-300 font-medium tracking-widest text-xs uppercase opacity-50 rotate-[-45deg] select-none">Preview</span>
          </div>
        </div>

        {/* Since we don't have real images uploaded, we will just use the styled placeholder. If an image is provided, we would map it here: */}
        {/* <Image src={template.thumbnailUrl} alt={template.templateName} fill className="object-cover" /> */}

        {/* Premium Badge */}
        {template.isPremium && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-200 to-yellow-400 text-amber-900 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
            <Sparkles size={10} />
            PREMIUM
          </div>
        )}

        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] transition-opacity duration-300 flex flex-col items-center justify-center gap-3 p-6 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button 
            onClick={() => onPreview(template)}
            className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <Eye size={16} />
            Preview
          </button>
          <button 
            onClick={() => onUse(template)}
            className="w-full py-2.5 bg-primary hover:bg-primary/90 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-primary/30"
          >
            <Check size={16} />
            Use Template
          </button>
        </div>
      </div>

      {/* Info Container */}
      <div className="p-4 flex flex-col gap-1 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 truncate">{template.templateName}</h3>
        </div>
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{template.category}</p>
      </div>
    </div>
  );
}
