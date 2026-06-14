import React from 'react';

type CountryFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  countries: string[];
  error?: string;
  inputRef?: React.Ref<HTMLInputElement>;
};

export const CountryField = ({
  id,
  label,
  countries,
  error,
  inputRef,
  ...props
}: CountryFieldProps) => {
  const datalistId = `${id}-countries`;
  return (
    <div className="country-field">
      <label htmlFor={id}>{label}</label>
      <input id={id} ref={inputRef} list={datalistId} {...props} />
      <datalist id={datalistId}>
        {countries.map((country) => (
          <option key={country} value={country} />
        ))}
      </datalist>
      {error && <p className="error">{error}</p>}
    </div>
  );
};
