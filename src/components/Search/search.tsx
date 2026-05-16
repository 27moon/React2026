import { useEffect, useState, type FC } from 'react';
import { Api, type AllCharacters, type Character } from '../../services/api';
import { LS } from '../../services/ls';
import './search.css';

type SearchProps = {
  onSearchResults: (characters: Character[]) => void;
  onLoading: (loading: boolean) => void;
  onError: (error: string | null) => void;
};

export const Search: FC<SearchProps> = ({
  onSearchResults,
  onLoading,
  onError,
}) => {
  const [searchedName, setSearchedName] = useState<string>(LS.getLS());

  const getCharacters = async (name: string) => {
    onLoading(true);
    onError(null);

    try {
      let data: AllCharacters;

      if (name) {
        data = await Api.searchCharactersByName(name);
      } else {
        data = await Api.getAllCharacters();
      }

      onSearchResults(data.results);
    } catch (error) {
      if (error instanceof Error) {
        onError(error.message);
      }
    } finally {
      onLoading(false);
    }
  };

  useEffect(() => {
    getCharacters(searchedName);
  }, []);

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

    LS.saveLS(trimmedValue);
    getCharacters(trimmedValue);
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
