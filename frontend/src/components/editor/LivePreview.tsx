"use client"

import React, { useMemo } from "react"
import { useEditorStore } from "@/store/editorStore"
import parse from 'html-react-parser'

interface LivePreviewProps {
  companyName: string
}

export default function LivePreview({ companyName }: LivePreviewProps) {
  const { type, candidate, branding, contentHTML } = useEditorStore()

  // Dynamic Placeholder Engine
  const resolvedContent = useMemo(() => {
    let text = contentHTML
    
    // Replace logic
    text = text.replace(/{{candidate_name}}/g, candidate.name || '<span class="text-orange-500 bg-orange-50">[Candidate Name]</span>')
    text = text.replace(/{{designation}}/g, candidate.designation || '<span class="text-orange-500 bg-orange-50">[Designation]</span>')
    text = text.replace(/{{salary}}/g, candidate.salary || '<span class="text-orange-500 bg-orange-50">[Salary]</span>')
    text = text.replace(/{{joining_date}}/g, candidate.joiningDate || '<span class="text-orange-500 bg-orange-50">[Joining Date]</span>')
    text = text.replace(/{{company_name}}/g, companyName)
    text = text.replace(/{{department}}/g, candidate.department || '<span class="text-orange-500 bg-orange-50">[Department]</span>')
    text = text.replace(/{{employment_type}}/g, candidate.employmentType || '<span class="text-orange-500 bg-orange-50">[Employment Type]</span>')

    return text
  }, [contentHTML, candidate, companyName])

  return (
    <div className="w-full max-w-[800px] flex items-start justify-center">
      {/* A4 Paper Container (Aspect Ratio 1 : 1.414) */}
      <div 
        className="bg-white w-full shadow-xl shadow-black/10 rounded-sm overflow-hidden flex flex-col relative print:shadow-none print:w-[210mm] print:h-[297mm]"
        style={{ aspectRatio: "1 / 1.414" }}
      >
        {/* Header Strip with Branding Color */}
        <div 
          className="h-4 w-full"
          style={{ backgroundColor: branding.primaryColor }}
        ></div>
        
        {/* Document Padding Area */}
        <div className="flex-1 p-12 md:p-16 flex flex-col">
          
          {/* Header */}
          <div className="flex justify-between items-start mb-12">
            <div className="space-y-1">
              <h1 
                className="text-3xl font-bold tracking-tight"
                style={{ color: branding.primaryColor }}
              >
                {companyName}
              </h1>
              <p className="text-sm text-gray-500 uppercase tracking-widest font-semibold">
                {type === "OFFER_LETTER" ? "Offer of Employment" : "Joining Letter"}
              </p>
            </div>
            
            {/* Logo Placeholder */}
            <div className="w-24 h-24 border border-dashed border-gray-300 flex items-center justify-center text-xs text-gray-400 bg-gray-50">
              Logo Here
            </div>
          </div>
          
          {/* Date & Addressee */}
          <div className="mb-8 text-sm">
            <p className="mb-6">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p className="font-bold">{candidate.name || "[Candidate Name]"}</p>
            <p>{candidate.email || "[Candidate Email]"}</p>
          </div>
          
          {/* Parsed Body Content */}
          <div className="prose prose-sm md:prose-base max-w-none text-gray-800 flex-1">
            {parse(resolvedContent)}
          </div>
          
          {/* Footer & Signature block */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <div className="w-48">
              <div className="h-16 border-b border-gray-300 mb-2 flex items-end justify-center">
                <span className="text-xs text-gray-400 italic mb-1">Signature Placeholder</span>
              </div>
              <p className="font-bold text-sm">Authorized Signatory</p>
              <p className="text-xs text-gray-500">{companyName}</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}
