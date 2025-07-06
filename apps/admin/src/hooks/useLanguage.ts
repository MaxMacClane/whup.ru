'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useMemo } from 'react';

// Импортируем JSON файлы напрямую
import enTranslations from '../locales/en.json';
import ruTranslations from '../locales/ru.json';

const translations = {
  en: enTranslations,
  ru: ruTranslations
};

export const useLanguage = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Определяем текущую локаль из URL
  const locale = useMemo(() => {
    const pathSegments = pathname.split('/');
    const localeFromPath = pathSegments[1];
    return (localeFromPath === 'en' || localeFromPath === 'ru') ? localeFromPath : 'ru';
  }, [pathname]);

  const setLanguage = (newLocale: string) => {
    console.log('🔄 Переключение языка с', locale, 'на', newLocale);
    
    // Читаем текущее состояние темы прямо из DOM (из кнопки)
    if (typeof document !== 'undefined') {
      const isDark = document.documentElement.classList.contains('dark');
      const currentThemeState = isDark ? 'dark' : 'light';
      
      console.log('🎨 Текущая тема из DOM:', currentThemeState);
      console.log('🎨 CSS классы на html:', document.documentElement.classList.toString());
      
      // Сохраняем состояние темы перед переходом
      sessionStorage.setItem('theme', currentThemeState);
      console.log('💾 Сохранили в sessionStorage:', currentThemeState);
    }
    
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    console.log('🚀 Переходим на:', newPath);
    router.push(newPath);
  };

  const t = useMemo(() => {
    return (key: string, options?: Record<string, string | number>) => {
      const keys = key.split('.');
      let current: any = translations[locale as keyof typeof translations];

      // Идем по ключам, пока не дойдем до нужного значения
      for (const k of keys) {
        if (current && typeof current === 'object' && k in current) {
          current = current[k];
        } else {
          current = undefined;
          break;
        }
      }

      let result = typeof current === 'string' ? current : key;

      // Логика замены плейсхолдеров
      if (typeof result === 'string' && options) {
        Object.keys(options).forEach((optionKey) => {
          const placeholder = `{${optionKey}}`;
          result = result.replace(placeholder, String(options[optionKey]));
        });
      }

      return result;
    };
  }, [locale]);

  return {
    language: locale,
    setLanguage,
    t
  };
}; 