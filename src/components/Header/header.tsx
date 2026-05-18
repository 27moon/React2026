import { Search } from '../Search/search';
import type { Character } from '../../services/api';
import type { FC } from 'react';
import { Navigation } from '../Navigation/navigation';

type HeaderProps = {
  onSearchResults: (characters: Character[]) => void;
  onLoading: (loading: boolean) => void;
  onError: (error: string | null) => void;
  onTotalPages: (pages: number) => void;
};
const items = ['About'];

export const Header: FC<HeaderProps> = ({
  onSearchResults,
  onLoading,
  onError,
  onTotalPages,
}) => {
  return (
    <header>
      <h1>Search Rick and Morty characters by name</h1>
      <Navigation items={items} />
      <Search
        onSearchResults={onSearchResults}
        onLoading={onLoading}
        onError={onError}
        onTotalPages={onTotalPages}
      />
    </header>
  );
};
