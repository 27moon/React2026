import type { FC } from 'react';
import type { Character } from '../../services/api';
import { CardList } from '../CardList/cardList';
import { Loader } from '../Loader/loader';
import { ErrorButton } from '../ErrorButton/error-button';
import { Pagination } from '../Pagination/pagination';

type MainProps = {
  results: Character[];
  loading: boolean;
  error: string | null;
  totalPages: number;
};

export const Main: FC<MainProps> = ({
  results,
  loading,
  error,
  totalPages,
}) => {
  if (error) {
    return (
      <main data-testid="main">
        <div>{error}</div>
        <ErrorButton />
      </main>
    );
  } else if (loading) {
    return (
      <main data-testid="main">
        <Loader />
      </main>
    );
  } else {
    return (
      <main data-testid="main">
        <CardList characters={results} />
        <Pagination totalPages={totalPages} />
        <ErrorButton />
      </main>
    );
  }
};
