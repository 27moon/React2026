'use client';

import { Provider } from 'react-redux';
import { store } from '../store/store';
import ContextProvider from '../context/contextProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ContextProvider>{children}</ContextProvider>
    </Provider>
  );
}
