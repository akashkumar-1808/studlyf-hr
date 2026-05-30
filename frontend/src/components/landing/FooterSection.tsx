import React from "react";
import Link from "next/link";

export default function FooterSection() {
  return (
    <footer className="bg-background border-t border-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          
          <div className="col-span-2 lg:col-span-2 space-y-4 pr-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-primary flex items-center justify-center text-white text-xs font-bold">
                S
              </div>
              <span className="text-lg font-semibold tracking-tight text-foreground">Studlyf</span>
            </Link>
            <p className="text-sm text-foreground/60 leading-relaxed max-w-xs">
              The premium document generation platform built specifically for modern HR and enterprise teams.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Product</h4>
            <ul className="space-y-3">
              {["Features", "Templates", "Integrations", "Pricing", "Changelog"].map(link => (
                <li key={link}>
                  <Link href="#" className="text-sm text-foreground/60 hover:text-primary transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Company</h4>
            <ul className="space-y-3">
              {["About Us", "Careers", "Blog", "Contact", "Partners"].map(link => (
                <li key={link}>
                  <Link href="#" className="text-sm text-foreground/60 hover:text-primary transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Legal</h4>
            <ul className="space-y-3">
              {["Terms of Service", "Privacy Policy", "Security", "Cookie Policy"].map(link => (
                <li key={link}>
                  <Link href="#" className="text-sm text-foreground/60 hover:text-primary transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-foreground/50">
            © {new Date().getFullYear()} Studlyf Inc. All rights reserved.
          </p>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-foreground/50 hover:text-primary hover:bg-primary/10 cursor-pointer transition-colors">
              <span className="text-xs">Tw</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-foreground/50 hover:text-primary hover:bg-primary/10 cursor-pointer transition-colors">
              <span className="text-xs">In</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
