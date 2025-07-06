'use client';
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Button from "@/components/ui/button/Button";
import { BoxIcon } from "@/icons";
  import React from "react";
  import { useTranslations } from 'next-intl';

export default function Buttons() {
  const t = useTranslations('Buttons');
  
  return (
    <div>
      <PageBreadcrumb pageTitle={t('pageTitle')} />
      <div className="space-y-5 sm:space-y-6">
        {/* Primary Button */}
        <ComponentCard title={t('primaryButton')}>
          <div className="flex items-center gap-5">
            <Button size="sm" variant="primary">
              {t('buttonText')}
            </Button>
            <Button size="md" variant="primary">
              {t('buttonText')}
            </Button>
          </div>
        </ComponentCard>
        {/* Primary Button with Start Icon */}
        <ComponentCard title={t('primaryButtonLeftIcon')}>
          <div className="flex items-center gap-5">
            <Button size="sm" variant="primary" startIcon={<BoxIcon />}>
              {t('buttonText')}
            </Button>
            <Button size="md" variant="primary" startIcon={<BoxIcon />}>
              {t('buttonText')}
            </Button>
          </div>
        </ComponentCard>
        {/* Primary Button with Start Icon */}
        <ComponentCard title={t('primaryButtonRightIcon')}>
          <div className="flex items-center gap-5">
            <Button size="sm" variant="primary" endIcon={<BoxIcon />}>
              {t('buttonText')}
            </Button>
            <Button size="md" variant="primary" endIcon={<BoxIcon />}>
              {t('buttonText')}
            </Button>
          </div>
        </ComponentCard>
        {/* Outline Button */}
        <ComponentCard title={t('secondaryButton')}>
          <div className="flex items-center gap-5">
            {/* Outline Button */}
            <Button size="sm" variant="outline">
              {t('buttonText')}
            </Button>
            <Button size="md" variant="outline">
              {t('buttonText')}
            </Button>
          </div>
        </ComponentCard>
        {/* Outline Button with Start Icon */}
        <ComponentCard title={t('outlineButtonLeftIcon')}>
          <div className="flex items-center gap-5">
            <Button size="sm" variant="outline" startIcon={<BoxIcon />}>
              {t('buttonText')}
            </Button>
            <Button size="md" variant="outline" startIcon={<BoxIcon />}>
              {t('buttonText')}
            </Button>
          </div>
        </ComponentCard>
        {/* Outline Button with Start Icon */}
        <ComponentCard title={t('outlineButtonRightIcon')}>
          <div className="flex items-center gap-5">
            <Button size="sm" variant="outline" endIcon={<BoxIcon />}>
              {t('buttonText')}
            </Button>
            <Button size="md" variant="outline" endIcon={<BoxIcon />}>
              {t('buttonText')}
            </Button>
          </div>
        </ComponentCard>
      </div>
    </div>
  );
}
