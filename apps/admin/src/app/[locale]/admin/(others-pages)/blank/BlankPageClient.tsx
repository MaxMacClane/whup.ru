'use client';
"use client";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { useTranslations } from 'next-intl';
import React from "react";

export default function BlankPageClient() {
  const t = useTranslations('BlankPage');
  return (
    <div>
      <PageBreadcrumb pageTitle="BlankPage.pageTitle" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="mx-auto w-full max-w-[630px] text-center">
          <h3 className="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
            {t('cardTitle')}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
            {t('description')}
          </p>
        </div>
      </div>
    </div>
  );
} 