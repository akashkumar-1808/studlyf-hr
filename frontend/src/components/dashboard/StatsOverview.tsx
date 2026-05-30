import React, { useEffect, useState } from "react";
import { FileText, Send, Layers, Clock } from "lucide-react";
import { fetchAPI } from "@/lib/api";

export default function StatsOverview() {
  const [metrics, setMetrics] = useState({
    documentsCreated: 0,
    recentExports: 0,
    activeTemplates: 0,
    timeSaved: "0 mins"
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const data = await fetchAPI('/api/dashboard/metrics');
        setMetrics(data);
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to fetch metrics", err);
        setIsLoading(false);
      }
    };
    fetchMetrics();
  }, []);

  const stats = [
    { name: "Documents Created", value: metrics.documentsCreated.toString(), icon: FileText, trend: "Total drafted" },
    { name: "Recent Exports", value: metrics.recentExports.toString(), icon: Send, trend: "Total exports" },
    { name: "Active Templates", value: metrics.activeTemplates.toString(), icon: Layers, trend: "Standard library" },
    { name: "Time Saved", value: metrics.timeSaved, icon: Clock, trend: "Based on 10 min/doc" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-500 mb-1">{stat.name}</p>
            {isLoading ? (
               <div className="h-8 w-16 bg-slate-100 rounded animate-pulse mt-1 mb-2"></div>
            ) : (
               <p className="text-2xl font-bold text-slate-900 tracking-tight">{stat.value}</p>
            )}
            <p className="text-xs font-medium text-slate-400 mt-1">{stat.trend}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">
            <stat.icon className="w-5 h-5 text-slate-400" />
          </div>
        </div>
      ))}
    </div>
  );
}
