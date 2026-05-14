import { Search } from '../Search/search';
import type { Character } from '../../services/api';
import type { FC } from 'react';

type HeaderProps = {
  onSearchResults: (characters: Character[]) => void;
  onLoading: (loading: boolean) => void;
  onError: (error: string | null) => void;
};

export const Header: FC<HeaderProps> = ({
  onSearchResults,
  onLoading,
  onError,
}) => {
  return (
    <header>
      <h1>Search Rick and Morty characters by name</h1>
      <Search
        onSearchResults={onSearchResults}
        onLoading={onLoading}
        onError={onError}
      />
    </header>
  );
};
