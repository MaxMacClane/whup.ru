"use client";
import React, { useState } from "react";
import { useTranslations } from 'next-intl';
import ComponentCard from "../../common/ComponentCard";
import Radio from "../input/Radio";

export default function RadioButtons() {
  const t = useTranslations('Forms.radioButtons');
  const tStates = useTranslations('Forms.states');
  
  const [selectedValue, setSelectedValue] = useState<string>("option2");

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
  };
  return (
    <ComponentCard title={t('title')}>
      <div className="flex flex-wrap items-center gap-8">
        <Radio
          id="radio1"
          name="group1"
          value="option1"
          checked={selectedValue === "option1"}
          onChange={handleRadioChange}
          label={tStates('default')}
        />
        <Radio
          id="radio2"
          name="group1"
          value="option2"
          checked={selectedValue === "option2"}
          onChange={handleRadioChange}
          label={tStates('selected')}
        />
        <Radio
          id="radio3"
          name="group1"
          value="option3"
          checked={selectedValue === "option3"}
          onChange={handleRadioChange}
          label={tStates('disabled')}
          disabled={true}
        />
      </div>
    </ComponentCard>
  );
}
