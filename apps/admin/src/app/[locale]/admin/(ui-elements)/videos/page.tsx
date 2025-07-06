'use client';
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import VideosExample from "@/components/ui/video/VideosExample";
  import React from "react";
  import { useTranslations } from 'next-intl';

export default function VideoPage() {
  const t = useTranslations('Videos');
  
  return (
    <div>
      <PageBreadcrumb pageTitle={t('pageTitle')} />

      <VideosExample />
    </div>
  );
}
