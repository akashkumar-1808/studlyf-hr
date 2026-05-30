"use client";

import React from 'react';
import { History, FileText, Palette, User, Download } from 'lucide-react';

export default function ActivitySection() {
  const activities = [
    {
      id: 1,
      title: 'Created Offer Letter',
      description: 'Offer letter generated for Akash Kumar',
      time: '2 hours ago',
      icon: <FileText size={16} className="text-primary" />,
      bg: 'bg-primary/10'
    },
    {
      id: 2,
      title: 'Updated Branding',
      description: 'Changed default border color to Corporate Red',
      time: '1 day ago',
      icon: <Palette size={16} className="text-emerald-600" />,
      bg: 'bg-emerald-50'
    },
    {
      id: 3,
      title: 'Exported PDF',
      description: 'Downloaded Joining Letter for Review',
      time: '2 days ago',
      icon: <Download size={16} className="text-amber-600" />,
      bg: 'bg-amber-50'
    },
    {
      id: 4,
      title: 'Modified Profile',
      description: 'Updated designation to HR Administrator',
      time: '1 week ago',
      icon: <User size={16} className="text-blue-600" />,
      bg: 'bg-blue-50'
    }
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <History size={18} className="text-slate-400" />
          <h3 className="font-bold text-slate-800">Recent Activity</h3>
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-6">
          {activities.map((activity, index) => (
            <div key={activity.id} className="relative flex gap-4">
              {/* Timeline line */}
              {index !== activities.length - 1 && (
                <div className="absolute top-8 bottom-[-24px] left-5 w-px bg-slate-100"></div>
              )}
              
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 ${activity.bg}`}>
                {activity.icon}
              </div>
              
              <div className="flex-1 pt-1">
                <h4 className="text-sm font-semibold text-slate-800">{activity.title}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{activity.description}</p>
                <p className="text-[11px] font-medium text-slate-400 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
