'use client';
import React, { useMemo } from "react";
// import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";
import dynamic from "next/dynamic";
import { useLanguage } from "@/hooks/useLanguage";
// Импортируем новый хук
import { useTranslatedMapData } from "@/hooks/useTranslatedMapData";

const VectorMap = dynamic(
  () => import("@react-jvectormap/core").then((mod) => mod.VectorMap),
  { ssr: false }
);

// Определяем тип для данных маркера, которые будем получать
export type MarkerInputData = {
  code: string; // Код страны (в нижнем регистре, например 'us')
  latLng: [number, number]; // Координаты
  percentage: number; // Добавляем процент
};

// Define the component props
interface CountryMapProps {
  mapColor?: string;
  markersData?: MarkerInputData[]; // Новый пропс для данных маркеров
}

// Описываем базовую структуру маркера с ключом перевода
type BaseMarker = {
  latLng: [number, number];
  nameKey: string; // Используем ключ вместо прямого имени
  style?: {
    fill: string;
    borderWidth: number;
    borderColor: string;
    stroke?: string;
    strokeOpacity?: number;
  };
};

// Описываем финальную структуру маркера с переведенным именем
type TranslatedMarker = Omit<BaseMarker, 'nameKey'> & { name: string };

const CountryMap: React.FC<CountryMapProps> = ({ mapColor, markersData = [] }) => {
  const { t, language } = useLanguage();
  const translatedPaths = useTranslatedMapData();

  // Используем useMemo для создания ПОЛНОГО объекта карты, но только когда translatedPaths меняется
  const mapDataForComponent = useMemo(() => {
    console.log("[CountryMap] Rebuilding mapDataForComponent...");
    // Создаем копию, чтобы не мутировать импортированный worldMill
    const baseMapData = JSON.parse(JSON.stringify(worldMill));
    // Заменяем пути на переведенные из хука
    baseMapData.content.paths = translatedPaths;
    return baseMapData;
  }, [translatedPaths]); // Зависит только от результата хука

  // Создаем переведенный массив маркеров на основе markersData из пропсов
  const translatedMarkers: TranslatedMarker[] = useMemo(() => {
    // Преобразуем входные данные в формат BaseMarker, добавляя ключ перевода и ВЫЧИСЛЯЯ СТИЛЬ
    const baseMarkersFromProps: BaseMarker[] = markersData.map(data => {
      // Вычисляем радиус маркера на основе процента
      // Формула: r = базовый_радиус + коэффициент * sqrt(процент)
      const baseRadius = 1;
      const scaleFactor = 1; 
      const radius = baseRadius + scaleFactor * Math.sqrt(data.percentage || 0); // Используем || 0 на случай отсутствия процента
      
      console.log(`[CountryMap] Marker for ${data.code}: percentage=${data.percentage}, calculated radius=${radius}`);

      return {
        latLng: data.latLng,
        nameKey: `Common.countries.${data.code}`, // Формируем ключ как раньше
        style: { // Динамический стиль
          fill: "#465FFF", 
          r: radius, // Используем вычисленный радиус
          borderWidth: 1, 
          borderColor: "white", 
          stroke: "#383f47" 
        },
      };
    });

    // Переводим имена, как и раньше
    return baseMarkersFromProps.map(marker => ({
        ...marker,
        name: t(marker.nameKey) // Используем t для имен маркеров
    }))
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .map(({ nameKey, ...rest }) => rest);
    // Зависим от t и от входных данных markersData
  }, [t, markersData]);

  // --- Функция onRegionTipShow больше не нужна для перевода регионов ---

  return (
    <VectorMap
      key={language + JSON.stringify(markersData)} // Добавляем markersData в ключ для перерисовки при их изменении
      map={mapDataForComponent}
      backgroundColor="transparent"
      // markerStyle больше не нужен здесь, так как стиль задается индивидуально для каждого маркера
      // markerStyle={...}
      markersSelectable={true}
      markers={translatedMarkers} // Используем маркеры с индивидуальными стилями
      zoomOnScroll={false}
      zoomMax={12}
      zoomMin={1}
      zoomAnimate={true}
      zoomStep={1.5}
      regionStyle={{
        initial: {
          fill: mapColor || "#D0D5DD",
          fillOpacity: 1,
          fontFamily: "Outfit",
          stroke: "none",
          strokeWidth: 0,
          strokeOpacity: 0,
        },
        hover: {
          fillOpacity: 0.7,
          cursor: "pointer",
          fill: "#465fff",
          stroke: "none",
        },
        selected: {
          fill: "#465FFF",
        },
        selectedHover: {},
      }}
      regionLabelStyle={{
        initial: {
          fill: "#35373e",
          fontWeight: 500,
          fontSize: "13px",
          stroke: "none",
        },
        hover: {},
        selected: {},
        selectedHover: {},
      }}
      // --- Обработчик onRegionTipShow убран ---
    />
  );
};

export default CountryMap;
