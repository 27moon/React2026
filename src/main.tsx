import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { ErrorBoundary } from './components/ErrorBoundary/error-boundary.tsx';
import { BrowserRouter } from 'react-router';
import { App } from './App.tsx';

createRoot(
  document.querySelector('#root') || document.createElement('div')
).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
