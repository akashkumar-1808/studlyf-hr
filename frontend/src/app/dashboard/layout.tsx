"use client"

import React, { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuthStore } from "@/store/authStore"
import { useUiStore } from "@/store/uiStore"
import DashboardSidebar from "@/components/dashboard/DashboardSidebar"
import DashboardNavbar from "@/components/dashboard/DashboardNavbar"
import BuilderHeader from "@/components/builder/BuilderHeader"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, checkAuth } = useAuthStore()
  const { isSidebarCollapsed } = useUiStore()
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  const isBuilderPage = pathname === "/dashboard/documents/new" || pathname.startsWith("/dashboard/builder");

  useEffect(() => {
    checkAuth()
    setMounted(true)
  }, [checkAuth])

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isLoading, isAuthenticated, router])

  if (isLoading || !mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated) return null

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Fixed Sidebar */}
      <DashboardSidebar />

      {/* Main Content Area */}
      <div 
        className={`flex flex-col min-h-screen transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? 'lg:pl-[88px]' : 'lg:pl-[280px]'
        }`}
      >
        {isBuilderPage ? <BuilderHeader /> : <DashboardNavbar />}
        
        <main className="flex-1 max-w-[1900px] w-full mx-auto pt-[88px]">
          {children}
        </main>
      </div>
    </div>
  )
}
