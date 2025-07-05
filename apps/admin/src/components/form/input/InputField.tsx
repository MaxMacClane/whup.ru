import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps {
  type?: "text" | "number" | "email" | "password" | "date" | "time" | string;
  id?: string;
  name?: string;
  placeholder?: string;
  defaultValue?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
  min?: string;
  max?: string;
  step?: number;
  disabled?: boolean;
  success?: boolean;
  error?: boolean;
  isfocus?: boolean; // Восстановили isfocus
}

const Input = forwardRef<HTMLInputElement, InputProps>((
  {
    type = "text",
    id,
    name,
    placeholder,
    defaultValue,
    onChange,
    onBlur,
    onKeyDown,
    className = "",
    min,
    max,
    step,
    disabled = false,
    success = false,
    error = false,
    isfocus = false, // Восстановили isfocus
  },
  ref
) => {
  // Собираем классы Tailwind с помощью twMerge
  const mergedClasses = twMerge(
    // --- Базовые стили (БЕЗ фокуса и БЕЗ цвета рамки по умолчанию) ---
    "dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30",

    // --- Цвет рамки по умолчанию (если не disabled, error, success, isfocus) ---
    !disabled && !error && !success && !isfocus ? "border-gray-300 dark:border-gray-700" : "",

    // --- Стили для isfocus (если isfocus=true и не disabled/error/success) ---
    // Добавляет синюю рамку и убирает стандартный outline
    isfocus && !disabled && !error && !success ? "border-brand-500 outline-none" : "",

    // --- Стили для состояния disabled (имеют приоритет над isfocus) ---
    disabled ? "border-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700" : "",

    // --- Стили для состояния error (имеют приоритет над isfocus, включая focus:border БЕЗ focus:ring) ---
    error ? "border-error-500 text-error-800 focus:border-error-500 focus:outline-none dark:text-error-400 dark:border-error-500" : "",

    // --- Стили для состояния success (имеют приоритет над isfocus, включая focus:border БЕЗ focus:ring) ---
    success ? "border-success-400 text-success-500 focus:border-success-500 focus:outline-none dark:text-success-400 dark:border-success-500" : "",

    // --- Стандартные стили :focus (только если не disabled, error, success, **И НЕ isfocus**) ---
    // Применяем кольцо только в стандартном состоянии при реальном фокусе
    !disabled && !error && !success && !isfocus ? "focus:border-brand-300  focus:ring-brand-500/10 focus:outline-none dark:focus:border-brand-800" : "",

    // --- Пользовательские классы ---
    className
  );

  return (
    <input
      ref={ref}
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      defaultValue={defaultValue}
      onChange={onChange}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      className={mergedClasses} // Используем объединенные классы
    />
  );
});

Input.displayName = "Input";

export default Input;
