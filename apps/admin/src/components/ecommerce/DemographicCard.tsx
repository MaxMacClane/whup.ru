'use client';
"use client";

import CountryMap from "./CountryMap";
import { useState } from "react";
import { MoreDotIcon } from "@/icons";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import Flag from '@/components/Flags';
import { useTranslatedMapData } from "@/hooks/useTranslatedMapData";
import { useTranslations } from 'next-intl';
import { MarkerInputData } from "./CountryMap";

export default function DemographicCard() {
  const translatedCountryData = useTranslatedMapData();
  const t = useTranslations('Dashboard');
  const tCommon = useTranslations('Common');

  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  // Пример моковых данных (оставляем для value и percentage)
  const topCountriesMeta = [
    { code: 'us', value: '3.7K', percentage: 45 },
    { code: 'de', value: '2.1K', percentage: 30 },
    { code: 'gb', value: '1.5K', percentage: 15 },
    { code: 'br', value: '0.9K', percentage: 6 },
    { code: 'jp', value: '0.5K', percentage: 4 },
  ];

  // --- Создаем данные для маркеров --- 
  // Примерные координаты для топ-5 стран
  const countryCoordinates: { [key: string]: [number, number] } = {
    us: [39.8283, -98.5795],  // Центр США
    de: [51.1657, 10.4515],  // Центр Германии
    gb: [55.3781, -3.4360],   // Центр Великобритании
    br: [-14.2350, -51.9253], // Центр Бразилии
    jp: [36.2048, 138.2529],  // Центр Японии
  };

  // Формируем массив данных для передачи в CountryMap
  const markersDataForMap: MarkerInputData[] = topCountriesMeta.map(country => ({
    code: country.code,
    latLng: countryCoordinates[country.code] || [0, 0], // Берем координаты или [0,0] если не найдены
    percentage: country.percentage // Добавляем процент из topCountriesMeta
  }));
  // -----------------------------------

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            {t('charts.demographics.title')}
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            {t('charts.demographics.subtitle')}
          </p>
        </div>

        <div className="relative inline-block">
          <button onClick={toggleDropdown} className="dropdown-toggle">
            <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
          </button>
          <Dropdown
            isOpen={isOpen}
            onClose={closeDropdown}
            className="w-40 p-2"
          >
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              {tCommon('common.viewMore')}
            </DropdownItem>
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              {tCommon('common.delete')}
            </DropdownItem>
          </Dropdown>
        </div>
      </div>
      <div className="px-4 py-5 my-6 border border-gary-200 rounded-2xl bg-gray-50 dark:border-gray-800 dark:bg-gray-900 sm:px-2">
        <div
          id="mapOne"
          className="mapOne map-btn h-[240px] w-full min-w-[400px]"
        >
          <CountryMap markersData={markersDataForMap} />
        </div>
      </div>

      <div className="space-y-5">
        {topCountriesMeta.map((countryMeta) => {
          // Получаем название страны из данных хука по коду
          // Код страны в worldMill в ВЕРХНЕМ регистре (US, DE, GB)
          const countryCodeUpper = countryMeta.code.toUpperCase();
          const countryName = translatedCountryData[countryCodeUpper]?.name || countryMeta.code; // Берем имя из хука или оставляем код как fallback
          
          // Логируем для проверки
          console.log(`[DemographicCard] Code: ${countryMeta.code}, Fetched Name for ${countryCodeUpper}: ${countryName}`);

          return (
            <div key={countryMeta.code} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 overflow-hidden rounded-full border border-gray-200 dark:border-gray-800">
                  <Flag
                    code={countryMeta.code}
                    alt={countryName}
                    className="w-full h-full object-cover scale-135"
                    width={36}
                    height={36}
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white">
                    {countryMeta.value}
                  </p>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {/* Отображаем имя, полученное из хука */} 
                    {countryName}
                  </p>
                </div>
              </div>
              <p className="font-semibold text-gray-600 dark:text-gray-400">
                {countryMeta.percentage}%
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
