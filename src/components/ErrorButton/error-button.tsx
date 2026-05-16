import { useState } from 'react';
import './error-button.css';

export const ErrorButton = () => {
  const [hasError, setHasError] = useState<boolean>(false);

  if (hasError) {
    throw new Error('Error from ErrorBoundary is shown');
  }

  const handleClick = () => {
    setHasError(true);
  };

  return (
    <button className="error-btn" onClick={handleClick}>
      Error Button
    </button>
  );
};
