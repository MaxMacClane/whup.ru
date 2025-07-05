'use client';

import React from 'react';
import Cards, { Focused } from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

interface CardVisualizationProps {
  cvc: string;
  expiry: string;
  focused?: Focused | undefined;
  name: string;
  number: string;
}

const CardVisualization: React.FC<CardVisualizationProps> = ({
  cvc,
  expiry,
  focused,
  name,
  number,
}) => {
  return (
    <div className="mb-4">
      <Cards
        cvc={cvc}
        expiry={expiry}
        focused={focused}
        name={name}
        number={number}
        preview={true} // Показываем превью всегда
      />
    </div>
  );
};

export default CardVisualization; 