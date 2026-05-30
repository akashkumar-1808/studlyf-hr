import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden bg-white">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-12 md:p-20 text-center shadow-2xl overflow-hidden relative">
          
          {/* Subtle background glow inside the card */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-accent/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight max-w-2xl mx-auto">
              Ready to automate your HR document workflows?
            </h2>
            <p className="text-white/80 text-lg max-w-xl mx-auto">
              Join hundreds of enterprise teams already using Studlyf to send professional, secure, and branded employment letters.
            </p>
            
            <div className="pt-6 flex justify-center">
              <Link 
                href="/signup" 
                className="flex items-center gap-2 text-base font-bold text-primary bg-white px-10 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Start for Free
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
