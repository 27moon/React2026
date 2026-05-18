import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router';
import { About } from '../components/pages/About/about';

describe('About', () => {
  it('renders about page', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );
    const description = screen.getByText(
      /Find info about Rick and Morty characters./i
    );

    expect(description).toBeInTheDocument();
  });
});
