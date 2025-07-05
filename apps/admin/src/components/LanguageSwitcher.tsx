'use client';

import { useLanguage } from '@/hooks/useLanguage';

export const LanguageSwitcher = () => {
  const { language, setLanguageFast } = useLanguage();

  const toggleLanguage = () => {
    const newLanguage = language === 'ru' ? 'en' : 'ru';
    setLanguageFast(newLanguage);
  };

  return (
      <button
      onClick={toggleLanguage}
      className="flex items-center justify-center w-10 h-10 text-sm font-medium text-gray-700 border border-gray-200 rounded-full hover:bg-gray-100 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors duration-200"
      title={`Switch to ${language === 'ru' ? 'English' : 'Russian'}`}
    >
      {language?.toUpperCase() || 'RU'}
      </button>
  );
}; 