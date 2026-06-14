import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
  className?: string;
  inputRef?: React.Ref<HTMLInputElement>;
}

export const Input = ({
  id,
  label,
  error,
  className,
  inputRef,
  ...props
}: InputProps) => {
  return (
    <div className={className}>
      <label htmlFor={id}>{label}</label>
      <input id={id} ref={inputRef} {...props} />
      {error && <p id={`${id}-error`}>{error}</p>}
    </div>
  );
};
