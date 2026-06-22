import { useContext } from 'react';
import { ThemeContext } from '../../context/themeContext';
import '../../colors.css';

export default function ThemeButton() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('ThemeToggleButton must be used within ContextProvider');
  }

  const { theme, toggleTheme } = context;

  return (
    <button
      onClick={toggleTheme}
      className={`theme-btn ${theme}`}
      data-testid="theme-btn"
    ></button>
  );
}
