'use client';

import { useContext, useEffect, useState } from 'react';
import './search.css';

import { useLocalStorage } from '../../hooks/lsHook';
import { ThemeContext } from '../../context/themeContext';

import { useSearchParams, useRouter } from 'next/navigation';

import { getErrorMessage } from '../../services/functions';
import { type Character } from '../../services/types';

import {
  useGetAllCharactersQuery,
  useSearchCharactersByNameQuery,
} from '../../services/apiRTK';

type SearchProps = {
  onSearchResults: (characters: Character[]) => void;
  onLoading: (loading: boolean) => void;
  onError: (error: string | null) => void;
  onTotalPages: (pages: number) => void;
};

export function Search({
  onSearchResults,
  onLoading,
  onError,
  onTotalPages,
}: SearchProps) {
  const { searchedName, setSearchedName, saveLS } = useLocalStorage();

  const searchParams = useSearchParams();
  const router = useRouter();

  const page = Number(searchParams.get('page')) || 1;

  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('ThemeContext must be used within ThemeProvider');
  }

  const { theme } = context;

  const [searchFiredName, setSearchTriggeredName] = useState(searchedName);

  const trimmedFiredName = searchFiredName.trim();

  const searchByName = useSearchCharactersByNameQuery(
    { name: trimmedFiredName, page },
    { skip: !trimmedFiredName }
  );

  const getAll = useGetAllCharactersQuery(page, {
    skip: !!trimmedFiredName,
  });

  const data = trimmedFiredName ? searchByName.data : getAll.data;
  const error = trimmedFiredName ? searchByName.error : getAll.error;
  const isFetching = trimmedFiredName
    ? searchByName.isFetching
    : getAll.isFetching;

  useEffect(() => {
    onLoading(isFetching);
  }, [isFetching, onLoading]);

  useEffect(() => {
    if (!error) {
      onError(null);
      return;
    }

    if (typeof error === 'object' && 'status' in error) {
      if (typeof error.status === 'number') {
        onError(getErrorMessage(error.status));
      } else {
        onError('An unexpected error occurred.');
      }
    }
  }, [error, onError]);

  useEffect(() => {
    if (data?.results) {
      onSearchResults(data.results);
      onTotalPages(data.info.pages);
    }
  }, [data, onSearchResults, onTotalPages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedName(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    const trimmedValue = searchedName.trim();

    saveLS(trimmedValue);

    const params = new URLSearchParams(searchParams.toString());
    params.set('page', '1');

    router.push(`/?${params.toString()}`);

    setSearchTriggeredName(trimmedValue);
  };

  return (
    <div>
      <input
        type="text"
        value={searchedName}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
        className="input"
      />

      <button onClick={handleSearch} className={`btn-search ${theme}`}>
        Search
      </button>

      <button
        onClick={() => {
          if (trimmedFiredName) {
            searchByName.refetch();
          } else {
            getAll.refetch();
          }
        }}
      >
        refetch
      </button>
    </div>
  );
}
