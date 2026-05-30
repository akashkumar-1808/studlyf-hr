"use client"

import React, { useEffect, useState, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ChevronLeft, Save, CheckCircle2, Loader2, Download } from "lucide-react"
import debounce from "lodash/debounce"

import { useEditorStore } from "@/store/editorStore"
import WizardSidebar from "@/components/editor/WizardSidebar"
import LivePreview from "@/components/editor/LivePreview"
import { useAuthStore } from "@/store/authStore"

export default function EditorPage() {
  const { id } = useParams()
  const router = useRouter()
  const { user } = useAuthStore()
  
  const { isSaving, lastSavedAt, saveDraft, candidate, contentHTML, branding } = useEditorStore()

  // Debounced autosave
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSave = useCallback(
    debounce(() => {
      saveDraft()
    }, 2000),
    [saveDraft]
  )

  useEffect(() => {
    // Trigger autosave whenever critical data changes, but ignore the initial mount if possible
    debouncedSave()
  }, [candidate, contentHTML, branding, debouncedSave])

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white">
      {/* Editor Header */}
      <header className="h-16 border-b border-border flex items-center justify-between px-4 shrink-0 bg-white z-10">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-md hover:bg-muted/50">
            <ChevronLeft size={20} />
          </Link>
          <div className="font-medium text-sm border-l border-border pl-4">
            Document Builder
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-xs text-muted-foreground mr-4">
            {isSaving ? (
              <span className="flex items-center text-primary"><Loader2 size={14} className="mr-1 animate-spin" /> Saving...</span>
            ) : lastSavedAt ? (
              <span className="flex items-center"><CheckCircle2 size={14} className="mr-1 text-green-500" /> Saved just now</span>
            ) : (
              <span>Draft</span>
            )}
          </div>
          
          {/* We are skipping Export logic for now, but keeping the button disabled or mocked */}
          <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center transition-all shadow-sm">
            <Download size={16} className="mr-2" />
            Export & Send
          </button>
        </div>
      </header>

      {/* Main Split View */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel: Wizard (40%) */}
        <div className="w-full md:w-[40%] xl:w-[35%] h-full border-r border-border overflow-y-auto bg-white flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10">
          <WizardSidebar />
        </div>
        
        {/* Right Panel: Live Preview (60%) */}
        <div className="hidden md:flex flex-1 h-full overflow-y-auto bg-muted/40 p-4 lg:p-8 items-start justify-center">
          <LivePreview companyName={user?.companyName || "Your Company"} />
        </div>
      </div>
    </div>
  )
}
