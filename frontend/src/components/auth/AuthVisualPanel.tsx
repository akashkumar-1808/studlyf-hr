import React from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import AnimatedGlowBackground from "./AnimatedGlowBackground";

interface AuthVisualPanelProps {
  variant: "login" | "signup";
}

export default function AuthVisualPanel({ variant }: AuthVisualPanelProps) {
  const isLogin = variant === "login";

  return (
    <div className="relative w-full h-full min-h-[400px] lg:min-h-full bg-[#150738] flex flex-col justify-between p-10 lg:p-16 overflow-hidden">
      {/* Animated Background inside the panel */}
      <AnimatedGlowBackground />

      {/* Top: Logo */}
      <div className="relative z-10 mb-12">
        <Image 
          src="/studlyf.png" 
          alt="Studlyf Logo" 
          width={160} 
          height={52} 
          className="h-10 lg:h-12 w-auto object-contain"
          priority
        />
      </div>

      {/* Middle: Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center">
        {isLogin ? (
          <div className="space-y-8">
            <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.1]">
              Welcome back<br />
              to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EC2F8F] to-[#FF5A5F]">Studlyf</span>
            </h1>
            
            <p className="text-lg text-white/80 max-w-sm leading-relaxed">
              Your all-in-one HR document platform for modern teams.
            </p>

            <ul className="space-y-4 pt-4">
              {[
                "Create HR letters in minutes",
                "Smart templates for every need",
                "Secure, compliant & reliable"
              ].map((bullet, idx) => (
                <li key={idx} className="flex items-center gap-3 text-white/90 font-medium">
                  <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 size={14} className="text-[#EC2F8F]" />
                  </div>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="space-y-8">
            <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.1]">
              Welcome to<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EC2F8F] to-[#FF5A5F]">Studlyf</span>
            </h1>
            
            <p className="text-lg text-white/80 max-w-sm leading-relaxed">
              The smarter way to create, manage and deliver HR documents.
            </p>

            <ul className="space-y-4 pt-4">
              {[
                "Offer Letters",
                "Joining Letters",
                "Experience Certificates",
                "And much more..."
              ].map((bullet, idx) => (
                <li key={idx} className="flex items-center gap-3 text-white/90 font-medium">
                  <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 size={12} className="text-white" />
                  </div>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Bottom: Trust Footer or Floating Visual */}
      <div className="relative z-10 pt-12 mt-auto">
        {isLogin ? (
          <div className="space-y-3">
            <p className="text-sm font-medium text-white/70">Trusted by 10,000+ HR Teams</p>
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#150738] bg-white/20 backdrop-blur overflow-hidden relative">
                  <Image 
                    src={`https://i.pravatar.cc/100?img=${i + 10}`} 
                    alt="User" 
                    fill 
                    className="object-cover" 
                    unoptimized
                  />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-[#150738] bg-white text-[#2D136F] flex items-center justify-center text-xs font-bold z-10 shadow-lg">
                +
              </div>
            </div>
          </div>
        ) : (
          /* Signup Variant: Floating Mockup Graphic */
          <div className="relative h-48 w-full max-w-md bg-white/5 rounded-t-2xl border border-white/10 backdrop-blur-md p-6 overflow-hidden flex flex-col items-center shadow-2xl translate-y-16 lg:translate-y-0 lg:mt-8">
             {/* Mockup Window */}
             <div className="w-full bg-white rounded-xl shadow-xl overflow-hidden border border-white/20">
                <div className="h-6 bg-slate-100 border-b border-slate-200 flex items-center px-3 gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                </div>
                <div className="p-4 flex gap-4">
                   <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#EC2F8F] to-[#FF5A5F] shrink-0" />
                   <div className="flex-1 space-y-2">
                     <div className="h-3 bg-slate-200 rounded w-3/4"></div>
                     <div className="h-2 bg-slate-100 rounded w-1/2"></div>
                     <div className="h-2 bg-slate-100 rounded w-5/6"></div>
                   </div>
                </div>
             </div>
             
             {/* Floating Checkmark Badge */}
             <div className="absolute bottom-12 right-6 w-12 h-12 rounded-xl bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/40 flex items-center justify-center transform rotate-12">
               <CheckCircle2 className="text-white w-6 h-6" />
             </div>
          </div>
        )}
      </div>

    </div>
  );
}
