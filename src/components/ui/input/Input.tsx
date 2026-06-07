interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  label: string;
  error?: string;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  id,
  name,
  label,
  error,
  className,
  ...props
}) => {
  return (
    <div className={`${className}`}>
      <label htmlFor={id}>{label}</label>

      <input id={id} name={name} {...props} />

      {error && <p id={`${id}-error`}>{error}</p>}
    </div>
  );
};
