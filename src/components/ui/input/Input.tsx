import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
  className?: string;
}

export const Input = ({
  id,
  label,
  error,
  className,
  ...props
}: Readonly<InputProps>) => {
  return (
    <div className={className}>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} />
      {error && <p id={`${id}-error`}>{error}</p>}
    </div>
  );
};
