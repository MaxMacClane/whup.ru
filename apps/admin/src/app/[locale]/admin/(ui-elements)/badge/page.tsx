'use client';
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Badge from "@/components/ui/badge/Badge";
import { PlusIcon } from "@/icons";
  import React from "react";
  import { useTranslations } from 'next-intl';

export default function BadgePage() {
  const t = useTranslations('Badge');
  
  return (
    <div>
      <PageBreadcrumb pageTitle={t('pageTitle')} />
      <div className="space-y-5 sm:space-y-6">
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="px-6 py-5">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              {t('lightBackground')}
            </h3>
          </div>
          <div className="p-6 border-t border-gray-100 dark:border-gray-800 xl:p-10">
            <div className="flex flex-wrap gap-4 sm:items-center sm:justify-center">
              {/* Light Variant */}
              <Badge variant="light" color="primary">
                {t('colors.primary')}
              </Badge>
              <Badge variant="light" color="success">
                {t('colors.success')}
              </Badge>{" "}
              <Badge variant="light" color="error">
                {t('colors.error')}
              </Badge>{" "}
              <Badge variant="light" color="warning">
                {t('colors.warning')}
              </Badge>{" "}
              <Badge variant="light" color="info">
                {t('colors.info')}
              </Badge>
              <Badge variant="light" color="light">
                {t('colors.light')}
              </Badge>
              <Badge variant="light" color="dark">
                {t('colors.dark')}
              </Badge>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="px-6 py-5">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              {t('solidBackground')}
            </h3>
          </div>
          <div className="p-6 border-t border-gray-100 dark:border-gray-800 xl:p-10">
            <div className="flex flex-wrap gap-4 sm:items-center sm:justify-center">
              {/* Solid Variant */}
              <Badge variant="solid" color="primary">
                {t('colors.primary')}
              </Badge>
              <Badge variant="solid" color="success">
                {t('colors.success')}
              </Badge>{" "}
              <Badge variant="solid" color="error">
                {t('colors.error')}
              </Badge>{" "}
              <Badge variant="solid" color="warning">
                {t('colors.warning')}
              </Badge>{" "}
              <Badge variant="solid" color="info">
                {t('colors.info')}
              </Badge>
              <Badge variant="solid" color="light">
                {t('colors.light')}
              </Badge>
              <Badge variant="solid" color="dark">
                {t('colors.dark')}
              </Badge>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="px-6 py-5">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              {t('lightBackgroundLeftIcon')}
            </h3>
          </div>
          <div className="p-6 border-t border-gray-100 dark:border-gray-800 xl:p-10">
            <div className="flex flex-wrap gap-4 sm:items-center sm:justify-center">
              <Badge variant="light" color="primary" startIcon={<PlusIcon />}>
                {t('colors.primary')}
              </Badge>
              <Badge variant="light" color="success" startIcon={<PlusIcon />}>
                {t('colors.success')}
              </Badge>{" "}
              <Badge variant="light" color="error" startIcon={<PlusIcon />}>
                {t('colors.error')}
              </Badge>{" "}
              <Badge variant="light" color="warning" startIcon={<PlusIcon />}>
                {t('colors.warning')}
              </Badge>{" "}
              <Badge variant="light" color="info" startIcon={<PlusIcon />}>
                {t('colors.info')}
              </Badge>
              <Badge variant="light" color="light" startIcon={<PlusIcon />}>
                {t('colors.light')}
              </Badge>
              <Badge variant="light" color="dark" startIcon={<PlusIcon />}>
                {t('colors.dark')}
              </Badge>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="px-6 py-5">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              {t('solidBackgroundLeftIcon')}
            </h3>
          </div>
          <div className="p-6 border-t border-gray-100 dark:border-gray-800 xl:p-10">
            <div className="flex flex-wrap gap-4 sm:items-center sm:justify-center">
              <Badge variant="solid" color="primary" startIcon={<PlusIcon />}>
                {t('colors.primary')}
              </Badge>
              <Badge variant="solid" color="success" startIcon={<PlusIcon />}>
                {t('colors.success')}
              </Badge>{" "}
              <Badge variant="solid" color="error" startIcon={<PlusIcon />}>
                {t('colors.error')}
              </Badge>{" "}
              <Badge variant="solid" color="warning" startIcon={<PlusIcon />}>
                {t('colors.warning')}
              </Badge>{" "}
              <Badge variant="solid" color="info" startIcon={<PlusIcon />}>
                {t('colors.info')}
              </Badge>
              <Badge variant="solid" color="light" startIcon={<PlusIcon />}>
                {t('colors.light')}
              </Badge>
              <Badge variant="solid" color="dark" startIcon={<PlusIcon />}>
                {t('colors.dark')}
              </Badge>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="px-6 py-5">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              {t('lightBackgroundRightIcon')}
            </h3>
          </div>
          <div className="p-6 border-t border-gray-100 dark:border-gray-800 xl:p-10">
            <div className="flex flex-wrap gap-4 sm:items-center sm:justify-center">
              <Badge variant="light" color="primary" endIcon={<PlusIcon />}>
                {t('colors.primary')}
              </Badge>
              <Badge variant="light" color="success" endIcon={<PlusIcon />}>
                {t('colors.success')}
              </Badge>{" "}
              <Badge variant="light" color="error" endIcon={<PlusIcon />}>
                {t('colors.error')}
              </Badge>{" "}
              <Badge variant="light" color="warning" endIcon={<PlusIcon />}>
                {t('colors.warning')}
              </Badge>{" "}
              <Badge variant="light" color="info" endIcon={<PlusIcon />}>
                {t('colors.info')}
              </Badge>
              <Badge variant="light" color="light" endIcon={<PlusIcon />}>
                {t('colors.light')}
              </Badge>
              <Badge variant="light" color="dark" endIcon={<PlusIcon />}>
                {t('colors.dark')}
              </Badge>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="px-6 py-5">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              {t('solidBackgroundRightIcon')}
            </h3>
          </div>
          <div className="p-6 border-t border-gray-100 dark:border-gray-800 xl:p-10">
            <div className="flex flex-wrap gap-4 sm:items-center sm:justify-center">
              <Badge variant="solid" color="primary" endIcon={<PlusIcon />}>
                {t('colors.primary')}
              </Badge>
              <Badge variant="solid" color="success" endIcon={<PlusIcon />}>
                {t('colors.success')}
              </Badge>{" "}
              <Badge variant="solid" color="error" endIcon={<PlusIcon />}>
                {t('colors.error')}
              </Badge>{" "}
              <Badge variant="solid" color="warning" endIcon={<PlusIcon />}>
                {t('colors.warning')}
              </Badge>{" "}
              <Badge variant="solid" color="info" endIcon={<PlusIcon />}>
                {t('colors.info')}
              </Badge>
              <Badge variant="solid" color="light" endIcon={<PlusIcon />}>
                {t('colors.light')}
              </Badge>
              <Badge variant="solid" color="dark" endIcon={<PlusIcon />}>
                {t('colors.dark')}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
