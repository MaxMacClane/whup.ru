import React from "react";
import { twMerge } from "tailwind-merge";

interface TextareaProps {
  placeholder?: string; // Заполнитель
  rows?: number; // Количество строк
  value?: string; // Текущее значение
  onChange?: (value: string) => void; // Обработчик изменений
  className?: string; // Дополнительные CSS классы
  disabled?: boolean; // Состояние "отключено"
  error?: boolean; // Состояние ошибки
  isfocus?: boolean; // Восстановили isfocus
}

const TextArea: React.FC<TextareaProps> = ({
  placeholder = "Enter your message",
  rows = 3,
  value = "",
  onChange,
  className = "",
  disabled = false,
  error = false,
  isfocus = false, // Восстановили isfocus
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  // Собираем классы Tailwind с помощью twMerge
  const mergedClasses = twMerge(
    // --- Базовые стили (БЕЗ фокуса и БЕЗ цвета рамки по умолчанию) ---
    "w-full rounded-lg border bg-transparent p-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30",

    // --- Цвет рамки по умолчанию (если не disabled, error, isfocus) ---
    !disabled && !error && !isfocus ? "border-gray-300 dark:border-gray-700" : "",

    // --- Стили для isfocus (если isfocus=true и не disabled/error) ---
    // Добавляет синюю рамку и убирает стандартный outline
    isfocus && !disabled && !error ? "border-brand-500 outline-none" : "",

    // --- Стили для состояния disabled (имеют приоритет над isfocus) ---
    disabled ? "border-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700" : "",

    // --- Стили для состояния error (имеют приоритет над isfocus, включая focus:border БЕЗ focus:ring) ---
    error ? "border-error-500 focus:border-error-500 focus:outline-none dark:text-error-400 dark:border-error-500" : "",

    // --- Стандартные стили :focus (только если не disabled, error, **И НЕ isfocus**) ---
    // Применяем кольцо только в стандартном состоянии при реальном фокусе
    !disabled && !error && !isfocus ? "focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 focus:outline-none dark:focus:border-brand-800" : "",

    // --- Пользовательские классы ---
    className
  );

  return (
    <div className="relative">
      <textarea
        placeholder={placeholder}
        rows={rows}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={mergedClasses} // Используем объединенные классы
      />
    </div>
  );
};

export default TextArea;
