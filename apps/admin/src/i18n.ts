import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

// Поддерживаемые языки
export const locales = ['ru', 'en'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({locale}) => {
  // Защита от undefined locale - берем 'ru' по умолчанию
  const safeLocale = locale || 'ru';
  
  // Проверяем, что переданный язык поддерживается
  if (!locales.includes(safeLocale as any)) {
    notFound();
  }

  return {
    locale: safeLocale,
    messages: (await import(`./locales/${safeLocale}.json`)).default
  };
}); 