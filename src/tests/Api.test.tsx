import { vi } from 'vitest';
import * as Api from '../services/api';

const itemArray = {
  results: [
    {
      id: 1,
      name: 'Morty Smith',
      species: 'Human',
      image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
      gender: 'Male',
      origin: {
        name: 'unknown',
      },
      location: {
        name: 'Citadel of Ricks',
      },
    },
    {
      id: 2,
      name: 'Rick Sanchez',
      species: 'Human',
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      gender: 'Male',
      origin: {
        name: 'Earth (C-137)',
      },
      location: {
        name: 'Citadel of Ricks',
      },
    },
    {
      id: 3,
      name: 'Summer Smith',
      species: 'Human',
      image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
      gender: 'Female',
      origin: {
        name: 'Earth (Replacement Dimension)',
      },
      location: {
        name: 'Earth (Replacement Dimension)',
      },
    },
  ],
};

const item = {
  id: 1,
  name: 'Morty Smith',
  species: 'Human',
  image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
  gender: 'Male',
  origin: {
    name: 'unknown',
  },
  location: {
    name: 'Citadel of Ricks',
  },
};

describe('Api', () => {
  it('Returns data on api call', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve(new Response(JSON.stringify(itemArray)))
    );
    const data = await Api.getAllCharacters();

    expect(data).toEqual(itemArray);
  });

  it('Returns data by name on api call', async () => {
    const name = 'Morty';

    global.fetch = vi.fn(() =>
      Promise.resolve(new Response(JSON.stringify(item)))
    );
    const data = await Api.searchCharactersByName(name);

    expect(data).toEqual(item);
  });

  it('Returns error on not ok response', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 404,
        json: () => Promise.resolve({}),
      } as Response)
    );

    await expect(Api.getAllCharacters()).rejects.toThrow(
      'Character not found.'
    );
  });

  it('Returns error on not ok response - search by name', async () => {
    const name = 'Morty';

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 404,
        json: () => Promise.resolve({}),
      } as Response)
    );

    await expect(Api.searchCharactersByName(name)).rejects.toThrow(
      'Character not found.'
    );
  });

  it('throws error on fetch data', async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error('some error')));

    await expect(Api.getAllCharacters()).rejects.toThrow('some error');
  });

  it('throws error on on fetch data by name on new Error', async () => {
    const name = 'Morty';
    global.fetch = vi.fn(() => Promise.reject(new Error('some error')));

    await expect(Api.searchCharactersByName(name)).rejects.toThrow(
      'some error'
    );
  });
});
