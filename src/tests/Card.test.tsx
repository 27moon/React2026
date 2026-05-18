import { render, screen } from '@testing-library/react';
import { Card } from '../components/Card/card';
import { MemoryRouter } from 'react-router';
import { item } from './mockData';

describe('Card', () => {
  it('Displays item name and description correctly', () => {
    render(
      <MemoryRouter>
        <Card key={item.id} character={item} />
      </MemoryRouter>
    );

    const image = screen.getByAltText(`${item.name}`);

    expect(screen.getByText(item.name)).toBeInTheDocument();

    expect(image).toHaveAttribute('src', item.image);
  });
});
