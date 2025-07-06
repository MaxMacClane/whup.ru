"use client";

import { useSidebar } from "@/context/SidebarContext";
import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";
import MobileNotificationSidebar from "@/components/header/MobileNotificationSidebar";
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
    <div className="relative">
      {/* Sidebar and Backdrop */}
      <AppSidebar />
      <MobileNotificationSidebar />
      <Backdrop />
      {/* Main Content Area */}
      <div
        className={`transition-all duration-300 ease-in-out ${mainContentMargin}`}
      >
        {/* Header */}
        <AppHeader />
        {/* Page Content */}
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6 mobile-scroll">{children}</div>
      </div>
    </div>
  );
}
