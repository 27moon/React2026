import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Pagination } from '../components/Pagination/pagination';
import { MemoryRouter } from 'react-router';

describe('Pagination', () => {
  it('Disables prev button', () => {
    render(
      <MemoryRouter>
        <Pagination totalPages={1} />
      </MemoryRouter>
    );

    expect(screen.getByText('Prev')).toBeDisabled();
  });

  it('Disables next button', () => {
    render(
      <MemoryRouter initialEntries={['/?page=2']}>
        <Pagination totalPages={2} />
      </MemoryRouter>
    );

    expect(screen.getByText('Next')).toBeDisabled();
    expect(screen.getByText('Prev')).toBeEnabled();
  });

  it('Disables both buttons', () => {
    render(
      <MemoryRouter>
        <Pagination totalPages={1} />
      </MemoryRouter>
    );

    expect(screen.getByText('Prev')).toBeDisabled();
    expect(screen.getByText('Next')).toBeDisabled();
  });

  it('Updates the page number on the next btn click', () => {
    render(
      <MemoryRouter initialEntries={['/?page=1']}>
        <Pagination totalPages={2} />
      </MemoryRouter>
    );
    const nextButton = screen.getByText('Next');

    fireEvent.click(nextButton);
    expect(screen.getByText('2 / 2')).toBeInTheDocument();
  });
});
