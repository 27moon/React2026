'use client';

import { useContext } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { skipToken } from '@reduxjs/toolkit/query';

import './detailsBlock.css';

import { ThemeContext } from '../../context/themeContext';
import { Loader } from '../Loader/loader';
import { getErrorMessage } from '../../services/functions';
import { useSearchCharacterByIdQuery } from '../../services/apiRTK';

export function DetailsBlock() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const detailsId = searchParams.get('details');

  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('ThemeContext missing provider');
  }

  const { theme } = context;

  const {
    data: character,
    error,
    isLoading,
    isFetching,
    refetch,
  } = useSearchCharacterByIdQuery(detailsId ? Number(detailsId) : skipToken);

  const close = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete('details');

    const query = params.toString();

    router.push(query ? `/?${query}` : '/');
  };

  if (!detailsId) return null;

  if (isLoading || isFetching) {
    return (
      <div className="details-block">
        <Loader />
      </div>
    );
  }

  if (error) {
    if ('status' in error && typeof error.status === 'number') {
      return <div>{getErrorMessage(error.status)}</div>;
    }

    return <div>An unexpected error occurred.</div>;
  }

  if (!character) {
    return <div>Character not found</div>;
  }

  return (
    <div className="details-block">
      <button className={`btn-close ${theme}`} onClick={close}>
        Close
      </button>

      <h2>{character.name}</h2>

      <img src={character.image} alt={character.name} />

      <p>Species: {character.species}</p>
      <p>Gender: {character.gender}</p>
      <p>Origin: {character.origin.name}</p>
      <p>Location: {character.location.name}</p>

      <button onClick={refetch}>refetch</button>
    </div>
  );
}
