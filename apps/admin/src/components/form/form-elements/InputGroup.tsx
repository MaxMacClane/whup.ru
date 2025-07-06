'use client';
"use client";
import React, { useState, useRef } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import { EnvelopeIcon } from "../../../icons";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useTranslations } from 'next-intl';
import { useEmailValidation } from "../validation/EmailValidation";

export default function InputGroup() {
  const t = useTranslations('Forms');
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>();
  const emailInputRef = useRef<HTMLInputElement>(null);
  const { validationState: emailValidationState, validate: validateEmailInput } = useEmailValidation();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    validateEmailInput(e.target.value);
  };

  const handleEmailBlur = () => {
    const currentEmail = emailInputRef.current?.value;
    if (currentEmail) {
      validateEmailInput(currentEmail);
    }
  };

  return (
    <ComponentCard title={t('inputGroup.title')}>
      <div className="space-y-6">
        <div>
          <Label htmlFor="email">{t('inputGroup.labelEmail')}</Label>
          <div className="relative">
            <Input
              ref={emailInputRef}
              id="email"
              type="email"
              placeholder="info@gmail.com"
              className="pl-18 rtl:pr-18 rtl:pl-4 dark:bg-gray-900"
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              success={emailValidationState === 'valid'}
              error={emailValidationState === 'invalid'}
            />
            <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
              <EnvelopeIcon />
            </span>
          </div>
        </div>
        
        <div>
          <Label>{t('inputGroup.labelPhone')}</Label>
          <PhoneInput
            international
            defaultCountry="RU"
            placeholder={t('inputGroup.placeholderPhone') || "Enter phone number"}
            value={phoneNumber}
            onChange={setPhoneNumber}
            countrySelectProps={{ className: "input-phone-country-select" }}
            numberInputProps={{ className: "input-phone-number-input py-2 pl-2 focus:outline-none" }}
            className="input-phone-number h-11 border rounded-lg border-gray-200 w-full dark:bg-gray-900 dark:border-gray-700 dark:text-white/90"
          />
        </div>
      </div>
    </ComponentCard>
  );
}
