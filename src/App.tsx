import { useState } from 'react';
import './App.css';
import { Header } from './components/Header/header';
import { Main } from './components/Main/main-section';
import { type Character } from './services/api';

export const App = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <>
      <Header
        onSearchResults={setCharacters}
        onLoading={setLoading}
        onError={setError}
      />
      <Main results={characters} loading={loading} error={error} />
    </>
  );
};

export default App;
