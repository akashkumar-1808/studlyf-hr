"use client";

import React, { useEffect } from "react";
import { X, Check } from "lucide-react";
import { TemplateDisplay } from "@/lib/sampleTemplates";

interface TemplatePreviewModalProps {
  template: TemplateDisplay | null;
  isOpen: boolean;
  onClose: () => void;
  onUse: (template: TemplateDisplay) => void;
}

export default function TemplatePreviewModal({ template, isOpen, onClose, onUse }: TemplatePreviewModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !template) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-[95%] max-w-5xl h-[90vh] bg-[#F9FAFB] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="h-16 px-6 border-b border-slate-200 bg-white flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-lg font-bold text-slate-900">{template.templateName}</h2>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{template.category}</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                onClose();
                onUse(template);
              }}
              className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all shadow-sm"
            >
              <Check size={16} />
              Use This Template
            </button>
            <div className="w-px h-6 bg-slate-200" />
            <button 
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content Area - A4 Preview Container */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 flex justify-center bg-slate-100/50">
          {/* A4 Paper Dimensions: Aspect ratio 1:1.414 */}
          <div className="w-[800px] min-h-[1131px] bg-white shadow-lg border border-slate-200 relative overflow-hidden flex flex-col">
             
             {/* Mock Content Rendering based on config */}
             {template.headerStyle === 'split' && (
               <div className="flex justify-between items-start p-10 pb-4 border-b border-slate-200">
                 <div>
                   <h1 className="text-2xl font-bold text-slate-800">Your Company Inc.</h1>
                   <p className="text-sm text-slate-500 mt-1">123 Business Avenue<br/>Tech District, CA 90210</p>
                 </div>
                 <div className="text-right text-sm text-slate-500">
                   <p>+1 (555) 123-4567</p>
                   <p>hr@yourcompany.com</p>
                   <p>www.yourcompany.com</p>
                 </div>
               </div>
             )}

             {template.headerStyle === 'centered' && (
               <div className="flex flex-col items-center p-10 pb-4 border-b border-slate-200">
                 <h1 className="text-3xl font-bold text-slate-800 tracking-tight">YOUR COMPANY</h1>
                 <p className="text-sm text-slate-500 mt-2">123 Business Avenue, Tech District, CA 90210</p>
               </div>
             )}

             {/* Accents */}
             {template.cornerAccents && (
               <>
                 <div className="absolute top-0 left-0 w-32 h-32 border-t-[8px] border-l-[8px] border-slate-800 m-6" />
                 <div className="absolute bottom-0 right-0 w-32 h-32 border-b-[8px] border-r-[8px] border-slate-800 m-6" />
               </>
             )}

             <div className="flex-1 p-12 px-16 flex flex-col gap-6" style={{ fontFamily: template.typography.bodyFont }}>
                
                <h2 className={`text-xl font-bold uppercase tracking-wider text-slate-900 ${template.titleStyle === 'centered' || template.titleStyle === 'strong-centered' ? 'text-center' : 'text-left'}`}>
                  Job Offer Letter
                </h2>

                {template.dividerType === 'horizontal' && <hr className="border-slate-300" />}

                <div className="flex justify-between text-sm mt-4">
                  <div>
                    <p className="font-bold text-slate-800">Jane Doe</p>
                    <p className="text-slate-600">456 Talent Street<br/>Innovation City, TX 75001</p>
                  </div>
                  <div className="text-right text-slate-600">
                    <p>May 30, 2026</p>
                  </div>
                </div>

                <div className="mt-8 space-y-4 text-sm text-slate-700 leading-relaxed">
                  <p>Dear Jane,</p>
                  <p>We are thrilled to offer you the position of Senior Product Designer at Your Company Inc. Your reporting manager will be John Smith, VP of Design.</p>
                  <p>Your annual compensation will be $140,000. Please review the attached terms and conditions.</p>
                  <p>We look forward to welcoming you to the team!</p>
                </div>

                <div className={`mt-auto pt-16 flex flex-col ${template.signaturePlacement === 'bottom-right' ? 'items-end text-right' : template.signaturePlacement === 'centered' ? 'items-center text-center' : 'items-start text-left'}`}>
                  <div className="w-40 h-16 border-b border-slate-300 mb-2 flex items-end justify-center pb-1">
                    <span className="font-signature text-2xl text-blue-900 opacity-80">J. Smith</span>
                  </div>
                  <p className="font-bold text-slate-800 text-sm">John Smith</p>
                  <p className="text-slate-500 text-sm">VP of Design</p>
                  <p className="text-slate-500 text-sm">Your Company Inc.</p>
                </div>
             </div>

             {/* Footer */}
             {template.footerDesign === 'geometric_strip' && (
               <div className="h-3 w-full bg-gradient-to-r from-blue-600 via-purple-600 to-amber-500" />
             )}
             {template.footerDesign === 'simple' && (
               <div className="h-10 w-full bg-slate-800 flex items-center justify-center text-white/50 text-xs">
                 Confidential & Proprietary
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
