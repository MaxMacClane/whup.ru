import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import 'flatpickr/dist/flatpickr.css';
import "../globals.css";

import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageSwitcher } from '../../components/LanguageSwitcher';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';

const outfit = Outfit({
  subsets: ["latin"],
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages({locale});
  
  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <ThemeProvider>
        <SidebarProvider>
          <div className="fixed top-4 right-4 z-50">
            <LanguageSwitcher />
          </div>
          {children}
        </SidebarProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
} 