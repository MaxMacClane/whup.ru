import type { Metadata } from "next";
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Whup.ru Admin",
  description: "Whup.ru Admin Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  console.log('🏁 ROOT Layout скрипт запустился');
                  
                  // Читаем тему из sessionStorage
                  const saved = sessionStorage.getItem('theme');
                  console.log('📖 ROOT Читаем из sessionStorage:', saved);
                  
                  if (saved === 'dark') {
                    console.log('🌙 ROOT Применяем тёмную тему');
                    document.documentElement.classList.add('dark');
                  } else {
                    console.log('☀️ ROOT Оставляем светлую тему');
                  }
                  
                  console.log('🎨 ROOT CSS классы после применения:', document.documentElement.classList.toString());
                } catch (e) {
                  console.error('❌ ROOT Ошибка в layout скрипте:', e);
                }
              })();
            `,
          }}
        />
      </head>
      <body className={outfit.className} suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  console.log('🏁 ROOT BODY скрипт запустился');
                  
                  // Читаем тему из sessionStorage
                  const saved = sessionStorage.getItem('theme');
                  console.log('📖 ROOT BODY Читаем из sessionStorage:', saved);
                  
                  if (saved === 'dark') {
                    console.log('🌙 ROOT BODY Применяем тёмную тему');
                    document.body.classList.add('dark');
                  }
                  
                  console.log('🎨 ROOT BODY CSS классы после применения:', document.body.classList.toString());
                } catch (e) {
                  console.error('❌ ROOT BODY Ошибка в layout скрипте:', e);
                }
              })();
            `,
          }}
        />
              {children}
      </body>
    </html>
  );
}
