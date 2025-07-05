'use client';

import Image from 'next/image';

const logoVariants = [
  'logo-1.svg',
  'logo-2.svg',
  'logo-3.svg',
  'logo-4.svg',
  'logo-5.svg',
  'logo-6.svg',
  'logo-7.svg',
];

export default function LogosPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Варианты логотипов Whup.ru
      </h1>
      
      <div className="space-y-12">
        {/* Логотипы на белом фоне */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            На светлом фоне
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {logoVariants.map((logo, index) => (
              <div 
                key={`light-${index}`}
                className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-center h-32">
                  <Image
                    src={`/images/logo/${logo}`}
                    alt={`Logo variant ${index + 1}`}
                    width={120}
                    height={80}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <p className="text-center text-sm text-gray-600 mt-4">
                  {logo}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Логотипы на темном фоне */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            На темном фоне
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {logoVariants.map((logo, index) => (
              <div 
                key={`dark-${index}`}
                className="bg-gray-900 border border-gray-700 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-center h-32">
                  <Image
                    src={`/images/logo/${logo}`}
                    alt={`Logo variant ${index + 1}`}
                    width={120}
                    height={80}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <p className="text-center text-sm text-gray-400 mt-4">
                  {logo}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Текущая настройка */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Текущая настройка
          </h2>
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Светлая тема */}
              <div className="text-center bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Светлая тема
                </h3>
                <Image
                  src="/images/logo/logo-1.svg"
                  alt="Light theme logo"
                  width={120}
                  height={80}
                  className="mx-auto"
                />
                <p className="text-sm text-gray-600 mt-2">
                  logo-1.svg
                </p>
              </div>
              
              {/* Темная тема */}
              <div className="text-center bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Темная тема
                </h3>
                <Image
                  src="/images/logo/logo-2.svg"
                  alt="Dark theme logo"
                  width={120}
                  height={80}
                  className="mx-auto"
                />
                <p className="text-sm text-gray-400 mt-2">
                  logo-2.svg
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Логотипы в разных размерах */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Разные размеры (logo-1.svg)
          </h2>
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {/* Маленький */}
              <div className="text-center">
                <Image
                  src="/images/logo/logo-1.svg"
                  alt="Small logo"
                  width={60}
                  height={40}
                  className="mx-auto"
                />
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Маленький (60x40)
                </p>
              </div>
              
              {/* Средний */}
              <div className="text-center">
                <Image
                  src="/images/logo/logo-1.svg"
                  alt="Medium logo"
                  width={120}
                  height={80}
                  className="mx-auto"
                />
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Средний (120x80)
                </p>
              </div>
              
              {/* Большой */}
              <div className="text-center">
                <Image
                  src="/images/logo/logo-1.svg"
                  alt="Large logo"
                  width={180}
                  height={120}
                  className="mx-auto"
                />
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Большой (180x120)
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 