import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router';
import { NotFound } from '../components/pages/NotFound/not-found';

describe('NotFound', () => {
  it('Renders not found page', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
    const header = screen.getByText(/404/i);
    const backBtn = screen.getByText(/Back to the main page/i);

    expect(header).toBeInTheDocument();
    expect(backBtn).toBeInTheDocument();
  });
});
