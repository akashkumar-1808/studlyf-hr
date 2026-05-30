import React from "react";
import { CheckCircle } from "lucide-react";

export default function BenefitsSection() {
  const benefits = [
    {
      title: "Enterprise-Grade Security",
      description: "SOC2 compliant infrastructure with end-to-end encryption. Your candidate data is strictly protected and never shared."
    },
    {
      title: "100% Legal Compliance",
      description: "Ensure no contract leaves your organization without mandatory legal clauses, eliminating human error."
    },
    {
      title: "Seamless ATS Integration",
      description: "Connect directly to Workday, Greenhouse, or Lever. Auto-populate candidate details instantly."
    }
  ];

  return (
    <section className="py-24 bg-white border-y border-border">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left: Copy */}
        <div className="space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight leading-tight">
            Built for enterprise HR teams who demand perfection.
          </h2>
          <p className="text-lg text-foreground/70">
            Speed shouldn't compromise security or compliance. Studlyf provides a zero-error environment for generating critical employment documents.
          </p>
          
          <div className="space-y-6 pt-4">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <CheckCircle size={24} className="text-primary" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-foreground mb-1">{benefit.title}</h4>
                  <p className="text-foreground/70 leading-relaxed text-sm">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Trust Visual */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-secondary/5 rounded-3xl -rotate-3 scale-105" />
          <div className="relative bg-muted rounded-3xl p-8 border border-border shadow-sm flex flex-col items-center justify-center min-h-[400px] text-center">
             <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-border flex items-center justify-center mb-6">
               <span className="text-2xl font-bold text-primary">S</span>
             </div>
             <h3 className="text-2xl font-bold text-foreground mb-4">Trusted by 500+ Enterprises</h3>
             <p className="text-foreground/70 max-w-sm mb-8">
               Join industry leaders who rely on Studlyf for their critical HR operations.
             </p>
             <div className="grid grid-cols-2 gap-4 w-full">
               {[1, 2, 3, 4].map(i => (
                 <div key={i} className="h-12 bg-white rounded-lg border border-border flex items-center justify-center opacity-70">
                   <div className="h-3 w-16 bg-foreground/20 rounded-full" />
                 </div>
               ))}
             </div>
          </div>
        </div>

      </div>
    </section>
  );
}
