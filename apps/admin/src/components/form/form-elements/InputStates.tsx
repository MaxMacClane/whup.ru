"use client";
import React from "react";
import { useTranslations } from 'next-intl';
import ComponentCard from "../../common/ComponentCard";
import Input from "../input/InputField";
import Label from "../Label";

export default function InputStates() {
  const t = useTranslations('Forms.inputStates');
  
  return (
    <ComponentCard
      title={t('title')}
      desc={t('subtitle')}
    >
      <div className="space-y-6">
        {/* 1. Стандартное */}
        <div>
          <Label>{t('labelDefault')}</Label>
          <Input
            type="text"
            placeholder={t('placeholderEmail')}
            defaultValue={t('valueDefault')}
          />
        </div>

        {/* 2. В фокусе (Имитация) */}
        <div>
          <Label>{t('labelFocus')}</Label>
          <Input
            type="text"
            placeholder={t('placeholderEmail')}
            defaultValue={t('valueFocus')}
            isfocus
          />
        </div>

        {/* 3. Успех */}
        <div>
          <Label>{t('labelSuccess')}</Label>
          <Input
            type="text"
            placeholder={t('placeholderEmail')}
            defaultValue={t('valueSuccess')}
            success
          />
        </div>

        {/* 4. Ошибка */}
        <div>
          <Label>{t('labelError')}</Label>
          <Input
            type="text"
            placeholder={t('placeholderEmail')}
            defaultValue={t('valueError')}
            error
          />
        </div>

        {/* 5. Отключено */}
        <div>
          <Label>{t('labelDisabled')}</Label>
          <Input
            type="text"
            placeholder={t('placeholderEmail')}
            defaultValue={t('valueDisabled')}
            disabled
          />
        </div>
      </div>
    </ComponentCard>
  );
}
