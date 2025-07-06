'use client';
"use client";

import Link from "next/link";
import React from "react";
import { useTranslations } from 'next-intl';

interface BreadcrumbProps {
  pageTitle: string;
}

const PageBreadcrumb: React.FC<BreadcrumbProps> = ({ pageTitle }) => {
  const tCommon = useTranslations('Common');
  const tBlankPage = useTranslations('BlankPage');
  const tProfile = useTranslations('Profile');

  // Определяем, какой контекст использовать на основе pageTitle
  const getTranslatedTitle = (title: string) => {
    // Если pageTitle начинается с префикса, определяем контекст
    if (title.startsWith('BlankPage.')) {
      const key = title.replace('BlankPage.', '');
      return tBlankPage(key);
    } else if (title.startsWith('Profile.')) {
      const key = title.replace('Profile.', '');
      return tProfile(key);
    } else if (title.startsWith('Common.')) {
      const key = title.replace('Common.', '');
      return tCommon(key);
    } else {
      // Если нет префикса, возвращаем как есть (это готовый текст)
      return title;
    }
  };

  const translatedPageTitle = getTranslatedTitle(pageTitle);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
      <h2
        className="text-xl font-semibold text-gray-800 dark:text-white/90"
        x-text="pageName"
      >
        {translatedPageTitle}
      </h2>
      <nav>
        <ol className="flex items-center gap-1.5">
          <li>
            <Link
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
              href="/"
            >
              {tCommon('common.breadcrumb.home')}
              <svg
                className="stroke-current"
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                  stroke=""
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </li>
          <li className="text-sm text-gray-800 dark:text-white/90">
            {translatedPageTitle}
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default PageBreadcrumb;
