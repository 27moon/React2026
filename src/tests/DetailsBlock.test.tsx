import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router';
import { DetailsBlock } from '../components/DetailsBlock/detailsBlock';
import * as Api from '../../src/services/api';
import { item } from './mockData';

describe('DetailsBlock', () => {
  it('Renders card details', async () => {
    vi.spyOn(Api, 'searchCharacterById').mockResolvedValue(item);

    render(
      <MemoryRouter initialEntries={['/?details=2']}>
        <Routes>
          <Route path="/" element={<DetailsBlock />} />
        </Routes>
      </MemoryRouter>
    );

    const image = await screen.findByAltText(`${item.name}`);

    expect(screen.getByText(item.name)).toBeInTheDocument();
    expect(screen.getByText(`Species: ${item.species}`)).toBeInTheDocument();
    expect(image).toHaveAttribute('src', item.image);
    expect(screen.getByText(`Gender: ${item.gender}`)).toBeInTheDocument();
    expect(screen.getByText(`Origin: ${item.origin.name}`)).toBeInTheDocument();
    expect(
      screen.getByText(`Location: ${item.location.name}`)
    ).toBeInTheDocument();
  });
});
