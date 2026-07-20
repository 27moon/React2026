import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const Button: React.FC<Readonly<ButtonProps>> = ({
  type = 'button',
  className,
  ...props
}) => {
  return <button type={type} className={className} {...props} />;
};
