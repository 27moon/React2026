import { useEffect, useState } from 'react';
import {
  getAllCharacters,
  searchCharactersByName,
  type AllCharacters,
  type Character,
} from '../../services/api';

import './search.css';

import { useSearchParams } from 'react-router';
import { useLocalStorage } from '../../hooks/useLocalStorage';

type SearchProps = {
  onSearchResults: (characters: Character[]) => void;
  onLoading: (loading: boolean) => void;
  onError: (error: string | null) => void;
  onTotalPages: (pages: number) => void;
};

export const Search = ({
  onSearchResults,
  onLoading,
  onError,
  onTotalPages,
}: SearchProps) => {
  const { searchedName, setSearchedName, saveLS } =
    useLocalStorage('searchedChar');
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = Number(searchParams.get('page'));

  const page = Number.isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;

  const [activeSearch, setActiveSearch] = useState(searchedName);

  const getCharacters = async (name: string, page: number) => {
    onLoading(true);
    onError(null);

    try {
      let data: AllCharacters;

      if (name) {
        data = await searchCharactersByName(name, page);
      } else {
        data = await getAllCharacters(page);
      }

      onSearchResults(data.results);
      onTotalPages(data.info.pages);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'An error occurred';

      onError(message);
    } finally {
      onLoading(false);
    }
  };

  useEffect(() => {
    getCharacters(activeSearch, page);
  }, [activeSearch, page]);

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
    setActiveSearch(trimmedValue);

    setSearchParams((prev) => {
      prev.set('page', '1');
      return prev;
    });
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
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};
