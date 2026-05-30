"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Bell, Search, ChevronRight, LogOut, User as UserIcon } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useUiStore } from "@/store/uiStore";

export default function DashboardNavbar() {
  const { user, logout } = useAuthStore();
  const pathname = usePathname();
  const [profileOpen, setProfileOpen] = useState(false);
  const { toggleSidebar, isSidebarCollapsed } = useUiStore();

  // Generate simple breadcrumbs from pathname
  const segments = pathname.split("/").filter(Boolean);
  const isDashboardRoot = segments.length === 1 && segments[0] === "dashboard";

  return (
    <header className={`fixed top-0 right-0 z-30 flex h-[88px] shrink-0 items-center gap-x-4 border-b border-slate-200 bg-white/80 backdrop-blur-md px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8 transition-all duration-300 ease-in-out ${
      isSidebarCollapsed ? 'left-0 lg:left-[88px]' : 'left-0 lg:left-[280px]'
    }`}>
      
      {/* Mobile Menu Toggle & Logo */}
      <div className="flex items-center gap-4 lg:hidden">
        <button type="button" onClick={toggleSidebar} className="-m-2.5 p-2.5 text-slate-700 lg:hidden hover:bg-slate-100 rounded-lg">
          <span className="sr-only">Open sidebar</span>
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
        <Image src="/studlyf.png" alt="Studlyf Logo" width={100} height={28} className="h-6 w-auto object-contain" />
      </div>

      {/* Desktop Toggle (Optional but requested) */}
      <div className="hidden lg:flex items-center">
        <button type="button" onClick={toggleSidebar} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors -ml-2 mr-2">
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <div className="flex flex-1 items-center justify-between gap-x-4 lg:gap-x-6">
        
        {/* Breadcrumbs (Desktop) */}
        <div className="hidden lg:flex items-center gap-2">
           {!isDashboardRoot && (
             <>
               <Link href="/dashboard" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
                 Dashboard
               </Link>
               <ChevronRight className="w-4 h-4 text-slate-400" />
               <span className="text-sm font-semibold text-slate-900 capitalize">
                 {segments[segments.length - 1].replace(/-/g, " ")}
               </span>
             </>
           )}
        </div>

        {/* Global Search (Placeholder for V1) */}
        <div className="flex flex-1 lg:ml-0 lg:max-w-md ml-auto">
          <div className="relative w-full max-w-sm hidden md:block">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-slate-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              name="search"
              id="search"
              className="block w-full rounded-full border-0 py-1.5 pl-10 pr-3 text-slate-900 ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 bg-slate-50"
              placeholder="Search documents..."
            />
          </div>
        </div>

        <div className="flex items-center gap-x-4 lg:gap-x-6">
          {/* Notifications */}
          <button type="button" className="-m-2.5 p-2.5 text-slate-400 hover:text-slate-500 hover:bg-slate-50 rounded-full transition-colors relative">
            <span className="sr-only">View notifications</span>
            <Bell className="h-5 w-5" aria-hidden="true" />
            <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-red-500 border-2 border-white"></span>
          </button>

          {/* Separator */}
          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-slate-200" aria-hidden="true" />

          {/* Profile dropdown */}
          <div className="relative">
            <button 
              type="button" 
              className="-m-1.5 flex items-center p-1.5 hover:bg-slate-50 rounded-lg transition-colors"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <span className="sr-only">Open user menu</span>
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold text-xs shadow-sm shadow-primary/20">
                {user?.fullName?.charAt(0) || "U"}
              </div>
              <span className="hidden lg:flex lg:items-center ml-3">
                <span className="text-sm font-semibold leading-6 text-slate-900" aria-hidden="true">
                  {user?.fullName || "User"}
                </span>
              </span>
            </button>

            {/* Dropdown Menu */}
            {profileOpen && (
              <div className="absolute right-0 z-10 mt-2.5 w-48 origin-top-right rounded-xl bg-white py-2 shadow-lg ring-1 ring-slate-900/5 focus:outline-none animate-in fade-in slide-in-from-top-2 border border-slate-100">
                <div className="px-4 py-2 border-b border-slate-100 mb-1">
                   <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Account</p>
                   <p className="text-sm font-bold text-slate-900 truncate mt-0.5">{user?.email}</p>
                </div>
                <Link
                  href="/dashboard/profile"
                  className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-medium flex items-center gap-2"
                  onClick={() => setProfileOpen(false)}
                >
                  <UserIcon size={16} />
                  Your Profile
                </Link>
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    logout();
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-destructive hover:bg-destructive/10 font-bold flex items-center gap-2 transition-colors"
                >
                  <LogOut size={16} />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
