import { useState } from 'react';

type FormType = 'uncontrolled' | 'rhf' | null;

export const useModal = () => {
  const [open, setOpen] = useState(false);
  const [formType, setFormType] = useState<FormType>(null);

  const openModal = (type: 'uncontrolled' | 'rhf') => {
    setFormType(type);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setFormType(null);
  };

  return {
    open,
    formType,
    openModal,
    closeModal,
  };
};
