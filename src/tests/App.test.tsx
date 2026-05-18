import { render, screen } from '@testing-library/react';

import App from '../App';
import { Main } from '../components/Main/main-section';
import { MemoryRouter } from 'react-router';

describe('App', () => {
  it('Renders header', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const header = screen.getByText(
      /Search Rick and Morty characters by name/i
    );

    expect(header).toBeInTheDocument();
  });

  it('Renders main', async () => {
    render(
      <MemoryRouter>
        <Main results={[]} loading={false} error={null} totalPages={1} />
      </MemoryRouter>
    );
    const main = screen.getByTestId(/main/i);

    expect(main).toBeInTheDocument();
  });
});
