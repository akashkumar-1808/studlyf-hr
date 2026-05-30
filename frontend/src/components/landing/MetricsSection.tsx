import React from "react";

export default function MetricsSection() {
  const metrics = [
    { value: "10k+", label: "HR Professionals" },
    { value: "2M+", label: "Documents Generated" },
    { value: "15hrs", label: "Time Saved Weekly" },
    { value: "100%", label: "Secure & Compliant" },
  ];

  return (
    <section className="py-12 bg-background relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 md:p-12 shadow-xl shadow-primary/10 border border-primary/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x divide-white/20">
            {metrics.map((metric, index) => (
              <div key={index} className="flex flex-col items-center justify-center text-center px-4">
                <span className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
                  {metric.value}
                </span>
                <span className="text-sm font-medium text-white/80">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
