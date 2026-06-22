'use client';

import { useContext, useState } from 'react';
import './error-button.css';
import { ThemeContext } from '../../context/themeContext';

export function ErrorButton() {
  const [error, setError] = useState(false);
  const context = useContext(ThemeContext);

  if (!context) return null;

  const { theme } = context;

  if (error) {
    throw new Error('Error from ErrorBoundary is shown');
  }

  return (
    <button className={`error-btn ${theme}`} onClick={() => setError(true)}>
      Error Button
    </button>
  );
}
