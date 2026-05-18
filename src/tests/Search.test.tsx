import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Search } from '../components/Search/search';
import * as Api from '../services/api';
import { MemoryRouter } from 'react-router';

describe('Search', () => {
  it('Renders search input and search button', () => {
    render(
      <MemoryRouter>
        <Search
          onSearchResults={() => {}}
          onLoading={() => {}}
          onError={() => {}}
          onTotalPages={() => {}}
        />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText(/search/i);
    const buttonSearch = screen.getByRole('button', { name: /search/i });

    expect(input).toBeInTheDocument();
    expect(buttonSearch).toBeInTheDocument();
  });

  it('Displays previously saved search term from localStorage on mount', () => {
    localStorage.setItem('searchedChar', 'some character');
    render(
      <MemoryRouter>
        <Search
          onSearchResults={() => {}}
          onLoading={() => {}}
          onError={() => {}}
          onTotalPages={() => {}}
        />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText(/search/i);

    expect(input).toHaveValue('some character');
  });

  it('Shows empty input when no saved term exists', () => {
    localStorage.clear();
    render(
      <MemoryRouter>
        <Search
          onSearchResults={() => {}}
          onLoading={() => {}}
          onError={() => {}}
          onTotalPages={() => {}}
        />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText(/search/i);

    expect(input).toHaveValue('');
  });

  it('Updates input value when user types', () => {
    render(
      <MemoryRouter>
        <Search
          onSearchResults={() => {}}
          onLoading={() => {}}
          onError={() => {}}
          onTotalPages={() => {}}
        />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText(/search/i);

    fireEvent.change(input, {
      target: { value: 'some character' },
    });

    expect(input).toHaveValue('some character');
  });

  it('Saves search term to localStorage when search button is clicked', () => {
    render(
      <MemoryRouter>
        <Search
          onSearchResults={() => {}}
          onLoading={() => {}}
          onError={() => {}}
          onTotalPages={() => {}}
        />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText(/search/i);
    const buttonSearch = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, {
      target: { value: 'some character' },
    });
    fireEvent.click(buttonSearch);

    expect(localStorage.getItem('searchedChar')).toBe('some character');
  });

  it('Trims whitespace from search input before saving', () => {
    render(
      <MemoryRouter>
        <Search
          onSearchResults={() => {}}
          onLoading={() => {}}
          onError={() => {}}
          onTotalPages={() => {}}
        />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText(/search/i);
    const buttonSearch = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, {
      target: { value: ' some character ' },
    });
    fireEvent.click(buttonSearch);

    expect(localStorage.getItem('searchedChar')).toBe('some character');
  });

  it('Overwrites existing localStorage value when new search is performed', () => {
    render(
      <MemoryRouter>
        <Search
          onSearchResults={() => {}}
          onLoading={() => {}}
          onError={() => {}}
          onTotalPages={() => {}}
        />
      </MemoryRouter>
    );
    localStorage.setItem('searchedChar', 'some character');

    const input = screen.getByPlaceholderText(/search/i);
    const buttonSearch = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, {
      target: { value: 'some new character' },
    });
    fireEvent.click(buttonSearch);

    expect(localStorage.getItem('searchedChar')).toBe('some new character');
  });

  it('Checks for error on unsuccessful result', async () => {
    const onError = vi.fn();
    vi.spyOn(Api, 'searchCharactersByName').mockRejectedValue(
      new Error('Character not found.')
    );
    render(
      <MemoryRouter>
        <Search
          onSearchResults={() => {}}
          onLoading={() => {}}
          onError={onError}
          onTotalPages={() => {}}
        />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/search/i);

    fireEvent.change(input, {
      target: { value: 'something non-existent' },
    });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => {
      expect(onError).toHaveBeenCalledWith('Character not found.');
    });
  });
});
