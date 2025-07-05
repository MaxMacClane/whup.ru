import { useState } from 'react';

export type ValidationState = 'initial' | 'valid' | 'invalid';

export interface EmailValidationResult {
  isValid: boolean;
  validationState: ValidationState;
}

export const useEmailValidation = () => {
  const [validationState, setValidationState] = useState<ValidationState>('initial');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validate = (email: string): EmailValidationResult => {
    if (!email || email === "") {
      setValidationState('initial');
      return { isValid: false, validationState: 'initial' };
    }

    const isValid = validateEmail(email);
    const newState = isValid ? 'valid' : 'invalid';
    
    if (validationState !== newState) {
      setValidationState(newState);
    }

    return { isValid, validationState: newState };
  };

  return {
    validationState,
    validate,
  };
}; 