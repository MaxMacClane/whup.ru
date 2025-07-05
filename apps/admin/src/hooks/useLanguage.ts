'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useMemo, useCallback } from 'react';

// Импортируем JSON файлы напрямую
import enTranslations from '../locales/en.json';
import ruTranslations from '../locales/ru.json';

const translations = {
  en: enTranslations,
  ru: ruTranslations
};

// Глобальный кэш для страниц
const pageCache = new Map<string, {
  content: string;
  timestamp: number;
}>();

// Кэш для переводов (избегаем пересчета)
const translationCache = new Map<string, string>();

export const useLanguage = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Определяем текущую локаль из URL
  const locale = useMemo(() => {
    const pathSegments = pathname.split('/');
    const localeFromPath = pathSegments[1];
    return (localeFromPath === 'en' || localeFromPath === 'ru') ? localeFromPath : 'ru';
  }, [pathname]);

  // Быстрое переключение языка без router.push
  const setLanguageFast = useCallback((newLocale: string) => {
    if (newLocale === locale) return;

    console.log('🚀 Быстрое переключение языка с', locale, 'на', newLocale);
    
    const currentPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    const cacheKey = `${currentPath}-${newLocale}`;
    
    // Проверяем кэш
    const cachedPage = pageCache.get(cacheKey);
    
    if (cachedPage) {
      console.log('💾 Используем кэшированную версию для', newLocale);
      
      // Мгновенно обновляем URL без перезагрузки
      window.history.pushState({}, '', currentPath);
      
      // Обновляем только переводы на странице
      updatePageTranslations(newLocale);
      
      // Сохраняем состояние темы
      if (typeof document !== 'undefined') {
        const isDark = document.documentElement.classList.contains('dark');
        sessionStorage.setItem('theme', isDark ? 'dark' : 'light');
      }
      
      return;
    }
    
    // Если в кэше нет, используем обычный переход
    console.log('🔄 Обычный переход для', newLocale);
    setLanguage(newLocale);
  }, [locale, pathname]);

  // Обновление переводов на текущей странице
  const updatePageTranslations = useCallback((newLocale: string) => {
    const elementsWithTranslations = document.querySelectorAll('[data-translation-key]');
    
    elementsWithTranslations.forEach(element => {
      const key = element.getAttribute('data-translation-key');
      if (key) {
        const cacheKey = `${key}-${newLocale}`;
        let translatedText = translationCache.get(cacheKey);
        
        if (!translatedText) {
          translatedText = getTranslation(key, newLocale);
          translationCache.set(cacheKey, translatedText);
        }
        
        element.textContent = translatedText;
      }
    });
  }, []);

  // Получение перевода для конкретного языка
  const getTranslation = useCallback((key: string, targetLocale: string) => {
    const keys = key.split('.');
    let current: any = translations[targetLocale as keyof typeof translations];

    for (const k of keys) {
      if (current && typeof current === 'object' && k in current) {
        current = current[k];
      } else {
        current = undefined;
        break;
      }
    }

    return typeof current === 'string' ? current : key;
  }, []);

  // Обычное переключение языка (с router.push)
  const setLanguage = (newLocale: string) => {
    console.log('🔄 Переключение языка с', locale, 'на', newLocale);
    
    // Кэшируем текущую страницу перед переходом
    const currentCacheKey = `${pathname}-${locale}`;
    if (typeof document !== 'undefined') {
      pageCache.set(currentCacheKey, {
        content: document.documentElement.innerHTML,
        timestamp: Date.now()
      });
      
      // Сохраняем состояние темы
      const isDark = document.documentElement.classList.contains('dark');
      sessionStorage.setItem('theme', isDark ? 'dark' : 'light');
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
    setLanguageFast,
    t
  };
}; 