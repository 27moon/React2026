import React from 'react';

type SelectFieldProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  id: string;
  label: string;
  options: { value: string; label: string }[];
  inputRef?: React.Ref<HTMLSelectElement>;
};

export const SelectField = ({
  id,
  label,
  options,
  inputRef,
  ...props
}: SelectFieldProps) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <select id={id} ref={inputRef} {...props}>
        <option value="">Select gender</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};
