'use client';
import LineChartOne from "@/components/charts/line/LineChartOne";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import React from "react";
import { useTranslations } from 'next-intl';

export default function LineChart() {
  const t = useTranslations('Common');
  
  const pageTitle = t('navigation.line');
  const componentTitle = t('navigation.line') + " 1";
  
  return (
    <div>
      <PageBreadcrumb pageTitle={pageTitle} />
      <div className="space-y-6">
        <ComponentCard title={componentTitle}>
          <LineChartOne />
        </ComponentCard>
      </div>
    </div>
  );
}
