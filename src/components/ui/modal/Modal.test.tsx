import { render, screen, renderHook, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Modal } from './Modal';
import { useModal } from '../../../hooks/useModal';

describe('useModal Hook & Modal Component', () => {
  it('should toggle open/close state correctly', () => {
    const { result } = renderHook(() => useModal());

    expect(result.current.open).toBe(false);

    act(() => {
      result.current.openModal('uncontrolled');
    });
    expect(result.current.open).toBe(true);

    act(() => {
      result.current.closeModal();
    });
    expect(result.current.open).toBe(false);
  });

  it('should render modal content when open and handle onClose via overlay click', async () => {
    const mockClose = vi.fn();

    render(
      <Modal open={true} onClose={mockClose}>
        <div data-testid="modal-content">Hello Modal</div>
      </Modal>
    );

    expect(screen.getByTestId('modal-content')).toBeInTheDocument();

    const overlay = document.querySelector('.modal-overlay');
    expect(overlay).toBeInTheDocument();

    if (overlay) {
      await userEvent.click(overlay);
    }

    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  it('should close modal when Escape key is pressed', async () => {
    const mockClose = vi.fn();

    render(
      <Modal open={true} onClose={mockClose}>
        <div>Modal Content</div>
      </Modal>
    );

    await userEvent.keyboard('{Escape}');

    expect(mockClose).toHaveBeenCalledTimes(1);
  });
});
