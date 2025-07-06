'use client';
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Alert from "@/components/ui/alert/Alert";
import React from "react";
import { useTranslations } from 'next-intl';

export default function Alerts() {
  const t = useTranslations('Alerts');
  
  return (
    <div>
      <PageBreadcrumb pageTitle={t('pageTitle')} />
      <div className="space-y-5 sm:space-y-6">
        <ComponentCard title={t('success.alertTitle')}>
          <Alert
            variant="success"
            title={t('success.messageTitle')}
            message={t('success.message')}
            showLink={true}
            linkHref="/"
            linkText={t('learnMore')}
          />
          <Alert
            variant="success"
            title={t('success.messageTitle')}
            message={t('success.message')}
            showLink={false}
          />
        </ComponentCard>
        <ComponentCard title={t('warning.alertTitle')}>
          <Alert
            variant="warning"
            title={t('warning.messageTitle')}
            message={t('warning.message')}
            showLink={true}
            linkHref="/"
            linkText={t('learnMore')}
          />
          <Alert
            variant="warning"
            title={t('warning.messageTitle')}
            message={t('warning.message')}
            showLink={false}
          />
        </ComponentCard>
        <ComponentCard title={t('error.alertTitle')}>
          <Alert
            variant="error"
            title={t('error.messageTitle')}
            message={t('error.message')}
            showLink={true}
            linkHref="/"
            linkText={t('learnMore')}
          />
          <Alert
            variant="error"
            title={t('error.messageTitle')}
            message={t('error.message')}
            showLink={false}
          />
        </ComponentCard>
        <ComponentCard title={t('info.alertTitle')}>
          <Alert
            variant="info"
            title={t('info.messageTitle')}
            message={t('info.message')}
            showLink={true}
            linkHref="/"
            linkText={t('learnMore')}
          />
          <Alert
            variant="info"
            title={t('info.messageTitle')}
            message={t('info.message')}
            showLink={false}
          />
        </ComponentCard>
      </div>
    </div>
  );
}
