import React from "react";

interface AuthLayoutProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
}

export default function AuthLayout({ leftContent, rightContent }: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full bg-[#FAFAFA] flex items-center justify-center p-4 md:p-8 lg:p-12 selection:bg-primary/20">
      
      {/* 
        Main Container
        Split 50/50 Layout. Reversed on mobile (right side stacked below left side generally, 
        but we'll let the assembler handle order via flex-col-reverse if needed.
        Wait, for auth, usually the visual panel is hidden or stacked top/bottom. 
        We'll use flex-col md:flex-row to make it naturally stack.
      */}
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-[0_8px_40px_-12px_rgba(45,19,111,0.15)] flex flex-col lg:flex-row overflow-hidden border border-slate-100 min-h-[750px]">
        
        {/* Left Side (50%) */}
        <div className="w-full lg:w-1/2 flex flex-col relative z-10">
          {leftContent}
        </div>

        {/* Right Side (50%) */}
        <div className="w-full lg:w-1/2 flex flex-col relative z-10">
          {rightContent}
        </div>

      </div>
    </div>
  );
}
