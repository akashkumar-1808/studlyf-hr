"use client"

import React from "react"
import { useEditorStore } from "@/store/editorStore"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { FileType, PaintBucket, UserSquare2, Type, CheckCircle2 } from "lucide-react"
import TiptapEditor from "./TiptapEditor"


const STEPS = [
  { id: 1, name: "Document Type", icon: FileType },
  { id: 2, name: "Branding", icon: PaintBucket },
  { id: 3, name: "Candidate Details", icon: UserSquare2 },
  { id: 4, name: "Content", icon: Type },
]

export default function WizardSidebar() {
  const { step, setStep, type, setType, candidate, updateCandidate, branding, updateBranding } = useEditorStore()

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Progress Indicator */}
      <div className="p-6 border-b border-border shrink-0">
        <h2 className="text-xl font-bold text-foreground mb-4">Letter Setup</h2>
        <div className="flex justify-between relative">
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-muted -z-10 -translate-y-1/2 rounded-full"></div>
          {STEPS.map((s) => (
            <button
              key={s.id}
              onClick={() => setStep(s.id)}
              className="flex flex-col items-center group relative bg-white px-2"
            >
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                  step >= s.id 
                    ? "border-primary bg-primary text-white" 
                    : "border-muted-foreground/30 bg-white text-muted-foreground group-hover:border-primary/50"
                }`}
              >
                {step > s.id ? <CheckCircle2 size={16} /> : <s.icon size={14} />}
              </div>
              <span className={`text-[10px] uppercase tracking-wider font-semibold mt-2 absolute -bottom-5 w-24 text-center ${
                step >= s.id ? "text-primary" : "text-muted-foreground"
              }`}>
                {s.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-1 overflow-y-auto p-6 pb-20">
        
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <div>
              <h3 className="text-lg font-semibold mb-1">Select Document Type</h3>
              <p className="text-sm text-muted-foreground mb-4">What kind of letter are you generating?</p>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <button
                onClick={() => setType("OFFER_LETTER")}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  type === "OFFER_LETTER" 
                    ? "border-primary bg-primary/5 shadow-sm" 
                    : "border-border hover:border-primary/30 hover:bg-muted/20"
                }`}
              >
                <div className="font-semibold text-foreground">Offer Letter</div>
                <div className="text-sm text-muted-foreground mt-1">Standard employment offer with compensation details.</div>
              </button>
              
              <button
                onClick={() => setType("JOINING_LETTER")}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  type === "JOINING_LETTER" 
                    ? "border-primary bg-primary/5 shadow-sm" 
                    : "border-border hover:border-primary/30 hover:bg-muted/20"
                }`}
              >
                <div className="font-semibold text-foreground">Joining Letter</div>
                <div className="text-sm text-muted-foreground mt-1">Official welcome letter upon candidate joining.</div>
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <div>
              <h3 className="text-lg font-semibold mb-1">Company Branding</h3>
              <p className="text-sm text-muted-foreground mb-4">Customize the look and feel of the document.</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Brand Color (HEX)</Label>
                <div className="flex gap-2">
                  <Input 
                    type="color" 
                    value={branding.primaryColor} 
                    onChange={(e) => updateBranding({ primaryColor: e.target.value })}
                    className="w-12 p-1 h-10 cursor-pointer"
                  />
                  <Input 
                    type="text" 
                    value={branding.primaryColor}
                    onChange={(e) => updateBranding({ primaryColor: e.target.value })}
                    className="flex-1 font-mono"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Company Logo</Label>
                <div className="border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-muted/20 transition-colors cursor-pointer">
                  <PaintBucket className="text-muted-foreground mb-2" size={24} />
                  <span className="text-sm font-medium">Click to upload logo</span>
                  <span className="text-xs text-muted-foreground mt-1">PNG, JPG up to 2MB</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <div>
              <h3 className="text-lg font-semibold mb-1">Candidate Details</h3>
              <p className="text-sm text-muted-foreground mb-4">Enter the exact details to appear on the letter.</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="candidateName">Full Name</Label>
                <Input 
                  id="candidateName" 
                  placeholder="E.g. Sarah Connor"
                  value={candidate.name}
                  onChange={(e) => updateCandidate({ name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="designation">Designation / Role</Label>
                <Input 
                  id="designation" 
                  placeholder="E.g. Senior Software Engineer"
                  value={candidate.designation}
                  onChange={(e) => updateCandidate({ designation: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="salary">Salary / CTC</Label>
                  <Input 
                    id="salary" 
                    placeholder="E.g. $120,000"
                    value={candidate.salary}
                    onChange={(e) => updateCandidate({ salary: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="joiningDate">Joining Date</Label>
                  <Input 
                    id="joiningDate" 
                    type="date"
                    value={candidate.joiningDate}
                    onChange={(e) => updateCandidate({ joiningDate: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 h-full flex flex-col animate-in fade-in slide-in-from-right-4">
            <div>
              <h3 className="text-lg font-semibold mb-1">Content Builder</h3>
              <p className="text-sm text-muted-foreground mb-4">Edit the text of your letter. Use placeholders like {"{{candidate_name}}"}.</p>
            </div>
            
            <div className="flex-1 min-h-[300px]">
              <TiptapEditor />
            </div>
          </div>
        )}
        
      </div>

      {/* Navigation Footer */}
      <div className="p-4 border-t border-border bg-muted/10 shrink-0 flex justify-between items-center">
        <button
          onClick={() => setStep(Math.max(1, step - 1))}
          disabled={step === 1}
          className="px-4 py-2 text-sm font-medium rounded-md text-foreground hover:bg-muted disabled:opacity-50 transition-colors"
        >
          Back
        </button>
        <button
          onClick={() => setStep(Math.min(4, step + 1))}
          disabled={step === 4}
          className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-md text-sm font-medium shadow-sm transition-all disabled:opacity-50"
        >
          Continue
        </button>
      </div>
    </div>
  )
}
