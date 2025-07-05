"use client";
import React from "react";
import ComponentCard from "../../common/ComponentCard";
import Input from "../input/InputField";
import Label from "../Label";

export default function InputStates() {
  return (
    <ComponentCard
      title="Состояния полей ввода (Примеры)"
      desc="Демонстрация вида полей в разных состояниях."
    >
      <div className="space-y-6">
        {/* 1. Стандартное */}
        <div>
          <Label>Стандартное</Label>
          <Input
            type="text"
            placeholder="Плейсхолдер..."
            defaultValue="Обычное поле"
          />
        </div>

        {/* 2. В фокусе (Имитация) */}
        <div>
          <Label>В фокусе</Label>
          <Input
            type="text"
            placeholder="Плейсхолдер..."
            defaultValue="Поле в фокусе "
            isfocus
          />
        </div>

        {/* 3. Успех */}
        <div>
          <Label>Успех</Label>
          <Input
            type="text"
            placeholder="Плейсхолдер..."
            defaultValue="Успешная валидация"
            success
          />
        </div>

        {/* 4. Ошибка */}
        <div>
          <Label>Ошибка</Label>
          <Input
            type="text"
            placeholder="Плейсхолдер..."
            defaultValue="Ошибка валидации "
            error
          />
        </div>

        {/* 5. Отключено */}
        <div>
          <Label>Отключено</Label>
          <Input
            type="text"
            placeholder="Плейсхолдер..."
            defaultValue="Неактивное поле"
            disabled
          />
        </div>
      </div>
    </ComponentCard>
  );
}
