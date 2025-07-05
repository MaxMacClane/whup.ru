import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

// Поддерживаемые языки
export const locales = ['ru', 'en'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({locale}) => {
  // Проверяем, что переданный язык поддерживается
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`./locales/${locale}.json`)).default
  };
}); 