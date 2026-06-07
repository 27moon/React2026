type SelectFieldProps = {
  id: string;
  name: string;
  label: string;
  options: { value: string; label: string }[];
};

export const SelectField = ({ id, name, label, options }: SelectFieldProps) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>

      <select id={id} name={name}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};
