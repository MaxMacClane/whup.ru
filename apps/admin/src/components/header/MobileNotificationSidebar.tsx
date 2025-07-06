"use client";

import React from "react";
import Image from "next/image";
import { useSidebar } from "@/context/SidebarContext";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import { useTranslations } from 'next-intl';

export default function MobileNotificationSidebar() {
  const t = useTranslations('ui');
  const {
    isNotificationSidebarOpen,
    setIsNotificationSidebarOpen,
  } = useSidebar();

  const handleItemClick = () => {
    setIsNotificationSidebarOpen(false);
  };

  const NotificationContent = () => (
    <>
        <ul className="flex flex-col h-auto overflow-y-auto custom-scrollbar">
          <li>
            <DropdownItem
            onItemClick={handleItemClick}
              className="flex gap-3 rounded-lg border-b border-gray-100 p-3 px-4.5 py-3 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-white/5"
            >
              <span className="relative block w-full h-10 rounded-full z-1 max-w-10">
                <Image
                  width={40}
                  height={40}
                  src="/images/user/user-02.jpg"
                  alt="User"
                  className="w-full overflow-hidden rounded-full"
                />
                <span className="absolute bottom-0 right-0 z-10 h-2.5 w-full max-w-2.5 rounded-full bg-green-500 border border-white dark:border-gray-900"></span>
              </span>
              <div className="flex items-start justify-between w-full gap-3">
                <div className="w-full">
                  <h6 className="text-sm font-medium text-gray-900 dark:text-white">
                    <span className="duration-300">Terry Franci</span> requests
                    permission to change{" "}
                    <span className="text-brand-500 dark:text-brand-400">
                      Project - Nganfer App
                    </span>
                  </h6>
                  <p className="text-xs">
                    <span className="mr-1 text-gray-500 dark:text-gray-400">
                      Project
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">•</span>
                    <span className="ml-1 text-gray-500 dark:text-gray-400">
                      5 min ago
                    </span>
                  </p>
                </div>
              </div>
            </DropdownItem>
          </li>
          <li>
            <DropdownItem
            onItemClick={handleItemClick}
              className="flex gap-3 rounded-lg border-b border-gray-100 p-3 px-4.5 py-3 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-white/5"
            >
              <span className="relative block w-full h-10 rounded-full z-1 max-w-10">
                <Image
                  width={40}
                  height={40}
                  src="/images/user/user-02.jpg"
                  alt="User"
                  className="w-full overflow-hidden rounded-full"
                />
                <span className="absolute bottom-0 right-0 z-10 h-2.5 w-full max-w-2.5 rounded-full bg-green-500 border border-white dark:border-gray-900"></span>
              </span>
              <div className="flex items-start justify-between w-full gap-3">
                <div className="w-full">
                  <h6 className="text-sm font-medium text-gray-900 dark:text-white">
                    <span className="duration-300">Alena Franci</span> requests
                    permission to change{" "}
                    <span className="text-brand-500 dark:text-brand-400">
                      Project - Nganfer App
                    </span>
                  </h6>
                  <p className="text-xs">
                    <span className="mr-1 text-gray-500 dark:text-gray-400">
                      Project
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">•</span>
                    <span className="ml-1 text-gray-500 dark:text-gray-400">
                      8 min ago
                    </span>
                  </p>
                </div>
              </div>
            </DropdownItem>
          </li>
          <li>
            <DropdownItem
            onItemClick={handleItemClick}
              className="flex gap-3 rounded-lg border-b border-gray-100 p-3 px-4.5 py-3 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-white/5"
            >
              <span className="relative block w-full h-10 rounded-full z-1 max-w-10">
                <Image
                  width={40}
                  height={40}
                  src="/images/user/user-02.jpg"
                  alt="User"
                  className="w-full overflow-hidden rounded-full"
                />
                <span className="absolute bottom-0 right-0 z-10 h-2.5 w-full max-w-2.5 rounded-full bg-green-500 border border-white dark:border-gray-900"></span>
              </span>
              <div className="flex items-start justify-between w-full gap-3">
                <div className="w-full">
                  <h6 className="text-sm font-medium text-gray-900 dark:text-white">
                    <span className="duration-300">Jocelyn Kenter</span> requests
                    permission to change{" "}
                    <span className="text-brand-500 dark:text-brand-400">
                      Project - Nganfer App
                    </span>
                  </h6>
                  <p className="text-xs">
                    <span className="mr-1 text-gray-500 dark:text-gray-400">
                      Project
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">•</span>
                    <span className="ml-1 text-gray-500 dark:text-gray-400">
                      15 min ago
                    </span>
                  </p>
                </div>
              </div>
            </DropdownItem>
          </li>
        </ul>
    </>
  );

  return (
    <>
      {/* Мобильный сайдбар уведомлений - правильно позиционированный */}
      <aside
        className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 lg:hidden ${
          isNotificationSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } w-[320px]`}
      >
        <div className="py-4 flex items-center justify-between w-full pt-32">
          {/* Заголовок уведомлений вместо логотипа */}
          <div className="flex items-center">
            <span className="text-xl font-semibold text-gray-900 dark:text-white whitespace-nowrap">
              {t('notifications')}
            </span>
          </div>

          {/* Кнопка закрытия */}
          <button
            onClick={() => setIsNotificationSidebarOpen(false)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Close notifications"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Содержимое уведомлений */}
        <div className="flex-1 overflow-hidden">
          <NotificationContent />
        </div>
      </aside>
    </>
  );
} 