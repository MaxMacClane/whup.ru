'use client';

import { useRouter, usePathname, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

export const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const locale = params?.locale as string || 'ru';
  const t = useTranslations('LocaleSwitcher');

  const toggleLanguage = () => {
    const newLanguage = locale === 'ru' ? 'en' : 'ru';
    
    // Сохраняем состояние темы перед переходом
    if (typeof document !== 'undefined') {
      const isDark = document.documentElement.classList.contains('dark');
      const currentThemeState = isDark ? 'dark' : 'light';
      sessionStorage.setItem('theme', currentThemeState);
    }
    
    const newPath = pathname.replace(`/${locale}`, `/${newLanguage}`);
    router.push(newPath);
  };

  return (
      <button
      onClick={toggleLanguage}
      className="flex items-center justify-center w-10 h-10 text-sm font-medium text-gray-700 border border-gray-200 rounded-full hover:bg-gray-100 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors duration-200"
      title={t('label')}
    >
      {locale?.toUpperCase() || 'RU'}
      </button>
  );
}; 