'use client';

import React, { ChangeEvent, FocusEvent, useCallback } from 'react';
import { Focused } from 'payment';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

interface CardInputFieldsProps {
  idPrefix: string;
  number: string;
  expiry: string;
  cvc: string;
  isNumberMasked: boolean;
  isValid: boolean;
  onChange: (field: 'number' | 'expiry' | 'cvc', rawValue: string) => void;
  onFocusChange: (focused: Focused | undefined) => void;
  onToggleMask: () => void;
  onBlurCheck: (event: React.FocusEvent<HTMLInputElement | HTMLButtonElement>) => void;
}

const CardInputFields: React.FC<CardInputFieldsProps> = ({
  idPrefix,
  number,
  expiry,
  cvc,
  isNumberMasked,
  isValid,
  onChange,
  onFocusChange,
  onToggleMask,
  onBlurCheck,
}) => {
  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      if (name === 'number' || name === 'expiry' || name === 'cvc') {
        onChange(name, value);
      }
    },
    [onChange]
  );

  const handleElementFocus = useCallback(
    (event: FocusEvent<HTMLInputElement | HTMLButtonElement>) => {
      if (event.target instanceof HTMLInputElement) {
        onFocusChange(event.target.name as Focused);
      } else {
        onFocusChange(undefined);
      }
    },
    [onFocusChange]
  );

  return (
    <div
      className={clsx(
        'flex items-center border rounded-lg shadow-theme-xs overflow-hidden',
        'bg-white dark:bg-gray-900',
        isValid
          ? 'border-green-500 focus-within:border-green-600 dark:border-green-700 dark:focus-within:border-green-600'
          : 'border-gray-300 dark:border-gray-700 focus-within:border-brand-300 dark:focus-within:border-brand-800'
      )}
    >
      <input
        id={`${idPrefix}-number`}
        type={isNumberMasked ? 'password' : 'text'}
        inputMode="numeric"
        name="number"
        className="flex-1 h-11 px-4 py-2.5 text-sm bg-transparent focus:outline-none dark:text-white/90 placeholder:text-gray-400 dark:placeholder:text-white/30"
        placeholder="Card Number"
        value={number}
        onChange={handleInputChange}
        onFocus={handleElementFocus}
        onBlur={onBlurCheck}
        autoComplete="cc-number"
        maxLength={19}
      />
      <input
        id={`${idPrefix}-expiry`}
        type="text"
        inputMode="numeric"
        name="expiry"
        className="w-20 h-11 px-2 py-2.5 text-sm bg-transparent focus:outline-none dark:text-white/90 placeholder:text-gray-400 dark:placeholder:text-white/30 text-center border-l border-gray-300 dark:border-gray-700"
        placeholder="MM/YY"
        value={expiry}
        onChange={handleInputChange}
        onFocus={handleElementFocus}
        onBlur={onBlurCheck}
        autoComplete="cc-exp"
        maxLength={5}
      />
      <input
        id={`${idPrefix}-cvc`}
        type="password"
        inputMode="numeric"
        name="cvc"
        className="w-20 h-11 px-2 py-2.5 text-sm bg-transparent focus:outline-none dark:text-white/90 placeholder:text-gray-400 dark:placeholder:text-white/30 text-center border-l border-gray-300 dark:border-gray-700"
        placeholder="CVC"
        value={cvc || ''}
        onChange={handleInputChange}
        onFocus={handleElementFocus}
        onBlur={onBlurCheck}
        autoComplete="cc-csc"
        maxLength={4}
      />
      <button
        id={`${idPrefix}-mask-toggle`}
        name="mask-toggle"
        onClick={onToggleMask}
        onFocus={handleElementFocus}
        onBlur={onBlurCheck}
        className="px-4 bg-transparent text-gray-500 dark:text-gray-400 focus:outline-none border-l border-gray-300 dark:border-gray-700 h-11">
        {isNumberMasked ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
      </button>
    </div>
  );
};

export default CardInputFields; 