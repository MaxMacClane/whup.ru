import React from 'react';

// Импортируем SVG как React-компоненты
import UsFlag from 'flag-icons/flags/4x3/us.svg';
import DeFlag from 'flag-icons/flags/4x3/de.svg';
import GbFlag from 'flag-icons/flags/4x3/gb.svg';
import BrFlag from 'flag-icons/flags/4x3/br.svg';
import JpFlag from 'flag-icons/flags/4x3/jp.svg';

// Типизируем компонент флага
type SvgComponent = React.FC<React.SVGProps<SVGSVGElement>>;

// Карта для заглушки: код страны -> компонент флага
export const flagComponents: Record<string, SvgComponent | undefined> = {
  us: UsFlag,
  de: DeFlag,
  gb: GbFlag,
  br: BrFlag,
  jp: JpFlag,
  // Остальные пока не нужны для заглушки
};

// Интерфейс для пропсов компонента Flag
interface FlagProps extends React.SVGProps<SVGSVGElement> {
  code: string; // Код страны (например, 'us', 'de')
  alt?: string; // Альтернативный текст для доступности
}

/**
 * Компонент-заглушка для отображения флага страны по ее коду.
 * Ищет соответствующий SVG-компонент в flagComponents.
 */
const Flag: React.FC<FlagProps> = ({ code, alt, ...props }) => {
  const FlagComponent = flagComponents[code.toLowerCase()];

  if (!FlagComponent) {
    console.warn(`[Flag] Component for code "${code}" not found.`);
    // Возвращаем null или заглушку для неизвестного флага, если компонент не найден
    return null;
  }

  return <FlagComponent {...props} aria-label={alt || `Flag of ${code.toUpperCase()}`} />;
};

export default Flag; 