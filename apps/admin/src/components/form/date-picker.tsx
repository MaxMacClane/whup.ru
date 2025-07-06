'use client';
import { useEffect, useState } from 'react';
import flatpickr from 'flatpickr';
import Label from './Label';
import { CalenderIcon } from '../../icons';
import { useParams } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import Hook = flatpickr.Options.Hook;
import DateOption = flatpickr.Options.DateOption;
import { Russian } from 'flatpickr/dist/l10n/ru';

type PropsType = {
  id: string;
  mode?: "single" | "multiple" | "range" | "time";
  onChange?: Hook | Hook[];
  defaultDate?: DateOption;
  label?: string;
  placeholder?: string;
};

export default function DatePicker({
  id,
  mode,
  onChange,
  label,
  defaultDate,
  placeholder,
}: PropsType) {
  const params = useParams();
  const language = params?.locale as string || 'ru';
  const { theme: currentAppTheme } = useTheme();

  // --- Обертки для событий Flatpickr ---
  const handleFlatpickrChange = (selectedDates: Date[], dateStr: string, instance: flatpickr.Instance) => {
    console.log('[Flatpickr] onChange fired. Selected:', selectedDates);
    if (onChange) {
      if (typeof onChange === 'function') {
        onChange(selectedDates, dateStr, instance);
      } else if (Array.isArray(onChange)) {
        onChange.forEach(fn => fn(selectedDates, dateStr, instance));
      }
    }
  };

  const handleFlatpickrClose = (selectedDates: Date[], dateStr: string, instance: flatpickr.Instance) => {
    console.log('[Flatpickr] onClose fired. Selected:', selectedDates);
  };
  // --- Конец оберток ---

  // Эффект для управления CSS темами Flatpickr
  useEffect(() => {
    // Определяем имя файла темы на основе темы из контекста
    const themeFileName = currentAppTheme === 'dark' ? 'dark.css' : 'light.css';
    const themeHref = `https://npmcdn.com/flatpickr/dist/themes/${themeFileName}`;

    const existingLink = document.getElementById('flatpickr-theme');
    if (existingLink && existingLink instanceof HTMLLinkElement && existingLink.href !== themeHref) {
      existingLink.href = themeHref;
    } else if (!existingLink) {
      const link = document.createElement('link');
      link.id = 'flatpickr-theme';
      link.rel = 'stylesheet';
      link.href = themeHref;
      document.head.appendChild(link);
    }
  }, [currentAppTheme]); // Зависит только от темы из контекста

  // Эффект для инициализации flatpickr
  useEffect(() => {
    const localeConfig = language === 'ru' ? Russian : undefined;
    const config: flatpickr.Options.Options = {
      mode: mode || "single",
      static: true,
      monthSelectorType: "static",
      enableTime: true, 
      dateFormat: language === 'ru' ? "d.m.Y H:i" : "Y-m-d H:i", 
      defaultDate,
      ...(localeConfig && { locale: localeConfig }),
      closeOnSelect: false,
      onChange: handleFlatpickrChange,
      onClose: handleFlatpickrClose,
    };

    console.log(`[Flatpickr] Initializing with app theme: ${currentAppTheme}`);
    const fpInstance: flatpickr.Instance | flatpickr.Instance[] = flatpickr(`#${id}`, config);

    return () => {
      console.log(`[Flatpickr] Destroying instance (app theme: ${currentAppTheme})`);
      if (fpInstance && !Array.isArray(fpInstance)) {
          fpInstance.destroy();
      } else if (Array.isArray(fpInstance)){
          fpInstance.forEach(instance => instance.destroy());
      }
    };
  }, [id, mode, defaultDate, onChange, language, currentAppTheme]);

  return (
    <div>
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className="relative">
        <input
          id={id}
          placeholder={placeholder}
          className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 dark:border-gray-700 dark:focus:border-brand-800"
        />
        <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
          <CalenderIcon className="size-6" />
        </span>
      </div>
    </div>
  );
}
