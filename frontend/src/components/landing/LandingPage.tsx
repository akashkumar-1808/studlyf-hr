import React from "react";
import NavbarSection from "./NavbarSection";
import HeroSection from "./HeroSection";
import MetricsSection from "./MetricsSection";
import FeaturesSection from "./FeaturesSection";
import BenefitsSection from "./BenefitsSection";
import ProductPreviewSection from "./ProductPreviewSection";
import CTASection from "./CTASection";
import FooterSection from "./FooterSection";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      <NavbarSection />
      <HeroSection />
      <MetricsSection />
      <FeaturesSection />
      <BenefitsSection />
      <ProductPreviewSection />
      <CTASection />
      <FooterSection />
    </div>
  );
}
