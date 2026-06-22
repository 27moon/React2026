'use client';

import { useEffect, useState } from 'react';

export function useLocalStorage() {
  const key = 'searchedChar';

  const [searchedName, setSearchedName] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(key) || '';
    setSearchedName(saved);
  }, []);

  const saveLS = (item: string) => {
    localStorage.setItem(key, item);
  };

  return {
    searchedName,
    setSearchedName,
    saveLS,
  };
}
