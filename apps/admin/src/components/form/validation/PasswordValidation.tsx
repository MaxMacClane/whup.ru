import { useState } from 'react';

export interface PasswordValidationRules {
  minLength: boolean;     // Минимальная длина (8 символов)
  hasLowerCase: boolean;  // Наличие строчных букв
  hasUpperCase: boolean;  // Наличие заглавных букв
  hasNumber: boolean;     // Наличие цифр
  hasSpecial: boolean;    // Наличие специальных символов
}

export type ValidationState = 'initial' | 'valid' | 'invalid';

export interface PasswordValidationResult {
  isValid: boolean;
  validationState: ValidationState;
  rules: PasswordValidationRules;
}

export const usePasswordValidation = () => {
  const [validationState, setValidationState] = useState<ValidationState>('initial');
  const [validationRules, setValidationRules] = useState<PasswordValidationRules>({
    minLength: false,
    hasLowerCase: false,
    hasUpperCase: false,
    hasNumber: false,
    hasSpecial: false,
  });

  const validatePassword = (password: string): PasswordValidationRules => {
    return {
      minLength: password.length >= 8,
      hasLowerCase: /[a-z]/.test(password),
      hasUpperCase: /[A-Z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
  };

  const validate = (password: string): PasswordValidationResult => {
    if (!password || password === "") {
      setValidationState('initial');
      setValidationRules({
        minLength: false,
        hasLowerCase: false,
        hasUpperCase: false,
        hasNumber: false,
        hasSpecial: false,
      });
      return {
        isValid: false,
        validationState: 'initial',
        rules: validationRules,
      };
    }

    const rules = validatePassword(password);
    setValidationRules(rules);

    // Проверяем все правила
    const isValid = Object.values(rules).every(Boolean);
    const newState = isValid ? 'valid' : 'invalid';
    
    if (validationState !== newState) {
      setValidationState(newState);
    }

    return {
      isValid,
      validationState: newState,
      rules,
    };
  };

  return {
    validationState,
    validationRules,
    validate,
  };
}; 