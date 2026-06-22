import { useState, type JSX } from 'react';
import './App.css';
import './colors.css';
import { Header } from './components/Header/header';
import { Main } from './components/Main/main-section';
import { type Character } from './services/types';
import { DetailsBlock } from './components/DetailsBlock/detailsBlock';
import ContextProvider from './context/contextProvider';

export function App(): JSX.Element {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);

  const handleLoading = (loading: boolean) => {
    setLoading(loading);
  };

  const handleError = (error: string | null) => {
    setError(error);
  };

  const handleResults = (characters: Character[]) => {
    setCharacters(characters);
  };

  const handleTotalPages = (pages: number) => {
    setTotalPages(pages);
  };

  return (
    <ContextProvider>
      <>
        <Header
          onSearchResults={handleResults}
          onLoading={handleLoading}
          onError={handleError}
          onTotalPages={handleTotalPages}
        />

        <Main
          results={characters}
          loading={loading}
          error={error}
          totalPages={totalPages}
        />

        <DetailsBlock />
      </>
    </ContextProvider>
  );
}
