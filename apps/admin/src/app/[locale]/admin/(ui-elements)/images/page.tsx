'use client';
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ResponsiveImage from "@/components/ui/images/ResponsiveImage";
import ThreeColumnImageGrid from "@/components/ui/images/ThreeColumnImageGrid";
import TwoColumnImageGrid from "@/components/ui/images/TwoColumnImageGrid";
  import React from "react";
  import { useTranslations } from 'next-intl';

export default function Images() {
  const t = useTranslations('Images');
  
  return (
    <div>
      <PageBreadcrumb pageTitle={t('pageTitle')} />
      <div className="space-y-5 sm:space-y-6">
        <ComponentCard title={t('responsiveImage')}>
          <ResponsiveImage />
        </ComponentCard>
        <ComponentCard title={t('imageIn2Grid')}>
          <TwoColumnImageGrid />
        </ComponentCard>
        <ComponentCard title={t('imageIn3Grid')}>
          <ThreeColumnImageGrid />
        </ComponentCard>
      </div>
    </div>
  );
}
