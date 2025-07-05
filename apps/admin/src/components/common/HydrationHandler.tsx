'use client';

import React, { useEffect, useRef } from 'react';

// Используем более точный тип для HTML-элементов
type HTMLTag = keyof React.JSX.IntrinsicElements;

interface HydrationHandlerProps {
  children: React.ReactNode;
  elementType?: HTMLTag;
  className?: string;
}

export const HydrationHandler = ({
  children,
  elementType: Tag = 'div',
  className = '',
}: HydrationHandlerProps) => {
  // Используем более специфичный тип для ref
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    // Функция для обработки изменений классов
    const handleClassChanges = (element: HTMLElement) => {
      const currentClasses = element.className.split(' ');
      const originalClasses = className.split(' ');
      
      // Получаем все уникальные классы, добавленные расширениями
      const extensionClasses = currentClasses.filter(
        cls => !originalClasses.includes(cls) && cls.trim() !== ''
      );

      // Добавляем атрибут для подавления предупреждений гидратации
      element.setAttribute('suppresshydrationwarning', 'true');
      
      // Обновляем className, сохраняя как оригинальные классы, так и классы расширений
      const newClassName = [...originalClasses, ...extensionClasses]
        .filter(Boolean)
        .join(' ');
      
      if (element.className !== newClassName) {
        element.className = newClassName;
      }
    };

    // Создаем MutationObserver для отслеживания изменений
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'class' &&
          mutation.target instanceof HTMLElement
        ) {
          handleClassChanges(mutation.target);
        }
      });
    });

    // Начинаем наблюдение за изменениями атрибутов
    observer.observe(elementRef.current, {
      attributes: true,
      attributeFilter: ['class'],
      subtree: false,
    });

    // Выполняем начальную обработку классов
    handleClassChanges(elementRef.current);

    return () => {
      observer.disconnect();
    };
  }, [className]);

  return React.createElement(
    Tag,
    {
      ref: elementRef,
      className,
      suppressHydrationWarning: true,
    },
    children
  );
}; 