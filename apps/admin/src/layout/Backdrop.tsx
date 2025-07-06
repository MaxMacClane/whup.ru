import { useSidebar } from "@/context/SidebarContext";
import React from "react";

const Backdrop: React.FC = () => {
  const { 
    isMobileOpen, 
    toggleMobileSidebar,
    isNotificationSidebarOpen,
    toggleNotificationSidebar 
  } = useSidebar();

  // Показываем backdrop только для сайдбаров (основного меню и уведомлений)
  const shouldShowBackdrop = isMobileOpen || isNotificationSidebarOpen;

  if (!shouldShowBackdrop) return null;

  const handleBackdropClick = () => {
    if (isMobileOpen) {
      toggleMobileSidebar();
    }
    if (isNotificationSidebarOpen) {
      toggleNotificationSidebar();
    }
  };

  return (
    <div
      className="fixed inset-0 z-30 bg-gray-900/50 lg:hidden"
      onClick={handleBackdropClick}
    />
  );
};

export default Backdrop;
