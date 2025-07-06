"use client";
import React from "react";
import { useTranslations } from 'next-intl';
import ComponentCard from "../../common/ComponentCard";
import TextArea from "../input/TextArea";
import Label from "../Label";

export default function TextAreaInput() {
  const t = useTranslations('Forms.textareaInput');
  
  return (
    <ComponentCard title={t('title')}>
      <div className="space-y-6">
        {/* 1. Стандартное состояние */}
        <div>
          <Label>{t('labelDefault')}</Label>
          <TextArea
            rows={4}
            placeholder={t('placeholderDefault')}
            value=""
            disabled
          />
        </div>

        {/* 2. Имитация состояния "В фокусе" */}
        <div>
          <Label>{t('labelActive')}</Label>
          <TextArea
            rows={4}
            placeholder={t('placeholderActive')}
            value={t('valueActive')}
            isfocus
          />
        </div>

        {/* 3. Состояние ошибки */}
        <div>
          <Label>{t('labelError')}</Label>
          <TextArea
            rows={4}
            placeholder={t('placeholderActive')}
            value={t('valueError')}
            error
          />
        </div>
      </div>
    </ComponentCard>
  );
}
