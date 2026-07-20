import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Dashboard } from './Dashboard';
import { renderWithProviders } from '../../tests/testUtils';

describe('Dashboard & Card Components', () => {
  it('should render empty state message when there are no submissions', () => {
    renderWithProviders(<Dashboard />, {
      preloadedState: { formData: { data: [] } },
    });
    expect(screen.getByText('No submissions yet')).toBeInTheDocument();
  });

  it('should render a list of submission cards when data exists', () => {
    const mockSubmission = {
      id: 'uuid-123',
      formType: 'rhf' as const,
      name: 'John Doe',
      age: 25,
      email: 'john@example.com',
      gender: 'male',
      country: 'France',
      terms: true,
      image: 'data:image/png;base64,mock',
    };

    renderWithProviders(<Dashboard />, {
      preloadedState: { formData: { data: [mockSubmission] } },
    });

    expect(screen.getByText('Submitted Forms')).toBeInTheDocument();

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });
});
