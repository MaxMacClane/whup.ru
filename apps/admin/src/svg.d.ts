// Файл: apps/admin/src/svg.d.ts

// Объявляем модуль для импортов вида *.svg?components
declare module '*.svg?components' {
  import React = require('react');
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
} 