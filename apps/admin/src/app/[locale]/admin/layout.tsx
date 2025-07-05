"use client";

import { useSidebar } from "@/context/SidebarContext";
import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isHovered, isPinned, isMobileOpen } = useSidebar();

  // Dynamic class for main content margin based on sidebar state
  const isExpanded = isHovered || isPinned || isMobileOpen;
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded
    ? "lg:ml-[290px]"
    : "lg:ml-[90px]";

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar and Backdrop */}
      <AppSidebar />
      <Backdrop />
      
      {/* Main Content Area */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ease-in-out ${mainContentMargin} overflow-hidden`}
      >
        {/* Header - фиксированный */}
        <div className="flex-shrink-0">
        <AppHeader />
        </div>
        
        {/* Page Content - прокручиваемый */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-50 dark:bg-gray-900">
          <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6 w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
