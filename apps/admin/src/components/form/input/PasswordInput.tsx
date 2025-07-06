'use client';
"use client";

import React, { useState, useRef } from "react";
import Input from "./InputField";
import { EyeIcon, EyeCloseIcon } from "../../../icons";
import { usePasswordValidation } from "../validation/PasswordValidation";
import { useTranslations } from 'next-intl';

interface PasswordInputProps {
  onChange?: (value: string, isValid: boolean) => void;
  onBlur?: () => void;
  placeholder?: string;
  className?: string;
  showHints?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  onChange,
  onBlur,
  placeholder = "Enter your password",
  className = "",
  showHints = false,
}) => {
  const t = useTranslations('Forms');
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { validationState, validationRules, validate } = usePasswordValidation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Фильтруем ввод - оставляем только латинские буквы, цифры и спецсимволы
    const filteredValue = e.target.value.replace(/[^A-Za-z0-9!@#$%^&*]/g, '');
    
    // Если значение было отфильтровано, обновляем поле ввода
    if (filteredValue !== e.target.value) {
      e.target.value = filteredValue;
    }

    const { isValid } = validate(filteredValue);
    if (onChange) {
      onChange(filteredValue, isValid);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Если нажата клавиша с кириллицей или другими неразрешенными символами,
    // проверяем что она не является управляющей (Backspace, Delete и т.д.)
    if (!/^[A-Za-z0-9!@#$%^&*]$/.test(e.key) && e.key.length === 1) {
      e.preventDefault();
    }
  };

  const handleBlur = () => {
    if (onBlur) {
      onBlur();
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="space-y-2">
      <div className="relative">
        <Input
          ref={inputRef}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          className={className}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          success={validationState === 'valid'}
          error={validationState === 'invalid'}
        />
        <span
          onClick={togglePasswordVisibility}
          className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
        >
          {showPassword ? (
            <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
          ) : (
            <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
          )}
        </span>
      </div>
      
      {/* Индикаторы валидации - показываем только если showHints=true */}
      {showHints && (
        <div className="space-y-1 text-sm">
          <div className={`flex items-center gap-2 ${validationRules.minLength ? 'text-success-500' : 'text-gray-500'}`}>
            <span className="w-2 h-2 rounded-full bg-current" />
            <span>{t('passwordHints.minLength')}</span>
          </div>
          <div className={`flex items-center gap-2 ${validationRules.hasLowerCase ? 'text-success-500' : 'text-gray-500'}`}>
            <span className="w-2 h-2 rounded-full bg-current" />
            <span>{t('passwordHints.lowercase')}</span>
          </div>
          <div className={`flex items-center gap-2 ${validationRules.hasUpperCase ? 'text-success-500' : 'text-gray-500'}`}>
            <span className="w-2 h-2 rounded-full bg-current" />
            <span>{t('passwordHints.uppercase')}</span>
          </div>
          <div className={`flex items-center gap-2 ${validationRules.hasNumber ? 'text-success-500' : 'text-gray-500'}`}>
            <span className="w-2 h-2 rounded-full bg-current" />
            <span>{t('passwordHints.numbers')}</span>
          </div>
          <div className={`flex items-center gap-2 ${validationRules.hasSpecial ? 'text-success-500' : 'text-gray-500'}`}>
            <span className="w-2 h-2 rounded-full bg-current" />
            <span>{t('passwordHints.special')}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordInput; 