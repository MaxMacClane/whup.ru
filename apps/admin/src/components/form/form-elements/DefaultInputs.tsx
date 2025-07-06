'use client';
"use client";
import React, { useState } from 'react';
import ComponentCard from '../../common/ComponentCard';
import Label from '../Label';
import Input from '../input/InputField';
import PasswordInput from '../input/PasswordInput';
import DatePicker from '../date-picker';
import { useTranslations } from 'next-intl';
import CreditCardInput from '../input/CreditCardInput';

export default function DefaultInputs() {
  const t = useTranslations('Forms');
  const [password, setPassword] = useState('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [creditCard, setCreditCard] = useState({});

  const handleDateChange = (selectedDates: Date[]) => {
    if (selectedDates.length > 0) {
      // console.log('Date selected in child:', selectedDates[0]); 
    }
  };

  const handlePasswordChange = (value: string, isValid: boolean) => {
    setPassword(value);
  };

  const handleCreditCardChange = (cardDetails: any) => {
    setCreditCard(cardDetails);
  };

  return (
    <ComponentCard title={t('defaultInputs.title')}>
      <div className="space-y-5">
        <div>
          <Label htmlFor="input1">{t('defaultInputs.labelInput')}</Label>
          <Input type="text" />
        </div>
        <div>
          <Label htmlFor="input2">{t('defaultInputs.labelInputWithPlaceholder')}</Label>
          <Input type="text" placeholder={t('defaultInputs.placeholderEmail')} />
        </div>
        <div>
          <Label htmlFor="passwordInput">{t('defaultInputs.labelPassword')}</Label>
          <PasswordInput
            placeholder={t('defaultInputs.placeholderPassword')}
            onChange={handlePasswordChange}
            showHints={true}
          />
        </div>
        <div>
          <Label htmlFor="datePicker">{t('defaultInputs.labelDatePicker')}</Label>
          <DatePicker
            id="datePicker"
            placeholder={t('defaultInputs.placeholderDatePicker')}
            onChange={handleDateChange}
          />
        </div>
        <div className="md:col-span-2">
          <CreditCardInput
            id="creditCard"
            label={t('defaultInputs.labelInputWithPayment')}
            onChange={handleCreditCardChange}
          />
        </div>
      </div>
    </ComponentCard>
  );
}
