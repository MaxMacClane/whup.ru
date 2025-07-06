"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

type SidebarContextType = {
  isMobileOpen: boolean;
  isHovered: boolean;
  isPinned: boolean;
  activeItem: string | null;
  openSubmenu: string | null;
  isApplicationMenuOpen: boolean;
  isNotificationSidebarOpen: boolean;
  toggleMobileSidebar: () => void;
  setIsHovered: (isHovered: boolean) => void;
  setPinned: (isPinned: boolean) => void;
  setActiveItem: (item: string | null) => void;
  toggleSubmenu: (item: string) => void;
  setApplicationMenuOpen: (isOpen: boolean) => void;
  toggleNotificationSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [isApplicationMenuOpen, setIsApplicationMenuOpen] = useState(false);
  const [isNotificationSidebarOpen, setIsNotificationSidebarOpen] = useState(false);

  // Восстановление состояния из localStorage при загрузке
  useEffect(() => {
    const savedPinnedState = localStorage.getItem('sidebarPinned');
    if (savedPinnedState === 'true') {
      setIsPinned(true);
    }
    
    // Восстанавливаем состояние панели настроек из localStorage (постоянное кэширование)
    const savedApplicationMenuState = localStorage.getItem('applicationMenuOpen');
    if (savedApplicationMenuState === 'true') {
      setIsApplicationMenuOpen(true);
    }

    // Восстанавливаем состояние мобильного sidebar
    const savedMobileState = localStorage.getItem('mobileSidebarOpen');
    if (savedMobileState === 'true') {
      setIsMobileOpen(true);
    }

    // Восстанавливаем состояние sidebar уведомлений
    const savedNotificationState = localStorage.getItem('notificationSidebarOpen');
    if (savedNotificationState === 'true') {
      setIsNotificationSidebarOpen(true);
    }
  }, []);

  // Сохранение состояний в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('applicationMenuOpen', isApplicationMenuOpen.toString());
  }, [isApplicationMenuOpen]);

  useEffect(() => {
    localStorage.setItem('mobileSidebarOpen', isMobileOpen.toString());
  }, [isMobileOpen]);

  useEffect(() => {
    localStorage.setItem('notificationSidebarOpen', isNotificationSidebarOpen.toString());
  }, [isNotificationSidebarOpen]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsMobileOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMobileSidebar = () => {
    setIsMobileOpen((prev) => !prev);
  };

  const toggleSubmenu = (item: string) => {
    setOpenSubmenu((prev) => (prev === item ? null : item));
  };

  const setPinned = (pinned: boolean) => {
    setIsPinned(pinned);
  };

  const setApplicationMenuOpen = (isOpen: boolean) => {
    setIsApplicationMenuOpen(isOpen);
  };

  const toggleNotificationSidebar = () => {
    setIsNotificationSidebarOpen((prev) => !prev);
  };

  return (
    <SidebarContext.Provider
      value={{
        isMobileOpen,
        isHovered,
        isPinned,
        activeItem,
        openSubmenu,
        isApplicationMenuOpen,
        isNotificationSidebarOpen,
        toggleMobileSidebar,
        setIsHovered,
        setPinned,
        setActiveItem,
        toggleSubmenu,
        setApplicationMenuOpen,
        toggleNotificationSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
