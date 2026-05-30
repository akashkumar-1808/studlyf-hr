import React from "react";
import { FileSignature, Settings, FileSearch, Download, Send, LayoutTemplate } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: <LayoutTemplate size={24} />,
      title: "Offer Letter Generator",
      description: "Build robust offer letter templates with dynamic variables for seamless generation."
    },
    {
      icon: <FileSignature size={24} />,
      title: "Joining Letter Generator",
      description: "Automate onboarding documentation with compliant, pre-approved joining letter layouts."
    },
    {
      icon: <Settings size={24} />,
      title: "Company Branding",
      description: "Enforce brand consistency across all documents with locked logos, colors, and fonts."
    },
    {
      icon: <FileSearch size={24} />,
      title: "Live Preview",
      description: "See your document exactly as the candidate will see it, updated in real-time as you type."
    },
    {
      icon: <Download size={24} />,
      title: "Export Anywhere",
      description: "Instantly export pixel-perfect documents to secure PDF, editable DOCX, or high-res JPG."
    },
    {
      icon: <Send size={24} />,
      title: "One-Click Delivery",
      description: "Distribute encrypted documents directly to candidates via email with full audit logging."
    }
  ];

  return (
    <section id="features" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-sm font-semibold text-primary uppercase tracking-wider">Features</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Everything you need to automate HR documents.
          </h3>
          <p className="text-lg text-foreground/70">
            Stop manually editing word docs. Start generating flawless, compliant letters in seconds.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx}
              className="group p-8 rounded-2xl bg-white border border-border shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-primary/20 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-muted text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h4>
              <p className="text-foreground/70 leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
