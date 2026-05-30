"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function NavbarSection() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Left: Logo */}
        <Link href="/" className="block group">
          <Image 
            src="/studlyf.png" 
            alt="Studlyf Logo" 
            width={180} 
            height={56} 
            className="h-12 md:h-14 w-auto object-contain transition-transform group-hover:scale-[1.02]"
            priority
          />
        </Link>

        {/* Center: Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {["Features", "Templates", "How It Works", "Pricing", "About"].map((item) => (
            <Link 
              key={item} 
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Right: CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link 
            href="/login" 
            className="text-sm font-medium text-foreground px-4 py-2 hover:bg-muted rounded-full transition-colors"
          >
            Log In
          </Link>
          <Link 
            href="/signup" 
            className="text-sm font-medium text-white px-5 py-2.5 rounded-full bg-gradient-to-r from-primary to-secondary shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-border shadow-lg py-4 px-6 flex flex-col space-y-4">
          {["Features", "Templates", "How It Works", "Pricing", "About"].map((item) => (
            <Link 
              key={item} 
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-sm font-medium text-foreground/80 hover:text-primary py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
          <div className="h-px bg-border w-full my-2"></div>
          <Link 
            href="/login" 
            className="text-sm font-medium text-foreground py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Log In
          </Link>
          <Link 
            href="/signup" 
            className="text-sm font-medium text-white text-center py-3 rounded-xl bg-gradient-to-r from-primary to-secondary mt-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}
