'use client';
"use client";
import React, { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Select from "../Select";
import MultiSelect from "../MultiSelect";
import { ChevronDownIcon } from "@/icons";
import { useTranslations } from 'next-intl';

export default function SelectInputs() {
  const t = useTranslations('Forms');

  const options = [
    { value: "marketing", label: "Marketing" },
    { value: "template", label: "Template" },
    { value: "development", label: "Development" },
  ];

  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };

  const multiOptions = [
    { value: "1", text: t('selectInputs.options.option1'), selected: false },
    { value: "2", text: t('selectInputs.options.option2'), selected: false },
    { value: "3", text: t('selectInputs.options.option3'), selected: false },
    { value: "4", text: t('selectInputs.options.option4'), selected: false },
    { value: "5", text: t('selectInputs.options.option5'), selected: false },
  ];

  return (
    <ComponentCard title={t('selectInputs.title')}>
      <div className="space-y-6">
        <div>
          <Label htmlFor="select1">{t('selectInputs.labelSelectInput')}</Label>
          <div className="relative">
            <Select
              placeholder={t('selectInputs.placeholderSelectOption')}
              options={options}
              onChange={handleSelectChange}
              className="dark:bg-dark-900"
            />
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <ChevronDownIcon/>
            </span>
          </div>
        </div>
        <div className="relative">
          <MultiSelect
            label={t('selectInputs.labelMultiSelect')}
            options={multiOptions}
            defaultSelected={["1", "3"]}
            onChange={(values) => setSelectedValues(values)}
          />
          <p className="sr-only">
            Selected Values: {selectedValues.join(", ")}
          </p>
        </div>
      </div>
    </ComponentCard>
  );
}
