import { useState } from 'react';

export function useLocalStorage(key: string, initialValue: string = '') {
  const saveLS = (item: string): void => {
    localStorage.setItem(key, item);
  };

  const [searchedName, setSearchedName] = useState<string>(() => {
    return localStorage.getItem(key) || initialValue;
  });

  return { searchedName, setSearchedName, saveLS };
}
