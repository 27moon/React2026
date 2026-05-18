import { useState } from 'react';
import './App.css';
import { Header } from './components/Header/header';
import { Main } from './components/Main/main-section';
import { type Character } from './services/api';

export const App = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);

  return (
    <>
      <Header
        onSearchResults={setCharacters}
        onLoading={setLoading}
        onError={setError}
        onTotalPages={setTotalPages}
      />
      <Main
        results={characters}
        loading={loading}
        error={error}
        totalPages={totalPages}
      />
    </>
  );
};

export default App;
