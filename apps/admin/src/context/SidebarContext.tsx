"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

type SidebarContextType = {
  isMobileOpen: boolean;
  isHovered: boolean;
  isPinned: boolean;
  activeItem: string | null;
  openSubmenu: string | null;
  isApplicationMenuOpen: boolean;
  toggleMobileSidebar: () => void;
  setIsHovered: (isHovered: boolean) => void;
  setPinned: (isPinned: boolean) => void;
  setActiveItem: (item: string | null) => void;
  toggleSubmenu: (item: string) => void;
  setApplicationMenuOpen: (isOpen: boolean) => void;
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

  // Восстановление состояния isPinned из localStorage при загрузке
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
  }, []);

  // Сохранение состояния панели настроек в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('applicationMenuOpen', isApplicationMenuOpen.toString());
  }, [isApplicationMenuOpen]);

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

  return (
    <SidebarContext.Provider
      value={{
        isMobileOpen,
        isHovered,
        isPinned,
        activeItem,
        openSubmenu,
        isApplicationMenuOpen,
        toggleMobileSidebar,
        setIsHovered,
        setPinned,
        setActiveItem,
        toggleSubmenu,
        setApplicationMenuOpen,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
