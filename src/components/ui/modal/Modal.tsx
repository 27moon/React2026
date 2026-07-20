import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal = ({ open, onClose, children }: Readonly<ModalProps>) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      modalRef.current?.focus();
    }
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        ref={modalRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};
