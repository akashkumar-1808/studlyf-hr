import React from "react";
import { Maximize, Edit3, Send } from "lucide-react";

export default function ProductPreviewSection() {
  return (
    <section className="py-24 bg-muted overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            See it in action
          </h2>
          <p className="text-lg text-foreground/70">
            A beautiful, intuitive workspace designed specifically for HR professionals. 
            No coding required.
          </p>
        </div>

        {/* Large Premium Mockup */}
        <div className="relative mx-auto max-w-5xl">
          {/* Background decoration */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[120%] bg-gradient-to-b from-primary/10 to-transparent blur-3xl rounded-[100%] -z-10" />
          
          <div className="bg-white rounded-2xl border border-border shadow-[0_20px_60px_-15px_rgba(45,19,111,0.15)] overflow-hidden">
            
            {/* Top Bar */}
            <div className="bg-background border-b border-border p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                  S
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Software Engineer Offer Letter</h4>
                  <p className="text-xs text-foreground/50">Last edited just now</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="text-xs font-medium text-foreground px-3 py-1.5 rounded-md hover:bg-muted transition-colors border border-transparent">
                  Preview
                </button>
                <button className="flex items-center gap-1.5 text-xs font-medium text-white px-4 py-1.5 rounded-md bg-primary hover:bg-primary/90 transition-colors shadow-sm">
                  <Send size={12} />
                  Send to Candidate
                </button>
              </div>
            </div>

            {/* Editor Area */}
            <div className="flex h-[500px]">
              
              {/* Sidebar variables */}
              <div className="w-64 border-r border-border bg-background p-4 flex flex-col gap-4 overflow-y-auto">
                <h5 className="text-xs font-semibold text-foreground/60 uppercase tracking-wider mb-2">Variables</h5>
                
                {["Candidate Name", "Start Date", "Salary", "Manager", "Location"].map((v, i) => (
                  <div key={i} className="group flex items-center justify-between p-2 rounded-md border border-border bg-white hover:border-primary/30 cursor-pointer transition-colors">
                    <span className="text-xs font-medium text-foreground">{v}</span>
                    <Edit3 size={12} className="text-foreground/40 group-hover:text-primary" />
                  </div>
                ))}
              </div>

              {/* Main Document Body */}
              <div className="flex-1 bg-muted p-8 overflow-y-auto relative">
                <div className="absolute top-4 right-4 bg-white p-2 rounded-full border border-border shadow-sm text-foreground/50 hover:text-foreground cursor-pointer">
                  <Maximize size={16} />
                </div>
                
                <div className="max-w-2xl mx-auto bg-white border border-border shadow-sm p-12 min-h-[600px]">
                  <div className="w-16 h-16 bg-primary rounded-lg mb-12 flex items-center justify-center text-white text-2xl font-bold">
                    S
                  </div>
                  
                  <div className="space-y-6 text-sm text-foreground/80 leading-relaxed font-serif">
                    <p>May 30, 2026</p>
                    <p className="pt-4">
                      Dear <span className="bg-primary/10 text-primary px-1 rounded font-medium">{"{{Candidate Name}}"}</span>,
                    </p>
                    <p>
                      We are thrilled to offer you the position of Software Engineer at Studlyf. 
                      You will report to <span className="bg-primary/10 text-primary px-1 rounded font-medium">{"{{Manager}}"}</span> and your starting date will be <span className="bg-primary/10 text-primary px-1 rounded font-medium">{"{{Start Date}}"}</span>.
                    </p>
                    <p>
                      Your starting base salary will be <span className="bg-primary/10 text-primary px-1 rounded font-medium">{"{{Salary}}"}</span> per year, paid in accordance with the company's standard payroll schedule.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </section>
  );
}
