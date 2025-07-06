'use client';
import BarChartOne from "@/components/charts/bar/BarChartOne";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import React from "react";
import { useTranslations } from 'next-intl';

export default function BarChart() {
  const t = useTranslations('Common');
  
  const pageTitle = t('navigation.bar');
  const componentTitle = t('navigation.bar') + " 1";
  
  return (
    <div>
      <PageBreadcrumb pageTitle={pageTitle} />
      <div className="space-y-6">
        <ComponentCard title={componentTitle}>
          <BarChartOne />
        </ComponentCard>
      </div>
    </div>
  );
}
