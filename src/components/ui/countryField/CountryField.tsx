import React from 'react';

type CountryFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  name: string;
  label: string;
  countries: string[];
  error?: string;
};

export const CountryField = ({
  id,
  name,
  label,
  countries,
  error,
  ...props
}: CountryFieldProps) => {
  const datalistId = `${id}-countries`;

  return (
    <div className="country-field">
      <label htmlFor={id}>{label}</label>

      <input id={id} name={name} list={datalistId} {...props} />

      <datalist id={datalistId}>
        {countries.map((country) => (
          <option key={country} value={country} />
        ))}
      </datalist>

      {error && <p className="error">{error}</p>}
    </div>
  );
};
