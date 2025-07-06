'use client';

import React, { useState, useCallback } from 'react';
import payment, { Focused } from 'payment';
import { useTranslations } from 'next-intl';
import CardVisualization from './CardVisualization';
import CardInputFields from './CardInputFields';
import Label from '../Label';

interface CreditCardInputProps {
  id: string;
  label?: string;
  onChange: (data: { number: string; expiry: string; cvc: string; name: string; type?: string; isValid: boolean }) => void;
}

// --- Ручное форматирование --- 
const clearNumber = (value = '') => value.replace(/\D+/g, '');

const manualFormatCardNumber = (value: string): string => {
    const clearValue = clearNumber(value);
    let formatted = '';
    for (let i = 0; i < clearValue.length; i++) {
        if (i > 0 && i % 4 === 0) {
            formatted += ' ';
        }
        formatted += clearValue[i];
    }
    // Ограничим длину (например, 16 цифр + 3 пробела = 19 символов)
    return formatted.slice(0, 19); 
};

// --- Обновляем форматирование/валидацию даты ---
const manualFormatExpiry = (value: string): string => {
  const clearValue = clearNumber(value);

  if (clearValue.length >= 3) {
    const month = clearValue.slice(0, 2);
    const year = clearValue.slice(2, 4);

    if (month.length === 2 && parseInt(month) > 12) {
         return month[0];
    }
    if (month === '00') {
        return '0';
    }

    if (year.length === 2 && month.length === 2) {
        const currentYearLastTwoDigits = new Date().getFullYear() % 100;
        const currentMonth = new Date().getMonth() + 1;
        const inputYearInt = parseInt(year);
        const inputMonthInt = parseInt(month);

        if (inputYearInt < currentYearLastTwoDigits ||
            (inputYearInt === currentYearLastTwoDigits && inputMonthInt < currentMonth)) {
            return `${month}/${year[0] || ''}`;
        }
    }

    return `${month}/${year}`;

  } else {
    let month = clearValue;
    
    if (month.length === 1 && parseInt(month) > 1) {
        month = `0${month}`;
    }

    if (month === '00') return '0';
    if (month.length === 2 && parseInt(month) > 12) {
      return month[0];
    }

    return month;
  }
};
// --- Конец обновления форматирования/валидации даты ---

// Ограничение длины CVC (используем payment.fns.cardType для определения длины)
const limitCVC = (value: string, cardNumber: string): string => {
    const clearValue = clearNumber(value);
    let maxLength = 4; // Максимум для Amex
    try {
        const issuer = payment.fns.cardType(cardNumber.replace(/\s/g, ''));
        maxLength = issuer === 'amex' ? 4 : 3;
    } catch (e) {
        // Если тип не определен, оставляем 4
    }
    return clearValue.slice(0, maxLength);
};

const validateInput = (data: { number: string; expiry: string; cvc: string; type?: string }) => {
  const clearCardNumber = clearNumber(data.number);
  const expiryParts = data.expiry.split('/');
  const month = expiryParts[0];
  const year = expiryParts[1];
  const isNumberValid = payment.fns.validateCardNumber(clearCardNumber);
  const isExpiryValid = payment.fns.validateCardExpiry(month, year || '');
  const isCvcValid = payment.fns.validateCardCVC(data.cvc, data.type);
  return isNumberValid && isExpiryValid && isCvcValid;
};

const CreditCardInput: React.FC<CreditCardInputProps> = ({
  id,
  label,
  onChange,
}) => {
  const t = useTranslations('Forms.creditCard');
  
  const [cardState, setCardState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focused: undefined as Focused | undefined,
    type: undefined as string | undefined,
    isNumberMasked: true,
    isValid: false,
  });

  const handleFieldChange = useCallback(
    (field: 'number' | 'expiry' | 'cvc', rawValue: string) => {
      let formattedValue = rawValue;
      let cardType = cardState.type;
      let currentNumber = cardState.number;
      let currentExpiry = cardState.expiry;
      let currentCvc = cardState.cvc;

      if (field === 'number') {
        formattedValue = manualFormatCardNumber(rawValue);
        currentNumber = formattedValue;
        try {
          cardType = payment.fns.cardType(clearNumber(formattedValue));
        } catch (e) {
          cardType = undefined;
        }
      } else if (field === 'expiry') {
        formattedValue = manualFormatExpiry(rawValue);
        currentExpiry = formattedValue;
      } else if (field === 'cvc') {
        formattedValue = limitCVC(rawValue, cardState.number);
        currentCvc = formattedValue;
      }

      const potentialNewState = {
        ...cardState,
        number: currentNumber,
        expiry: currentExpiry,
        cvc: currentCvc,
        type: cardType,
      };

      const isValid = validateInput(potentialNewState);

      const newState = {
        ...potentialNewState,
        [field]: formattedValue,
        isValid: isValid,
      };

      setCardState(newState);
      // Передаем isValid в onChange
      onChange({ ...newState, name: cardState.name }); 
    },
    [cardState, onChange]
  );

  const handleFocusChange = useCallback((focused: Focused | undefined) => {
    // Разрешаем фокус на имени 
    setCardState((prevState) => ({ ...prevState, focused }));
  }, []);

  // Обновляем handleNameChange для форматирования и фокуса
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Оставляем только латинские буквы и пробелы, переводим в верхний регистр
    const formattedName = event.target.value.replace(/[^a-zA-Z\s]/g, '').toUpperCase();
    const stateToValidate = { ...cardState, name: formattedName };
    // Валидность не зависит от имени, используем старое значение isValid
    const newState = {
      ...stateToValidate,
      isValid: cardState.isValid, 
    };
    setCardState(newState);
    onChange(newState); 
  };

  const handleToggleMask = useCallback(() => {
    setCardState((prevState) => ({
      ...prevState,
      isNumberMasked: !prevState.isNumberMasked,
    }));
  }, []);

  // Обновляем handleBlurCheck, добавляя проверку ID поля имени
  const handleBlurCheck = useCallback((event: React.FocusEvent) => {
    setCardState(prevState => ({...prevState, focused: undefined}));
    setTimeout(() => {
        const relatedTarget = event.relatedTarget as HTMLElement | null;
        // Проверяем, перешел ли фокус на одно из полей ввода или поле имени
        const isFocusStillInsideInputs = 
            relatedTarget?.id === `${id}-number` ||
            relatedTarget?.id === `${id}-expiry` ||
            relatedTarget?.id === `${id}-cvc` ||
            relatedTarget?.id === `${id}-name`; // Добавляем ID имени
        if (!isFocusStillInsideInputs) {
            setCardState(prevState => {
                if (!prevState.isNumberMasked) {
                    return { ...prevState, isNumberMasked: true };
                }
                return prevState;
            });
        }
    }, 0);
}, [id]);

  return (
    <div id={`${id}-container`}>
      {label && <Label htmlFor={id}>{label}</Label>}
      
      <CardVisualization
        cvc={cardState.isNumberMasked ? '' : cardState.cvc}
        expiry={cardState.isNumberMasked ? '' : cardState.expiry}
        focused={cardState.isNumberMasked ? undefined : cardState.focused}
        name={cardState.isNumberMasked ? '' : cardState.name}
        number={cardState.isNumberMasked ? '' : cardState.number}
      />

      {/* Поля ввода номера/даты/cvc */}
      <CardInputFields
        idPrefix={id}
        number={cardState.number}
        expiry={cardState.expiry}
        cvc={cardState.cvc}
        isNumberMasked={cardState.isNumberMasked}
        isValid={cardState.isValid}
        onChange={handleFieldChange}
        onFocusChange={handleFocusChange}
        onToggleMask={handleToggleMask}
        onBlurCheck={handleBlurCheck}
      />

      {/* Поле для имени */}
      <div className="mt-4">
          <Label htmlFor={`${id}-name`}>{t('cardHolderName')}</Label>
          <input
              id={`${id}-name`} // Устанавливаем ID
              type="text"
              name="name" 
              className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 dark:border-gray-700 dark:focus:border-brand-800"
              placeholder={t('cardHolderNamePlaceholder')}
              value={cardState.name} // Значение из состояния
              onChange={handleNameChange} // Обновленный обработчик
              onFocus={(e) => handleFocusChange(e.target.name as Focused)} // Передаем фокус
              onBlur={handleBlurCheck} // Используем общий обработчик blur
              autoComplete="cc-name"
              maxLength={50} // Ограничение длины имени
          />
      </div>
    </div>
  );
};

export default CreditCardInput; 