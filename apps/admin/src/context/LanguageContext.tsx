'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { navigationTranslations } from '../locales/navigation';
// Импортируем JSON файлы
import enTranslations from '../locales/en.json';
import ruTranslations from '../locales/ru.json';

type Language = 'en' | 'ru';

// Определяем тип для переводов
type TranslationValue = string | { [key: string]: TranslationValue };

interface TranslationType {
  en: { [key: string]: TranslationValue };
  ru: { [key: string]: TranslationValue };
}

// Объединяем переводы из TS и JSON
const translations: TranslationType = {
  en: {
    ...navigationTranslations.en, // Сначала навигация
    ...enTranslations // Потом добавляем/перезаписываем из JSON
  },
  ru: {
    ...navigationTranslations.ru, // Сначала навигация
    ...ruTranslations // Потом добавляем/перезаписываем из JSON
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, options?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Проверяем, что мы в браузере перед использованием localStorage
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language') as Language;
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ru')) {
        setLanguageState(savedLanguage);
      }
    }
    // Устанавливаем isClient в true только ПОСЛЕ попытки загрузить язык
    setIsClient(true); 
  }, []);

  // Функция для получения перевода по ключу (ИСПРАВЛЕННАЯ ЛОГИКА)
  const t = (key: string, options?: Record<string, string | number>): string => {
    // --- ОТЛАДКА: Логируем используемый язык ---
    console.log(`[t function] Called for key: "${key}", Current language state: "${language}"`);
    // ---------------------------------------------
    
    const keys = key.split('.');
    let current: TranslationValue | undefined = translations[language];

    // Идем по ключам, пока не дойдем до нужного значения
    for (const k of keys) {
      if (current && typeof current === 'object' && k in current) {
        current = current[k]; // Погружаемся глубже
      } else {
        current = undefined; // Не нашли ключ на каком-то уровне
        break;
      }
    }

    // Теперь current содержит либо искомую строку, либо что-то другое, либо undefined
    let result = typeof current === 'string' ? current : key; // Возвращаем строку или ключ

    // Логика замены плейсхолдеров (оставляем как было)
    if (typeof result === 'string' && options) {
      Object.keys(options).forEach((optionKey) => {
        const placeholder = `{${optionKey}}`;
        result = result.replace(placeholder, String(options[optionKey]));
      });
    }

    return result;
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    // Проверяем, что мы в браузере перед использованием localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  };

  // Не рендерим контент, пока не определим, что мы на клиенте И не загрузили язык
  if (!isClient) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 