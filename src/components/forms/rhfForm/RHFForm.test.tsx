import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RHFForm } from './rhfForm';
import { renderWithProviders } from '../../../tests/testUtils';

vi.mock('../../../utils/imageConverter', () => ({
  convertFileToBase64: vi
    .fn()
    .mockResolvedValue('data:image/png;base64,mockString'),
}));

describe('RHFForm Integration & Validation Tests', () => {
  const mockOnClose = vi.fn();
  const preloadedState = {
    countries: { list: ['France', 'Canada', 'Germany'] },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should display validation errors when fields are empty or invalid', async () => {
    renderWithProviders(<RHFForm onClose={mockOnClose} />, { preloadedState });

    const submitButton = screen.getByRole('button', { name: /submit/i });

    expect(submitButton).toBeDisabled();

    const emailInput = screen.getByLabelText(/email/i);
    await userEvent.type(emailInput, 'invalid-email');

    const nameInput = screen.getByLabelText(/name/i);
    await userEvent.type(nameInput, 'john');

    await userEvent.tab();

    await waitFor(() => {
      expect(
        screen.getByText('First letter must be uppercase')
      ).toBeInTheDocument();
    });
  });

  it('should successfully submit form data when all edge cases and rules are met', async () => {
    const { store, container } = renderWithProviders(
      <RHFForm onClose={mockOnClose} />,
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

    const file = new File(['hello'], 'profile.png', { type: 'image/png' });
    await userEvent.upload(screen.getByLabelText(/^image$/i), file);

    const submitButton = screen.getByRole('button', { name: /submit/i });

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });

    await userEvent.click(submitButton);

    await waitFor(() => {
      const submissions = store.getState().formData.data;
      expect(submissions).toHaveLength(1);
      expect(submissions[0].name).toBe('John');
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });
});
