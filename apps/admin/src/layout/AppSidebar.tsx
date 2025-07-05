'use client';
"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useParams } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import {
  BoxCubeIcon,
  CalenderIcon,
  ChevronDownIcon,
  GridIcon,
  ListIcon,
  PageIcon,
  PieChartIcon,
  PlugInIcon,
  TableIcon,
  UserCircleIcon,
  ArrowRightIcon,
  SidebarLeftIcon,
} from "../icons/index";
import { useLanguage } from "@/hooks/useLanguage";

// Модифицируем NavItem для поддержки ключей перевода
type NavItem = {
  translationKey: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { 
    translationKey: string; 
    path: string; 
    pro?: boolean; 
    new?: boolean 
  }[];
};

const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    translationKey: "Common.navigation.dashboard",
    subItems: [{ translationKey: "Common.navigation.ecommerce", path: "/admin", pro: false }],
  },
  {
    icon: <CalenderIcon />,
    translationKey: "Common.navigation.calendar",
    path: "/admin/calendar",
  },
  {
    icon: <UserCircleIcon />,
    translationKey: "Common.navigation.profile",
    path: "/admin/profile",
  },

  {
    translationKey: "Common.navigation.forms",
    icon: <ListIcon />,
    subItems: [{ translationKey: "Common.navigation.elements", path: "/admin/form-elements", pro: false }],
  },
  {
    translationKey: "Common.navigation.tables",
    icon: <TableIcon />,
    subItems: [{ translationKey: "Common.navigation.basic", path: "/admin/basic-tables", pro: false }],
  },
  {
    translationKey: "Common.navigation.pages",
    icon: <PageIcon />,
    subItems: [
      { translationKey: "Common.navigation.blank", path: "/admin/blank", pro: false },
      { translationKey: "Common.navigation.error404", path: "/admin/error-404", pro: false },
      { translationKey: "Логотипы", path: "/admin/logos", pro: false },
    ],
  },
];

const othersItems: NavItem[] = [
  {
    icon: <PieChartIcon />,
    translationKey: "Common.navigation.charts",
    subItems: [
      { translationKey: "Common.navigation.line", path: "/admin/line-chart", pro: false },
      { translationKey: "Common.navigation.bar", path: "/admin/bar-chart", pro: false },
    ],
  },
  {
    icon: <BoxCubeIcon />,
    translationKey: "Common.navigation.uiElements",
    subItems: [
      { translationKey: "Common.navigation.alerts", path: "/admin/alerts", pro: false },
      { translationKey: "Common.navigation.avatar", path: "/admin/avatars", pro: false },
      { translationKey: "Common.navigation.badge", path: "/admin/badge", pro: false },
      { translationKey: "Common.navigation.buttons", path: "/admin/buttons", pro: false },
      { translationKey: "Common.navigation.images", path: "/admin/images", pro: false },
      { translationKey: "Common.navigation.videos", path: "/admin/videos", pro: false },
    ],
  },
  {
    icon: <PlugInIcon />,
    translationKey: "Common.navigation.auth",
    subItems: [
      { translationKey: "Common.navigation.signIn", path: "/signin", pro: false },
      { translationKey: "Common.navigation.signUp", path: "/signup", pro: false },
    ],
  },
];

interface IconProps {
  className?: string;
}

const StyledChevronDownIcon = ({ className }: IconProps) => (
  <ChevronDownIcon className={className} />
);

const AppSidebar: React.FC = () => {
  const { isMobileOpen, isHovered, isPinned, setIsHovered, setPinned, toggleMobileSidebar, isApplicationMenuOpen } = useSidebar();
  const pathname = usePathname();
  const params = useParams();
  const locale = params?.locale as string || 'ru';
  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const { t } = useLanguage();
  const [showTooltip, setShowTooltip] = useState(false);
  const [showSidebarIcon, setShowSidebarIcon] = useState(false);

  // Логика состояния сайдбара: развернут если наведен ИЛИ закреплен
  const isExpanded = isHovered || isPinned || isMobileOpen;

  // Управление появлением иконки сайдбара с задержкой после названия
  useEffect(() => {
    if (isExpanded && !isPinned) {
      // Задержка для появления иконки после анимации названия (300ms - точно когда заканчивается анимация названия)
      const timer = setTimeout(() => {
        setShowSidebarIcon(true);
      }, 300);
      return () => clearTimeout(timer);
    } else if (isPinned) {
      // Для закрепленного состояния показываем сразу
      setShowSidebarIcon(true);
    } else {
      // Скрываем сразу при сворачивании
      setShowSidebarIcon(false);
    }
  }, [isExpanded, isPinned]);

  const handleSidebarClick = (e: React.MouseEvent) => {
    // Если это мобильная версия и сайдбар открыт, закрываем его
    if (isMobileOpen) {
      toggleMobileSidebar();
      return;
    }
    
    // Десктопная логика - переключаем закрепление
    if (isExpanded && !isMobileOpen) {
      setPinned(!isPinned);
    }
  };

  const handleContentClick = (e: React.MouseEvent) => {
    // Останавливаем всплытие события, чтобы клик по контенту не закрывал сайдбар
    e.stopPropagation();
  };

  // Функция для создания локализованного пути
  const createLocalizedPath = useCallback((path: string) => {
    return `/${locale}${path}`;
  }, [locale]);

  // Функция для проверки активности пути
  const isActive = useCallback((path: string) => {
    const localizedPath = createLocalizedPath(path);
    return pathname === localizedPath;
  }, [pathname, createLocalizedPath]);

  useEffect(() => {
    // Check if the current path matches any submenu item
    let submenuMatched = false;
    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? navItems : othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType as "main" | "others",
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    // If no submenu item matches, close the open submenu
    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [pathname, isActive]);

  useEffect(() => {
    // Set the height of the submenu items when the submenu is opened
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  const renderMenuItems = (
    navItems: NavItem[],
    menuType: "main" | "others"
  ) => {
    return (
    <ul className="flex flex-col gap-4">
      {navItems.map((nav, index) => (
        <li key={nav.translationKey}>
          {nav.subItems ? (
            <button
              onClick={(e) => {
                handleSubmenuToggle(index, menuType);
                handleContentClick(e);
              }}
                className={`menu-item group relative overflow-hidden cursor-pointer ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              }`}
            >
                <div className="flex items-center w-full">
                  {/* Иконка - всегда в фиксированной позиции */}
              <span
                    className={`flex-shrink-0 w-6 h-6 flex items-center justify-center ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>
                  
                  {/* Текст - появляется плавно */}
                  <span 
                    className={`menu-item-text ml-3 whitespace-nowrap transition-all duration-300 ${
                      isExpanded 
                        ? "opacity-100 translate-x-0" 
                        : "opacity-0 translate-x-2"
                    }`}
                    style={{
                      width: isExpanded ? 'auto' : '0px',
                      overflow: 'hidden'
                    }}
                  >
                  {t(nav.translationKey)}
                </span>
                  
                  {/* Стрелка - появляется плавно */}
                  {isExpanded && (
                <StyledChevronDownIcon
                      className={`ml-auto w-5 h-5 transition-all duration-300 ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                          ? "rotate-180 text-brand-500 opacity-100"
                          : "opacity-100"
                      } ${
                        !isExpanded 
                          ? "opacity-0 translate-x-2" 
                          : "opacity-100 translate-x-0"
                  }`}
                />
              )}
                </div>
            </button>
          ) : (
            nav.path && (
              <Link
                  href={createLocalizedPath(nav.path)}
                  className={`menu-item group relative overflow-hidden cursor-pointer ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                }`}
                  onClick={handleContentClick}
              >
                  <div className="flex items-center w-full">
                    {/* Иконка - всегда в фиксированной позиции */}
                <span
                      className={`flex-shrink-0 w-6 h-6 flex items-center justify-center ${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                    
                    {/* Текст - появляется плавно */}
                    <span 
                      className={`menu-item-text ml-3 whitespace-nowrap transition-all duration-300 ${
                        isExpanded 
                          ? "opacity-100 translate-x-0" 
                          : "opacity-0 translate-x-2"
                      }`}
                      style={{
                        width: isExpanded ? 'auto' : '0px',
                        overflow: 'hidden'
                      }}
                    >
                    {t(nav.translationKey)}
                  </span>
                  </div>
              </Link>
            )
          )}
            {nav.subItems && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
                className={`overflow-hidden transition-all duration-300 ${
                  !isExpanded 
                    ? "opacity-0" 
                    : "opacity-100"
                }`}
              style={{
                height:
                    openSubmenu?.type === menuType && openSubmenu?.index === index && isExpanded
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.translationKey}>
                    <Link
                        href={createLocalizedPath(subItem.path)}
                      className={`menu-dropdown-item cursor-pointer ${
                        isActive(subItem.path)
                          ? "menu-dropdown-item-active"
                          : "menu-dropdown-item-inactive"
                      }`}
                      onClick={handleContentClick}
                    >
                      {t(subItem.translationKey)}
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge `}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge `}
                          >
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
  };

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded
            ? `w-[290px] ${isPinned ? 'cursor-w-resize' : 'cursor-e-resize'}`
            : "w-[90px] cursor-e-resize"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleSidebarClick}
    >
            <div className="py-2 flex items-center relative" onClick={handleContentClick}>
        {/* Логотип - всегда фиксированный размер и позиция - скрыт в мобильной версии */}
        <div className="hidden lg:flex items-center">
          <Link href={createLocalizedPath("/admin")} className="flex items-center" onClick={handleContentClick}>
            {/* Иконка логотипа - всегда показана, разные для светлой и темной темы */}
              <Image
              className="flex-shrink-0 dark:hidden"
              src="/images/logo/logo-1.svg"
              alt="Whup.ru Logo"
              width={40}
              height={25}
              />
            <Image
              className="flex-shrink-0 hidden dark:block"
              src="/images/logo/logo-2.svg"
              alt="Whup.ru Logo"
              width={40}
              height={25}
            />
            
            {/* Название - появляется плавно с меньшей задержкой */}
            <div 
              className={`ml-3 transition-all duration-300 ${
                isExpanded 
                  ? "opacity-100 translate-x-0" 
                  : "opacity-0 translate-x-2"
              }`}
              style={{
                width: isExpanded ? 'auto' : '0px',
                overflow: 'hidden'
              }}
            >
              <span className="text-xl font-bold text-gray-900 dark:text-white whitespace-nowrap">
                Whup.ru
              </span>
            </div>
          </Link>
        </div>

        {/* Интерактивная область для управления сайдбаром - только для десктопа */}
        <div 
          className={`absolute inset-0 group sidebar-logo-area hidden lg:block`}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          {/* Иконка для свернутого сайдбара - показывается только при наведении */}
          {!isExpanded && (
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg border border-gray-200 dark:border-gray-300">
              {/* Адаптивная иконка стрелки вправо */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17.4175 9.9986C17.4178 10.1909 17.3446 10.3832 17.198 10.53L12.2013 15.5301C11.9085 15.8231 11.4337 15.8233 11.1407 15.5305C10.8477 15.2377 10.8475 14.7629 11.1403 14.4699L14.8604 10.7472L3.33301 10.7472C2.91879 10.7472 2.58301 10.4114 2.58301 9.99715C2.58301 9.58294 2.91879 9.24715 3.33301 9.24715L14.8549 9.24715L11.1403 5.53016C10.8475 5.23717 10.8477 4.7623 11.1407 4.4695C11.4336 4.1767 11.9085 4.17685 12.2013 4.46984L17.1588 9.43049C17.3173 9.568 17.4175 9.77087 17.4175 9.99715C17.4175 9.99763 17.4175 9.99812 17.4175 9.9986Z"
                  fill="#6B7280"
                  className="dark:fill-gray-300"
                />
              </svg>
            </div>
          )}

          {/* Иконка для развернутого сайдбара - всегда видна когда развернут с задержкой */}
          {isExpanded && !isMobileOpen && (
            <div className={`absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full p-2 shadow-lg border transition-all duration-200 ${
              isPinned 
                ? 'border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20' 
                : 'border-gray-200 bg-white dark:border-gray-300 dark:bg-gray-800'
            } ${
              showSidebarIcon ? 'opacity-100' : 'opacity-0'
            }`}>
              {/* Адаптивная иконка сайдбара */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
              >
                <path
                  fill="none"
                  stroke={isPinned ? "#2563EB" : "#6B7280"}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M2 12c0-3.69 0-5.534.814-6.841a4.8 4.8 0 0 1 1.105-1.243C5.08 3 6.72 3 10 3h4c3.28 0 4.919 0 6.081.916c.43.338.804.759 1.105 1.243C22 6.466 22 8.31 22 12s0 5.534-.814 6.841a4.8 4.8 0 0 1-1.105 1.243C18.92 21 17.28 21 14 21h-4c-3.28 0-4.919 0-6.081-.916a4.8 4.8 0 0 1-1.105-1.243C2 17.534 2 15.69 2 12m7.5-9v18M5 7h1m-1 3h1"
                  className={`transition-colors duration-200 ${
                    isPinned 
                      ? 'dark:stroke-blue-400' 
                      : 'dark:stroke-gray-300'
                  }`}
            />
              </svg>
            </div>
          )}

          {/* Подсказка для свернутого сайдбара */}
          {showTooltip && !isExpanded && (
            <div className="absolute left-full ml-6 top-1/2 transform -translate-y-1/2 z-50">
              <div className="bg-gray-900 dark:bg-gray-800 text-white dark:text-white text-xs px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
                {t('Common.sidebar.openSidebar')}
                <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-900 dark:border-r-gray-800"></div>
              </div>
            </div>
          )}

          {/* Подсказка для развернутого сайдбара */}
          {showTooltip && isExpanded && !isMobileOpen && (
            <div className="absolute left-full ml-6 top-1/2 transform -translate-y-1/2 z-50">
              <div className="bg-gray-900 dark:bg-gray-800 text-white dark:text-white text-xs px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
                {isPinned ? t('Common.sidebar.unpinSidebar') : t('Common.sidebar.pinSidebar')}
                <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-900 dark:border-r-gray-800"></div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      

      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className={`mb-6 transition-all duration-300 lg:pt-0 ${isApplicationMenuOpen ? 'pt-20' : 'pt-2'}`} onClick={(e) => e.stopPropagation()}>
          <div className="flex flex-col gap-4">
            <div>
              {renderMenuItems(navItems, "main")}
            </div>

            <div>
              {renderMenuItems(othersItems, "others")}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
