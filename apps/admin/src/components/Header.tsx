'use client';

import { LanguageSwitcher } from './LanguageSwitcher';
// ... другие импорты

const Header: React.FC = () => {
  return (
    <header className="... ваши существующие классы ...">
      {/* Существующий контент хедера */}
      <div className="flex items-center gap-4">
        {/* Другие элементы хедера */}
        <LanguageSwitcher />
      </div>
    </header>
  );
};

export default Header; 