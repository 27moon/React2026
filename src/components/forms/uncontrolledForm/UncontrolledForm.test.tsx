import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UncontrolledForm } from './UncontrolledForm';
import { renderWithProviders } from '../../../tests/testUtils';
import { createFormSchema } from '../../../schemas/formSchema';

vi.mock('../../../utils/imageConverter', () => ({
  convertFileToBase64: vi
    .fn()
    .mockResolvedValue('data:image/png;base64,mockString'),
}));

vi.mock('../../../schemas/formSchema', () => ({
  createFormSchema: vi.fn(),
}));

describe('UncontrolledForm Integration & Validation Tests', () => {
  const mockOnClose = vi.fn();
  const preloadedState = {
    countries: { list: ['France', 'Canada', 'Germany'] },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should trigger error states directly on form submit if fields are empty', async () => {
    vi.mocked(createFormSchema).mockReturnValue({
      safeParse: () => ({
        success: false,
        error: {
          issues: [
            { path: ['name'], message: 'Name is required' },
            { path: ['email'], message: 'Email is required' },
          ],
        },
      }),
    } as unknown as ReturnType<typeof createFormSchema>);

    renderWithProviders(<UncontrolledForm onClose={mockOnClose} />, {
      preloadedState,
    });

    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
    });
  });

  it('should successfully submit form data when validation passes (Edge Cases & Success Flow)', async () => {
    vi.mocked(createFormSchema).mockReturnValue({
      safeParse: () => ({
        success: true,
        data: {
          formType: 'uncontrolled',
          name: 'John',
          age: '25',
          email: 'john@example.com',
          gender: 'male',
          country: 'France',
          password: 'SecurePass123!',
          confirmPassword: 'SecurePass123!',
          terms: true,
          image: [new File([''], 'p.png')],
        },
      }),
    } as unknown as ReturnType<typeof createFormSchema>);

    const { store, container } = renderWithProviders(
      <UncontrolledForm onClose={mockOnClose} />,
      {
        preloadedState,
      }
    );

    await userEvent.type(screen.getByLabelText(/^name$/i), 'John');
    await userEvent.type(screen.getByLabelText(/^age$/i), '25');
    await userEvent.type(screen.getByLabelText(/^email$/i), 'john@example.com');
    await userEvent.selectOptions(screen.getByLabelText(/^gender$/i), 'male');
    await userEvent.type(screen.getByLabelText(/^country$/i), 'France');
    await userEvent.type(
      screen.getByLabelText(/^password$/i),
      'SecurePass123!'
    );
    await userEvent.type(
      screen.getByLabelText(/confirm password/i),
      'SecurePass123!'
    );

    const termsCheckbox = container.querySelector('input[name="terms"]');
    if (termsCheckbox) {
      await userEvent.click(termsCheckbox);
    }

    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      const submissions = store.getState().formData.data;
      expect(submissions).toHaveLength(1);
      expect(submissions[0].name).toBe('John');
      expect(submissions[0].id).toBeDefined();
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });
});
