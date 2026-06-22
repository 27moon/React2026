'use client';

import { useState } from 'react';
import { Header } from '../components/Header/header';
import { Main } from '../components/Main/main-section';
import { type Character } from '../services/types';

export default function Page() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);

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
}
