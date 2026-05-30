import React from "react";
import Link from "next/link";
import { ArrowRight, Play, CheckCircle2, Shield, Zap, Download } from "lucide-react";
import AnimatedGlowBackground from "./AnimatedGlowBackground";

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      <AnimatedGlowBackground />
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left: Content */}
        <div className="space-y-8 relative z-10">
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-sm font-medium">
            <Zap size={14} className="text-accent" />
            AI-Powered HR Document Platform
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
            Professional HR Letters in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">Minutes.</span>
          </h1>

          <p className="text-lg md:text-xl text-foreground/70 max-w-xl leading-relaxed">
            Create, manage, and distribute premium offer letters and employment documents. Built for modern HR teams who value speed, precision, and brand identity.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <Link 
              href="/signup" 
              className="w-full sm:w-auto flex items-center justify-center gap-2 text-base font-medium text-white px-8 py-3.5 rounded-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5"
            >
              Get Started Free
              <ArrowRight size={18} />
            </Link>
            <button 
              className="w-full sm:w-auto flex items-center justify-center gap-2 text-base font-medium text-foreground px-8 py-3.5 rounded-full bg-white border border-border shadow-sm hover:bg-muted transition-all"
            >
              <Play size={18} className="text-secondary" fill="currentColor" />
              Watch Demo
            </button>
          </div>

          <div className="flex items-center gap-6 pt-6 text-sm font-medium text-foreground/60">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-accent" />
              <span>No Credit Card</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-accent" />
              <span>Setup in 2 Minutes</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-accent" />
              <span>Loved by HR Teams</span>
            </div>
          </div>
        </div>

        {/* Right: Mockup */}
        <div className="relative z-10 hidden md:block">
          {/* Decorative background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-primary/10 via-secondary/10 to-accent/10 blur-3xl rounded-full -z-10" />
          
          <div className="relative rounded-2xl bg-white border border-border shadow-[0_20px_60px_-15px_rgba(45,19,111,0.15)] overflow-hidden">
            
            {/* Mockup Top Bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/50">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="text-xs font-medium text-foreground/50 bg-white px-3 py-1 rounded-md border border-border">
                dashboard/documents/new
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center">
                  <Shield size={12} className="text-primary" />
                </div>
              </div>
            </div>

            {/* Mockup Body (Split Builder View) */}
            <div className="flex h-[400px]">
              
              {/* Left Panel (Controls) */}
              <div className="w-2/5 border-r border-border bg-white p-4 space-y-4">
                <div className="h-4 w-24 bg-muted rounded" />
                <div className="space-y-3 pt-2">
                  <div className="space-y-1.5">
                    <div className="h-3 w-16 bg-muted rounded" />
                    <div className="h-8 w-full bg-background border border-border rounded flex items-center px-2">
                      <span className="text-[10px] text-foreground">Jane Doe</span>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-3 w-20 bg-muted rounded" />
                    <div className="h-8 w-full bg-background border border-border rounded flex items-center px-2">
                      <span className="text-[10px] text-foreground">Senior Engineer</span>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-3 w-12 bg-muted rounded" />
                    <div className="h-8 w-full bg-background border border-border rounded flex items-center px-2">
                      <span className="text-[10px] text-foreground">$140,000</span>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border mt-4">
                  <div className="flex gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary" />
                    <div className="w-5 h-5 rounded-full bg-secondary" />
                    <div className="w-5 h-5 rounded-full bg-accent" />
                  </div>
                </div>
              </div>

              {/* Right Panel (Live Document Preview) */}
              <div className="w-3/5 bg-background p-6 relative flex justify-center">
                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-border shadow-sm">
                    <Download size={14} className="text-primary" />
                    <span className="text-xs font-medium">Export</span>
                  </div>
                </div>
                
                {/* Document Sheet */}
                <div className="w-[85%] bg-white rounded shadow-sm border border-border p-6 flex flex-col mt-4">
                  <div className="flex justify-between items-start mb-6 border-b border-border pb-4">
                    <div className="w-8 h-8 bg-primary rounded" />
                    <div className="space-y-1 text-right">
                      <div className="h-2 w-16 bg-muted rounded ml-auto" />
                      <div className="h-2 w-24 bg-muted rounded ml-auto" />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="h-2 w-20 bg-muted rounded" />
                    <div className="h-3 w-32 bg-primary/20 rounded mt-4" />
                    
                    <div className="space-y-2 pt-2">
                      <div className="h-2 w-full bg-muted rounded" />
                      <div className="h-2 w-full bg-muted rounded" />
                      <div className="h-2 w-3/4 bg-muted rounded" />
                    </div>
                    
                    <div className="space-y-2 pt-2">
                      <div className="h-2 w-full bg-muted rounded" />
                      <div className="h-2 w-4/5 bg-muted rounded" />
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-8 flex justify-between">
                    <div className="space-y-1 w-20">
                      <div className="h-10 w-full border-b border-muted" />
                      <div className="h-2 w-12 bg-muted rounded" />
                    </div>
                    <div className="space-y-1 w-20">
                      <div className="h-10 w-full border-b border-muted" />
                      <div className="h-2 w-16 bg-muted rounded" />
                    </div>
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
