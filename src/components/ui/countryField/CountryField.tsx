import React from 'react';

type CountryFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  countries: readonly string[];
  error?: string;
  inputRef?: React.Ref<HTMLInputElement>;
};

export const CountryField = ({
  id,
  label,
  countries,
  error,
  ...props
}: CountryFieldProps) => {
  const datalistId = `${id}-countries`;
  return (
    <div className="country-field">
      <label htmlFor={id}>{label}</label>
      <input id={id} list={datalistId} {...props} />
      <datalist id={datalistId}>
        {countries.map((country) => (
          <option key={country} value={country} />
        ))}
      </datalist>
      {error && <p className="error">{error}</p>}
    </div>
  );
};
