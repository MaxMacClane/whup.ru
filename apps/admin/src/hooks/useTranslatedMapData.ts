import { useMemo } from 'react';
import { worldMill } from '@react-jvectormap/world';
import { useLanguage } from '@/hooks/useLanguage';

// Определяем типы, как в CountryMap
type PathData = {
  path: string;
  name: string;
};

type WorldMillPaths = {
  [key: string]: PathData;
};

// Тип возвращаемого значения хука - объект с путями/названиями стран
export type TranslatedPathsData = WorldMillPaths;

/**
 * Хук для получения данных worldMill с переведенными названиями стран.
 * Возвращает объект, где ключи - коды стран (в верхнем регистре),
 * а значения - объекты PathData с переведенным полем name.
 */
export const useTranslatedMapData = (): TranslatedPathsData => {
  const { t, language } = useLanguage();

  const translatedPaths = useMemo(() => {
    console.log(`[useTranslatedMapData] Recalculating for language: ${language}...`);
    // Используем оригинальные данные напрямую, так как нам нужны только пути для названий
    const originalPaths = worldMill.content.paths as WorldMillPaths;
    const processedPaths: TranslatedPathsData = {};

    if (originalPaths) {
      for (const code in originalPaths) {
        if (Object.prototype.hasOwnProperty.call(originalPaths, code)) {
          // Копируем данные пути, чтобы не мутировать оригинал
          const originalPathData = originalPaths[code];
          const pathDataCopy: PathData = { ...originalPathData };

          const originalName = originalPathData?.name || code; // Оригинальное имя или код

          if (language === 'en') {
            // Если язык английский, используем оригинальное имя
            pathDataCopy.name = originalName;
          } else {
            // Если язык НЕ английский (русский), пытаемся перевести
            const translationKey = `Common.countries.${code.toLowerCase()}`;
            const translatedName = t(translationKey);
            // Используем перевод, если он найден, иначе - оригинальное имя
            pathDataCopy.name = (translatedName !== translationKey) ? translatedName : originalName;
          }
          processedPaths[code] = pathDataCopy; // Добавляем в результат
        }
      }
    } else {
      console.error("[useTranslatedMapData] worldMill data structure seems unexpected:", worldMill);
    }
    console.log(`[useTranslatedMapData] Recalculation finished for language: ${language}.`);
    return processedPaths;
  }, [t, language]); // Зависим от языка и функции перевода

  return translatedPaths;
};

// Опционально: Можно добавить тип для пропсов worldMill, если он сложнее
// interface WorldMillData {
//   content: {
//     paths: WorldMillPaths;
//     // другие поля...
//   };
//   // другие поля...
// } 