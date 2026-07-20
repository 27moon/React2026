import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Header } from './Header';

describe('Header Component', () => {
  it('should render navigation and toggle modal states', async () => {
    const mockOnOpen = vi.fn();

    render(<Header onOpen={mockOnOpen} />);

    expect(screen.getByRole('banner')).toBeInTheDocument();

    const openButton = screen.getByRole('button', {
      name: /\+ Uncontrolled Form/i,
    });
    expect(openButton).toBeInTheDocument();

    await userEvent.click(openButton);

    expect(mockOnOpen).toHaveBeenCalledTimes(1);
    expect(mockOnOpen).toHaveBeenCalledWith('uncontrolled');
  });
});
