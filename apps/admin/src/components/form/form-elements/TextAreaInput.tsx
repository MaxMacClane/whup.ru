"use client";
import React from "react";
import ComponentCard from "../../common/ComponentCard";
import TextArea from "../input/TextArea";
import Label from "../Label";

export default function TextAreaInput() {
  return (
    <ComponentCard title="Текстовые области (Примеры)">
      <div className="space-y-6">
        {/* 1. Стандартное состояние */}
        <div>
          <Label>Стандартная</Label>
          <TextArea
            rows={4}
            placeholder="Плейсхолдер..."
            value=""
            disabled
          />
        </div>

        {/* 2. Имитация состояния "В фокусе" */}
        <div>
          <Label>В фокусе</Label>
          <TextArea
            rows={4}
            placeholder="Плейсхолдер..."
            value="Пример текста."
            isfocus
          />
        </div>

        {/* 3. Состояние ошибки */}
        <div>
          <Label>С ошибкой</Label>
          <TextArea
            rows={4}
            placeholder="Плейсхолдер..."
            value="Пример текста в области с ошибкой."
            error
          />
        </div>
      </div>
    </ComponentCard>
  );
}
