import { render, screen } from '@testing-library/react';
import { Main } from '../components/Main/main-section';
import { MemoryRouter, Route, Routes } from 'react-router';

const itemArray = [
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
];

describe('Main', () => {
  it('Displays error message on error', () => {
    render(
      <MemoryRouter>
        <Main
          results={[]}
          loading={false}
          error={'no results'}
          totalPages={1}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('no results')).toBeInTheDocument();
  });

  it('Displays loading sign on loading', () => {
    render(
      <MemoryRouter>
        <Main results={[]} loading={true} error={null} totalPages={1} />
      </MemoryRouter>
    );
    const gif = screen.getByAltText('loading');

    expect(gif).toBeInTheDocument();
  });

  it('Displays card list if there is no error or loading', () => {
    render(
      <MemoryRouter>
        <Main results={itemArray} loading={false} error={null} totalPages={1} />
      </MemoryRouter>
    );
    const cardsContainer = screen.getByTestId('cards-container');

    expect(cardsContainer.children.length).toEqual(itemArray.length);
  });

  it('Removes left side block on click', () => {
    render(
      <MemoryRouter initialEntries={['/?details=2']}>
        <Routes>
          <Route
            path="/"
            element={
              <Main
                results={itemArray}
                loading={false}
                error={null}
                totalPages={1}
              />
            }
          />
        </Routes>
      </MemoryRouter>
    );
    const cardsContainer = screen.getByTestId('cards-container').parentElement;

    cardsContainer?.click();
    expect(window.location.search).not.toContain('details');
  });
});
